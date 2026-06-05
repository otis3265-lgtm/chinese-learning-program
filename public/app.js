const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const authGate = $('#authGate');
const authForm = $('#authForm');
const authTitle = $('#authTitle');
const authUsername = $('#authUsername');
const authPassword = $('#authPassword');
const authSubmit = $('#authSubmit');
const authToggle = $('#authToggle');
const authMessage = $('#authMessage');
const appShell = $('#appShell');
const logoutButton = $('#logoutButton');
const myLogoutButton = $('#myLogoutButton');
const navButtons = $$('.bottom-nav button');
const myTabButtons = $$('[data-my-tab]');
const installAppButton = $('#installAppButton');

const views = {
  today: $('#todayView'),
  chat: $('#chatView'),
  words: $('#wordsView'),
  writing: $('#writingView'),
  book: $('#bookView'),
  records: $('#recordsView'),
  settings: $('#settingsView'),
  my: $('#myView'),
};

const bookSummary = $('#bookSummary');
const dailyLessonSelect = $('#dailyLessonSelect');
const dailyLessonButton = $('#dailyLessonButton');
const dailyLessonMenu = $('#dailyLessonMenu');
const dailyOutput = $('#dailyOutput');
const generateDaily = $('#generateDaily');
const generateDailyInline = $('#generateDailyInline');
const photoDailyInline = $('#photoDailyInline');
const dailyPhotoInput = $('#dailyPhotoInput');
const toggleDialoguePinyin = $('#toggleDialoguePinyin');
const toggleDialogueEnglish = $('#toggleDialogueEnglish');
const listenDaily = $('#listenDaily');
const saveDailyRecord = $('#saveDailyRecord');
const quickCards = $$('[data-quick]');

const chatWelcome = $('#chatWelcome');
const chatPromptButtons = $$('[data-chat-prompt]');
const chatTranscript = $('#chatTranscript');
const chatForm = $('#chatForm');
const chatInput = $('#chatInput');
const sendChat = $('#sendChat');
const chatImageButton = $('#chatImageButton');
const chatImageInput = $('#chatImageInput');
const chatAttachmentPreview = $('#chatAttachmentPreview');

const wordForm = $('#wordForm');
const wordHanzi = $('#wordHanzi');
const wordPinyin = $('#wordPinyin');
const wordEnglish = $('#wordEnglish');
const wordExample = $('#wordExample');
const wordList = $('#wordList');
const wordFilterButtons = $$('[data-word-filter]');

const hanziInput = $('#hanziInput');
const hanziSpeed = $('#hanziSpeed');
const hanziSpeedText = $('#hanziSpeedText');
const hanziStatus = $('#hanziStatus');
const hanziCount = $('#hanziCount');
const hanziGrid = $('#hanziGrid');
const playAllHanzi = $('#playAllHanzi');

const textbookForm = $('#textbookForm');
const textbookTitle = $('#textbookTitle');
const textbookLevel = $('#textbookLevel');
const textbookContent = $('#textbookContent');

const recordForm = $('#recordForm');
const recordType = $('#recordType');
const recordTitle = $('#recordTitle');
const recordScore = $('#recordScore');
const recordDetail = $('#recordDetail');
const recordList = $('#recordList');

const settingsForm = $('#settingsForm');
const apiKeyInput = $('#apiKeyInput');
const chatProviderInput = $('#chatProviderInput');
const baseUrlInput = $('#baseUrlInput');
const chatModelInput = $('#chatModelInput');
const ttsApiKeyInput = $('#ttsApiKeyInput');
const ttsProviderInput = $('#ttsProviderInput');
const ttsBaseUrlInput = $('#ttsBaseUrlInput');
const ttsModelInput = $('#ttsModelInput');
const ttsSpeedInput = $('#ttsSpeedInput');
const ttsSpeedText = $('#ttsSpeedText');
const settingsStatus = $('#settingsStatus');

let authMode = 'login';
let learning = null;
let health = null;
let chatMessages = [];
let lastDailyText = '';
let currentTtsModel = 'qwen3-tts-flash';
let currentTtsSpeed = 0.85;
let activeAudio = null;
const ttsAudioCache = new Map();
let selectedSpeechText = '';
let hanziWriters = [];
let hanziRecordTimer = null;
let showDialoguePinyin = false;
let showDialogueEnglish = false;
let dailyLessonCursor = -1;
let sseRemainder = '';
let pendingChatImages = [];
let deferredInstallPrompt = null;
const wordRandomSeed = Math.random();
let activeWordFilter = 'all';

const chatProviderPresets = {
  'dashscope-cn': {
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    models: ['qwen-plus', 'qwen-max', 'qwen-turbo-latest', 'qwen-turbo', 'qwen3.6-plus', 'qwen3.6-flash'],
  },
  'dashscope-intl': {
    baseUrl: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
    models: ['qwen-plus', 'qwen-max', 'qwen-turbo-latest', 'qwen-turbo', 'qwen3.6-plus', 'qwen3.6-flash'],
  },
  superai: {
    baseUrl: 'https://superaiapi.com/v1',
    models: ['gpt-5.4-mini', 'gpt-4o', 'gpt-4o-mini', 'qwen-plus', 'qwen-turbo'],
  },
  custom: {
    baseUrl: '',
    models: ['qwen-plus', 'qwen-max', 'gpt-5.4-mini', 'gpt-4o', 'gpt-4o-mini'],
  },
};

const ttsProviderPresets = {
  'dashscope-intl': {
    baseUrl: 'https://dashscope-intl.aliyuncs.com',
    models: ['qwen3-tts-flash', 'qwen3-tts-instruct-flash', 'qwen-tts-latest'],
  },
  'dashscope-cn': {
    baseUrl: 'https://dashscope.aliyuncs.com',
    models: ['qwen3-tts-flash', 'qwen3-tts-instruct-flash', 'qwen-tts-latest'],
  },
  custom: {
    baseUrl: '',
    models: ['qwen3-tts-flash', 'qwen3-tts-instruct-flash', 'qwen-tts-latest', 'gpt-4o-mini-tts', 'tts-1'],
  },
};

const fallbackHanziPinyin = {
  '\u6c38': 'yong3',
  '\u8fdc': 'yuan3',
  '\u7684': 'de',
  '\u795e': 'shen2',
  '\u4f60': 'ni3',
  '\u597d': 'hao3',
  '\u6211': 'wo3',
  '\u662f': 'shi4',
  '\u4e0d': 'bu4',
  '\u4e86': 'le',
  '\u4eba': 'ren2',
  '\u4e2d': 'zhong1',
  '\u6587': 'wen2',
  '\u5b66': 'xue2',
  '\u4e60': 'xi2',
  '\u8bf4': 'shuo1',
  '\u8bfb': 'du2',
  '\u5199': 'xie3',
  '\u542c': 'ting1',
  '\u770b': 'kan4',
  '\u5403': 'chi1',
  '\u559d': 'he1',
  '\u53bb': 'qu4',
  '\u6765': 'lai2',
  '\u5927': 'da4',
  '\u5c0f': 'xiao3',
  '\u591a': 'duo1',
  '\u5c11': 'shao3',
  '\u6709': 'you3',
  '\u6ca1': 'mei2',
};

const toneMarks = {
  a: ['a', 'ā', 'á', 'ǎ', 'à'],
  e: ['e', 'ē', 'é', 'ě', 'è'],
  i: ['i', 'ī', 'í', 'ǐ', 'ì'],
  o: ['o', 'ō', 'ó', 'ǒ', 'ò'],
  u: ['u', 'ū', 'ú', 'ǔ', 'ù'],
  v: ['ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ'],
  ü: ['ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ'],
};

function markPinyinSyllable(syllable) {
  const raw = String(syllable || '').trim();
  const match = raw.match(/^([a-züv:]+)([1-5])$/i);
  if (!match) return raw.replace(/u:/gi, 'ü').replace(/v/gi, 'ü');
  const tone = Number(match[2]);
  let base = match[1].toLowerCase().replace(/u:/g, 'ü').replace(/v/g, 'ü');
  if (tone === 5) return base;
  const target = base.includes('a')
    ? 'a'
    : base.includes('e')
      ? 'e'
      : base.includes('ou')
        ? 'o'
        : [...base].reverse().find((char) => 'aeiouü'.includes(char));
  if (!target) return base;
  return base.replace(target, toneMarks[target]?.[tone] || target);
}

function normalizePinyin(value) {
  return String(value || '').trim().split(/\s+/).map(markPinyinSyllable).join(' ');
}

const defaultBoyaLessons = [
  {
    number: 1,
    title: 'Daily dialogue',
    block: 'Lesson 1: Daily dialogue\nCategory: practical beginner conversation\nGrammar / language focus: review useful daily expressions\nPractice design: short dialogue',
  },
];

function setStatus(el, text, isError = false) {
  if (!el) return;
  el.textContent = text || '';
  el.classList.toggle('error', Boolean(isError));
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed: ${response.status}`);
  return data;
}

function showAuth() {
  authGate.hidden = false;
  appShell.hidden = true;
}

function showApp() {
  authGate.hidden = true;
  appShell.hidden = false;
}

function setAuthMode(nextMode) {
  authMode = nextMode;
  authTitle.textContent = authMode === 'login' ? 'Login' : 'Register';
  authSubmit.textContent = authMode === 'login' ? 'Login' : 'Register';
  authToggle.textContent = authMode === 'login' ? 'Create account' : 'Back to login';
  setStatus(authMessage, '');
}

function switchTab(tab) {
  Object.entries(views).forEach(([key, view]) => view?.classList.toggle('active', key === tab));
  const navTab = ['words', 'book', 'records', 'settings'].includes(tab) ? 'my' : tab;
  navButtons.forEach((button) => button.classList.toggle('active', button.dataset.tab === navTab));
  if (tab === 'writing' && !hanziWriters.length) requestAnimationFrame(renderHanziWriters);
}

function formatDate(iso) {
  if (!iso) return '';
  return new Intl.DateTimeFormat('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(iso));
}

function escapeHtml(text) {
  return String(text || '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));
}

function renderRichText(text) {
  const clean = cleanGeneratedText(text);
  if (!clean) return '';
  return clean
    .split(/\n{2,}/)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

function cleanGeneratedText(text) {
  return String(text || '')
    .replace(/\s*\{(?=[^{}]*(?:&quot;id&quot;|&quot;object&quot;|&quot;choices&quot;|&quot;created&quot;))[^{}]*\}\s*/g, ' ')
    .replace(/\s*\{(?=[^{}]*(?:"id"|"object"|"choices"|"created"))[^{}]*\}\s*/g, ' ')
    .replace(/\s+([:：,.!?;，。！？；])/g, '$1')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function parseModernDialogue(text) {
  const turns = [];
  const lines = cleanGeneratedText(text).split('\n').map((line) => line.trim()).filter(Boolean);
  for (let index = 0; index < lines.length; index += 1) {
    const speakerLine = lines[index].match(/^(A|B)\s*[:：]\s*(.+)$/i);
    if (!speakerLine) continue;
    const turn = { speaker: speakerLine[1].toUpperCase(), chinese: speakerLine[2].trim(), pinyin: '', english: '' };
    const pinyinLine = lines[index + 1]?.match(/^Pinyin\s*[:：]\s*(.+)$/i);
    if (pinyinLine) {
      turn.pinyin = pinyinLine[1].trim();
      index += 1;
    }
    const englishLine = lines[index + 1]?.match(/^(English|Translation)\s*[:：]\s*(.+)$/i);
    if (englishLine) {
      turn.english = englishLine[2].trim();
      index += 1;
    }
    turns.push(turn);
  }
  return turns;
}

function renderDialogueBubbles(text) {
  const turns = parseModernDialogue(text);
  if (turns.length < 4) return renderRichText(text);
  const bubbles = turns.map((turn, index) => `
    <article class="dialogue-bubble ${turn.speaker === 'B' ? 'speaker-b' : 'speaker-a'}">
      <div class="dialogue-speaker">${turn.speaker}</div>
      <div class="dialogue-text">
        <p class="dialogue-zh">
          <span>${escapeHtml(turn.chinese)}</span>
          <button class="dialogue-listen" type="button" data-turn-index="${index}" aria-label="Read sentence ${index + 1}"></button>
        </p>
        ${turn.pinyin ? `<p class="dialogue-pinyin" ${showDialoguePinyin ? '' : 'hidden'}>${escapeHtml(turn.pinyin)}</p>` : ''}
        ${turn.english ? `<p class="dialogue-english" ${showDialogueEnglish ? '' : 'hidden'}>${escapeHtml(turn.english)}</p>` : ''}
      </div>
    </article>
  `).join('');
  return `<div class="dialogue-thread">${bubbles}</div>`;
}

function renderChatDialogue(text) {
  const turns = parseModernDialogue(text);
  if (turns.length < 2) return renderRichText(text);
  return `<div class="chat-dialogue-list">${turns.map((turn) => `
    <article class="chat-dialogue-turn">
      <span class="chat-dialogue-speaker ${turn.speaker === 'B' ? 'speaker-b' : 'speaker-a'}">${turn.speaker}</span>
      <div>
        <strong>${escapeHtml(turn.chinese)}</strong>
        ${turn.pinyin ? `<span>${escapeHtml(turn.pinyin)}</span>` : ''}
        ${turn.english ? `<span>${escapeHtml(turn.english)}</span>` : ''}
      </div>
    </article>
  `).join('')}</div>`;
}

function renderChatContent(role, content) {
  return role === 'assistant' ? renderChatDialogue(content) : renderRichText(content);
}

function renderStreamingChatContent(content) {
  const text = cleanGeneratedText(content || '');
  return `<div class="chat-streaming-text">${escapeHtml(text || '正在输出').replace(/\n/g, '<br>')}<span class="chat-stream-cursor"></span></div>`;
}

function renderThinkingContent() {
  return '<div class="chat-thinking-label" aria-label="thinking"><span>Thinking</span><i></i><i></i><i></i></div>';
}

function renderDailyDialogue() {
  if (!lastDailyText) return;
  views.today?.classList.add('has-dialogue');
  dailyOutput.classList.remove('empty-state');
  dailyOutput.innerHTML = renderDialogueBubbles(lastDailyText);
  toggleDialoguePinyin?.setAttribute('aria-pressed', showDialoguePinyin ? 'true' : 'false');
  toggleDialogueEnglish?.setAttribute('aria-pressed', showDialogueEnglish ? 'true' : 'false');
}

function looksIncomplete(text) {
  const value = String(text || '').trim();
  return Boolean(value && (/[:：?？]\s*$/.test(value) || /\b(with|and|or|the|a|an|to|of|for|in|on|at|by)\s*$/i.test(value)));
}

function extractLessonOptions() {
  const content = learning?.textbook?.content || '';
  const matches = [...content.matchAll(/Lesson\s+(\d+):\s*([^\n]+)\n([\s\S]*?)(?=\nLesson\s+\d+:|\n\nCategory map:|\n\nFull lesson texts:|$)/g)];
  const lessons = matches.map((match) => ({
    number: Number(match[1]),
    title: match[2].trim(),
    block: `Lesson ${match[1]}: ${match[2].trim()}\n${match[3].trim()}`,
  }));
  return lessons.length ? lessons : defaultBoyaLessons;
}

function renderDailyLessonOptions() {
  if (!dailyLessonSelect) return;
  const current = dailyLessonSelect.value || 'auto';
  const lessons = extractLessonOptions();
  dailyLessonSelect.innerHTML = '<option value="auto">自动随机一课</option>';
  lessons.forEach((lesson) => dailyLessonSelect.append(new Option(`第 ${lesson.number} 课：${lesson.title}`, String(lesson.number))));
  dailyLessonSelect.value = [...dailyLessonSelect.options].some((option) => option.value === current) ? current : 'auto';
  renderDailyLessonMenu();
}

function renderDailyLessonMenu() {
  if (!dailyLessonMenu || !dailyLessonButton || !dailyLessonSelect) return;
  dailyLessonMenu.innerHTML = '';
  [...dailyLessonSelect.options].forEach((option) => {
    const item = document.createElement('button');
    item.className = 'lesson-picker-option';
    item.type = 'button';
    item.role = 'option';
    item.dataset.value = option.value;
    item.textContent = option.textContent;
    item.classList.toggle('active', option.value === dailyLessonSelect.value);
    item.addEventListener('click', () => {
      dailyLessonSelect.value = option.value;
      setDailyLessonMenuOpen(false);
      renderDailyLessonMenu();
    });
    dailyLessonMenu.append(item);
  });
  dailyLessonButton.querySelector('span').textContent = dailyLessonSelect.selectedOptions[0]?.textContent || '自动随机一课';
}

function setDailyLessonMenuOpen(open) {
  if (!dailyLessonMenu || !dailyLessonButton) return;
  dailyLessonMenu.hidden = !open;
  dailyLessonButton.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function pickDailyLesson() {
  const lessons = extractLessonOptions();
  const selected = dailyLessonSelect?.value || 'auto';
  if (selected !== 'auto') return lessons.find((lesson) => String(lesson.number) === selected) || lessons[0];
  if (lessons.length > 1) {
    let next = Math.floor(Math.random() * lessons.length);
    if (next === dailyLessonCursor) next = (next + 1) % lessons.length;
    dailyLessonCursor = next;
  } else {
    dailyLessonCursor = 0;
  }
  const picked = lessons[dailyLessonCursor];
  const label = dailyLessonButton?.querySelector('span');
  if (label && picked) label.textContent = `自动：第 ${picked.number} 课`;
  return lessons[dailyLessonCursor];
}

function buildDailyPracticePrompt(lesson) {
  return [
    'Create a modern, practical Chinese dialogue for a mobile Chinese learning app.',
    lesson ? `Selected lesson for today:\n${lesson.block}` : 'Pick a saved lesson theme.',
    'Use the selected lesson vocabulary and grammar naturally.',
    'Output ONLY dialogue turns.',
    'Format every turn exactly like this:',
    'A: Chinese sentence',
    'Pinyin: pinyin sentence',
    'English: natural English translation',
    'Alternate A and B. Create 10 to 14 turns total.',
  ].join('\n');
}

function buildPhotoDialoguePrompt() {
  return [
    'Look carefully at this photo and infer the real-life scene.',
    'Create a long, practical Chinese dialogue for someone using Chinese while visiting this place or talking about this object, restaurant, dish, attraction, shop, street scene, or daily situation.',
    'Make the dialogue specific to visible details in the image. If something is uncertain, keep it natural and do not invent brand names.',
    'Output ONLY dialogue turns.',
    'Format every turn exactly like this:',
    'A: Chinese sentence',
    'Pinyin: pinyin sentence',
    'English: natural English translation',
    'Alternate A and B. Create 12 to 18 turns total.',
  ].join('\n');
}

function renderLearning() {
  if (!learning) return;
  const textbook = learning.textbook || {};
  const wordCount = Array.isArray(learning.words) ? learning.words.length : 0;
  bookSummary.textContent = textbook.content
    ? `${textbook.title || 'Textbook saved'} · ${textbook.level || 'Level not set'} · ${wordCount} words`
    : 'Paste textbook content first. AI will generate practical dialogues from it.';
  if (textbookTitle) textbookTitle.value = textbook.title || '';
  if (textbookLevel) textbookLevel.value = textbook.level || '';
  if (textbookContent) textbookContent.value = textbook.content || '';
  renderDailyLessonOptions();
  renderWords();
  renderRecords();
}

function renderWords() {
  if (!wordList) return;
  const allWords = [...(learning?.words || [])];
  const favoriteCount = allWords.filter((word) => word.favorite).length;
  wordFilterButtons.forEach((button) => {
    const active = button.dataset.wordFilter === activeWordFilter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
    if (button.dataset.wordFilter === 'favorites') button.textContent = `收藏 ${favoriteCount}`;
  });
  const filteredWords = activeWordFilter === 'favorites'
    ? allWords.filter((word) => word.favorite)
    : allWords;
  const words = filteredWords.sort((a, b) => {
    const left = seededWordRank(a);
    const right = seededWordRank(b);
    return left - right;
  });
  wordList.innerHTML = words.length ? '' : `<p class="empty-state">${activeWordFilter === 'favorites' ? 'No favorite words yet.' : 'No words yet.'}</p>`;
  words.forEach((word) => {
    const card = document.createElement('article');
    card.className = 'word-card';
    card.classList.toggle('is-favorite', Boolean(word.favorite));
    card.innerHTML = `
      <div class="word-card-head"><strong>${escapeHtml(word.hanzi || '')}</strong><span>${escapeHtml(normalizePinyin(word.pinyin || ''))}</span></div>
      <p class="word-meaning">${escapeHtml(word.english || '')}</p>
      ${word.example ? `<p class="word-example">${escapeHtml(word.example)}</p>` : ''}
      <div class="word-card-actions">
        <button class="favorite-word-button" type="button" aria-label="${word.favorite ? 'Remove from favorites' : 'Add to favorites'}" aria-pressed="${word.favorite ? 'true' : 'false'}"></button>
        <button class="delete-link" type="button" aria-label="Delete word">Delete</button>
      </div>
    `;
    card.querySelector('.favorite-word-button').addEventListener('click', async () => {
      const data = await requestJson(`/api/learning/words/${word.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ favorite: !word.favorite }),
      });
      learning = data.learning;
      renderWords();
    });
    card.querySelector('.delete-link').addEventListener('click', async () => {
      const data = await requestJson(`/api/learning/words/${word.id}`, { method: 'DELETE' });
      learning = data.learning;
      renderLearning();
    });
    wordList.append(card);
  });
}

function seededWordRank(word) {
  const value = `${wordRandomSeed}:${word.id || ''}:${word.hanzi || ''}:${word.english || ''}`;
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function renderRecords() {
  if (!recordList) return;
  const records = learning?.records || [];
  recordList.innerHTML = records.length ? '' : '<p class="empty-state">No records yet.</p>';
  records.forEach((record) => {
    const item = document.createElement('article');
    item.className = 'record-card';
    item.innerHTML = `
      <div><strong>${escapeHtml(record.title || record.type || 'Record')}</strong><span>${formatDate(record.createdAt)} · ${escapeHtml(record.score || record.type || '')}</span></div>
      ${record.detail ? `<p>${escapeHtml(record.detail)}</p>` : ''}
    `;
    recordList.append(item);
  });
}

function extractHanzi(text) {
  return [...String(text || '')].filter((char) => /\p{Script=Han}/u.test(char)).slice(0, 24);
}

function getHanziPinyin(char) {
  const words = Array.isArray(learning?.words) ? learning.words : [];
  const exact = words.find((word) => word.hanzi === char && word.pinyin);
  return normalizePinyin(exact?.pinyin || fallbackHanziPinyin[char] || '');
}

function stripSpeechText(text) {
  return String(text || '').replace(/<[^>]+>/g, ' ').replace(/[#*_`>\-]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 1200);
}

function getQwenVoiceForSpeaker(speaker) {
  return speaker === 'B' ? 'Kai' : 'Cherry';
}

function buildChineseSpeechSegments(text) {
  const turns = parseModernDialogue(text);
  if (turns.length) {
    return turns.map((turn) => ({ speaker: turn.speaker, text: cleanChineseForSpeech(turn.chinese) })).filter((segment) => segment.text);
  }
  const cleaned = cleanChineseForSpeech(text);
  return cleaned ? [{ speaker: 'A', text: cleaned }] : [];
}

function cleanChineseForSpeech(text) {
  return stripSpeechText(text)
    .replace(/\b(?:Pinyin|English|Translation)\s*[:：][^。\n]*[.!?]?/gi, ' ')
    .replace(/[^\u3400-\u9fff，。！？、；：“”‘’（）《》\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 1200);
}

async function speakText(text, button = null) {
  await speakSegments(buildChineseSpeechSegments(text), button);
}

function speakChineseText(text) {
  const input = cleanChineseForSpeech(text);
  return input ? speakSegments([{ speaker: 'A', text: input }]) : Promise.resolve();
}

async function speakSegments(segments, button = null) {
  if (!segments.length) return;
  const originalText = button?.textContent;
  const isIconButton = button?.classList.contains('dialogue-listen') || button?.classList.contains('selection-listen-button');
  const host = isIconButton ? null : button?.closest('.message-actions, .section-actions') || button?.parentElement;
  if (button) {
    button.disabled = true;
    button.classList.add('is-playing');
    if (!isIconButton) button.textContent = 'Reading';
  }
  try {
    window.speechSynthesis?.cancel();
    activeAudio?.pause();
    const urls = [];
    for (const segment of segments) {
      urls.push(await getCachedTtsUrl(segment));
    }
    const firstUrl = urls.shift();
    activeAudio = isIconButton ? new Audio() : document.createElement('audio');
    if (!isIconButton) {
      activeAudio.className = 'tts-player';
      activeAudio.controls = true;
      host?.querySelector('.tts-player')?.remove();
      host?.append(activeAudio);
    }
    activeAudio.src = firstUrl;
    activeAudio.addEventListener('ended', () => {
      const nextUrl = urls.shift();
      if (!nextUrl) {
        if (button) {
          button.disabled = false;
          button.classList.remove('is-playing');
          button.textContent = originalText;
        }
        return;
      }
      activeAudio.src = nextUrl;
      activeAudio.play().catch(() => {});
    });
    await activeAudio.play();
  } catch (error) {
    console.error(error);
    if (button) {
      button.disabled = false;
      button.classList.remove('is-playing');
      button.textContent = originalText;
    }
  }
}

async function getCachedTtsUrl(segment) {
  const voice = currentTtsModel.startsWith('qwen') ? getQwenVoiceForSpeaker(segment.speaker) : 'alloy';
  const cacheKey = JSON.stringify({
    model: currentTtsModel,
    voice,
    speed: currentTtsSpeed,
    text: segment.text,
  });
  if (ttsAudioCache.has(cacheKey)) return ttsAudioCache.get(cacheKey);

  const response = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: segment.text,
      model: currentTtsModel,
      voice,
      response_format: 'mp3',
      speed: currentTtsSpeed,
    }),
  });
  if (!response.ok) throw new Error(await response.text());
  const audioUrl = URL.createObjectURL(await response.blob());
  ttsAudioCache.set(cacheKey, audioUrl);
  if (ttsAudioCache.size > 120) {
    const oldestKey = ttsAudioCache.keys().next().value;
    URL.revokeObjectURL(ttsAudioCache.get(oldestKey));
    ttsAudioCache.delete(oldestKey);
  }
  return audioUrl;
}

function speakWithBrowser(text) {
  const speech = window.speechSynthesis;
  if (!speech || !text) return;
  speech.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = /[\u3400-\u9fff]/.test(text) ? 'zh-CN' : 'en-US';
  utterance.rate = utterance.lang === 'zh-CN' ? 0.78 : 0.9;
  speech.speak(utterance);
}

const selectionListenButton = document.createElement('button');
selectionListenButton.className = 'selection-listen-button';
selectionListenButton.type = 'button';
selectionListenButton.setAttribute('aria-label', 'Read selection');
selectionListenButton.hidden = true;
document.body.append(selectionListenButton);

function hideSelectionListenButton() {
  selectionListenButton.hidden = true;
  selectionListenButton.classList.remove('is-playing');
  selectedSpeechText = '';
}

function updateSelectionListenButton() {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || !selection.rangeCount) return hideSelectionListenButton();
  const range = selection.getRangeAt(0);
  const container = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
    ? range.commonAncestorContainer
    : range.commonAncestorContainer.parentElement;
  if (!container || !chatTranscript?.contains(container)) return hideSelectionListenButton();
  const text = selection.toString().trim();
  if (!text) return hideSelectionListenButton();
  const rect = range.getBoundingClientRect();
  selectedSpeechText = text;
  selectionListenButton.style.left = `${Math.min(window.innerWidth - 48, Math.max(12, rect.right - 34))}px`;
  selectionListenButton.style.top = `${Math.max(12, rect.top - 42)}px`;
  selectionListenButton.hidden = false;
}

selectionListenButton.addEventListener('pointerdown', (event) => event.preventDefault());
selectionListenButton.addEventListener('click', () => selectedSpeechText && speakText(selectedSpeechText, selectionListenButton));
document.addEventListener('selectionchange', () => window.setTimeout(updateSelectionListenButton, 0));
chatTranscript?.addEventListener('scroll', hideSelectionListenButton);
document.addEventListener('pointerdown', (event) => {
  if (event.target.closest('.selection-listen-button') || event.target.closest('#chatTranscript')) return;
  hideSelectionListenButton();
});

function renderHanziWriters() {
  const chars = extractHanzi(hanziInput?.value || '\u6c38');
  if (!hanziGrid) return;
  hanziGrid.innerHTML = '';
  hanziWriters = [];
  if (hanziSpeedText) hanziSpeedText.textContent = `${Number(hanziSpeed?.value || 1.2).toFixed(1)}x`;
  if (hanziCount) hanziCount.textContent = '';
  if (!window.HanziWriter) {
    if (hanziStatus) hanziStatus.textContent = 'Stroke data is still loading.';
    return;
  }
  if (!chars.length) {
    if (hanziStatus) hanziStatus.textContent = 'Enter at least one hanzi.';
    return;
  }
  chars.forEach((char, index) => {
    const card = document.createElement('article');
    card.className = 'hanzi-card';
    const writerId = `hanziWriter${index}-${char.codePointAt(0)}`;
    const pinyin = getHanziPinyin(char);
    card.innerHTML = `
      <button class="hanzi-canvas-button" type="button" aria-label="Play ${char}">
        <div id="${writerId}" class="hanzi-canvas"></div>
      </button>
      <div class="hanzi-card-foot">
        <div class="hanzi-card-title"><strong>${char}</strong>${pinyin ? `<em>${pinyin}</em>` : ''}</div>
        <span>#${index + 1}</span>
      </div>
    `;
    hanziGrid.append(card);
    const canvasButton = card.querySelector('.hanzi-canvas-button');
    const canvasSize = Math.round(canvasButton.clientWidth || 190);
    const writer = HanziWriter.create(writerId, char, {
      width: canvasSize,
      height: canvasSize,
      padding: Math.max(14, Math.round(canvasSize * 0.085)),
      showOutline: true,
      showCharacter: false,
      strokeAnimationSpeed: Number(hanziSpeed?.value || 1.2),
      delayBetweenStrokes: 120,
      strokeColor: '#b42b24',
      radicalColor: '#16875f',
      outlineColor: '#d4dee5',
      drawingColor: '#b42b24',
      charDataLoader: (character, onComplete, onError) => {
        fetch(`/hanzi-data/${encodeURIComponent(character)}.json`)
          .then((response) => {
            if (!response.ok) throw new Error(`no data for ${character}`);
            return response.json();
          })
          .then(onComplete)
          .catch(onError);
      },
    });
    hanziWriters.push({ char, writer });
    canvasButton.addEventListener('click', () => {
      speakWithBrowser(char);
      writer.cancelQuiz();
      writer.hideCharacter();
      writer.animateCharacter({
        strokeAnimationSpeed: Number(hanziSpeed?.value || 1.2),
        delayBetweenStrokes: 120,
        onComplete: () => scheduleWritingRecord(char),
      });
    });
    card.querySelector('.hanzi-card-foot').addEventListener('click', () => speakWithBrowser(char));
  });
}

function replayAllHanzi() {
  hanziWriters.reduce((promise, item) => promise.then(() => new Promise((resolve) => {
    item.writer.hideCharacter();
    item.writer.animateCharacter({
      strokeAnimationSpeed: Number(hanziSpeed?.value || 1.2),
      delayBetweenStrokes: 120,
      onComplete: resolve,
    });
  })), Promise.resolve()).then(() => {
    const chars = hanziWriters.map((item) => item.char).join('');
    if (chars) scheduleWritingRecord(chars);
  });
}

function scheduleWritingRecord(chars) {
  clearTimeout(hanziRecordTimer);
  hanziRecordTimer = setTimeout(async () => {
    try {
      const data = await requestJson('/api/learning/records', {
        method: 'POST',
        body: JSON.stringify({ type: 'writing', title: `Writing practice: ${chars}`, score: 'played', detail: `Practiced stroke order for ${chars}.` }),
      });
      learning = data.learning;
      renderLearning();
    } catch {
      // Recording should not interrupt writing practice.
    }
  }, 800);
}

function renderChatImageGrid(images = []) {
  if (!images.length) return '';
  return `<div class="chat-message-images">${images.map((image) => `
    <img src="${image.dataUrl}" alt="${escapeHtml(image.name || 'uploaded image')}" />
  `).join('')}</div>`;
}

function appendChat(role, content, options = {}) {
  chatWelcome?.classList.add('is-hidden');
  const item = document.createElement('article');
  item.className = `chat-message ${role}`;
  item.innerHTML = role === 'assistant'
    ? `<div class="message-head"><span>Tutor</span><button class="copy-message-button" type="button" aria-label="Copy reply"></button></div><div class="message-body">${renderChatContent(role, content)}</div>`
    : `<div class="message-body">${renderChatImageGrid(options.images)}${renderChatContent(role, content)}</div>`;
  item.dataset.speechText = content;
  item.querySelector('.copy-message-button')?.addEventListener('click', () => copyChatMessage(item));
  chatTranscript.append(item);
  if (options.scroll === 'top') {
    scrollChatItemToTop(item);
  } else if (options.scroll !== false) {
    updateChatScroll();
  }
  return item;
}

async function copyChatMessage(item) {
  const text = item?.dataset.speechText || item?.innerText || '';
  if (!text.trim()) return;
  await navigator.clipboard?.writeText(text.trim());
  const button = item.querySelector('.copy-message-button');
  button?.classList.add('copied');
  window.setTimeout(() => button?.classList.remove('copied'), 900);
}

function updateChatScroll() {
  if (!chatTranscript) return;
  requestAnimationFrame(() => {
    chatTranscript.classList.remove('stick-bottom');
    const shouldStick = chatTranscript.scrollHeight <= chatTranscript.clientHeight + 4;
    chatTranscript.classList.toggle('stick-bottom', shouldStick);
    chatTranscript.scrollTop = chatTranscript.scrollHeight;
  });
}

function scrollChatItemToTop(item) {
  if (!chatTranscript || !item) return;
  requestAnimationFrame(() => {
    chatTranscript.classList.remove('stick-bottom');
    chatTranscript.scrollTop = Math.max(0, item.offsetTop - chatTranscript.offsetTop);
  });
}

function renderChatAttachmentPreview() {
  if (!chatAttachmentPreview) return;
  chatForm?.classList.toggle('has-attachments', pendingChatImages.length > 0);
  if (!pendingChatImages.length) {
    chatAttachmentPreview.hidden = true;
    chatAttachmentPreview.innerHTML = '';
    return;
  }
  chatAttachmentPreview.hidden = false;
  chatAttachmentPreview.innerHTML = `
    <button class="chat-add-more-image" type="button" aria-label="继续添加图片">+</button>
    <div class="chat-attachment-strip">
      ${pendingChatImages.map((image, index) => `
        <div class="chat-attachment-thumb">
          <img src="${image.dataUrl}" alt="${escapeHtml(image.name)}" />
          <button type="button" data-remove-image="${index}" aria-label="移除图片">×</button>
        </div>
      `).join('')}
    </div>
  `;
  chatAttachmentPreview.querySelector('.chat-add-more-image')?.addEventListener('click', () => chatImageInput?.click());
  chatAttachmentPreview.querySelectorAll('[data-remove-image]').forEach((button) => {
    button.addEventListener('click', () => {
      pendingChatImages.splice(Number(button.dataset.removeImage), 1);
      if (chatImageInput) chatImageInput.value = '';
      renderChatAttachmentPreview();
    });
  });
}

function readChatImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(String(reader.result || '')));
    reader.addEventListener('error', () => reject(reader.error || new Error('读取图片失败')));
    reader.readAsDataURL(file);
  });
}

function readDialoguePhoto(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.addEventListener('load', () => {
      try {
        const maxSide = 1400;
        const scale = Math.min(1, maxSide / Math.max(image.naturalWidth || image.width, image.naturalHeight || image.height));
        const width = Math.max(1, Math.round((image.naturalWidth || image.width) * scale));
        const height = Math.max(1, Math.round((image.naturalHeight || image.height) * scale));
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, width, height);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      } catch (error) {
        URL.revokeObjectURL(url);
        reject(error);
      }
    });
    image.addEventListener('error', () => {
      URL.revokeObjectURL(url);
      reject(new Error('读取照片失败'));
    });
    image.src = url;
  });
}

function parseSseText(chunk) {
  let text = '';
  sseRemainder += chunk;
  const lines = sseRemainder.split(/\r?\n/);
  sseRemainder = lines.pop() || '';
  lines.forEach((line) => {
    if (!line.startsWith('data:')) return;
    const payload = line.slice(5).trim();
    if (!payload || payload === '[DONE]') return;
    try {
      const data = JSON.parse(payload);
      text += data.choices?.[0]?.delta?.content || data.choices?.[0]?.message?.content || data.delta || data.output_text || '';
    } catch {
      if (!payload.startsWith('{') && !payload.startsWith('[')) text += payload;
    }
  });
  return text;
}

async function sendLearningChat(userText, options = {}) {
  const images = options.images || [];
  const userContent = images.length
    ? [
      { type: 'text', text: userText },
      ...images.map((image) => ({ type: 'image_url', image_url: { url: image.dataUrl } })),
    ]
    : userText;
  const userMessage = { role: 'user', content: userContent };
  const renderInChat = !options.silentUser;
  const persistInChat = options.persistInChat ?? renderInChat;
  const requestMessages = persistInChat ? chatMessages.slice(-19) : chatMessages.slice(-19);
  requestMessages.push(userMessage);
  if (persistInChat) chatMessages.push(userMessage);
  let userNode = null;
  let assistantNode = null;
  if (renderInChat) {
    const imageNote = images.length ? `\n[已上传 ${images.length} 张图片]` : '';
    chatTranscript?.classList.add('focus-new-turn');
    userNode = appendChat('user', userText, { images, scroll: false });
    assistantNode = appendChat('assistant', '', { scroll: false });
    scrollChatItemToTop(userNode);
    assistantNode.classList.add('thinking');
    assistantNode.querySelector('.message-body').innerHTML = renderThinkingContent();
  }
  let assistantText = '';
  if (sendChat) sendChat.disabled = true;
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: requestMessages.slice(-20), lessonFocus: options.lessonFocus || '' }),
    });
    const contentType = response.headers.get('content-type') || '';
    if (!response.ok) {
      const data = contentType.includes('application/json') ? await response.json() : { error: await response.text() };
      throw new Error(data.error || 'AI chat failed.');
    }
    if (contentType.includes('text/event-stream') && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      sseRemainder = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += parseSseText(decoder.decode(value, { stream: true }));
        if (assistantNode) {
          assistantNode.classList.remove('thinking');
          assistantNode.classList.add('streaming');
          assistantNode.dataset.speechText = assistantText;
          assistantNode.querySelector('.message-body').innerHTML = renderStreamingChatContent(assistantText);
        }
      }
      assistantText += parseSseText(`${decoder.decode()}\n`);
    } else {
      const data = await response.json();
      assistantText = data.reply || '';
    }
    assistantText = cleanGeneratedText(assistantText);
    if (assistantNode) {
      assistantNode.classList.remove('thinking');
      assistantNode.classList.remove('streaming');
      assistantNode.dataset.speechText = assistantText;
      assistantNode.querySelector('.message-body').innerHTML = renderChatContent('assistant', assistantText);
      scrollChatItemToTop(userNode);
    }
    if (persistInChat) chatMessages.push({ role: 'assistant', content: assistantText });
    return assistantText;
  } catch (error) {
    if (assistantNode) {
      assistantNode.classList.remove('thinking');
      assistantNode.classList.remove('streaming');
      assistantNode.querySelector('.message-body').innerHTML = `<div class="error">${escapeHtml(error.message)}</div>`;
    }
    throw error;
  } finally {
    if (renderInChat) window.setTimeout(() => chatTranscript?.classList.remove('focus-new-turn'), 1200);
    if (sendChat) sendChat.disabled = false;
  }
}

function setSelectValue(select, value) {
  if (!select) return;
  const normalized = String(value || '').trim();
  if (normalized && ![...select.options].some((option) => option.value === normalized)) select.append(new Option(normalized, normalized));
  select.value = normalized || select.options[0]?.value || '';
}

function detectChatProvider(baseUrl = '') {
  const normalized = String(baseUrl || '').trim();
  if (/dashscope\.aliyuncs\.com/i.test(normalized)) return 'dashscope-cn';
  if (/dashscope-intl\.aliyuncs\.com/i.test(normalized)) return 'dashscope-intl';
  if (/superaiapi\.com/i.test(normalized)) return 'superai';
  return 'custom';
}

function setChatModelOptions(provider, selectedModel) {
  if (!chatModelInput) return;
  const preset = chatProviderPresets[provider] || chatProviderPresets.custom;
  const current = String(selectedModel || chatModelInput.value || '').trim();
  const models = [...new Set([...preset.models, current].filter(Boolean))];
  chatModelInput.replaceChildren(...models.map((model) => new Option(model, model)));
  setSelectValue(chatModelInput, current || preset.models[0]);
}

function applyChatProviderPreset(provider, options = {}) {
  const preset = chatProviderPresets[provider] || chatProviderPresets.custom;
  if (chatProviderInput) chatProviderInput.value = provider;
  if (baseUrlInput && preset.baseUrl && !options.keepBaseUrl) baseUrlInput.value = preset.baseUrl;
  setChatModelOptions(provider, options.selectedModel);
}

function detectTtsProvider(baseUrl = '') {
  const normalized = String(baseUrl || '').trim();
  if (/dashscope-intl\.aliyuncs\.com/i.test(normalized)) return 'dashscope-intl';
  if (/dashscope\.aliyuncs\.com/i.test(normalized)) return 'dashscope-cn';
  return 'custom';
}

function setTtsModelOptions(provider, selectedModel) {
  if (!ttsModelInput) return;
  const preset = ttsProviderPresets[provider] || ttsProviderPresets.custom;
  const current = String(selectedModel || ttsModelInput.value || '').trim();
  const models = [...new Set([...preset.models, current].filter(Boolean))];
  ttsModelInput.replaceChildren(...models.map((model) => new Option(model, model)));
  setSelectValue(ttsModelInput, current || preset.models[0]);
}

function applyTtsProviderPreset(provider, options = {}) {
  const preset = ttsProviderPresets[provider] || ttsProviderPresets.custom;
  if (ttsProviderInput) ttsProviderInput.value = provider;
  if (ttsBaseUrlInput && preset.baseUrl && !options.keepBaseUrl) ttsBaseUrlInput.value = preset.baseUrl;
  setTtsModelOptions(provider, options.selectedModel);
}

function setTtsSpeed(value) {
  currentTtsSpeed = Math.min(2, Math.max(0.5, Number(value || 0.85)));
  if (ttsSpeedInput) ttsSpeedInput.value = String(currentTtsSpeed);
  if (ttsSpeedText) ttsSpeedText.textContent = `${currentTtsSpeed.toFixed(2)}x`;
}

async function loadAppData() {
  health = await requestJson('/api/health');
  const data = await requestJson('/api/learning');
  learning = data.learning;
  baseUrlInput.value = health.baseUrl || chatProviderPresets.superai.baseUrl;
  applyChatProviderPreset(detectChatProvider(baseUrlInput.value), {
    keepBaseUrl: true,
    selectedModel: health.chatModel || 'gpt-5.4-mini',
  });
  ttsBaseUrlInput.value = health.ttsBaseUrl || ttsProviderPresets['dashscope-intl'].baseUrl;
  applyTtsProviderPreset(detectTtsProvider(ttsBaseUrlInput.value), {
    keepBaseUrl: true,
    selectedModel: health.ttsModel || 'qwen3-tts-flash',
  });
  currentTtsModel = ttsModelInput?.value || health.ttsModel || 'qwen3-tts-flash';
  setTtsSpeed(health.ttsSpeed || 0.85);
  renderLearning();
}

async function init() {
  try {
    const data = await requestJson('/api/auth/me');
    if (!data.user) return showAuth();
    showApp();
    await loadAppData();
  } catch {
    showAuth();
  }
}

authToggle?.addEventListener('click', () => setAuthMode(authMode === 'login' ? 'register' : 'login'));
authForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
    await requestJson(endpoint, { method: 'POST', body: JSON.stringify({ username: authUsername.value, password: authPassword.value }) });
    showApp();
    await loadAppData();
  } catch (error) {
    setStatus(authMessage, error.message, true);
  }
});

[logoutButton, myLogoutButton].forEach((button) => button?.addEventListener('click', async () => {
  await requestJson('/api/auth/logout', { method: 'POST' });
  showAuth();
}));

navButtons.forEach((button) => button.addEventListener('click', () => switchTab(button.dataset.tab)));
myTabButtons.forEach((button) => button.addEventListener('click', () => switchTab(button.dataset.myTab)));
wordFilterButtons.forEach((button) => button.addEventListener('click', () => {
  activeWordFilter = button.dataset.wordFilter || 'all';
  renderWords();
}));
dailyLessonButton?.addEventListener('click', () => setDailyLessonMenuOpen(dailyLessonMenu.hidden));
document.addEventListener('click', (event) => {
  if (!event.target.closest('.lesson-picker')) setDailyLessonMenuOpen(false);
});
toggleDialoguePinyin?.addEventListener('click', () => {
  showDialoguePinyin = !showDialoguePinyin;
  renderDailyDialogue();
});
toggleDialogueEnglish?.addEventListener('click', () => {
  showDialogueEnglish = !showDialogueEnglish;
  renderDailyDialogue();
});
listenDaily?.addEventListener('click', () => speakText(lastDailyText || dailyOutput.textContent, listenDaily));
dailyOutput?.addEventListener('click', (event) => {
  const button = event.target.closest('.dialogue-listen');
  if (!button) return;
  const turn = parseModernDialogue(lastDailyText || dailyOutput.textContent)[Number(button.dataset.turnIndex)];
  if (turn?.chinese) speakSegments([{ speaker: turn.speaker, text: cleanChineseForSpeech(turn.chinese) }], button);
});
async function generateDailyDialogue() {
  const lesson = pickDailyLesson();
  dailyOutput.classList.remove('empty-state');
  dailyOutput.textContent = lesson ? `Generating Lesson ${lesson.number} dialogue...` : 'Generating dialogue...';
  if (generateDaily) generateDaily.disabled = true;
  if (generateDailyInline) generateDailyInline.disabled = true;
  try {
    lastDailyText = await sendLearningChat(buildDailyPracticePrompt(lesson), {
      silentUser: true,
      persistInChat: false,
      lessonFocus: lesson ? `Lesson ${lesson.number}: ${lesson.title}` : 'daily practice',
    });
    renderDailyDialogue();
    if (looksIncomplete(lastDailyText)) dailyOutput.insertAdjacentHTML('beforeend', '<p class="error">Content may be incomplete. Generate again if needed.</p>');
  } catch (error) {
    dailyOutput.innerHTML = `<p class="error">${escapeHtml(error.message)}</p>`;
  } finally {
    if (generateDaily) generateDaily.disabled = false;
    if (generateDailyInline) generateDailyInline.disabled = false;
  }
}
generateDaily?.addEventListener('click', generateDailyDialogue);
generateDailyInline?.addEventListener('click', generateDailyDialogue);
photoDailyInline?.addEventListener('click', () => dailyPhotoInput?.click());
dailyPhotoInput?.addEventListener('change', async () => {
  const file = [...(dailyPhotoInput.files || [])].find((item) => item.type.startsWith('image/'));
  dailyPhotoInput.value = '';
  if (!file) return;
  dailyOutput.classList.remove('empty-state');
  dailyOutput.textContent = '正在根据照片生成长对话...';
  if (generateDaily) generateDaily.disabled = true;
  if (generateDailyInline) generateDailyInline.disabled = true;
  if (photoDailyInline) photoDailyInline.disabled = true;
  try {
    const image = {
      name: file.name || 'camera-photo.jpg',
      type: 'image/jpeg',
      dataUrl: await readDialoguePhoto(file),
    };
    lastDailyText = await sendLearningChat(buildPhotoDialoguePrompt(), {
      silentUser: true,
      persistInChat: false,
      lessonFocus: 'photo scene dialogue',
      images: [image],
    });
    renderDailyDialogue();
    if (looksIncomplete(lastDailyText)) dailyOutput.insertAdjacentHTML('beforeend', '<p class="error">Content may be incomplete. Generate again if needed.</p>');
  } catch (error) {
    dailyOutput.innerHTML = `<p class="error">${escapeHtml(error.message)}</p>`;
  } finally {
    if (generateDaily) generateDaily.disabled = false;
    if (generateDailyInline) generateDailyInline.disabled = false;
    if (photoDailyInline) photoDailyInline.disabled = false;
  }
});
saveDailyRecord?.addEventListener('click', async () => {
  const detail = lastDailyText || dailyOutput.textContent.trim();
  if (!detail || dailyOutput.classList.contains('empty-state')) return;
  const data = await requestJson('/api/learning/records', { method: 'POST', body: JSON.stringify({ type: 'dialogue', title: 'Modern Chinese dialogue', score: 'done', detail: detail.slice(0, 1800) }) });
  learning = data.learning;
  renderLearning();
  switchTab('records');
});

quickCards.forEach((card) => card.addEventListener('click', async () => {
  const prompts = {
    vocabulary: 'Pick 6 useful words from the saved textbook. For each word use: Chinese (pinyin) - short English. Then quiz me.',
    grammar: 'Teach one important grammar point from the saved textbook in simple English. Include pattern, 2 examples with pinyin, and 2 exercises.',
    dialogue: 'Start a realistic Chinese dialogue based on one saved lesson theme. Ask one question at a time and correct my Chinese.',
  };
  switchTab('chat');
  await sendLearningChat(prompts[card.dataset.quick], { lessonFocus: card.dataset.quick });
}));
chatPromptButtons.forEach((button) => button.addEventListener('click', () => sendLearningChat(button.dataset.chatPrompt)));
chatImageButton?.addEventListener('click', () => chatImageInput?.click());
chatImageInput?.addEventListener('change', async () => {
  const files = [...(chatImageInput.files || [])].filter((file) => file.type.startsWith('image/'));
  if (!files.length) return;
  const images = await Promise.all(files.map(async (file) => ({
    name: file.name,
    type: file.type,
    dataUrl: await readDialoguePhoto(file),
  })));
  pendingChatImages = [...pendingChatImages, ...images].slice(0, 6);
  chatImageInput.value = '';
  renderChatAttachmentPreview();
});
chatForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text && !pendingChatImages.length) return;
  const images = [...pendingChatImages];
  chatInput.value = '';
  chatInput.style.height = '';
  pendingChatImages = [];
  if (chatImageInput) chatImageInput.value = '';
  renderChatAttachmentPreview();
  await sendLearningChat(text || '请看这张图片。', { images });
});
chatInput?.addEventListener('input', () => {
  chatInput.style.height = 'auto';
  chatInput.style.height = `${Math.min(chatInput.scrollHeight, 118)}px`;
});

wordForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = await requestJson('/api/learning/words', {
    method: 'POST',
    body: JSON.stringify({ hanzi: wordHanzi.value, pinyin: wordPinyin.value, english: wordEnglish.value, example: wordExample.value }),
  });
  learning = data.learning;
  wordForm.reset();
  renderLearning();
});
textbookForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = await requestJson('/api/learning/textbook', {
    method: 'POST',
    body: JSON.stringify({ title: textbookTitle.value, level: textbookLevel.value, content: textbookContent.value }),
  });
  learning = data.learning;
  renderLearning();
});
recordForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = await requestJson('/api/learning/records', {
    method: 'POST',
    body: JSON.stringify({ type: recordType.value, title: recordTitle.value, score: recordScore.value, detail: recordDetail.value }),
  });
  learning = data.learning;
  recordForm.reset();
  renderLearning();
});
settingsForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const data = await requestJson('/api/settings', {
      method: 'POST',
      body: JSON.stringify({
        chatApiKey: apiKeyInput.value,
        baseUrl: baseUrlInput.value,
        chatModel: chatModelInput.value,
        ttsApiKey: ttsApiKeyInput?.value || '',
        ttsBaseUrl: ttsBaseUrlInput?.value || '',
        ttsModel: ttsModelInput?.value || currentTtsModel,
        ttsSpeed: currentTtsSpeed,
      }),
    });
    health = data;
    currentTtsModel = health.ttsModel || ttsModelInput?.value || 'qwen3-tts-flash';
    setTtsSpeed(health.ttsSpeed || currentTtsSpeed);
    apiKeyInput.value = '';
    if (ttsApiKeyInput) ttsApiKeyInput.value = '';
    setStatus(settingsStatus, 'Saved.');
  } catch (error) {
    setStatus(settingsStatus, error.message, true);
  }
});
chatProviderInput?.addEventListener('change', () => {
  applyChatProviderPreset(chatProviderInput.value);
});
baseUrlInput?.addEventListener('change', () => {
  const provider = detectChatProvider(baseUrlInput.value);
  applyChatProviderPreset(provider, {
    keepBaseUrl: true,
    selectedModel: chatModelInput?.value,
  });
});
ttsProviderInput?.addEventListener('change', () => {
  applyTtsProviderPreset(ttsProviderInput.value);
  currentTtsModel = ttsModelInput?.value || currentTtsModel;
});
ttsBaseUrlInput?.addEventListener('change', () => {
  const provider = detectTtsProvider(ttsBaseUrlInput.value);
  applyTtsProviderPreset(provider, {
    keepBaseUrl: true,
    selectedModel: ttsModelInput?.value,
  });
});
ttsModelInput?.addEventListener('change', () => {
  currentTtsModel = ttsModelInput.value || currentTtsModel;
});
ttsSpeedInput?.addEventListener('input', () => {
  setTtsSpeed(ttsSpeedInput.value);
});
hanziInput?.addEventListener('input', renderHanziWriters);
hanziSpeed?.addEventListener('change', renderHanziWriters);
playAllHanzi?.addEventListener('click', () => {
  speakChineseText(hanziWriters.map((item) => item.char).join(''));
  replayAllHanzi();
});

setAuthMode('login');
renderDailyLessonOptions();
init();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch((error) => {
      console.warn('Service worker registration failed:', error);
    });
  });
}

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (installAppButton) installAppButton.hidden = false;
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  if (installAppButton) installAppButton.hidden = true;
});

installAppButton?.addEventListener('click', async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice.catch(() => null);
  deferredInstallPrompt = null;
  installAppButton.hidden = true;
});
