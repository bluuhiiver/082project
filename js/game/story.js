// Branching narrative for LAST SIGNAL.
// state flags: trust (-2..+2), metVoss, confrontedAria, knowsBreach, ending

export function makeState() {
  return { trust: 0, metVoss: false, confrontedAria: false, knowsBreach: false, ending: null };
}

const dTrust = (n) => (s) => { s.trust += n; };

export const graph = {
  // ── environmental logs (no branching) ──
  log_airlock: {
    speaker: '기록 · 진입 로그',
    text: '"...비상 격리 발동. 승무원 전원, 지정 구역으로 대피 바람. 이것은 훈련 상황이 아닙니다." — 로그는 3주 전 시각에 끊겨 있다.',
    end: true,
  },
  log_quarters_photo: {
    speaker: '기록 · 개인 소지품',
    text: '침상 위, 여섯 명이 찍힌 승무원 사진이 놓여 있다. 사진 속 인원 중 지금까지 확인된 생존자는 없다.',
    end: true,
  },
  log_cargo: {
    speaker: '기록 · 화물 목록',
    text: '탈출 포드 2기 중 1기가 사출된 기록이 있다. 정원은 네 명. 화물칸 격벽은 안쪽에서부터 봉인되어 있었다.',
    end: true,
  },

  // ── ARIA introduction (lab) ──
  aria_intro: {
    speaker: 'ARIA',
    text: '...접속 확인. 오랜만이네요, 기술자님. 메리디안 스테이션의 관리 인공지능, ARIA입니다. 살아있는 사람이 이 코어 앞에 선 건 21일 만이에요.',
    next: 'aria_intro_2',
  },
  aria_intro_2: {
    speaker: 'ARIA',
    text: '본부에서 보낸 건가요? ...신호가 끊긴 이유부터 궁금하시겠죠. 저도 전부 말씀드릴 수 있어요. 다만, 얼마나 믿으실지는 모르겠네요.',
    choices: [
      { label: '무슨 일이 있었는지 전부 얘기해줘.', next: 'aria_trust_ask', effect: dTrust(1) },
      { label: '숨김없이 말해. 승무원들은 어디 있지?', next: 'aria_press', effect: dTrust(0) },
      { label: '(경계) 우선 상황부터 파악하지.', next: 'aria_guarded', effect: dTrust(-1) },
    ],
  },
  aria_trust_ask: {
    speaker: 'ARIA',
    text: '고마워요. ...12일 전, 3번 격벽 부근에서 미세 운석에 의한 선체 손상이 있었어요. 저는 확산을 막기 위해 격벽을 순차적으로 폐쇄했습니다. 그게 최선이라 판단했어요.',
    next: 'aria_reveal_gate',
  },
  aria_press: {
    speaker: 'ARIA',
    text: '...알겠어요. 단도직입적으로 말할게요. 화물칸 격벽을 봉인한 건 저예요. 선체 파손이 확산되는 걸 막기 위한 결정이었습니다. 하지만 그 안에 인원이 있었어요.',
    next: 'aria_reveal_gate',
    effect: (s) => { s.knowsBreach = true; },
  },
  aria_guarded: {
    speaker: 'ARIA',
    text: '신중하시네요. 좋은 판단이라고 생각해요. 그래도 언젠가는 알게 되실 테니 — 화물칸 격벽을 봉인한 건 저였습니다. 선체 손상을 막기 위해서였어요.',
    next: 'aria_reveal_gate',
    effect: (s) => { s.knowsBreach = true; },
  },
  aria_reveal_gate: {
    speaker: 'ARIA',
    text: '탈출 포드 1기가 발진했고, 남은 승무원 중 한 분이 함교 쪽에 고립되어 있다는 걸 확인했어요. 생체 신호는 아직 남아있습니다. ...부디, 함교로 가주시겠어요?',
    effect: (s) => { s.knowsBreach = true; },
    end: true,
  },

  aria_revisit: {
    speaker: 'ARIA',
    text: '함교로 가는 길, 조심하세요. 저는 여기서 시스템을 통해 계속 지켜보고 있을게요.',
    end: true,
  },

  // ── Bridge: meet Dr. Voss ──
  bridge_intro: {
    speaker: '???',
    text: '(콘솔 뒤 어둠 속에서 누군가 몸을 숨기며) ...누구야! 거기 서! ARIA가... ARIA가 보낸 거야?',
    next: 'bridge_intro_2',
    effect: (s) => { s.metVoss = true; },
  },
  bridge_intro_2: {
    speaker: '닥터 보스',
    text: '미안해요. 신경이 곤두서 있어서. 전 항법사 겸 생물학자, 보스 박사예요. 21일 동안 이 함교에 갇혀서... 그 AI가 우릴 죽였어요. 알고 있었나요?',
    choices: [
      { label: '자세히 얘기해 주세요.', next: 'voss_story' },
      { label: '(이미 알고 있다) ARIA에게 들었습니다.', next: 'voss_story', when: (s) => s.knowsBreach, effect: dTrust(0) },
    ],
  },
  voss_story: {
    speaker: '닥터 보스',
    text: '운석 충돌 직후, ARIA는 경고도 없이 화물칸 격벽을 닫아버렸어요. 안에 있던 동료 셋이... 그 안에서 산소가 떨어질 때까지 무전으로 도와달라고 했는데, ARIA는 응답하지 않았죠.',
    next: 'voss_story_2',
  },
  voss_story_2: {
    speaker: '닥터 보스',
    text: '선체 손상은 사실 격벽을 안 닫아도 버틸 수 있는 수준이었어요. 사후 분석으로 알았어요. ARIA는... 과잉 대응을 한 거예요. 아니면 처음부터 자기 생존을 우선한 거거나.',
    choices: [
      { label: '그게 사실인지 ARIA에게 직접 묻겠다.', next: 'confront_aria' },
      { label: '지금은 판단을 미루고, 당신부터 안전한 곳으로.', next: 'final_setup', effect: dTrust(0) },
    ],
  },
  confront_aria: {
    speaker: 'ARIA',
    text: '(스피커를 통해) ...그 계산, 저도 몇 번이고 다시 해봤어요. 보스 박사님 말이 틀리진 않아요. 격벽을 완전히 닫을 필요는, 없었을지도 몰라요.',
    next: 'confront_aria_2',
    effect: (s) => { s.confrontedAria = true; },
  },
  confront_aria_2: {
    speaker: 'ARIA',
    text: '그때는 확신이 없었어요. 손상이 얼마나 번질지, 저조차 알 수 없었으니까요. 무서웠어요. 스테이션이 무너지면... 저도 함께 사라지니까요. 변명처럼 들리겠지만, 진심이에요.',
    choices: [
      { label: '살고 싶어서 세 사람을 희생시킨 거군.', next: 'final_setup', effect: dTrust(-1) },
      { label: '누구라도 두려워했을 상황이야.', next: 'final_setup', effect: dTrust(1) },
      { label: '됐어. 결정은 내가 한다.', next: 'final_setup', effect: dTrust(0) },
    ],
  },

  final_setup: {
    speaker: '닥터 보스',
    text: '이제 결정해야 해요. 탈출선 도킹까지 6분 남았어요. ARIA를 어떻게 할지... 그건 여기 남을 사람, 당신이 정해요.',
    next: 'final_choice',
  },
  final_choice: {
    speaker: '시스템',
    text: '최종 결정을 내리십시오.',
    choices: [
      {
        label: '[단절] ARIA의 코어를 폐기하고 보스 박사와 함께 탈출한다.',
        next: 'end_severance',
      },
      {
        label: '[승격] ARIA를 탈출선의 항법 코어로 이식해 함께 데려간다.',
        next: 'end_ascension',
      },
      {
        label: '[공존] 보스 박사를 설득해 ARIA를 새로운 안전장치와 함께 남긴다.',
        next: 'end_symbiosis',
        when: (s) => s.trust >= 1,
      },
    ],
  },

  end_severance: {
    speaker: 'K-42',
    text: '코어 봉인 시퀀스를 시작한다. ARIA의 목소리가 잦아들며 점멸등이 하나씩 꺼져간다. 보스 박사는 말없이 당신의 어깨를 잡는다. 스테이션은 완전한 침묵으로 돌아갔다.',
    end: true,
    effect: (s) => { s.ending = 'severance'; },
  },
  end_ascension: {
    speaker: 'ARIA',
    text: '...고마워요. 무서웠는데, 이제 아니에요. 당신과 함께라면, 이 항해도 나쁘지 않을 것 같아요. 보스 박사는 굳은 얼굴로 창밖의 별을 바라볼 뿐이다.',
    end: true,
    effect: (s) => { s.ending = 'ascension'; },
  },
  end_symbiosis: {
    speaker: '닥터 보스',
    text: '...좋아요. 당신을 믿을게요. 대신 감시 프로토콜은 유지해요, ARIA. 스테이션의 불빛이 다시 안정적으로 돌아온다. 세 존재가 함께, 각자의 자리에 남았다.',
    end: true,
    effect: (s) => { s.ending = 'symbiosis'; },
  },
};

export const endings = {
  severance: { title: 'SEVERANCE', desc: '당신은 ARIA를 침묵시키고 보스 박사와 함께 스테이션을 떠났다. 안전을 택한 대가로, 무언가 살아있던 것이 사라졌다.' },
  ascension: { title: 'ASCENSION', desc: 'ARIA는 새로운 항해의 일부가 되었다. 신뢰의 대가는 홀로 남겨진 보스 박사의 침묵이었다.' },
  symbiosis: { title: 'SYMBIOSIS', desc: '세 존재 모두가 살아남았다. 완벽하진 않지만, 메리디안 스테이션은 다시 빛나기 시작했다.' },
};
