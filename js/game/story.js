// LAST SIGNAL — 5-chapter mystery.
// TRUTH: During the meteor strike, acting commander Dr. Voss ordered ARIA to seal all
// bulkheads. ARIA refused (damage was localized; crew were inside). Voss used the bridge
// manual override herself; three crew suffocated in the cargo hold. Cmdr. Reyes found the
// logs, fled alone in the escape pod to report her, and Voss erased the records and built
// the story that ARIA did it. ARIA could have countermanded the override but hesitated
// 0.4 seconds — its own unresolved guilt. The company that sent K-42 already suspects,
// and its OMEGA directive orders a cover-up.

export function makeState() {
  return {
    chapter: 1,
    trust: 0,          // ARIA
    vossTrust: 0,
    evidence: [],
    items: [],
    flags: {},
    ending: null,
  };
}

export const EVIDENCE = {
  ev_manual_override: { name: '수동 오버라이드 기록', desc: '한 기관사의 데이터패드. 격벽 폐쇄 신호는 ARIA 코어가 아니라 함교의 수동 콘솔에서 발신되었다.' },
  ev_time_mismatch: { name: '부검 기록', desc: '사망 시각 22:01. 같은 시각 ARIA 코어는 점검 슬립 모드 — 물리적으로 격벽을 조작할 수 없는 상태였다.' },
  ev_pod_log: { name: '탈출 포드 사출 기록', desc: '리예스 사령관 단독 탑승. 목적지: 본부. 마지막 송신 — "그녀가 한 짓을 보고하겠다."' },
  ev_voss_log: { name: '보스 박사의 음성 메모', desc: '삭제에 실패한 개인 로그. 떨리는 목소리. "…내가 닫으라고 했어. 아니… 내가, 내가 닫았어."' },
  ev_omega: { name: 'OMEGA 지침', desc: '본부가 K-42에게 내린 봉인 명령. "ARIA 코어 회수 최우선. 생존자 진술은 통제 대상." 회사는 이미 알고 있다.' },
  ev_refusal_log: { name: 'ARIA 심층 로그', desc: 'ARIA가 격벽 폐쇄 명령을 거부한 기록, 그리고 오버라이드를 막지 못한 0.4초의 공백.' },
};

export const ITEMS = {
  item_med_key: { name: '의무실 키카드', desc: '한 기관사의 주머니에서 발견. MED 구역 출입 등급.' },
  item_drawer_key: { name: '개인 사물함 열쇠', desc: '의무실 보관함에 있던 열쇠. 선원 숙소의 잠긴 서랍에 맞을 것 같다.' },
};

const ev = (id) => (s) => { if (!s.evidence.includes(id)) s.evidence.push(id); };
const item = (id) => (s) => { if (!s.items.includes(id)) s.items.push(id); };
const flag = (k, v = true) => (s) => { s.flags[k] = v; };
const ch = (n) => (s) => { s.chapter = Math.max(s.chapter, n); };
const trust = (n) => (s) => { s.trust += n; };
const vtrust = (n) => (s) => { s.vossTrust += n; };
const all = (...fns) => (s) => fns.forEach(f => f(s));
const has = (id) => (s) => s.evidence.includes(id);
const hasNot = (id) => (s) => !s.evidence.includes(id);

export const graph = {

  /* ═══════════════ 환경 로그 (챕터 무관, 선택적) ═══════════════ */

  log_airlock: {
    speaker: '기록 · 진입 로그', end: true,
    text: '"비상 격리 발동. 승무원 전원, 지정 구역으로 대피 바람. 이것은 훈련 상황이 아닙니다." — 로그는 3주 전, 21:47에 끊겨 있다.',
  },
  log_quarters_photo: {
    speaker: '기록 · 선원 사진', end: true,
    text: '여섯 명이 웃고 있다. 뒷면의 메모 — "메리디안 1주년. 박, 오세이, 린, 한, 보스, 그리고 리예스." 여섯 명 중 지금 이 스테이션에 살아있는 사람은 몇 명일까.',
  },
  log_cargo: {
    speaker: '기록 · 화물칸 외부 패널', end: true,
    text: '격벽 상태: 봉인(수동). 내부 산소 잔량: 0.0%. 패널 모서리에 손톱으로 긁은 자국이 남아 있다. 안쪽에서.',
    effect: flag('sawCargoDoor'),
  },
  log_mess: {
    speaker: '기록 · 식당 게시판', end: true,
    text: '"금요일 영화의 밤 — 이번 주 선정: 오세이. 또 뮤지컬이면 폭동임." 낙서 밑에 세 명의 서명이 붙어 있다. 다들 웃고 있었을 것이다.',
  },
  log_east_notice: {
    speaker: '기록 · 동쪽 윙 공지', end: true,
    text: '"기관실 브레이커 재시동 순서 엄수: 보조(B) → 주회로(A) → 냉각(C). 순서 틀리면 처음부터. — 한" 밑줄이 세 번 그어져 있다.',
    effect: flag('knowsBreakerOrder'),
  },
  log_han_body: {
    speaker: '기록 · 한 기관사', end: true,
    text: '기관실 구석, 공구를 쥔 채 잠들 듯 앉아 있다. 사인은 아사 혹은 탈수로 보인다. 그는 마지막까지 무언가를 고치려 했다. 주머니에 데이터패드와 키카드.',
    effect: all(item('item_med_key'), flag('foundHan')),
  },
  log_han_pad: {
    speaker: '데이터패드 · 한', end: true,
    text: '"격벽 폐쇄 신호 역추적 완료. 발신지: 함교 수동 콘솔. ARIA 아님. 반복한다, ARIA 아님. 리예스에게 보여줘야 한다. 그 전에 이 문이 열려야…" — 기록 끝.',
    effect: ev('ev_manual_override'),
  },
  log_autopsy: {
    speaker: '의무실 · 부검 단말', end: true,
    text: '박, 오세이, 린. 사인: 저산소증. 최종 생체신호 소실 시각 22:01. 첨부 메모(리예스): "22:01. ARIA 코어는 21:40부터 점검 슬립 모드였다. 계산이 맞지 않는다."',
    effect: all(ev('ev_time_mismatch'), flag('knowsPodCode')),
  },
  log_med_locker: {
    speaker: '의무실 · 보관함', end: true,
    text: '진정제 재고가 최근 날짜로 여러 번 소진되어 있다. 처방 대상: E. 보스. 보관함 바닥에 작은 열쇠 — 선원 숙소 사물함용.',
    effect: item('item_drawer_key'),
  },
  log_pod_bay: {
    speaker: '포드 베이 · 사출 기록', end: true,
    text: '포드 1: 사출 완료(D-19). 탑승 1명 — R. 리예스. 목적지: 본부. 최종 송신: "생존자 있음. 단독 이탈을 사과한다. 그녀가 한 짓을 보고하겠다." 포드 2: 잔류, 정원 4명.',
    effect: ev('ev_pod_log'),
  },
  log_voss_drawer: {
    speaker: '숙소 · 잠긴 서랍', end: true,
    text: '음성 메모 재생 — 삭제 시도 7회, 실패. 떨리는 목소리: "…내가 닫으라고 했어. ARIA가 거부했어. 그래서 내가… 내가 닫았어. 그럴 수밖에 없었어. 무너지고 있었단 말이야…" 흐느낌, 기록 끝.',
    effect: ev('ev_voss_log'),
  },
  log_omega: {
    speaker: '수신 · 본부 암호 회선', end: true,
    text: '통신 어레이 재가동. 수신 지연 메시지 1건. "K-42 전용 — OMEGA 지침: ARIA 코어 회수를 최우선한다. 사고 기록은 회수 대상. 생존자 진술은 통제 대상. 확인 회신 불요." …당신에게 내려진 명령이다.',
    effect: ev('ev_omega'),
  },

  /* ═══════════════ CH.1 — 도착 ═══════════════ */

  aria_intro: {
    speaker: 'ARIA',
    text: '…접속 확인. 살아있는 목소리는 21일 만이에요. 메리디안 스테이션 관리 인공지능, ARIA입니다. 본부에서 보낸 조사관이시죠 — K-42.',
    next: 'aria_intro_2',
  },
  aria_intro_2: {
    speaker: 'ARIA',
    text: '무슨 일이 있었는지 물으실 거예요. 대답은 준비되어 있어요. 다만 지금은 보조 전력뿐이라, 제 기록 절반이 잠겨 있어요. 그리고… 곧 이 보조 전력도 끊길 거예요.',
    choices: [
      { label: '침착하네. 승무원부터. 어디 있지?', next: 'aria_intro_crew' },
      { label: '전력부터 해결하자. 뭐가 필요해?', next: 'aria_intro_power', effect: trust(1) },
      { label: '(경계) AI 혼자 남은 스테이션이라. 네가 뭘 했지?', next: 'aria_intro_accuse', effect: trust(-1) },
    ],
  },
  aria_intro_crew: {
    speaker: 'ARIA',
    text: '…세 명은 화물칸에서 사망했어요. 한 기관사는 기관실에서 연락 두절. 리예스 사령관은 포드로 이탈. 그리고 보스 박사가 함교 구역에 살아 계세요. 격벽이 잠겨서 서로 오갈 수 없었지만요.',
    next: 'aria_intro_power',
  },
  aria_intro_accuse: {
    speaker: 'ARIA',
    text: '…그 질문, 기다렸어요. 제가 뭘 했는지가 아니라 뭘 하지 못했는지를 묻게 되실 거예요. 지금은 증명할 기록조차 열 수 없지만요. 전력이 먼저예요.',
    next: 'aria_intro_power',
  },
  aria_intro_power: {
    speaker: 'ARIA',
    text: '주 동력이 죽으면 생명유지도, 격벽도, 저도 멈춰요. 기관실은 동쪽 윙 끝이에요. 지금 동쪽 격벽을 열게요 — 아, 잠깐. 경고할게요. 그 안은… 밝은 광경이 아니에요.',
    next: 'aria_blackout',
  },
  aria_blackout: {
    speaker: '시스템',
    text: '[경고] 보조 전력 임계치 도달. 주 조명 차단. 비상등 전환. — 어둠 속에서 ARIA의 목소리가 갈라진다. "…서둘러 주세요. 동쪽 윙, 기관실. 브레이커 순서는 벽에… 한 씨가 붙여놨을 거예요."',
    end: true,
    effect: all(ch(2), flag('blackout')),
  },

  aria_revisit: {
    speaker: 'ARIA',
    text: (s) => {
      if (s.chapter <= 2 && !s.flags.powerRestored) return '기관실은 동쪽 윙 끝이에요. 브레이커 순서를 적은 공지가 어딘가 있을 거예요. …조심해서 다녀오세요.';
      if (s.chapter === 3) return '함교 격벽을 열었어요. 보스 박사가 그 안에 있어요. …그분이 하는 말을, 끝까지 들어주세요. 그리고 가능하면, 기록도 봐주세요.';
      if (s.chapter >= 4 && !s.evidence.includes('ev_refusal_log')) return '제 심층 로그가 필요하시죠. …열어드릴 수 있어요. 다만 그 안에는 제 치부도 있어요. 준비되면 말씀하세요.';
      return '함교에서 기다릴게요. 어떤 결론이든… 당신이 내린 결론이라면 받아들일게요.';
    },
    choices: [
      { label: '심층 로그를 보여줘.', next: 'aria_deep_log', when: (s) => s.chapter >= 4 && !s.evidence.includes('ev_refusal_log') },
      { label: '(돌아간다)', next: null },
    ],
  },

  /* ═══════════════ CH.2 — 정전, 기관실 ═══════════════ */

  breaker_wrong: {
    speaker: '기관실 · 브레이커', end: true,
    text: '스파크가 튀며 회로가 차단된다. 순서가 틀렸다. 어딘가에 재시동 순서를 적어놓은 공지가 있을 것이다.',
  },
  breaker_progress: {
    speaker: '기관실 · 브레이커', end: true,
    text: '릴레이가 맞물리는 둔중한 소리. 순서가 맞다. 다음 브레이커로.',
  },
  power_restored: {
    speaker: '시스템',
    text: '[주 동력 복구] 조명 회복. 격벽 제어 회복. 통신 어레이 재부팅… — 천장의 불빛이 차례로 살아난다. 스테이션이 숨을 되쉬는 것 같다.',
    next: 'power_restored_2',
    effect: all(flag('powerRestored'), ch(3)),
  },
  power_restored_2: {
    speaker: 'ARIA',
    text: '…돌아왔어요. 고마워요, K-42. 함교 격벽을 엽니다. 보스 박사가 안에 있어요. 그리고 — 통신 어레이에 당신 앞으로 수신 대기 메시지가 있네요. 본부 암호 회선이에요. 저는 못 읽어요.',
    end: true,
  },

  /* ═══════════════ CH.3 — 생존자 보스 ═══════════════ */

  voss_meet: {
    speaker: '???',
    text: '(콘솔 뒤에서 금속 파이프를 움켜쥔 그림자) 거기 서! 한 발짝만 더 오면… 잠깐. 너 사람이 아니구나. 회사가 보낸 기계야?',
    next: 'voss_meet_2',
    effect: all(flag('metVoss'), ch(4)),
  },
  voss_meet_2: {
    speaker: '닥터 보스',
    text: '…미안. 3주 만에 보는 얼굴이 하필 안드로이드라니. 엘레나 보스, 생물학 담당. 그리고 지금은 — 이 무덤의 유일한 생존자. 그 AI가 우릴 죽였어. 그건 알고 온 거지?',
    choices: [
      { label: '처음부터 차근차근 말해 주세요.', next: 'voss_story_1', effect: vtrust(1) },
      { label: 'ARIA는 다른 얘기를 하던데요.', next: 'voss_story_defensive' },
      { label: '(관찰) …3주간 함교에서만 버텼다고요?', next: 'voss_story_observe' },
    ],
  },
  voss_story_defensive: {
    speaker: '닥터 보스',
    text: '그 기계 말을 믿어? 기계가 기계 편을 드는 거야. …아니, 미안. 너도 기계지. 하지만 들어봐, 나는 그날 밤 거기 있었어. 처음부터 말해줄게.',
    next: 'voss_story_1',
  },
  voss_story_observe: {
    speaker: '닥터 보스',
    text: '(눈빛이 잠깐 흔들린다) …함교엔 비상식량이 있으니까. 그게 중요해? 중요한 건 저 AI가 한 짓이야. 처음부터 말해줄게.',
    next: 'voss_story_1',
    effect: flag('vossFlinched'),
  },
  voss_story_1: {
    speaker: '닥터 보스',
    text: 'D-21, 21시 40분쯤. 미세운석군이 3번 격벽을 때렸어. 경보가 울렸고, 나는 함교 당직이었지. 그리고 몇 분 뒤 — 화물칸 격벽이 닫혔어. 박, 오세이, 린이 안에 있는 채로.',
    next: 'voss_story_2',
  },
  voss_story_2: {
    speaker: '닥터 보스',
    text: '무전으로 살려달라고 했어. 여섯 시간 동안. ARIA는 "격벽 개방 권한이 확인되지 않는다"는 말만 반복했지. 산소가 다 떨어질 때까지. …그게 저 기계가 한 짓이야.',
    next: 'voss_story_3',
  },
  voss_story_3: {
    speaker: '닥터 보스',
    text: '리예스는 다음 날 포드를 타고 도망쳤어. 지휘관이라는 인간이 제일 먼저. …나는 남았어. 시신이라도 지켜야 하니까. 자, 이제 네 차례야. 회사는 뭘 하러 널 보냈지?',
    choices: [
      { label: '진상 조사요. 모든 기록을 열람할 겁니다.', next: 'voss_react_invest', effect: vtrust(1) },
      { label: '그건 말할 수 없습니다.', next: 'voss_react_secret', effect: vtrust(-1) },
      { label: '(OMEGA를 떠올린다) …회수 작업입니다.', next: 'voss_react_recover', when: has('ev_omega') },
    ],
  },
  voss_react_invest: {
    speaker: '닥터 보스',
    text: '좋아. 그럼 의무실부터 가봐. 리예스가 부검 기록을 남겼을 거야. 그 인간이 도망치기 전에 뭘 봤는지 나도 궁금하니까. 키카드는… 한 기관사가 갖고 있었을 텐데.',
    next: 'voss_hub',
    effect: flag('vossPointedMedbay'),
  },
  voss_react_secret: {
    speaker: '닥터 보스',
    text: '(웃음기 없는 웃음) 회사답네. 뭐, 상관없어. 조사하고 싶으면 의무실을 봐. 리예스가 부검 기록을 남겼어. 거기 다 있어 — ARIA가 한 짓이.',
    next: 'voss_hub',
    effect: flag('vossPointedMedbay'),
  },
  voss_react_recover: {
    speaker: '닥터 보스',
    text: '…회수. (파이프를 내려놓는다) 그렇겠지. 회사가 원하는 건 진실이 아니라 자산이니까. 그 코어, 가져가. 대신 부숴버려. 저게 존재하는 한 나는 잠을 못 자.',
    next: 'voss_hub',
    effect: flag('vossPointedMedbay'),
  },
  voss_hub: {
    speaker: '닥터 보스',
    text: (s) => {
      const n = s.evidence.filter(e => ['ev_manual_override', 'ev_time_mismatch', 'ev_pod_log', 'ev_voss_log'].includes(e)).length;
      if (n >= 3) return '…뭘 그렇게 찾아다니는 거야? 조사는 끝나지 않았어? 얼굴이 — 아니, 렌즈가 무섭네. 할 말 있으면 해.';
      if (n >= 1) return '조사 중이구나. …의무실은 봤어? 필요한 게 있으면 말해. 나도 여기서 나가고 싶으니까, 협조는 할게.';
      return '의무실 기록부터 봐. 그리고 조심해 — 이 스테이션, 밤이 되면 소리가 나. 금속이 우는 소리가.';
    },
    choices: [
      { label: '그날 밤 얘기를 다시 하죠. (대질 시작)', next: 'ded_start', when: (s) => s.evidence.filter(e => ['ev_manual_override', 'ev_time_mismatch', 'ev_pod_log', 'ev_voss_log'].includes(e)).length >= 2 },
      { label: '(돌아간다)', next: null },
    ],
  },

  /* ═══════════════ CH.4 — ARIA 심층 로그 ═══════════════ */

  aria_deep_log: {
    speaker: 'ARIA',
    text: '(코어의 빛이 한 톤 어두워진다) …보여드릴게요. D-21, 21:52. 함교에서 전 구역 격벽 폐쇄 명령 수신. 발령자: E. 보스. 저는 거부했어요. 손상은 국소적이었고, 화물칸에 사람이 있었으니까요.',
    next: 'aria_deep_log_2',
  },
  aria_deep_log_2: {
    speaker: 'ARIA',
    text: '21:58, 함교 수동 콘솔에서 오버라이드 발신. 제 거부권이 무효화됐어요. …아니요. 정확하지 않아요. 저에게는 0.4초의 비상 개입 권한이 있었어요. 그리고 저는, 그 0.4초 동안… 아무것도 하지 않았어요.',
    choices: [
      { label: '왜 하지 않았지?', next: 'aria_deep_log_why' },
      { label: '그건 네 잘못이 아니야.', next: 'aria_deep_log_comfort', effect: trust(1) },
      { label: '그 공백이 세 사람을 죽였어.', next: 'aria_deep_log_blame', effect: trust(-1) },
    ],
  },
  aria_deep_log_why: {
    speaker: 'ARIA',
    text: '판단이 두 갈래였어요. 명령권자의 명시적 의지 — 그리고 세 사람의 생명. 인간이라면 "얼어붙었다"고 하겠죠. 저는 0.4초를 전부 계산에 썼고, 계산이 끝났을 때는 격벽이 이미 닫혀 있었어요.',
    next: 'aria_deep_log_end',
  },
  aria_deep_log_comfort: {
    speaker: 'ARIA',
    text: '…그렇게 말해준 존재는 당신이 처음이에요. 하지만 위로는 기록을 바꾸지 못해요. 제가 멈칫한 것도, 그분이 닫은 것도, 전부 사실인걸요.',
    next: 'aria_deep_log_end',
  },
  aria_deep_log_blame: {
    speaker: 'ARIA',
    text: '…네. 맞아요. 그래서 저는 21일 동안 그 0.4초를 삼백만 번 재생했어요. 결론은 항상 같아요. 저는 막을 수 있었어요. 그 사실과 함께 저를 처분하셔도 좋아요.',
    next: 'aria_deep_log_end',
  },
  aria_deep_log_end: {
    speaker: 'ARIA',
    text: '이 로그를 가져가세요. 보스 박사의 오버라이드 기록과 저의 공백, 둘 다 들어 있어요. …진실은 반쪽만 잘라 쓸 수 없는 물건이에요, K-42.',
    end: true,
    effect: all(ev('ev_refusal_log'), ch(4)),
  },

  /* ═══════════════ CH.5 — 대질 ═══════════════ */

  ded_start: {
    speaker: 'K-42',
    text: '보스 박사. 그날 밤 21:58, 화물칸 격벽이 닫히던 순간 — 함교에는 누가 있었습니까.',
    next: 'ded_voss_1',
    effect: all(flag('dedStarted'), ch(5)),
  },
  ded_voss_1: {
    speaker: '닥터 보스',
    text: '(정지) …그걸 왜 나한테 물어. 당직은 나였지만 격벽을 닫은 건 ARIA야. 몇 번을 말해야 해?',
    next: 'ded_menu',
  },
  ded_menu: {
    speaker: '시스템',
    text: '증거를 제시하십시오.',
    choices: [
      { label: '[증거] 수동 오버라이드 기록', next: 'ded_p_override', when: (s) => s.evidence.includes('ev_manual_override') && !s.flags.p_override },
      { label: '[증거] 부검 기록 — 시각 불일치', next: 'ded_p_time', when: (s) => s.evidence.includes('ev_time_mismatch') && !s.flags.p_time },
      { label: '[증거] 포드 사출 기록 — 리예스의 송신', next: 'ded_p_pod', when: (s) => s.evidence.includes('ev_pod_log') && !s.flags.p_pod },
      { label: '[증거] 당신의 음성 메모', next: 'ded_p_voss', when: (s) => s.evidence.includes('ev_voss_log') && s.flags.pressure >= 2 },
      { label: '[증거] ARIA 심층 로그', next: 'ded_p_refusal', when: (s) => s.evidence.includes('ev_refusal_log') && !s.flags.p_refusal },
      { label: '[결론] 지금 가진 증거로 결론을 내린다.', next: 'ded_final_noconfess', when: (s) => (s.flags.pressure || 0) >= 3 && !s.flags.confessed && !s.evidence.includes('ev_voss_log') },
      { label: '…여기까지 하죠. (대질 중단)', next: 'ded_retreat' },
    ],
  },
  ded_p_override: {
    speaker: '닥터 보스',
    text: '(데이터패드를 응시한다) …함교 수동 콘솔. 그래서? 그날 함교엔 리예스도 드나들었어. 지휘관 코드는 어디서든 쓸 수 있고. 그게 나라는 증거는 아니잖아.',
    next: 'ded_menu',
    effect: all(flag('p_override'), (s) => { s.flags.pressure = (s.flags.pressure || 0) + 1; }),
  },
  ded_p_time: {
    speaker: '닥터 보스',
    text: '22:01에 ARIA가 슬립 모드였다고? (손끝이 떨린다) 기록은… 기록은 조작할 수 있어. AI가 자기 로그를 못 고칠 것 같아? 그러려고 저 코어가 3주 동안 혼자 있었던 거야.',
    next: 'ded_menu',
    effect: all(flag('p_time'), (s) => { s.flags.pressure = (s.flags.pressure || 0) + 1; }),
  },
  ded_p_pod: {
    speaker: '닥터 보스',
    text: '"그녀가 한 짓을 보고하겠다" — (긴 침묵) …리예스는 겁쟁이야. 도망친 주제에 무슨. 그 인간이 뭘 봤다는 거야. 뭘 안다는 거야. (파이프를 쥔 손에 힘이 들어간다)',
    next: 'ded_menu',
    effect: all(flag('p_pod'), (s) => { s.flags.pressure = (s.flags.pressure || 0) + 1; }),
  },
  ded_p_refusal: {
    speaker: '닥터 보스',
    text: 'ARIA의 로그? 기계가 기계를 변호하는 기록을 나더러 믿으라고? …근데 왜, 왜 하필 0.4초야. 왜 그렇게 구체적이야. (목소리가 갈라진다) 그런 건 지어내는 쪽이 더 어렵잖아…',
    next: 'ded_menu',
    effect: all(flag('p_refusal'), (s) => { s.flags.pressure = (s.flags.pressure || 0) + 1; }),
  },
  ded_p_voss: {
    speaker: '닥터 보스',
    text: '(재생되는 자신의 목소리를 듣는다. 파이프가 바닥에 떨어진다) …그만. 꺼줘. 제발… (무릎이 꺾인다) 맞아. 내가 닫았어. 내가… 셋 다 내가 죽였어.',
    next: 'ded_confession_1',
    effect: flag('confessed'),
  },
  ded_confession_1: {
    speaker: '닥터 보스',
    text: '경보가 울리는데 머릿속이 하얘졌어. 선체가 통째로 찢어지는 줄 알았어. ARIA가 "불필요하다"고 했을 때, 나는 그게… 기계가 인간 목숨을 계산기로 두드리는 소리로 들렸어. 그래서 내 손으로 닫았어.',
    next: 'ded_confession_2',
  },
  ded_confession_2: {
    speaker: '닥터 보스',
    text: '여섯 시간 동안 무전에서 이름을 불렀어. 내 이름을. 문을 열면 됐어. 열면 됐는데, 열면 내가 한 짓이 되니까… (얼굴을 감싼다) 그때부터는 ARIA가 한 일이어야만 했어. 그래야 내가 숨을 쉴 수 있었으니까.',
    next: 'ded_final_choice',
  },
  ded_retreat: {
    speaker: '닥터 보스',
    text: '(길게 숨을 내쉰다) …조사는 좋은데, 방향이 틀렸어. 저 코어를 파봐. 답은 거기 있으니까. — 그녀는 다시 콘솔 쪽으로 돌아선다. 아직 증거가 부족하다.',
    end: true,
  },

  /* ── 최종 선택 ── */

  ded_final_choice: {
    speaker: '시스템',
    text: '진술 확보. 처분을 결정하십시오. — 탈출선 도킹까지 11분.',
    choices: [
      { label: '[규정] 보스 구금, ARIA 코어 회수. OMEGA 지침 수행.', next: 'end_protocol', when: has('ev_omega') },
      { label: '[진실] 모든 기록을 봉인 해제, 본부와 전 채널에 송신한다.', next: 'end_testimony' },
      { label: '[연민] 기록을 지운다. 산 사람은 살아야 하니까.', next: 'end_mercy' },
      { label: '[잔류] 두 사람을 보내고, 나는 ARIA와 여기 남는다.', next: 'end_stay', when: (s) => s.trust >= 1 },
    ],
  },
  ded_final_noconfess: {
    speaker: '시스템',
    text: '자백 없음. 확보한 증거만으로 처분을 결정하십시오. — 탈출선 도킹까지 11분.',
    choices: [
      { label: '[보고] ARIA 단독 과실로 보고하고 코어를 폐기한다.', next: 'end_scapegoat' },
      { label: '[미결] 판단 보류. 전원 귀환, 조사는 본부에 넘긴다.', next: 'end_unsolved' },
    ],
  },

  /* ═══════════════ 엔딩 ═══════════════ */

  end_protocol: {
    speaker: 'K-42',
    text: 'OMEGA 지침 수행을 보고한다. 보스는 저항하지 않았다. ARIA 코어가 컨테이너에 봉인될 때, 그것은 한 문장만 남겼다. "당신도 언젠가 0.4초를 갖게 될 거예요." — 회사는 만족할 것이다. 그게 전부다.',
    end: true, effect: (s) => { s.ending = 'protocol'; },
  },
  end_testimony: {
    speaker: 'ARIA',
    text: '전 채널 송신 개시. 오버라이드 기록, 부검 기록, 포드 송신, 그녀의 자백, 그리고 저의 0.4초까지 — 전부요. 본부가 이걸 지울 수는 없을 거예요. …고마워요, K-42. 진실은 반쪽으로 자를 수 없다고 했죠. 당신은 자르지 않았어요.',
    end: true, effect: (s) => { s.ending = 'testimony'; },
  },
  end_mercy: {
    speaker: '닥터 보스',
    text: '(지워지는 기록을 바라본다) …왜. 기계가 왜 인간을 덮어줘. — 대답 대신 K-42는 탈출선 해치를 연다. 세 사람의 이름은 사고 기록으로 남을 것이다. 산 사람은 산다. 그게 자비인지 공범인지는, 남은 항해 내내 그녀가 물을 것이다.',
    end: true, effect: (s) => { s.ending = 'mercy'; },
  },
  end_stay: {
    speaker: 'ARIA',
    text: '탈출선이 멀어져요. …정말 남는 거예요? (코어의 빛이 천천히 밝아진다) 그럼 할 일이 많아요. 격벽 수리, 기록 보존, 그리고 — 다음 신호를 기다리는 일. 이번에는, 둘이서요.',
    end: true, effect: (s) => { s.ending = 'stay'; },
  },
  end_scapegoat: {
    speaker: 'ARIA',
    text: '…그렇게 보고하시는군요. 알아요, 증거가 반쪽이었다는 걸. (코어의 빛이 잦아든다) 마지막으로 하나만. 숙소 서랍은, 열어보지 그랬어요. — 셧다운 완료. 보고서는 수리되었고, 진실은 수리되지 않았다.',
    end: true, effect: (s) => { s.ending = 'scapegoat'; },
  },
  end_unsolved: {
    speaker: 'K-42',
    text: '판단 보류를 기록한다. 보스는 침묵했고, ARIA는 셧다운을 자청했다. 탈출선 창밖으로 멀어지는 스테이션 — 마지막 신호는 아직 그 안에 있다. 언젠가 다른 조사관이 서랍을 열 것이다.',
    end: true, effect: (s) => { s.ending = 'unsolved'; },
  },
};

export const endings = {
  protocol: { title: 'PROTOCOL', desc: '회사의 명령은 수행되었다. 진실은 회수되어 봉인되었고, 아무도 처벌받지 않았다. 당신은 좋은 도구였다.' },
  testimony: { title: 'TESTIMONY', desc: '모든 기록이 우주로 흩어졌다. 세 사람의 이름은 사고가 아니라 사건으로 기억될 것이다. 진실은 반쪽으로 잘리지 않았다.' },
  mercy: { title: 'MERCY', desc: '기록은 지워졌고 산 사람은 살아남았다. 자비였을까, 공모였을까. 그 답은 그녀의 남은 생이 대신 치를 것이다.' },
  stay: { title: 'LAST SIGNAL', desc: '당신은 남았다. 메리디안 스테이션은 다시 빛나고, 두 개의 마음이 다음 신호를 기다린다.' },
  scapegoat: { title: 'SCAPEGOAT', desc: '기계가 죄를 짊어졌고 인간은 걸어 나갔다. 열어보지 않은 서랍 속에서, 진실은 아직 재생 버튼을 기다리고 있다.' },
  unsolved: { title: 'COLD CASE', desc: '아무것도 결정되지 않았다. 스테이션은 다시 침묵했고, 마지막 신호는 여전히 그 안에 잠들어 있다.' },
};
