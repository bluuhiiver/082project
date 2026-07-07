window.LL_DATA = window.LL_DATA || {};
window.LL_DATA.zh = {
  code: 'zh',
  name: 'Chinese',
  nativeName: '中文',
  flag: '🇨🇳',
  ttsLang: 'zh-CN',

  vocab: [
    // greetings (10)
    { id: 'zh-v-1', category: 'greetings', word: '你好', pron: 'nǐ hǎo', meaning: 'hello', example: '你好，很高兴认识你。', exampleMeaning: 'Hello, nice to meet you.' },
    { id: 'zh-v-2', category: 'greetings', word: '再见', pron: 'zài jiàn', meaning: 'goodbye', example: '再见，明天见！', exampleMeaning: 'Goodbye, see you tomorrow!' },
    { id: 'zh-v-3', category: 'greetings', word: '谢谢', pron: 'xiè xiè', meaning: 'thank you', example: '谢谢你的帮助。', exampleMeaning: 'Thank you for your help.' },
    { id: 'zh-v-4', category: 'greetings', word: '不客气', pron: 'bú kè qi', meaning: "you're welcome", example: 'A: 谢谢！ B: 不客气。', exampleMeaning: "A: Thank you! B: You're welcome." },
    { id: 'zh-v-5', category: 'greetings', word: '对不起', pron: 'duì bu qǐ', meaning: 'sorry', example: '对不起，我迟到了。', exampleMeaning: "Sorry, I'm late." },
    { id: 'zh-v-6', category: 'greetings', word: '没关系', pron: 'méi guān xi', meaning: "it's okay / no problem", example: 'A: 对不起！ B: 没关系。', exampleMeaning: "A: Sorry! B: It's okay." },
    { id: 'zh-v-7', category: 'greetings', word: '早上好', pron: 'zǎo shang hǎo', meaning: 'good morning', example: '早上好，你吃早饭了吗？', exampleMeaning: 'Good morning, have you had breakfast?' },
    { id: 'zh-v-8', category: 'greetings', word: '晚安', pron: 'wǎn ān', meaning: 'good night', example: '我要睡觉了，晚安！', exampleMeaning: "I'm going to sleep, good night!" },
    { id: 'zh-v-9', category: 'greetings', word: '请', pron: 'qǐng', meaning: 'please', example: '请坐。', exampleMeaning: 'Please sit down.' },
    { id: 'zh-v-10', category: 'greetings', word: '欢迎', pron: 'huān yíng', meaning: 'welcome', example: '欢迎来我家。', exampleMeaning: 'Welcome to my home.' },

    // numbers (10)
    { id: 'zh-v-11', category: 'numbers', word: '一', pron: 'yī', meaning: 'one', example: '我有一本书。', exampleMeaning: 'I have one book.' },
    { id: 'zh-v-12', category: 'numbers', word: '二', pron: 'èr', meaning: 'two', example: '他买了二十个苹果。', exampleMeaning: 'He bought twenty apples.' },
    { id: 'zh-v-13', category: 'numbers', word: '三', pron: 'sān', meaning: 'three', example: '现在是三点。', exampleMeaning: "It's three o'clock now." },
    { id: 'zh-v-14', category: 'numbers', word: '四', pron: 'sì', meaning: 'four', example: '我家有四口人。', exampleMeaning: 'There are four people in my family.' },
    { id: 'zh-v-15', category: 'numbers', word: '五', pron: 'wǔ', meaning: 'five', example: '这个苹果五块钱。', exampleMeaning: 'This apple costs five yuan.' },
    { id: 'zh-v-16', category: 'numbers', word: '十', pron: 'shí', meaning: 'ten', example: '我们班有十个学生。', exampleMeaning: 'There are ten students in our class.' },
    { id: 'zh-v-17', category: 'numbers', word: '百', pron: 'bǎi', meaning: 'hundred', example: '这本书有一百页。', exampleMeaning: 'This book has one hundred pages.' },
    { id: 'zh-v-18', category: 'numbers', word: '千', pron: 'qiān', meaning: 'thousand', example: '这个包一千块。', exampleMeaning: 'This bag costs one thousand yuan.' },
    { id: 'zh-v-19', category: 'numbers', word: '零', pron: 'líng', meaning: 'zero', example: '我的电话号码有一个零。', exampleMeaning: 'My phone number has a zero in it.' },
    { id: 'zh-v-20', category: 'numbers', word: '第一', pron: 'dì yī', meaning: 'first (ordinal)', example: '这是我第一次来中国。', exampleMeaning: 'This is my first time coming to China.' },

    // family (10)
    { id: 'zh-v-21', category: 'family', word: '家人', pron: 'jiā rén', meaning: 'family members', example: '我的家人都很健康。', exampleMeaning: 'My family members are all healthy.' },
    { id: 'zh-v-22', category: 'family', word: '爸爸', pron: 'bà ba', meaning: 'dad', example: '我爸爸是老师。', exampleMeaning: 'My dad is a teacher.' },
    { id: 'zh-v-23', category: 'family', word: '妈妈', pron: 'mā ma', meaning: 'mom', example: '妈妈在做饭。', exampleMeaning: 'Mom is cooking.' },
    { id: 'zh-v-24', category: 'family', word: '哥哥', pron: 'gē ge', meaning: 'older brother', example: '我哥哥比我大三岁。', exampleMeaning: 'My older brother is three years older than me.' },
    { id: 'zh-v-25', category: 'family', word: '姐姐', pron: 'jiě jie', meaning: 'older sister', example: '姐姐在北京工作。', exampleMeaning: 'My older sister works in Beijing.' },
    { id: 'zh-v-26', category: 'family', word: '弟弟', pron: 'dì di', meaning: 'younger brother', example: '我弟弟还在上学。', exampleMeaning: 'My younger brother is still in school.' },
    { id: 'zh-v-27', category: 'family', word: '妹妹', pron: 'mèi mei', meaning: 'younger sister', example: '妹妹喜欢画画。', exampleMeaning: 'My younger sister likes drawing.' },
    { id: 'zh-v-28', category: 'family', word: '爷爷', pron: 'yé ye', meaning: 'paternal grandfather', example: '爷爷每天早上散步。', exampleMeaning: 'Grandpa takes a walk every morning.' },
    { id: 'zh-v-29', category: 'family', word: '奶奶', pron: 'nǎi nai', meaning: 'paternal grandmother', example: '奶奶做的菜很好吃。', exampleMeaning: "Grandma's cooking is delicious." },
    { id: 'zh-v-30', category: 'family', word: '孩子', pron: 'hái zi', meaning: 'child', example: '他们有两个孩子。', exampleMeaning: 'They have two children.' },

    // food (10)
    { id: 'zh-v-31', category: 'food', word: '米饭', pron: 'mǐ fàn', meaning: 'cooked rice', example: '我每天都吃米饭。', exampleMeaning: 'I eat rice every day.' },
    { id: 'zh-v-32', category: 'food', word: '面条', pron: 'miàn tiáo', meaning: 'noodles', example: '这家店的面条很好吃。', exampleMeaning: "This shop's noodles are delicious." },
    { id: 'zh-v-33', category: 'food', word: '茶', pron: 'chá', meaning: 'tea', example: '我喜欢喝绿茶。', exampleMeaning: 'I like drinking green tea.' },
    { id: 'zh-v-34', category: 'food', word: '水', pron: 'shuǐ', meaning: 'water', example: '请给我一杯水。', exampleMeaning: 'Please give me a glass of water.' },
    { id: 'zh-v-35', category: 'food', word: '鸡蛋', pron: 'jī dàn', meaning: 'egg', example: '早餐我吃了一个鸡蛋。', exampleMeaning: 'I ate an egg for breakfast.' },
    { id: 'zh-v-36', category: 'food', word: '水果', pron: 'shuǐ guǒ', meaning: 'fruit', example: '你喜欢吃什么水果？', exampleMeaning: 'What fruit do you like to eat?' },
    { id: 'zh-v-37', category: 'food', word: '蔬菜', pron: 'shū cài', meaning: 'vegetable', example: '多吃蔬菜对身体好。', exampleMeaning: 'Eating more vegetables is good for your health.' },
    { id: 'zh-v-38', category: 'food', word: '肉', pron: 'ròu', meaning: 'meat', example: '我不太喜欢吃肉。', exampleMeaning: "I don't really like eating meat." },
    { id: 'zh-v-39', category: 'food', word: '好吃', pron: 'hǎo chī', meaning: 'delicious', example: '这个菜真好吃！', exampleMeaning: 'This dish is really delicious!' },
    { id: 'zh-v-40', category: 'food', word: '饿', pron: 'è', meaning: 'hungry', example: '我很饿，想吃点东西。', exampleMeaning: "I'm very hungry, I want to eat something." },

    // time (10)
    { id: 'zh-v-41', category: 'time', word: '现在', pron: 'xiàn zài', meaning: 'now', example: '现在几点了？', exampleMeaning: 'What time is it now?' },
    { id: 'zh-v-42', category: 'time', word: '今天', pron: 'jīn tiān', meaning: 'today', example: '今天天气很好。', exampleMeaning: 'The weather is nice today.' },
    { id: 'zh-v-43', category: 'time', word: '明天', pron: 'míng tiān', meaning: 'tomorrow', example: '明天我们去公园吧。', exampleMeaning: "Let's go to the park tomorrow." },
    { id: 'zh-v-44', category: 'time', word: '昨天', pron: 'zuó tiān', meaning: 'yesterday', example: '昨天我很忙。', exampleMeaning: 'I was very busy yesterday.' },
    { id: 'zh-v-45', category: 'time', word: '星期', pron: 'xīng qī', meaning: 'week', example: '这个星期我很忙。', exampleMeaning: "I'm busy this week." },
    { id: 'zh-v-46', category: 'time', word: '小时', pron: 'xiǎo shí', meaning: 'hour', example: '这部电影两个小时。', exampleMeaning: 'This movie is two hours long.' },
    { id: 'zh-v-47', category: 'time', word: '分钟', pron: 'fēn zhōng', meaning: 'minute', example: '再等五分钟。', exampleMeaning: 'Wait five more minutes.' },
    { id: 'zh-v-48', category: 'time', word: '早上', pron: 'zǎo shang', meaning: 'morning', example: '我早上七点起床。', exampleMeaning: 'I get up at seven in the morning.' },
    { id: 'zh-v-49', category: 'time', word: '晚上', pron: 'wǎn shang', meaning: 'evening / night', example: '晚上我们去看电影。', exampleMeaning: "We're going to watch a movie tonight." },
    { id: 'zh-v-50', category: 'time', word: '以后', pron: 'yǐ hòu', meaning: 'afterwards / later', example: '下课以后我们去吃饭。', exampleMeaning: "Let's go eat after class." },

    // travel (10)
    { id: 'zh-v-51', category: 'travel', word: '飞机', pron: 'fēi jī', meaning: 'airplane', example: '我坐飞机去北京。', exampleMeaning: "I'm taking a plane to Beijing." },
    { id: 'zh-v-52', category: 'travel', word: '火车站', pron: 'huǒ chē zhàn', meaning: 'train station', example: '火车站离这儿不远。', exampleMeaning: "The train station isn't far from here." },
    { id: 'zh-v-53', category: 'travel', word: '机场', pron: 'jī chǎng', meaning: 'airport', example: '我们去机场接他。', exampleMeaning: "We're going to the airport to pick him up." },
    { id: 'zh-v-54', category: 'travel', word: '护照', pron: 'hù zhào', meaning: 'passport', example: '别忘了带护照。', exampleMeaning: "Don't forget to bring your passport." },
    { id: 'zh-v-55', category: 'travel', word: '酒店', pron: 'jiǔ diàn', meaning: 'hotel', example: '这家酒店很干净。', exampleMeaning: 'This hotel is very clean.' },
    { id: 'zh-v-56', category: 'travel', word: '地图', pron: 'dì tú', meaning: 'map', example: '你能给我看看地图吗？', exampleMeaning: 'Can you show me the map?' },
    { id: 'zh-v-57', category: 'travel', word: '出租车', pron: 'chū zū chē', meaning: 'taxi', example: '我们打出租车去吧。', exampleMeaning: "Let's take a taxi." },
    { id: 'zh-v-58', category: 'travel', word: '地铁', pron: 'dì tiě', meaning: 'subway', example: '坐地铁比较快。', exampleMeaning: 'Taking the subway is faster.' },
    { id: 'zh-v-59', category: 'travel', word: '路', pron: 'lù', meaning: 'road / way', example: '这条路很长。', exampleMeaning: 'This road is very long.' },
    { id: 'zh-v-60', category: 'travel', word: '旅行', pron: 'lǚ xíng', meaning: 'to travel', example: '我很喜欢一个人旅行。', exampleMeaning: 'I really like traveling alone.' },

    // verbs (10)
    { id: 'zh-v-61', category: 'verbs', word: '是', pron: 'shì', meaning: 'to be', example: '我是学生。', exampleMeaning: 'I am a student.' },
    { id: 'zh-v-62', category: 'verbs', word: '有', pron: 'yǒu', meaning: 'to have', example: '我有一只猫。', exampleMeaning: 'I have a cat.' },
    { id: 'zh-v-63', category: 'verbs', word: '去', pron: 'qù', meaning: 'to go', example: '我们去超市吧。', exampleMeaning: "Let's go to the supermarket." },
    { id: 'zh-v-64', category: 'verbs', word: '来', pron: 'lái', meaning: 'to come', example: '你什么时候来我家？', exampleMeaning: 'When are you coming to my house?' },
    { id: 'zh-v-65', category: 'verbs', word: '吃', pron: 'chī', meaning: 'to eat', example: '你吃早饭了吗？', exampleMeaning: 'Have you eaten breakfast?' },
    { id: 'zh-v-66', category: 'verbs', word: '喝', pron: 'hē', meaning: 'to drink', example: '我想喝咖啡。', exampleMeaning: 'I want to drink coffee.' },
    { id: 'zh-v-67', category: 'verbs', word: '看', pron: 'kàn', meaning: 'to look / to watch', example: '我喜欢看电影。', exampleMeaning: 'I like watching movies.' },
    { id: 'zh-v-68', category: 'verbs', word: '说', pron: 'shuō', meaning: 'to speak / to say', example: '他说中文说得很好。', exampleMeaning: 'He speaks Chinese very well.' },
    { id: 'zh-v-69', category: 'verbs', word: '买', pron: 'mǎi', meaning: 'to buy', example: '我想买一件衣服。', exampleMeaning: 'I want to buy a piece of clothing.' },
    { id: 'zh-v-70', category: 'verbs', word: '喜欢', pron: 'xǐ huan', meaning: 'to like', example: '我喜欢学中文。', exampleMeaning: 'I like learning Chinese.' },

    // adjectives (10)
    { id: 'zh-v-71', category: 'adjectives', word: '好', pron: 'hǎo', meaning: 'good', example: '这个主意很好。', exampleMeaning: 'This idea is very good.' },
    { id: 'zh-v-72', category: 'adjectives', word: '大', pron: 'dà', meaning: 'big', example: '这个房子很大。', exampleMeaning: 'This house is very big.' },
    { id: 'zh-v-73', category: 'adjectives', word: '小', pron: 'xiǎo', meaning: 'small', example: '这只狗很小。', exampleMeaning: 'This dog is very small.' },
    { id: 'zh-v-74', category: 'adjectives', word: '多', pron: 'duō', meaning: 'many / much', example: '今天的作业很多。', exampleMeaning: "There's a lot of homework today." },
    { id: 'zh-v-75', category: 'adjectives', word: '漂亮', pron: 'piào liang', meaning: 'pretty', example: '这条裙子很漂亮。', exampleMeaning: 'This skirt is very pretty.' },
    { id: 'zh-v-76', category: 'adjectives', word: '贵', pron: 'guì', meaning: 'expensive', example: '这个手机太贵了。', exampleMeaning: 'This phone is too expensive.' },
    { id: 'zh-v-77', category: 'adjectives', word: '便宜', pron: 'pián yi', meaning: 'cheap', example: '这里的水果很便宜。', exampleMeaning: 'The fruit here is very cheap.' },
    { id: 'zh-v-78', category: 'adjectives', word: '高兴', pron: 'gāo xìng', meaning: 'happy', example: '认识你我很高兴。', exampleMeaning: "I'm happy to meet you." },
    { id: 'zh-v-79', category: 'adjectives', word: '累', pron: 'lèi', meaning: 'tired', example: '今天工作太累了。', exampleMeaning: 'Work was too tiring today.' },
    { id: 'zh-v-80', category: 'adjectives', word: '忙', pron: 'máng', meaning: 'busy', example: '我最近很忙。', exampleMeaning: "I've been very busy recently." }
  ],

  grammar: [
    {
      id: 'zh-g-1',
      title: 'Basic Word Order (Subject–Verb–Object)',
      explanation: 'Mandarin sentence order is very similar to English: subject first, then verb, then object. Unlike Korean or Japanese, the verb does not move to the end of the sentence. Getting this order right is the foundation for building all other sentences.',
      pattern: 'Subject + Verb + Object',
      examples: [
        { target: '我喝茶。', meaning: 'I drink tea.' },
        { target: '他看电影。', meaning: 'He watches a movie.' },
        { target: '我们学中文。', meaning: 'We study Chinese.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correctly ordered sentence for "I eat rice."', choices: ['我米饭吃。', '我吃米饭。', '吃我米饭。', '米饭我吃。'], answerIndex: 1 },
        { type: 'fill', prompt: 'Fill in the blank to form "She buys fruit.": 她___水果。', answer: '买', hint: 'the verb "to buy" (mǎi)' }
      ]
    },
    {
      id: 'zh-g-2',
      title: 'The Verb 是 (to be)',
      explanation: '是 (shì) links two nouns, like "A is B," and is used mainly for identity, such as naming a profession or nationality — not for describing qualities like "tall" or "happy" (those use adjectives directly, without 是). The negative form is 不是.',
      pattern: 'A + 是 + B / A + 不是 + B',
      examples: [
        { target: '我是老师。', meaning: 'I am a teacher.' },
        { target: '他是中国人。', meaning: 'He is Chinese.' },
        { target: '这不是我的书。', meaning: 'This is not my book.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct sentence for "She is a student."', choices: ['她学生是。', '她是学生。', '她很学生。', '她学生很。'], answerIndex: 1 },
        { type: 'fill', prompt: 'Fill in the blank to say "This is not tea.": 这___茶。', answer: '不是', hint: 'negative form of 是 (shì)' }
      ]
    },
    {
      id: 'zh-g-3',
      title: 'Measure Words (量词)',
      explanation: 'When counting nouns in Chinese, you must use a measure word between the number and the noun — you cannot say a number directly before a noun as in English. 个 (gè) is the most common, general-purpose measure word, but many nouns pair with specific ones, like 本 for books.',
      pattern: 'Number + Measure Word + Noun',
      examples: [
        { target: '一个人', meaning: 'one person' },
        { target: '两本书', meaning: 'two books' },
        { target: '三杯水', meaning: 'three cups of water' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct way to say "three apples."', choices: ['三苹果', '三个苹果', '苹果三个', '个三苹果'], answerIndex: 1 },
        { type: 'fill', prompt: 'Fill in the measure word to say "one book": 一___书', answer: '本', hint: 'measure word for books, pronounced běn' }
      ]
    },
    {
      id: 'zh-g-4',
      title: 'Negation with 不 and 没',
      explanation: '不 (bù) negates habitual actions, states, and future plans, and is used with 是 and most other verbs. 没 (méi) negates 有 ("to have") and is used to say something did not happen in the past. Choosing the right one is essential — 不有 is always incorrect.',
      pattern: '不 + Verb (general) / 没 + 有',
      examples: [
        { target: '我不喜欢咖啡。', meaning: "I don't like coffee." },
        { target: '我没有钱。', meaning: "I don't have money." },
        { target: '他昨天没去学校。', meaning: 'He did not go to school yesterday.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct negation for "I don\'t have a car."', choices: ['我不有车。', '我没有车。', '我不车。', '我没车是。'], answerIndex: 1 },
        { type: 'fill', prompt: 'Fill in the blank: "He does not eat meat." 他___吃肉。', answer: '不', hint: 'negates ordinary verbs, pronounced bù' }
      ]
    },
    {
      id: 'zh-g-5',
      title: 'Yes/No Questions with 吗',
      explanation: 'The easiest way to turn a statement into a yes/no question is to simply add the particle 吗 (ma) to the very end — the word order of the rest of the sentence does not change at all. This is much simpler than English, which requires rearranging the sentence.',
      pattern: 'Statement + 吗？',
      examples: [
        { target: '你是学生吗？', meaning: 'Are you a student?' },
        { target: '你喜欢喝茶吗？', meaning: 'Do you like drinking tea?' },
        { target: '他去北京吗？', meaning: 'Is he going to Beijing?' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct question form of "他是老师。" (He is a teacher.)', choices: ['他是老师吗？', '吗他是老师？', '他吗是老师？', '他是吗老师？'], answerIndex: 0 },
        { type: 'fill', prompt: 'Turn this into a question: "你喜欢中国菜___？"', answer: '吗', hint: 'question particle placed at the end of a sentence' }
      ]
    },
    {
      id: 'zh-g-6',
      title: 'Possession and Modification with 的',
      explanation: '的 (de) links a modifier to the noun that follows it, similar to "\'s" or "of" in English. It is most commonly used to show possession (我的 = "my/mine") but also links longer descriptive phrases to a following noun.',
      pattern: 'Modifier/Owner + 的 + Noun',
      examples: [
        { target: '这是我的手机。', meaning: 'This is my phone.' },
        { target: '他是我的朋友。', meaning: 'He is my friend.' },
        { target: '这是妈妈做的菜。', meaning: 'This is the dish mom made.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct way to say "my book."', choices: ['我书的', '的我书', '我的书', '书我的'], answerIndex: 2 },
        { type: 'fill', prompt: 'Fill in the blank to say "his car": 他___车', answer: '的', hint: 'possessive particle, pronounced de' }
      ]
    },
    {
      id: 'zh-g-7',
      title: 'Demonstratives 这 and 那',
      explanation: '这 (zhè, "this") refers to something near the speaker, and 那 (nà, "that") refers to something farther away. Both combine with measure words to point at specific nouns, e.g. 这个 ("this one") and 那本 ("that book").',
      pattern: '这/那 + (Measure Word) + Noun',
      examples: [
        { target: '这个很好吃。', meaning: 'This one is delicious.' },
        { target: '那本书是谁的？', meaning: 'Whose book is that?' },
        { target: '我喜欢这件衣服。', meaning: 'I like this piece of clothing.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct word for "that person" (far from speaker).', choices: ['这个人', '那个人', '这人那', '那这个人'], answerIndex: 1 },
        { type: 'fill', prompt: 'Fill in the blank to say "this cup of tea": ___杯茶', answer: '这', hint: 'means "this," pronounced zhè' }
      ]
    },
    {
      id: 'zh-g-8',
      title: 'The Aspect Particle 了 (Completed Action)',
      explanation: '了 (le) placed after a verb marks that an action has been completed, often (but not always) referring to the past. It is different from a general past-tense marker — it emphasizes that something has happened or changed, so it is often left out for habitual or ongoing actions.',
      pattern: 'Subject + Verb + 了 + (Object)',
      examples: [
        { target: '我吃了。', meaning: 'I have eaten.' },
        { target: '她买了一件衣服。', meaning: 'She bought a piece of clothing.' },
        { target: '他去了北京。', meaning: 'He went to Beijing.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct sentence for "I already ate breakfast."', choices: ['我吃早饭了。', '我了吃早饭。', '我吃了早饭了了。', '了我吃早饭。'], answerIndex: 0 },
        { type: 'fill', prompt: 'Fill in the blank to show completed action: "他看___那部电影。" (He watched that movie.)', answer: '了', hint: 'aspect particle marking completion, pronounced le' }
      ]
    }
  ],

  dialogues: [
    {
      id: 'zh-d-1',
      title: 'Self-Introduction',
      scenario: 'Two students meet for the first time on the first day of class.',
      lines: [
        { speaker: 'A', target: '你好，我叫王丽。你叫什么名字？', meaning: "Hello, my name is Wang Li. What's your name?" },
        { speaker: 'B', target: '你好，我叫大卫。很高兴认识你。', meaning: 'Hello, my name is David. Nice to meet you.' },
        { speaker: 'A', target: '你是哪国人？', meaning: 'What country are you from?' },
        { speaker: 'B', target: '我是美国人。你呢？', meaning: 'I am American. What about you?' },
        { speaker: 'A', target: '我是中国人，我在北京长大。', meaning: 'I am Chinese, I grew up in Beijing.' },
        { speaker: 'B', target: '真的吗？我很喜欢北京。', meaning: 'Really? I really like Beijing.' },
        { speaker: 'A', target: '有机会我可以带你去玩。', meaning: 'If there is a chance, I can take you sightseeing.' },
        { speaker: 'B', target: '太好了，谢谢你！', meaning: "That's great, thank you!" }
      ]
    },
    {
      id: 'zh-d-2',
      title: 'Ordering at a Cafe',
      scenario: 'A customer orders coffee and food at a small cafe.',
      lines: [
        { speaker: 'A', target: '欢迎光临，您想喝点什么？', meaning: 'Welcome, what would you like to drink?' },
        { speaker: 'B', target: '我要一杯拿铁，谢谢。', meaning: "I'd like a latte, thank you." },
        { speaker: 'A', target: '要热的还是冰的？', meaning: 'Hot or iced?' },
        { speaker: 'B', target: '冰的，谢谢。你们有蛋糕吗？', meaning: 'Iced, thank you. Do you have cake?' },
        { speaker: 'A', target: '有，我们有巧克力蛋糕和芝士蛋糕。', meaning: 'Yes, we have chocolate cake and cheesecake.' },
        { speaker: 'B', target: '那我要一块芝士蛋糕。', meaning: "Then I'll have a piece of cheesecake." },
        { speaker: 'A', target: '好的，一共三十五块。', meaning: "Okay, that's thirty-five yuan in total." },
        { speaker: 'B', target: '给你钱，谢谢！', meaning: "Here's the money, thank you!" }
      ]
    },
    {
      id: 'zh-d-3',
      title: 'Asking for Directions',
      scenario: 'A tourist stops a passerby to ask how to get to the train station.',
      lines: [
        { speaker: 'A', target: '不好意思，请问火车站怎么走？', meaning: 'Excuse me, how do I get to the train station?' },
        { speaker: 'B', target: '你一直往前走，然后往左转。', meaning: 'Go straight ahead, then turn left.' },
        { speaker: 'A', target: '走多久能到？', meaning: 'How long does it take to get there?' },
        { speaker: 'B', target: '走路大概十五分钟。', meaning: "It's about fifteen minutes on foot." },
        { speaker: 'A', target: '也可以坐公交车吗？', meaning: 'Can I also take the bus?' },
        { speaker: 'B', target: '可以，坐三号公交车两站就到。', meaning: 'Yes, take bus number three, two stops and you\'re there.' },
        { speaker: 'A', target: '太感谢了！', meaning: 'Thank you so much!' },
        { speaker: 'B', target: '不客气，一路顺利！', meaning: 'You\'re welcome, safe travels!' }
      ]
    },
    {
      id: 'zh-d-4',
      title: 'Shopping',
      scenario: 'A customer is buying a shirt at a clothing store and negotiates the price.',
      lines: [
        { speaker: 'A', target: '您好，我可以试试这件衣服吗？', meaning: 'Hello, can I try on this piece of clothing?' },
        { speaker: 'B', target: '当然可以，试衣间在那边。', meaning: 'Of course, the fitting room is over there.' },
        { speaker: 'A', target: '这件多少钱？', meaning: 'How much is this one?' },
        { speaker: 'B', target: '这件一百八十块。', meaning: 'This one is one hundred eighty yuan.' },
        { speaker: 'A', target: '有点儿贵，可以便宜一点吗？', meaning: "That's a bit expensive, can it be a little cheaper?" },
        { speaker: 'B', target: '好吧，一百五十块给你。', meaning: "Alright, I'll give it to you for one hundred fifty." },
        { speaker: 'A', target: '好的，我要这件，谢谢！', meaning: "Okay, I'll take this one, thank you!" },
        { speaker: 'B', target: '谢谢惠顾，欢迎再来。', meaning: 'Thank you for shopping with us, please come again.' }
      ]
    }
  ],

  listening: [
    {
      id: 'zh-l-1',
      target: '我姓李。',
      meaning: 'My family name is Li.',
      choices: ['My family name is Li.', 'I am from Beijing.', 'I like tea.', 'I am a teacher.'],
      answerIndex: 0
    },
    {
      id: 'zh-l-2',
      target: '这是我的电话号码。',
      meaning: 'This is my phone number.',
      choices: ['This is my address.', 'This is my phone number.', 'This is my passport.', 'This is my ticket.'],
      answerIndex: 1
    },
    {
      id: 'zh-l-3',
      target: '今天下午我要去银行。',
      meaning: 'This afternoon I need to go to the bank.',
      choices: ['This morning I went to school.', 'This afternoon I need to go to the bank.', 'Tomorrow I will go shopping.', 'Tonight I will watch a movie.'],
      answerIndex: 1
    },
    {
      id: 'zh-l-4',
      target: '请问，洗手间在哪里？',
      meaning: 'Excuse me, where is the restroom?',
      choices: ['Excuse me, where is the exit?', 'Excuse me, what time is it?', 'Excuse me, where is the restroom?', 'Excuse me, how much is this?'],
      answerIndex: 2
    },
    {
      id: 'zh-l-5',
      target: '我的中文说得不太好。',
      meaning: "My Chinese isn't spoken very well.",
      choices: ["My Chinese isn't spoken very well.", 'My English is very good.', 'I study Chinese every day.', 'I want to learn Japanese.'],
      answerIndex: 0
    },
    {
      id: 'zh-l-6',
      target: '外面在下雨，你带伞了吗？',
      meaning: "It's raining outside, did you bring an umbrella?",
      choices: ['It is very sunny today.', "It's raining outside, did you bring an umbrella?", 'It is very cold today.', 'It will snow tomorrow.'],
      answerIndex: 1
    },
    {
      id: 'zh-l-7',
      target: '这家餐厅的服务员很热情。',
      meaning: 'The waitstaff at this restaurant are very friendly.',
      choices: ['This restaurant is very expensive.', 'This restaurant is closed today.', 'The waitstaff at this restaurant are very friendly.', 'The food at this restaurant is spicy.'],
      answerIndex: 2
    },
    {
      id: 'zh-l-8',
      target: '虽然很累，但是我还想去跑步。',
      meaning: "Although I'm very tired, I still want to go running.",
      choices: ["Although I'm very tired, I still want to go running.", "Although I'm busy, I have time to rest.", "I'm tired so I will sleep early.", "I don't like running at all."],
      answerIndex: 0
    },
    {
      id: 'zh-l-9',
      target: '如果明天天气好，我们就去爬山。',
      meaning: "If the weather is good tomorrow, we'll go hiking.",
      choices: ['We went hiking yesterday because it was sunny.', "If the weather is good tomorrow, we'll go hiking.", 'The weather was bad, so we stayed home.', 'We will go swimming next week.'],
      answerIndex: 1
    },
    {
      id: 'zh-l-10',
      target: '他一边听音乐一边做作业。',
      meaning: 'He does homework while listening to music.',
      choices: ['He listens to music after finishing homework.', 'He never listens to music.', 'He does homework while listening to music.', 'He is teaching a music class.'],
      answerIndex: 2
    },
    {
      id: 'zh-l-11',
      target: '要是我早知道堵车,我就早点儿出发了。',
      meaning: "If I had known earlier there'd be traffic, I would have left earlier.",
      choices: ['I always leave early to avoid traffic.', 'The traffic today was not bad at all.', "If I had known earlier there'd be traffic, I would have left earlier.", 'I decided to take the subway instead of driving.'],
      answerIndex: 2
    },
    {
      id: 'zh-l-12',
      target: '这个问题比我想象的复杂得多。',
      meaning: 'This problem is much more complicated than I imagined.',
      choices: ['This problem is easier than I expected.', 'This problem is much more complicated than I imagined.', 'I have never thought about this problem.', 'This problem was solved very quickly.'],
      answerIndex: 1
    }
  ]
};
