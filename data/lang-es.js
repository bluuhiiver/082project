window.LL_DATA = window.LL_DATA || {};
window.LL_DATA.es = {
  code: 'es',
  name: 'Spanish',
  nativeName: 'Español',
  flag: '🇪🇸',
  ttsLang: 'es-ES',
  vocab: [
    // greetings
    { id: 'es-v-1', category: 'greetings', word: 'Hola', pron: 'OH-lah', meaning: 'hello', example: 'Hola, ¿qué tal?', exampleMeaning: 'Hello, how\'s it going?' },
    { id: 'es-v-2', category: 'greetings', word: 'Buenos días', pron: 'BWEH-nohs DEE-ahs', meaning: 'good morning', example: 'Buenos días, señora.', exampleMeaning: 'Good morning, ma\'am.' },
    { id: 'es-v-3', category: 'greetings', word: 'Buenas tardes', pron: 'BWEH-nahs TAR-dehs', meaning: 'good afternoon', example: 'Buenas tardes, ¿cómo está usted?', exampleMeaning: 'Good afternoon, how are you?' },
    { id: 'es-v-4', category: 'greetings', word: 'Buenas noches', pron: 'BWEH-nahs NOH-chehs', meaning: 'good night / good evening', example: 'Buenas noches, que duermas bien.', exampleMeaning: 'Good night, sleep well.' },
    { id: 'es-v-5', category: 'greetings', word: 'Adiós', pron: 'ah-DYOHS', meaning: 'goodbye', example: 'Adiós, nos vemos pronto.', exampleMeaning: 'Goodbye, see you soon.' },
    { id: 'es-v-6', category: 'greetings', word: 'Hasta luego', pron: 'AHS-tah LWEH-goh', meaning: 'see you later', example: 'Hasta luego, amigo.', exampleMeaning: 'See you later, friend.' },
    { id: 'es-v-7', category: 'greetings', word: 'Por favor', pron: 'pohr fah-VOHR', meaning: 'please', example: 'Un café, por favor.', exampleMeaning: 'A coffee, please.' },
    { id: 'es-v-8', category: 'greetings', word: 'Gracias', pron: 'GRAH-syahs', meaning: 'thank you', example: 'Muchas gracias por tu ayuda.', exampleMeaning: 'Thank you very much for your help.' },
    { id: 'es-v-9', category: 'greetings', word: 'De nada', pron: 'deh NAH-dah', meaning: 'you\'re welcome', example: '—Gracias. —De nada.', exampleMeaning: 'Thanks. You\'re welcome.' },
    { id: 'es-v-10', category: 'greetings', word: '¿Cómo estás?', pron: 'KOH-moh ehs-TAHS', meaning: 'how are you (informal)', example: 'Hola, ¿cómo estás hoy?', exampleMeaning: 'Hi, how are you today?' },
    // numbers
    { id: 'es-v-11', category: 'numbers', word: 'uno', pron: 'OO-noh', meaning: 'one', example: 'Solo necesito uno.', exampleMeaning: 'I only need one.' },
    { id: 'es-v-12', category: 'numbers', word: 'dos', pron: 'dohs', meaning: 'two', example: 'Tengo dos gatos.', exampleMeaning: 'I have two cats.' },
    { id: 'es-v-13', category: 'numbers', word: 'tres', pron: 'trehs', meaning: 'three', example: 'Son las tres de la tarde.', exampleMeaning: 'It\'s three in the afternoon.' },
    { id: 'es-v-14', category: 'numbers', word: 'cuatro', pron: 'KWAH-troh', meaning: 'four', example: 'Hay cuatro sillas en la mesa.', exampleMeaning: 'There are four chairs at the table.' },
    { id: 'es-v-15', category: 'numbers', word: 'cinco', pron: 'SEEN-koh', meaning: 'five', example: 'Tengo cinco hermanos.', exampleMeaning: 'I have five siblings.' },
    { id: 'es-v-16', category: 'numbers', word: 'seis', pron: 'SEH-ees', meaning: 'six', example: 'El tren sale a las seis.', exampleMeaning: 'The train leaves at six.' },
    { id: 'es-v-17', category: 'numbers', word: 'siete', pron: 'SYEH-teh', meaning: 'seven', example: 'La tienda abre a las siete.', exampleMeaning: 'The store opens at seven.' },
    { id: 'es-v-18', category: 'numbers', word: 'ocho', pron: 'OH-choh', meaning: 'eight', example: 'Son las ocho en punto.', exampleMeaning: 'It\'s eight o\'clock sharp.' },
    { id: 'es-v-19', category: 'numbers', word: 'nueve', pron: 'NWEH-veh', meaning: 'nine', example: 'Mi cumpleaños es el nueve de mayo.', exampleMeaning: 'My birthday is on the ninth of May.' },
    { id: 'es-v-20', category: 'numbers', word: 'diez', pron: 'dyehs', meaning: 'ten', example: 'Cuenta hasta diez.', exampleMeaning: 'Count to ten.' },
    // family
    { id: 'es-v-21', category: 'family', word: 'familia', pron: 'fah-MEE-lyah', meaning: 'family', example: 'Mi familia es muy grande.', exampleMeaning: 'My family is very big.' },
    { id: 'es-v-22', category: 'family', word: 'madre', pron: 'MAH-dreh', meaning: 'mother', example: 'Mi madre cocina muy bien.', exampleMeaning: 'My mother cooks very well.' },
    { id: 'es-v-23', category: 'family', word: 'padre', pron: 'PAH-dreh', meaning: 'father', example: 'Mi padre trabaja en un banco.', exampleMeaning: 'My father works at a bank.' },
    { id: 'es-v-24', category: 'family', word: 'hermano', pron: 'ehr-MAH-noh', meaning: 'brother', example: 'Tengo un hermano mayor.', exampleMeaning: 'I have an older brother.' },
    { id: 'es-v-25', category: 'family', word: 'hermana', pron: 'ehr-MAH-nah', meaning: 'sister', example: 'Mi hermana vive en Madrid.', exampleMeaning: 'My sister lives in Madrid.' },
    { id: 'es-v-26', category: 'family', word: 'hijo', pron: 'EE-hoh', meaning: 'son', example: 'Su hijo tiene diez años.', exampleMeaning: 'Her son is ten years old.' },
    { id: 'es-v-27', category: 'family', word: 'hija', pron: 'EE-hah', meaning: 'daughter', example: 'Nuestra hija estudia medicina.', exampleMeaning: 'Our daughter studies medicine.' },
    { id: 'es-v-28', category: 'family', word: 'abuelo', pron: 'ah-BWEH-loh', meaning: 'grandfather', example: 'Mi abuelo cuenta historias increíbles.', exampleMeaning: 'My grandfather tells amazing stories.' },
    { id: 'es-v-29', category: 'family', word: 'abuela', pron: 'ah-BWEH-lah', meaning: 'grandmother', example: 'Mi abuela hace un pastel delicioso.', exampleMeaning: 'My grandmother makes a delicious cake.' },
    { id: 'es-v-30', category: 'family', word: 'tío', pron: 'TEE-oh', meaning: 'uncle', example: 'Mi tío vive cerca de la playa.', exampleMeaning: 'My uncle lives near the beach.' },
    // food
    { id: 'es-v-31', category: 'food', word: 'agua', pron: 'AH-gwah', meaning: 'water', example: 'Necesito un vaso de agua.', exampleMeaning: 'I need a glass of water.' },
    { id: 'es-v-32', category: 'food', word: 'pan', pron: 'pahn', meaning: 'bread', example: 'Compramos pan fresco cada mañana.', exampleMeaning: 'We buy fresh bread every morning.' },
    { id: 'es-v-33', category: 'food', word: 'arroz', pron: 'ah-ROHS', meaning: 'rice', example: 'El arroz con pollo es mi plato favorito.', exampleMeaning: 'Rice with chicken is my favorite dish.' },
    { id: 'es-v-34', category: 'food', word: 'pollo', pron: 'POH-yoh', meaning: 'chicken', example: 'Voy a pedir pollo asado.', exampleMeaning: 'I\'m going to order roasted chicken.' },
    { id: 'es-v-35', category: 'food', word: 'carne', pron: 'KAR-neh', meaning: 'meat', example: 'No como carne los lunes.', exampleMeaning: 'I don\'t eat meat on Mondays.' },
    { id: 'es-v-36', category: 'food', word: 'pescado', pron: 'pehs-KAH-doh', meaning: 'fish', example: 'El pescado está muy fresco hoy.', exampleMeaning: 'The fish is very fresh today.' },
    { id: 'es-v-37', category: 'food', word: 'fruta', pron: 'FROO-tah', meaning: 'fruit', example: 'Como fruta todos los días.', exampleMeaning: 'I eat fruit every day.' },
    { id: 'es-v-38', category: 'food', word: 'verdura', pron: 'vehr-DOO-rah', meaning: 'vegetable', example: 'Me gusta la verdura fresca.', exampleMeaning: 'I like fresh vegetables.' },
    { id: 'es-v-39', category: 'food', word: 'queso', pron: 'KEH-soh', meaning: 'cheese', example: 'Este queso es de España.', exampleMeaning: 'This cheese is from Spain.' },
    { id: 'es-v-40', category: 'food', word: 'huevo', pron: 'WEH-voh', meaning: 'egg', example: 'Quiero un huevo frito para desayunar.', exampleMeaning: 'I want a fried egg for breakfast.' },
    // time
    { id: 'es-v-41', category: 'time', word: 'hoy', pron: 'oy', meaning: 'today', example: 'Hoy hace mucho sol.', exampleMeaning: 'It\'s very sunny today.' },
    { id: 'es-v-42', category: 'time', word: 'mañana', pron: 'mah-NYAH-nah', meaning: 'tomorrow', example: 'Nos vemos mañana por la mañana.', exampleMeaning: 'See you tomorrow morning.' },
    { id: 'es-v-43', category: 'time', word: 'ayer', pron: 'ah-YEHR', meaning: 'yesterday', example: 'Ayer llovió todo el día.', exampleMeaning: 'It rained all day yesterday.' },
    { id: 'es-v-44', category: 'time', word: 'semana', pron: 'seh-MAH-nah', meaning: 'week', example: 'Trabajo cinco días a la semana.', exampleMeaning: 'I work five days a week.' },
    { id: 'es-v-45', category: 'time', word: 'mes', pron: 'mehs', meaning: 'month', example: 'El mes que viene viajamos a Perú.', exampleMeaning: 'Next month we\'re traveling to Peru.' },
    { id: 'es-v-46', category: 'time', word: 'año', pron: 'AH-nyoh', meaning: 'year', example: 'Este año voy a aprender español.', exampleMeaning: 'This year I\'m going to learn Spanish.' },
    { id: 'es-v-47', category: 'time', word: 'hora', pron: 'OH-rah', meaning: 'hour', example: 'Espera solo una hora más.', exampleMeaning: 'Wait just one more hour.' },
    { id: 'es-v-48', category: 'time', word: 'minuto', pron: 'mee-NOO-toh', meaning: 'minute', example: 'Llego en un minuto.', exampleMeaning: 'I\'ll arrive in a minute.' },
    { id: 'es-v-49', category: 'time', word: 'ahora', pron: 'ah-OH-rah', meaning: 'now', example: 'Tenemos que salir ahora mismo.', exampleMeaning: 'We have to leave right now.' },
    { id: 'es-v-50', category: 'time', word: 'tarde', pron: 'TAR-deh', meaning: 'late', example: 'Llegamos tarde a la reunión.', exampleMeaning: 'We arrived late to the meeting.' },
    // travel
    { id: 'es-v-51', category: 'travel', word: 'aeropuerto', pron: 'ah-eh-roh-PWEHR-toh', meaning: 'airport', example: 'El aeropuerto está lejos del centro.', exampleMeaning: 'The airport is far from downtown.' },
    { id: 'es-v-52', category: 'travel', word: 'hotel', pron: 'oh-TEHL', meaning: 'hotel', example: 'Reservamos un hotel cerca de la playa.', exampleMeaning: 'We booked a hotel near the beach.' },
    { id: 'es-v-53', category: 'travel', word: 'maleta', pron: 'mah-LEH-tah', meaning: 'suitcase', example: 'Mi maleta pesa demasiado.', exampleMeaning: 'My suitcase weighs too much.' },
    { id: 'es-v-54', category: 'travel', word: 'pasaporte', pron: 'pah-sah-POHR-teh', meaning: 'passport', example: 'No olvides tu pasaporte.', exampleMeaning: 'Don\'t forget your passport.' },
    { id: 'es-v-55', category: 'travel', word: 'billete', pron: 'bee-YEH-teh', meaning: 'ticket', example: 'Compré un billete de ida y vuelta.', exampleMeaning: 'I bought a round-trip ticket.' },
    { id: 'es-v-56', category: 'travel', word: 'tren', pron: 'trehn', meaning: 'train', example: 'El tren llega a las nueve.', exampleMeaning: 'The train arrives at nine.' },
    { id: 'es-v-57', category: 'travel', word: 'autobús', pron: 'ow-toh-BOOS', meaning: 'bus', example: 'Tomamos el autobús al centro.', exampleMeaning: 'We take the bus downtown.' },
    { id: 'es-v-58', category: 'travel', word: 'mapa', pron: 'MAH-pah', meaning: 'map', example: 'Necesito un mapa de la ciudad.', exampleMeaning: 'I need a map of the city.' },
    { id: 'es-v-59', category: 'travel', word: 'calle', pron: 'KAH-yeh', meaning: 'street', example: 'La tienda está en esta calle.', exampleMeaning: 'The store is on this street.' },
    { id: 'es-v-60', category: 'travel', word: 'estación', pron: 'ehs-tah-SYOHN', meaning: 'station', example: 'La estación de tren está cerca.', exampleMeaning: 'The train station is nearby.' },
    // verbs
    { id: 'es-v-61', category: 'verbs', word: 'ser', pron: 'sehr', meaning: 'to be (permanent)', example: 'Ella es muy inteligente.', exampleMeaning: 'She is very intelligent.' },
    { id: 'es-v-62', category: 'verbs', word: 'estar', pron: 'ehs-TAR', meaning: 'to be (temporary/location)', example: 'Estamos en casa ahora.', exampleMeaning: 'We are at home now.' },
    { id: 'es-v-63', category: 'verbs', word: 'tener', pron: 'teh-NEHR', meaning: 'to have', example: 'Tengo dos hermanos.', exampleMeaning: 'I have two brothers.' },
    { id: 'es-v-64', category: 'verbs', word: 'hacer', pron: 'ah-SEHR', meaning: 'to do / to make', example: '¿Qué haces los fines de semana?', exampleMeaning: 'What do you do on weekends?' },
    { id: 'es-v-65', category: 'verbs', word: 'ir', pron: 'eer', meaning: 'to go', example: 'Vamos al cine esta noche.', exampleMeaning: 'We\'re going to the movies tonight.' },
    { id: 'es-v-66', category: 'verbs', word: 'querer', pron: 'keh-REHR', meaning: 'to want', example: 'Quiero aprender español.', exampleMeaning: 'I want to learn Spanish.' },
    { id: 'es-v-67', category: 'verbs', word: 'poder', pron: 'poh-DEHR', meaning: 'to be able to / can', example: '¿Puedes ayudarme, por favor?', exampleMeaning: 'Can you help me, please?' },
    { id: 'es-v-68', category: 'verbs', word: 'comer', pron: 'koh-MEHR', meaning: 'to eat', example: 'Comemos a las dos.', exampleMeaning: 'We eat at two.' },
    { id: 'es-v-69', category: 'verbs', word: 'hablar', pron: 'ah-BLAR', meaning: 'to speak', example: 'Hablo un poco de español.', exampleMeaning: 'I speak a little Spanish.' },
    { id: 'es-v-70', category: 'verbs', word: 'vivir', pron: 'vee-VEER', meaning: 'to live', example: 'Vivimos en Barcelona.', exampleMeaning: 'We live in Barcelona.' },
    // adjectives
    { id: 'es-v-71', category: 'adjectives', word: 'bueno', pron: 'BWEH-noh', meaning: 'good', example: 'Este restaurante es muy bueno.', exampleMeaning: 'This restaurant is very good.' },
    { id: 'es-v-72', category: 'adjectives', word: 'malo', pron: 'MAH-loh', meaning: 'bad', example: 'El tiempo está malo hoy.', exampleMeaning: 'The weather is bad today.' },
    { id: 'es-v-73', category: 'adjectives', word: 'grande', pron: 'GRAHN-deh', meaning: 'big', example: 'Viven en una casa grande.', exampleMeaning: 'They live in a big house.' },
    { id: 'es-v-74', category: 'adjectives', word: 'pequeño', pron: 'peh-KEH-nyoh', meaning: 'small', example: 'Tengo un perro pequeño.', exampleMeaning: 'I have a small dog.' },
    { id: 'es-v-75', category: 'adjectives', word: 'feliz', pron: 'feh-LEES', meaning: 'happy', example: 'Estoy muy feliz de verte.', exampleMeaning: 'I\'m very happy to see you.' },
    { id: 'es-v-76', category: 'adjectives', word: 'triste', pron: 'TREES-teh', meaning: 'sad', example: 'Se sintió triste después de la película.', exampleMeaning: 'He felt sad after the movie.' },
    { id: 'es-v-77', category: 'adjectives', word: 'bonito', pron: 'boh-NEE-toh', meaning: 'pretty', example: 'Qué vestido tan bonito.', exampleMeaning: 'What a pretty dress.' },
    { id: 'es-v-78', category: 'adjectives', word: 'caro', pron: 'KAH-roh', meaning: 'expensive', example: 'Ese coche es muy caro.', exampleMeaning: 'That car is very expensive.' },
    { id: 'es-v-79', category: 'adjectives', word: 'barato', pron: 'bah-RAH-toh', meaning: 'cheap', example: 'Busco un hotel barato.', exampleMeaning: 'I\'m looking for a cheap hotel.' },
    { id: 'es-v-80', category: 'adjectives', word: 'nuevo', pron: 'NWEH-voh', meaning: 'new', example: 'Compré un teléfono nuevo.', exampleMeaning: 'I bought a new phone.' }
  ],
  grammar: [
    {
      id: 'es-g-1',
      title: 'Gender and Definite Articles',
      explanation: 'Every Spanish noun is either masculine or feminine, and the article used with it must match. Most nouns ending in -o are masculine and pair with "el" or "un," while most ending in -a are feminine and pair with "la" or "una." Plurals use "los/las" and "unos/unas." Getting the gender right matters because adjectives and other words that describe the noun must agree with it too.',
      pattern: 'el/la (the) + noun; un/una (a/an) + noun',
      examples: [
        { target: 'El libro es interesante.', meaning: 'The book is interesting.' },
        { target: 'La casa es grande.', meaning: 'The house is big.' },
        { target: 'Necesito un lápiz y una goma.', meaning: 'I need a pencil and an eraser.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct article: ___ mesa es nueva. (The table is new.)', choices: ['El', 'La', 'Los', 'Las'], answerIndex: 1 },
        { type: 'fill', prompt: 'Complete with the correct indefinite article: Quiero comprar ___ coche. (I want to buy a car.)', answer: 'un', hint: '"Coche" is a masculine noun.' }
      ]
    },
    {
      id: 'es-g-2',
      title: 'Present Tense of Regular -AR Verbs',
      explanation: 'Most Spanish infinitives end in -ar, -er, or -ir. To use a regular -ar verb in the present tense, drop the -ar ending and add the ending that matches the subject: -o, -as, -a, -amos, -áis, -an. This single pattern lets you conjugate hundreds of common verbs like hablar, trabajar, and estudiar.',
      pattern: 'hablar → hablo, hablas, habla, hablamos, habláis, hablan',
      examples: [
        { target: 'Yo hablo español.', meaning: 'I speak Spanish.' },
        { target: 'Ella trabaja en un banco.', meaning: 'She works at a bank.' },
        { target: 'Nosotros estudiamos por la noche.', meaning: 'We study at night.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct form: Tú ___ (hablar) muy rápido. (You speak very fast.)', choices: ['hablo', 'hablas', 'habla', 'hablan'], answerIndex: 1 },
        { type: 'fill', prompt: 'Conjugate the verb: Ellos ___ (trabajar) los sábados. (They work on Saturdays.)', answer: 'trabajan', hint: 'Use the -an ending for "ellos."' }
      ]
    },
    {
      id: 'es-g-3',
      title: 'Ser vs. Estar (To Be)',
      explanation: 'Spanish has two verbs meaning "to be." Use "ser" for lasting characteristics such as identity, origin, profession, and personality. Use "estar" for temporary states, feelings, conditions, and location. Choosing the wrong one can actually change the meaning of a sentence, so this distinction is one of the most important early lessons in Spanish.',
      pattern: 'ser = permanent/identity; estar = temporary/location',
      examples: [
        { target: 'Soy de México.', meaning: 'I\'m from Mexico.' },
        { target: 'Estoy cansado hoy.', meaning: 'I\'m tired today.' },
        { target: 'El café está en la mesa.', meaning: 'The coffee is on the table.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct verb: Nosotros ___ estudiantes. (We are students.)', choices: ['somos', 'estamos', 'es', 'está'], answerIndex: 0 },
        { type: 'fill', prompt: 'Complete with the correct verb: La tienda ___ cerrada ahora. (The store is closed right now — temporary state.)', answer: 'está', hint: 'Use "estar" for temporary conditions.' }
      ]
    },
    {
      id: 'es-g-4',
      title: 'Present Tense of -ER and -IR Verbs',
      explanation: 'Regular -er and -ir verbs follow a pattern similar to -ar verbs but with different endings. -er verbs use -o, -es, -e, -emos, -éis, -en, while -ir verbs use -o, -es, -e, -imos, -ís, -en. Notice that -er and -ir verbs share almost identical endings, differing only in the "nosotros" and "vosotros" forms.',
      pattern: 'comer → como, comes, come, comemos, coméis, comen; vivir → vivo, vives, vive, vivimos, vivís, viven',
      examples: [
        { target: 'Yo como fruta todos los días.', meaning: 'I eat fruit every day.' },
        { target: '¿Tú vives en la ciudad?', meaning: 'Do you live in the city?' },
        { target: 'Ellos escriben cartas.', meaning: 'They write letters.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct form: Nosotros ___ (vivir) en Madrid. (We live in Madrid.)', choices: ['vivo', 'vives', 'vivimos', 'viven'], answerIndex: 2 },
        { type: 'fill', prompt: 'Conjugate the verb: Ella ___ (comer) a las dos. (She eats at two.)', answer: 'come', hint: 'Use the third-person singular -er ending.' }
      ]
    },
    {
      id: 'es-g-5',
      title: 'Adjective Agreement',
      explanation: 'Spanish adjectives must match the noun they describe in both gender and number. Adjectives ending in -o change to -a for feminine nouns, and most adjectives add -s or -es to become plural. Adjectives ending in -e or a consonant usually stay the same for gender but still change for number.',
      pattern: 'noun + adjective (agrees in gender & number)',
      examples: [
        { target: 'El chico es alto.', meaning: 'The boy is tall.' },
        { target: 'La chica es alta.', meaning: 'The girl is tall.' },
        { target: 'Los libros son interesantes.', meaning: 'The books are interesting.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct form: Las casas son ___. (The houses are pretty.)', choices: ['bonito', 'bonita', 'bonitos', 'bonitas'], answerIndex: 3 },
        { type: 'fill', prompt: 'Complete with the correct form: Mi hermana es muy ___. (My sister is very tall.)', answer: 'alta', hint: 'Match feminine singular.' }
      ]
    },
    {
      id: 'es-g-6',
      title: 'Possessive Adjectives',
      explanation: 'Possessive adjectives show ownership and are placed before the noun. They agree in number with the thing that is owned (mi/tu/su, mis/tus/sus), and "nuestro" also agrees in gender. Unlike English, Spanish possessives depend on the object owned, not on the gender of the owner.',
      pattern: 'mi/tu/su + noun (singular); mis/tus/sus + noun (plural)',
      examples: [
        { target: 'Mi familia es grande.', meaning: 'My family is big.' },
        { target: '¿Dónde están tus llaves?', meaning: 'Where are your keys?' },
        { target: 'Nuestra casa está cerca del parque.', meaning: 'Our house is near the park.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct possessive: ___ padres viven en Chile. (My parents live in Chile.)', choices: ['Mi', 'Mis', 'Su', 'Sus'], answerIndex: 1 },
        { type: 'fill', prompt: 'Complete with the correct possessive: Ella busca ___ pasaporte. (She is looking for her passport.)', answer: 'su', hint: '"Su" works for both his/her before a singular noun.' }
      ]
    },
    {
      id: 'es-g-7',
      title: 'Negation and Yes/No Questions',
      explanation: 'To make a Spanish sentence negative, simply place "no" directly before the conjugated verb — there is no separate word for "don\'t" or "doesn\'t." To ask a yes/no question, you can usually keep the same word order as a statement and just raise your intonation, or add question marks in writing.',
      pattern: 'No + verb (negation); ¿Verb + subject...? (question)',
      examples: [
        { target: 'No tengo hambre.', meaning: 'I\'m not hungry.' },
        { target: '¿Hablas inglés?', meaning: 'Do you speak English?' },
        { target: 'Ella no vive aquí.', meaning: 'She doesn\'t live here.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct negation: Yo ___ como carne. (I don\'t eat meat.)', choices: ['no', 'not', 'nada', 'sin'], answerIndex: 0 },
        { type: 'fill', prompt: 'Complete the negative sentence: Ellos ___ tienen tiempo. (They don\'t have time.)', answer: 'no', hint: 'Place this word right before the conjugated verb.' }
      ]
    },
    {
      id: 'es-g-8',
      title: 'Ir + a + Infinitive (Near Future)',
      explanation: 'To talk about what someone is going to do, use the present tense of "ir" (to go) followed by "a" and an infinitive verb. This is the most common everyday way to express near-future plans in spoken Spanish, similar to "going to" in English, and it\'s often easier for beginners than the formal future tense.',
      pattern: 'ir (conjugated) + a + infinitive',
      examples: [
        { target: 'Voy a viajar a España.', meaning: 'I am going to travel to Spain.' },
        { target: '¿Vas a estudiar esta noche?', meaning: 'Are you going to study tonight?' },
        { target: 'Vamos a comer en ese restaurante.', meaning: 'We are going to eat at that restaurant.' }
      ],
      exercises: [
        { type: 'mcq', prompt: 'Choose the correct form: Ella ___ a llamar más tarde. (She is going to call later.)', choices: ['va', 'vas', 'voy', 'van'], answerIndex: 0 },
        { type: 'fill', prompt: 'Complete: Nosotros ___ a visitar a mi abuela. (We are going to visit my grandmother.)', answer: 'vamos', hint: 'Use the "nosotros" form of "ir."' }
      ]
    }
  ],
  dialogues: [
    {
      id: 'es-d-1',
      title: 'Introducing Yourself',
      scenario: 'Two students meet for the first time before class.',
      lines: [
        { speaker: 'A', target: '¡Hola! Me llamo Laura. ¿Y tú?', meaning: 'Hi! My name is Laura. And you?' },
        { speaker: 'B', target: 'Hola, Laura. Me llamo Carlos. Mucho gusto.', meaning: 'Hi, Laura. My name is Carlos. Nice to meet you.' },
        { speaker: 'A', target: 'Mucho gusto, Carlos. ¿De dónde eres?', meaning: 'Nice to meet you, Carlos. Where are you from?' },
        { speaker: 'B', target: 'Soy de Argentina. ¿Y tú, de dónde eres?', meaning: 'I\'m from Argentina. And you, where are you from?' },
        { speaker: 'A', target: 'Soy de Colombia, pero vivo en Madrid ahora.', meaning: 'I\'m from Colombia, but I live in Madrid now.' },
        { speaker: 'B', target: '¡Qué interesante! ¿Qué haces aquí?', meaning: 'How interesting! What are you doing here?' },
        { speaker: 'A', target: 'Estudio español en la universidad.', meaning: 'I\'m studying Spanish at the university.' },
        { speaker: 'B', target: '¡Genial! Espero verte pronto en clase.', meaning: 'Great! I hope to see you soon in class.' }
      ]
    },
    {
      id: 'es-d-2',
      title: 'Ordering at a Cafe',
      scenario: 'A customer orders coffee and dessert at a small cafe.',
      lines: [
        { speaker: 'A', target: 'Buenas tardes, ¿qué desea pedir?', meaning: 'Good afternoon, what would you like to order?' },
        { speaker: 'B', target: 'Buenas tardes. Quisiera un café con leche, por favor.', meaning: 'Good afternoon. I would like a coffee with milk, please.' },
        { speaker: 'A', target: '¿Algo más? Tenemos pasteles muy ricos hoy.', meaning: 'Anything else? We have delicious pastries today.' },
        { speaker: 'B', target: 'Sí, ¿me puede traer un trozo de tarta de manzana?', meaning: 'Yes, could you bring me a slice of apple pie?' },
        { speaker: 'A', target: 'Por supuesto. ¿Para tomar aquí o para llevar?', meaning: 'Of course. For here or to go?' },
        { speaker: 'B', target: 'Para tomar aquí, gracias.', meaning: 'For here, thanks.' },
        { speaker: 'A', target: 'Muy bien, enseguida se lo traigo.', meaning: 'Very well, I\'ll bring it right away.' },
        { speaker: 'B', target: 'Muchas gracias.', meaning: 'Thank you very much.' }
      ]
    },
    {
      id: 'es-d-3',
      title: 'Asking for Directions',
      scenario: 'A tourist asks a local how to get to the train station.',
      lines: [
        { speaker: 'A', target: 'Disculpe, ¿sabe dónde está la estación de tren?', meaning: 'Excuse me, do you know where the train station is?' },
        { speaker: 'B', target: 'Sí, está a dos calles de aquí, cerca de la plaza.', meaning: 'Yes, it\'s two blocks from here, near the plaza.' },
        { speaker: 'A', target: '¿Tengo que girar a la derecha o a la izquierda?', meaning: 'Do I have to turn right or left?' },
        { speaker: 'B', target: 'Siga recto y luego gire a la izquierda en el semáforo.', meaning: 'Go straight and then turn left at the traffic light.' },
        { speaker: 'A', target: '¿Está muy lejos desde aquí?', meaning: 'Is it very far from here?' },
        { speaker: 'B', target: 'No, se puede llegar caminando en cinco minutos.', meaning: 'No, you can get there walking in five minutes.' },
        { speaker: 'A', target: 'Muchas gracias por su ayuda.', meaning: 'Thank you very much for your help.' },
        { speaker: 'B', target: 'De nada, ¡buen viaje!', meaning: 'You\'re welcome, have a good trip!' }
      ]
    },
    {
      id: 'es-d-4',
      title: 'Shopping for Clothes',
      scenario: 'A customer looks for a winter jacket in a clothing store.',
      lines: [
        { speaker: 'A', target: 'Hola, buenas. Estoy buscando una chaqueta de invierno.', meaning: 'Hello. I\'m looking for a winter jacket.' },
        { speaker: 'B', target: 'Claro, tenemos varias tallas. ¿Qué talla necesita?', meaning: 'Of course, we have several sizes. What size do you need?' },
        { speaker: 'A', target: 'Necesito la talla mediana, por favor.', meaning: 'I need a medium size, please.' },
        { speaker: 'B', target: 'Aquí tiene. También tenemos esta en color azul.', meaning: 'Here you go. We also have this one in blue.' },
        { speaker: 'A', target: 'Me gusta el azul. ¿Cuánto cuesta?', meaning: 'I like the blue one. How much does it cost?' },
        { speaker: 'B', target: 'Cuesta cuarenta y cinco euros.', meaning: 'It costs forty-five euros.' },
        { speaker: 'A', target: 'Perfecto, me la llevo.', meaning: 'Perfect, I\'ll take it.' },
        { speaker: 'B', target: 'Muy bien, puede pagar en la caja.', meaning: 'Great, you can pay at the register.' }
      ]
    }
  ],
  listening: [
    { id: 'es-l-1', target: 'Me gusta el chocolate.', meaning: 'I like chocolate.', choices: ['I like chocolate.', 'I hate chocolate.', 'I want more coffee.', 'I don\'t like sweets.'], answerIndex: 0 },
    { id: 'es-l-2', target: '¿Dónde está el baño?', meaning: 'Where is the bathroom?', choices: ['Where is the kitchen?', 'Where is the bathroom?', 'What time is it?', 'How much does it cost?'], answerIndex: 1 },
    { id: 'es-l-3', target: 'Hace mucho frío en invierno.', meaning: 'It\'s very cold in winter.', choices: ['It\'s very hot in summer.', 'It rains a lot in spring.', 'It\'s very cold in winter.', 'It\'s windy today.'], answerIndex: 2 },
    { id: 'es-l-4', target: 'Mi hermano trabaja en un hospital.', meaning: 'My brother works at a hospital.', choices: ['My sister studies at a university.', 'My father works at a bank.', 'My brother lives near a hospital.', 'My brother works at a hospital.'], answerIndex: 3 },
    { id: 'es-l-5', target: '¿A qué hora empieza la película?', meaning: 'What time does the movie start?', choices: ['What time does the movie end?', 'Where is the movie theater?', 'What time does the movie start?', 'How much is the movie ticket?'], answerIndex: 2 },
    { id: 'es-l-6', target: 'Ella siempre llega temprano al trabajo.', meaning: 'She always arrives early to work.', choices: ['She always arrives late to work.', 'She never goes to work.', 'She works from home every day.', 'She always arrives early to work.'], answerIndex: 3 },
    { id: 'es-l-7', target: 'No puedo encontrar mis llaves.', meaning: 'I can\'t find my keys.', choices: ['I lost my wallet.', 'I can\'t find my keys.', 'I forgot my phone.', 'I can\'t open the door.'], answerIndex: 1 },
    { id: 'es-l-8', target: 'Vamos a celebrar su cumpleaños el sábado.', meaning: 'We are going to celebrate his birthday on Saturday.', choices: ['We celebrated her birthday last Sunday.', 'We are going to a wedding next month.', 'We are going to celebrate his birthday on Saturday.', 'We are planning a trip for summer.'], answerIndex: 2 },
    { id: 'es-l-9', target: 'El médico me recomendó descansar más.', meaning: 'The doctor recommended that I rest more.', choices: ['The doctor gave me some medicine.', 'The doctor recommended that I rest more.', 'The doctor asked me to exercise daily.', 'The doctor said I was very healthy.'], answerIndex: 1 },
    { id: 'es-l-10', target: 'Aunque llovía, decidimos salir a caminar.', meaning: 'Even though it was raining, we decided to go for a walk.', choices: ['Because it was raining, we stayed home.', 'Since it was sunny, we went to the beach.', 'Although it was cold, we went swimming.', 'Even though it was raining, we decided to go for a walk.'], answerIndex: 3 },
    { id: 'es-l-11', target: 'Si tuviera más tiempo, aprendería a tocar el piano.', meaning: 'If I had more time, I would learn to play the piano.', choices: ['If I have more time, I will travel abroad.', 'If I had more time, I would learn to play the piano.', 'When I have free time, I read books.', 'I don\'t have time to practice piano.'], answerIndex: 1 },
    { id: 'es-l-12', target: 'Es importante que terminemos el proyecto antes del viernes.', meaning: 'It\'s important that we finish the project before Friday.', choices: ['It\'s necessary that we start the project on Monday.', 'It\'s likely that the project will be delayed.', 'It\'s important that we finish the project before Friday.', 'We already finished the project last week.'], answerIndex: 2 }
  ]
};
