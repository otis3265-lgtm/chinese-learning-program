import 'dotenv/config';
import express from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 3333);
const dataDir = path.join(__dirname, 'generated');
const usersPath = path.join(dataDir, 'users.json');
const learningPath = path.join(dataDir, 'learning.json');
const learningSeedPath = path.join(dataDir, 'learning.seed.json');
const sessionCookieName = 'chinese_learning_session';
const sessionTtlMs = 1000 * 60 * 60 * 24 * 30;
const sessions = new Map();
const defaultBaseUrl = process.env.OPENAI_BASE_URL || 'https://superaiapi.com/v1';
const defaultChatModel = process.env.CHAT_MODEL || process.env.OPENAI_MODEL || 'gpt-5.4-mini';
const defaultTtsModel = process.env.TTS_MODEL || 'gpt-4o-mini-tts';
const defaultQwenTtsVoice = process.env.QWEN_TTS_VOICE || 'Cherry';
const defaultConfiguredUsername = normalizeUsername(process.env.DEFAULT_CONFIGURED_USER || process.env.OTIS_DEFAULT_USER || 'otis');

app.set('trust proxy', true);
app.use(express.json({ limit: '8mb' }));
app.use(express.static(path.join(__dirname, 'public'), {
  etag: false,
  lastModified: false,
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  },
}));
app.use('/vendor/hanzi-writer', express.static(path.join(__dirname, 'node_modules/hanzi-writer/dist')));
app.use('/hanzi-data', express.static(path.join(__dirname, 'node_modules/hanzi-writer-data')));

function normalizeUsername(username) {
  return String(username || '').trim().toLowerCase();
}

function timingSafeEqualText(left, right) {
  const leftBuffer = Buffer.from(String(left || ''));
  const rightBuffer = Buffer.from(String(right || ''));
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(String(password), salt, 120000, 32, 'sha256').toString('hex');
  return { salt, hash };
}

function verifyPassword(password, user) {
  if (!user?.passwordHash || !user?.passwordSalt) {
    return false;
  }
  const { hash } = hashPassword(password, user.passwordSalt);
  return timingSafeEqualText(hash, user.passwordHash);
}

function parseCookies(req) {
  return String(req.headers.cookie || '')
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((cookies, part) => {
      const separatorIndex = part.indexOf('=');
      if (separatorIndex >= 0) {
        cookies[decodeURIComponent(part.slice(0, separatorIndex))] = decodeURIComponent(part.slice(separatorIndex + 1));
      }
      return cookies;
    }, {});
}

function setSessionCookie(res, token) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `${sessionCookieName}=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${Math.floor(sessionTtlMs / 1000)}${secure}`,
  );
}

function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', `${sessionCookieName}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
}

async function readUsers() {
  try {
    const text = await fs.readFile(usersPath, 'utf8');
    const users = JSON.parse(text.replace(/^\uFEFF/, ''));
    return Array.isArray(users) ? users : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeUsers(users) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf8');
}

async function findUserById(userId) {
  const users = await readUsers();
  return users.find((user) => user.id === userId) || null;
}

async function findUserByUsername(username) {
  const normalized = normalizeUsername(username);
  const users = await readUsers();
  return users.find((user) => normalizeUsername(user.username) === normalized) || null;
}

function firstEnvValue(...names) {
  for (const name of names) {
    const value = String(process.env[name] || '').trim();
    if (value) return value;
  }
  return '';
}

function getDefaultConfiguredUserSettings(user) {
  if (!user || normalizeUsername(user.username) !== defaultConfiguredUsername) {
    return {};
  }
  const apiKey = firstEnvValue('OTIS_API_KEY', 'DEFAULT_USER_API_KEY', 'OPENAI_API_KEY');
  return {
    apiKey,
    chatApiKey: firstEnvValue('OTIS_CHAT_API_KEY', 'DEFAULT_USER_CHAT_API_KEY') || apiKey,
    baseUrl: firstEnvValue('OTIS_BASE_URL', 'DEFAULT_USER_BASE_URL', 'OPENAI_BASE_URL'),
    chatModel: firstEnvValue('OTIS_CHAT_MODEL', 'DEFAULT_USER_CHAT_MODEL', 'CHAT_MODEL'),
    ttsApiKey: firstEnvValue('OTIS_TTS_API_KEY', 'DEFAULT_USER_TTS_API_KEY', 'DASHSCOPE_API_KEY'),
    ttsBaseUrl: firstEnvValue('OTIS_TTS_BASE_URL', 'DEFAULT_USER_TTS_BASE_URL'),
    ttsModel: firstEnvValue('OTIS_TTS_MODEL', 'DEFAULT_USER_TTS_MODEL', 'TTS_MODEL'),
    ttsSpeed: firstEnvValue('OTIS_TTS_SPEED', 'DEFAULT_USER_TTS_SPEED', 'TTS_SPEED'),
  };
}

function getUserApiSettings(user) {
  const defaults = getDefaultConfiguredUserSettings(user);
  return {
    apiKey: String(user?.apiKey || defaults.apiKey || '').trim(),
    chatApiKey: String(user?.chatApiKey || user?.apiKey || defaults.chatApiKey || defaults.apiKey || '').trim(),
    baseUrl: String(user?.baseUrl || defaults.baseUrl || defaultBaseUrl).trim(),
    chatModel: String(user?.chatModel || defaults.chatModel || defaultChatModel).trim(),
    ttsApiKey: String(user?.ttsApiKey || defaults.ttsApiKey || user?.chatApiKey || user?.apiKey || defaults.chatApiKey || defaults.apiKey || '').trim(),
    ttsBaseUrl: String(user?.ttsBaseUrl || defaults.ttsBaseUrl || user?.baseUrl || defaults.baseUrl || defaultBaseUrl).trim(),
    ttsModel: String(user?.ttsModel || defaults.ttsModel || defaultTtsModel).trim(),
    ttsSpeed: Math.min(2, Math.max(0.5, Number(user?.ttsSpeed || defaults.ttsSpeed || 0.85))),
  };
}

function publicUser(user) {
  if (!user) return null;
  const settings = getUserApiSettings(user);
  return {
    id: user.id,
    username: user.username,
    hasChatApiKey: Boolean(settings.chatApiKey),
    chatModel: settings.chatModel,
    ttsModel: settings.ttsModel,
    ttsSpeed: settings.ttsSpeed,
    ttsBaseUrl: settings.ttsBaseUrl,
    hasTtsApiKey: Boolean(settings.ttsApiKey),
    baseUrl: settings.baseUrl,
  };
}

function createSession(userId) {
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, {
    userId,
    expiresAt: Date.now() + sessionTtlMs,
  });
  return token;
}

async function getSessionUser(req) {
  const token = parseCookies(req)[sessionCookieName];
  const session = token ? sessions.get(token) : null;
  if (!session) return null;
  if (session.expiresAt <= Date.now()) {
    sessions.delete(token);
    return null;
  }
  const user = await findUserById(session.userId);
  if (!user) {
    sessions.delete(token);
    return null;
  }
  session.expiresAt = Date.now() + sessionTtlMs;
  return user;
}

async function requireUser(req, res, next) {
  try {
    const user = await getSessionUser(req);
    if (!user) {
      return res.status(401).json({ error: '请先登录。' });
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
}

function emptyLearningData(userId) {
  return {
    userId,
    textbook: {
      title: '',
      level: '',
      content: '',
      updatedAt: null,
    },
    words: [],
    records: [],
    updatedAt: new Date().toISOString(),
  };
}

async function readAllLearningData() {
  try {
    const text = await fs.readFile(learningPath, 'utf8');
    const data = JSON.parse(text.replace(/^\uFEFF/, ''));
    return data && typeof data === 'object' ? data : {};
  } catch (error) {
    if (error.code === 'ENOENT') return {};
    throw error;
  }
}

async function writeAllLearningData(data) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(learningPath, JSON.stringify(data, null, 2), 'utf8');
}

async function readSeedLearningData() {
  try {
    const text = await fs.readFile(learningSeedPath, 'utf8');
    const seed = JSON.parse(text.replace(/^\uFEFF/, ''));
    return seed && typeof seed === 'object' ? seed : null;
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

async function readLearningData(userId) {
  const allData = await readAllLearningData();
  if (!allData[userId]) {
    const seed = await readSeedLearningData();
    if (seed) {
      const seededLearning = {
        ...emptyLearningData(userId),
        ...seed,
        userId,
        records: [],
        updatedAt: new Date().toISOString(),
      };
      allData[userId] = seededLearning;
      await writeAllLearningData(allData);
      return seededLearning;
    }
  }
  return {
    ...emptyLearningData(userId),
    ...(allData[userId] || {}),
    userId,
  };
}

async function writeLearningData(userId, data) {
  const allData = await readAllLearningData();
  allData[userId] = {
    ...emptyLearningData(userId),
    ...data,
    userId,
    updatedAt: new Date().toISOString(),
  };
  await writeAllLearningData(allData);
  return allData[userId];
}

function summarizeText(text = '', maxLength = 18000) {
  const normalized = String(text || '').replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength)}...`;
}

function buildLearningSystemPrompt(learningData, extraContext = {}) {
  const textbook = learningData?.textbook || {};
  const words = Array.isArray(learningData?.words) ? learningData.words.slice(-80) : [];
  const recentRecords = Array.isArray(learningData?.records) ? learningData.records.slice(-20) : [];
  const wordSummary = words
    .map((word) => `${word.hanzi || ''}${word.pinyin ? ` (${word.pinyin})` : ''}: ${word.english || ''}`)
    .filter(Boolean)
    .join('; ');
  const recordSummary = recentRecords
    .map((record) => `${record.type || 'study'}: ${record.title || record.detail || ''}`)
    .filter(Boolean)
    .join('; ');

  return [
    'You are a helpful English-speaking Chinese tutor inside a mobile Chinese learning app for non-native Chinese learners.',
    'Default to English for explanations, instructions, feedback, and casual replies.',
    'Use Chinese mainly for target sentences, examples, dialogue lines, vocabulary items, and learner practice.',
    'If the user writes in Chinese, you may briefly acknowledge it, but still explain in English unless the user explicitly asks for Chinese-only replies.',
    'Answer the user intent first. Do not force every reply back to textbook lessons or study drills.',
    'For greetings or casual messages, reply briefly in English and ask how you can help with Chinese learning.',
    'Use the textbook, saved vocabulary, and records only when the user asks for Chinese learning, lesson practice, vocabulary, grammar, writing, translation, or textbook-related help.',
    'When teaching Chinese, keep explanations clear and compact. Include pinyin only when useful.',
    'For vocabulary requests, include Chinese, pinyin, short English meaning, and one short example if needed.',
    'For grammar requests, include a simple pattern, brief English explanation, two short examples, and one quick exercise.',
    'For conversation practice requests, ask one question at a time, correct mistakes gently, and continue the dialogue.',
    'Keep mobile answers concise. Avoid long introductions, markdown tables, and horizontal rules.',
    'Never mention image generation or design tools.',
    textbook.title ? `Textbook title: ${textbook.title}` : '',
    textbook.level ? `Learner level: ${textbook.level}` : '',
    textbook.content ? `Textbook content excerpt: ${summarizeText(textbook.content)}` : 'No textbook content has been provided yet. Ask the learner to paste lesson content.',
    wordSummary ? `Saved vocabulary: ${wordSummary}` : '',
    recordSummary ? `Recent study records: ${recordSummary}` : '',
    extraContext.lessonFocus ? `Current focus: ${extraContext.lessonFocus}` : '',
  ].filter(Boolean).join('\n');
}

function getChatCompletionsUrl(rawBaseUrl) {
  const baseUrl = String(rawBaseUrl || defaultBaseUrl).trim();
  if (!baseUrl) return 'https://api.openai.com/v1/chat/completions';
  const parsed = new URL(baseUrl);
  const basePath = parsed.pathname.replace(/\/+$/, '');
  if (basePath.endsWith('/chat/completions')) {
    return parsed.toString();
  }
  parsed.pathname = `${basePath || '/v1'}/chat/completions`.replace(/\/{2,}/g, '/');
  parsed.search = '';
  return parsed.toString();
}

function getAudioSpeechUrl(rawBaseUrl) {
  const baseUrl = String(rawBaseUrl || defaultBaseUrl).trim();
  if (!baseUrl) return 'https://api.openai.com/v1/audio/speech';
  const parsed = new URL(baseUrl);
  const basePath = parsed.pathname.replace(/\/+$/, '');
  if (basePath.endsWith('/audio/speech')) {
    parsed.search = '';
    return parsed.toString();
  }
  const versionPath = basePath.endsWith('/v1') ? basePath : `${basePath || ''}/v1`;
  parsed.pathname = `${versionPath}/audio/speech`.replace(/\/{2,}/g, '/');
  parsed.search = '';
  return parsed.toString();
}

function getQwenTtsUrl(rawBaseUrl) {
  const baseUrl = String(rawBaseUrl || '').trim();
  const fallback = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation';
  if (!baseUrl) return fallback;
  const parsed = new URL(baseUrl);
  if (/dashscope-intl\.aliyuncs\.com/i.test(parsed.hostname)) {
    return 'https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation';
  }
  if (/dashscope\.aliyuncs\.com/i.test(parsed.hostname)) {
    return fallback;
  }
  return fallback;
}

function isQwenTtsModel(model) {
  return /^qwen.*tts/i.test(String(model || ''));
}

function guessLanguageType(text) {
  return /[\u3400-\u9fff]/u.test(String(text || '')) ? 'Chinese' : 'English';
}

async function fetchQwenTtsAudio({ apiKey, baseUrl, input, model, voice, languageType, instructions }) {
  const payloadInput = {
    text: input,
    voice: voice || defaultQwenTtsVoice,
    language_type: languageType || guessLanguageType(input),
  };
  if (instructions) {
    payloadInput.instructions = instructions;
    payloadInput.optimize_instructions = true;
  }

  const response = await fetch(getQwenTtsUrl(baseUrl), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: payloadInput,
    }),
  });

  const text = await response.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Qwen TTS returned a non-JSON response: ${response.status} ${text.slice(0, 300)}`);
  }
  if (!response.ok) {
    throw new Error(data?.message || data?.error?.message || data?.code || `Qwen TTS request failed: ${response.status}`);
  }

  const audioUrl = data?.output?.audio?.url;
  const audioData = data?.output?.audio?.data;
  if (audioData) {
    return {
      buffer: Buffer.from(audioData, 'base64'),
      contentType: 'audio/wav',
    };
  }
  if (!audioUrl) {
    throw new Error('Qwen TTS did not return an audio URL.');
  }

  const audioResponse = await fetch(audioUrl);
  if (!audioResponse.ok) {
    throw new Error(`Failed to download Qwen TTS audio: ${audioResponse.status}`);
  }
  return {
    buffer: Buffer.from(await audioResponse.arrayBuffer()),
    contentType: audioResponse.headers.get('content-type') || 'audio/mpeg',
  };
}

function extractCompletionText(completion) {
  const reply = completion?.choices?.[0]?.message?.content;
  if (typeof reply === 'string') return reply.trim();
  if (Array.isArray(reply)) {
    return reply.map((item) => item?.text || item?.content || '').filter(Boolean).join('').trim();
  }
  return '';
}

app.get('/api/auth/me', async (req, res, next) => {
  try {
    res.json({ user: publicUser(await getSessionUser(req)) });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/register', async (req, res, next) => {
  try {
    const username = normalizeUsername(req.body.username);
    const password = String(req.body.password || '');
    if (!/^[a-z0-9_@.-]{3,40}$/.test(username)) {
      return res.status(400).json({ error: '用户名需要 3-40 位，可使用字母、数字、下划线、点、横线或邮箱格式。' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: '密码至少需要 6 位。' });
    }

    const users = await readUsers();
    if (users.some((user) => normalizeUsername(user.username) === username)) {
      return res.status(409).json({ error: '这个用户名已经被注册了。' });
    }

    const { salt, hash } = hashPassword(password);
    const user = {
      id: crypto.randomUUID(),
      username,
      passwordSalt: salt,
      passwordHash: hash,
      apiKey: '',
      chatApiKey: '',
      baseUrl: defaultBaseUrl,
      chatModel: defaultChatModel,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    await writeUsers(users);

    const token = createSession(user.id);
    setSessionCookie(res, token);
    res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const username = normalizeUsername(req.body.username);
    const password = String(req.body.password || '');
    const user = await findUserByUsername(username);
    if (!user || !verifyPassword(password, user)) {
      return res.status(401).json({ error: '用户名或密码不正确。' });
    }
    const token = createSession(user.id);
    setSessionCookie(res, token);
    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/logout', (req, res) => {
  const token = parseCookies(req)[sessionCookieName];
  if (token) sessions.delete(token);
  clearSessionCookie(res);
  res.json({ ok: true });
});

app.use('/api', requireUser);

app.get('/api/health', (req, res) => {
  const settings = getUserApiSettings(req.user);
  res.json({
    ok: true,
    user: publicUser(req.user),
    hasChatApiKey: Boolean(settings.chatApiKey),
    chatModel: settings.chatModel,
    ttsModel: settings.ttsModel,
    ttsSpeed: settings.ttsSpeed,
    baseUrl: settings.baseUrl,
  });
});

app.post('/api/settings', async (req, res) => {
  try {
    const currentSettings = getUserApiSettings(req.user);
    const apiKey = String(req.body.apiKey || '').trim() || currentSettings.apiKey;
    const chatApiKey = String(req.body.chatApiKey || '').trim() || currentSettings.chatApiKey || apiKey;
    const baseUrl = String(req.body.baseUrl || currentSettings.baseUrl || defaultBaseUrl).trim();
    const chatModel = String(req.body.chatModel || currentSettings.chatModel || defaultChatModel).trim();
    const ttsApiKey = String(req.body.ttsApiKey || '').trim() || currentSettings.ttsApiKey || chatApiKey;
    const ttsBaseUrl = String(req.body.ttsBaseUrl || currentSettings.ttsBaseUrl || baseUrl).trim();
    const ttsModel = String(req.body.ttsModel || currentSettings.ttsModel || defaultTtsModel).trim();
    const ttsSpeed = Math.min(2, Math.max(0.5, Number(req.body.ttsSpeed || currentSettings.ttsSpeed || 0.85)));

    if (!chatApiKey) {
      return res.status(400).json({ error: '请输入 API key。' });
    }
    if (baseUrl && !/^https?:\/\//i.test(baseUrl)) {
      return res.status(400).json({ error: 'API 地址需要以 http:// 或 https:// 开头。' });
    }

    const users = await readUsers();
    const userIndex = users.findIndex((user) => user.id === req.user.id);
    if (userIndex < 0) {
      return res.status(401).json({ error: '请重新登录账号。' });
    }

    users[userIndex] = {
      ...users[userIndex],
      apiKey,
      chatApiKey,
      baseUrl,
      chatModel,
      ttsApiKey,
      ttsBaseUrl,
      ttsModel,
      ttsSpeed,
      updatedAt: new Date().toISOString(),
    };
    await writeUsers(users);
    res.json({
      ok: true,
      ...getUserApiSettings(users[userIndex]),
      user: publicUser(users[userIndex]),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message || '保存设置失败。' });
  }
});

app.get('/api/learning', async (req, res) => {
  try {
    res.json({ learning: await readLearningData(req.user.id) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '读取学习数据失败。' });
  }
});

app.post('/api/learning/textbook', async (req, res) => {
  try {
    const current = await readLearningData(req.user.id);
    const textbook = {
      title: String(req.body.title || '').trim().slice(0, 120),
      level: String(req.body.level || '').trim().slice(0, 80),
      content: String(req.body.content || '').trim().slice(0, 120000),
      updatedAt: new Date().toISOString(),
    };
    const learning = await writeLearningData(req.user.id, { ...current, textbook });
    res.json({ ok: true, learning });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '保存课本内容失败。' });
  }
});

app.post('/api/learning/words', async (req, res) => {
  try {
    const current = await readLearningData(req.user.id);
    const word = {
      id: crypto.randomUUID(),
      hanzi: String(req.body.hanzi || req.body.word || '').trim().slice(0, 60),
      pinyin: String(req.body.pinyin || '').trim().slice(0, 120),
      english: String(req.body.english || req.body.meaning || '').trim().slice(0, 500),
      example: String(req.body.example || '').trim().slice(0, 800),
      source: String(req.body.source || 'manual').trim().slice(0, 80),
      favorite: Boolean(req.body.favorite),
      createdAt: new Date().toISOString(),
    };
    if (!word.hanzi) {
      return res.status(400).json({ error: '请输入要记录的中文词语。' });
    }
    const words = [word, ...(Array.isArray(current.words) ? current.words : [])].slice(0, 500);
    const learning = await writeLearningData(req.user.id, { ...current, words });
    res.status(201).json({ ok: true, word, learning });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '保存单词失败。' });
  }
});

app.patch('/api/learning/words/:id', async (req, res) => {
  try {
    const current = await readLearningData(req.user.id);
    let updatedWord = null;
    const words = (Array.isArray(current.words) ? current.words : []).map((word) => {
      if (word.id !== req.params.id) return word;
      updatedWord = { ...word, favorite: Boolean(req.body.favorite), updatedAt: new Date().toISOString() };
      return updatedWord;
    });
    if (!updatedWord) return res.status(404).json({ error: 'Word not found.' });
    const learning = await writeLearningData(req.user.id, { ...current, words });
    res.json({ ok: true, word: updatedWord, learning });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '更新单词失败。' });
  }
});

app.delete('/api/learning/words/:id', async (req, res) => {
  try {
    const current = await readLearningData(req.user.id);
    const words = (Array.isArray(current.words) ? current.words : []).filter((word) => word.id !== req.params.id);
    const learning = await writeLearningData(req.user.id, { ...current, words });
    res.json({ ok: true, learning });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '删除单词失败。' });
  }
});

app.post('/api/learning/records', async (req, res) => {
  try {
    const current = await readLearningData(req.user.id);
    const record = {
      id: crypto.randomUUID(),
      type: String(req.body.type || 'study').trim().slice(0, 40),
      title: String(req.body.title || '').trim().slice(0, 160),
      detail: String(req.body.detail || '').trim().slice(0, 2000),
      score: String(req.body.score || '').trim().slice(0, 80),
      createdAt: new Date().toISOString(),
    };
    const records = [record, ...(Array.isArray(current.records) ? current.records : [])].slice(0, 1000);
    const learning = await writeLearningData(req.user.id, { ...current, records });
    res.status(201).json({ ok: true, record, learning });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '保存学习记录失败。' });
  }
});

app.post('/api/tts', async (req, res) => {
  try {
    const settings = getUserApiSettings(req.user);
    const apiKey = settings.ttsApiKey;
    if (!apiKey) {
      return res.status(400).json({ error: 'API key is not configured.' });
    }

    const input = String(req.body.input || '').trim().slice(0, 1200);
    if (!input) {
      return res.status(400).json({ error: 'No text provided for speech.' });
    }

    const voice = String(req.body.voice || 'alloy').trim();
    const responseFormat = String(req.body.response_format || 'mp3').trim();
    const speed = Math.min(4, Math.max(0.25, Number(req.body.speed || 0.9)));
    const requestedModel = String(req.body.model || settings.ttsModel || defaultTtsModel).trim();
    if (isQwenTtsModel(requestedModel)) {
      const { buffer, contentType } = await fetchQwenTtsAudio({
        apiKey,
        baseUrl: settings.ttsBaseUrl,
        input,
        model: requestedModel,
        voice: String(req.body.voice || defaultQwenTtsVoice).trim(),
        languageType: req.body.language_type,
        instructions: String(req.body.instructions || '').trim().slice(0, 1600),
      });
      res.setHeader('Content-Type', contentType);
      res.setHeader('Cache-Control', 'no-store');
      res.send(buffer);
      return;
    }

    const models = [...new Set([requestedModel, 'gpt-4o-mini-tts', 'tts-1', 'tts-1-hd'])];
    let response = null;
    let lastErrorMessage = '';
    for (const model of models) {
      response = await fetch(getAudioSpeechUrl(settings.ttsBaseUrl), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'X-Forwarded-Host': req.get('host') || `localhost:${port}`,
        },
        body: JSON.stringify({
          model,
          input,
          voice,
          response_format: responseFormat,
          speed,
        }),
      });
      if (response.ok) break;
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        lastErrorMessage = data?.error?.message || data?.message || text;
      } catch {
        lastErrorMessage = text;
      }
      if (!/model_not_found|No available channel/i.test(lastErrorMessage)) break;
    }

    if (!response?.ok) {
      return res.status(response?.status || 502).json({
        error: lastErrorMessage || 'TTS request failed.',
        fallback: 'browser-speech',
      });
    }

    const audioBuffer = Buffer.from(await response.arrayBuffer());
    const mimeTypes = {
      mp3: 'audio/mpeg',
      opus: 'audio/opus',
      aac: 'audio/aac',
      flac: 'audio/flac',
      wav: 'audio/wav',
    };
    res.setHeader('Content-Type', mimeTypes[responseFormat] || 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-store');
    res.send(audioBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message || 'TTS failed.' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const settings = getUserApiSettings(req.user);
    const apiKey = settings.chatApiKey;
    if (!apiKey) {
      return res.status(400).json({ error: '还没有配置 API key。请先在设置里保存你的 API key。' });
    }

    const normalizeMessageContent = (content) => {
      if (Array.isArray(content)) {
        const parts = content
          .map((part) => {
            if (part?.type === 'text') {
              return { type: 'text', text: String(part.text || '').trim().slice(0, 8000) };
            }
            const imageUrl = part?.image_url?.url || part?.image_url;
            if (part?.type === 'image_url' && /^data:image\//i.test(String(imageUrl || ''))) {
              return { type: 'image_url', image_url: { url: String(imageUrl).slice(0, 7000000) } };
            }
            return null;
          })
          .filter(Boolean);
        return parts.length ? parts : '';
      }
      return String(content || '').trim();
    };

    const messages = Array.isArray(req.body.messages)
      ? req.body.messages
        .map((message) => ({
          role: ['user', 'assistant'].includes(message?.role) ? message.role : 'user',
          content: normalizeMessageContent(message?.content),
        }))
        .filter((message) => Array.isArray(message.content) ? message.content.length : message.content)
        .slice(-32)
      : [];

    if (!messages.length) {
      return res.status(400).json({ error: '请先输入聊天内容。' });
    }

    const learningData = await readLearningData(req.user.id);
    const learningMessages = [
      {
        role: 'system',
        content: buildLearningSystemPrompt(learningData, {
          lessonFocus: String(req.body.lessonFocus || '').trim().slice(0, 500),
        }),
      },
      ...messages,
    ];

    const response = await fetch(getChatCompletionsUrl(settings.baseUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'X-Forwarded-Host': req.get('host') || `localhost:${port}`,
      },
      body: JSON.stringify({
        model: String(req.body.model || settings.chatModel || defaultChatModel).trim(),
        messages: learningMessages,
        max_tokens: 9000,
        temperature: 0.65,
        top_p: 1,
        stream: true,
      }),
    });

    if (response.ok && response.body) {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      });
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(decoder.decode(value, { stream: true }));
        }
        const tail = decoder.decode();
        if (tail) res.write(tail);
      } finally {
        res.end();
      }
      return;
    }

    const responseText = await response.text();
    let completion = {};
    try {
      completion = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error(`聊天接口返回了无法解析的响应：${response.status} ${responseText.slice(0, 300)}`);
    }
    if (!response.ok) {
      throw new Error(completion?.error?.message || completion?.message || completion?.error || `聊天接口请求失败：${response.status}`);
    }
    const reply = extractCompletionText(completion);
    if (!reply) {
      return res.status(502).json({ error: '聊天模型没有返回内容。' });
    }
    res.json({ reply, model: settings.chatModel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message || '聊天失败。' });
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: error?.message || '服务出错。' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Chinese learning app running at http://localhost:${port}`);
  console.log(`LAN users can open http://YOUR_COMPUTER_IP:${port}`);
});
