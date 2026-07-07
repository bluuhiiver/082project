window.LL_DATA = window.LL_DATA || {};
window.LL_DATA.ja = {
  code: 'ja',
  name: 'Japanese',
  nativeName: '日本語',
  flag: '🇯🇵',
  ttsLang: 'ja-JP',
  vocab: [
    // greetings
    { id: 'ja-v-1', category: 'greetings', word: 'こんにちは', pron: 'konnichiwa', meaning: 'Hello / Good afternoon', example: 'こんにちは、元気ですか。', exampleMeaning: 'Hello, how are you?' },
    { id: 'ja-v-2', category: 'greetings', word: 'おはようございます', pron: 'ohayou gozaimasu', meaning: 'Good morning (polite)', example: 'おはようございます、先生。', exampleMeaning: 'Good morning, teacher.' },
    { id: 'ja-v-3', category: 'greetings', word: 'こんばんは', pron: 'konbanwa', meaning: 'Good evening', example: 'こんばんは、田中さん。', exampleMeaning: 'Good evening, Mr. Tanaka.' },
    { id: 'ja-v-4', category: 'greetings', word: 'さようなら', pron: 'sayounara', meaning: 'Goodbye', example: 'さようなら、また明日。', exampleMeaning: 'Goodbye, see you tomorrow.' },
    { id: 'ja-v-5', category: 'greetings', word: 'ありがとうございます', pron: 'arigatou gozaimasu', meaning: 'Thank you (polite)', example: '手伝ってくれてありがとうございます。', exampleMeaning: 'Thank you for helping me.' },
    { id: 'ja-v-6', category: 'greetings', word: 'すみません', pron: 'sumimasen', meaning: 'Excuse me / I am sorry', example: 'すみません、駅はどこですか。', exampleMeaning: 'Excuse me, where is the station?' },
    { id: 'ja-v-7', category: 'greetings', word: 'お願いします', pron: 'onegaishimasu', meaning: 'Please (when requesting something)', example: 'コーヒーをお願いします。', exampleMeaning: 'Coffee, please.' },
    { id: 'ja-v-8', category: 'greetings', word: 'はじめまして', pron: 'hajimemashite', meaning: 'Nice to meet you', example: 'はじめまして、山田です。', exampleMeaning: 'Nice to meet you, I am Yamada.' },
    { id: 'ja-v-9', category: 'greetings', word: 'お元気ですか', pron: 'ogenki desu ka', meaning: 'How are you?', example: 'お元気ですか。はい、元気です。', exampleMeaning: 'How are you? Yes, I am fine.' },
    { id: 'ja-v-10', category: 'greetings', word: 'またね', pron: 'mata ne', meaning: 'See you later (casual)', example: 'じゃあ、またね。', exampleMeaning: 'Well then, see you later.' },
    // numbers
    { id: 'ja-v-11', category: 'numbers', word: '一', pron: 'ichi', meaning: 'one', example: '一時に会いましょう。', exampleMeaning: 'Let\'s meet at one o\'clock.' },
    { id: 'ja-v-12', category: 'numbers', word: '二', pron: 'ni', meaning: 'two', example: '二人で行きます。', exampleMeaning: 'The two of us will go.' },
    { id: 'ja-v-13', category: 'numbers', word: '三', pron: 'san', meaning: 'three', example: '三時間勉強しました。', exampleMeaning: 'I studied for three hours.' },
    { id: 'ja-v-14', category: 'numbers', word: '四', pron: 'yon', meaning: 'four', example: '四月に日本へ行きます。', exampleMeaning: 'I am going to Japan in April.' },
    { id: 'ja-v-15', category: 'numbers', word: '五', pron: 'go', meaning: 'five', example: '五分待ってください。', exampleMeaning: 'Please wait five minutes.' },
    { id: 'ja-v-16', category: 'numbers', word: '六', pron: 'roku', meaning: 'six', example: '六時に起きます。', exampleMeaning: 'I get up at six o\'clock.' },
    { id: 'ja-v-17', category: 'numbers', word: '七', pron: 'nana', meaning: 'seven', example: '七月は暑いです。', exampleMeaning: 'July is hot.' },
    { id: 'ja-v-18', category: 'numbers', word: '八', pron: 'hachi', meaning: 'eight', example: '八時に寝ます。', exampleMeaning: 'I go to bed at eight o\'clock.' },
    { id: 'ja-v-19', category: 'numbers', word: '九', pron: 'kyuu', meaning: 'nine', example: '九時から仕事です。', exampleMeaning: 'Work starts at nine o\'clock.' },
    { id: 'ja-v-20', category: 'numbers', word: '十', pron: 'juu', meaning: 'ten', example: '十分だけ休みます。', exampleMeaning: 'I will rest for just ten minutes.' },
    // family
    { id: 'ja-v-21', category: 'family', word: '家族', pron: 'kazoku', meaning: 'family', example: '私の家族は四人です。', exampleMeaning: 'My family has four people.' },
    { id: 'ja-v-22', category: 'family', word: '父', pron: 'chichi', meaning: 'father (my own)', example: '父は医者です。', exampleMeaning: 'My father is a doctor.' },
    { id: 'ja-v-23', category: 'family', word: '母', pron: 'haha', meaning: 'mother (my own)', example: '母は料理が上手です。', exampleMeaning: 'My mother is good at cooking.' },
    { id: 'ja-v-24', category: 'family', word: '兄', pron: 'ani', meaning: 'older brother (my own)', example: '兄は大学生です。', exampleMeaning: 'My older brother is a university student.' },
    { id: 'ja-v-25', category: 'family', word: '姉', pron: 'ane', meaning: 'older sister (my own)', example: '姉と買い物に行きました。', exampleMeaning: 'I went shopping with my older sister.' },
    { id: 'ja-v-26', category: 'family', word: '弟', pron: 'otouto', meaning: 'younger brother', example: '弟はまだ子供です。', exampleMeaning: 'My younger brother is still a child.' },
    { id: 'ja-v-27', category: 'family', word: '妹', pron: 'imouto', meaning: 'younger sister', example: '妹はピアノが好きです。', exampleMeaning: 'My younger sister likes the piano.' },
    { id: 'ja-v-28', category: 'family', word: '両親', pron: 'ryoushin', meaning: 'parents', example: '両親は大阪に住んでいます。', exampleMeaning: 'My parents live in Osaka.' },
    { id: 'ja-v-29', category: 'family', word: '子供', pron: 'kodomo', meaning: 'child / children', example: '子供たちは公園で遊んでいます。', exampleMeaning: 'The children are playing in the park.' },
    { id: 'ja-v-30', category: 'family', word: '祖父母', pron: 'sofubo', meaning: 'grandparents', example: '祖父母の家は静かです。', exampleMeaning: 'My grandparents\' house is quiet.' },
    // food
    { id: 'ja-v-31', category: 'food', word: 'ご飯', pron: 'gohan', meaning: 'rice / meal', example: '朝ご飯を食べましたか。', exampleMeaning: 'Did you eat breakfast?' },
    { id: 'ja-v-32', category: 'food', word: '水', pron: 'mizu', meaning: 'water', example: '水を一杯ください。', exampleMeaning: 'Please give me a glass of water.' },
    { id: 'ja-v-33', category: 'food', word: 'パン', pron: 'pan', meaning: 'bread', example: '毎朝パンを食べます。', exampleMeaning: 'I eat bread every morning.' },
    { id: 'ja-v-34', category: 'food', word: '魚', pron: 'sakana', meaning: 'fish', example: 'この魚はとても新鮮です。', exampleMeaning: 'This fish is very fresh.' },
    { id: 'ja-v-35', category: 'food', word: '肉', pron: 'niku', meaning: 'meat', example: '肉より野菜が好きです。', exampleMeaning: 'I like vegetables more than meat.' },
    { id: 'ja-v-36', category: 'food', word: '野菜', pron: 'yasai', meaning: 'vegetable', example: '野菜をたくさん食べましょう。', exampleMeaning: 'Let\'s eat plenty of vegetables.' },
    { id: 'ja-v-37', category: 'food', word: '果物', pron: 'kudamono', meaning: 'fruit', example: 'デザートに果物を食べます。', exampleMeaning: 'I eat fruit for dessert.' },
    { id: 'ja-v-38', category: 'food', word: 'お茶', pron: 'ocha', meaning: 'tea', example: '熱いお茶をどうぞ。', exampleMeaning: 'Please have some hot tea.' },
    { id: 'ja-v-39', category: 'food', word: '卵', pron: 'tamago', meaning: 'egg', example: '卵焼きが大好きです。', exampleMeaning: 'I love rolled omelette.' },
    { id: 'ja-v-40', category: 'food', word: '麺', pron: 'men', meaning: 'noodles', example: 'ラーメンの麺はとても美味しいです。', exampleMeaning: 'Ramen noodles are very delicious.' },
    // time
    { id: 'ja-v-41', category: 'time', word: '今日', pron: 'kyou', meaning: 'today', example: '今日は天気がいいです。', exampleMeaning: 'The weather is nice today.' },
    { id: 'ja-v-42', category: 'time', word: '明日', pron: 'ashita', meaning: 'tomorrow', example: '明日、友達に会います。', exampleMeaning: 'I will meet a friend tomorrow.' },
    { id: 'ja-v-43', category: 'time', word: '昨日', pron: 'kinou', meaning: 'yesterday', example: '昨日は忙しかったです。', exampleMeaning: 'Yesterday was busy.' },
    { id: 'ja-v-44', category: 'time', word: '今', pron: 'ima', meaning: 'now', example: '今、何時ですか。', exampleMeaning: 'What time is it now?' },
    { id: 'ja-v-45', category: 'time', word: '朝', pron: 'asa', meaning: 'morning', example: '朝、走るのが好きです。', exampleMeaning: 'I like running in the morning.' },
    { id: 'ja-v-46', category: 'time', word: '夜', pron: 'yoru', meaning: 'night', example: '夜は静かに勉強します。', exampleMeaning: 'I study quietly at night.' },
    { id: 'ja-v-47', category: 'time', word: '週末', pron: 'shuumatsu', meaning: 'weekend', example: '週末は映画を見ます。', exampleMeaning: 'I watch movies on the weekend.' },
    { id: 'ja-v-48', category: 'time', word: '時間', pron: 'jikan', meaning: 'time / hour', example: '時間がありません。', exampleMeaning: 'I do not have time.' },
    { id: 'ja-v-49', category: 'time', word: '毎日', pron: 'mainichi', meaning: 'every day', example: '毎日日本語を勉強します。', exampleMeaning: 'I study Japanese every day.' },
    { id: 'ja-v-50', category: 'time', word: '来週', pron: 'raishuu', meaning: 'next week', example: '来週、東京へ行きます。', exampleMeaning: 'I am going to Tokyo next week.' },
    // travel
    { id: 'ja-v-51', category: 'travel', word: '駅', pron: 'eki', meaning: 'station', example: '駅まで歩いて行きます。', exampleMeaning: 'I will walk to the station.' },
    { id: 'ja-v-52', category: 'travel', word: '空港', pron: 'kuukou', meaning: 'airport', example: '空港でパスポートを見せます。', exampleMeaning: 'I show my passport at the airport.' },
    { id: 'ja-v-53', category: 'travel', word: '電車', pron: 'densha', meaning: 'train', example: '電車で会社に行きます。', exampleMeaning: 'I go to the office by train.' },
    { id: 'ja-v-54', category: 'travel', word: '切符', pron: 'kippu', meaning: 'ticket', example: '切符を二枚買いました。', exampleMeaning: 'I bought two tickets.' },
    { id: 'ja-v-55', category: 'travel', word: '地図', pron: 'chizu', meaning: 'map', example: '地図を見せてください。', exampleMeaning: 'Please show me the map.' },
    { id: 'ja-v-56', category: 'travel', word: 'ホテル', pron: 'hoteru', meaning: 'hotel', example: 'このホテルは駅から近いです。', exampleMeaning: 'This hotel is close to the station.' },
    { id: 'ja-v-57', category: 'travel', word: '荷物', pron: 'nimotsu', meaning: 'luggage', example: '荷物が重いです。', exampleMeaning: 'The luggage is heavy.' },
    { id: 'ja-v-58', category: 'travel', word: 'パスポート', pron: 'pasupooto', meaning: 'passport', example: 'パスポートを忘れないでください。', exampleMeaning: 'Please do not forget your passport.' },
    { id: 'ja-v-59', category: 'travel', word: '道', pron: 'michi', meaning: 'road / way', example: 'この道をまっすぐ行ってください。', exampleMeaning: 'Please go straight on this road.' },
    { id: 'ja-v-60', category: 'travel', word: '観光', pron: 'kankou', meaning: 'sightseeing', example: '京都で観光を楽しみました。', exampleMeaning: 'I enjoyed sightseeing in Kyoto.' },
    // verbs
    { id: 'ja-v-61', category: 'verbs', word: '食べる', pron: 'taberu', meaning: 'to eat', example: '昼ご飯を食べます。', exampleMeaning: 'I eat lunch.' },
    { id: 'ja-v-62', category: 'verbs', word: '飲む', pron: 'nomu', meaning: 'to drink', example: 'コーヒーを飲みます。', exampleMeaning: 'I drink coffee.' },
    { id: 'ja-v-63', category: 'verbs', word: '行く', pron: 'iku', meaning: 'to go', example: '学校に行きます。', exampleMeaning: 'I go to school.' },
    { id: 'ja-v-64', category: 'verbs', word: '来る', pron: 'kuru', meaning: 'to come', example: '友達が家に来ます。', exampleMeaning: 'A friend is coming to my house.' },
    { id: 'ja-v-65', category: 'verbs', word: '見る', pron: 'miru', meaning: 'to see / to watch', example: '映画を見ます。', exampleMeaning: 'I watch a movie.' },
    { id: 'ja-v-66', category: 'verbs', word: '聞く', pron: 'kiku', meaning: 'to listen / to ask', example: '音楽を聞きます。', exampleMeaning: 'I listen to music.' },
    { id: 'ja-v-67', category: 'verbs', word: '話す', pron: 'hanasu', meaning: 'to speak', example: '日本語を話します。', exampleMeaning: 'I speak Japanese.' },
    { id: 'ja-v-68', category: 'verbs', word: '読む', pron: 'yomu', meaning: 'to read', example: '本を読みます。', exampleMeaning: 'I read a book.' },
    { id: 'ja-v-69', category: 'verbs', word: '書く', pron: 'kaku', meaning: 'to write', example: '手紙を書きます。', exampleMeaning: 'I write a letter.' },
    { id: 'ja-v-70', category: 'verbs', word: '買う', pron: 'kau', meaning: 'to buy', example: '新しい靴を買います。', exampleMeaning: 'I buy new shoes.' },
    // adjectives
    { id: 'ja-v-71', category: 'adjectives', word: '大きい', pron: 'ookii', meaning: 'big', example: 'この家は大きいです。', exampleMeaning: 'This house is big.' },
    { id: 'ja-v-72', category: 'adjectives', word: '小さい', pron: 'chiisai', meaning: 'small', example: 'その犬は小さいです。', exampleMeaning: 'That dog is small.' },
    { id: 'ja-v-73', category: 'adjectives', word: '高い', pron: 'takai', meaning: 'expensive / tall', example: 'このかばんは高いです。', exampleMeaning: 'This bag is expensive.' },
    { id: 'ja-v-74', category: 'adjectives', word: '安い', pron: 'yasui', meaning: 'cheap', example: 'この店は安いです。', exampleMeaning: 'This shop is cheap.' },
    { id: 'ja-v-75', category: 'adjectives', word: 'おいしい', pron: 'oishii', meaning: 'delicious', example: 'このケーキはおいしいです。', exampleMeaning: 'This cake is delicious.' },
    { id: 'ja-v-76', category: 'adjectives', word: '楽しい', pron: 'tanoshii', meaning: 'fun', example: '旅行はとても楽しいです。', exampleMeaning: 'Traveling is very fun.' },
    { id: 'ja-v-77', category: 'adjectives', word: '難しい', pron: 'muzukashii', meaning: 'difficult', example: '漢字は難しいです。', exampleMeaning: 'Kanji is difficult.' },
    { id: 'ja-v-78', category: 'adjectives', word: '簡単な', pron: 'kantan na', meaning: 'easy / simple', example: 'この問題は簡単です。', exampleMeaning: 'This problem is easy.' },
    { id: 'ja-v-79', category: 'adjectives', word: 'きれいな', pron: 'kirei na', meaning: 'pretty / clean', example: '彼女の部屋はきれいです。', exampleMeaning: 'Her room is clean.' },
    { id: 'ja-v-80', category: 'adjectives', word: '元気な', pron: 'genki na', meaning: 'energetic / healthy', example: '子供たちは元気です。', exampleMeaning: 'The children are energetic.' }
  ],
  grammar: [
    {
      id: 'ja-g-1',
      title: 'The Copula です (desu) - "To Be"',
      explanation: 'です is used to state that something is something else, similar to "is / am / are" in English. It comes at the end of a sentence, right after the noun it describes. The plain/casual equivalent is だ, but です is polite and safe to use in almost any situation as a beginner.',
      pattern: 'Noun + です',
      examples: [
        { target: '私は学生です。', meaning: 'I am a student.' },
        { target: 'これは本です。', meaning: 'This is a book.' },
        { target: '田中さんは先生です。', meaning: 'Mr. Tanaka is a teacher.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct word to complete: これは猫___。 (This is a cat.)', choices: ['です', 'ます', 'ない', 'か'], answerIndex: 0 },
        { type: 'fill', prompt: 'Complete the sentence meaning "I am Japanese.": 私は日本人___。', answer: 'です', hint: 'the polite copula, pronounced "desu"' }
      ]
    },
    {
      id: 'ja-g-2',
      title: 'Topic Particle は (wa)',
      explanation: 'The particle は marks the topic of a sentence - what you are talking about. It is written with the hiragana character "ha" but pronounced "wa" when used as a particle. Everything that follows は comments on or describes that topic.',
      pattern: 'Topic + は + Comment',
      examples: [
        { target: '私は学生です。', meaning: 'As for me, I am a student.' },
        { target: '今日は暑いです。', meaning: 'Today is hot.' },
        { target: 'これは私の本です。', meaning: 'This is my book.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Which particle marks the topic? 私___先生です。 (I am a teacher.)', choices: ['は', 'を', 'に', 'で'], answerIndex: 0 },
        { type: 'fill', prompt: 'Fill in the topic particle: 田中さん___学生です。 (Mr. Tanaka is a student.)', answer: 'は', hint: 'pronounced "wa", written with hiragana ha' }
      ]
    },
    {
      id: 'ja-g-3',
      title: 'Question Particle か (ka)',
      explanation: 'Adding か to the end of a sentence turns it into a question, without changing the word order. Japanese does not need a question mark or a change in intonation - か alone signals that it is a question. Just add it right after です or the verb.',
      pattern: 'Sentence + か。',
      examples: [
        { target: 'これは本ですか。', meaning: 'Is this a book?' },
        { target: '田中さんは学生ですか。', meaning: 'Is Mr. Tanaka a student?' },
        { target: 'コーヒーを飲みますか。', meaning: 'Will you drink coffee?' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Which particle turns a statement into a question? これは水です___。', choices: ['か', 'ね', 'よ', 'な'], answerIndex: 0 },
        { type: 'fill', prompt: 'Make this a question: 学生です___。 (Are you a student?)', answer: 'か', hint: 'add at the very end, no question mark needed' }
      ]
    },
    {
      id: 'ja-g-4',
      title: 'Object Particle を (o) and Direction Particle に (ni)',
      explanation: 'を marks the direct object of a verb - the thing being acted on. に often marks a destination with verbs of movement like 行く (to go), or a specific point in time. Both particles are placed directly after the noun they mark.',
      pattern: 'Noun + を + Verb  /  Place・Time + に + Verb',
      examples: [
        { target: 'パンを食べます。', meaning: 'I eat bread.' },
        { target: '学校に行きます。', meaning: 'I go to school.' },
        { target: '七時に起きます。', meaning: 'I get up at seven o\'clock.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct particle: 水___飲みます。 (I drink water.)', choices: ['を', 'は', 'か', 'と'], answerIndex: 0 },
        { type: 'fill', prompt: 'Fill in the particle for the destination: 東京___行きます。 (I go to Tokyo.)', answer: 'に', hint: 'marks a destination with iku' }
      ]
    },
    {
      id: 'ja-g-5',
      title: 'Polite Present Tense: ます-form',
      explanation: 'The ます-form is the polite way to express present or future actions and is usually the first verb conjugation learners memorize. Verbs change their dictionary-form ending and add ます. It is used in almost all formal and everyday polite speech.',
      pattern: 'Verb stem + ます',
      examples: [
        { target: '毎日日本語を勉強します。', meaning: 'I study Japanese every day.' },
        { target: '明日、友達に会います。', meaning: 'I will meet a friend tomorrow.' },
        { target: '本を読みます。', meaning: 'I read a book.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the polite present form of "to eat" in: 昼ご飯を___。 (I eat lunch.)', choices: ['食べます', '食べる', '食べた', '食べて'], answerIndex: 0 },
        { type: 'fill', prompt: 'Complete with the polite form of "to go": 学校に___。 (I go to school.)', answer: '行きます', hint: 'ikimasu - polite present of iku' }
      ]
    },
    {
      id: 'ja-g-6',
      title: 'Negation: ません and じゃありません',
      explanation: 'To make a verb negative and polite, change ます to ません. To make a noun or na-adjective sentence negative, replace です with じゃありません (the more formal version is ではありません). This is one of the first ways learners express "not."',
      pattern: 'Verb stem + ません  /  Noun + じゃありません',
      examples: [
        { target: 'コーヒーを飲みません。', meaning: 'I do not drink coffee.' },
        { target: 'これは私の本じゃありません。', meaning: 'This is not my book.' },
        { target: '田中さんは先生じゃありません。', meaning: 'Mr. Tanaka is not a teacher.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the negative form: 肉を食べ___。 (I do not eat meat.)', choices: ['ません', 'ます', 'ない', 'なかった'], answerIndex: 0 },
        { type: 'fill', prompt: 'Make this negative: これは水___。 (This is not water.)', answer: 'じゃありません', hint: 'noun negation, polite: ja arimasen' }
      ]
    },
    {
      id: 'ja-g-7',
      title: 'い-Adjectives and な-Adjectives',
      explanation: 'Japanese adjectives come in two types. い-adjectives end in い (like 大きい, "big") and attach directly to a noun or です. な-adjectives (like 元気, "energetic") need な when placed directly before a noun, but drop it before です. Both types can describe a noun or complete a sentence on their own.',
      pattern: 'い-adjective + Noun  /  な-adjective + な + Noun',
      examples: [
        { target: '大きい家に住んでいます。', meaning: 'I live in a big house.' },
        { target: 'この店は安いです。', meaning: 'This shop is cheap.' },
        { target: 'きれいな部屋ですね。', meaning: 'What a pretty room.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct form before the noun: ___人です。 (He is an energetic person.)', choices: ['元気', '元気な', '元気に', '元気の'], answerIndex: 1 },
        { type: 'fill', prompt: 'Complete with the correct adjective: この料理は___です。 (This dish is delicious. Use おいしい.)', answer: 'おいしい', hint: 'i-adjectives attach directly to desu, no na needed' }
      ]
    },
    {
      id: 'ja-g-8',
      title: 'Past Tense and Te-form: ~ました and ~て',
      explanation: 'To talk about the past politely, change ます to ました for verbs, and です to でした for nouns and adjectives. The て-form is used for requests (~てください) and to link actions together, and is formed with specific patterns depending on the verb, for example 食べる becomes 食べて and 行く becomes 行って.',
      pattern: 'Verb stem + ました  /  Verb + て(ください)',
      examples: [
        { target: '昨日、映画を見ました。', meaning: 'I watched a movie yesterday.' },
        { target: '昨日は忙しかったです。', meaning: 'Yesterday was busy.' },
        { target: 'ちょっと待ってください。', meaning: 'Please wait a moment.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the past tense form: 昨日、パンを___。 (I ate bread yesterday.)', choices: ['食べました', '食べます', '食べて', '食べない'], answerIndex: 0 },
        { type: 'fill', prompt: 'Complete with the te-form for a request: ここに座っ___ください。 (Please sit here.)', answer: 'て', hint: 'suwaru becomes suwatte before kudasai' }
      ]
    }
  ],
  dialogues: [
    {
      id: 'ja-d-1',
      title: 'Self-Introduction',
      scenario: 'Two students meet for the first time on the first day of a Japanese language class.',
      lines: [
        { speaker: 'A', target: 'はじめまして。私はソフィアです。', meaning: 'Nice to meet you. I am Sophia.' },
        { speaker: 'B', target: 'はじめまして。田中健太です。よろしくお願いします。', meaning: 'Nice to meet you. I am Kenta Tanaka. Pleased to meet you.' },
        { speaker: 'A', target: '田中さんはどちらから来ましたか。', meaning: 'Mr. Tanaka, where are you from?' },
        { speaker: 'B', target: '大阪から来ました。ソフィアさんは。', meaning: 'I am from Osaka. What about you, Sophia?' },
        { speaker: 'A', target: '私はアメリカから来ました。日本語を勉強しています。', meaning: 'I am from America. I am studying Japanese.' },
        { speaker: 'B', target: 'そうですか。日本語は難しいですか。', meaning: 'Is that so? Is Japanese difficult?' },
        { speaker: 'A', target: '少し難しいですが、楽しいです。', meaning: 'It is a little difficult, but it is fun.' },
        { speaker: 'B', target: '頑張ってください。よろしくお願いします。', meaning: 'Please do your best. Nice to meet you.' }
      ]
    },
    {
      id: 'ja-d-2',
      title: 'Ordering at a Cafe',
      scenario: 'A customer orders food and drink at a Japanese cafe.',
      lines: [
        { speaker: 'A', target: 'いらっしゃいませ。何にしますか。', meaning: 'Welcome. What would you like?' },
        { speaker: 'B', target: 'コーヒーを一つお願いします。', meaning: 'One coffee, please.' },
        { speaker: 'A', target: 'かしこまりました。他に何かいかがですか。', meaning: 'Certainly. Would you like anything else?' },
        { speaker: 'B', target: 'ケーキもありますか。', meaning: 'Do you have cake, too?' },
        { speaker: 'A', target: 'はい、チョコレートケーキとチーズケーキがあります。', meaning: 'Yes, we have chocolate cake and cheesecake.' },
        { speaker: 'B', target: 'じゃあ、チーズケーキをください。', meaning: 'Then, cheesecake, please.' },
        { speaker: 'A', target: 'かしこまりました。少々お待ちください。', meaning: 'Certainly. Please wait a moment.' },
        { speaker: 'B', target: 'ありがとうございます。', meaning: 'Thank you.' }
      ]
    },
    {
      id: 'ja-d-3',
      title: 'Asking for Directions',
      scenario: 'A tourist asks a local how to get to the train station.',
      lines: [
        { speaker: 'A', target: 'すみません、駅はどこですか。', meaning: 'Excuse me, where is the station?' },
        { speaker: 'B', target: '駅ですか。この道をまっすぐ行ってください。', meaning: 'The station? Please go straight on this road.' },
        { speaker: 'A', target: 'まっすぐ行って、それから右ですか、左ですか。', meaning: 'Go straight, and then right or left?' },
        { speaker: 'B', target: '二番目の信号を右に曲がってください。', meaning: 'Please turn right at the second traffic light.' },
        { speaker: 'A', target: '二番目の信号を右ですね。ありがとうございます。', meaning: 'Turn right at the second traffic light, got it. Thank you.' },
        { speaker: 'B', target: '駅まで五分くらいですよ。', meaning: 'It is about five minutes to the station.' },
        { speaker: 'A', target: 'わかりました。本当に助かりました。', meaning: 'I understand. You really helped me.' },
        { speaker: 'B', target: 'どういたしまして。気をつけて。', meaning: 'You are welcome. Take care.' }
      ]
    },
    {
      id: 'ja-d-4',
      title: 'Shopping for Clothes',
      scenario: 'A customer shops for a shirt in a clothing store.',
      lines: [
        { speaker: 'A', target: 'いらっしゃいませ。何かお探しですか。', meaning: 'Welcome. Are you looking for something?' },
        { speaker: 'B', target: 'はい、シャツを探しています。', meaning: 'Yes, I am looking for a shirt.' },
        { speaker: 'A', target: 'このシャツはいかがですか。とても人気です。', meaning: 'How about this shirt? It is very popular.' },
        { speaker: 'B', target: 'いいですね。これはいくらですか。', meaning: 'That is nice. How much is this?' },
        { speaker: 'A', target: '三千円です。', meaning: 'It is 3,000 yen.' },
        { speaker: 'B', target: 'ちょっと高いですね。もっと安いのはありますか。', meaning: 'That is a bit expensive. Do you have a cheaper one?' },
        { speaker: 'A', target: 'こちらは二千円です。色違いもありますよ。', meaning: 'This one is 2,000 yen. There are different colors too.' },
        { speaker: 'B', target: 'それにします。ありがとうございます。', meaning: 'I will take that one. Thank you.' }
      ]
    }
  ],
  listening: [
    { id: 'ja-l-1', target: '名前は何ですか。', meaning: 'What is your name?', choices: ['What is your name?', 'How old are you?', 'Where do you live?', 'What do you do?'], answerIndex: 0 },
    { id: 'ja-l-2', target: 'これはいくらですか。', meaning: 'How much is this?', choices: ['How much is this?', 'What is this?', 'Where is this?', 'Who is this?'], answerIndex: 0 },
    { id: 'ja-l-3', target: '今、何時ですか。', meaning: 'What time is it now?', choices: ['What time is it now?', 'What day is it today?', 'What is the date?', 'How long does it take?'], answerIndex: 0 },
    { id: 'ja-l-4', target: '明日、雨が降るでしょう。', meaning: 'It will probably rain tomorrow.', choices: ['It will probably rain tomorrow.', 'It rained yesterday.', 'It is sunny today.', 'Snow is falling now.'], answerIndex: 0 },
    { id: 'ja-l-5', target: '週末に友達と映画を見に行きます。', meaning: 'I am going to see a movie with a friend on the weekend.', choices: ['I am going to see a movie with a friend on the weekend.', 'I watched a movie alone yesterday.', 'My friend is coming to my house tomorrow.', 'I do not like movies very much.'], answerIndex: 0 },
    { id: 'ja-l-6', target: 'すみませんが、もう少しゆっくり話してください。', meaning: 'Excuse me, but please speak a little more slowly.', choices: ['Excuse me, but please speak a little more slowly.', 'Excuse me, could you say that again?', 'Sorry, I do not understand Japanese at all.', 'Please write it down for me.'], answerIndex: 0 },
    { id: 'ja-l-7', target: 'この電車は新宿に止まりますか。', meaning: 'Does this train stop at Shinjuku?', choices: ['Does this train stop at Shinjuku?', 'Is this train going to Shinjuku?', 'Where does this train come from?', 'How much is the ticket to Shinjuku?'], answerIndex: 0 },
    { id: 'ja-l-8', target: '昨日、財布をなくしてしまいました。', meaning: 'Yesterday, I ended up losing my wallet.', choices: ['Yesterday, I ended up losing my wallet.', 'Yesterday, I found a wallet on the street.', 'I forgot my wallet at home today.', 'Someone stole my bag yesterday.'], answerIndex: 0 },
    { id: 'ja-l-9', target: 'もし時間があれば、一緒に晩ご飯を食べませんか。', meaning: 'If you have time, would you like to have dinner together?', choices: ['If you have time, would you like to have dinner together?', 'I already had dinner by myself.', 'Do you have time tomorrow morning?', 'Let\'s meet for breakfast sometime.'], answerIndex: 0 },
    { id: 'ja-l-10', target: '会議は午後三時から始まる予定です。', meaning: 'The meeting is scheduled to start at 3 p.m.', choices: ['The meeting is scheduled to start at 3 p.m.', 'The meeting ended at 3 p.m.', 'The meeting was canceled today.', 'We need to prepare for tomorrow\'s meeting.'], answerIndex: 0 },
    { id: 'ja-l-11', target: '彼はまるで日本人のように日本語を話します。', meaning: 'He speaks Japanese as if he were a native Japanese person.', choices: ['He speaks Japanese as if he were a native Japanese person.', 'He is studying Japanese at a university in Japan.', 'He cannot speak Japanese at all.', 'He wants to become a Japanese teacher.'], answerIndex: 0 },
    { id: 'ja-l-12', target: 'たとえ忙しくても、毎日運動するようにしています。', meaning: 'Even if I am busy, I try to exercise every day.', choices: ['Even if I am busy, I try to exercise every day.', 'I am too busy to exercise these days.', 'I exercise only on weekends.', 'I stopped exercising because I was busy.'], answerIndex: 0 }
  ]
};
