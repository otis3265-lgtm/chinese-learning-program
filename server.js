import 'dotenv/config';
import express from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from 'openai';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 3333);
const configuredGeneratedDir = process.env.GENERATED_DIR || process.env.RAILWAY_VOLUME_MOUNT_PATH;
const generatedDir = configuredGeneratedDir
  ? path.resolve(__dirname, configuredGeneratedDir)
  : path.join(__dirname, 'generated');
const envPath = path.join(__dirname, '.env');
const historyPath = path.join(generatedDir, 'history.json');
const usersPath = path.join(generatedDir, 'users.json');
const promptLibraryPath = path.resolve(__dirname, process.env.PROMPT_LIBRARY_PATH || path.join('data', 'prompt-library.json'));
const importantImagesDir = path.join(generatedDir, 'important-images');
const importantImagesPath = path.join(importantImagesDir, 'items.json');
const defaultImageModel = 'gpt-image-2';
const defaultLayerImageModel = process.env.LAYER_IMAGE_MODEL || 'gpt-image-2';
const defaultAnalysisModel = process.env.ANALYSIS_MODEL || 'gpt-4.1-mini';
const defaultChatModel = process.env.CHAT_MODEL || 'gpt-5.4-mini';
const defaultChatModels = [
  'gpt-5.2',
  'gpt-5.2-pro',
  'gpt-5.3-codex',
  'gpt-5.3-codex-spark',
  'gpt-5.4-2026-03-05',
  'gpt-5.4-mini',
  'gpt-5.5',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-pro',
  'gemini-3-flash-c',
  'gemini-3-flash-preview',
  'gemini-3.1-flash-lite-preview',
  'gemini-3.1-pro-high-c',
  'gemini-3.1-pro-low-c',
  'gemini-3.1-pro-preview',
  'gemini-3.5-flash',
];
const defaultBaseUrl = 'https://superaiapi.com/v1';
const defaultApiEntryName = 'SuperAI';
const defaultConfiguredUsername = normalizeUsername(process.env.DEFAULT_CONFIGURED_USER || process.env.OTIS_DEFAULT_USER || 'otis');
const sessionCookieName = 'huabuwan_session';
const sessionTtlMs = 1000 * 60 * 60 * 24 * 30;
const imageTaskPollAttempts = 75;
const backgroundTaskPollAttempts = 75;
const upstreamRequestTimeoutMs = Number(process.env.UPSTREAM_REQUEST_TIMEOUT_MS || 1000 * 60 * 2);
const upstreamImageRequestTimeoutMs = Number(process.env.UPSTREAM_IMAGE_REQUEST_TIMEOUT_MS || 1000 * 60 * 8);
const sessions = new Map();

app.set('trust proxy', true);

const aspectSizes = {
  auto: 'auto',
  square: '1:1',
  widescreen: '16:9',
  story: '9:16',
  landscape: '4:3',
  portrait: '3:4',
  classic: '3:2',
  verticalClassic: '2:3',
  fiveFour: '5:4',
  fourFive: '4:5',
  tripleWide: '3:1',
  tripleTall: '1:3',
  panorama: '2:1',
  tall: '1:2',
  cinema: '21:9',
  verticalCinema: '9:21',
};

const superAiSizes = {
  '1k': {
    auto: '1024x1024',
    square: '1024x1024',
    landscape: '1024x768',
    portrait: '768x1024',
    classic: '1008x672',
    verticalClassic: '672x1008',
    fiveFour: '960x768',
    fourFive: '768x960',
  },
  '2k': {
    auto: '2048x2048',
    square: '2048x2048',
    widescreen: '2048x1152',
    story: '1152x2048',
    landscape: '2048x1536',
    portrait: '1536x2048',
    classic: '2016x1344',
    verticalClassic: '1344x2016',
    fiveFour: '2000x1600',
    fourFive: '1600x2000',
    tripleWide: '2304x768',
    tripleTall: '768x2304',
    panorama: '2048x1024',
    tall: '1024x2048',
    cinema: '2016x864',
    verticalCinema: '864x2016',
  },
  '4k': {
    auto: '2880x2880',
    square: '2880x2880',
    widescreen: '3840x2160',
    story: '2160x3840',
    landscape: '3264x2448',
    portrait: '2448x3264',
    classic: '3504x2336',
    verticalClassic: '2336x3504',
    fiveFour: '3200x2560',
    fourFive: '2560x3200',
    tripleWide: '3840x1280',
    tripleTall: '1280x3840',
    panorama: '3840x1920',
    tall: '1920x3840',
    cinema: '3696x1584',
    verticalCinema: '1584x3696',
  },
};

function timingSafeEqualText(left, right) {
  const leftBuffer = Buffer.from(String(left || ''));
  const rightBuffer = Buffer.from(String(right || ''));

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

app.use(express.json({ limit: '220mb' }));
app.use(express.static(path.join(__dirname, 'public')));

let activeApiKey = process.env.OPENAI_API_KEY || '';
let activeBaseUrl = process.env.OPENAI_BASE_URL || defaultBaseUrl;
let activeModel = process.env.IMAGE_MODEL || process.env.OPENAI_MODEL || defaultImageModel;
let activeApiEntryName = process.env.API_ENTRY_NAME || defaultApiEntryName;
const taskMeta = new Map();
const backgroundTasks = new Map();
let client = createClient();

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

function normalizeUsername(username) {
  return String(username || '').trim().toLowerCase();
}

function maskCredential(value = '', visibleStart = 4, visibleEnd = 4) {
  const text = String(value || '').trim();
  if (!text) {
    return '';
  }

  if (text.length <= visibleStart + visibleEnd) {
    return `${text.slice(0, visibleStart)}...`;
  }

  return `${text.slice(0, visibleStart)}...${text.slice(-visibleEnd)}`;
}

function firstEnvValue(...names) {
  for (const name of names) {
    const value = String(process.env[name] || '').trim();
    if (value) {
      return value;
    }
  }

  return '';
}

function getDefaultConfiguredUserSettings(user) {
  if (!user || normalizeUsername(user.username) !== defaultConfiguredUsername) {
    return {};
  }

  const apiKey = firstEnvValue('OTIS_API_KEY', 'DEFAULT_USER_API_KEY');
  const chatApiKey = firstEnvValue('OTIS_CHAT_API_KEY', 'DEFAULT_USER_CHAT_API_KEY') || apiKey;

  return {
    apiKey,
    chatApiKey,
    baseUrl: firstEnvValue('OTIS_BASE_URL', 'DEFAULT_USER_BASE_URL'),
    model: firstEnvValue('OTIS_IMAGE_MODEL', 'DEFAULT_USER_IMAGE_MODEL'),
    layerModel: firstEnvValue('OTIS_LAYER_IMAGE_MODEL', 'DEFAULT_USER_LAYER_IMAGE_MODEL'),
    chatModel: firstEnvValue('OTIS_CHAT_MODEL', 'DEFAULT_USER_CHAT_MODEL'),
    apiEntryName: firstEnvValue('OTIS_API_ENTRY_NAME', 'DEFAULT_USER_API_ENTRY_NAME'),
  };
}

function publicUser(user) {
  if (!user) {
    return null;
  }

  const settings = getUserApiSettings(user);

  return {
    id: user.id,
    username: user.username,
    hasApiKey: Boolean(settings.apiKey),
    hasChatApiKey: Boolean(settings.chatApiKey),
    model: settings.model,
    layerModel: settings.layerModel,
    chatModel: settings.chatModel,
    baseUrl: settings.baseUrl,
    apiEntryName: settings.apiEntryName,
  };
}

async function readUsers() {
  try {
    const text = await fs.readFile(usersPath, 'utf8');
    const users = JSON.parse(text.replace(/^\uFEFF/, ''));
    return Array.isArray(users) ? users : [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeUsers(users) {
  await fs.mkdir(generatedDir, { recursive: true });
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf8');
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

async function findUserById(userId) {
  const users = await readUsers();
  return users.find((user) => user.id === userId) || null;
}

async function findUserByUsername(username) {
  const normalized = normalizeUsername(username);
  const users = await readUsers();
  return users.find((user) => normalizeUsername(user.username) === normalized) || null;
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

  if (!session) {
    return null;
  }

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
      return res.status(401).json({ error: '请先登录账号。' });
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
}

function getUserApiSettings(user) {
  const defaults = getDefaultConfiguredUserSettings(user);
  const userApiKey = String(user?.apiKey || '').trim();
  const userChatApiKey = String(user?.chatApiKey || '').trim();
  const usesDefaultApi = !userApiKey && Boolean(defaults.apiKey);

  return {
    apiKey: userApiKey || String(defaults.apiKey || '').trim(),
    chatApiKey: userChatApiKey || userApiKey || String(defaults.chatApiKey || defaults.apiKey || '').trim(),
    baseUrl: String((usesDefaultApi ? defaults.baseUrl : '') || user?.baseUrl || defaults.baseUrl || defaultBaseUrl).trim() || defaultBaseUrl,
    model: String((usesDefaultApi ? defaults.model : '') || user?.model || defaults.model || defaultImageModel).trim() || defaultImageModel,
    layerModel: String((usesDefaultApi ? defaults.layerModel : '') || user?.layerModel || defaults.layerModel || defaultLayerImageModel).trim() || defaultLayerImageModel,
    chatModel: String((usesDefaultApi ? defaults.chatModel : '') || user?.chatModel || defaults.chatModel || defaultChatModel).trim() || defaultChatModel,
    apiEntryName: String((usesDefaultApi ? defaults.apiEntryName : '') || user?.apiEntryName || defaults.apiEntryName || defaultApiEntryName).trim() || defaultApiEntryName,
  };
}

function isLikelyChatModel(modelId) {
  const normalized = String(modelId || '').toLowerCase();
  if (!normalized) {
    return false;
  }

  return ![
    'image',
    'dall-e',
    'embedding',
    'whisper',
    'tts',
    'audio',
    'moderation',
    'speech',
  ].some((fragment) => normalized.includes(fragment)) && (
    normalized.includes('gpt') ||
    normalized.includes('gemini') ||
    normalized.includes('claude') ||
    normalized.includes('deepseek') ||
    normalized.includes('qwen') ||
    normalized.includes('llama') ||
    normalized.includes('chat') ||
    normalized.includes('openai') ||
    normalized.includes('o1') ||
    normalized.includes('o3') ||
    normalized.includes('o4')
  );
}

function createApiClient(settings) {
  return settings.apiKey
    ? new OpenAI({
        apiKey: settings.apiKey,
        baseURL: settings.baseUrl,
      })
    : null;
}

function createClient() {
  return activeApiKey
    ? new OpenAI({
        apiKey: activeApiKey,
        baseURL: activeBaseUrl,
      })
    : null;
}

function getLayerImageModel(settings = null) {
  const layerModel = String(settings?.layerModel || '').trim();
  const rawCurrentImageModel = String(settings?.model || activeModel || defaultImageModel).trim() || defaultImageModel;
  const currentImageModel = rawCurrentImageModel.toLowerCase().includes('dall-e')
    ? defaultImageModel
    : rawCurrentImageModel;
  const normalizedLayerModel = layerModel.toLowerCase();

  if (layerModel && !normalizedLayerModel.includes('dall-e') && normalizedLayerModel !== 'dall-e') {
    return layerModel;
  }

  if (process.env.LAYER_IMAGE_MODEL) {
    return process.env.LAYER_IMAGE_MODEL;
  }

  return currentImageModel;
}

function getRequestImageModel(model, settings = null, kind = 'create') {
  const requestedModel = String(model || '').trim();
  const fallbackModel = kind === 'layer'
    ? getLayerImageModel(settings)
    : String(settings?.model || activeModel || defaultImageModel).trim() || defaultImageModel;
  const resolvedModel = requestedModel || fallbackModel || defaultImageModel;

  return resolvedModel.toLowerCase().includes('dall-e') ? defaultImageModel : resolvedModel;
}

function getLayerImageModelCandidates(settings = null) {
  return getImageModelCandidates(getLayerImageModel(settings), settings?.model || activeModel);
}

function getImageModelCandidates(preferredModel = activeModel, currentModel = activeModel) {
  return [...new Set([
    preferredModel,
    currentModel,
    defaultImageModel,
    'gpt-image-1.5',
    'gpt-image-1.5-official',
  ].filter(Boolean))];
}

function isTryAgainLaterError(message = '') {
  const normalized = String(message).toLowerCase();
  return normalized.includes('please wait and try again later')
    || normalized.includes('try again later')
    || normalized.includes('too many requests')
    || normalized.includes('rate limit');
}

function isModelUnavailableError(message = '') {
  const normalized = String(message).toLowerCase();
  return normalized.includes('is not available')
    || normalized.includes('model not available')
    || normalized.includes('model_not_available')
    || normalized.includes('not available in group');
}

function humanizeUpstreamError(message = '') {
  if (isTryAgainLaterError(message)) {
    return '模型通道现在排队或限流了，请稍后重试。';
  }

  if (isModelUnavailableError(message)) {
    return '当前图片模型在这个 API 分组里不可用，已尝试备用图片模型但仍未提交成功。';
  }

  return message;
}

function isLocalRequest(req) {
  const ip = req.ip || req.socket.remoteAddress || '';
  const host = String(req.headers.host || '').split(':')[0].toLowerCase();
  const isLoopbackIp = ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1';
  const isLocalhostHost = host === 'localhost' || host === '127.0.0.1' || host === '::1';
  return isLoopbackIp && isLocalhostHost;
}

async function upsertEnvValue(key, value) {
  let envText = '';

  try {
    envText = await fs.readFile(envPath, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  const safeValue = value.replace(/\r?\n/g, '').trim();
  const line = `${key}=${safeValue}`;
  const regex = new RegExp(`^${key}=.*$`, 'm');

  envText = regex.test(envText)
    ? envText.replace(regex, line)
    : `${envText.trimEnd()}\n${line}\n`;

  if (!/^IMAGE_MODEL=/m.test(envText)) {
    envText = `${envText.trimEnd()}\nIMAGE_MODEL=${defaultImageModel}\n`;
  }

  if (!/^PORT=/m.test(envText)) {
    envText = `${envText.trimEnd()}\nPORT=3333\n`;
  }

  if (!/^OPENAI_BASE_URL=/m.test(envText)) {
    envText = `${envText.trimEnd()}\nOPENAI_BASE_URL=${defaultBaseUrl}\n`;
  }

  await fs.writeFile(envPath, envText, 'utf8');
}

function joinUrl(baseUrl, pathname) {
  return `${baseUrl.replace(/\/+$/, '')}/${pathname.replace(/^\/+/, '')}`;
}

function getChatCompletionsUrl(baseUrl) {
  const rawBaseUrl = String(baseUrl || defaultBaseUrl).trim() || defaultBaseUrl;

  try {
    const parsed = new URL(rawBaseUrl);
    const basePath = parsed.pathname.replace(/\/+$/, '');
    if (basePath.endsWith('/chat/completions')) {
      return `${parsed.origin}${basePath}`;
    }
    const chatPath = basePath.endsWith('/v1') ? '/chat/completions' : '/v1/chat/completions';
    return `${parsed.origin}${basePath}${chatPath}`;
  } catch {
    return joinUrl(rawBaseUrl, '/chat/completions');
  }
}

function isGeminiNativeChatSettings(settings, model = '') {
  const baseUrl = String(settings?.baseUrl || '').toLowerCase();
  const modelId = String(model || settings?.chatModel || '').toLowerCase();
  return baseUrl.includes('superaiapi.com') && modelId.includes('gemini');
}

function isYdn99Settings(settings) {
  return String(settings?.baseUrl || '').toLowerCase().includes('ydn99.com');
}

async function fetchUpstream(url, options = {}, timeoutMs = upstreamRequestTimeoutMs) {
  try {
    return await fetch(url, {
      ...options,
      signal: options.signal || AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    if (error?.name === 'AbortError' || error?.name === 'TimeoutError') {
      throw new Error('上游 API 响应超时，请稍后重试，或降低分辨率/张数。');
    }
    throw error;
  }
}

function getGeminiGenerateContentUrl(baseUrl, model, apiKey) {
  const rawBaseUrl = String(baseUrl || 'https://superaiapi.com').trim() || 'https://superaiapi.com';
  const modelId = encodeURIComponent(String(model || '').trim());

  try {
    const parsed = new URL(rawBaseUrl);
    const basePath = parsed.pathname
      .replace(/\/+$/, '')
      .replace(/\/v1(?:beta)?$/i, '');
    const url = new URL(`${parsed.origin}${basePath}/v1beta/models/${modelId}:generateContent`);
    url.searchParams.set('key', apiKey);
    return url.toString();
  } catch {
    const url = new URL(joinUrl(rawBaseUrl, `/v1beta/models/${modelId}:generateContent`));
    url.searchParams.set('key', apiKey);
    return url.toString();
  }
}

function toGeminiContents(messages) {
  let systemText = '';
  const contents = [];

  messages.forEach((message) => {
    const textContent = contentToPlainText(message.content);
    if (message.role === 'system') {
      systemText = systemText ? `${systemText}\n\n${textContent}` : textContent;
      return;
    }

    contents.push({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: textContent }],
    });
  });

  return {
    systemText,
    contents,
  };
}

function extractGeminiText(data) {
  return data?.candidates?.[0]?.content?.parts
    ?.map((part) => part?.text || '')
    .filter(Boolean)
    .join('')
    .trim() || '';
}

function getAnalysisModelCandidates(preferredModel = '', baseUrl = activeBaseUrl) {
  const providerSpecificModels = baseUrl.includes('apimart.ai')
    ? ['gpt-4o', 'gpt-4.1', 'gpt-4.1-mini', 'chatgpt-4o-latest']
    : ['gpt-4.1-mini', 'gpt-4.1', 'gpt-4o'];

  return [...new Set([preferredModel, defaultAnalysisModel, ...providerSpecificModels].filter(Boolean))];
}

function extractSseTextPayload(payload) {
  const chunks = String(payload)
    .split(/\r?\n\r?\n/)
    .map((part) => part.trim())
    .filter((part) => part.startsWith('data:'));

  let text = '';

  for (const chunk of chunks) {
    const data = chunk.slice(5).trim();

    if (!data || data === '[DONE]') {
      continue;
    }

    try {
      const parsed = JSON.parse(data);
      const delta = parsed?.choices?.[0]?.delta?.content;
      if (typeof delta === 'string') {
        text += delta;
      }
    } catch {
      continue;
    }
  }

  return text.trim();
}

function extractAnalysisText(completion) {
  if (!completion) {
    return '';
  }

  if (typeof completion === 'string') {
    return extractSseTextPayload(completion);
  }

  const directMessage = completion.choices?.[0]?.message?.content;
  if (typeof directMessage === 'string') {
    return directMessage.trim();
  }

  if (Array.isArray(directMessage)) {
    const text = directMessage
      .map((item) => item?.text || item?.content || '')
      .filter(Boolean)
      .join('');
    if (text) {
      return text.trim();
    }
  }

  const outputText = completion.output_text;
  if (typeof outputText === 'string') {
    return outputText.trim();
  }

  return '';
}

function isInsufficientBalanceErrorMessage(message = '') {
  const normalized = String(message).toLowerCase();
  return normalized.includes('insufficient balance') || (normalized.includes('402') && normalized.includes('top up'));
}

async function analyzeImageLayers({ dataUrl, preferredModel, prompt, apiClient, baseUrl }) {
  const models = getAnalysisModelCandidates(preferredModel, baseUrl);
  const failures = [];

  for (const model of models) {
    try {
      const completion = await apiClient.chat.completions.create({
        model,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: dataUrl } },
            ],
          },
        ],
        temperature: 0.4,
      });

      const analysis = extractAnalysisText(completion);

      if (analysis) {
        return { analysis, model, failures };
      }

      failures.push({ model, message: 'empty analysis response' });
    } catch (error) {
      const message = error?.message || 'unknown upstream error';
      failures.push({
        model,
        message,
      });

      if (isInsufficientBalanceErrorMessage(message)) {
        throw new Error(`图片元素分析失败：当前 API 账户余额不足。请充值，或更换有余额的 API key / API 地址后再试。原始错误：${message}`);
      }
    }
  }

  const lastFailure = failures.at(-1);
  const detail = failures.map((item) => `${item.model}: ${item.message}`).join(' | ');
  throw new Error(
    `图片元素分析失败。已尝试模型: ${models.join(', ')}。${lastFailure ? `最后错误: ${lastFailure.message}` : ''}${detail ? ` 详细信息: ${detail}` : ''}`,
  );
}

async function apimartRequest(settings, pathname, options = {}) {
  const { retries = 3, ...fetchOptions } = options;
  const attempts = Number(retries);
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(joinUrl(settings.baseUrl, pathname), {
        ...fetchOptions,
        headers: {
          Authorization: `Bearer ${settings.apiKey}`,
          'Content-Type': 'application/json',
          ...(fetchOptions.headers || {}),
        },
      });
      const text = await response.text();
      let data = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          if (response.status === 524 || /cloudflare/i.test(text)) {
            throw new Error('上游生图 API 超时（524）。这通常是接口服务太慢或繁忙导致的，请稍后重试，或降低分辨率/张数，或更换 API 地址。');
          }
          throw new Error(`API 返回了无法解析的响应：${response.status} ${text.slice(0, 300)}`);
        }
      }

      if (!response.ok || (data.code && data.code !== 200)) {
        const message = data?.error?.message || data?.message || data?.error || `请求失败：${response.status}`;
        if (response.status === 524) {
          throw new Error('上游生图 API 超时（524）。这通常是接口服务太慢或繁忙导致的，请稍后重试，或降低分辨率/张数，或更换 API 地址。');
        }
        throw new Error(message);
      }

      return data;
    } catch (error) {
      lastError = error;
      const message = error?.message || '';
      const retryable = /524|超时|timeout|temporarily|try again later/i.test(message);

      if (!retryable || attempt === attempts) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 1200 * attempt));
    }
  }

  throw lastError;
}

async function uploadImageToApimart(settings, dataUrl, filename = `reference-${Date.now()}.png`) {
  const parsed = parseImageDataUrl(dataUrl);

  if (!parsed) {
    throw new Error('参考图格式不支持，请上传 PNG/JPG/WebP 图片。');
  }

  if (parsed.buffer.byteLength > 20 * 1024 * 1024) {
    throw new Error('参考图超过 APIMart 20MB 上传限制。');
  }

  const formData = new FormData();
  const extension = extensionFromMime(parsed.mimeType);
  const safeName = String(filename || `reference.${extension}`)
    .trim()
    .replace(/[\\/:*?"<>|]+/g, '-');
  const uploadName = /\.[a-z0-9]+$/i.test(safeName) ? safeName : `${safeName}.${extension}`;
  formData.append('file', new Blob([parsed.buffer], { type: parsed.mimeType }), uploadName);

  const response = await fetch(joinUrl(settings.baseUrl, '/uploads/images'), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${settings.apiKey}`,
    },
    body: formData,
  });
  const text = await response.text();
  let data = {};

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`图片上传接口返回了无法解析的响应：${response.status} ${text.slice(0, 300)}`);
    }
  }

  if (!response.ok || !data.url) {
    const message = data?.error?.message || data?.message || data?.error || `图片上传失败：${response.status}`;
    throw new Error(message);
  }

  return data.url;
}

async function resolveApimartImageUrls(settings, imageUrls, referenceImages) {
  const candidates = imageUrls.length > 0
    ? imageUrls.map((url, index) => ({ url, name: `reference-${index + 1}.png` }))
    : referenceImages.map((item, index) => ({
      url: item.dataUrl,
      name: item.name || `reference-${index + 1}.png`,
    }));

  const resolved = [];

  for (const item of candidates.slice(0, 16)) {
    if (/^https?:\/\//i.test(item.url)) {
      resolved.push(item.url);
      continue;
    }

    if (/^data:image\/(png|jpe?g|webp);base64,/i.test(item.url)) {
      resolved.push(await uploadImageToApimart(settings, item.url, item.name));
    }
  }

  return resolved;
}

async function generateWithApimart(settings, { prompt, size, resolution, count, officialFallback, imageUrls, model }) {
  const submissions = [];
  const requestModel = model || settings.model;

  for (let index = 0; index < count; index += 1) {
    submissions.push(apimartRequest(settings, '/images/generations', {
      method: 'POST',
      body: JSON.stringify({
        model: requestModel,
        prompt,
        n: 1,
        size,
        resolution,
        official_fallback: officialFallback,
        ...(requestModel !== 'gpt-image-2' ? { background: 'transparent' } : {}),
        ...(imageUrls.length > 0 ? { image_urls: imageUrls } : {}),
      }),
    }));
  }

  const results = await Promise.all(submissions);
  const taskIds = results
    .flatMap((result) => result?.data || [])
    .map((item) => item.task_id)
    .filter(Boolean);

  if (taskIds.length === 0) {
    throw new Error('APIMart 没有返回 task_id。');
  }

  return {
    taskId: taskIds[0],
    taskIds,
    status: 'submitted',
  };
}

function collectYdn99Images(data) {
  const candidates = [
    ...(Array.isArray(data?.data) ? data.data : []),
    ...(Array.isArray(data?.images) ? data.images : []),
    ...(Array.isArray(data?.output) ? data.output : []),
    ...(Array.isArray(data?.result?.images) ? data.result.images : []),
  ];

  if (data?.data && !Array.isArray(data.data)) {
    candidates.push(data.data);
  }
  if (data?.image) {
    candidates.push(data.image);
  }

  return candidates
    .map((item) => {
      if (typeof item === 'string') {
        return /^https?:\/\//i.test(item)
          ? { url: item }
          : { b64_json: item };
      }

      const b64Json = item?.b64_json || item?.base64 || item?.image_base64;
      const url = item?.url || item?.image_url || item?.imageUrl;
      return {
        b64_json: String(b64Json || '').replace(/^data:image\/(?:png|jpe?g|webp);base64,/i, ''),
        url: String(Array.isArray(url) ? url[0] : url || ''),
      };
    })
    .filter((item) => item.b64_json || /^https?:\/\//i.test(item.url));
}

function normalizeYdn99ImageModel(model) {
  const requested = String(model || '').trim();
  const normalized = requested
    .toLowerCase()
    .replace(/[\u2010-\u2015\u2212]/g, '-');

  if (!requested || normalized.includes('dall-e') || normalized.includes('dalle')) {
    return defaultImageModel;
  }

  return requested;
}

function getYdn99TaskId(data) {
  return String(data?.id || data?.task_id || data?.data?.id || data?.data?.task_id || data?.data?.[0]?.id || data?.data?.[0]?.task_id || '').trim();
}

function normalizeYdn99TaskStatus(status) {
  const normalized = String(status || '').toLowerCase();

  if (['success', 'succeeded', 'completed', 'complete', 'done', 'finished'].includes(normalized)) {
    return 'completed';
  }

  if (['failed', 'error', 'cancelled', 'canceled', 'failure'].includes(normalized)) {
    return 'failed';
  }

  return 'processing';
}

async function ydn99Request(settings, pathname, body = null, { method = 'POST', timeoutMs = upstreamRequestTimeoutMs } = {}) {
  const response = await fetchUpstream(joinUrl(settings.baseUrl, pathname), {
    method,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${settings.apiKey}`,
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  }, timeoutMs);
  const text = await response.text();
  let data = {};

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`YDN99 返回了无法解析的响应：${response.status} ${text.slice(0, 300)}`);
    }
  }

  if (!response.ok) {
    const message = data?.error?.message || data?.message || data?.error || `YDN99 请求失败：${response.status}`;
    throw new Error(message);
  }

  return data;
}

function getOfficialImageSize(aspectRatio) {
  if (['story', 'portrait', 'verticalClassic', 'fourFive', 'tall', 'verticalCinema'].includes(aspectRatio)) {
    return '1024x1536';
  }

  if (['widescreen', 'landscape', 'classic', 'fiveFour', 'tripleWide', 'panorama', 'cinema'].includes(aspectRatio)) {
    return '1536x1024';
  }

  return '1024x1024';
}

function getYdn99ImageSize(aspectRatio, resolution) {
  return superAiSizes[resolution]?.[aspectRatio] || getOfficialImageSize(aspectRatio);
}

async function getYdn99ReferenceFiles({ imageUrls = [], referenceImages = [] }) {
  const references = imageUrls.length > 0
    ? imageUrls.map((url, index) => ({ dataUrl: url, name: `reference-${index + 1}.png` }))
    : referenceImages.map((item, index) => ({
      dataUrl: item.dataUrl,
      name: item.name || `reference-${index + 1}.png`,
    }));
  const files = [];

  for (const item of references.slice(0, 16)) {
    let parsed = null;

    if (/^data:image\/(?:png|jpe?g|webp);base64,/i.test(item.dataUrl)) {
      parsed = parseImageDataUrl(item.dataUrl);
    } else if (/^https?:\/\//i.test(item.dataUrl)) {
      const response = await fetchUpstream(item.dataUrl);

      if (!response.ok) {
        throw new Error(`参考图下载失败：${response.status}`);
      }

      const mimeType = response.headers.get('content-type') || 'image/png';
      parsed = {
        mimeType,
        buffer: Buffer.from(await response.arrayBuffer()),
      };
    }

    if (!parsed) {
      continue;
    }

    const extension = extensionFromMime(parsed.mimeType);
    const safeName = String(item.name || `reference.${extension}`)
      .trim()
      .replace(/[\\/:*?"<>|]+/g, '-');
    const fileName = /\.[a-z0-9]+$/i.test(safeName) ? safeName : `${safeName}.${extension}`;
    files.push({
      fileName,
      mimeType: parsed.mimeType,
      buffer: parsed.buffer,
    });
  }

  return files;
}

function createYdn99ImageFormData({ requestModel, prompt, count, size, kind, referenceFiles = [] }) {
  const formData = new FormData();
  formData.append('model', requestModel);
  formData.append('prompt', prompt);
  formData.append('n', String(count));
  formData.append('size', size);
  formData.append('quality', 'auto');
  formData.append('output_format', 'png');
  formData.append('input_fidelity', 'high');

  referenceFiles.forEach((file) => {
    formData.append('image[]', new Blob([file.buffer], { type: file.mimeType }), file.fileName);
  });

  return formData;
}

async function ydn99MultipartImageRequest(settings, pathname, formData, label) {
  const response = await fetchUpstream(joinUrl(settings.baseUrl, pathname), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${settings.apiKey}`,
    },
    body: formData,
  }, upstreamImageRequestTimeoutMs);
  const text = await response.text();
  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`${label}返回了无法解析的响应：${response.status} ${text.slice(0, 300)}`);
  }

  if (!response.ok) {
    const message = data?.error?.message || data?.message || data?.error || `${label}请求失败：${response.status}`;
    throw new Error(message);
  }

  return data;
}

async function createYdn99ImageTask(settings, { prompt, aspectRatio, resolution, count, model }) {
  return generateWithYdn99(settings, {
    prompt,
    aspectRatio,
    resolution,
    count,
    model,
    kind: 'create',
    imageUrls: [],
    referenceImages: [],
  });

  const requestModel = normalizeYdn99ImageModel(model || settings.model);
  const size = aspectSizes[aspectRatio] && aspectSizes[aspectRatio] !== 'auto'
    ? aspectSizes[aspectRatio]
    : '1:1';
  const body = {
    model: requestModel,
    prompt,
    n: count,
    size,
    resolution: resolution === '4k' ? '4k' : '1k',
    imageResolution: resolution === '4k' ? '4k' : '1k',
    imageSizePreset: size,
  };
  const data = await ydn99Request(settings, '/images/generations', body);
  const taskId = getYdn99TaskId(data);

  if (!taskId) {
    const images = collectYdn99Images(data).slice(0, count);

    if (images.length) {
      return { taskId: '', images, status: 'completed', size, model: requestModel, raw: data };
    }

    throw new Error('YDN99 没有返回任务 id 或图片数据。');
  }

  return {
    taskId,
    status: normalizeYdn99TaskStatus(data.status || data.data?.[0]?.status),
    size,
    model: requestModel,
    raw: data,
  };
}

async function getYdn99Task(settings, taskId) {
  const data = await ydn99Request(settings, `/tasks/${encodeURIComponent(taskId)}`, null, { method: 'GET' });
  const taskData = Array.isArray(data?.data)
    ? data.data.find((item) => String(item?.id || item?.task_id || '') === String(taskId)) || data.data[0]
    : data?.data || data;
  const status = normalizeYdn99TaskStatus(taskData?.status || data?.status);
  const imageUrls = [
    ...(Array.isArray(taskData?.imageUrls) ? taskData.imageUrls : []),
    ...(Array.isArray(taskData?.image_urls) ? taskData.image_urls : []),
    ...(Array.isArray(taskData?.images) ? taskData.images.map((item) => item?.url || item?.image_url || item).filter(Boolean) : []),
  ].filter((url) => /^https?:\/\//i.test(String(url || '')));
  const images = collectYdn99Images(taskData);
  const error = taskData?.error?.message || taskData?.error || taskData?.message || data?.error?.message || data?.message;

  return {
    taskId,
    status,
    imageUrl: imageUrls[0] || images[0]?.url || '',
    imageUrls: imageUrls.length ? imageUrls : images.map((item) => item.url).filter(Boolean),
    base64Image: images[0]?.b64_json || '',
    base64Images: images.map((item) => item.b64_json).filter(Boolean),
    error,
    raw: data,
  };
}

async function generateWithYdn99(settings, meta) {
  const requestModel = normalizeYdn99ImageModel(meta.model || settings.model);
  const size = getYdn99ImageSize(meta.aspectRatio, meta.resolution);
  const referenceFiles = await getYdn99ReferenceFiles(meta);
  let data;

  if (referenceFiles.length > 0) {
    try {
      data = await ydn99MultipartImageRequest(
        settings,
        '/images/generations',
        createYdn99ImageFormData({ requestModel, prompt: meta.prompt, count: meta.count, size, kind: meta.kind, referenceFiles }),
        'YDN99 图片生成接口',
      );
    } catch (generationError) {
      console.warn('YDN99 multipart generations failed, retrying edits:', generationError?.message || generationError);
      data = await ydn99MultipartImageRequest(
        settings,
        '/images/edits',
        createYdn99ImageFormData({ requestModel, prompt: meta.prompt, count: meta.count, size, kind: meta.kind, referenceFiles }),
        'YDN99 图片编辑接口',
      );
    }
  } else {
    data = await ydn99Request(settings, '/images/generations', {
      model: requestModel,
      prompt: meta.prompt,
      n: meta.count,
      size,
      quality: 'auto',
      output_format: 'png',
    }, { timeoutMs: upstreamImageRequestTimeoutMs });
  }

  const images = collectYdn99Images(data).slice(0, meta.count);

  if (!images.length) {
    throw new Error(referenceFiles.length > 0
      ? 'YDN99 没有按官方图片编辑接口返回图片数据。'
      : 'YDN99 没有按官方图片接口返回图片数据。');
  }

  return {
    images,
    size,
    model: requestModel,
    raw: data,
  };
}
async function superAiRequest(settings, pathname, body = null, { method = 'POST', headers = {} } = {}) {
  const response = await fetch(joinUrl(settings.baseUrl, pathname), {
    method,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${settings.apiKey}`,
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const text = await response.text();
  let data = {};

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`SuperAI 返回了无法解析的响应：${response.status} ${text.slice(0, 300)}`);
    }
  }

  if (!response.ok) {
    const message = data?.error?.message || data?.message || data?.error || `SuperAI 请求失败：${response.status}`;
    throw new Error(message);
  }

  return data;
}

function collectSuperAiImages(data) {
  const base64Images = [];
  const imageUrls = [];
  const seen = new Set();

  function addBase64(value) {
    const text = String(value || '').trim();
    if (!text) {
      return;
    }
    const normalized = text.replace(/^data:image\/(?:png|jpe?g|webp);base64,/i, '');
    const key = `b64:${normalized.slice(0, 64)}`;
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    base64Images.push(normalized);
  }

  function addUrl(value) {
    const text = String(value || '').trim();
    if (!/^https?:\/\//i.test(text)) {
      return;
    }
    const key = `url:${text}`;
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    imageUrls.push(text);
  }

  function visit(value, key = '') {
    if (!value) {
      return;
    }

    if (typeof value === 'string') {
      if (/^data:image\/(?:png|jpe?g|webp);base64,/i.test(value)) {
        addBase64(value);
      } else if (/^https?:\/\//i.test(value) && /(image|url|output|result)/i.test(key)) {
        addUrl(value);
      }
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => visit(item, key));
      return;
    }

    if (typeof value === 'object') {
      addBase64(value.b64_json || value.base64 || value.image_base64);
      addUrl(value.url || value.image_url || value.output_url);

      Object.entries(value).forEach(([childKey, childValue]) => {
        visit(childValue, childKey);
      });
    }
  }

  visit(data?.data || data, 'data');
  return { base64Images, imageUrls };
}

function createSuperAiRequestId(prefix = 'gpt_image_2') {
  return `${prefix}_${Date.now()}_${crypto.randomBytes(6).toString('hex')}`;
}

function getSuperAiTaskId(data) {
  return String(data?.task_id || data?.id || data?.data?.task_id || data?.data?.id || '').trim();
}

function normalizeSuperAiTaskStatus(status) {
  const normalized = String(status || '').toLowerCase();

  if (['succeeded', 'success', 'completed', 'complete'].includes(normalized)) {
    return 'completed';
  }

  if (['failed', 'error', 'cancelled', 'canceled'].includes(normalized)) {
    return 'failed';
  }

  return 'processing';
}

async function createSuperAiImageTask(settings, { prompt, aspectRatio, resolution, count, imageUrls, referenceImages, model }) {
  const requestModel = model || settings.model;
  const size = superAiSizes[resolution]?.[aspectRatio];

  if (!size) {
    throw new Error(`SuperAI 的 ${resolution.toUpperCase()} 不支持当前宽高比 ${aspectSizes[aspectRatio] || aspectRatio}。请按当前分辨率支持的比例重新选择。`);
  }

  const references = imageUrls.length > 0
    ? imageUrls
    : referenceImages.map((item) => item.dataUrl).filter(Boolean);
  const hasReferences = references.length > 0;
  const endpoint = hasReferences ? '/images/tasks/edits' : '/images/tasks';
  const requestId = createSuperAiRequestId();
  const body = {
    model: requestModel === 'gpt-image-2-all' ? 'gpt-image-2' : requestModel,
    prompt,
    n: count,
    size,
    quality: 'auto',
    format: 'png',
    ...(hasReferences ? {
      images: references.slice(0, 16).map((imageUrl) => ({ image_url: imageUrl })),
    } : {}),
  };
  const data = await superAiRequest(settings, endpoint, body, {
    headers: { 'X-Oneapi-Request-Id': requestId },
  });
  const taskId = getSuperAiTaskId(data);

  if (!taskId) {
    throw new Error('SuperAI 没有返回 task_id。');
  }

  return {
    taskId,
    status: normalizeSuperAiTaskStatus(data.status),
    size,
    raw: data,
  };
}

async function createSuperAiEditTask(settings, { prompt, imageDataUrl, maskDataUrl, size, quality, model, referenceImages = [] }) {
  const requestModel = model === 'gpt-image-2-all' ? 'gpt-image-2' : (model || settings.model || 'gpt-image-2');
  const requestId = createSuperAiRequestId();
  const images = [
    { image_url: imageDataUrl },
    ...referenceImages
      .map((item) => String(item?.dataUrl || '').trim())
      .filter(Boolean)
      .map((dataUrl) => ({ image_url: dataUrl })),
  ];
  const body = {
    model: requestModel,
    prompt,
    n: 1,
    size,
    quality,
    format: 'png',
    images,
    ...(maskDataUrl ? { mask: maskDataUrl } : {}),
  };
  const data = await superAiRequest(settings, '/images/tasks/edits', body, {
    headers: { 'X-Oneapi-Request-Id': requestId },
  });
  const taskId = getSuperAiTaskId(data);

  if (!taskId) {
    throw new Error('SuperAI 没有返回编辑任务 task_id。');
  }

  return {
    taskId,
    status: normalizeSuperAiTaskStatus(data.status),
    model: requestModel,
    requestId,
    raw: data,
  };
}

function normalizeApimartEditModel(model) {
  const requested = String(model || '').trim();

  if (!requested || requested === 'gpt-image-2' || requested === 'gpt-image-2-all') {
    return 'gpt-image-2-official';
  }

  return requested;
}

async function createApimartEditTask(settings, { prompt, imageDataUrl, maskDataUrl, size, quality, model, referenceImages = [] }) {
  const requestModel = normalizeApimartEditModel(model || settings.model);
  const imageUrl = await uploadImageToApimart(settings, imageDataUrl, 'image-edit-source.png');
  const referenceUrls = [];

  for (const [index, item] of referenceImages.entries()) {
    const dataUrl = String(item?.dataUrl || '').trim();

    if (dataUrl) {
      referenceUrls.push(await uploadImageToApimart(settings, dataUrl, `image-edit-reference-${index + 1}.png`));
    }
  }

  const maskUrl = maskDataUrl
    ? await uploadImageToApimart(settings, maskDataUrl, 'image-edit-mask.png')
    : '';
  const result = await apimartRequest(settings, '/images/generations', {
    method: 'POST',
    body: JSON.stringify({
      model: requestModel,
      prompt,
      n: 1,
      size,
      quality,
      output_format: 'png',
      image_urls: [imageUrl, ...referenceUrls],
      ...(maskUrl ? { mask_url: maskUrl } : {}),
    }),
  });
  const taskId = (result?.data || [])
    .map((item) => item?.task_id || item?.id)
    .find(Boolean);

  if (!taskId) {
    throw new Error('APIMart 没有返回编辑任务 task_id。');
  }

  return {
    taskId,
    status: 'submitted',
    model: requestModel,
    imageUrl,
    maskUrl,
    raw: result,
  };
}

async function getSuperAiTask(settings, taskId) {
  const data = await superAiRequest(settings, `/images/tasks/${encodeURIComponent(taskId)}`, null, { method: 'GET' });
  const status = normalizeSuperAiTaskStatus(data.status || data.data?.status);
  const images = collectSuperAiImages(data);
  const error = data.error?.message || data.error || data.message || data.data?.error?.message;

  return {
    taskId,
    status,
    imageUrl: images.imageUrls[0] || '',
    imageUrls: images.imageUrls,
    base64Image: images.base64Images[0] || '',
    base64Images: images.base64Images,
    error,
    raw: data,
  };
}

async function generateWithSuperAi(settings, meta) {
  const task = await createSuperAiImageTask(settings, meta);

  for (let attempt = 1; attempt <= imageTaskPollAttempts; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, attempt === 1 ? 5000 : 4000));
    const result = await getSuperAiTask(settings, task.taskId);

    if (result.status === 'completed' && (result.imageUrl || result.base64Image)) {
      return {
        base64Images: result.base64Images?.length ? result.base64Images : (result.base64Image ? [result.base64Image] : []),
        imageUrls: result.imageUrls?.length ? result.imageUrls : (result.imageUrl ? [result.imageUrl] : []),
        size: task.size,
        raw: result.raw,
      };
    }

    if (result.status === 'failed') {
      throw new Error(result.error || 'SuperAI 异步任务失败。');
    }
  }

  throw new Error('SuperAI 异步任务还没完成。');
}

async function getApimartTask(settings, taskId) {
  const task = await apimartRequest(settings, `/tasks/${taskId}`);
  const taskData = task.data;
  const status = taskData?.status;
  const imageUrl = taskData?.result?.images?.[0]?.url?.[0];

  return {
    taskId,
    status,
    progress: taskData?.progress,
    imageUrl,
    cost: taskData?.cost,
    expiresAt: taskData?.result?.images?.[0]?.expires_at,
    error: taskData?.error?.message,
    raw: taskData,
  };
}

async function persistCompletedTaskResult(taskId, result, meta, settings) {
  const existingHistoryItem = await findHistoryItemByTaskId(taskId, meta.userId);
  if (existingHistoryItem) {
    return {
      ...result,
      status: 'completed',
      remoteImageUrl: existingHistoryItem.remoteImageUrl || result.imageUrl,
      imageUrl: existingHistoryItem.imageUrl,
      historyItem: existingHistoryItem,
      historyItems: [existingHistoryItem],
    };
  }

  const remoteImageUrl = result.imageUrl || '';
  const generatedSourceImageUrl = result.base64Image
    ? await saveBase64Image(result.base64Image, 'png')
    : await saveRemoteImage(remoteImageUrl);
  let imageUrl = generatedSourceImageUrl;

  const referenceImages = await saveReferenceImages(meta.referenceImages || []);
  const historyItem = {
    id: `${Date.now()}-${taskId}`,
    userId: meta.userId,
    taskId,
    imageUrl,
    generatedSourceImageUrl,
    remoteImageUrl,
    prompt: meta.prompt || '',
    size: meta.size || '',
    resolution: meta.resolution || '',
    aspectRatio: meta.aspectRatio || '',
    model: meta.model || settings.model,
    referenceImages,
    targetName: meta.targetName || '',
    targetSize: meta.targetSize || '',
    kind: meta.kind || (meta.targetName || meta.targetSize ? 'resize' : 'create'),
    createdAt: new Date().toISOString(),
  };
  await addHistoryItem(historyItem);

  const persistedResult = {
    ...result,
    status: 'completed',
    remoteImageUrl,
    imageUrl,
    generatedSourceImageUrl,
    historyItem,
    historyItems: [historyItem],
  };

  if (historyItem.kind === 'layer') {
    try {
      const sourceBuffer = await fs.readFile(getGeneratedFilePath(imageUrl));
      const cutoutImageUrl = await removeBackgroundToGeneratedFile(sourceBuffer);
      persistedResult.cutoutHistoryItem = {
        id: `${Date.now()}-${taskId}-cutout`,
        userId: meta.userId,
        taskId,
        imageUrl: cutoutImageUrl,
        prompt: meta.prompt || '',
        size: meta.size || '',
        resolution: '自动抠图',
        aspectRatio: meta.aspectRatio || '',
        model: 'background-removal',
        referenceImages,
        targetName: `${meta.targetName || '分层'} 抠图版`,
        targetSize: meta.targetSize || '分层',
        kind: 'layer',
        sourceImageUrl: imageUrl,
        createdAt: new Date().toISOString(),
      };
      await addHistoryItem(persistedResult.cutoutHistoryItem);
    } catch (error) {
      persistedResult.cutoutError = error?.message || '自动抠图失败';
    }
  }

  return persistedResult;
}

function createLocalTaskId(prefix = 'local') {
  return `${prefix}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
}

async function runYdn99GenerationTask(taskId, settings, meta) {
  if (backgroundTasks.has(taskId)) {
    return;
  }

  backgroundTasks.set(taskId, { status: 'processing' });

  try {
    const result = await generateWithYdn99(settings, {
      ...meta,
      count: 1,
    });
    const image = result.images?.[0];

    if (!image) {
      throw new Error('YDN99 没有返回图片数据。');
    }

    const savedReferences = await saveReferenceImages(meta.referenceImages || []);
    const imageUrl = await saveGeneratedImageResult(image);
    const historyItem = {
      id: `${Date.now()}-${taskId}`,
      userId: meta.userId,
      taskId,
      imageUrl,
      prompt: meta.prompt || '',
      size: result.size || meta.size || '',
      resolution: meta.resolution || '',
      aspectRatio: meta.aspectRatio || '',
      model: result.model || meta.model || settings.model,
      referenceImages: savedReferences,
      targetName: meta.targetName || '',
      targetSize: meta.targetSize || '',
      kind: meta.kind || 'create',
      createdAt: new Date().toISOString(),
    };
    await addHistoryItem(historyItem);

    backgroundTasks.set(taskId, {
      status: 'completed',
      result: {
        taskId,
        status: 'completed',
        imageUrl,
        historyItem,
        historyItems: [historyItem],
        size: historyItem.size,
        resolution: historyItem.resolution,
        aspectRatio: historyItem.aspectRatio,
        model: historyItem.model,
        referenceImages: savedReferences,
        targetName: historyItem.targetName,
        targetSize: historyItem.targetSize,
        kind: historyItem.kind,
      },
    });
  } catch (error) {
    console.error(error);
    backgroundTasks.set(taskId, {
      status: 'failed',
      error: error?.message || 'YDN99 后台生成失败。',
    });
  }
}

async function runBackgroundTaskPoll(taskId, settings, meta) {
  if (backgroundTasks.has(taskId)) {
    return;
  }

  backgroundTasks.set(taskId, { status: 'processing' });

  try {
    for (let attempt = 1; attempt <= backgroundTaskPollAttempts; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, attempt === 1 ? 5000 : 4000));
      const result = meta.provider === 'superai'
        ? await getSuperAiTask(settings, taskId)
        : meta.provider === 'ydn99'
          ? await getYdn99Task(settings, taskId)
          : await getApimartTask(settings, taskId);

      if (result.status === 'failed') {
        throw new Error(result.error || '异步任务失败。');
      }

      if (result.status === 'completed' && (result.imageUrl || result.base64Image)) {
        const persistedResult = await persistCompletedTaskResult(taskId, result, meta, settings);
        backgroundTasks.set(taskId, {
          status: 'completed',
          result: {
            ...persistedResult,
            size: meta.size || persistedResult.size,
            resolution: meta.resolution,
            aspectRatio: meta.aspectRatio,
            model: meta.model,
            targetName: meta.targetName,
            targetSize: meta.targetSize,
            kind: meta.kind,
          },
        });
        return;
      }
    }

    throw new Error('任务后台等待超时。');
  } catch (error) {
    console.error(error);
    backgroundTasks.set(taskId, {
      status: 'failed',
      error: error?.message || '后台任务失败。',
    });
  }
}

async function saveRemoteImage(imageUrl) {
  await fs.mkdir(generatedDir, { recursive: true });

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`图片下载失败：${response.status}`);
  }

  const contentType = response.headers.get('content-type') || 'image/png';
  const extension = contentType.includes('jpeg') || contentType.includes('jpg')
    ? 'jpg'
    : contentType.includes('webp')
      ? 'webp'
      : 'png';
  const fileName = `image-${Date.now()}.${extension}`;
  const filePath = path.join(generatedDir, fileName);
  const imageBuffer = Buffer.from(await response.arrayBuffer());

  await fs.writeFile(filePath, imageBuffer);
  return `/generated/${fileName}`;
}

async function saveBase64Image(imageBase64, extension = 'png') {
  await fs.mkdir(generatedDir, { recursive: true });
  const safeExtension = ['jpg', 'jpeg', 'png', 'webp'].includes(extension) ? extension : 'png';
  const fileName = `image-${Date.now()}-${Math.random().toString(16).slice(2)}.${safeExtension === 'jpeg' ? 'jpg' : safeExtension}`;
  const filePath = path.join(generatedDir, fileName);

  await fs.writeFile(filePath, Buffer.from(imageBase64, 'base64'));
  return `/generated/${fileName}`;
}

async function saveGeneratedImageResult(image) {
  if (image?.b64_json) {
    return saveBase64Image(image.b64_json, 'png');
  }

  if (image?.url) {
    return saveRemoteImage(image.url);
  }

  throw new Error('API 没有返回可保存的图片。');
}

function parseTargetSize(targetSize) {
  const match = String(targetSize || '').match(/(\d{2,5})\s*[x×]\s*(\d{2,5})/i);
  if (!match) {
    return null;
  }

  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 16 || height < 16) {
    return null;
  }

  return { width, height };
}

async function resizeGeneratedImageToTarget(imageUrl, targetSize) {
  const size = parseTargetSize(targetSize);
  if (!size) {
    return imageUrl;
  }

  const sourcePath = getGeneratedFilePath(imageUrl);
  const fileName = `resize-${Date.now()}-${Math.random().toString(16).slice(2)}.png`;
  const outputPath = path.join(generatedDir, fileName);

  await sharp(sourcePath)
    .rotate()
    .resize(size.width, size.height, {
      fit: 'contain',
      position: 'center',
      background: { r: 238, g: 238, b: 238, alpha: 1 },
    })
    .png()
    .toFile(outputPath);

  return `/generated/${fileName}`;
}

async function resizeGeneratedImageToExactTarget(imageUrl, targetSize) {
  const size = parseTargetSize(targetSize);
  if (!size) {
    return imageUrl;
  }

  const sourcePath = getGeneratedFilePath(imageUrl);
  const fileName = `resize-${Date.now()}-${Math.random().toString(16).slice(2)}.png`;
  const outputPath = path.join(generatedDir, fileName);

  await sharp(sourcePath)
    .rotate()
    .resize(size.width, size.height, {
      fit: 'contain',
      position: 'center',
      background: { r: 238, g: 238, b: 238, alpha: 1 },
    })
    .png()
    .toFile(outputPath);

  return `/generated/${fileName}`;
}

function getGeneratedFilePath(imageUrl) {
  const fileName = path.basename(String(imageUrl || ''));
  return path.join(generatedDir, fileName);
}

async function removeBackgroundToGeneratedFile(inputBuffer) {
  const { removeBackground } = await import('@imgly/background-removal-node');
  const inputBlob = new Blob([inputBuffer], { type: 'image/png' });
  const blob = await removeBackground(inputBlob, {
    model: 'medium',
    output: {
      format: 'image/png',
      type: 'foreground',
    },
  });
  const outputBuffer = Buffer.from(await blob.arrayBuffer());
  const fileName = `cutout-${Date.now()}.png`;
  const filePath = path.join(generatedDir, fileName);
  await fs.writeFile(filePath, outputBuffer);
  return `/generated/${fileName}`;
}

function extensionFromMime(mimeType) {
  if (mimeType.includes('jpeg') || mimeType.includes('jpg')) {
    return 'jpg';
  }

  if (mimeType.includes('webp')) {
    return 'webp';
  }

  return 'png';
}

function parseImageDataUrl(dataUrl) {
  const match = String(dataUrl || '').trim().match(/^data:(image\/(?:png|jpe?g|webp));base64,(.+)$/i);

  if (!match) {
    return null;
  }

  return {
    mimeType: match[1].toLowerCase(),
    buffer: Buffer.from(match[2], 'base64'),
  };
}

async function alphaMaskToBlackWhiteDataUrl(maskDataUrl) {
  const parsed = parseImageDataUrl(maskDataUrl);

  if (!parsed) {
    return maskDataUrl;
  }

  const { data, info } = await sharp(parsed.buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const output = Buffer.alloc(data.length);

  for (let index = 0; index < data.length; index += 4) {
    const alpha = data[index + 3];
    const value = alpha < 128 ? 255 : 0;
    output[index] = value;
    output[index + 1] = value;
    output[index + 2] = value;
    output[index + 3] = 255;
  }

  const png = await sharp(output, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  }).png().toBuffer();

  return `data:image/png;base64,${png.toString('base64')}`;
}

function roundImageEditSize(value, mode = 'ceil') {
  const numericValue = Number(value || 16);
  const method = mode === 'floor' ? Math.floor : Math.ceil;
  return Math.max(16, method(numericValue / 16) * 16);
}

function getSafeImageEditCanvasSize(width, height) {
  let safeWidth = roundImageEditSize(width);
  let safeHeight = roundImageEditSize(height);
  const maxAspectRatio = 3;
  const minPixels = 655360;
  const maxPixels = 8294400;
  const normalizeAspectRatio = () => {
    if (safeWidth / safeHeight > maxAspectRatio) {
      safeHeight = roundImageEditSize(safeWidth / maxAspectRatio);
    } else if (safeHeight / safeWidth > maxAspectRatio) {
      safeWidth = roundImageEditSize(safeHeight / maxAspectRatio);
    }
  };

  normalizeAspectRatio();

  if (safeWidth * safeHeight < minPixels) {
    const scale = Math.sqrt(minPixels / (safeWidth * safeHeight));
    safeWidth = roundImageEditSize(safeWidth * scale);
    safeHeight = roundImageEditSize(safeHeight * scale);
    normalizeAspectRatio();
  }

  if (safeWidth * safeHeight > maxPixels) {
    const scale = Math.sqrt(maxPixels / (safeWidth * safeHeight));
    safeWidth = roundImageEditSize(safeWidth * scale, 'floor');
    safeHeight = roundImageEditSize(safeHeight * scale, 'floor');

    for (let i = 0; i < 512 && safeWidth * safeHeight > maxPixels; i += 1) {
      if (safeWidth >= safeHeight && safeWidth > 16) {
        safeWidth -= 16;
      } else if (safeHeight > 16) {
        safeHeight -= 16;
      } else {
        break;
      }
    }
  }

  return { width: safeWidth, height: safeHeight };
}

function parseEditSize(size) {
  const match = String(size || '').match(/^(\d{1,5})x(\d{1,5})$/);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : null;
}

async function normalizeEditImageAndMaskDimensions(imageDataUrl, maskDataUrl, requestedSize) {
  const parsedImage = parseImageDataUrl(imageDataUrl);

  if (!parsedImage) {
    return { imageDataUrl, maskDataUrl, size: requestedSize };
  }

  const imageMetadata = await sharp(parsedImage.buffer).metadata();
  const requested = parseEditSize(requestedSize);
  const baseWidth = requested?.width || imageMetadata.width || 1024;
  const baseHeight = requested?.height || imageMetadata.height || 1024;
  const safeSize = getSafeImageEditCanvasSize(baseWidth, baseHeight);
  const targetWidth = safeSize.width;
  const targetHeight = safeSize.height;
  const contentScale = Math.min(1, targetWidth / baseWidth, targetHeight / baseHeight);
  const contentWidth = Math.min(targetWidth, roundImageEditSize(baseWidth * contentScale));
  const contentHeight = Math.min(targetHeight, roundImageEditSize(baseHeight * contentScale));
  const offsetX = Math.floor((targetWidth - contentWidth) / 2);
  const offsetY = Math.floor((targetHeight - contentHeight) / 2);
  const resizedImage = await sharp(parsedImage.buffer)
    .ensureAlpha()
    .resize(contentWidth, contentHeight, { fit: 'fill' })
    .png()
    .toBuffer();
  const imagePng = await sharp({
    create: {
      width: targetWidth,
      height: targetHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: resizedImage, left: offsetX, top: offsetY }])
    .png()
    .toBuffer();
  let nextMaskDataUrl = maskDataUrl;

  if (maskDataUrl) {
    const parsedMask = parseImageDataUrl(maskDataUrl);

    if (parsedMask) {
      const resizedMask = await sharp(parsedMask.buffer)
        .ensureAlpha()
        .resize(contentWidth, contentHeight, { fit: 'fill' })
        .png()
        .toBuffer();
      const maskPng = await sharp({
        create: {
          width: targetWidth,
          height: targetHeight,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 255 },
        },
      })
        .composite([{ input: resizedMask, left: offsetX, top: offsetY }])
        .png()
        .toBuffer();
      nextMaskDataUrl = `data:image/png;base64,${maskPng.toString('base64')}`;
    }
  }

  return {
    imageDataUrl: `data:image/png;base64,${imagePng.toString('base64')}`,
    maskDataUrl: nextMaskDataUrl,
    size: `${targetWidth}x${targetHeight}`,
  };
}

async function saveReferenceImages(referenceImages) {
  await fs.mkdir(generatedDir, { recursive: true });

  const saved = [];

  for (const [index, item] of referenceImages.entries()) {
    const dataUrl = String(item.dataUrl || '').trim();
    const match = dataUrl.match(/^data:(image\/(?:png|jpe?g|webp));base64,(.+)$/i);

    if (!match) {
      continue;
    }

    const extension = extensionFromMime(match[1].toLowerCase());
    const fileName = `reference-${Date.now()}-${index}.${extension}`;
    const filePath = path.join(generatedDir, fileName);

    await fs.writeFile(filePath, Buffer.from(match[2], 'base64'));
    saved.push({
      name: String(item.name || `参考图 ${index + 1}`).trim(),
      imageUrl: `/generated/${fileName}`,
    });
  }

  return saved;
}

async function readImportantImages(userId = '') {
  try {
    const text = await fs.readFile(importantImagesPath, 'utf8');
    const items = JSON.parse(text.replace(/^\uFEFF/, ''));
    const list = Array.isArray(items) ? items : [];
    return userId ? list.filter((item) => item.userId === userId) : list;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeImportantImages(items) {
  await fs.mkdir(importantImagesDir, { recursive: true });
  await fs.writeFile(importantImagesPath, JSON.stringify(items, null, 2), 'utf8');
}

async function saveImportantImage({ userId, title, category, dataUrl }) {
  const parsed = parseImageDataUrl(dataUrl);
  if (!parsed) {
    throw new Error('请上传 PNG / JPG / WebP 图片。');
  }

  if (parsed.buffer.length > 12 * 1024 * 1024) {
    throw new Error('图片不能超过 12MB。');
  }

  await fs.mkdir(importantImagesDir, { recursive: true });
  const extension = extensionFromMime(parsed.mimeType);
  const id = `important-${Date.now()}-${crypto.randomBytes(6).toString('hex')}`;
  const fileName = `${id}.${extension}`;
  await fs.writeFile(path.join(importantImagesDir, fileName), parsed.buffer);

  const item = {
    id,
    userId,
    title: String(title || '重要素材').trim() || '重要素材',
    category: String(category || '默认').trim() || '默认',
    imageUrl: `/generated/important-images/${fileName}`,
    createdAt: new Date().toISOString(),
  };
  const items = await readImportantImages();
  const nextItems = [item, ...items].slice(0, 240);
  await writeImportantImages(nextItems);
  return item;
}

async function removeImportantImage(id, userId = '') {
  const items = await readImportantImages();
  const item = items.find((entry) => entry.id === id && (!userId || entry.userId === userId));
  if (!item) {
    return { item: null, items: userId ? items.filter((entry) => entry.userId === userId) : items };
  }

  const nextItems = items.filter((entry) => entry.id !== id);
  await writeImportantImages(nextItems);

  if (item.imageUrl?.startsWith('/generated/important-images/')) {
    const filePath = path.resolve(generatedDir, item.imageUrl.replace(/^\/generated\//, ''));
    const root = path.resolve(importantImagesDir);
    if (filePath.startsWith(`${root}${path.sep}`)) {
      await fs.rm(filePath, { force: true });
    }
  }

  return { item, items: userId ? nextItems.filter((entry) => entry.userId === userId) : nextItems };
}

async function readHistory(userId = '') {
  try {
    const text = await fs.readFile(historyPath, 'utf8');
    const history = JSON.parse(text);
    if (!userId) {
      return history;
    }
    return history.filter((entry) => entry.userId === userId);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function addHistoryItem(item) {
  await fs.mkdir(generatedDir, { recursive: true });
  const history = await readHistory();
  const nextHistory = [item, ...history].slice(0, 60);
  await fs.writeFile(historyPath, JSON.stringify(nextHistory, null, 2), 'utf8');
  return nextHistory;
}

async function findHistoryItemByTaskId(taskId, userId = '') {
  const history = await readHistory();
  return history.find((entry) => entry.taskId === taskId && (!userId || entry.userId === userId) && entry.model !== 'background-removal') || null;
}

async function removeHistoryItem(id, userId = '') {
  const history = await readHistory();
  const item = history.find((entry) => entry.id === id && (!userId || entry.userId === userId));

  if (!item) {
    return { item: null, history };
  }

  const nextHistory = history.filter((entry) => entry.id !== id);
  await fs.writeFile(historyPath, JSON.stringify(nextHistory, null, 2), 'utf8');

  const localImageUrls = [
    item.imageUrl,
    ...(Array.isArray(item.referenceImages) ? item.referenceImages.map((reference) => reference.imageUrl) : []),
  ].filter((imageUrl) => imageUrl?.startsWith('/generated/'));

  for (const imageUrl of localImageUrls) {
    const fileName = path.basename(imageUrl);
    const filePath = path.resolve(generatedDir, fileName);
    const generatedRoot = path.resolve(generatedDir);

    if (filePath.startsWith(`${generatedRoot}${path.sep}`)) {
      await fs.rm(filePath, { force: true });
    }
  }

  return { item, history: userId ? nextHistory.filter((entry) => entry.userId === userId) : nextHistory };
}

async function getPluginUser() {
  const configuredUser = await findUserByUsername(defaultConfiguredUsername);
  return configuredUser || {
    id: `plugin-${defaultConfiguredUsername}`,
    username: defaultConfiguredUsername,
    apiKey: '',
    chatApiKey: '',
    baseUrl: defaultBaseUrl,
    model: defaultImageModel,
    layerModel: defaultLayerImageModel,
    chatModel: defaultChatModel,
    apiEntryName: defaultApiEntryName,
  };
}

async function requirePluginAccess(req, res, next) {
  try {
    const configuredToken = String(process.env.PS_PLUGIN_TOKEN || process.env.PLUGIN_TOKEN || '').trim();
    const providedToken = String(req.get('x-plugin-token') || req.get('authorization')?.replace(/^Bearer\s+/i, '') || '').trim();

    if (configuredToken && !timingSafeEqualText(providedToken, configuredToken)) {
      return res.status(401).json({ error: '插件 token 不正确。' });
    }

    if (!configuredToken && !isLocalRequest(req)) {
      return res.status(403).json({ error: '插件接口默认只允许本机访问。线上部署请设置 PS_PLUGIN_TOKEN。' });
    }

    req.user = await getPluginUser();
    return next();
  } catch (error) {
    return next(error);
  }
}

async function imageUrlToDataUrl(imageUrl) {
  if (!imageUrl) {
    return '';
  }

  if (/^data:image\/(?:png|jpe?g|webp);base64,/i.test(imageUrl)) {
    return imageUrl;
  }

  if (/^\/generated\//i.test(imageUrl)) {
    const filePath = getGeneratedFilePath(imageUrl);
    const buffer = await fs.readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();
    const mimeType = extension === '.jpg' || extension === '.jpeg'
      ? 'image/jpeg'
      : extension === '.webp'
        ? 'image/webp'
        : 'image/png';
    return `data:${mimeType};base64,${buffer.toString('base64')}`;
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`图片下载失败：${response.status}`);
    }
    const contentType = response.headers.get('content-type') || 'image/png';
    const buffer = Buffer.from(await response.arrayBuffer());
    return `data:${contentType};base64,${buffer.toString('base64')}`;
  }

  return '';
}

async function enrichPluginImageResult(result) {
  const imageUrl = result?.imageUrl || result?.historyItem?.imageUrl || '';
  const cutoutImageUrl = result?.cutoutHistoryItem?.imageUrl || '';

  return {
    ...result,
    dataUrl: imageUrl ? await imageUrlToDataUrl(imageUrl) : '',
    cutoutDataUrl: cutoutImageUrl ? await imageUrlToDataUrl(cutoutImageUrl) : '',
  };
}

const psBridgeQueues = new Map();
const psBridgeIncomingQueues = new Map();

function normalizePsBridgeChannel(channel) {
  return String(channel || '')
    .trim()
    .replace(/[^a-z0-9_-]/gi, '')
    .slice(0, 64);
}

function normalizeBridgeImageUrl(req, imageUrl) {
  const raw = String(imageUrl || '').trim();

  if (/^\/generated\//i.test(raw) || /^data:image\/(?:png|jpe?g|webp);base64,/i.test(raw)) {
    return raw;
  }

  try {
    const parsed = new URL(raw, `${req.protocol}://${req.get('host')}`);
    if (parsed.host === req.get('host') && parsed.pathname.startsWith('/generated/')) {
      return parsed.pathname;
    }
    return parsed.toString();
  } catch {
    return raw;
  }
}

app.post('/api/ps-bridge/send', async (req, res) => {
  try {
    const channel = normalizePsBridgeChannel(req.body.channel);
    const imageUrl = normalizeBridgeImageUrl(req, req.body.imageUrl);
    const title = String(req.body.title || req.body.name || '画不完 AI 图片').trim().slice(0, 120);
    const openMode = req.body.openMode === 'document' ? 'document' : 'layer';

    if (!channel || channel.length < 4) {
      return res.status(400).json({ error: '缺少 PS 桥接码，至少 4 位。' });
    }

    if (!imageUrl) {
      return res.status(400).json({ error: '缺少要发送的图片。' });
    }

    const dataUrl = await imageUrlToDataUrl(imageUrl);
    if (!dataUrl) {
      return res.status(400).json({ error: '图片格式不支持。' });
    }

    const queue = psBridgeQueues.get(channel) || [];
    queue.push({
      id: `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
      title,
      openMode,
      dataUrl,
      createdAt: new Date().toISOString(),
    });
    psBridgeQueues.set(channel, queue.slice(-10));

    return res.json({ ok: true, queued: psBridgeQueues.get(channel).length });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error?.message || '发送到 Photoshop 失败。' });
  }
});

app.get('/api/ps-bridge/poll/:channel', (req, res) => {
  const channel = normalizePsBridgeChannel(req.params.channel);
  const queue = psBridgeQueues.get(channel) || [];
  const item = queue.shift();

  if (queue.length) {
    psBridgeQueues.set(channel, queue);
  } else {
    psBridgeQueues.delete(channel);
  }

  return res.json({ item: item || null });
});

app.post('/api/ps-bridge/from-ps', async (req, res) => {
  try {
    const channel = normalizePsBridgeChannel(req.body.channel);
    const title = String(req.body.title || req.body.name || 'Photoshop 图片').trim().slice(0, 120);
    const dataUrl = String(req.body.dataUrl || '').trim();
    const target = ['create', 'resize', 'layer', 'icon-redraw'].includes(req.body.target)
      ? req.body.target
      : 'create';

    if (!channel || channel.length < 4) {
      return res.status(400).json({ error: '缺少 PS 桥接码，至少 4 位。' });
    }

    const parsed = parseImageDataUrl(dataUrl);
    if (!parsed) {
      return res.status(400).json({ error: '图片格式不支持，请发送 PNG、JPG 或 WebP。' });
    }

    if (parsed.buffer.length > 25 * 1024 * 1024) {
      return res.status(413).json({ error: '图片超过 25MB，请缩小后再发送。' });
    }

    const queue = psBridgeIncomingQueues.get(channel) || [];
    queue.push({
      id: `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
      title,
      target,
      dataUrl,
      createdAt: new Date().toISOString(),
    });
    psBridgeIncomingQueues.set(channel, queue.slice(-10));

    return res.json({ ok: true, queued: psBridgeIncomingQueues.get(channel).length });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error?.message || '接收 Photoshop 图片失败。' });
  }
});

app.get('/api/ps-bridge/from-ps/poll/:channel', (req, res) => {
  const channel = normalizePsBridgeChannel(req.params.channel);
  const queue = psBridgeIncomingQueues.get(channel) || [];
  const item = queue.shift();

  if (queue.length) {
    psBridgeIncomingQueues.set(channel, queue);
  } else {
    psBridgeIncomingQueues.delete(channel);
  }

  return res.json({ item: item || null });
});

function getPluginMessages(req) {
  return Array.isArray(req.body.messages)
    ? req.body.messages
      .map((message) => ({
        role: ['system', 'user', 'assistant'].includes(message?.role) ? message.role : 'user',
        content: normalizeChatContent(message?.content),
      }))
      .filter((message) => hasChatContent(message.content))
      .slice(-32)
    : [];
}

app.use('/api/plugin', requirePluginAccess);

app.get('/api/plugin/health', (req, res) => {
  const settings = getUserApiSettings(req.user);
  res.json({
    ok: true,
    user: publicUser(req.user),
    hasApiKey: Boolean(settings.apiKey),
    hasChatApiKey: Boolean(settings.chatApiKey),
    model: settings.model,
    layerModel: settings.layerModel,
    chatModel: settings.chatModel,
    baseUrl: settings.baseUrl,
    apiEntryName: settings.apiEntryName,
  });
});

app.post('/api/plugin/chat', async (req, res) => {
  try {
    const settings = getUserApiSettings(req.user);
    const apiKey = settings.chatApiKey;

    if (!apiKey) {
      return res.status(400).json({ error: '还没有配置聊天 API key。' });
    }

    const model = String(req.body.model || settings.chatModel || defaultChatModel).trim();
    const messages = getPluginMessages(req);

    if (!messages.length) {
      return res.status(400).json({ error: '请先输入聊天内容。' });
    }

    if (isGeminiNativeChatSettings(settings, model)) {
      const geminiMessages = toGeminiContents(messages);
      const geminiBody = {
        contents: geminiMessages.contents,
        generationConfig: { temperature: 0.7, topP: 1 },
      };
      if (geminiMessages.systemText) {
        geminiBody.systemInstruction = { parts: [{ text: geminiMessages.systemText }] };
      }
      const response = await fetch(getGeminiGenerateContentUrl(settings.baseUrl, model, apiKey), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify(geminiBody),
      });
      const data = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({ error: data?.error?.message || data?.message || '聊天请求失败。' });
      }
      return res.json({ text: extractGeminiText(data), model });
    }

    const response = await fetch(getChatCompletionsUrl(settings.baseUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'X-Forwarded-Host': req.get('host') || 'localhost:3333',
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: Number(req.body.max_tokens || 2000),
        temperature: Number(req.body.temperature ?? 0.8),
        top_p: 1,
        stream: false,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || data?.message || '聊天请求失败。' });
    }

    return res.json({
      text: extractAnalysisText(data),
      model,
      usage: data.usage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error?.message || '插件聊天失败。' });
  }
});

app.post('/api/plugin/layer-advice', async (req, res) => {
  try {
    const settings = getUserApiSettings(req.user);
    const apiClient = createApiClient(settings);
    const image = req.body.image || {};
    const dataUrl = String(image.dataUrl || '').trim();
    const context = String(req.body.context || '').trim();

    if (!apiClient) {
      return res.status(400).json({ error: '还没有配置 API key。' });
    }

    if (!/^data:image\/(png|jpe?g|webp);base64,/i.test(dataUrl)) {
      return res.status(400).json({ error: '请传入当前图层或画布截图。' });
    }

    const prompt = [
      '你是 Photoshop 修图总监。请根据图片内容和 Photoshop 上下文，用中文给出可执行的修图建议。',
      '输出包含：整体判断、3 到 6 条具体操作、推荐的图层/蒙版/调整层做法、可直接用于生图或局部修改的英文 prompt。',
      '不要输出 JSON。',
      context ? `Photoshop 上下文：${context}` : '',
    ].filter(Boolean).join('\n');
    const result = await analyzeImageLayers({
      dataUrl,
      preferredModel: String(req.body.model || defaultAnalysisModel).trim(),
      prompt,
      apiClient,
      baseUrl: settings.baseUrl,
    });

    return res.json({ advice: result.analysis, model: result.model });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error?.message || '修图建议生成失败。' });
  }
});

app.post('/api/plugin/generate', async (req, res) => {
  try {
    const settings = getUserApiSettings(req.user);
    const apiClient = createApiClient(settings);
    const prompt = String(req.body.prompt || '').trim();
    const aspectRatio = String(req.body.aspectRatio || 'auto');
    const resolution = String(req.body.resolution || '1k');
    const count = Math.min(4, Math.max(1, Number(req.body.count || 1)));
    const kind = ['create', 'resize', 'layer'].includes(String(req.body.kind || 'create')) ? String(req.body.kind || 'create') : 'create';
    let model = getRequestImageModel(req.body.model, settings, kind);
    const size = aspectSizes[aspectRatio];
    const imageUrls = Array.isArray(req.body.imageUrls)
      ? req.body.imageUrls.map((url) => String(url || '').trim()).filter((url) => /^data:image\/(png|jpe?g|webp);base64,/i.test(url) || /^https?:\/\//i.test(url)).slice(0, 16)
      : [];
    const referenceImages = Array.isArray(req.body.referenceImages)
      ? req.body.referenceImages.map((item, index) => ({
        name: String(item?.name || `参考图 ${index + 1}`).trim(),
        dataUrl: String(item?.dataUrl || '').trim(),
      })).filter((item) => /^data:image\/(png|jpe?g|webp);base64,/i.test(item.dataUrl)).slice(0, 16)
      : [];

    if (!apiClient) {
      return res.status(400).json({ error: '还没有配置 API key。' });
    }
    if (!prompt) {
      return res.status(400).json({ error: '请输入生图提示词。' });
    }
    if (!size) {
      return res.status(400).json({ error: '图片比例不支持。' });
    }

    if (isYdn99Settings(settings)) {
      const hasReferences = imageUrls.length > 0 || referenceImages.length > 0;
      const result = hasReferences
        ? await generateWithYdn99(settings, { prompt, aspectRatio, resolution, count, model, kind, imageUrls, referenceImages })
        : await createYdn99ImageTask(settings, { prompt, aspectRatio, resolution, count, model });
      model = result.model || model;
      const resultSize = result.size || size;

      if (result.taskId) {
        const meta = {
          userId: req.user.id,
          provider: 'ydn99',
          apiSettings: settings,
          prompt,
          aspectRatio,
          resolution,
          count,
          imageUrls,
          referenceImages,
          model,
          targetName: '',
          targetSize: '',
          kind,
          size: resultSize,
        };
        taskMeta.set(result.taskId, meta);
        runBackgroundTaskPoll(result.taskId, settings, meta);
        return res.json({
          taskId: result.taskId,
          taskIds: [result.taskId],
          provider: 'ydn99',
          status: 'submitted',
          pending: true,
          size: resultSize,
          resolution,
          aspectRatio,
          model,
          referenceImages: await saveReferenceImages(referenceImages),
          targetName: '',
          targetSize: '',
          kind,
        });
      }

      const savedReferences = await saveReferenceImages(referenceImages);
      const historyItems = [];

      for (const [index, image] of result.images.entries()) {
        const imageUrl = await saveGeneratedImageResult(image);
        const historyItem = {
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          userId: req.user.id,
          imageUrl,
          prompt,
          size: resultSize,
          resolution,
          aspectRatio,
          model,
          referenceImages: savedReferences,
          kind,
          targetName: index === 0 ? '' : `生成图 ${index + 1}`,
          createdAt: new Date().toISOString(),
        };
        await addHistoryItem(historyItem);
        historyItems.push(historyItem);
      }

      const historyItem = historyItems[0];
      return res.json(await enrichPluginImageResult({
        imageUrl: historyItem.imageUrl,
        historyItem,
        historyItems,
        size: resultSize,
        resolution,
        aspectRatio,
        model,
        kind,
      }));
    }

    if (settings.baseUrl.includes('superaiapi.com')) {
      const result = await createSuperAiImageTask(settings, { prompt, aspectRatio, resolution, count, imageUrls, referenceImages, model });
      taskMeta.set(result.taskId, {
        userId: req.user.id,
        provider: 'superai',
        apiSettings: settings,
        prompt,
        aspectRatio,
        resolution,
        count,
        imageUrls,
        referenceImages,
        model,
        kind,
        size: result.size,
      });
      runBackgroundTaskPoll(result.taskId, settings, taskMeta.get(result.taskId));
      return res.json({ taskId: result.taskId, status: 'submitted', pending: true, size: result.size, resolution, aspectRatio, model, kind });
    }

    if (settings.baseUrl.includes('apimart.ai')) {
      const apimartImageUrls = await resolveApimartImageUrls(settings, imageUrls, referenceImages);
      const result = await generateWithApimart(settings, {
        prompt,
        size,
        resolution,
        count,
        officialFallback: Boolean(req.body.officialFallback),
        imageUrls: apimartImageUrls,
        model,
      });
      result.taskIds.forEach((taskId) => {
        taskMeta.set(taskId, {
          userId: req.user.id,
          provider: 'apimart',
          apiSettings: settings,
          prompt,
          size,
          resolution,
          aspectRatio,
          model,
          referenceImages,
          kind,
        });
        runBackgroundTaskPoll(taskId, settings, taskMeta.get(taskId));
      });
      return res.json({ ...result, size, resolution, aspectRatio, model, kind, pending: true });
    }

    const generated = await apiClient.images.generate({ model, prompt, size, n: 1, ...(kind === 'layer' ? { background: 'transparent' } : {}) });
    const base64Image = generated.data?.[0]?.b64_json;
    if (!base64Image) {
      return res.status(502).json({ error: 'API 没有返回图片数据。' });
    }
    const imageUrl = await saveBase64Image(base64Image, 'png');
    const historyItem = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      userId: req.user.id,
      imageUrl,
      prompt,
      size,
      resolution,
      aspectRatio,
      model,
      referenceImages: await saveReferenceImages(referenceImages),
      kind,
      createdAt: new Date().toISOString(),
    };
    await addHistoryItem(historyItem);
    return res.json(await enrichPluginImageResult({ imageUrl, historyItem, size, resolution, aspectRatio, model, kind }));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: humanizeUpstreamError(error?.message || '插件生图失败。') });
  }
});

app.post('/api/plugin/image-edit', async (req, res) => {
  try {
    const settings = getUserApiSettings(req.user);
    if (!settings.apiKey) {
      return res.status(400).json({ error: '还没有配置 API key。' });
    }
    if (!settings.baseUrl.includes('superaiapi.com') && !settings.baseUrl.includes('apimart.ai')) {
      return res.status(400).json({ error: '图片编辑目前支持 SuperAI 或 APIMart。' });
    }

    const mode = ['mask', 'expand'].includes(String(req.body.mode || 'mask')) ? String(req.body.mode || 'mask') : 'mask';
    const prompt = String(req.body.prompt || '').trim() || (mode === 'expand'
      ? '自然扩展画面，延续原图的构图、光线、色彩、材质和风格，保持主体不变。'
      : '删除涂抹区域中的内容，并根据周围画面自然补全背景，保持原图的光线、色彩、材质和风格。');
    let imageDataUrl = String(req.body.image?.dataUrl || '').trim();
    let maskDataUrl = String(req.body.mask || '').trim();
    let size = String(req.body.size || '2048x2048').trim();
    const quality = ['auto', 'high', 'medium', 'low'].includes(String(req.body.quality || 'auto')) ? String(req.body.quality || 'auto') : 'auto';
    const model = String(req.body.model || settings.model || 'gpt-image-2').trim();
    const referenceImages = Array.isArray(req.body.referenceImages)
      ? req.body.referenceImages.map((item, index) => ({
        name: String(item?.name || `编辑参考图 ${index + 1}`).trim(),
        dataUrl: String(item?.dataUrl || '').trim(),
      })).filter((item) => /^data:image\/(?:png|jpe?g|webp);base64,/i.test(item.dataUrl))
      : [];

    if (!/^data:image\/(?:png|jpe?g|webp);base64,/i.test(imageDataUrl)) {
      return res.status(400).json({ error: '请传入要编辑的图片。' });
    }
    if (maskDataUrl && !/^data:image\/png;base64,/i.test(maskDataUrl)) {
      return res.status(400).json({ error: '编辑蒙版格式不支持。' });
    }

    const normalizedEditInput = await normalizeEditImageAndMaskDimensions(imageDataUrl, maskDataUrl, size);
    imageDataUrl = normalizedEditInput.imageDataUrl;
    maskDataUrl = normalizedEditInput.maskDataUrl;
    size = normalizedEditInput.size;

    const isApimart = settings.baseUrl.includes('apimart.ai');
    const submitPrompt = !isApimart && maskDataUrl
      ? ['只修改蒙版白色区域，黑色区域必须保持原图不变。新内容必须出现在蒙版区域内，并与周围光线、透视、比例和边缘自然融合。', prompt].join('\n')
      : prompt;
    const submitMaskDataUrl = !isApimart && maskDataUrl ? await alphaMaskToBlackWhiteDataUrl(maskDataUrl) : maskDataUrl;
    const result = isApimart
      ? await createApimartEditTask(settings, { prompt: submitPrompt, imageDataUrl, maskDataUrl: submitMaskDataUrl, size, quality, model, referenceImages })
      : await createSuperAiEditTask(settings, { prompt: submitPrompt, imageDataUrl, maskDataUrl: submitMaskDataUrl, size, quality, model, referenceImages });

    taskMeta.set(result.taskId, {
      userId: req.user.id,
      provider: isApimart ? 'apimart' : 'superai',
      apiSettings: settings,
      prompt: submitPrompt,
      size,
      resolution: '',
      aspectRatio: '',
      model: result.model,
      referenceImages: [{ name: String(req.body.image?.name || '编辑原图').trim(), dataUrl: imageDataUrl }, ...referenceImages],
      imageUrls: result.imageUrl ? [result.imageUrl] : [],
      maskUrl: result.maskUrl || '',
      kind: 'edit',
    });
    runBackgroundTaskPoll(result.taskId, settings, taskMeta.get(result.taskId));
    return res.json({ taskId: result.taskId, status: 'submitted', pending: true, size, model: result.model, kind: 'edit' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error?.message || '插件图片编辑失败。' });
  }
});

app.post('/api/plugin/remove-background', async (req, res) => {
  try {
    const image = req.body.image || {};
    const parsed = parseImageDataUrl(image.dataUrl);
    if (!parsed) {
      return res.status(400).json({ error: '请传入可抠图图片。' });
    }
    const imageUrl = await removeBackgroundToGeneratedFile(parsed.buffer);
    const historyItem = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      userId: req.user.id,
      imageUrl,
      prompt: String(req.body.prompt || image.name || '抠图').trim(),
      size: 'auto',
      resolution: '原图抠图',
      aspectRatio: 'auto',
      model: 'background-removal',
      referenceImages: await saveReferenceImages([{ name: String(image.name || '抠图参考图').trim(), dataUrl: image.dataUrl }]),
      kind: 'layer',
      createdAt: new Date().toISOString(),
    };
    await addHistoryItem(historyItem);
    return res.json(await enrichPluginImageResult({ imageUrl, historyItem, model: 'background-removal', kind: 'layer' }));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error?.message || '插件抠图失败。' });
  }
});

app.get('/api/plugin/tasks/:taskId', async (req, res) => {
  try {
    const taskId = String(req.params.taskId || '').trim();
    const requestedProvider = String(req.query.provider || '').trim().toLowerCase();
    const meta = taskMeta.get(taskId) || {};

    if (meta.userId && meta.userId !== req.user.id) {
      return res.status(404).json({ error: '任务不存在。' });
    }

    if (backgroundTasks.has(taskId)) {
      const task = backgroundTasks.get(taskId);
      if (task.status === 'completed') {
        taskMeta.delete(taskId);
        backgroundTasks.delete(taskId);
        return res.json(await enrichPluginImageResult(task.result));
      }
      if (task.status === 'failed') {
        taskMeta.delete(taskId);
        backgroundTasks.delete(taskId);
        return res.json({ taskId, status: 'failed', error: task.error });
      }
      return res.json({ taskId, status: 'processing', pending: true });
    }

    return res.json({ taskId, status: 'processing', pending: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error?.message || '插件任务查询失败。' });
  }
});

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
      model: defaultImageModel,
      layerModel: defaultLayerImageModel,
      chatModel: defaultChatModel,
      apiEntryName: defaultApiEntryName,
      createdAt: new Date().toISOString(),
    };

    users.push(user);
    await writeUsers(users);

    const token = createSession(user.id);
    setSessionCookie(res, token);
    return res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    return next(error);
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
    return res.json({ user: publicUser(user) });
  } catch (error) {
    return next(error);
  }
});

app.post('/api/auth/logout', (req, res) => {
  const token = parseCookies(req)[sessionCookieName];
  if (token) {
    sessions.delete(token);
  }
  clearSessionCookie(res);
  res.json({ ok: true });
});

app.use('/generated', requireUser, express.static(generatedDir));
app.use('/api', requireUser);

app.get('/api/health', (req, res) => {
  const settings = getUserApiSettings(req.user);
  res.json({
    ok: true,
    user: publicUser(req.user),
    hasApiKey: Boolean(settings.apiKey),
    hasChatApiKey: Boolean(settings.chatApiKey),
    canEditApiKey: true,
    model: settings.model,
    layerModel: settings.layerModel,
    chatModel: settings.chatModel,
    baseUrl: settings.baseUrl,
    apiEntryName: settings.apiEntryName,
  });
});

app.get('/api/models', async (req, res) => {
  try {
    const settings = getUserApiSettings(req.user);
    const apiClient = createApiClient(settings);

    if (!apiClient) {
      return res.status(400).json({
        error: '还没有配置 API key，无法读取模型列表。',
      });
    }

    const models = await apiClient.models.list();
    const ids = models.data
      .map((model) => model.id)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    const imageModels = ids.filter((id) => {
      const normalized = id.toLowerCase();
      return normalized.includes('image') || normalized.includes('dall-e');
    });
    const chatModels = [...new Set([...defaultChatModels, ...ids.filter((id) => isLikelyChatModel(id))])];

    res.json({
      models: ids,
      imageModels,
      chatModels,
      activeModel: settings.model,
      activeChatModel: settings.chatModel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error?.message || '读取模型列表失败，请检查 API key 或 API 地址。',
    });
  }
});

app.get('/api/important-images', async (req, res) => {
  try {
    const items = await readImportantImages(req.user.id);
    res.json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message || '读取重要图库失败。' });
  }
});

app.post('/api/important-images', async (req, res) => {
  try {
    const item = await saveImportantImage({
      userId: req.user.id,
      title: req.body.title,
      category: req.body.category,
      dataUrl: req.body.dataUrl,
    });
    const items = await readImportantImages(req.user.id);
    res.json({ item, items });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error?.message || '保存重要素材失败。' });
  }
});

app.delete('/api/important-images/:id', async (req, res) => {
  try {
    const result = await removeImportantImage(req.params.id, req.user.id);
    if (!result.item) {
      return res.status(404).json({ error: '没有找到这张素材。' });
    }
    res.json({ ok: true, items: result.items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message || '删除重要素材失败。' });
  }
});

app.get('/api/balance', async (req, res) => {
  try {
    const settings = getUserApiSettings(req.user);

    if (!settings.apiKey) {
      return res.status(400).json({ error: '还没有配置 API key，无法查询余额。' });
    }

    if (!settings.baseUrl.includes('apimart.ai')) {
      return res.status(400).json({ error: '余额查询仅支持 APIMart API 地址。' });
    }

    const data = await apimartRequest(settings, '/balance', { method: 'GET' });

    if (data.success === false) {
      return res.status(400).json({ error: data.message || '余额查询失败。' });
    }

    res.json({
      ok: true,
      remainBalance: data.remain_balance,
      usedBalance: data.used_balance,
      unlimitedQuota: Boolean(data.unlimited_quota),
      raw: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message || '余额查询失败。' });
  }
});

app.get('/api/history', async (req, res) => {
  try {
    res.json({ history: await readHistory(req.user.id) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '读取生成记录失败。' });
  }
});

app.delete('/api/history/:id', async (req, res) => {
  try {
    const id = String(req.params.id || '').trim();

    if (!id) {
      return res.status(400).json({ error: '缺少记录 ID。' });
    }

    const result = await removeHistoryItem(id, req.user.id);

    if (!result.item) {
      return res.status(404).json({ error: '记录不存在。' });
    }

    res.json({ ok: true, history: result.history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message || '删除生成记录失败。' });
  }
});

app.post('/api/settings', async (req, res) => {
  try {
    const currentSettings = getUserApiSettings(req.user);
    const apiKey = String(req.body.apiKey || '').trim() || currentSettings.apiKey;
    const chatApiKey = String(req.body.chatApiKey || '').trim() || currentSettings.chatApiKey || apiKey;
    const model = String(req.body.model || currentSettings.model || defaultImageModel).trim();
    let layerModel = String(req.body.layerModel || currentSettings.layerModel || model || defaultLayerImageModel).trim();
    if (layerModel.toLowerCase().includes('dall-e')) {
      layerModel = model;
    }
    const chatModel = String(req.body.chatModel || currentSettings.chatModel || defaultChatModel).trim();
    const baseUrl = String(req.body.baseUrl || currentSettings.baseUrl || defaultBaseUrl).trim();
    const apiEntryName = String(req.body.apiEntryName || currentSettings.apiEntryName || defaultApiEntryName).trim();

    if (!apiKey) {
      return res.status(400).json({ error: '请输入 API key。' });
    }

    if (apiKey && !apiKey.startsWith('sk-')) {
      return res.status(400).json({ error: 'API key 看起来不太对，通常应该以 sk- 开头。' });
    }

    if (!model) {
      return res.status(400).json({ error: '请输入模型名。' });
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
      model,
      layerModel,
      chatModel,
      baseUrl: baseUrl || defaultBaseUrl,
      apiEntryName: apiEntryName || defaultApiEntryName,
      updatedAt: new Date().toISOString(),
    };
    await writeUsers(users);
    req.user = users[userIndex];

    res.json({
      ok: true,
      hasApiKey: Boolean(apiKey),
      hasChatApiKey: Boolean(chatApiKey),
      model,
      chatModel,
      baseUrl: users[userIndex].baseUrl,
      apiEntryName: users[userIndex].apiEntryName,
      user: publicUser(req.user),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message || '保存 API 设置失败。' });
  }
});

function normalizeChatContent(content) {
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (part?.type === 'text') {
          const text = String(part.text || '').trim();
          return text ? { type: 'text', text } : null;
        }

        if (part?.type === 'image_url') {
          const url = String(part.image_url?.url || part.url || '').trim();
          return url ? { type: 'image_url', image_url: { url } } : null;
        }

        return null;
      })
      .filter(Boolean);
  }

  return String(content || '').trim();
}

function hasChatContent(content) {
  return Array.isArray(content) ? content.length > 0 : Boolean(content);
}

function contentToPlainText(content) {
  if (Array.isArray(content)) {
    return content
      .filter((part) => part?.type === 'text')
      .map((part) => part.text)
      .join('\n')
      .trim();
  }

  return String(content || '').trim();
}

app.post('/api/chat', async (req, res) => {
  try {
    const settings = getUserApiSettings(req.user);
    const apiKey = settings.chatApiKey;

    if (!apiKey) {
      return res.status(400).json({
        error: '还没有配置 API key。请先在 API 设置里保存你自己的 API key。',
      });
    }

    const model = String(req.body.model || settings.chatModel || defaultChatModel).trim();
    const messages = Array.isArray(req.body.messages)
      ? req.body.messages
        .map((message) => ({
          role: ['system', 'user', 'assistant'].includes(message?.role) ? message.role : 'user',
          content: normalizeChatContent(message?.content),
        }))
        .filter((message) => hasChatContent(message.content))
        .slice(-32)
      : [];

    if (!messages.length) {
      return res.status(400).json({ error: '请先输入聊天内容。' });
    }

    let response;

    if (isGeminiNativeChatSettings(settings, model)) {
      const geminiMessages = toGeminiContents(messages);
      const geminiBody = {
        contents: geminiMessages.contents,
        generationConfig: {
          temperature: 0.7,
          topP: 1,
        },
      };

      if (geminiMessages.systemText) {
        geminiBody.systemInstruction = {
          parts: [{ text: geminiMessages.systemText }],
        };
      }

      response = await fetch(getGeminiGenerateContentUrl(settings.baseUrl, model, apiKey), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify(geminiBody),
      });
    } else {
      response = await fetch(getChatCompletionsUrl(settings.baseUrl), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'X-Forwarded-Host': req.get('host') || 'localhost:3333',
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: 2000,
          temperature: 1,
          top_p: 1,
          stream: true,
          stream_options: {
            include_usage: true,
          },
        }),
      });
    }

    if (!isGeminiNativeChatSettings(settings, model) && response.ok && response.body) {
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
          if (done) {
            break;
          }
          res.write(decoder.decode(value, { stream: true }));
        }

        const tail = decoder.decode();
        if (tail) {
          res.write(tail);
        }
      } finally {
        res.end();
      }
      return;
    }

    const responseText = await response.text();
    let completion;

    try {
      completion = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error(`聊天接口返回了无法解析的响应：${response.status} ${responseText.slice(0, 300)}`);
    }

    if (!response.ok) {
      const message = completion?.error?.message || completion?.message || completion?.error || `聊天接口请求失败：${response.status}`;
      if (String(message).toLowerCase().includes('invalid_grant')) {
        throw new Error('invalid_grant：当前 API Key 没有通过 SuperAI 认证。请确认 API Key 属于 SuperAI，且没有复制错、过期或被禁用。');
      }
      throw new Error(message);
    }

    const reply = completion.choices?.[0]?.message?.content;
    const text = isGeminiNativeChatSettings(settings, model)
      ? extractGeminiText(completion)
      : typeof reply === 'string'
        ? reply.trim()
        : Array.isArray(reply)
          ? reply.map((item) => item?.text || item?.content || '').filter(Boolean).join('').trim()
          : '';

    if (!text) {
      return res.status(502).json({ error: '聊天模型没有返回内容。' });
    }

    res.json({
      reply: text,
      model,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message || '聊天失败。' });
  }
});

const randomPromptDirections = [
  '商业产品摄影：香水、手表、咖啡、甜点、电子产品或包装设计，棚拍布光，干净高级',
  '自然风景：山谷、海岸、热带雨林、湖面、稻田、沙漠或雪地，真实摄影感',
  '建筑空间：图书馆、庭院、茶室、酒店大堂、现代住宅或老城巷弄，强调空间层次',
  '食物与餐桌：地方菜、早餐、市场摊位、烘焙、饮品或节日宴席，温暖可口',
  '动物与自然观察：鸟类、猫狗、海洋生物、昆虫微距或野外生态，细节清晰',
  '复古年代感：胶片旅行照、旧报刊编辑摄影、上世纪商店、火车站或家庭相册',
  '儿童绘本插画：温柔角色、奇妙房间、森林小屋、玩具世界或睡前故事',
  '东方美学：宋代器物、园林、茶席、宣纸、水墨留白、木作与自然光',
  '科幻但非赛博朋克：太空温室、月面实验室、海底研究站、未来农业或轨道港',
  '超现实静物：漂浮家具、巨型花朵、镜面房间、云层室内或梦境装置',
  '运动与户外：冲浪、攀岩、骑行、露营、马拉松或潜水，动感构图',
  '节日与民俗：花市、庙会、灯会、婚礼、手工艺作坊或传统服饰，真实热闹',
  '极简海报：单一主体、大面积留白、明确色块、平面设计感，适合商业主视觉',
  '纪实人文：工匠、厨师、农人、设计师、乐手或市场人物，环境肖像',
  '奇幻史诗：云上城堡、古老图书馆、龙骨遗迹、精灵集市或魔法植物园',
  '微距世界：露珠、矿石、织物纤维、机械零件、花蕊或玻璃纹理，浅景深',
];

let promptLibraryCache = null;

async function readPromptLibrary() {
  if (promptLibraryCache) {
    return promptLibraryCache;
  }

  try {
    const text = await fs.readFile(promptLibraryPath, 'utf8');
    const library = JSON.parse(text.replace(/^\uFEFF/, ''));
    promptLibraryCache = Array.isArray(library.items) ? library.items : [];
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn(`读取 Prompt 合集失败：${error.message}`);
    }
    promptLibraryCache = [];
  }

  return promptLibraryCache;
}

function collectJsonPromptText(value, parts = []) {
  if (typeof value === 'string') {
    const text = value.trim();
    if (text && !/^\{argument\b/i.test(text)) {
      parts.push(text);
    }
    return parts;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectJsonPromptText(item, parts));
    return parts;
  }

  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => {
      if (/^(id|url|link|href|src|image|images|media|thumbnail|thumbnails)$/i.test(key)) {
        return;
      }
      collectJsonPromptText(item, parts);
    });
  }

  return parts;
}

function normalizePromptLibraryText(text) {
  return String(text || '')
    .replace(/\{argument\s+name=(["']).*?\1\s+default=(["'])(.*?)\2\s*\}/gi, '$3')
    .replace(/\{argument\s+name=(["']).*?\1\s*\}/gi, '')
    .replace(/\s*,\s*/g, ', ')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function cleanPromptLibraryText(text) {
  const normalized = normalizePromptLibraryText(text);

  if (/^[\[{]/.test(normalized)) {
    try {
      const parsed = JSON.parse(normalized);
      return normalizePromptLibraryText(collectJsonPromptText(parsed).join(', '))
        .replace(/\n+/g, ', ')
        .replace(/,\s*,+/g, ',')
        .trim();
    } catch {
      return normalized
        .replace(/[{}[\]"]/g, ' ')
        .replace(/\b[a-zA-Z0-9_]+\s*:/g, '')
        .replace(/\s*,\s*/g, ', ')
        .replace(/\s{2,}/g, ' ')
        .trim();
    }
  }

  return normalized;
}

async function pickPromptFromLibrary() {
  const prompts = await readPromptLibrary();
  const usablePrompts = prompts
    .map((item) => ({ ...item, cleanedPrompt: cleanPromptLibraryText(item.prompt) }))
    .filter((item) => item.cleanedPrompt.length >= 12 && !/^\s*["{[]/.test(item.cleanedPrompt));

  if (!usablePrompts.length) {
    return null;
  }

  const item = usablePrompts[Math.floor(Math.random() * usablePrompts.length)];
  return {
    prompt: item.cleanedPrompt,
    title: item.title || '',
    id: item.id || '',
    source: 'prompt-library',
    total: usablePrompts.length,
  };
}

function pickRandomPromptDirection(seed) {
  const normalizedSeed = String(seed || '').toLowerCase();
  const avoidNeonCyber = /霓虹|赛博|cyber|街头|少女/.test(normalizedSeed);
  const pool = avoidNeonCyber
    ? randomPromptDirections.filter((item) => !/科幻/.test(item))
    : randomPromptDirections;
  return pool[Math.floor(Math.random() * pool.length)] || randomPromptDirections[0];
}

app.post('/api/random-prompt', async (req, res) => {
  try {
    const libraryPrompt = await pickPromptFromLibrary();
    if (libraryPrompt?.prompt) {
      return res.json(libraryPrompt);
    }

    const settings = getUserApiSettings(req.user);
    const apiKey = settings.chatApiKey;

    if (!apiKey) {
      return res.status(400).json({
        error: '还没有配置聊天 API key。请先在 API 设置里保存聊天 API key。',
      });
    }

    const model = String(req.body.model || settings.chatModel || defaultChatModel).trim();
    const seed = String(req.body.seed || '').trim();
    const direction = pickRandomPromptDirection(seed);
    const randomSalt = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    const messages = [
      {
        role: 'system',
        content: [
          '你是一个强调题材多样性的 AI 生图 Prompt 生成器。',
          '必须根据本次指定的题材方向生成，不要总是写人物、少女、霓虹街头或赛博朋克。',
          '除非用户输入明确要求，否则禁止出现这些词或近似表达：霓虹、赛博朋克、cyberpunk、街头少女、雨后街头、便利店门口、透明伞、银发少女。',
          'Prompt 要具体、有画面感，包含主体、场景、光影、风格、构图和关键细节。',
          '优先轮换不同类型：产品摄影、自然风景、建筑空间、食物、动物、复古纪实、儿童绘本、东方美学、非赛博科幻、超现实静物、运动户外、民俗节日、极简海报、微距。',
          '不要解释，不要分点，不要 Markdown，不要引号。',
          '只输出一段 Prompt，长度控制在 60 到 120 个中文字符。',
        ].join('\n'),
      },
      {
        role: 'user',
        content: [
          `本次题材方向：${direction}`,
          `随机种子：${randomSalt}`,
          seed
            ? `当前输入框内容仅作参考或避重，不要直接复用其中的主体、场景和常见词：${seed}`
            : '请直接生成一个全新的生图 Prompt。',
        ].join('\n'),
      },
    ];

    let prompt = '';

    if (isGeminiNativeChatSettings(settings, model)) {
      const geminiMessages = toGeminiContents(messages);
      const response = await fetch(getGeminiGenerateContentUrl(settings.baseUrl, model, apiKey), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: geminiMessages.contents,
          ...(geminiMessages.systemText ? { systemInstruction: { parts: [{ text: geminiMessages.systemText }] } } : {}),
          generationConfig: {
            temperature: 1.35,
            topP: 0.98,
            maxOutputTokens: 220,
          },
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error?.message || data?.message || `随机 Prompt 生成失败：${response.status}`);
      }

      prompt = extractGeminiText(data);
    } else {
      const response = await fetch(getChatCompletionsUrl(settings.baseUrl), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
          'X-Forwarded-Host': req.get('host') || 'localhost:3333',
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: 220,
          temperature: 1.35,
          top_p: 0.98,
          stream: false,
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error?.message || data?.message || data?.error || `随机 Prompt 生成失败：${response.status}`);
      }

      prompt = contentToPlainText(data?.choices?.[0]?.message?.content || data?.content || data?.message || '');
    }

    prompt = String(prompt || '')
      .replace(/^["“”'`]+|["“”'`]+$/g, '')
      .trim();

    if (!prompt) {
      return res.status(502).json({ error: '文字模型没有返回 Prompt。' });
    }

    res.json({ prompt, model });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message || '随机 Prompt 生成失败。' });
  }
});

app.post('/api/generate', async (req, res) => {
  try {
    const settings = getUserApiSettings(req.user);
    const apiClient = createApiClient(settings);

    if (!apiClient) {
      return res.status(400).json({
        error: '还没有配置 API key。请先在 API 设置里保存你自己的 API key。',
      });
    }

    const prompt = String(req.body.prompt || '').trim();
    const aspectRatio = String(req.body.aspectRatio || 'auto');
    const size = aspectSizes[aspectRatio];
    const count = Number(req.body.count || 1);
    const officialFallback = Boolean(req.body.officialFallback);
    const targetName = String(req.body.targetName || '').trim();
    const targetSize = String(req.body.targetSize || '').trim();
    const kind = ['create', 'resize', 'layer'].includes(String(req.body.kind || 'create'))
      ? String(req.body.kind || 'create')
      : 'create';
    const resolution = String(req.body.resolution || (kind === 'layer' ? '2k' : '1k'));
    const imageUrls = Array.isArray(req.body.imageUrls)
      ? req.body.imageUrls
        .map((url) => String(url || '').trim())
        .filter((url) => /^data:image\/(png|jpe?g|webp);base64,/i.test(url) || /^https?:\/\//i.test(url))
        .slice(0, 16)
      : [];
    const referenceImages = Array.isArray(req.body.referenceImages)
      ? req.body.referenceImages
        .map((item, index) => ({
          name: String(item?.name || `参考图 ${index + 1}`).trim(),
          dataUrl: String(item?.dataUrl || '').trim(),
        }))
        .filter((item) => /^data:image\/(png|jpe?g|webp);base64,/i.test(item.dataUrl))
        .slice(0, 16)
      : [];
    let model = getRequestImageModel(req.body.model, settings, kind);

    if (!prompt) {
      return res.status(400).json({ error: '请输入生图提示词。' });
    }

    const allowedResolutions = new Set(['1k', '2k', '4k']);

    if (!size) {
      return res.status(400).json({ error: '图片比例不支持。' });
    }

    if (!allowedResolutions.has(resolution)) {
      return res.status(400).json({ error: '分辨率不支持。' });
    }

    if (!Number.isInteger(count) || count < 1 || count > 4) {
      return res.status(400).json({ error: '图像数量只能是 1 到 4。' });
    }

    if (isYdn99Settings(settings)) {
      const hasReferences = imageUrls.length > 0 || referenceImages.length > 0;
      const result = hasReferences
        ? await generateWithYdn99(settings, { prompt, aspectRatio, resolution, count, model, kind, imageUrls, referenceImages })
        : await createYdn99ImageTask(settings, { prompt, aspectRatio, resolution, count, model });
      model = result.model || model;
      const resultSize = result.size || size;

      if (result.taskId) {
        const savedReferences = await saveReferenceImages(referenceImages);
        const meta = {
          userId: req.user.id,
          provider: 'ydn99',
          apiSettings: settings,
          prompt,
          aspectRatio,
          resolution,
          count,
          imageUrls,
          referenceImages,
          model,
          targetName,
          targetSize,
          kind,
          size: resultSize,
        };
        taskMeta.set(result.taskId, meta);
        runBackgroundTaskPoll(result.taskId, settings, meta);
        return res.json({
          taskId: result.taskId,
          taskIds: [result.taskId],
          provider: 'ydn99',
          status: 'submitted',
          pending: true,
          size: resultSize,
          resolution,
          aspectRatio,
          model,
          referenceImages: savedReferences,
          targetName,
          targetSize,
          kind,
        });
      }

      const savedReferences = await saveReferenceImages(referenceImages);
      const historyItems = [];

      for (const [index, image] of result.images.entries()) {
        const imageUrl = await saveGeneratedImageResult(image);
        const historyItem = {
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          userId: req.user.id,
          imageUrl,
          prompt,
          size: resultSize,
          resolution,
          aspectRatio,
          model,
          referenceImages: savedReferences,
          targetName: index === 0 ? targetName : `${targetName || '生成图'} ${index + 1}`,
          targetSize,
          kind,
          createdAt: new Date().toISOString(),
        };
        await addHistoryItem(historyItem);
        historyItems.push(historyItem);
      }

      const historyItem = historyItems[0];
      return res.json({
        imageUrl: historyItem.imageUrl,
        historyItem,
        historyItems,
        size: resultSize,
        resolution,
        aspectRatio,
        model,
        referenceImages: savedReferences,
        targetName,
        targetSize,
        kind,
      });
    }

    if (settings.baseUrl.includes('superaiapi.com')) {
      const result = await createSuperAiImageTask(settings, {
        prompt,
        aspectRatio,
        resolution,
        count,
        imageUrls,
        referenceImages,
        model,
      });
      const taskId = result.taskId;
      const meta = {
        userId: req.user.id,
        provider: 'superai',
        apiSettings: settings,
        prompt,
        aspectRatio,
        resolution,
        count,
        imageUrls,
        referenceImages,
        model,
        targetName,
        targetSize,
        kind,
        size: result.size,
      };
      taskMeta.set(taskId, meta);
      runBackgroundTaskPoll(taskId, settings, meta);

      return res.json({
        taskId,
        taskIds: [taskId],
        provider: 'superai',
        status: 'submitted',
        pending: true,
        size: result.size,
        resolution,
        aspectRatio,
        model,
        referenceImages: await saveReferenceImages(referenceImages),
        targetName,
        targetSize,
        kind,
      });
    }

    if (settings.baseUrl.includes('apimart.ai')) {
      let result;
      const failures = [];
      const apimartImageUrls = await resolveApimartImageUrls(settings, imageUrls, referenceImages);
      const candidateModels = kind === 'layer'
        ? getLayerImageModelCandidates(settings)
        : getImageModelCandidates(model, settings.model);

      for (const candidateModel of candidateModels) {
        try {
          result = await generateWithApimart(settings, {
            prompt,
            size,
            resolution,
            count,
            officialFallback,
            imageUrls: apimartImageUrls,
            model: candidateModel,
          });
          model = candidateModel;
          break;
        } catch (error) {
          failures.push(`${candidateModel}: ${error?.message || '提交失败'}`);

          if (!isTryAgainLaterError(error?.message) && !isModelUnavailableError(error?.message)) {
            throw error;
          }
        }
      }

      if (!result) {
        throw new Error(humanizeUpstreamError(failures.at(-1) || '生成提交失败'));
      }

      result.taskIds.forEach((taskId) => {
        const meta = {
          userId: req.user.id,
          provider: 'apimart',
          apiSettings: settings,
          prompt,
          size,
          resolution,
          aspectRatio,
          model,
          referenceImages,
          targetName,
          targetSize,
          kind,
        };
        taskMeta.set(taskId, meta);
        runBackgroundTaskPoll(taskId, settings, meta);
      });

      return res.json({
        ...result,
        size,
        resolution,
        aspectRatio,
        model,
        provider: 'apimart',
        referenceImages: await saveReferenceImages(referenceImages),
        targetName,
        targetSize,
        kind,
        pending: true,
    });
    }

    const imageResults = await Promise.all(Array.from({ length: count }, () => apiClient.images.generate({
      model,
      prompt,
      size,
      ...(kind === 'layer' ? { background: 'transparent' } : {}),
    })));

    const returnedImages = imageResults
      .flatMap((result) => result.data || [])
      .map((item) => item?.b64_json)
      .filter(Boolean)
      .slice(0, count);

    if (!returnedImages.length) {
      return res.status(502).json({ error: 'API 没有返回图片数据。' });
    }

    await fs.mkdir(generatedDir, { recursive: true });
    const savedReferences = await saveReferenceImages(referenceImages);
    const historyItems = [];

    for (const [index, imageBase64] of returnedImages.entries()) {
      const fileName = `image-${Date.now()}-${index}.png`;
      const filePath = path.join(generatedDir, fileName);
      await fs.writeFile(filePath, Buffer.from(imageBase64, 'base64'));

      const historyItem = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        userId: req.user.id,
        imageUrl: `/generated/${fileName}`,
        prompt,
        size,
        resolution,
        aspectRatio,
        model,
        referenceImages: savedReferences,
        targetName: index === 0 ? targetName : `${targetName || '生成图'} ${index + 1}`,
        targetSize,
        kind,
        createdAt: new Date().toISOString(),
      };
      await addHistoryItem(historyItem);
      historyItems.push(historyItem);
    }

    const historyItem = historyItems[0];

    res.json({
      imageUrl: historyItem.imageUrl,
      historyItem,
      historyItems,
      size,
      resolution,
      aspectRatio,
      model,
      targetName,
      targetSize,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: humanizeUpstreamError(error?.message || '生成失败，请稍后再试。'),
    });
  }
});

app.post('/api/image-edit', async (req, res) => {
  try {
    const settings = getUserApiSettings(req.user);

    if (!settings.apiKey) {
      return res.status(400).json({
        error: '还没有配置 API key。请先在 API 设置里保存你自己的 API key。',
      });
    }

    if (!settings.baseUrl.includes('superaiapi.com') && !settings.baseUrl.includes('apimart.ai')) {
      return res.status(400).json({
        error: '图片编辑目前支持 SuperAI 或 APIMart 的 gpt-image-2 编辑接口，请把 API 地址设为 SuperAI 或 APIMart。',
      });
    }

    const mode = ['mask', 'expand'].includes(String(req.body.mode || 'mask')) ? String(req.body.mode || 'mask') : 'mask';
    const prompt = String(req.body.prompt || '').trim() || (mode === 'expand'
      ? '自然扩展画面，延续原图的构图、光线、色彩、材质和风格，保持主体不变。'
      : '删除涂抹区域中的内容，并根据周围画面自然补全背景，保持原图的光线、色彩、材质和风格。');
    let imageDataUrl = String(req.body.image?.dataUrl || '').trim();
    let maskDataUrl = String(req.body.mask || '').trim();
    let size = String(req.body.size || '2048x2048').trim();
    const quality = ['auto', 'high', 'medium', 'low'].includes(String(req.body.quality || 'auto'))
      ? String(req.body.quality || 'auto')
      : 'auto';
    const targetName = String(req.body.targetName || (mode === 'expand' ? '扩图' : '局部修改')).trim();
    const targetSize = String(req.body.targetSize || size).trim();
    const model = String(req.body.model || settings.model || 'gpt-image-2').trim();
    const referenceImages = Array.isArray(req.body.referenceImages)
      ? req.body.referenceImages
        .map((item, index) => ({
          name: String(item?.name || `编辑参考图 ${index + 1}`).trim(),
          dataUrl: String(item?.dataUrl || '').trim(),
        }))
        .filter((item) => /^data:image\/(?:png|jpe?g|webp);base64,/i.test(item.dataUrl))
      : [];

    if (!/^data:image\/(?:png|jpe?g|webp);base64,/i.test(imageDataUrl)) {
      return res.status(400).json({ error: '请上传要编辑的图片。' });
    }

    if (maskDataUrl && !/^data:image\/png;base64,/i.test(maskDataUrl)) {
      return res.status(400).json({ error: '编辑蒙版格式不支持。' });
    }

    if (!/^\d{1,5}x\d{1,5}$/.test(size)) {
      return res.status(400).json({ error: '编辑尺寸不支持。' });
    }

    const normalizedEditInput = await normalizeEditImageAndMaskDimensions(imageDataUrl, maskDataUrl, size);
    imageDataUrl = normalizedEditInput.imageDataUrl;
    maskDataUrl = normalizedEditInput.maskDataUrl;
    size = normalizedEditInput.size;

    const isApimart = settings.baseUrl.includes('apimart.ai');
    console.log('[image-edit]', {
      provider: isApimart ? 'apimart' : 'superai',
      model,
      size,
      quality,
      hasMask: Boolean(maskDataUrl),
      maskBytes: maskDataUrl ? Buffer.byteLength(maskDataUrl, 'utf8') : 0,
      imageField: isApimart ? 'image_urls_after_upload' : 'images[].image_url',
      maskField: isApimart ? 'mask_url_after_upload' : 'mask',
      maskMode: isApimart ? 'alpha' : 'black-white',
    });
    const submitPrompt = !isApimart && maskDataUrl
      ? [
        '只修改蒙版白色区域，黑色区域必须保持原图不变。新内容必须出现在蒙版区域内，并与周围光线、透视、比例和边缘自然融合。',
        prompt,
      ].join('\n')
      : prompt;
    const submitMaskDataUrl = !isApimart && maskDataUrl
      ? await alphaMaskToBlackWhiteDataUrl(maskDataUrl)
      : maskDataUrl;
    const result = isApimart
      ? await createApimartEditTask(settings, {
        prompt: submitPrompt,
        imageDataUrl,
        maskDataUrl: submitMaskDataUrl,
        size,
        quality,
        model,
        referenceImages,
      })
      : await createSuperAiEditTask(settings, {
        prompt: submitPrompt,
        imageDataUrl,
        maskDataUrl: submitMaskDataUrl,
        size,
        quality,
        model,
        referenceImages,
      });
    const editReferenceImages = [
      {
        name: String(req.body.image?.name || '编辑原图').trim(),
        dataUrl: imageDataUrl,
      },
      ...referenceImages,
    ];

    taskMeta.set(result.taskId, {
      userId: req.user.id,
      provider: isApimart ? 'apimart' : 'superai',
      apiSettings: settings,
      prompt: submitPrompt,
      size,
      resolution: '',
      aspectRatio: '',
      model: result.model,
      referenceImages: editReferenceImages,
      imageUrls: result.imageUrl ? [result.imageUrl] : [],
      maskUrl: result.maskUrl || '',
      maskMode: isApimart ? 'alpha' : 'black-white',
      targetName,
      targetSize,
      kind: 'edit',
    });

    return res.json({
      taskId: result.taskId,
      taskIds: [result.taskId],
      status: 'submitted',
      pending: true,
      size,
      model: result.model,
      targetName,
      targetSize,
      kind: 'edit',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error?.message || '图片编辑失败。' });
  }
});

app.post('/api/remove-background', async (req, res) => {
  try {
    const image = req.body.image || {};
    const parsed = parseImageDataUrl(image.dataUrl);
    const targetName = String(req.body.targetName || '主体图层').trim();
    const prompt = String(req.body.prompt || targetName).trim();

    if (!parsed) {
      return res.status(400).json({ error: '请上传一张可抠图的参考图。' });
    }

    await fs.mkdir(generatedDir, { recursive: true });
    const imageUrl = await removeBackgroundToGeneratedFile(parsed.buffer);

    const referenceImages = await saveReferenceImages([{
      name: String(image.name || '抠图参考图').trim(),
      dataUrl: image.dataUrl,
    }]);

    const historyItem = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      userId: req.user.id,
      imageUrl,
      prompt,
      size: 'auto',
      resolution: '原图抠图',
      aspectRatio: 'auto',
      model: 'background-removal',
      referenceImages,
      targetName,
      targetSize: '分层',
      kind: 'layer',
      createdAt: new Date().toISOString(),
    };
    await addHistoryItem(historyItem);

    res.json({
      imageUrl: historyItem.imageUrl,
      historyItem,
      size: historyItem.size,
      resolution: historyItem.resolution,
      aspectRatio: historyItem.aspectRatio,
      model: historyItem.model,
      targetName,
      targetSize: historyItem.targetSize,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message || '原图抠图失败。' });
  }
});

app.post('/api/layer-analysis', async (req, res) => {
  try {
    const settings = getUserApiSettings(req.user);
    const apiClient = createApiClient(settings);

    if (!apiClient) {
      return res.status(400).json({ error: '还没有配置 API key。请先在 API 设置里保存你自己的 API key。' });
    }

    const image = req.body.image || {};
    const dataUrl = String(image.dataUrl || '').trim();
    const model = String(req.body.model || defaultAnalysisModel).trim();

    if (!/^data:image\/(png|jpe?g|webp);base64,/i.test(dataUrl)) {
      return res.status(400).json({ error: '请上传一张可分析的图片。' });
    }

    const prompt = [
      '你是平面设计图片分析助手。',
      '请用中文简短描述这张图里主要有什么元素、布局和视觉重点。',
      '只输出一段话，不要分点，不要列表，不要 JSON，不要给生成建议。',
      '开头使用“这张图里面有”。',
      '长度控制在 50 到 120 字之间。',
    ].join('\n');

    const result = await analyzeImageLayers({
      dataUrl,
      preferredModel: model,
      prompt,
      apiClient,
      baseUrl: settings.baseUrl,
    });
    const analysis = result.analysis;

    if (!analysis) {
      return res.status(502).json({ error: '文本模型没有返回分析内容。' });
    }

    res.json({
      analysis,
      model: result.model,
      triedModels: getAnalysisModelCandidates(model, settings.baseUrl),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message || '图片元素分析失败。' });
  }
});

app.get('/api/tasks/:taskId', async (req, res) => {
  try {
    const settings = getUserApiSettings(req.user);

    if (!settings.apiKey) {
      return res.status(400).json({ error: '还没有配置 API key。' });
    }

    const taskId = String(req.params.taskId || '').trim();
    if (!taskId) {
      return res.status(400).json({ error: '缺少 task_id。' });
    }

    const requestedProvider = String(req.query.provider || '').trim().toLowerCase();
    const meta = taskMeta.get(taskId) || {};
    if (meta.userId && meta.userId !== req.user.id) {
      return res.status(404).json({ error: '任务不存在。' });
    }

    if (backgroundTasks.has(taskId)) {
      const task = backgroundTasks.get(taskId);
      if (task.status === 'completed') {
        taskMeta.delete(taskId);
        backgroundTasks.delete(taskId);
        return res.json(task.result);
      }

      if (task.status === 'failed') {
        taskMeta.delete(taskId);
        backgroundTasks.delete(taskId);
        return res.json({ taskId, status: 'failed', error: task.error });
      }

      return res.json({ taskId, status: 'processing' });
    }

    const apiSettings = meta.userId === req.user.id && meta.apiSettings ? meta.apiSettings : settings;
    const provider = meta.provider
      || (requestedProvider === 'superai' ? 'superai' : requestedProvider === 'ydn99' ? 'ydn99' : 'apimart');
    const result = provider === 'superai'
      ? await getSuperAiTask(apiSettings, taskId)
      : provider === 'ydn99'
        ? await getYdn99Task(apiSettings, taskId)
        : await getApimartTask(apiSettings, taskId);

    if (result.status === 'failed') {
      return res.status(500).json(result);
    }

    if (result.status === 'completed' && (result.imageUrl || result.base64Image)) {
      Object.assign(result, await persistCompletedTaskResult(taskId, result, {
        ...meta,
        userId: meta.userId || req.user.id,
      }, apiSettings));
      taskMeta.delete(taskId);
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error?.message || '查询任务失败。',
    });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Image app running at http://localhost:${port}`);
  console.log(`LAN users can open http://YOUR_COMPUTER_IP:${port}`);
});
