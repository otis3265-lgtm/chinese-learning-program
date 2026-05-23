import fs from 'node:fs/promises';

const learningPath = 'E:/chinese learning program/generated/learning.json';
const usersPath = 'E:/chinese learning program/generated/users.json';
const defaultBaseUrl = 'https://superaiapi.com/v1';

function getChatCompletionsUrl(rawBaseUrl) {
  const parsed = new URL(String(rawBaseUrl || defaultBaseUrl).trim());
  const basePath = parsed.pathname.replace(/\/+$/, '');
  parsed.pathname = basePath.endsWith('/chat/completions')
    ? basePath
    : `${basePath || '/v1'}/chat/completions`.replace(/\/{2,}/g, '/');
  parsed.search = '';
  return parsed.toString();
}

function extractJson(text) {
  const raw = String(text || '').trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();
  const start = raw.indexOf('[');
  const end = raw.lastIndexOf(']');
  if (start === -1 || end === -1) throw new Error(`No JSON array in model response: ${raw.slice(0, 200)}`);
  return JSON.parse(raw.slice(start, end + 1));
}

async function callModel({ apiKey, baseUrl, model }, batch) {
  const response = await fetch(getChatCompletionsUrl(baseUrl), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: 8000,
      messages: [
        {
          role: 'system',
          content: 'You are a concise Chinese-English vocabulary editor for beginner Chinese learners. Return only valid JSON.',
        },
        {
          role: 'user',
          content: [
            'Rewrite these vocabulary cards.',
            'For each item return: {"hanzi": "...", "english": "...", "example": "..."}',
            'Rules:',
            '- english: short natural English gloss, 2-8 words, no long dictionary chains.',
            '- example: one very short usage note or Chinese example sentence with English hint if helpful.',
            '- Prefer textbook beginner meanings, not rare meanings.',
            '- Keep grammar items as pattern notes.',
            '- Return the same hanzi values, in a JSON array only.',
            JSON.stringify(batch.map(({ hanzi, pinyin, english }) => ({ hanzi, pinyin, currentEnglish: english }))),
          ].join('\n'),
        },
      ],
    }),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`Model request failed: ${response.status} ${text.slice(0, 300)}`);
  const data = JSON.parse(text);
  return extractJson(data.choices?.[0]?.message?.content || '');
}

const users = JSON.parse(await fs.readFile(usersPath, 'utf8'));
const otis = users.find((user) => user.username === 'otis') || users[0];
if (!otis?.chatApiKey && !otis?.apiKey) throw new Error('No API key found for vocabulary polishing.');

const data = JSON.parse(await fs.readFile(learningPath, 'utf8'));
const learning = data[otis.id];
const settings = {
  apiKey: otis.chatApiKey || otis.apiKey,
  baseUrl: otis.baseUrl || defaultBaseUrl,
  model: otis.chatModel || 'gemini-3.5-flash',
};

const words = learning.words;
let changed = 0;
for (let start = 0; start < words.length; start += 20) {
  const batch = words.slice(start, start + 20);
  const polished = await callModel(settings, batch);
  const byHanzi = new Map(polished.map((item) => [item.hanzi, item]));
  for (const word of batch) {
    const item = byHanzi.get(word.hanzi);
    if (!item?.english) continue;
    word.english = String(item.english).trim();
    word.example = String(item.example || '').trim();
    changed += 1;
  }
  console.log(`Polished ${Math.min(start + batch.length, words.length)} / ${words.length}`);
}

learning.updatedAt = new Date().toISOString();
await fs.writeFile(learningPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Polished ${changed} vocabulary cards with AI.`);
