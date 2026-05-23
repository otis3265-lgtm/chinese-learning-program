import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('E:/chinese learning program');
const learningPath = path.join(root, 'generated', 'learning.json');
const usersPath = path.join(root, 'generated', 'users.json');

const courseContent = `Source textbooks:
- Boya Chinese Elementary I, Second Edition, 博雅汉语：初级起步篇 I
- Boya Chinese Elementary II, Second Edition, 博雅汉语：初级起步篇 II
- Local PDF files: C:/Users/otis/Downloads/1-初级起步篇1.pdf and C:/Users/otis/Downloads/2-初级起步篇2.pdf

Teaching priority:
Always build practice from these textbook themes, vocabulary, sentence patterns, and grammar points. The learner wants practical dialogue drills, textbook-based vocabulary, pinyin, English explanations, and short correction-focused practice.

Elementary I key lesson map:
1. Basic identity and nationality: 你是哪国人？我是学生。你是留学生吗？Grammar: 是 sentence, 吗 questions.
2. Introducing classmates and friends: 你叫什么名字？他也是学生。Grammar: 也, 呢, plural 们.
3. Books and ownership: 那是你的书吗？这是什么杂志？Grammar: 这/那, 谁/什么 special questions, 的 for possession/attributes. Core words: 书, 汉语, 课本, 词典, 杂志, 音乐, 朋友, 同屋.
4. Campus locations: 图书馆在哪儿？教学楼在图书馆的北边。Grammar: 在/是 for location, 哪儿, 方位名词: 东边, 西边, 南边, 北边, 旁边, 里边, 外边, 上边, 下边.
5. Campus orientation review: 在北京大学的东边. Review 是, 吗, 这/那, 哪儿, 的, 在.
6. Time and daily schedule: 现在几点？Grammar: 钟点表达法, 有 sentence, 吧, time nouns as adverbials.
7. Phone numbers and quantities: 你的电话号码是多少？Grammar: 几/多少, 呢, 和.
8. Shopping: 多少钱一瓶？Grammar: 一点儿, measure words, money expressions.
9. Family: 你家有几口人？Grammar review: 有, 几口人, family members.
10. Weather and comparison: 北京的冬天比较冷. Grammar: 比较, 不A不B, adjective predicate.
11. Actions in progress: 你在干什么呢？Grammar: 在 + verb, 呢, 从...到....
12. Going somewhere to do something: 我去图书馆还书. Grammar: serial verb sentence, A不A/V不V questions.
13. Preferences and description: 我喜欢浅颜色的. Grammar: 着, 的 phrase, 有.
14. Birthday and dates: 明天是我朋友的生日. Grammar review.
15. Weekend plans: 周末你干什么？Grammar: 太...了, verb reduplication, place adverbials.
16. Asking for help/directions: 请问... Grammar: polite questions and 就是.
17. Hobbies and ability: 你会不会打太极拳？Grammar: 会, 可以, ability questions.
18. Health: 看病人. Grammar review.
19. Drinking/eating: 我喝了半斤白酒. Grammar: 了, 好像.
20. Sickness: 他感冒了. Grammar: 能, 最好, date expressions.
21. Duration of study: 你学了多长时间汉语？Grammar: 多长时间, duration complements.
22. Breakfast and sequence: 你吃了早饭来找我. Grammar: imperative sentence, 了, time/place order.
23. Exercise and advice: 你得多锻炼锻炼了. Grammar: 得, modal verbs summary.
24. Exams soon: 快考试了. Grammar: 快/要/快要...了, 只好, 再.
25. Family request: 爸爸妈妈让我回家. Grammar: 极了, 想/要, verbal measure words.
26. Exam result: 考得怎么样？Grammar: 都, 得 complement of state.
27. Tickets and events: 我们已经买好票了. Grammar: common result complements, 会.
28. Party participation: 我要参加联欢会. Grammar review.

Elementary II key lesson map:
Use Elementary II as the next level after Elementary I. Continue with longer dialogues, real-life situations, written notes, notices, recipes, diary entries, and more complex complements.
Observed textbook themes include:
- A notice on a bulletin board: 告示栏贴着一个通知. Practice reading notices, asking what is written, and explaining rules.
- Cooking and ordering food: 西红柿炒鸡蛋. Practice ingredients, taste, ordering, and cooking steps.
- Objects and placement: 桌子上放着很多东西. Practice 着, location + 放/贴/挂, and describing a room.
- Duration and success: 成功需要多长时间. Practice 需要, 多长时间, 才/就.
- Service situations: 请稍等. Practice polite requests, waiting, phone/service counter language.
- Storytelling and sequence: 从哪一头儿吃香蕉. Practice narrative order, 把, 先...再..., result.
- Diary writing: 李军的日记. Practice dates, mood, daily events, and short written summaries.
- Cultural activities: 我看过京剧. Practice 过 experience, 看过/去过/吃过, asking about past experiences.
- Hypothetical expressions: 如果有一天.... Practice 如果...就..., 想/希望/打算.
- Preference and habit: 好咖啡总是放在热杯子里. Practice 总是, 把/放在, reason explanations.

Default lesson design:
When the learner asks for practice, generate one of these:
1. Dialogue practice: 6 to 10 short turns, Chinese first, pinyin under each line, English meaning, then ask the learner one question.
2. Vocabulary practice: 8 textbook-based words, pinyin, English meaning, one short example sentence, and one recall question.
3. Grammar practice: one grammar point, simple English explanation, pattern, 3 textbook-style examples, 3 learner exercises.
4. Mixed review: 3 vocabulary items, 1 grammar point, 1 mini dialogue, 3 questions.
Always correct gently and continue one step at a time.`;

const seedWords = [
  ['书', 'shū', 'book', '那是你的书吗？'],
  ['课本', 'kèběn', 'textbook', '这是汉语课本。'],
  ['词典', 'cídiǎn', 'dictionary', '这是汉日词典。'],
  ['杂志', 'zázhì', 'magazine', '这是中国的杂志。'],
  ['朋友', 'péngyou', 'friend', '他是我的朋友。'],
  ['同屋', 'tóngwū', 'roommate', '那是我同屋的书。'],
  ['图书馆', 'túshūguǎn', 'library', '图书馆在哪儿？'],
  ['教学楼', 'jiàoxuélóu', 'teaching building', '教学楼在图书馆的北边。'],
  ['宿舍楼', 'sùshèlóu', 'dormitory building', '宿舍楼在那儿。'],
  ['东边', 'dōngbian', 'east side', '北京大学在清华大学的东边。'],
  ['现在', 'xiànzài', 'now', '现在几点？'],
  ['电话', 'diànhuà', 'telephone', '你的电话号码是多少？'],
  ['多少', 'duōshao', 'how many / how much', '这个多少钱？'],
  ['一瓶', 'yì píng', 'one bottle', '多少钱一瓶？'],
  ['家', 'jiā', 'family / home', '你家有几口人？'],
  ['冬天', 'dōngtiān', 'winter', '北京的冬天比较冷。'],
  ['喜欢', 'xǐhuan', 'to like', '我喜欢浅颜色的。'],
  ['生日', 'shēngrì', 'birthday', '明天是我朋友的生日。'],
  ['周末', 'zhōumò', 'weekend', '周末你干什么？'],
  ['锻炼', 'duànliàn', 'to exercise', '你得多锻炼锻炼了。'],
  ['通知', 'tōngzhī', 'notice', '告示栏贴着一个通知。'],
  ['西红柿炒鸡蛋', 'xīhóngshì chǎo jīdàn', 'stir-fried tomato and eggs', '我想吃西红柿炒鸡蛋。'],
  ['稍等', 'shāo děng', 'wait a moment', '请稍等。'],
  ['日记', 'rìjì', 'diary', '李军写了一篇日记。'],
  ['京剧', 'jīngjù', 'Beijing opera', '我看过京剧。'],
].map(([hanzi, pinyin, english, example]) => ({
  id: crypto.randomUUID(),
  hanzi,
  pinyin,
  english,
  example,
  createdAt: new Date().toISOString(),
}));

const users = JSON.parse(await fs.readFile(usersPath, 'utf8'));
const otis = users.find((user) => user.username === 'otis') || users[0];
if (!otis) throw new Error('No user found.');

let allLearning = {};
try {
  allLearning = JSON.parse(await fs.readFile(learningPath, 'utf8'));
} catch {}

const existing = allLearning[otis.id] || {};
const existingWords = Array.isArray(existing.words) ? existing.words : [];
const existingRecords = Array.isArray(existing.records) ? existing.records : [];
const existingHanzi = new Set(existingWords.map((word) => word.hanzi));
const words = [
  ...seedWords.filter((word) => !existingHanzi.has(word.hanzi)),
  ...existingWords,
].slice(0, 500);

allLearning[otis.id] = {
  userId: otis.id,
  textbook: {
    title: 'Boya Chinese Elementary I-II / 博雅汉语：初级起步篇 1-2',
    level: 'Elementary / 初级起步',
    content: courseContent,
    updatedAt: new Date().toISOString(),
  },
  words,
  records: existingRecords,
  updatedAt: new Date().toISOString(),
};

await fs.writeFile(learningPath, JSON.stringify(allLearning, null, 2), 'utf8');
console.log(`Imported Boya course pack for ${otis.username}: ${words.length} words.`);
