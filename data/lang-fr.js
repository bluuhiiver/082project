window.LL_DATA = window.LL_DATA || {};
window.LL_DATA.fr = {
  code: 'fr',
  name: 'French',
  nativeName: 'Français',
  flag: '🇫🇷',
  ttsLang: 'fr-FR',
  vocab: [
    // greetings
    { id: 'fr-v-1', category: 'greetings', word: 'Bonjour', pron: 'bohn-ZHOOR', meaning: 'Hello / Good morning', example: 'Bonjour, comment allez-vous ?', exampleMeaning: 'Hello, how are you?' },
    { id: 'fr-v-2', category: 'greetings', word: 'Bonsoir', pron: 'bohn-SWAHR', meaning: 'Good evening', example: 'Bonsoir, madame.', exampleMeaning: 'Good evening, madam.' },
    { id: 'fr-v-3', category: 'greetings', word: 'Salut', pron: 'sah-LU', meaning: 'Hi / Bye (informal)', example: 'Salut, ça va ?', exampleMeaning: "Hi, how's it going?" },
    { id: 'fr-v-4', category: 'greetings', word: 'Au revoir', pron: 'oh ruh-VWAHR', meaning: 'Goodbye', example: 'Au revoir, à demain !', exampleMeaning: 'Goodbye, see you tomorrow!' },
    { id: 'fr-v-5', category: 'greetings', word: 'Merci', pron: 'mehr-SEE', meaning: 'Thank you', example: 'Merci beaucoup pour votre aide.', exampleMeaning: 'Thank you very much for your help.' },
    { id: 'fr-v-6', category: 'greetings', word: "S'il vous plaît", pron: 'seel voo PLEH', meaning: 'Please (formal)', example: 'Un café, s\'il vous plaît.', exampleMeaning: 'A coffee, please.' },
    { id: 'fr-v-7', category: 'greetings', word: 'Bienvenue', pron: 'byahn-vuh-NU', meaning: 'Welcome', example: 'Bienvenue chez nous !', exampleMeaning: 'Welcome to our home!' },
    { id: 'fr-v-8', category: 'greetings', word: 'Enchanté(e)', pron: 'ahn-shahn-TAY', meaning: 'Nice to meet you', example: "Enchanté, je m'appelle Paul.", exampleMeaning: 'Nice to meet you, my name is Paul.' },
    { id: 'fr-v-9', category: 'greetings', word: 'Comment allez-vous ?', pron: 'koh-mahn tah-lay VOO', meaning: 'How are you? (formal)', example: "Comment allez-vous aujourd'hui ?", exampleMeaning: 'How are you today?' },
    { id: 'fr-v-10', category: 'greetings', word: 'À bientôt', pron: 'ah byahn-TOH', meaning: 'See you soon', example: 'À bientôt, mon ami !', exampleMeaning: 'See you soon, my friend!' },
    // numbers
    { id: 'fr-v-11', category: 'numbers', word: 'un', pron: 'UHN', meaning: 'one', example: "J'ai un chat.", exampleMeaning: 'I have one cat.' },
    { id: 'fr-v-12', category: 'numbers', word: 'deux', pron: 'DUH', meaning: 'two', example: 'Elle a deux frères.', exampleMeaning: 'She has two brothers.' },
    { id: 'fr-v-13', category: 'numbers', word: 'trois', pron: 'TRWAH', meaning: 'three', example: 'Il est trois heures.', exampleMeaning: "It's three o'clock." },
    { id: 'fr-v-14', category: 'numbers', word: 'quatre', pron: 'KAH-truh', meaning: 'four', example: 'Nous avons quatre chaises.', exampleMeaning: 'We have four chairs.' },
    { id: 'fr-v-15', category: 'numbers', word: 'cinq', pron: 'SANK', meaning: 'five', example: 'Donne-moi cinq minutes.', exampleMeaning: 'Give me five minutes.' },
    { id: 'fr-v-16', category: 'numbers', word: 'six', pron: 'SEES', meaning: 'six', example: 'Le film commence à six heures.', exampleMeaning: 'The movie starts at six.' },
    { id: 'fr-v-17', category: 'numbers', word: 'sept', pron: 'SET', meaning: 'seven', example: 'Il y a sept jours dans une semaine.', exampleMeaning: 'There are seven days in a week.' },
    { id: 'fr-v-18', category: 'numbers', word: 'huit', pron: 'WEET', meaning: 'eight', example: 'Mon fils a huit ans.', exampleMeaning: 'My son is eight years old.' },
    { id: 'fr-v-19', category: 'numbers', word: 'neuf', pron: 'NUHF', meaning: 'nine', example: 'Il reste neuf places.', exampleMeaning: 'There are nine seats left.' },
    { id: 'fr-v-20', category: 'numbers', word: 'dix', pron: 'DEES', meaning: 'ten', example: "Compte jusqu'à dix.", exampleMeaning: 'Count to ten.' },
    // family
    { id: 'fr-v-21', category: 'family', word: 'la famille', pron: 'lah fah-MEE-yuh', meaning: 'family', example: 'Ma famille est très unie.', exampleMeaning: 'My family is very close.' },
    { id: 'fr-v-22', category: 'family', word: 'la mère', pron: 'lah MEHR', meaning: 'mother', example: 'Ma mère cuisine très bien.', exampleMeaning: 'My mother cooks very well.' },
    { id: 'fr-v-23', category: 'family', word: 'le père', pron: 'luh PEHR', meaning: 'father', example: 'Mon père travaille à Paris.', exampleMeaning: 'My father works in Paris.' },
    { id: 'fr-v-24', category: 'family', word: 'le frère', pron: 'luh FREHR', meaning: 'brother', example: "J'ai un grand frère.", exampleMeaning: 'I have an older brother.' },
    { id: 'fr-v-25', category: 'family', word: 'la sœur', pron: 'lah SUHR', meaning: 'sister', example: 'Ma sœur habite à Lyon.', exampleMeaning: 'My sister lives in Lyon.' },
    { id: 'fr-v-26', category: 'family', word: 'les parents', pron: 'lay pah-RAHN', meaning: 'parents', example: 'Mes parents sont retraités.', exampleMeaning: 'My parents are retired.' },
    { id: 'fr-v-27', category: 'family', word: 'le fils', pron: 'luh FEES', meaning: 'son', example: 'Leur fils étudie la médecine.', exampleMeaning: 'Their son is studying medicine.' },
    { id: 'fr-v-28', category: 'family', word: 'la fille', pron: 'lah FEE-yuh', meaning: 'daughter / girl', example: 'Sa fille a cinq ans.', exampleMeaning: 'Her daughter is five years old.' },
    { id: 'fr-v-29', category: 'family', word: 'les grands-parents', pron: 'lay grahn-pah-RAHN', meaning: 'grandparents', example: 'Mes grands-parents habitent à la campagne.', exampleMeaning: 'My grandparents live in the countryside.' },
    { id: 'fr-v-30', category: 'family', word: 'le mari', pron: 'luh mah-REE', meaning: 'husband', example: 'Son mari est médecin.', exampleMeaning: 'Her husband is a doctor.' },
    // food
    { id: 'fr-v-31', category: 'food', word: 'le pain', pron: 'luh PAHN', meaning: 'bread', example: 'Elle achète du pain frais chaque matin.', exampleMeaning: 'She buys fresh bread every morning.' },
    { id: 'fr-v-32', category: 'food', word: 'le fromage', pron: 'luh froh-MAHZH', meaning: 'cheese', example: 'Le fromage français est délicieux.', exampleMeaning: 'French cheese is delicious.' },
    { id: 'fr-v-33', category: 'food', word: "l'eau", pron: 'LOH', meaning: 'water', example: "Je voudrais un verre d'eau.", exampleMeaning: 'I would like a glass of water.' },
    { id: 'fr-v-34', category: 'food', word: 'le vin', pron: 'luh VAHN', meaning: 'wine', example: 'Ils boivent du vin rouge avec le dîner.', exampleMeaning: 'They drink red wine with dinner.' },
    { id: 'fr-v-35', category: 'food', word: 'la viande', pron: 'lah VYAHND', meaning: 'meat', example: 'Il ne mange pas de viande.', exampleMeaning: "He doesn't eat meat." },
    { id: 'fr-v-36', category: 'food', word: 'le poisson', pron: 'luh pwah-SOHN', meaning: 'fish', example: 'Le poisson est frais au marché.', exampleMeaning: 'The fish is fresh at the market.' },
    { id: 'fr-v-37', category: 'food', word: 'les légumes', pron: 'lay lay-GUM', meaning: 'vegetables', example: 'Mangez plus de légumes.', exampleMeaning: 'Eat more vegetables.' },
    { id: 'fr-v-38', category: 'food', word: 'le sucre', pron: 'luh SU-kruh', meaning: 'sugar', example: 'Je ne prends pas de sucre dans mon café.', exampleMeaning: "I don't take sugar in my coffee." },
    { id: 'fr-v-39', category: 'food', word: 'le petit-déjeuner', pron: 'luh puh-tee day-zhuh-NAY', meaning: 'breakfast', example: 'Le petit-déjeuner est prêt.', exampleMeaning: 'Breakfast is ready.' },
    { id: 'fr-v-40', category: 'food', word: 'le dessert', pron: 'luh deh-SEHR', meaning: 'dessert', example: 'Quel dessert veux-tu ?', exampleMeaning: 'Which dessert do you want?' },
    // time
    { id: 'fr-v-41', category: 'time', word: "aujourd'hui", pron: 'oh-zhoor-DWEE', meaning: 'today', example: "Aujourd'hui, il fait beau.", exampleMeaning: 'Today the weather is nice.' },
    { id: 'fr-v-42', category: 'time', word: 'demain', pron: 'duh-MAHN', meaning: 'tomorrow', example: 'Je pars demain matin.', exampleMeaning: "I'm leaving tomorrow morning." },
    { id: 'fr-v-43', category: 'time', word: 'hier', pron: 'YEHR', meaning: 'yesterday', example: "Hier, j'ai vu un bon film.", exampleMeaning: 'Yesterday I saw a good movie.' },
    { id: 'fr-v-44', category: 'time', word: 'maintenant', pron: 'mahn-tuh-NAHN', meaning: 'now', example: 'Nous devons partir maintenant.', exampleMeaning: 'We have to leave now.' },
    { id: 'fr-v-45', category: 'time', word: "l'heure", pron: 'LUHR', meaning: 'hour / time', example: 'Quelle heure est-il ?', exampleMeaning: 'What time is it?' },
    { id: 'fr-v-46', category: 'time', word: 'la semaine', pron: 'lah suh-MEHN', meaning: 'week', example: 'Je travaille toute la semaine.', exampleMeaning: 'I work all week.' },
    { id: 'fr-v-47', category: 'time', word: 'le mois', pron: 'luh MWAH', meaning: 'month', example: 'Le mois prochain, je pars en vacances.', exampleMeaning: "Next month, I'm going on vacation." },
    { id: 'fr-v-48', category: 'time', word: "l'année", pron: 'lah-NAY', meaning: 'year', example: 'Bonne année !', exampleMeaning: 'Happy new year!' },
    { id: 'fr-v-49', category: 'time', word: 'tôt', pron: 'TOH', meaning: 'early', example: 'Il se lève toujours tôt.', exampleMeaning: 'He always gets up early.' },
    { id: 'fr-v-50', category: 'time', word: 'tard', pron: 'TAHR', meaning: 'late', example: 'Ne rentre pas trop tard.', exampleMeaning: "Don't come home too late." },
    // travel
    { id: 'fr-v-51', category: 'travel', word: "l'aéroport", pron: 'lah-ay-roh-POHR', meaning: 'airport', example: 'L\'aéroport est loin du centre-ville.', exampleMeaning: 'The airport is far from downtown.' },
    { id: 'fr-v-52', category: 'travel', word: 'le billet', pron: 'luh bee-YEH', meaning: 'ticket', example: "J'ai acheté un billet aller-retour.", exampleMeaning: 'I bought a round-trip ticket.' },
    { id: 'fr-v-53', category: 'travel', word: 'le train', pron: 'luh TRAHN', meaning: 'train', example: 'Le train part à midi.', exampleMeaning: 'The train leaves at noon.' },
    { id: 'fr-v-54', category: 'travel', word: "l'hôtel", pron: 'loh-TEL', meaning: 'hotel', example: 'Nous avons réservé un hôtel près de la plage.', exampleMeaning: 'We booked a hotel near the beach.' },
    { id: 'fr-v-55', category: 'travel', word: 'la valise', pron: 'lah vah-LEEZ', meaning: 'suitcase', example: 'Ma valise est trop lourde.', exampleMeaning: 'My suitcase is too heavy.' },
    { id: 'fr-v-56', category: 'travel', word: 'le passeport', pron: 'luh pahs-POHR', meaning: 'passport', example: 'N\'oublie pas ton passeport.', exampleMeaning: 'Don\'t forget your passport.' },
    { id: 'fr-v-57', category: 'travel', word: 'la carte', pron: 'lah KAHRT', meaning: 'map', example: 'Regarde la carte pour trouver le musée.', exampleMeaning: 'Look at the map to find the museum.' },
    { id: 'fr-v-58', category: 'travel', word: 'où', pron: 'OO', meaning: 'where', example: 'Où est la gare ?', exampleMeaning: 'Where is the train station?' },
    { id: 'fr-v-59', category: 'travel', word: "l'avion", pron: 'lah-VYOHN', meaning: 'airplane', example: "Nous prenons l'avion demain soir.", exampleMeaning: 'We are taking the plane tomorrow evening.' },
    { id: 'fr-v-60', category: 'travel', word: 'le voyage', pron: 'luh vwah-YAHZH', meaning: 'trip / journey', example: 'Bon voyage !', exampleMeaning: 'Have a good trip!' },
    // verbs
    { id: 'fr-v-61', category: 'verbs', word: 'être', pron: 'EH-truh', meaning: 'to be', example: 'Je suis heureux aujourd\'hui.', exampleMeaning: 'I am happy today.' },
    { id: 'fr-v-62', category: 'verbs', word: 'avoir', pron: 'ah-VWAHR', meaning: 'to have', example: 'Elle a deux enfants.', exampleMeaning: 'She has two children.' },
    { id: 'fr-v-63', category: 'verbs', word: 'aller', pron: 'ah-LAY', meaning: 'to go', example: 'Nous allons au cinéma ce soir.', exampleMeaning: 'We are going to the movies tonight.' },
    { id: 'fr-v-64', category: 'verbs', word: 'faire', pron: 'FEHR', meaning: 'to do / to make', example: 'Qu\'est-ce que tu fais ce week-end ?', exampleMeaning: 'What are you doing this weekend?' },
    { id: 'fr-v-65', category: 'verbs', word: 'vouloir', pron: 'voo-LWAHR', meaning: 'to want', example: 'Je veux apprendre le français.', exampleMeaning: 'I want to learn French.' },
    { id: 'fr-v-66', category: 'verbs', word: 'pouvoir', pron: 'poo-VWAHR', meaning: 'to be able to / can', example: 'Tu peux m\'aider, s\'il te plaît ?', exampleMeaning: 'Can you help me, please?' },
    { id: 'fr-v-67', category: 'verbs', word: 'parler', pron: 'pahr-LAY', meaning: 'to speak', example: 'Elle parle trois langues.', exampleMeaning: 'She speaks three languages.' },
    { id: 'fr-v-68', category: 'verbs', word: 'manger', pron: 'mahn-ZHAY', meaning: 'to eat', example: 'Nous mangeons ensemble ce soir.', exampleMeaning: 'We are eating together tonight.' },
    { id: 'fr-v-69', category: 'verbs', word: 'venir', pron: 'vuh-NEER', meaning: 'to come', example: 'Il vient de Paris.', exampleMeaning: 'He comes from Paris.' },
    { id: 'fr-v-70', category: 'verbs', word: 'savoir', pron: 'sah-VWAHR', meaning: 'to know', example: 'Je ne sais pas la réponse.', exampleMeaning: "I don't know the answer." },
    // adjectives
    { id: 'fr-v-71', category: 'adjectives', word: 'grand(e)', pron: 'GRAHN(D)', meaning: 'big / tall', example: 'Il habite dans une grande maison.', exampleMeaning: 'He lives in a big house.' },
    { id: 'fr-v-72', category: 'adjectives', word: 'petit(e)', pron: 'puh-TEE(T)', meaning: 'small', example: 'Elle a un petit chien.', exampleMeaning: 'She has a small dog.' },
    { id: 'fr-v-73', category: 'adjectives', word: 'beau / belle', pron: 'BOH / BEL', meaning: 'beautiful', example: 'Quelle belle journée !', exampleMeaning: 'What a beautiful day!' },
    { id: 'fr-v-74', category: 'adjectives', word: 'bon(ne)', pron: 'BOHN', meaning: 'good', example: 'Ce restaurant est très bon.', exampleMeaning: 'This restaurant is very good.' },
    { id: 'fr-v-75', category: 'adjectives', word: 'content(e)', pron: 'kohn-TAHN(T)', meaning: 'happy', example: 'Je suis content de te voir.', exampleMeaning: "I'm happy to see you." },
    { id: 'fr-v-76', category: 'adjectives', word: 'difficile', pron: 'dee-fee-SEEL', meaning: 'difficult', example: 'Cet examen est difficile.', exampleMeaning: 'This exam is difficult.' },
    { id: 'fr-v-77', category: 'adjectives', word: 'facile', pron: 'fah-SEEL', meaning: 'easy', example: 'Cette recette est facile à faire.', exampleMeaning: 'This recipe is easy to make.' },
    { id: 'fr-v-78', category: 'adjectives', word: 'nouveau / nouvelle', pron: 'noo-VOH / noo-VEL', meaning: 'new', example: 'J\'ai acheté une nouvelle voiture.', exampleMeaning: 'I bought a new car.' },
    { id: 'fr-v-79', category: 'adjectives', word: 'rapide', pron: 'rah-PEED', meaning: 'fast', example: 'Ce train est très rapide.', exampleMeaning: 'This train is very fast.' },
    { id: 'fr-v-80', category: 'adjectives', word: 'cher / chère', pron: 'SHEHR', meaning: 'expensive / dear', example: 'Cet hôtel est trop cher.', exampleMeaning: 'This hotel is too expensive.' }
  ],
  grammar: [
    {
      id: 'fr-g-1',
      title: 'Subject Pronouns and "Être" (to be)',
      explanation: 'French sentences always need a subject pronoun before the verb. "Être" (to be) is one of the most common verbs and is irregular, so its six forms are worth memorizing right away. You will use it constantly to describe identity, state, and feelings.',
      pattern: 'je suis / tu es / il-elle est / nous sommes / vous êtes / ils-elles sont',
      examples: [
        { target: 'Je suis étudiant.', meaning: 'I am a student.' },
        { target: 'Tu es très gentil.', meaning: 'You are very kind.' },
        { target: 'Nous sommes en retard.', meaning: 'We are late.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct form of être: Elle ___ médecin.', choices: ['suis', 'es', 'est', 'sommes'], answerIndex: 2 },
        { type: 'fill', prompt: 'Complete with the correct form of être: Vous ___ français ?', answer: 'êtes', hint: 'the "vous" form of être' }
      ]
    },
    {
      id: 'fr-g-2',
      title: 'Gender and Articles (le / la / un / une)',
      explanation: 'Every French noun is either masculine or feminine, and the article used with it must match. "Le" and "un" go with masculine nouns, while "la" and "une" go with feminine nouns. There is no universal rule for gender, so it is best to learn each noun together with its article.',
      pattern: 'le / un + masculine noun; la / une + feminine noun',
      examples: [
        { target: 'Le livre est sur la table.', meaning: 'The book is on the table.' },
        { target: "J'ai une sœur et un frère.", meaning: 'I have a sister and a brother.' },
        { target: 'La voiture est rouge.', meaning: 'The car is red.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Which article fits? ___ maison est grande.', choices: ['Le', 'La', 'Les', 'Un'], answerIndex: 1 },
        { type: 'fill', prompt: 'Complete with the correct indefinite article: J\'ai ___ chat.', answer: 'un', hint: 'masculine indefinite article' }
      ]
    },
    {
      id: 'fr-g-3',
      title: 'Plural Nouns and Articles',
      explanation: 'To make most French nouns plural, simply add "-s", which is usually silent in speech. The definite article "le/la" becomes "les" in the plural, and the indefinite article "un/une" becomes "des".',
      pattern: 'le/la → les; un/une → des; noun + s',
      examples: [
        { target: 'Les enfants jouent dehors.', meaning: 'The children are playing outside.' },
        { target: 'J\'achète des pommes.', meaning: "I'm buying some apples." },
        { target: 'Les livres sont intéressants.', meaning: 'The books are interesting.' }
      ],
      exercises: [
        { type: 'mcq', prompt: "Plural of 'la fleur' (the flower) is:", choices: ['le fleur', 'les fleurs', 'la fleurs', 'les fleur'], answerIndex: 1 },
        { type: 'fill', prompt: 'Complete: J\'ai ___ amis à Paris. (some, plural indefinite article)', answer: 'des', hint: 'plural of un/une' }
      ]
    },
    {
      id: 'fr-g-4',
      title: 'Regular -ER Verbs in the Present Tense',
      explanation: 'Most French verbs end in "-er" in the infinitive, and they all follow the same predictable pattern in the present tense. Simply remove "-er" from the infinitive and add the ending that matches the subject pronoun.',
      pattern: 'parler → je parle, tu parles, il/elle parle, nous parlons, vous parlez, ils/elles parlent',
      examples: [
        { target: 'Je parle anglais et français.', meaning: 'I speak English and French.' },
        { target: 'Nous habitons à Marseille.', meaning: 'We live in Marseille.' },
        { target: 'Elles regardent la télévision.', meaning: 'They are watching television.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct form: Tu ___ (aimer) le chocolat.', choices: ['aime', 'aimes', 'aimez', 'aiment'], answerIndex: 1 },
        { type: 'fill', prompt: 'Complete: Nous ___ (adorer) la musique.', answer: 'adorons', hint: 'the "nous" ending is -ons' }
      ]
    },
    {
      id: 'fr-g-5',
      title: '"Avoir" (to have) and Common Expressions',
      explanation: '"Avoir" is another essential irregular verb. Beyond showing possession, French uses "avoir" in many expressions where English uses "to be," such as "avoir faim" (to be hungry) or "avoir X ans" (to be X years old).',
      pattern: "j'ai / tu as / il-elle a / nous avons / vous avez / ils-elles ont",
      examples: [
        { target: "J'ai vingt ans.", meaning: 'I am twenty years old.' },
        { target: 'Elle a faim.', meaning: 'She is hungry.' },
        { target: 'Nous avons de la chance.', meaning: 'We are lucky.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct form: Ils ___ soif.', choices: ['ai', 'a', 'avez', 'ont'], answerIndex: 3 },
        { type: 'fill', prompt: 'Complete: Tu ___ raison. (you are right)', answer: 'as', hint: 'the "tu" form of avoir' }
      ]
    },
    {
      id: 'fr-g-6',
      title: 'Negation with "Ne...Pas"',
      explanation: 'To make a sentence negative in French, place "ne" right before the conjugated verb and "pas" right after it. Before a verb starting with a vowel sound, "ne" shortens to "n\'".',
      pattern: 'subject + ne + verb + pas',
      examples: [
        { target: 'Je ne comprends pas.', meaning: "I don't understand." },
        { target: "Elle n'aime pas le café.", meaning: "She doesn't like coffee." },
        { target: 'Nous ne sommes pas prêts.', meaning: 'We are not ready.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct negation pair: Il ___ parle ___ espagnol.', choices: ['ne / pas', 'pas / ne', 'ne / rien', 'non / pas'], answerIndex: 0 },
        { type: 'fill', prompt: 'Fill in the missing word to negate: Tu ne comprends ___.', answer: 'pas', hint: '"pas" pairs with "ne" to negate a verb' }
      ]
    },
    {
      id: 'fr-g-7',
      title: 'Adjective Agreement and Placement',
      explanation: 'French adjectives must agree in gender and number with the noun they describe, usually adding "-e" for feminine and "-s" for plural. Most adjectives come after the noun, but a small set of common ones, like "grand," "petit," "bon," and "beau," come before it.',
      pattern: 'noun + adjective (agrees in gender/number); a few common adjectives precede the noun',
      examples: [
        { target: 'Un grand jardin.', meaning: 'A big garden.' },
        { target: 'Une maison blanche.', meaning: 'A white house.' },
        { target: 'Des chats noirs.', meaning: 'Black cats.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct form: Elle porte une robe ___ (vert).', choices: ['vert', 'verte', 'verts', 'vertes'], answerIndex: 1 },
        { type: 'fill', prompt: 'Complete: Ce sont de ___ (beau) fleurs.', answer: 'belles', hint: 'feminine plural of beau/belle' }
      ]
    },
    {
      id: 'fr-g-8',
      title: 'The Passé Composé (Past Tense)',
      explanation: 'The passé composé describes completed past actions and is formed with a helping verb, "avoir" or "être," plus the past participle. Most verbs use "avoir," but a group of common verbs of movement, like "aller" and "venir," use "être," and their past participle must then agree with the subject.',
      pattern: 'subject + avoir/être (present) + past participle',
      examples: [
        { target: "J'ai mangé une pomme.", meaning: 'I ate an apple.' },
        { target: 'Elle est allée au marché.', meaning: 'She went to the market.' },
        { target: 'Nous avons visité le musée.', meaning: 'We visited the museum.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct auxiliary: Il ___ arrivé hier soir.', choices: ['a', 'est', 'avons', 'ont'], answerIndex: 1 },
        { type: 'fill', prompt: 'Complete with avoir + past participle: Tu ___ tes devoirs ? (finir → fini)', answer: 'as fini', hint: 'avoir conjugated + past participle "fini"' }
      ]
    }
  ],
  dialogues: [
    {
      id: 'fr-d-1',
      title: 'Introducing Yourself',
      scenario: 'Two young people meet for the first time at a friend\'s party.',
      lines: [
        { speaker: 'A', target: "Bonjour ! Je m'appelle Claire. Et toi ?", meaning: 'Hello! My name is Claire. And you?' },
        { speaker: 'B', target: 'Salut Claire, moi c\'est Thomas. Enchanté !', meaning: "Hi Claire, I'm Thomas. Nice to meet you!" },
        { speaker: 'A', target: "Enchantée aussi. Tu viens d'où ?", meaning: 'Nice to meet you too. Where are you from?' },
        { speaker: 'B', target: "Je viens de Lyon. Et toi, tu es d'ici ?", meaning: "I'm from Lyon. And you, are you from here?" },
        { speaker: 'A', target: 'Oui, je suis née à Paris. Qu\'est-ce que tu fais dans la vie ?', meaning: 'Yes, I was born in Paris. What do you do for a living?' },
        { speaker: 'B', target: 'Je suis étudiant en informatique. Et toi ?', meaning: "I'm a computer science student. And you?" },
        { speaker: 'A', target: 'Je travaille comme professeure d\'anglais.', meaning: 'I work as an English teacher.' },
        { speaker: 'B', target: 'C\'est génial ! On devrait prendre un café ensemble un jour.', meaning: "That's great! We should get a coffee together sometime." }
      ]
    },
    {
      id: 'fr-d-2',
      title: 'Ordering at a Café',
      scenario: 'A customer orders breakfast at a Parisian café.',
      lines: [
        { speaker: 'A', target: 'Bonjour, vous avez choisi ?', meaning: 'Hello, have you decided?' },
        { speaker: 'B', target: 'Oui, je voudrais un café crème et un croissant, s\'il vous plaît.', meaning: "Yes, I'd like a coffee with cream and a croissant, please." },
        { speaker: 'A', target: 'Très bien. Et pour boire, autre chose ?', meaning: 'Very well. Anything else to drink?' },
        { speaker: 'B', target: 'Non merci, c\'est tout.', meaning: 'No thank you, that\'s all.' },
        { speaker: 'A', target: 'D\'accord, ça fait sept euros cinquante.', meaning: 'Okay, that comes to seven euros fifty.' },
        { speaker: 'B', target: 'Voilà, gardez la monnaie.', meaning: 'Here you go, keep the change.' },
        { speaker: 'A', target: 'Merci beaucoup, bonne journée !', meaning: 'Thank you very much, have a good day!' },
        { speaker: 'B', target: 'Merci, à vous aussi !', meaning: 'Thanks, you too!' }
      ]
    },
    {
      id: 'fr-d-3',
      title: 'Asking for Directions',
      scenario: 'A tourist stops a passerby to ask how to get to the train station.',
      lines: [
        { speaker: 'A', target: 'Excusez-moi, savez-vous où se trouve la gare ?', meaning: 'Excuse me, do you know where the train station is?' },
        { speaker: 'B', target: 'Oui, continuez tout droit puis tournez à gauche.', meaning: 'Yes, continue straight then turn left.' },
        { speaker: 'A', target: "C'est loin d'ici ?", meaning: 'Is it far from here?' },
        { speaker: 'B', target: "Non, c'est à environ dix minutes à pied.", meaning: "No, it's about ten minutes on foot." },
        { speaker: 'A', target: 'Merci beaucoup pour votre aide.', meaning: 'Thank you very much for your help.' },
        { speaker: 'B', target: 'Je vous en prie. Bonne route !', meaning: "You're welcome. Safe travels!" }
      ]
    },
    {
      id: 'fr-d-4',
      title: 'Shopping for Clothes',
      scenario: 'A customer looks for a dress for a party in a clothing store.',
      lines: [
        { speaker: 'A', target: 'Bonjour, je cherche une robe pour une fête.', meaning: "Hello, I'm looking for a dress for a party." },
        { speaker: 'B', target: 'Bien sûr, quelle taille faites-vous ?', meaning: 'Of course, what size do you wear?' },
        { speaker: 'A', target: 'Je fais du trente-huit.', meaning: "I'm a size 38." },
        { speaker: 'B', target: 'Voici deux modèles qui pourraient vous plaire.', meaning: 'Here are two styles you might like.' },
        { speaker: 'A', target: "J'aime bien celle-ci en bleu. Je peux l'essayer ?", meaning: 'I like this blue one. Can I try it on?' },
        { speaker: 'B', target: 'Bien sûr, les cabines sont juste là.', meaning: 'Of course, the fitting rooms are right there.' },
        { speaker: 'A', target: 'Elle me va parfaitement. Combien coûte-t-elle ?', meaning: 'It fits me perfectly. How much does it cost?' },
        { speaker: 'B', target: 'Elle coûte quarante-cinq euros.', meaning: 'It costs forty-five euros.' }
      ]
    }
  ],
  listening: [
    { id: 'fr-l-1', target: "Il fait beau aujourd'hui.", meaning: 'The weather is nice today.', choices: ['The weather is nice today.', "It's raining today.", "It's very cold today.", 'The weather was bad yesterday.'], answerIndex: 0 },
    { id: 'fr-l-2', target: "J'habite à Paris depuis deux ans.", meaning: "I've lived in Paris for two years.", choices: ['I lived in Paris for two months.', "I've lived in Paris for two years.", 'I am moving to Paris next year.', 'I visited Paris two years ago.'], answerIndex: 1 },
    { id: 'fr-l-3', target: 'Mon frère travaille dans un hôpital.', meaning: 'My brother works in a hospital.', choices: ['My sister studies at a school.', 'My brother works at a bank.', 'My brother works in a hospital.', 'My father works in a restaurant.'], answerIndex: 2 },
    { id: 'fr-l-4', target: 'Nous allons au marché samedi matin.', meaning: 'We are going to the market on Saturday morning.', choices: ['We went to the market last Saturday.', 'We are going to the beach this weekend.', 'They go to the market every day.', 'We are going to the market on Saturday morning.'], answerIndex: 3 },
    { id: 'fr-l-5', target: 'Elle a perdu ses clés dans la rue.', meaning: 'She lost her keys in the street.', choices: ['She found her keys at home.', 'He lost his wallet at the store.', 'She lost her keys in the street.', 'She left her keys at the office.'], answerIndex: 2 },
    { id: 'fr-l-6', target: "Pourriez-vous me dire l'heure, s'il vous plaît ?", meaning: 'Could you tell me the time, please?', choices: ['Could you tell me the price, please?', 'Could you tell me the time, please?', 'Could you tell me your name, please?', 'Could you show me the menu, please?'], answerIndex: 1 },
    { id: 'fr-l-7', target: 'Nous devons finir ce projet avant vendredi.', meaning: 'We have to finish this project before Friday.', choices: ['We started this project last Friday.', 'They must finish the report by Monday.', 'We have to finish this project before Friday.', 'We can finish it whenever we want.'], answerIndex: 2 },
    { id: 'fr-l-8', target: "Si j'avais plus de temps, je voyagerais davantage.", meaning: 'If I had more time, I would travel more.', choices: ['If I have more money, I will travel more.', "I don't have time to travel this year.", 'If I had more time, I would travel more.', 'I travel a lot because I have free time.'], answerIndex: 2 },
    { id: 'fr-l-9', target: 'Malgré la pluie, ils ont décidé de sortir se promener.', meaning: 'Despite the rain, they decided to go out for a walk.', choices: ['Because of the rain, they stayed home.', 'Despite the rain, they decided to go out for a walk.', 'They went out for a walk before it rained.', 'They canceled their walk due to the rain.'], answerIndex: 1 },
    { id: 'fr-l-10', target: "Elle m'a dit qu'elle ne pourrait pas venir à la réunion.", meaning: "She told me she wouldn't be able to come to the meeting.", choices: ['She told me she would come to the meeting.', 'She asked me to attend the meeting for her.', 'She said the meeting was canceled.', "She told me she wouldn't be able to come to the meeting."], answerIndex: 3 },
    { id: 'fr-l-11', target: 'Bien qu\'il soit fatigué, il continue à travailler tard le soir.', meaning: 'Although he is tired, he keeps working late in the evening.', choices: ['Because he is tired, he stopped working early.', 'He works late because he enjoys it.', 'Although he is tired, he keeps working late in the evening.', 'He is too tired to work at all.'], answerIndex: 2 },
    { id: 'fr-l-12', target: "Je n'aurais jamais imaginé que ce voyage changerait ma vie.", meaning: 'I would never have imagined that this trip would change my life.', choices: ['I always knew this trip would change my life.', 'This trip did not change anything for me.', 'I imagined a trip that never happened.', 'I would never have imagined that this trip would change my life.'], answerIndex: 3 }
  ]
};
