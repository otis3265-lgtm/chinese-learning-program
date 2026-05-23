import fs from 'node:fs/promises';

const learningPath = 'E:/chinese learning program/generated/learning.json';
const usersPath = 'E:/chinese learning program/generated/users.json';

const manual = new Map([
  ['比', ['than; compare', 'Pattern: A 比 B + adjective. 我比他高。']],
  ['把', ['ba marker; to handle', 'Pattern: 把 + object + result. 我把作业做完了。']],
  ['被', ['passive marker: by', 'Pattern: 被 + person + verb. 我的书被他拿走了。']],
  ['得', ['complement marker', 'Pattern: verb/adjective + 得 + result. 他说得很好。']],
  ['地道', ['authentic; natural', 'Example: 他的汉语很地道。']],
  ['会', ['can; know how to', 'Example: 我会说中文。']],
  ['才', ['only then; not until', 'Example: 他八点才来。']],
  ['就', ['then; already; right away', 'Example: 他七点就来了。']],
  ['要', ['want; need; going to', 'Example: 我要买一本书。']],
  ['让', ['let; ask someone to', 'Example: 老师让我读课文。']],
  ['给', ['give; for; to', 'Example: 我给朋友打电话。']],
  ['跟', ['with; and', 'Example: 我跟朋友去图书馆。']],
  ['对', ['correct; toward; to', 'Example: 这个答案对。']],
  ['按', ['according to; press', 'Example: 按课本练习。']],
  ['表示', ['mean; express; show', 'Example: 这个词表示什么意思？']],
  ['方便', ['convenient', 'Example: 你现在方便吗？']],
  ['爱人', ['spouse; partner', 'Example: 这是我的爱人。']],
  ['比如说', ['for example', 'Example: 比如说，你可以这样回答。']],
  ['不但', ['not only', 'Pattern: 不但 A，而且 B。']],
  ['不管', ['no matter; regardless of', 'Pattern: 不管...都...']],
  ['办公室', ['office', 'Example: 老师在办公室。']],
  ['餐厅', ['dining hall; restaurant', 'Example: 我们去餐厅吃饭。']],
  ['出租车', ['taxi', 'Example: 我坐出租车去学校。']],
  ['方便面', ['instant noodles', 'Example: 我想吃方便面。']],
  ['火锅', ['hot pot', 'Example: 我喜欢吃火锅。']],
  ['机场', ['airport', 'Example: 机场离这儿很远。']],
  ['鸡蛋', ['egg', 'Example: 我买了几个鸡蛋。']],
  ['成绩单', ['report card; transcript', 'Example: 老师发了成绩单。']],
  ['T恤衫', ['T-shirt', 'Example: 我买了一件T恤衫。']],
]);

const badLeadPatterns = [
  /^CL:/i,
  /^classifier/i,
  /^surname/i,
  /^abbr\./i,
  /^variant of/i,
  /^old variant/i,
  /^Kangxi radical/i,
];

function cleanMeaning(text) {
  return String(text || '')
    .replace(/\(CL:[^)]+\)/gi, '')
    .replace(/CL:[^;]+/gi, '')
    .replace(/\[[^\]]+\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function pickMeaning(raw) {
  const parts = String(raw || '')
    .split(';')
    .map(cleanMeaning)
    .filter(Boolean)
    .filter((part) => !badLeadPatterns.some((pattern) => pattern.test(part)));
  if (!parts.length) return cleanMeaning(raw) || 'review word';
  return parts.slice(0, 2).join('; ');
}

function shorten(text, max = 54) {
  const value = cleanMeaning(text);
  if (value.length <= max) return value;
  const first = value.split(/[;,]/)[0].trim();
  if (first && first.length <= max) return first;
  return `${value.slice(0, max - 1).trim()}…`;
}

function makeExample(hanzi, english) {
  if (/construction|sentence|marker|pattern|expression|complement|grammar/i.test(english)) {
    return `Usage: practice the “${hanzi}” pattern with a short textbook sentence.`;
  }
  if (hanzi.length <= 4) {
    return `Example: 请用“${hanzi}”说一个简单句。`;
  }
  return `Usage: review “${hanzi}” in the textbook context.`;
}

const users = JSON.parse(await fs.readFile(usersPath, 'utf8'));
const otis = users.find((user) => user.username === 'otis') || users[0];
const data = JSON.parse(await fs.readFile(learningPath, 'utf8'));
const learning = data[otis.id];

let updated = 0;
for (const word of learning.words) {
  const override = manual.get(word.hanzi);
  if (override) {
    word.english = override[0];
    word.example = override[1];
    updated += 1;
    continue;
  }

  const simplified = shorten(pickMeaning(word.english));
  word.english = simplified;
  if (!word.example || /^Usage: use “.+” in short textbook-style sentences/i.test(word.example)) {
    word.example = makeExample(word.hanzi, simplified);
  } else {
    word.example = word.example
      .replace(/^Usage: use “(.+?)” in short textbook-style sentences\. Meaning: (.+?)\.$/i, 'Example: 请用“$1”说一个简单句。')
      .replace(/\s+/g, ' ')
      .trim();
  }
  updated += 1;
}

learning.updatedAt = new Date().toISOString();
await fs.writeFile(learningPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Simplified ${updated} vocabulary cards.`);
