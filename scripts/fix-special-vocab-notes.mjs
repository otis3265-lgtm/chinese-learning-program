import fs from 'node:fs';

const users = JSON.parse(fs.readFileSync('E:/chinese learning program/generated/users.json', 'utf8'));
const otis = users.find((user) => user.username === 'otis');
const learningPath = 'E:/chinese learning program/generated/learning.json';
const data = JSON.parse(fs.readFileSync(learningPath, 'utf8'));
const learning = data[otis.id];

const manual = new Map([
  ['抽空儿', ['to make time; to find a free moment', 'Usage: 抽空儿 + verb, e.g. 你有时间的话，抽空儿复习一下生词。']],
  ['话儿', ['spoken words; topic; thing said', 'Usage: often appears in phrases about speaking or a topic.']],
  ['块儿', ['piece; lump; chunk; measure word for pieces', 'Usage: 一块儿 can also mean “together”; 一块石块儿 means “a stone/rock.”']],
  ['免贵', ['my surname is...; polite phrase used when answering 贵姓', 'Usage: A: 您贵姓？B: 免贵，我姓王。']],
  ['连着', ['continuously; one after another', 'Usage: 连着 + verb phrase, e.g. 他连着学习了三个小时。']],
  ['缺课', ['to miss class; to be absent from class', 'Usage: subject + 缺课, e.g. 他昨天缺课了。']],
  ['石块儿', ['stone; rock; piece of stone', 'Usage: 一块石块儿。']],
  ['T恤衫', ['T-shirt', 'Usage: 我买了一件T恤衫。']],
  ['美慕', ['OCR review needed; likely a proper name or misread word', 'Usage: check the original PDF page before using this item.']],
  ['有味儿', ['interesting; flavorful; having a smell/taste', 'Usage: 这个故事很有味儿。']],
  ['西南地区', ['southwest region', 'Usage: 中国的西南地区。']],
  ['华美小区', ['Huamei residential community; proper name', 'Usage: use as a place name.']],
  ['优胜杯', ['Victory Cup; Excellence Cup; proper name', 'Usage: use as an event or award name.']],
  ['adj得很', ['very + adjective; adjective + 得很 pattern', 'Usage: adjective + 得很, e.g. 忙得很 = very busy.']],
  ['A和B一样', ['A is the same as B', 'Usage: A 和 B 一样 + adjective, e.g. 我跟他一样高。']],
  ['概数表达法', ['approximate number expression', 'Usage: 几 + measure word, 十几, 几十, etc.']],
  ['A没有B（这么那么）adj', ['A is not as adjective as B', 'Usage: A 没有 B 这么/那么 + adjective.']],
  ['感叹表达小结', ['summary of exclamatory expressions', 'Usage: 太...了, 真..., 多...啊.']],
  ['把字句（1）', ['ba construction, part 1', 'Usage: subject + 把 + object + verb/result.']],
  ['把字句（2）', ['ba construction, part 2', 'Usage: focus on how an object is handled or changed.']],
  ['百以上的称数法（千、万）', ['numbers above one hundred: thousand and ten-thousand', 'Usage: 百, 千, 万 number expressions.']],
  ['被字句', ['passive sentence with 被', 'Usage: subject + 被 + agent + verb.']],
  ['简单趋向补语', ['simple directional complement', 'Usage: verb + 来/去/上/下/进/出 etc.']],
  ['比字句', ['comparison sentence with 比', 'Usage: A 比 B + adjective.']],
  ['可能补语', ['potential complement', 'Usage: verb + 得/不 + complement, e.g. 看得懂 / 看不懂.']],
  ['才（2）', ['才, grammar point 2: only then / not until', 'Usage: time/condition + 才 + result.']],
  ['常用结果补语小结（2）', ['common result complements, summary 2', 'Usage: verb + 完/好/到/见/懂 etc.']],
  ['存在句（1）', ['existential sentence, part 1', 'Usage: place + 有 + person/object.']],
  ['存在句（2）', ['existential sentence, part 2', 'Usage: place + verb + 着 + object.']],
  ['祈使表达小结', ['summary of imperative expressions', 'Usage: 请..., 别..., 不要..., 快...']],
  ['强调否定', ['emphatic negation', 'Usage: 一点儿也不..., 并不..., 根本不...']],
  ['时态小结（了、着、过、呢、、正、在）', ['aspect markers summary: 了, 着, 过, 呢, 正, 在', 'Usage: use these markers to express completion, duration, experience, or ongoing action.']],
  ['复合趋向补语', ['compound directional complement', 'Usage: verb + 上来/下去/进来/出去 etc.']],
]);

let count = 0;
for (const word of learning.words) {
  const note = manual.get(word.hanzi);
  if (!note) continue;
  word.english = note[0];
  word.example = note[1];
  count += 1;
}

learning.updatedAt = new Date().toISOString();
fs.writeFileSync(learningPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Updated ${count} special vocabulary notes.`);
