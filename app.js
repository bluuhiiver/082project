/* ============================================================
   LinguaMaster — 7개 언어 학습 앱
   순수 클라이언트 사이드(백엔드 없음), localStorage 기반 상태 저장
   ============================================================ */

const LANG_CODES = ['fr','en','es','zh','ko','ja','it'];
const STORAGE_KEY = 'lm_state_v1';
const NEW_CARDS_PER_SESSION = 10;

const LEVELS = [
  { id:'beginner', emoji:'🌱', name:'왕초보', desc:'알파벳/발음부터 차근차근 시작해요' },
  { id:'elementary', emoji:'🌿', name:'기초', desc:'인사말과 간단한 문장을 조금 알아요' },
  { id:'intermediate', emoji:'🌳', name:'중급', desc:'일상 대화가 어느 정도 가능해요' },
];

const MINUTES_OPTS = [
  { id:15, emoji:'⚡', name:'하루 15분', desc:'바쁜 일정 속에서 짧고 굵게' },
  { id:30, emoji:'⏱️', name:'하루 30분', desc:'꾸준한 습관 만들기 추천' },
  { id:60, emoji:'🔥', name:'하루 60분', desc:'빠른 실력 향상을 원해요' },
  { id:90, emoji:'🚀', name:'하루 90분+', desc:'집중적으로 마스터하고 싶어요' },
];

const GOALS = [
  { id:'travel', emoji:'✈️', name:'여행 회화', desc:'여행지에서 자유롭게 소통하고 싶어요' },
  { id:'business', emoji:'💼', name:'업무 · 비즈니스', desc:'업무 이메일과 미팅에 활용하고 싶어요' },
  { id:'exam', emoji:'📝', name:'시험 대비', desc:'자격증/시험 점수를 준비해요' },
  { id:'hobby', emoji:'🎬', name:'취미 · 문화', desc:'영화, 음악, 드라마를 원어로 즐기고 싶어요' },
];

const CATEGORY_KO = { greetings:'인사', numbers:'숫자', family:'가족', food:'음식', time:'시간/날짜', travel:'여행', verbs:'동사', adjectives:'형용사' };
const CATEGORY_ORDER = {
  travel:   ['greetings','numbers','travel','food','time','family','verbs','adjectives'],
  business: ['greetings','verbs','adjectives','numbers','time','family','food','travel'],
  exam:     ['greetings','numbers','family','food','time','travel','verbs','adjectives'],
  hobby:    ['greetings','food','family','adjectives','time','travel','numbers','verbs'],
};

const MISSION_TEMPLATES = [
  '오늘은 유튜브에서 {lang} 영상을 5분 이상 시청해보세요.',
  '좋아하는 노래를 {lang}로 찾아 가사를 따라 불러보세요.',
  'SNS에서 {lang} 사용 계정을 1개 팔로우해보세요.',
  '{lang} 팟캐스트를 10분 동안 들어보세요.',
  '오늘 배운 단어로 {lang} 일기를 3문장 써보세요.',
  '{lang}로 혼잣말을 하며 오늘 하루를 설명해보세요.',
  '스마트폰이나 앱의 언어 설정을 잠깐 {lang}로 바꿔보세요.',
];

const IMMERSION_TIPS = {
  fr: [
    { cat:'팟캐스트', name:'Coffee Break French', desc:'왕초보도 따라가기 쉬운 인기 프랑스어 학습 팟캐스트' },
    { cat:'유튜브', name:'Français Authentique', desc:'실생활 표현과 발음을 배우는 유튜브 채널' },
    { cat:'팟캐스트', name:'InnerFrench', desc:'중급자를 위한 프랑스어 몰입형 팟캐스트' },
    { cat:'영화·TV', name:'Extr@ French', desc:'학습자를 위해 만들어진 코미디 시트콤' },
    { cat:'앱/사이트', name:'TV5MONDE Apprendre le français', desc:'뉴스 영상으로 듣기 연습을 할 수 있는 무료 사이트' },
    { cat:'유튜브', name:'Easy French', desc:'파리 길거리 인터뷰로 실제 회화를 접할 수 있는 채널' },
  ],
  en: [
    { cat:'유튜브', name:'BBC Learning English', desc:'다양한 레벨의 영어 학습 영상과 뉴스' },
    { cat:'팟캐스트', name:"Luke's ENGLISH Podcast", desc:'자연스러운 영국식 영어 표현을 배우는 팟캐스트' },
    { cat:'유튜브', name:'English with Lucy', desc:'발음과 억양 교정에 특화된 인기 채널' },
    { cat:'영화·TV', name:'Friends', desc:'일상 회화 표현이 풍부한 시트콤의 정석' },
    { cat:'팟캐스트', name:'VOA Learning English', desc:'천천히 또박또박 말해주는 뉴스 팟캐스트' },
    { cat:'기타', name:'TED Talks', desc:'다양한 주제의 자막 있는 스피치 영상' },
  ],
  es: [
    { cat:'유튜브', name:'Dreaming Spanish', desc:'자막 없이 몰입해서 듣는 코말입식 학습 채널' },
    { cat:'팟캐스트', name:'Notes in Spanish', desc:'스페인 원어민 부부가 진행하는 인기 팟캐스트' },
    { cat:'영화·TV', name:'Destinos', desc:'학습자를 위해 제작된 스페인어 학습 드라마' },
    { cat:'유튜브', name:'Easy Spanish', desc:'거리 인터뷰로 생생한 회화를 배우는 채널' },
    { cat:'기타', name:'News in Slow Spanish', desc:'천천히 진행되는 스페인어 뉴스 콘텐츠' },
    { cat:'앱/사이트', name:'SpanishPod101', desc:'레벨별 오디오 레슨을 제공하는 학습 사이트' },
  ],
  zh: [
    { cat:'팟캐스트', name:'ChinesePod', desc:'레벨별로 나뉜 인기 중국어 학습 팟캐스트' },
    { cat:'유튜브', name:'Mandarin Corner', desc:'실생활 인터뷰 기반의 중국어 학습 채널' },
    { cat:'유튜브', name:'Yoyo Chinese', desc:'문법 설명이 체계적인 인기 중국어 강의 채널' },
    { cat:'앱/사이트', name:'HelloChinese', desc:'게임처럼 즐기는 중국어 학습 앱' },
    { cat:'팟캐스트', name:'Slow Chinese Podcast', desc:'천천히 말해주는 중국어 듣기 연습 콘텐츠' },
    { cat:'영화·TV', name:'小猪佩奇 (Peppa Pig 중국어 더빙판)', desc:'쉬운 문장으로 듣기 연습하기 좋은 애니메이션' },
  ],
  ko: [
    { cat:'팟캐스트', name:'Talk To Me In Korean', desc:'체계적인 커리큘럼의 대표 한국어 학습 팟캐스트' },
    { cat:'유튜브', name:'Korean Unnie', desc:'실생활 표현과 문화를 함께 배우는 채널' },
    { cat:'앱/사이트', name:'90 Day Korean', desc:'단계별 학습 자료를 제공하는 사이트' },
    { cat:'영화·TV', name:'한국 드라마 (자막 시청)', desc:'좋아하는 드라마로 자연스럽게 듣기 연습하기' },
    { cat:'유튜브', name:'Billy Go (Korean Bros)', desc:'실용적인 표현 위주의 학습 채널' },
    { cat:'팟캐스트', name:'Sweet and Simple Korean', desc:'친근한 대화체로 진행되는 초급자용 팟캐스트' },
  ],
  ja: [
    { cat:'뉴스', name:'NHK やさしい日本語', desc:'쉬운 표현으로 다시 쓴 일본어 뉴스(Easy Japanese News)' },
    { cat:'팟캐스트', name:'Nihongo con Teppei', desc:'천천히 말해주는 인기 일본어 팟캐스트' },
    { cat:'유튜브', name:'Comprehensible Japanese', desc:'그림과 함께 몰입식으로 배우는 채널' },
    { cat:'앱/사이트', name:'JapanesePod101', desc:'레벨별 오디오 레슨을 제공하는 학습 사이트' },
    { cat:'영화·TV', name:'테라스 하우스 (Terrace House)', desc:'일상 회화를 자연스럽게 접할 수 있는 리얼리티쇼' },
    { cat:'기타', name:"Erin's Challenge (일본 국제교류기금)", desc:'국제교류기금이 만든 무료 학습 콘텐츠' },
  ],
  it: [
    { cat:'팟캐스트', name:'Coffee Break Italian', desc:'왕초보에게 인기 있는 이탈리아어 학습 팟캐스트' },
    { cat:'유튜브', name:'Podcast Italiano', desc:'또박또박한 발음으로 설명하는 인기 채널' },
    { cat:'유튜브', name:'Learn Italian with Lucrezia', desc:'실생활 표현과 문화를 함께 배우는 채널' },
    { cat:'앱/사이트', name:'ItalianPod101', desc:'레벨별 오디오 레슨을 제공하는 학습 사이트' },
    { cat:'기타', name:'Easy Italian', desc:'거리 인터뷰로 실제 이탈리아어를 접하는 콘텐츠' },
    { cat:'앱/사이트', name:'RaiPlay', desc:'이탈리아 공영방송의 다양한 콘텐츠 스트리밍' },
  ],
};

/* ---------------- state ---------------- */
let state = null;
let ui = { view:'home', ob:{}, vocabTab:'review', vocabQueue:null, vocabIndex:0, vocabFlipped:false,
  grammarIndex:null, grammarAttempted:{}, practiceTab:'speak', dialogueState:null, shadowItem:null,
  listenQuiz:null, progressTab:'stats', quiz:null };

function defaultState(){
  return { profile:{ languages:{}, activeLang:null }, srs:{}, progress:{} };
}
function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed);
  }catch(e){ return defaultState(); }
}
function saveState(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){ /* storage full/unavailable */ }
}
function ensureLangBuckets(lang){
  if(!state.srs[lang]) state.srs[lang] = {};
  if(!state.progress[lang]) state.progress[lang] = {
    studyMinutes:0, streak:{count:0,last:null}, grammarDone:[], vocabQuizzes:[],
    listening:[], weeklyTests:[], speakingSessions:0, shadowCount:0, dailyPlans:{}, immersionDone:{}
  };
}

/* ---------------- utils ---------------- */
function todayStr(){
  const d = new Date();
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function addDaysStr(days){
  const d = new Date();
  d.setDate(d.getDate()+days);
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}
function dayOfYear(){
  const d = new Date();
  const start = new Date(d.getFullYear(),0,0);
  return Math.floor((d - start) / 86400000);
}
function daysAgoStr(n){ return addDaysStr(-n); }
function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
function sample(arr, n){ return shuffle(arr).slice(0, n); }
function clamp(v,min,max){ return Math.max(min, Math.min(max, v)); }
function langData(code){ return (window.LL_DATA && window.LL_DATA[code]) || null; }
function activeLangData(){ return langData(state.profile.activeLang); }
function toast(msg){
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(()=> el.classList.remove('show'), 2200);
}
function levenshtein(a,b){
  const m=a.length,n=b.length;
  const dp = Array.from({length:m+1},()=>new Array(n+1).fill(0));
  for(let i=0;i<=m;i++) dp[i][0]=i;
  for(let j=0;j<=n;j++) dp[0][j]=j;
  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      dp[i][j] = a[i-1]===b[j-1] ? dp[i-1][j-1] : 1+Math.min(dp[i-1][j-1],dp[i-1][j],dp[i][j-1]);
    }
  }
  return dp[m][n];
}
function normText(s){ return String(s||'').toLowerCase().replace(/[.,!?¿¡、。！？…"'’“”·]/g,'').replace(/\s+/g,' ').trim(); }
function similarity(a,b){
  const na=normText(a), nb=normText(b);
  if(!na.length && !nb.length) return 100;
  const dist = levenshtein(na,nb);
  const maxLen = Math.max(na.length, nb.length, 1);
  return clamp(Math.round((1-dist/maxLen)*100), 0, 100);
}
function speak(text, lang){
  if(!('speechSynthesis' in window)){ toast('이 브라우저는 음성 재생을 지원하지 않아요'); return; }
  try{
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang || 'en-US';
    u.rate = 0.92;
    window.speechSynthesis.speak(u);
  }catch(e){ console.warn('TTS error', e); }
}
function supportsSTT(){ return !!(window.SpeechRecognition || window.webkitSpeechRecognition); }
function recognizeSpeech(lang, onResult, onError){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR){ onError('unsupported'); return; }
  try{
    const rec = new SR();
    rec.lang = lang; rec.maxAlternatives = 1; rec.interimResults = false;
    rec.onresult = e => { try{ onResult(e.results[0][0].transcript); }catch(err){ onError('parse'); } };
    rec.onerror = e => onError(e.error || 'error');
    rec.start();
  }catch(e){ onError(e.message || 'error'); }
}
function ringSVG(percent, color){
  const r=36, c=2*Math.PI*r;
  const pct = clamp(percent,0,100);
  const off = c*(1-pct/100);
  return `<svg width="84" height="84" viewBox="0 0 84 84">
    <circle cx="42" cy="42" r="${r}" stroke="#E4E4E7" stroke-width="8" fill="none"/>
    <circle cx="42" cy="42" r="${r}" stroke="${color}" stroke-width="8" fill="none" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" stroke-linecap="round"/>
  </svg>`;
}

/* ---------------- SRS ---------------- */
function reviewCard(lang, id, rating){
  ensureLangBuckets(lang);
  const srs = state.srs[lang];
  let c = srs[id] || { ease:2.5, interval:0, reps:0, due:todayStr() };
  if(rating===0){
    c.reps = 0; c.interval = 0; c.ease = Math.max(1.3, c.ease-0.2); c.due = todayStr();
  }else{
    c.reps += 1;
    if(c.reps===1) c.interval = rating===1 ? 1 : (rating===2 ? 2 : 4);
    else if(c.reps===2) c.interval = rating===1 ? Math.round(c.interval*1.2) : Math.round(c.interval*c.ease);
    else c.interval = Math.round(c.interval * c.ease * (rating===1?0.8:rating===3?1.3:1));
    c.interval = Math.max(1, c.interval);
    c.ease = clamp(c.ease + (rating===1?-0.15:rating===3?0.15:0), 1.3, 3.0);
    c.due = addDaysStr(c.interval);
  }
  srs[id] = c;
  saveState();
}
function getReviewQueue(lang){
  const data = langData(lang); if(!data) return [];
  const srs = state.srs[lang] || {};
  const today = todayStr();
  const due = data.vocab.filter(v => srs[v.id] && srs[v.id].due <= today).map(v=>v.id);
  let queue = due;
  if(queue.length < NEW_CARDS_PER_SESSION){
    const unseen = data.vocab.filter(v => !srs[v.id]).map(v=>v.id);
    queue = queue.concat(unseen.slice(0, NEW_CARDS_PER_SESSION - queue.length));
  }
  return queue;
}
function vocabStats(lang){
  const data = langData(lang); if(!data) return {mastered:0,total:0,seen:0,due:0};
  const srs = state.srs[lang] || {};
  const total = data.vocab.length;
  const seenIds = Object.keys(srs);
  const mastered = seenIds.filter(id => srs[id].interval >= 21).length;
  const due = getReviewQueue(lang).length;
  return { mastered, total, seen: seenIds.length, due };
}

/* ---------------- roadmap & daily plan ---------------- */
function generateRoadmap(lang, goal){
  const data = langData(lang); if(!data) return [];
  const catOrder = CATEGORY_ORDER[goal] || CATEGORY_ORDER.exam;
  const weeks = [];
  for(let i=0;i<8;i++){
    weeks.push({ week: i+1, theme: `${CATEGORY_KO[catOrder[i]]} & ${data.grammar[i] ? data.grammar[i].title : ''}`,
      focus: `단어: ${CATEGORY_KO[catOrder[i]]} 10개 · 문법: ${data.grammar[i] ? data.grammar[i].title : '복습'}` });
  }
  weeks.push({ week:9, theme:'말하기 & 듣기 집중 주간', focus:'대화문 4개 롤플레이 + 듣기 연습 집중' });
  weeks.push({ week:10, theme:'복습 & 약점 보완', focus:'틀렸던 단어 · 문법 다시 복습하기' });
  weeks.push({ week:11, theme:'실전 회화 종합 연습', focus:'몰입 콘텐츠 + 실전 대화 연습' });
  weeks.push({ week:12, theme:'종합 평가 & 다음 단계 설계', focus:'주간 테스트로 3개월 성과 확인하기' });
  return weeks;
}
function buildDailyPlanTasks(minutes){
  if(minutes===15) return [
    { id:'warmup', label:'말하기 워밍업 (쉐도잉)', min:3 },
    { id:'vocab', label:'단어 복습', min:6 },
    { id:'grammar', label:'문법 학습', min:3 },
    { id:'listening', label:'듣기 연습', min:3 },
  ];
  if(minutes===60) return [
    { id:'warmup', label:'말하기 워밍업 (쉐도잉)', min:10 },
    { id:'vocab', label:'단어 복습', min:20 },
    { id:'grammar', label:'문법 학습', min:10 },
    { id:'listening', label:'듣기 연습', min:10 },
    { id:'roleplay', label:'실전 회화 연습', min:10 },
  ];
  if(minutes===90) return [
    { id:'warmup', label:'말하기 워밍업 (쉐도잉)', min:15 },
    { id:'vocab', label:'단어 복습', min:25 },
    { id:'grammar', label:'문법 학습', min:15 },
    { id:'listening', label:'듣기 연습', min:15 },
    { id:'roleplay', label:'실전 회화 연습', min:20 },
  ];
  return [
    { id:'warmup', label:'말하기 워밍업 (쉐도잉)', min:5 },
    { id:'vocab', label:'단어 복습', min:10 },
    { id:'grammar', label:'문법 학습', min:5 },
    { id:'listening', label:'듣기 연습', min:5 },
    { id:'roleplay', label:'실전 회화 연습', min:5 },
  ];
}
function getTodayPlan(lang){
  ensureLangBuckets(lang);
  const prog = state.progress[lang];
  const t = todayStr();
  if(!prog.dailyPlans[t]){
    const prof = state.profile.languages[lang];
    const tasks = buildDailyPlanTasks(prof ? prof.dailyMinutes : 30).map(x => Object.assign({done:false}, x));
    prog.dailyPlans[t] = { tasks };
    saveState();
  }
  return prog.dailyPlans[t];
}
function updateStreakOnComplete(lang){
  const prog = state.progress[lang];
  const t = todayStr();
  const y = daysAgoStr(1);
  if(prog.streak.last === t) return;
  if(prog.streak.last === y) prog.streak.count += 1;
  else prog.streak.count = 1;
  prog.streak.last = t;
}

/* ---------------- weekly summary ---------------- */
function buildWeeklySummary(lang){
  const prog = state.progress[lang];
  const cutoff1 = daysAgoStr(7), cutoff2 = daysAgoStr(14);
  const thisWeek = prog.listening.filter(x => x.date >= cutoff1);
  const lastWeek = prog.listening.filter(x => x.date < cutoff1 && x.date >= cutoff2);
  const avg = arr => arr.length ? Math.round(arr.reduce((s,x)=>s+x.score/x.total*100,0)/arr.length) : null;
  const avgThis = avg(thisWeek), avgLast = avg(lastWeek);
  const lines = [];
  if(avgThis===null){
    lines.push('아직 이번 주 학습 데이터가 충분하지 않아요. 듣기 퀴즈와 단어 복습을 꾸준히 해보면 다음 주에 더 자세한 분석을 보여드릴게요.');
  }else if(avgLast===null){
    lines.push(`이번 주 듣기 정확도는 평균 ${avgThis}%예요. 계속 이 페이스를 유지해보세요!`);
  }else{
    const diff = avgThis - avgLast;
    if(diff > 0) lines.push(`듣기 정확도가 지난주보다 ${diff}%p 향상됐어요! 꾸준한 연습이 효과를 보이고 있어요.`);
    else if(diff < 0) lines.push(`듣기 정확도가 지난주보다 ${Math.abs(diff)}%p 낮아졌어요. 듣기 연습 시간을 조금 늘려보는 건 어떨까요?`);
    else lines.push('듣기 정확도가 지난주와 비슷하게 유지되고 있어요.');
  }
  if(prog.speakingSessions > 0) lines.push(`지금까지 말하기 연습을 ${prog.speakingSessions}회 진행했어요.`);
  else lines.push('아직 말하기 연습 기록이 없어요. 회화 탭에서 대화문 연습을 시작해보세요.');
  const vstats = vocabStats(lang);
  lines.push(`현재 단어 ${vstats.seen}/${vstats.total}개를 학습했고, 그중 ${vstats.mastered}개를 완전히 암기했어요.`);
  return lines.join(' ');
}

/* ---------------- quiz engine (generic) ---------------- */
function buildVocabQuestions(lang, n){
  const data = langData(lang);
  const pool = data.vocab;
  const picked = sample(pool, Math.min(n, pool.length));
  return picked.map(w => {
    const distractors = sample(pool.filter(x=>x.id!==w.id), 3).map(x=>x.meaning);
    const choices = shuffle([w.meaning, ...distractors]);
    return { kind:'vocab', word:w.word, pron:w.pron, ttsLang:data.ttsLang, choices, answerIndex: choices.indexOf(w.meaning) };
  });
}
function buildListeningQuestions(lang, n){
  const data = langData(lang);
  const picked = sample(data.listening, Math.min(n, data.listening.length));
  return picked.map(item => {
    const correct = item.meaning;
    const choices = shuffle(item.choices.slice());
    return { kind:'listening', target:item.target, ttsLang:data.ttsLang, choices, answerIndex: choices.indexOf(correct) };
  });
}
function buildGrammarQuestions(lang, n){
  const data = langData(lang);
  const picked = sample(data.grammar, Math.min(n, data.grammar.length));
  return picked.map(g => {
    const ex = g.exercises[Math.floor(Math.random()*g.exercises.length)];
    if(ex.type==='mcq') return { kind:'grammar-mcq', prompt:ex.prompt, choices:ex.choices, answerIndex:ex.answerIndex };
    return { kind:'grammar-fill', prompt:ex.prompt, answer:ex.answer, hint:ex.hint };
  });
}

function startQuiz(title, questions, onFinish){
  ui.quiz = { title, questions, index:0, score:0, onFinish, answered:false };
}
function currentQuizContentId(){
  return ui.view + '-quiz';
}

/* ============================================================
   RENDERING
   ============================================================ */
function showView(view){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  const el = document.getElementById('view-'+view);
  if(el) el.classList.add('active');
  ui.view = view;
}
function navBtns(active){
  const items = [
    { id:'home', ic:'🏠', lbl:'홈' },
    { id:'vocab', ic:'🗂️', lbl:'단어' },
    { id:'grammar', ic:'📘', lbl:'문법' },
    { id:'practice', ic:'🎤', lbl:'회화' },
    { id:'progress', ic:'📊', lbl:'진도' },
  ];
  return items.map(it => `<button class="nav-btn ${it.id===active?'active':''}" onclick="App.nav('${it.id}')">
    <span class="nav-ic">${it.ic}</span><span class="nav-lbl">${it.lbl}</span></button>`).join('');
}
function renderAllNavs(active){
  ['bottom-nav','bottom-nav-2','bottom-nav-3','bottom-nav-4','bottom-nav-5'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.innerHTML = navBtns(active);
  });
}
function langPillHTML(){
  const d = activeLangData();
  if(!d) return '';
  return `<button class="lang-pill" onclick="App.openLangSheet()"><span>${d.flag}</span><span>${d.name}</span><span>▾</span></button>`;
}

/* ---- ONBOARDING ---- */
function renderOnboardProgress(){
  const total = 5;
  const bars = [];
  for(let i=0;i<total;i++) bars.push(`<div class="ob-bar ${i<=ui.ob.step?'done':''}"></div>`);
  document.getElementById('ob-progress').innerHTML = bars.join('');
}
function renderOnboard(){
  renderOnboardProgress();
  const c = document.getElementById('ob-content');
  const step = ui.ob.step;
  let body = '';
  if(step===0){
    body = `<div class="ob-tag">STEP 1 / 5</div>
      <div class="ob-title">어떤 언어를 배우고 싶으신가요?</div>
      <div class="ob-sub">3개월 안에 자연스럽게 회화할 수 있도록 완전한 학습 시스템을 설계해드릴게요.</div>
      <div class="lang-grid">${LANG_CODES.map(code=>{
        const d = langData(code); if(!d) return '';
        return `<button class="lang-card ${ui.ob.selLang===code?'sel':''}" onclick="App.obPick('selLang','${code}')">
          <span class="lang-flag">${d.flag}</span><div class="lang-name">${d.name}</div><div class="lang-native">${d.nativeName}</div>
        </button>`;
      }).join('')}</div>`;
  }else if(step===1){
    body = `<div class="ob-tag">STEP 2 / 5</div>
      <div class="ob-title">현재 실력은 어느 정도인가요?</div>
      <div class="ob-sub">현재 실력을 분석해서 딱 맞는 학습 시스템을 만들어드려요.</div>
      <div class="opt-list">${LEVELS.map(l=>`<button class="opt-card ${ui.ob.selLevel===l.id?'sel':''}" onclick="App.obPick('selLevel','${l.id}')">
        <span class="opt-emoji">${l.emoji}</span><div><div class="opt-name">${l.name}</div><div class="opt-desc">${l.desc}</div></div>
      </button>`).join('')}</div>`;
  }else if(step===2){
    body = `<div class="ob-tag">STEP 3 / 5</div>
      <div class="ob-title">하루에 얼마나 학습할 수 있나요?</div>
      <div class="ob-sub">현실적으로 지속 가능한 일일 학습 계획을 세워드릴게요.</div>
      <div class="opt-list">${MINUTES_OPTS.map(m=>`<button class="opt-card ${ui.ob.selMinutes===m.id?'sel':''}" onclick="App.obPick('selMinutes',${m.id})">
        <span class="opt-emoji">${m.emoji}</span><div><div class="opt-name">${m.name}</div><div class="opt-desc">${m.desc}</div></div>
      </button>`).join('')}</div>`;
  }else if(step===3){
    body = `<div class="ob-tag">STEP 4 / 5</div>
      <div class="ob-title">학습 목표가 무엇인가요?</div>
      <div class="ob-sub">목표에 맞춰 학습 순서를 최적화해드릴게요.</div>
      <div class="opt-list">${GOALS.map(g=>`<button class="opt-card ${ui.ob.selGoal===g.id?'sel':''}" onclick="App.obPick('selGoal','${g.id}')">
        <span class="opt-emoji">${g.emoji}</span><div><div class="opt-name">${g.name}</div><div class="opt-desc">${g.desc}</div></div>
      </button>`).join('')}</div>`;
  }else if(step===4){
    const data = langData(ui.ob.selLang);
    const roadmap = generateRoadmap(ui.ob.selLang, ui.ob.selGoal);
    body = `<div class="ob-tag">STEP 5 / 5</div>
      <div class="ob-title">${data.flag} ${data.name} 12주 로드맵이 완성됐어요!</div>
      <div class="ob-sub">말하기·듣기·어휘·문법·발음·문화까지 모두 포함한 맞춤 학습 시스템이에요.</div>
      <div class="roadmap-list">${roadmap.map(w=>`<div class="roadmap-item">
        <div class="roadmap-wk">${w.week}주</div>
        <div><div class="roadmap-theme">${w.theme}</div><div class="roadmap-focus">${w.focus}</div></div>
      </div>`).join('')}</div>`;
  }
  c.innerHTML = body + `<div class="ob-footer">
    <button class="btn btn-primary" id="ob-next" onclick="App.obNext()">${step===4?'학습 시작하기 🚀':'다음'}</button>
    ${step>0?'<button class="btn btn-ghost" onclick="App.obPrev()">이전으로</button>':''}
  </div>`;
  updateObNextState();
}
function updateObNextState(){
  const btn = document.getElementById('ob-next');
  if(!btn) return;
  const step = ui.ob.step;
  const ok = step===0?!!ui.ob.selLang : step===1?!!ui.ob.selLevel : step===2?!!ui.ob.selMinutes : step===3?!!ui.ob.selGoal : true;
  btn.disabled = !ok;
}

/* ---- HOME ---- */
function renderHome(){
  renderAllNavs('home');
  const lang = state.profile.activeLang;
  ensureLangBuckets(lang);
  const data = langData(lang);
  const prof = state.profile.languages[lang];
  const prog = state.progress[lang];
  const plan = getTodayPlan(lang);
  const doneCount = plan.tasks.filter(t=>t.done).length;
  const pct = Math.round(doneCount/plan.tasks.length*100);
  const vstats = vocabStats(lang);

  const html = `
    <div class="top-hd">
      <div class="app-logo">Lingua<span>Master</span></div>
      ${langPillHTML()}
    </div>
    <div class="streak-card">
      <div><div class="streak-num">${prog.streak.count}일</div><div class="streak-lbl">연속 학습 streak</div></div>
      <div class="streak-emoji">🔥</div>
    </div>
    <div class="plan-card">
      <div class="plan-hd"><div class="plan-title">오늘의 학습 · ${data.flag} ${data.name}</div><div class="plan-count">${doneCount}/${plan.tasks.length}</div></div>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      ${plan.tasks.map((t,i)=>`<div class="plan-item ${t.done?'done':''}" onclick="App.goPlanItem('${t.id}')">
        <div class="plan-check" onclick="event.stopPropagation();App.togglePlanItem(${i})">${t.done?'✓':''}</div>
        <div class="plan-name">${t.label}</div><div class="plan-min">${t.min}분</div>
      </div>`).join('')}
    </div>
    <div class="stat-row">
      <div class="stat-box"><div class="stat-num">${vstats.seen}/${vstats.total}</div><div class="stat-lbl">학습한 단어</div></div>
      <div class="stat-box"><div class="stat-num">${prog.grammarDone.length}/${data.grammar.length}</div><div class="stat-lbl">완료한 문법</div></div>
      <div class="stat-box"><div class="stat-num">${prof ? prof.dailyMinutes : 0}분</div><div class="stat-lbl">일일 목표</div></div>
    </div>
    <div class="section-title">학습 모듈</div>
    <div class="mod-grid">
      <button class="mod-card" onclick="App.nav('vocab')"><span class="mod-icon">🗂️</span><div class="mod-name">단어 학습</div><div class="mod-desc">간격 반복으로 핵심 어휘 암기</div></button>
      <button class="mod-card" onclick="App.nav('grammar')"><span class="mod-icon">📘</span><div class="mod-name">문법 마스터</div><div class="mod-desc">실전 패턴 중심 문법 학습</div></button>
      <button class="mod-card" onclick="App.openPractice('speak')"><span class="mod-icon">🎤</span><div class="mod-name">말하기 연습</div><div class="mod-desc">쉐도잉 & 롤플레이 대화</div></button>
      <button class="mod-card" onclick="App.openPractice('listen')"><span class="mod-icon">🎧</span><div class="mod-name">듣기 연습</div><div class="mod-desc">실전 리스닝 퀴즈</div></button>
      <button class="mod-card" onclick="App.openProgress('immersion')"><span class="mod-icon">🌏</span><div class="mod-name">몰입 환경</div><div class="mod-desc">콘텐츠 추천 & 오늘의 미션</div></button>
      <button class="mod-card" onclick="App.openProgress('stats')"><span class="mod-icon">📊</span><div class="mod-name">나의 진도</div><div class="mod-desc">학습 데이터 & 주간 테스트</div></button>
    </div>
    <button class="add-lang-btn" onclick="App.startAddLanguage()">+ 다른 언어 추가하기</button>
  `;
  document.getElementById('home-content').innerHTML = html;
}

/* ---- VOCAB ---- */
function renderVocab(){
  renderAllNavs('vocab');
  const lang = state.profile.activeLang;
  const data = langData(lang);
  const tabs = [{id:'review',lbl:'복습'},{id:'browse',lbl:'전체 보기'},{id:'quiz',lbl:'퀴즈'}];
  let inner = '';
  if(ui.vocabTab==='review') inner = renderVocabReview(lang, data);
  else if(ui.vocabTab==='browse') inner = renderVocabBrowse(lang, data);
  else inner = renderVocabQuiz(lang, data);

  document.getElementById('vocab-content').innerHTML = `
    <div class="top-hd"><div class="page-title" style="padding:0;">단어 학습</div>${langPillHTML()}</div>
    <div class="tab-row">${tabs.map(t=>`<button class="t-tab ${ui.vocabTab===t.id?'active':''}" onclick="App.setVocabTab('${t.id}')">${t.lbl}</button>`).join('')}</div>
    ${inner}
  `;
}
function renderVocabReview(lang, data){
  if(ui.vocabQueue===null) ui.vocabQueue = getReviewQueue(lang);
  const queue = ui.vocabQueue;
  if(queue.length===0){
    return `<div class="empty-state"><div class="empty-emoji">🎉</div><div class="empty-msg">오늘 복습할 단어를 모두 마쳤어요!</div>
      <button class="btn btn-outline" onclick="App.setVocabTab('browse')">단어 둘러보기</button></div>`;
  }
  if(ui.vocabIndex >= queue.length){
    const reviewed = queue.length;
    ui.vocabQueue = null; ui.vocabIndex = 0;
    return `<div class="empty-state"><div class="empty-emoji">✅</div><div class="empty-msg">${reviewed}개의 단어를 복습했어요!</div>
      <button class="btn btn-primary" onclick="App.nav('home')">홈으로</button></div>`;
  }
  const word = data.vocab.find(v=>v.id===queue[ui.vocabIndex]);
  const flipped = ui.vocabFlipped;
  return `<div class="card-wrap">
    <div class="quiz-progress">${ui.vocabIndex+1} / ${queue.length}</div>
    <div class="flashcard" onclick="App.flipCard()">
      <div class="fc-cat">${CATEGORY_KO[word.category]||word.category}</div>
      <button class="icon-btn fc-tts" onclick="event.stopPropagation();App.playTTS('${jsStr(word.word)}','${data.ttsLang}')">🔊</button>
      <div class="fc-word">${word.word}</div>
      <div class="fc-pron">${word.pron}</div>
      ${flipped ? `
        <div class="fc-meaning">${word.meaning}</div>
        <div class="fc-example">${word.example}</div>
        <div class="fc-example-mean">${word.exampleMeaning}</div>
      ` : `<div class="fc-flip-hint">카드를 탭해서 뜻 보기</div>`}
    </div>
    ${flipped ? `<div class="rate-row">
      <button class="rate-btn rate-again" onclick="App.rateCard(0)">다시</button>
      <button class="rate-btn rate-hard" onclick="App.rateCard(1)">어려움</button>
      <button class="rate-btn rate-good" onclick="App.rateCard(2)">좋음</button>
      <button class="rate-btn rate-easy" onclick="App.rateCard(3)">쉬움</button>
    </div>` : ''}
  </div>`;
}
function renderVocabBrowse(lang, data){
  const cat = ui.vocabBrowseCat || 'greetings';
  const cats = Object.keys(CATEGORY_KO);
  const words = data.vocab.filter(v=>v.category===cat);
  return `<div class="chip-row">${cats.map(c=>`<button class="chip ${cat===c?'sel':''}" onclick="App.setBrowseCat('${c}')">${CATEGORY_KO[c]}</button>`).join('')}</div>
    ${words.map(w=>`<div class="list-item" onclick="App.playTTS('${jsStr(w.word)}','${data.ttsLang}')">
      <div class="list-badge">🔊</div>
      <div><div class="list-title">${w.word} <span style="color:var(--gray);font-weight:500;">· ${w.pron}</span></div><div class="list-sub">${w.meaning}</div></div>
    </div>`).join('')}`;
}
function renderVocabQuiz(lang, data){
  if(ui.quiz && ui.quiz.title==='vocab-quiz') return renderQuizUI();
  return `<div class="empty-state"><div class="empty-emoji">🧠</div><div class="empty-msg">단어 실력을 테스트해보세요</div>
    <button class="btn btn-primary" onclick="App.startVocabQuiz()">퀴즈 시작하기</button></div>`;
}

/* ---- GRAMMAR ---- */
function renderGrammar(){
  renderAllNavs('grammar');
  const lang = state.profile.activeLang;
  const data = langData(lang);
  const prog = state.progress[lang];
  if(ui.grammarIndex===null){
    document.getElementById('grammar-content').innerHTML = `
      <div class="top-hd"><div class="page-title" style="padding:0;">문법 마스터</div>${langPillHTML()}</div>
      <div class="page-sub">가장 자주 쓰이는 패턴 중심으로, 실전에서 바로 활용해보세요.</div>
      ${data.grammar.map((g,i)=>{
        const done = prog.grammarDone.includes(g.id);
        return `<div class="list-item" onclick="App.openGrammar(${i})">
          <div class="list-badge ${done?'done':''}">${done?'✓':i+1}</div>
          <div><div class="list-title">${g.title}</div><div class="list-sub">${g.pattern}</div></div>
          <div class="list-arrow">›</div>
        </div>`;
      }).join('')}
    `;
    return;
  }
  const g = data.grammar[ui.grammarIndex];
  const attempted = ui.grammarAttempted;
  const allAttempted = attempted[0] && attempted[1];
  document.getElementById('grammar-content').innerHTML = `
    <div class="top-hd"><button class="icon-btn" onclick="App.closeGrammar()">←</button>${langPillHTML()}</div>
    <div class="page-title" style="padding:12px 20px 0;">${g.title}</div>
    <div class="gram-explain">
      <div class="gram-pattern">${g.pattern}</div>
      <div class="gram-exp-text">${g.explanation}</div>
    </div>
    <div class="section-title" style="padding-top:0;">예문</div>
    ${g.examples.map(ex=>`<div class="gram-example">
      <div><div class="gram-ex-target">${ex.target}</div><div class="gram-ex-mean">${ex.meaning}</div></div>
      <button class="icon-btn" onclick="App.playTTS('${jsStr(ex.target)}','${data.ttsLang}')">🔊</button>
    </div>`).join('')}
    <div class="section-title" style="padding-top:0;">연습 문제</div>
    ${g.exercises.map((ex,i)=>renderExercise(ex,i)).join('')}
    <div style="padding:6px 20px 20px;">
      <button class="btn btn-primary" ${allAttempted?'':'disabled'} onclick="App.completeGrammar()">이 문법 포인트 완료하기</button>
    </div>
  `;
}
function renderExercise(ex, idx){
  const state_ = ui.grammarAttempted[idx];
  if(ex.type==='mcq'){
    return `<div class="exercise-box">
      <div class="exercise-label">문제 ${idx+1} · 객관식</div>
      <div class="exercise-prompt">${ex.prompt}</div>
      ${ex.choices.map((c,ci)=>{
        let cls='';
        if(state_){
          if(ci===ex.answerIndex) cls='correct';
          else if(ci===state_.picked) cls='wrong';
        }
        return `<button class="choice-btn ${cls}" ${state_?'disabled':''} onclick="App.answerExercise(${idx},${ci})">${c}</button>`;
      }).join('')}
      ${state_ ? `<div class="feedback-box ${state_.correct?'ok':'bad'}">${state_.correct?'정답이에요! 🎉':'아쉬워요. 정답은 강조 표시된 보기예요.'}</div>`:''}
    </div>`;
  }
  return `<div class="exercise-box">
    <div class="exercise-label">문제 ${idx+1} · 빈칸 채우기</div>
    <div class="exercise-prompt">${ex.prompt}</div>
    <input class="fill-input ${state_?(state_.correct?'correct':'wrong'):''}" id="fill-${idx}" placeholder="${ex.hint||'답을 입력하세요'}" ${state_?'disabled':''} value="${state_?escAttr(state_.picked):''}"/>
    ${state_ ? `<div class="feedback-box ${state_.correct?'ok':'bad'}">${state_.correct?'정답이에요! 🎉':'정답: '+ex.answer}</div>` : `<button class="btn btn-outline btn-sm" onclick="App.submitFill(${idx})">확인</button>`}
  </div>`;
}

/* ---- PRACTICE (speak + listen) ---- */
function renderPractice(){
  renderAllNavs('practice');
  const lang = state.profile.activeLang;
  const data = langData(lang);
  const inDialogue = ui.practiceTab==='speak' && ui.dialogueState && ui.dialogueState.role;
  if(inDialogue){
    // dialogue footer occupies the fixed bottom area — hide the nav bar to avoid overlap
    const navEl = document.getElementById('bottom-nav-4');
    if(navEl) navEl.innerHTML = '';
    document.getElementById('practice-content').innerHTML = renderSpeakTab(lang, data);
    return;
  }
  const tabs = [{id:'speak',lbl:'말하기'},{id:'listen',lbl:'듣기'}];
  let inner = ui.practiceTab==='speak' ? renderSpeakTab(lang,data) : renderListenTab(lang,data);
  document.getElementById('practice-content').innerHTML = `
    <div class="top-hd"><div class="page-title" style="padding:0;">회화 연습</div>${langPillHTML()}</div>
    <div class="tab-row">${tabs.map(t=>`<button class="t-tab ${ui.practiceTab===t.id?'active':''}" onclick="App.setPracticeTab('${t.id}')">${t.lbl}</button>`).join('')}</div>
    ${inner}
  `;
}
function pickShadowItem(lang, data){
  const pool = [];
  data.vocab.forEach(v => pool.push({ target:v.example, meaning:v.exampleMeaning }));
  return pool[Math.floor(Math.random()*pool.length)];
}
function renderSpeakTab(lang, data){
  if(ui.dialogueState) return renderDialoguePlayer(lang, data);
  if(!ui.shadowItem) ui.shadowItem = pickShadowItem(lang, data);
  const s = ui.shadowItem;
  const sttNote = supportsSTT() ? '' : '<div class="tip-desc" style="padding:0 0 8px;">※ 이 브라우저에서는 음성 인식이 지원되지 않아 자가 체크로 진행돼요.</div>';
  return `
    <div class="section-title" style="padding-top:6px;">쉐도잉 워밍업</div>
    <div class="quiz-wrap" style="padding-top:0;">
      <div class="quiz-prompt">
        <div class="quiz-target">${s.target}</div>
        <div class="fc-example-mean">${s.meaning}</div>
        <div style="display:flex;gap:8px;justify-content:center;margin-top:16px;">
          <button class="btn btn-outline btn-sm" onclick="App.playTTS('${jsStr(s.target)}','${data.ttsLang}')">🔊 듣기</button>
          <button class="btn btn-outline btn-sm" onclick="App.shadowAttempt()">🎙️ 따라 말하기</button>
        </div>
        <div id="shadow-result"></div>
      </div>
      ${sttNote}
      <button class="btn btn-ghost" onclick="App.nextShadow()">다음 문장 →</button>
    </div>
    <div class="section-title">대화문 롤플레이</div>
    ${data.dialogues.map((d,i)=>`<div class="list-item" onclick="App.pickDialogue(${i})">
      <div class="list-badge">💬</div>
      <div><div class="list-title">${d.title}</div><div class="list-sub">${d.scenario}</div></div>
      <div class="list-arrow">›</div>
    </div>`).join('')}
  `;
}
function renderDialoguePlayer(lang, data){
  const st = ui.dialogueState;
  const dlg = data.dialogues[st.dialogueId];
  if(st.role===null){
    return `<div class="section-title" style="padding-top:6px;">${dlg.title}</div>
      <div class="page-sub" style="padding-top:0;">${dlg.scenario}<br>연습할 역할을 선택하세요.</div>
      <div class="role-pick">
        <button class="btn btn-outline" onclick="App.chooseRole('A')">역할 A로 연습</button>
        <button class="btn btn-outline" onclick="App.chooseRole('B')">역할 B로 연습</button>
      </div>
      <button class="btn btn-ghost" onclick="App.exitDialogue()">← 목록으로</button>`;
  }
  if(st.lineIndex >= dlg.lines.length){
    const avgScore = st.scores.length ? Math.round(st.scores.reduce((a,b)=>a+b,0)/st.scores.length) : null;
    return `<div class="empty-state"><div class="empty-emoji">🏆</div><div class="empty-msg">대화문 연습을 완료했어요!</div>
      ${avgScore!==null ? `<div class="ob-sub">평균 발음 유사도: ${avgScore}점</div>` : ''}
      <button class="btn btn-primary" onclick="App.restartDialogue()">다시 연습하기</button>
      <div style="height:8px;"></div>
      <button class="btn btn-outline" onclick="App.exitDialogue()">목록으로</button>
    </div>`;
  }
  const visibleLines = dlg.lines.slice(0, st.lineIndex+1);
  const curLine = dlg.lines[st.lineIndex];
  const isMine = curLine.speaker === st.role;
  let bubbles = visibleLines.map((ln,i)=>{
    const mine = ln.speaker===st.role;
    const isCurrent = i===st.lineIndex;
    const reveal = !mine || (mine && (isCurrent ? ui.dialogueRevealed : true)) || !isCurrent;
    return `<div class="dline ${mine?'mine':'other'}">
      <div class="dline-target">${(mine && isCurrent && !ui.dialogueRevealed) ? '???' : ln.target}</div>
      <div class="dline-mean">${ln.meaning}</div>
      ${(isCurrent && st.scores[i]!==undefined) ? `<div class="speak-score ${st.scores[i]>=70?'good':st.scores[i]>=40?'mid':'low'}">발음 유사도 ${st.scores[i]}점</div>` : ''}
    </div>`;
  }).join('');
  let actionBar = '';
  if(!isMine){
    actionBar = `<button class="btn btn-outline btn-sm" onclick="App.playTTS('${jsStr(curLine.target)}','${data.ttsLang}')">🔊 듣기</button>
      <button class="btn btn-primary btn-sm" onclick="App.nextDialogueLine()">다음 →</button>`;
  }else{
    actionBar = `
      ${!ui.dialogueRevealed ? `<button class="btn btn-outline btn-sm" onclick="App.revealDialogueLine()">👀 대사 보기</button>` : `
        <button class="btn btn-outline btn-sm" onclick="App.playTTS('${jsStr(curLine.target)}','${data.ttsLang}')">🔊 듣기</button>
        ${supportsSTT() ? `<button class="btn btn-outline btn-sm" onclick="App.recordDialogueLine()">🎙️ 말해보기</button>` : `<button class="btn btn-outline btn-sm" onclick="App.selfCheckDialogueLine()">말했어요 ✓</button>`}
        <button class="btn btn-primary btn-sm" onclick="App.nextDialogueLine()">다음 →</button>
      `}
    `;
  }
  return `<div class="top-hd" style="padding-top:14px;"><button class="icon-btn" onclick="App.exitDialogue()">←</button>
      <div class="page-sub" style="padding:0;">${dlg.title} · 역할 ${st.role} (${st.lineIndex+1}/${dlg.lines.length})</div></div>
    <div class="dialogue-scroll">${bubbles}</div>
    <div class="dialogue-footer"><div style="display:flex;gap:8px;justify-content:center;">${actionBar}</div></div>`;
}
function renderListenTab(lang, data){
  if(ui.listenQuiz) return renderListenQuiz(lang, data);
  const prog = state.progress[lang];
  const last = prog.listening.slice(-3).reverse();
  return `<div class="empty-state">
      <div class="empty-emoji">🎧</div>
      <div class="empty-msg">문장을 듣고 알맞은 뜻을 골라보세요</div>
      <button class="btn btn-primary" onclick="App.startListenQuiz()">듣기 퀴즈 시작하기 (6문제)</button>
    </div>
    ${last.length? `<div class="section-title">최근 기록</div>${last.map(h=>`<div class="history-item"><span>${h.date}</span><span>${h.score}/${h.total}</span></div>`).join('')}`:''}`;
}
function renderListenQuiz(lang, data){
  const lq = ui.listenQuiz;
  if(lq.index >= lq.items.length){
    const score = lq.score, total = lq.items.length;
    return `<div class="quiz-result"><div class="quiz-score">${score}/${total}</div><div class="ob-sub">듣기 퀴즈 완료!</div>
      <button class="btn btn-primary" onclick="App.finishListenQuiz()">확인</button></div>`;
  }
  const item = lq.items[lq.index];
  return `<div class="quiz-wrap">
    <div class="quiz-progress">${lq.index+1} / ${lq.items.length}</div>
    <div class="quiz-prompt">
      <button class="icon-btn active" style="margin:0 auto;" onclick="App.playTTS('${jsStr(item.target)}','${data.ttsLang}')">🔊</button>
      <div class="ob-sub" style="margin-top:10px;">재생 버튼을 눌러 문장을 듣고, 알맞은 뜻을 고르세요</div>
      ${item.revealed ? `<div class="fc-example" style="margin-top:10px;">${item.target}</div>` : ''}
    </div>
    <div class="quiz-choices">${item.choices.map((c,ci)=>{
      let cls='';
      if(item.picked!==undefined){
        if(ci===item.answerIndex) cls='correct'; else if(ci===item.picked) cls='wrong';
      }
      return `<button class="choice-btn ${cls}" ${item.picked!==undefined?'disabled':''} onclick="App.answerListen(${ci})">${c}</button>`;
    }).join('')}</div>
    ${item.picked!==undefined ? `<div style="padding-top:14px;"><button class="btn btn-primary" onclick="App.nextListen()">다음</button></div>` : ''}
  </div>`;
}

/* ---- PROGRESS (stats / immersion / test) ---- */
function renderProgress(){
  renderAllNavs('progress');
  const lang = state.profile.activeLang;
  const data = langData(lang);
  const tabs = [{id:'stats',lbl:'내 진도'},{id:'immersion',lbl:'몰입 콘텐츠'},{id:'test',lbl:'주간 테스트'}];
  let inner = '';
  if(ui.progressTab==='stats') inner = renderStatsTab(lang,data);
  else if(ui.progressTab==='immersion') inner = renderImmersionTab(lang,data);
  else inner = renderTestTab(lang,data);
  document.getElementById('progress-content').innerHTML = `
    <div class="top-hd"><div class="page-title" style="padding:0;">나의 진도</div>${langPillHTML()}</div>
    <div class="tab-row">${tabs.map(t=>`<button class="t-tab ${ui.progressTab===t.id?'active':''}" onclick="App.setProgressTab('${t.id}')">${t.lbl}</button>`).join('')}</div>
    ${inner}
  `;
}
function renderStatsTab(lang, data){
  const prog = state.progress[lang];
  const vstats = vocabStats(lang);
  const listenAvg = prog.listening.length ? Math.round(prog.listening.reduce((s,x)=>s+x.score/x.total*100,0)/prog.listening.length) : 0;
  return `
    <div class="ring-row">
      <div class="ring-box">${ringSVG(vstats.total?vstats.mastered/vstats.total*100:0,'#4F46E5')}<div class="ring-lbl">암기 단어 ${vstats.mastered}/${vstats.total}</div></div>
      <div class="ring-box">${ringSVG(data.grammar.length?prog.grammarDone.length/data.grammar.length*100:0,'#0EA5A5')}<div class="ring-lbl">문법 ${prog.grammarDone.length}/${data.grammar.length}</div></div>
      <div class="ring-box">${ringSVG(listenAvg,'#059669')}<div class="ring-lbl">듣기 정확도 ${listenAvg}%</div></div>
    </div>
    <div class="stat-row" style="margin-top:0;">
      <div class="stat-box"><div class="stat-num">${prog.streak.count}</div><div class="stat-lbl">연속 학습일</div></div>
      <div class="stat-box"><div class="stat-num">${prog.studyMinutes}</div><div class="stat-lbl">총 학습 분</div></div>
      <div class="stat-box"><div class="stat-num">${prog.speakingSessions}</div><div class="stat-lbl">말하기 연습</div></div>
    </div>
    <div class="section-title">이번 주 요약</div>
    <div class="summary-card"><div class="summary-title">📈 AI 학습 코치의 진단</div><div class="summary-text">${buildWeeklySummary(lang)}</div></div>
    <div class="section-title">주간 테스트 기록</div>
    ${prog.weeklyTests.length ? prog.weeklyTests.slice(-5).reverse().map(h=>`<div class="history-item"><span>${h.date}</span><span>${h.score}/${h.total}</span></div>`).join('') : `<div class="page-sub">아직 주간 테스트 기록이 없어요.</div>`}
  `;
}
function renderImmersionTab(lang, data){
  const tips = IMMERSION_TIPS[lang] || [];
  const missionIdx = dayOfYear() % MISSION_TEMPLATES.length;
  const mission = MISSION_TEMPLATES[missionIdx].replace('{lang}', data.name);
  const prog = state.progress[lang];
  const done = !!prog.immersionDone[todayStr()];
  return `
    <div class="mission-card">
      <div class="mission-title">🎯 오늘의 몰입 미션</div>
      <div class="mission-text">${mission}</div>
      <button class="btn ${done?'btn-success':'btn-primary'}" style="width:auto;padding:10px 18px;" onclick="App.toggleMission()">${done?'완료했어요 ✓':'완료 체크하기'}</button>
    </div>
    <div class="section-title" style="padding-top:0;">추천 콘텐츠</div>
    ${tips.map(t=>`<div class="tip-card"><div class="tip-cat">${t.cat}</div><div class="tip-name">${t.name}</div><div class="tip-desc">${t.desc}</div></div>`).join('')}
  `;
}
function renderTestTab(lang, data){
  if(ui.quiz && ui.quiz.title==='weekly-test') return renderQuizUI();
  const prog = state.progress[lang];
  return `<div class="empty-state">
    <div class="empty-emoji">📝</div>
    <div class="empty-msg">단어 · 문법 · 듣기를 종합한 주간 테스트</div>
    <button class="btn btn-primary" onclick="App.startWeeklyTest()">주간 테스트 시작 (8문제)</button>
  </div>
  ${prog.weeklyTests.length ? `<div class="section-title">이전 기록</div>${prog.weeklyTests.slice(-5).reverse().map(h=>`<div class="history-item"><span>${h.date}</span><span>${h.score}/${h.total}</span></div>`).join('')}` : ''}`;
}

/* generic quiz renderer used by vocab-quiz & weekly-test */
function renderQuizUI(){
  const q = ui.quiz;
  const lang = state.profile.activeLang;
  const data = langData(lang);
  if(q.index >= q.questions.length){
    return `<div class="quiz-result"><div class="quiz-score">${q.score}/${q.questions.length}</div><div class="ob-sub">테스트 완료!</div>
      <button class="btn btn-primary" onclick="App.finishGenericQuiz()">확인</button></div>`;
  }
  const cur = q.questions[q.index];
  let promptHTML = '';
  if(cur.kind==='vocab') promptHTML = `<div class="quiz-target">${cur.word}</div><div class="fc-pron">${cur.pron}</div><button class="icon-btn" style="margin:8px auto 0;" onclick="App.playTTS('${jsStr(cur.word)}','${cur.ttsLang}')">🔊</button>`;
  else if(cur.kind==='listening') promptHTML = `<button class="icon-btn active" style="margin:0 auto;" onclick="App.playTTS('${jsStr(cur.target)}','${cur.ttsLang}')">🔊</button><div class="ob-sub" style="margin-top:10px;">문장을 듣고 알맞은 뜻을 고르세요</div>`;
  else promptHTML = `<div class="exercise-prompt" style="text-align:left;">${cur.prompt}</div>`;

  let answerHTML = '';
  if(cur.kind==='grammar-fill'){
    answerHTML = `<input class="fill-input ${cur.picked!==undefined?(cur.correct?'correct':'wrong'):''}" id="quiz-fill" ${cur.picked!==undefined?'disabled':''} value="${cur.picked!==undefined?escAttr(cur.picked):''}" placeholder="${cur.hint||'답을 입력하세요'}"/>
      ${cur.picked!==undefined ? `<div class="feedback-box ${cur.correct?'ok':'bad'}">${cur.correct?'정답이에요!':'정답: '+cur.answer}</div><button class="btn btn-primary" style="margin-top:10px;" onclick="App.nextGenericQuiz()">다음</button>` : `<button class="btn btn-outline btn-sm" onclick="App.answerQuizFill()">확인</button>`}`;
  }else{
    answerHTML = `<div class="quiz-choices">${cur.choices.map((c,ci)=>{
      let cls='';
      if(cur.picked!==undefined){ if(ci===cur.answerIndex) cls='correct'; else if(ci===cur.picked) cls='wrong'; }
      return `<button class="choice-btn ${cls}" ${cur.picked!==undefined?'disabled':''} onclick="App.answerQuizChoice(${ci})">${c}</button>`;
    }).join('')}</div>
    ${cur.picked!==undefined ? `<div style="padding-top:14px;"><button class="btn btn-primary" onclick="App.nextGenericQuiz()">다음</button></div>`:''}`;
  }
  return `<div class="quiz-wrap"><div class="quiz-progress">${q.index+1} / ${q.questions.length}</div>
    <div class="quiz-prompt">${promptHTML}</div>${answerHTML}</div>`;
}

/* ---- language sheet ---- */
function renderLangSheet(mode){
  const c = document.getElementById('sheet-content');
  if(mode==='switch'){
    const langs = Object.keys(state.profile.languages);
    c.innerHTML = `<div class="sheet-title">학습 언어 전환</div>
      ${langs.map(code=>{
        const d = langData(code);
        return `<div class="sheet-lang-item ${code===state.profile.activeLang?'active':''}" onclick="App.switchLang('${code}')">
          <span class="sheet-lang-flag">${d.flag}</span><span class="sheet-lang-name">${d.name}</span>${code===state.profile.activeLang?'✓':''}
        </div>`;
      }).join('')}
      <div style="height:8px;"></div>
      <button class="btn btn-outline" onclick="App.startAddLanguage()">+ 다른 언어 추가하기</button>`;
  }
}

/* ============================================================
   APP namespace — event handlers (referenced from inline onclick)
   ============================================================ */
const CONTENT_IDS = { home:'home-content', vocab:'vocab-content', grammar:'grammar-content', practice:'practice-content', progress:'progress-content' };
function clearInactiveContents(active){
  Object.keys(CONTENT_IDS).forEach(k=>{
    if(k!==active){ const el = document.getElementById(CONTENT_IDS[k]); if(el) el.innerHTML=''; }
  });
}

const App = {
  nav(view){
    document.getElementById('sheet-backdrop').classList.remove('open');
    clearInactiveContents(view);
    if(view==='vocab'){ ui.vocabQueue=null; ui.vocabIndex=0; ui.vocabFlipped=false; }
    if(view==='grammar'){ ui.grammarIndex=null; }
    if(view==='home') renderHome();
    else if(view==='vocab') renderVocab();
    else if(view==='grammar') renderGrammar();
    else if(view==='practice') renderPractice();
    else if(view==='progress') renderProgress();
    showView(view);
  },
  openPractice(tab){ ui.practiceTab = tab; this.nav('practice'); },
  openProgress(tab){ ui.progressTab = tab; this.nav('progress'); },

  /* onboarding */
  obPick(key, val){ ui.ob[key] = val; renderOnboard(); },
  obNext(){
    if(ui.ob.step < 4){ ui.ob.step++; renderOnboard(); return; }
    const lang = ui.ob.selLang;
    ensureLangBuckets(lang);
    state.profile.languages[lang] = { level: ui.ob.selLevel, dailyMinutes: ui.ob.selMinutes, goal: ui.ob.selGoal, startDate: todayStr(), roadmap: generateRoadmap(lang, ui.ob.selGoal) };
    state.profile.activeLang = lang;
    saveState();
    toast(`${langData(lang).name} 학습을 시작해요! 🎉`);
    App.nav('home');
  },
  obPrev(){ if(ui.ob.step>0){ ui.ob.step--; renderOnboard(); } },

  startAddLanguage(){
    document.getElementById('sheet-backdrop').classList.remove('open');
    ui.ob = { step:0, selLang:null, selLevel:null, selMinutes:null, selGoal:null };
    renderOnboard();
    showView('onboard');
  },

  openLangSheet(){ renderLangSheet('switch'); document.getElementById('sheet-backdrop').classList.add('open'); },
  closeSheet(e){ document.getElementById('sheet-backdrop').classList.remove('open'); },
  switchLang(code){
    state.profile.activeLang = code;
    saveState();
    document.getElementById('sheet-backdrop').classList.remove('open');
    App.nav(ui.view);
  },

  /* home plan */
  togglePlanItem(i){
    const lang = state.profile.activeLang;
    const plan = getTodayPlan(lang);
    const t = plan.tasks[i];
    t.done = !t.done;
    const prog = state.progress[lang];
    prog.studyMinutes += t.done ? t.min : -t.min;
    if(t.done) updateStreakOnComplete(lang);
    saveState();
    renderHome();
  },
  goPlanItem(taskId){
    if(taskId==='warmup'){ ui.practiceTab='speak'; ui.dialogueState=null; ui.shadowItem=null; App.nav('practice'); return; }
    if(taskId==='vocab'){ App.nav('vocab'); return; }
    if(taskId==='grammar'){ App.nav('grammar'); return; }
    if(taskId==='listening'){ ui.practiceTab='listen'; App.nav('practice'); return; }
    if(taskId==='roleplay'){ ui.practiceTab='speak'; ui.dialogueState=null; App.nav('practice'); return; }
  },

  /* vocab */
  setVocabTab(tab){ ui.vocabTab = tab; ui.quiz=null; renderVocab(); },
  setBrowseCat(cat){ ui.vocabBrowseCat = cat; renderVocab(); },
  flipCard(){ ui.vocabFlipped = !ui.vocabFlipped; renderVocab(); },
  playTTS(text, lang){ speak(text, lang); },
  rateCard(rating){
    const lang = state.profile.activeLang;
    const id = ui.vocabQueue[ui.vocabIndex];
    reviewCard(lang, id, rating);
    ui.vocabIndex++;
    ui.vocabFlipped = false;
    renderVocab();
  },
  startVocabQuiz(){
    const lang = state.profile.activeLang;
    const qs = buildVocabQuestions(lang, 10);
    startQuiz('vocab-quiz', qs, (score,total)=>{
      state.progress[lang].vocabQuizzes.push({date:todayStr(), score, total});
      saveState();
    });
    renderVocab();
  },

  /* grammar */
  openGrammar(i){ ui.grammarIndex = i; ui.grammarAttempted = {}; renderGrammar(); },
  closeGrammar(){ ui.grammarIndex = null; renderGrammar(); },
  answerExercise(idx, choiceIdx){
    const lang = state.profile.activeLang;
    const g = langData(lang).grammar[ui.grammarIndex];
    const ex = g.exercises[idx];
    ui.grammarAttempted[idx] = { picked: choiceIdx, correct: choiceIdx===ex.answerIndex };
    renderGrammar();
  },
  submitFill(idx){
    const lang = state.profile.activeLang;
    const g = langData(lang).grammar[ui.grammarIndex];
    const ex = g.exercises[idx];
    const val = document.getElementById('fill-'+idx).value;
    ui.grammarAttempted[idx] = { picked: val, correct: normText(val)===normText(ex.answer) };
    renderGrammar();
  },
  completeGrammar(){
    const lang = state.profile.activeLang;
    const g = langData(lang).grammar[ui.grammarIndex];
    const prog = state.progress[lang];
    if(!prog.grammarDone.includes(g.id)){ prog.grammarDone.push(g.id); prog.studyMinutes += 5; }
    saveState();
    toast('문법 포인트 완료! 🎓');
    ui.grammarIndex = null;
    renderGrammar();
  },

  /* practice: speak */
  setPracticeTab(tab){ ui.practiceTab = tab; renderPractice(); },
  nextShadow(){ ui.shadowItem = null; document.getElementById('shadow-result') && (document.getElementById('shadow-result').innerHTML=''); renderPractice(); },
  shadowAttempt(){
    const lang = state.profile.activeLang;
    const data = langData(lang);
    const target = ui.shadowItem.target;
    const resultEl = document.getElementById('shadow-result');
    if(!supportsSTT()){
      state.progress[lang].shadowCount++; saveState();
      if(resultEl) resultEl.innerHTML = `<div class="speak-score mid">음성 인식 미지원 · 연습 완료로 기록했어요</div>`;
      return;
    }
    if(resultEl) resultEl.innerHTML = `<div class="ob-sub">🎙️ 듣고 있어요...</div>`;
    recognizeSpeech(data.ttsLang, (transcript)=>{
      const score = similarity(transcript, target);
      state.progress[lang].shadowCount++; saveState();
      if(resultEl) resultEl.innerHTML = `<div class="speak-score ${score>=70?'good':score>=40?'mid':'low'}">발음 유사도 ${score}점</div>`;
    }, (err)=>{
      if(resultEl) resultEl.innerHTML = `<div class="speak-score low">음성 인식에 실패했어요 (${err}). 다시 시도해보세요.</div>`;
    });
  },
  pickDialogue(i){ ui.dialogueState = { dialogueId:i, role:null, lineIndex:0, scores:[] }; ui.dialogueRevealed=false; renderPractice(); },
  chooseRole(role){ ui.dialogueState.role = role; ui.dialogueRevealed=false; renderPractice(); },
  exitDialogue(){ ui.dialogueState = null; renderPractice(); },
  restartDialogue(){ const id = ui.dialogueState.dialogueId; ui.dialogueState = { dialogueId:id, role:null, lineIndex:0, scores:[] }; renderPractice(); },
  revealDialogueLine(){ ui.dialogueRevealed = true; renderPractice(); },
  nextDialogueLine(){
    const lang = state.profile.activeLang;
    ui.dialogueState.lineIndex++;
    ui.dialogueRevealed = false;
    if(ui.dialogueState.lineIndex >= langData(lang).dialogues[ui.dialogueState.dialogueId].lines.length){
      state.progress[lang].speakingSessions++;
      state.progress[lang].studyMinutes += 8;
      saveState();
    }
    renderPractice();
  },
  recordDialogueLine(){
    const lang = state.profile.activeLang;
    const data = langData(lang);
    const dlg = data.dialogues[ui.dialogueState.dialogueId];
    const line = dlg.lines[ui.dialogueState.lineIndex];
    toast('듣고 있어요... 🎙️');
    recognizeSpeech(data.ttsLang, (transcript)=>{
      const score = similarity(transcript, line.target);
      ui.dialogueState.scores[ui.dialogueState.lineIndex] = score;
      renderPractice();
    }, (err)=>{ toast('음성 인식 실패: '+err); });
  },
  selfCheckDialogueLine(){
    ui.dialogueState.scores[ui.dialogueState.lineIndex] = null;
    renderPractice();
  },

  /* practice: listen */
  startListenQuiz(){
    const lang = state.profile.activeLang;
    const qs = buildListeningQuestions(lang, 6);
    ui.listenQuiz = { items: qs, index:0, score:0 };
    renderPractice();
  },
  answerListen(ci){
    const lq = ui.listenQuiz;
    const item = lq.items[lq.index];
    item.picked = ci;
    if(ci===item.answerIndex) lq.score++;
    renderPractice();
  },
  nextListen(){
    ui.listenQuiz.index++;
    renderPractice();
  },
  finishListenQuiz(){
    const lang = state.profile.activeLang;
    const lq = ui.listenQuiz;
    state.progress[lang].listening.push({ date: todayStr(), score: lq.score, total: lq.items.length });
    state.progress[lang].studyMinutes += 5;
    saveState();
    ui.listenQuiz = null;
    renderPractice();
  },

  /* progress tabs */
  setProgressTab(tab){ ui.progressTab = tab; ui.quiz=null; renderProgress(); },
  toggleMission(){
    const lang = state.profile.activeLang;
    const prog = state.progress[lang];
    const t = todayStr();
    const wasDone = !!prog.immersionDone[t];
    prog.immersionDone[t] = !wasDone;
    prog.studyMinutes += wasDone ? -5 : 5;
    if(!wasDone) updateStreakOnComplete(lang);
    saveState();
    renderProgress();
  },
  startWeeklyTest(){
    const lang = state.profile.activeLang;
    const qs = shuffle([...buildVocabQuestions(lang,4), ...buildGrammarQuestions(lang,2), ...buildListeningQuestions(lang,2)]);
    startQuiz('weekly-test', qs, (score,total)=>{
      state.progress[lang].weeklyTests.push({date:todayStr(), score, total});
      state.progress[lang].studyMinutes += 10;
      saveState();
    });
    renderProgress();
  },

  /* generic quiz answering (vocab-quiz / weekly-test) */
  answerQuizChoice(ci){
    const q = ui.quiz;
    const cur = q.questions[q.index];
    cur.picked = ci;
    if(ci===cur.answerIndex){ cur.correct = true; q.score++; } else cur.correct = false;
    rerenderCurrentQuizHost();
  },
  answerQuizFill(){
    const q = ui.quiz;
    const cur = q.questions[q.index];
    const val = document.getElementById('quiz-fill').value;
    cur.picked = val;
    cur.correct = normText(val)===normText(cur.answer);
    if(cur.correct) q.score++;
    rerenderCurrentQuizHost();
  },
  nextGenericQuiz(){
    ui.quiz.index++;
    rerenderCurrentQuizHost();
  },
  finishGenericQuiz(){
    const q = ui.quiz;
    if(q.onFinish) q.onFinish(q.score, q.questions.length);
    toast(`결과: ${q.score}/${q.questions.length}`);
    ui.quiz = null;
    rerenderCurrentQuizHost();
  },
};

function rerenderCurrentQuizHost(){
  if(ui.view==='vocab') renderVocab();
  else if(ui.view==='progress') renderProgress();
}
function escAttr(s){ return String(s||'').replace(/'/g,"&#39;").replace(/"/g,'&quot;'); }
/* Safe for embedding as a single-quoted JS string literal inside a double-quoted HTML onclick attribute.
   escAttr's HTML-entity escaping is wrong here because inline event handler attributes are HTML-decoded
   BEFORE being parsed as JS, so &#39; turns back into a raw ' and breaks the JS string (e.g. "c'è", "l'ami"). */
function jsStr(s){
  return String(s||'')
    .replace(/\\/g,'\\\\')
    .replace(/'/g,"\\'")
    .replace(/"/g,'&quot;')
    .replace(/\n/g,' ').replace(/\r/g,' ');
}

/* ============================================================
   BOOT
   ============================================================ */
function boot(){
  state = loadState();
  if(!state.profile.activeLang || !Object.keys(state.profile.languages).length){
    ui.ob = { step:0, selLang:null, selLevel:null, selMinutes:null, selGoal:null };
    renderOnboard();
    showView('onboard');
  }else{
    ensureLangBuckets(state.profile.activeLang);
    renderHome();
    showView('home');
  }
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').catch(()=>{ /* offline support is best-effort */ });
  }
}
document.addEventListener('DOMContentLoaded', boot);
