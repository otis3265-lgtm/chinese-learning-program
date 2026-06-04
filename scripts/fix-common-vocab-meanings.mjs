import fs from 'node:fs';

const users = JSON.parse(fs.readFileSync('E:/chinese learning program/generated/users.json', 'utf8'));
const otis = users.find((user) => user.username === 'otis');
const learningPath = 'E:/chinese learning program/generated/learning.json';
const data = JSON.parse(fs.readFileSync(learningPath, 'utf8'));
const learning = data[otis.id];

const overrides = new Map([
  ['比', ['than; to compare', 'Usage: A 比 B + adjective, e.g. 我比他高。']],
  ['把', ['used before an object in the 把 construction; handle; to hold', 'Usage: subject + 把 + object + verb/result, e.g. 我把作业做完了。']],
  ['被', ['passive marker; by', 'Usage: subject + 被 + person + verb, e.g. 我的书被他拿走了。']],
  ['差', ['to lack; difference; poor; not good enough', 'Usage: 差一点儿 means “almost”; 成绩差 means “poor grades.”']],
  ['朝', ['toward; facing; dynasty', 'Usage: 朝 + direction/person, e.g. 他朝我走过来。']],
  ['过', ['to pass; to cross; experience marker', 'Usage: verb + 过 expresses experience, e.g. 我看过京剧。']],
  ['得', ['structural particle used before complements; must; to get', 'Usage: verb/adjective + 得 + complement, e.g. 他说得很好。']],
  ['地道', ['authentic; genuine; typical; tunnel', 'Usage: 他的汉语说得很地道。']],
  ['会', ['can; know how to; meeting', 'Usage: 我会说一点儿汉语。']],
  ['才', ['only then; not until; just', 'Usage: time/condition + 才 + result, e.g. 八点才上课。']],
  ['就', ['then; right away; as early as; only', 'Usage: often contrasts with 才, e.g. 他七点就来了。']],
  ['要', ['to want; to need; going to', 'Usage: 我要买一本书。']],
  ['让', ['to let; to make; to ask someone to do something', 'Usage: 让 + person + verb, e.g. 老师让我读课文。']],
  ['给', ['to give; for; to', 'Usage: 给 + person + object/action, e.g. 我给朋友打电话。']],
  ['跟', ['with; and; to follow', 'Usage: 跟 + person, e.g. 我跟朋友去图书馆。']],
  ['对', ['correct; toward; to; pair', 'Usage: 对 + person/topic, e.g. 这个答案对。']],
  ['按', ['according to; to press', 'Usage: 按照/按 + rule or plan, e.g. 按课本练习。']],
  ['表示', ['to express; to indicate; to show', 'Usage: 表示 + meaning/attitude, e.g. 这个词表示什么？']],
  ['方便', ['convenient; convenience', 'Usage: 你现在方便吗？']],
]);

let count = 0;
learning.words = learning.words.filter((word) => !['时态小结（了、着、过、呢、', '正、在）'].includes(word.hanzi));
for (const word of learning.words) {
  const override = overrides.get(word.hanzi);
  if (!override) continue;
  word.english = override[0];
  word.example = override[1];
  count += 1;
}

learning.updatedAt = new Date().toISOString();
fs.writeFileSync(learningPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Applied ${count} common meaning overrides. Total words: ${learning.words.length}.`);
