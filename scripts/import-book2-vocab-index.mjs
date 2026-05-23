import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve('E:/chinese learning program');
const learningPath = path.join(root, 'generated', 'learning.json');
const usersPath = path.join(root, 'generated', 'users.json');
const extractedPath = path.join(root, 'generated', 'book2-vocab-index', 'rapidocr-entries.json');

function uuid() {
  return crypto.randomUUID();
}

function normalizeWord(value) {
  return String(value || '')
    .replace(/^[\d\s.、，:：|]+/, '')
    .replace(/[|•●]/g, '')
    .replace(/[^\p{Script=Han}A-Za-z0-9，。！？、·…（）()]+/gu, '')
    .trim();
}

function normalizePinyin(value) {
  return String(value || '')
    .replace(/[|，。！？、]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const users = JSON.parse(await fs.readFile(usersPath, 'utf8'));
const otis = users.find((user) => user.username === 'otis') || users[0];
if (!otis) throw new Error('No user found.');

let entries;
try {
  entries = JSON.parse(await fs.readFile(extractedPath, 'utf8'));
} catch {
  const python = 'C:/Users/otis/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
  const script = path.join(root, 'scripts', 'rapidocr-book2-vocab-index.py');
  const result = spawnSync(python, [script], {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || 'OCR extraction failed.');
  }
  entries = JSON.parse(await fs.readFile(extractedPath, 'utf8'));
}

const allLearning = JSON.parse(await fs.readFile(learningPath, 'utf8'));
const existing = allLearning[otis.id] || {};
const existingWords = Array.isArray(existing.words) ? existing.words : [];
const existingHanzi = new Set(existingWords.map((word) => word.hanzi));

const imported = [];
for (const entry of entries) {
  const hanzi = normalizeWord(entry.hanzi);
  const pinyin = normalizePinyin(entry.pinyin);
  if (!hanzi || !/\p{Script=Han}/u.test(hanzi)) continue;
  if (hanzi.length > 14) continue;
  if (['词语索引', '专名索引', '语言点索引', '初级起步篇', '课本'].some((skip) => hanzi.includes(skip))) continue;
  if (existingHanzi.has(hanzi)) continue;
  existingHanzi.add(hanzi);
  imported.push({
    id: uuid(),
    hanzi,
    pinyin,
    english: 'Boya Chinese Elementary II vocabulary index',
    example: '',
    createdAt: new Date().toISOString(),
    source: `Boya Elementary II index, printed p. ${entry.printedPage || ''}`.trim(),
  });
}

allLearning[otis.id] = {
  ...existing,
  userId: otis.id,
  words: [...imported, ...existingWords].slice(0, 1200),
  updatedAt: new Date().toISOString(),
};

await fs.writeFile(learningPath, JSON.stringify(allLearning, null, 2), 'utf8');
console.log(`Imported ${imported.length} new Book II index words. Total words: ${allLearning[otis.id].words.length}.`);
