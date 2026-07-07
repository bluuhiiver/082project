window.LL_DATA = window.LL_DATA || {};
window.LL_DATA.it = {
  code: 'it',
  name: 'Italian',
  nativeName: 'Italiano',
  flag: '🇮🇹',
  ttsLang: 'it-IT',
  vocab: [
    // greetings
    { id: 'it-v-1', category: 'greetings', word: 'Ciao', pron: 'CHOW', meaning: 'hi / bye (informal)', example: 'Ciao, come va?', exampleMeaning: "Hi, how's it going?" },
    { id: 'it-v-2', category: 'greetings', word: 'Buongiorno', pron: 'bwon-JOR-no', meaning: 'good morning / good day', example: 'Buongiorno, signora Rossi!', exampleMeaning: 'Good morning, Mrs. Rossi!' },
    { id: 'it-v-3', category: 'greetings', word: 'Buonasera', pron: 'bwo-na-SEH-ra', meaning: 'good evening', example: 'Buonasera a tutti.', exampleMeaning: 'Good evening everyone.' },
    { id: 'it-v-4', category: 'greetings', word: 'Buonanotte', pron: 'bwo-na-NOT-teh', meaning: 'good night', example: 'Buonanotte, dormi bene.', exampleMeaning: 'Good night, sleep well.' },
    { id: 'it-v-5', category: 'greetings', word: 'Arrivederci', pron: 'ar-ree-veh-DEHR-chee', meaning: 'goodbye (formal)', example: 'Arrivederci, a domani!', exampleMeaning: 'Goodbye, see you tomorrow!' },
    { id: 'it-v-6', category: 'greetings', word: 'Come stai?', pron: 'KOH-meh STAH-ee', meaning: 'how are you? (informal)', example: 'Come stai oggi?', exampleMeaning: 'How are you today?' },
    { id: 'it-v-7', category: 'greetings', word: 'Come sta?', pron: 'KOH-meh STAH', meaning: 'how are you? (formal)', example: 'Come sta, dottore?', exampleMeaning: 'How are you, doctor?' },
    { id: 'it-v-8', category: 'greetings', word: 'Piacere', pron: 'pya-CHEH-reh', meaning: 'nice to meet you', example: 'Piacere di conoscerti.', exampleMeaning: 'Nice to meet you.' },
    { id: 'it-v-9', category: 'greetings', word: 'Grazie', pron: 'GRAH-tsyeh', meaning: 'thank you', example: "Grazie mille per l'aiuto.", exampleMeaning: 'Thank you very much for the help.' },
    { id: 'it-v-10', category: 'greetings', word: 'Prego', pron: 'PREH-go', meaning: "you're welcome / please, go ahead", example: 'Prego, si accomodi.', exampleMeaning: 'Please, make yourself comfortable.' },
    // numbers
    { id: 'it-v-11', category: 'numbers', word: 'uno', pron: 'OO-no', meaning: 'one', example: 'Ho uno zaino nuovo.', exampleMeaning: 'I have a new backpack.' },
    { id: 'it-v-12', category: 'numbers', word: 'due', pron: 'DOO-eh', meaning: 'two', example: 'Vorrei due caffè, per favore.', exampleMeaning: 'I would like two coffees, please.' },
    { id: 'it-v-13', category: 'numbers', word: 'tre', pron: 'TREH', meaning: 'three', example: 'Ho tre fratelli.', exampleMeaning: 'I have three brothers.' },
    { id: 'it-v-14', category: 'numbers', word: 'quattro', pron: 'KWAT-tro', meaning: 'four', example: 'Il tavolo ha quattro sedie.', exampleMeaning: 'The table has four chairs.' },
    { id: 'it-v-15', category: 'numbers', word: 'cinque', pron: 'CHEEN-kweh', meaning: 'five', example: 'Sono le cinque del pomeriggio.', exampleMeaning: "It's five in the afternoon." },
    { id: 'it-v-16', category: 'numbers', word: 'sei', pron: 'SEH-ee', meaning: 'six', example: 'La lezione inizia alle sei.', exampleMeaning: 'The lesson starts at six.' },
    { id: 'it-v-17', category: 'numbers', word: 'dieci', pron: 'DYEH-chee', meaning: 'ten', example: 'Ho dieci euro in tasca.', exampleMeaning: 'I have ten euros in my pocket.' },
    { id: 'it-v-18', category: 'numbers', word: 'venti', pron: 'VEN-tee', meaning: 'twenty', example: 'Ha venti anni.', exampleMeaning: 'He is twenty years old.' },
    { id: 'it-v-19', category: 'numbers', word: 'cento', pron: 'CHEN-to', meaning: 'one hundred', example: 'Il libro costa cento euro.', exampleMeaning: 'The book costs a hundred euros.' },
    { id: 'it-v-20', category: 'numbers', word: 'mille', pron: 'MEEL-leh', meaning: 'one thousand', example: 'Ci sono mille persone allo stadio.', exampleMeaning: 'There are a thousand people at the stadium.' },
    // family
    { id: 'it-v-21', category: 'family', word: 'famiglia', pron: 'fa-MEE-lya', meaning: 'family', example: 'La mia famiglia è molto unita.', exampleMeaning: 'My family is very close.' },
    { id: 'it-v-22', category: 'family', word: 'madre', pron: 'MAH-dreh', meaning: 'mother', example: 'Mia madre lavora in ospedale.', exampleMeaning: 'My mother works in a hospital.' },
    { id: 'it-v-23', category: 'family', word: 'padre', pron: 'PAH-dreh', meaning: 'father', example: 'Mio padre cucina benissimo.', exampleMeaning: 'My father cooks very well.' },
    { id: 'it-v-24', category: 'family', word: 'fratello', pron: 'fra-TEL-lo', meaning: 'brother', example: "Mio fratello studia all'università.", exampleMeaning: 'My brother studies at university.' },
    { id: 'it-v-25', category: 'family', word: 'sorella', pron: 'so-REL-la', meaning: 'sister', example: 'Mia sorella abita a Roma.', exampleMeaning: 'My sister lives in Rome.' },
    { id: 'it-v-26', category: 'family', word: 'figlio', pron: 'FEE-lyo', meaning: 'son', example: 'Il loro figlio ha sei anni.', exampleMeaning: 'Their son is six years old.' },
    { id: 'it-v-27', category: 'family', word: 'figlia', pron: 'FEE-lya', meaning: 'daughter', example: 'Sua figlia parla tre lingue.', exampleMeaning: 'His daughter speaks three languages.' },
    { id: 'it-v-28', category: 'family', word: 'nonno', pron: 'NON-no', meaning: 'grandfather', example: 'Mio nonno racconta belle storie.', exampleMeaning: 'My grandfather tells beautiful stories.' },
    { id: 'it-v-29', category: 'family', word: 'nonna', pron: 'NON-na', meaning: 'grandmother', example: 'Mia nonna prepara la pasta la domenica.', exampleMeaning: 'My grandmother makes pasta on Sundays.' },
    { id: 'it-v-30', category: 'family', word: 'marito', pron: 'ma-REE-to', meaning: 'husband', example: "Suo marito lavora all'estero.", exampleMeaning: 'Her husband works abroad.' },
    // food
    { id: 'it-v-31', category: 'food', word: 'pane', pron: 'PAH-neh', meaning: 'bread', example: 'Il pane è ancora caldo.', exampleMeaning: 'The bread is still warm.' },
    { id: 'it-v-32', category: 'food', word: 'acqua', pron: 'AH-kwa', meaning: 'water', example: "Vorrei un bicchiere d'acqua.", exampleMeaning: 'I would like a glass of water.' },
    { id: 'it-v-33', category: 'food', word: 'vino', pron: 'VEE-no', meaning: 'wine', example: 'Il vino rosso si abbina bene con la carne.', exampleMeaning: 'Red wine pairs well with meat.' },
    { id: 'it-v-34', category: 'food', word: 'pasta', pron: 'PAH-sta', meaning: 'pasta', example: 'La pasta al pomodoro è il mio piatto preferito.', exampleMeaning: 'Pasta with tomato sauce is my favorite dish.' },
    { id: 'it-v-35', category: 'food', word: 'pizza', pron: 'PEET-tsa', meaning: 'pizza', example: 'Ordiniamo una pizza margherita.', exampleMeaning: "Let's order a margherita pizza." },
    { id: 'it-v-36', category: 'food', word: 'formaggio', pron: 'for-MAD-jo', meaning: 'cheese', example: "Metto un po' di formaggio sulla pasta.", exampleMeaning: "I'll put some cheese on the pasta." },
    { id: 'it-v-37', category: 'food', word: 'carne', pron: 'KAR-neh', meaning: 'meat', example: 'Non mangio carne il venerdì.', exampleMeaning: "I don't eat meat on Fridays." },
    { id: 'it-v-38', category: 'food', word: 'verdura', pron: 'vehr-DOO-ra', meaning: 'vegetables', example: 'Mangia sempre molta verdura.', exampleMeaning: 'He always eats a lot of vegetables.' },
    { id: 'it-v-39', category: 'food', word: 'frutta', pron: 'FROOT-ta', meaning: 'fruit', example: 'Compro frutta fresca al mercato.', exampleMeaning: 'I buy fresh fruit at the market.' },
    { id: 'it-v-40', category: 'food', word: 'dolce', pron: 'DOL-cheh', meaning: 'dessert / sweet', example: 'Prendiamo un dolce per finire?', exampleMeaning: 'Shall we have a dessert to finish?' },
    // time
    { id: 'it-v-41', category: 'time', word: 'oggi', pron: 'OD-jee', meaning: 'today', example: 'Oggi fa bel tempo.', exampleMeaning: 'The weather is nice today.' },
    { id: 'it-v-42', category: 'time', word: 'domani', pron: 'do-MAH-nee', meaning: 'tomorrow', example: 'Domani ho un esame importante.', exampleMeaning: 'Tomorrow I have an important exam.' },
    { id: 'it-v-43', category: 'time', word: 'ieri', pron: 'YEH-ree', meaning: 'yesterday', example: 'Ieri sono andato al cinema.', exampleMeaning: 'Yesterday I went to the cinema.' },
    { id: 'it-v-44', category: 'time', word: 'ora', pron: 'OH-ra', meaning: 'now / hour', example: 'Devo andare ora.', exampleMeaning: 'I have to go now.' },
    { id: 'it-v-45', category: 'time', word: 'settimana', pron: 'set-tee-MAH-na', meaning: 'week', example: 'Ci vediamo la prossima settimana.', exampleMeaning: 'See you next week.' },
    { id: 'it-v-46', category: 'time', word: 'mese', pron: 'MEH-zeh', meaning: 'month', example: 'Parto tra un mese.', exampleMeaning: "I'm leaving in a month." },
    { id: 'it-v-47', category: 'time', word: 'anno', pron: 'AN-no', meaning: 'year', example: 'Ho vissuto in Italia per un anno.', exampleMeaning: 'I lived in Italy for a year.' },
    { id: 'it-v-48', category: 'time', word: 'mattina', pron: 'mat-TEE-na', meaning: 'morning', example: 'Mi sveglio presto la mattina.', exampleMeaning: 'I wake up early in the morning.' },
    { id: 'it-v-49', category: 'time', word: 'sera', pron: 'SEH-ra', meaning: 'evening', example: 'La sera leggo un libro.', exampleMeaning: 'In the evening I read a book.' },
    { id: 'it-v-50', category: 'time', word: 'sempre', pron: 'SEM-preh', meaning: 'always', example: 'Sei sempre in ritardo!', exampleMeaning: "You're always late!" },
    // travel
    { id: 'it-v-51', category: 'travel', word: 'aeroporto', pron: 'ah-eh-ro-POR-to', meaning: 'airport', example: "L'aeroporto è lontano dal centro.", exampleMeaning: 'The airport is far from downtown.' },
    { id: 'it-v-52', category: 'travel', word: 'treno', pron: 'TREH-no', meaning: 'train', example: 'Il treno parte tra dieci minuti.', exampleMeaning: 'The train leaves in ten minutes.' },
    { id: 'it-v-53', category: 'travel', word: 'biglietto', pron: 'bee-LYET-to', meaning: 'ticket', example: 'Ho comprato il biglietto online.', exampleMeaning: 'I bought the ticket online.' },
    { id: 'it-v-54', category: 'travel', word: 'valigia', pron: 'va-LEE-ja', meaning: 'suitcase', example: 'Ho perso la mia valigia.', exampleMeaning: 'I lost my suitcase.' },
    { id: 'it-v-55', category: 'travel', word: 'passaporto', pron: 'pas-sa-POR-to', meaning: 'passport', example: 'Non dimenticare il passaporto.', exampleMeaning: "Don't forget your passport." },
    { id: 'it-v-56', category: 'travel', word: 'albergo', pron: 'al-BEHR-go', meaning: 'hotel', example: 'Abbiamo prenotato un albergo vicino al mare.', exampleMeaning: 'We booked a hotel near the sea.' },
    { id: 'it-v-57', category: 'travel', word: 'stazione', pron: 'sta-TSYO-neh', meaning: 'station', example: "La stazione è dietro l'angolo.", exampleMeaning: 'The station is around the corner.' },
    { id: 'it-v-58', category: 'travel', word: 'strada', pron: 'STRAH-da', meaning: 'street / road', example: 'Questa strada porta al centro storico.', exampleMeaning: 'This street leads to the historic center.' },
    { id: 'it-v-59', category: 'travel', word: 'mappa', pron: 'MAP-pa', meaning: 'map', example: 'Guardiamo la mappa insieme.', exampleMeaning: "Let's look at the map together." },
    { id: 'it-v-60', category: 'travel', word: 'viaggio', pron: 'VYAD-jo', meaning: 'trip / journey', example: 'Buon viaggio!', exampleMeaning: 'Have a good trip!' },
    // verbs
    { id: 'it-v-61', category: 'verbs', word: 'essere', pron: 'ES-seh-reh', meaning: 'to be', example: 'Voglio essere felice.', exampleMeaning: 'I want to be happy.' },
    { id: 'it-v-62', category: 'verbs', word: 'avere', pron: 'ah-VEH-reh', meaning: 'to have', example: 'Ho una sorella maggiore.', exampleMeaning: 'I have an older sister.' },
    { id: 'it-v-63', category: 'verbs', word: 'fare', pron: 'FAH-reh', meaning: 'to do / to make', example: 'Cosa fai stasera?', exampleMeaning: 'What are you doing tonight?' },
    { id: 'it-v-64', category: 'verbs', word: 'andare', pron: 'an-DAH-reh', meaning: 'to go', example: 'Andiamo al mare domani.', exampleMeaning: "We're going to the beach tomorrow." },
    { id: 'it-v-65', category: 'verbs', word: 'parlare', pron: 'par-LAH-reh', meaning: 'to speak', example: 'Parlo un po di italiano.', exampleMeaning: 'I speak a little Italian.' },
    { id: 'it-v-66', category: 'verbs', word: 'mangiare', pron: 'man-JAH-reh', meaning: 'to eat', example: 'Mangiamo insieme stasera?', exampleMeaning: 'Shall we eat together tonight?' },
    { id: 'it-v-67', category: 'verbs', word: 'bere', pron: 'BEH-reh', meaning: 'to drink', example: 'Bevo un caffè ogni mattina.', exampleMeaning: 'I drink a coffee every morning.' },
    { id: 'it-v-68', category: 'verbs', word: 'dormire', pron: 'dor-MEE-reh', meaning: 'to sleep', example: 'I bambini dormono già.', exampleMeaning: 'The children are already sleeping.' },
    { id: 'it-v-69', category: 'verbs', word: 'volere', pron: 'vo-LEH-reh', meaning: 'to want', example: "Voglio imparare l'italiano.", exampleMeaning: 'I want to learn Italian.' },
    { id: 'it-v-70', category: 'verbs', word: 'potere', pron: 'po-TEH-reh', meaning: 'to be able to / can', example: 'Puoi aiutarmi, per favore?', exampleMeaning: 'Can you help me, please?' },
    // adjectives
    { id: 'it-v-71', category: 'adjectives', word: 'bello', pron: 'BEL-lo', meaning: 'beautiful / nice', example: 'Che bel panorama!', exampleMeaning: 'What a beautiful view!' },
    { id: 'it-v-72', category: 'adjectives', word: 'buono', pron: 'BWO-no', meaning: 'good', example: 'Questo ristorante è molto buono.', exampleMeaning: 'This restaurant is very good.' },
    { id: 'it-v-73', category: 'adjectives', word: 'grande', pron: 'GRAN-deh', meaning: 'big', example: 'Vive in una casa grande.', exampleMeaning: 'He lives in a big house.' },
    { id: 'it-v-74', category: 'adjectives', word: 'piccolo', pron: 'PEEK-ko-lo', meaning: 'small', example: 'Ho un piccolo problema.', exampleMeaning: 'I have a small problem.' },
    { id: 'it-v-75', category: 'adjectives', word: 'nuovo', pron: 'NWO-vo', meaning: 'new', example: 'Ho comprato una macchina nuova.', exampleMeaning: 'I bought a new car.' },
    { id: 'it-v-76', category: 'adjectives', word: 'vecchio', pron: 'VEK-kyo', meaning: 'old', example: 'Quel palazzo è molto vecchio.', exampleMeaning: 'That building is very old.' },
    { id: 'it-v-77', category: 'adjectives', word: 'felice', pron: 'feh-LEE-cheh', meaning: 'happy', example: 'Sono felice di vederti.', exampleMeaning: "I'm happy to see you." },
    { id: 'it-v-78', category: 'adjectives', word: 'triste', pron: 'TREES-teh', meaning: 'sad', example: 'Sembri triste oggi.', exampleMeaning: 'You seem sad today.' },
    { id: 'it-v-79', category: 'adjectives', word: 'facile', pron: 'FAH-chee-leh', meaning: 'easy', example: 'Questo esercizio è facile.', exampleMeaning: 'This exercise is easy.' },
    { id: 'it-v-80', category: 'adjectives', word: 'difficile', pron: 'deef-FEE-chee-leh', meaning: 'difficult', example: "L'italiano non è difficile da imparare.", exampleMeaning: "Italian isn't difficult to learn." }
  ],
  grammar: [
    {
      id: 'it-g-1',
      title: 'Gender of Nouns',
      explanation: 'Italian nouns are either masculine or feminine. Most nouns ending in -o are masculine and most ending in -a are feminine. Nouns ending in -e can be either gender and their gender must simply be memorized. Gender determines which articles and adjectives you must use with the noun.',
      pattern: '-o = masculine, -a = feminine, -e = either',
      examples: [
        { target: 'Il libro è interessante.', meaning: 'The book is interesting.' },
        { target: 'La casa è grande.', meaning: 'The house is big.' },
        { target: 'Il ristorante è vicino.', meaning: 'The restaurant is close by.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Which gender is the noun "ragazza" (girl)?', choices: ['Masculine', 'Feminine', 'Neuter', 'Plural'], answerIndex: 1 },
        { type: 'fill', prompt: 'Complete with the Italian word for "girl": "La ___ è bella." (The girl is beautiful.)', answer: 'ragazza', hint: 'Ends in -a, feminine noun' }
      ]
    },
    {
      id: 'it-g-2',
      title: 'Definite Articles',
      explanation: 'The Italian definite article ("the") changes form depending on the gender, number, and first letter of the noun that follows it. Masculine singular nouns use "il" or "lo", feminine singular nouns use "la", and each has its own plural form. Choosing the right article is essential for speaking correctly.',
      pattern: 'il / lo / la (singular) → i / gli / le (plural)',
      examples: [
        { target: 'Il gatto dorme sul divano.', meaning: 'The cat is sleeping on the sofa.' },
        { target: 'La ragazza legge un libro.', meaning: 'The girl is reading a book.' },
        { target: 'Gli studenti arrivano in ritardo.', meaning: 'The students arrive late.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct article: "___ studente studia molto." (The student studies a lot.)', choices: ['Il', 'Lo', 'La', 'I'], answerIndex: 1 },
        { type: 'fill', prompt: 'Complete with the correct definite article: "___ case sono nuove." (The houses are new.)', answer: 'Le', hint: 'Feminine plural article' }
      ]
    },
    {
      id: 'it-g-3',
      title: 'Indefinite Articles',
      explanation: 'The Italian indefinite article ("a"/"an") also changes based on gender and on the sound that follows it. Masculine nouns use "un" or "uno", while feminine nouns use "una" or "un\'". The exact form depends on the first letters of the noun that comes next.',
      pattern: 'un / uno (masculine) — una / un\' (feminine)',
      examples: [
        { target: 'Ho un fratello e una sorella.', meaning: 'I have a brother and a sister.' },
        { target: 'Vorrei uno yogurt, per favore.', meaning: 'I would like a yogurt, please.' },
        { target: "C'è un'amica al telefono.", meaning: 'There is a friend on the phone.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct article: "Ho ___ idea fantastica." (I have a fantastic idea.)', choices: ['un', "un'", 'uno', 'una'], answerIndex: 1 },
        { type: 'fill', prompt: 'Complete: "Mangio ___ mela ogni giorno." (I eat an apple every day.)', answer: 'una', hint: 'Feminine singular indefinite article' }
      ]
    },
    {
      id: 'it-g-4',
      title: 'Present Tense: Essere and Avere',
      explanation: '"Essere" (to be) and "avere" (to have) are the two most important irregular verbs in Italian and are used constantly in daily conversation, as well as to build other tenses. Their present-tense forms are irregular and must be memorized rather than following a regular pattern.',
      pattern: 'io sono/ho, tu sei/hai, lui-lei è/ha, noi siamo/abbiamo, voi siete/avete, loro sono/hanno',
      examples: [
        { target: 'Io sono italiano e ho ventotto anni.', meaning: 'I am Italian and I am twenty-eight years old.' },
        { target: 'Noi siamo stanchi ma abbiamo tempo.', meaning: 'We are tired but we have time.' },
        { target: 'Loro hanno una casa grande.', meaning: 'They have a big house.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct form: "Tu ___ molto simpatico." (You are very nice.)', choices: ['sono', 'sei', 'è', 'siamo'], answerIndex: 1 },
        { type: 'fill', prompt: 'Complete: "Noi ___ fame." (We are hungry.)', answer: 'abbiamo', hint: 'Present tense of avere for "noi"' }
      ]
    },
    {
      id: 'it-g-5',
      title: 'Present Tense: Regular Verbs',
      explanation: 'Regular Italian verbs fall into three groups based on their infinitive ending: -are, -ere, and -ire. Each group follows a predictable set of endings for every subject pronoun in the present tense. Learning these three patterns lets you conjugate hundreds of verbs correctly.',
      pattern: '-are → -o,-i,-a,-iamo,-ate,-ano  |  -ere/-ire → -o,-i,-e,-iamo,-ete/-ite,-ono',
      examples: [
        { target: 'Io parlo italiano ogni giorno.', meaning: 'I speak Italian every day.' },
        { target: 'Lei scrive una lettera.', meaning: 'She writes a letter.' },
        { target: 'Noi partiamo domani mattina.', meaning: 'We leave tomorrow morning.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct form: "Loro ___ (parlare) inglese." (They speak English.)', choices: ['parlano', 'parla', 'parli', 'parliamo'], answerIndex: 0 },
        { type: 'fill', prompt: 'Complete: "Tu ___ (scrivere) una email." (You write an email.)', answer: 'scrivi', hint: '-ere verb ending for "tu"' }
      ]
    },
    {
      id: 'it-g-6',
      title: 'Adjective Agreement',
      explanation: 'Italian adjectives must agree in gender and number with the noun they describe, and they usually follow the noun. An adjective ending in -o changes to -a for feminine nouns and to -i or -e for plural nouns. This agreement applies even when the adjective is separated from the noun by a verb like "essere".',
      pattern: 'adjective ending matches noun gender/number: -o / -a / -i / -e',
      examples: [
        { target: 'Il ragazzo è alto.', meaning: 'The boy is tall.' },
        { target: 'La ragazza è alta.', meaning: 'The girl is tall.' },
        { target: 'I bambini sono felici.', meaning: 'The children are happy.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct ending: "Le case sono molto vecchi__." (The houses are very old.)', choices: ['o', 'a', 'i', 'e'], answerIndex: 3 },
        { type: 'fill', prompt: 'Complete: "Il caffè è molto cald___." (The coffee is very hot.)', answer: 'o', hint: 'Masculine singular adjective ending' }
      ]
    },
    {
      id: 'it-g-7',
      title: 'Prepositions + Articles',
      explanation: 'When common prepositions like "a", "di", "da", "in", and "su" are followed by a definite article, they combine into a single word called a preposizione articolata. For example, "in" plus "il" becomes "nel". These combined forms appear constantly in everyday Italian and must be memorized as fixed pairs.',
      pattern: 'a+il=al, di+il=del, da+la=dalla, in+il=nel, su+il=sul',
      examples: [
        { target: 'Vado al mercato ogni sabato.', meaning: 'I go to the market every Saturday.' },
        { target: 'Il libro è sul tavolo.', meaning: 'The book is on the table.' },
        { target: 'Torniamo dalla vacanza domani.', meaning: 'We are coming back from vacation tomorrow.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct combined form: "Metto le chiavi ___ borsa." (I put the keys in the bag.)', choices: ['nel', 'nella', 'nello', 'nei'], answerIndex: 1 },
        { type: 'fill', prompt: 'Complete: "Il gatto è ___ letto." (The cat is on the bed.)', answer: 'sul', hint: 'su + il = ?' }
      ]
    },
    {
      id: 'it-g-8',
      title: 'Passato Prossimo (Present Perfect)',
      explanation: 'The passato prossimo is used to talk about completed actions in the past and is the most common past tense in spoken Italian. It is formed with the present tense of "avere" or "essere" plus the past participle of the main verb. Verbs of motion and reflexive verbs use "essere", and in that case the past participle must agree in gender and number with the subject.',
      pattern: 'avere/essere (present) + past participle (-ato / -uto / -ito)',
      examples: [
        { target: 'Ho mangiato la pizza ieri sera.', meaning: 'I ate pizza last night.' },
        { target: 'Siamo andati al cinema sabato.', meaning: 'We went to the cinema on Saturday.' },
        { target: 'Lei è partita presto stamattina.', meaning: 'She left early this morning.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct auxiliary: "Maria ___ arrivata alle nove." (Maria arrived at nine.)', choices: ['ha', 'è', 'ho', 'sono'], answerIndex: 1 },
        { type: 'fill', prompt: 'Complete: "Noi abbiamo ___ (finire) il lavoro." (We finished the work.)', answer: 'finito', hint: 'Past participle of finire' }
      ]
    }
  ],
  dialogues: [
    {
      id: 'it-d-1',
      title: 'Self-Introduction',
      scenario: 'Two people meet for the first time at a party and introduce themselves.',
      lines: [
        { speaker: 'A', target: 'Ciao! Come ti chiami?', meaning: "Hi! What's your name?" },
        { speaker: 'B', target: 'Mi chiamo Marco. E tu?', meaning: "My name is Marco. And you?" },
        { speaker: 'A', target: 'Io sono Elena. Piacere di conoscerti.', meaning: "I'm Elena. Nice to meet you." },
        { speaker: 'B', target: 'Piacere mio! Di dove sei?', meaning: 'Nice to meet you too! Where are you from?' },
        { speaker: 'A', target: 'Sono di Milano. E tu?', meaning: "I'm from Milan. And you?" },
        { speaker: 'B', target: 'Io sono di Napoli, ma vivo a Roma.', meaning: "I'm from Naples, but I live in Rome." },
        { speaker: 'A', target: 'Che lavoro fai?', meaning: 'What do you do for work?' },
        { speaker: 'B', target: 'Sono insegnante di inglese.', meaning: "I'm an English teacher." }
      ]
    },
    {
      id: 'it-d-2',
      title: 'Ordering at a Cafe',
      scenario: 'A customer orders a drink and a pastry at an Italian cafe.',
      lines: [
        { speaker: 'A', target: 'Buongiorno, cosa desidera?', meaning: 'Good morning, what would you like?' },
        { speaker: 'B', target: 'Vorrei un cappuccino e un cornetto, per favore.', meaning: 'I would like a cappuccino and a croissant, please.' },
        { speaker: 'A', target: 'Subito. Da bere solo il cappuccino?', meaning: 'Right away. Just the cappuccino to drink?' },
        { speaker: 'B', target: 'Sì, va bene così. Quanto costa?', meaning: "Yes, that's fine. How much does it cost?" },
        { speaker: 'A', target: 'Sono quattro euro e cinquanta.', meaning: "That's four euros and fifty cents." },
        { speaker: 'B', target: 'Ecco a lei. Grazie mille!', meaning: 'Here you go. Thank you very much!' },
        { speaker: 'A', target: 'Grazie a lei, buona giornata!', meaning: 'Thank you, have a good day!' }
      ]
    },
    {
      id: 'it-d-3',
      title: 'Asking for Directions',
      scenario: 'A tourist asks a local how to get to the train station.',
      lines: [
        { speaker: 'A', target: 'Scusi, come arrivo alla stazione?', meaning: 'Excuse me, how do I get to the station?' },
        { speaker: 'B', target: 'Vada dritto e giri a destra al semaforo.', meaning: 'Go straight and turn right at the traffic light.' },
        { speaker: 'A', target: 'È lontano da qui?', meaning: 'Is it far from here?' },
        { speaker: 'B', target: 'No, sono circa dieci minuti a piedi.', meaning: "No, it's about ten minutes on foot." },
        { speaker: 'A', target: "Perfetto, grazie mille per l'informazione.", meaning: 'Perfect, thank you very much for the information.' },
        { speaker: 'B', target: 'Prego, buon viaggio!', meaning: "You're welcome, have a good trip!" }
      ]
    },
    {
      id: 'it-d-4',
      title: 'Shopping',
      scenario: 'A customer tries on a jacket at a clothing store.',
      lines: [
        { speaker: 'A', target: 'Buonasera, posso aiutarla?', meaning: 'Good evening, can I help you?' },
        { speaker: 'B', target: 'Sì, cerco una giacca della mia taglia.', meaning: "Yes, I'm looking for a jacket in my size." },
        { speaker: 'A', target: 'Che taglia porta?', meaning: 'What size do you wear?' },
        { speaker: 'B', target: 'Porto la taglia media.', meaning: 'I wear a medium size.' },
        { speaker: 'A', target: "Questa le piace? È in offerta.", meaning: "Do you like this one? It's on sale." },
        { speaker: 'B', target: 'Mi piace molto! Posso provarla?', meaning: 'I like it a lot! Can I try it on?' },
        { speaker: 'A', target: 'Certo, il camerino è lì a destra.', meaning: 'Sure, the fitting room is there on the right.' },
        { speaker: 'B', target: 'Grazie, torno subito.', meaning: "Thanks, I'll be right back." }
      ]
    }
  ],
  listening: [
    { id: 'it-l-1', target: 'Mi chiamo Sofia.', meaning: 'My name is Sofia.', choices: ['My name is Sofia.', 'I am from Sofia.', 'I like Sofia.', 'Sofia is my sister.'], answerIndex: 0 },
    { id: 'it-l-2', target: 'Fa molto caldo oggi.', meaning: "It's very hot today.", choices: ["It's very cold today.", "It's very hot today.", 'It rained today.', "It's very windy today."], answerIndex: 1 },
    { id: 'it-l-3', target: 'Dove abiti adesso?', meaning: 'Where do you live now?', choices: ['Where do you live now?', 'Where were you born?', 'Where are you going?', 'Where did you study?'], answerIndex: 0 },
    { id: 'it-l-4', target: 'Ho bisogno di un caffè.', meaning: 'I need a coffee.', choices: ['I need a coffee.', 'I need some sugar.', 'I need a break.', 'I need water.'], answerIndex: 0 },
    { id: 'it-l-5', target: 'Quanti anni hai?', meaning: 'How old are you?', choices: ["What's your name?", 'How old are you?', 'Where do you live?', 'What time is it?'], answerIndex: 1 },
    { id: 'it-l-6', target: 'Il museo apre alle nove di mattina.', meaning: 'The museum opens at nine in the morning.', choices: ['The museum closes at nine in the morning.', 'The museum opens at nine in the evening.', 'The museum opens at nine in the morning.', 'The museum is closed on Mondays.'], answerIndex: 2 },
    { id: 'it-l-7', target: 'Mi piacerebbe visitare la Sicilia in estate.', meaning: 'I would like to visit Sicily in the summer.', choices: ['I visited Sicily last summer.', 'I would like to visit Sicily in the summer.', 'I live in Sicily during the summer.', "I don't like Sicily in summer."], answerIndex: 1 },
    { id: 'it-l-8', target: 'Non riesco a trovare le chiavi di casa.', meaning: "I can't find my house keys.", choices: ['I lost my passport.', 'I forgot my phone at home.', "I can't find my house keys.", 'I locked myself out of the car.'], answerIndex: 2 },
    { id: 'it-l-9', target: 'Se piove domani, restiamo a casa.', meaning: "If it rains tomorrow, we'll stay home.", choices: ['It rained yesterday so we stayed home.', "If it rains tomorrow, we'll stay home.", 'It never rains here in summer.', 'We are going out despite the rain.'], answerIndex: 1 },
    { id: 'it-l-10', target: 'Mia cugina si è appena laureata in medicina.', meaning: 'My cousin just graduated in medicine.', choices: ['My cousin is studying medicine.', 'My cousin works as a doctor.', 'My cousin just graduated in medicine.', 'My cousin wants to become a doctor.'], answerIndex: 2 },
    { id: 'it-l-11', target: 'Anche se è tardi, voglio finire questo libro.', meaning: "Even though it's late, I want to finish this book.", choices: ["It's too late to read now.", "Even though it's late, I want to finish this book.", 'I already finished the book late at night.', 'I never read books before bed.'], answerIndex: 1 },
    { id: 'it-l-12', target: 'Se avessi più tempo, viaggerei in tutto il mondo.', meaning: 'If I had more time, I would travel the whole world.', choices: ['I traveled the whole world last year.', "I don't have time to travel anymore.", 'If I had more time, I would travel the whole world.', 'I will travel the world next year.'], answerIndex: 2 }
  ]
};
