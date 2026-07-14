/* ═══════════════════════════════════════════════════════════════
   DJ School — lessons.js
   정규반 커리큘럼 (8회 과정) 레슨 정의 + 진행 엔진
   1회: 장비의 이해 / 비트매칭
   2회: 인트로&아웃트로 믹스
   3회: EQ
   4회: 코러스 믹스 & HOT CUE
   5~8회: 졸업셋 피드백
   ═══════════════════════════════════════════════════════════════ */
'use strict';
window.DJS = window.DJS || {};
(function (DJS) {

  const T = (id) => DJS.TRACKS.find((t) => t.id === id);

  /* step 형태:
     { text, detail?, target?(하이라이트 셀렉터), setup?(app),
       check?(app) -> bool  — 없으면 '다음' 버튼으로 진행,
       progress?(app) -> string — 실시간 안내문,
       holdSec? — check가 이 시간동안 유지되어야 통과 } */

  DJS.LESSONS = [
    /* ═══ 1회-A: 장비의 이해 ═══ */
    {
      id: 'gear', session: '1회', icon: '🎛️',
      title: '장비의 이해',
      desc: 'DJ 장비의 각 부분이 무슨 일을 하는지 둘러봐요. 레코드박스처럼 트랙을 관리하는 라이브러리 사용법도 배워요.',
      steps: [
        {
          text: 'DJ 스쿨에 온 걸 환영해요! 🎧',
          detail: '실제 DJ 장비는 [덱 2개 + 믹서 1개]로 이루어져 있어요. 덱은 음악을 재생하는 턴테이블/CDJ, 믹서는 두 음악을 섞는 조종석이에요. 이 앱도 똑같이 생겼답니다. "다음"을 눌러 하나씩 살펴봐요.',
        },
        {
          text: '왼쪽이 덱 A예요',
          detail: '파형(음악의 모양), 재생 버튼, 템포 조절이 모여있어요. 보통 지금 나가고 있는 곡을 A에 올려요.',
          target: '#deckA',
        },
        {
          text: '파형(웨이브폼) 읽는 법',
          detail: '위쪽 큰 파형은 현재 위치 주변을 확대한 모습, 아래 얇은 줄은 곡 전체예요. 색깔이 구간을 알려줘요 — 회청색: 인트로/아웃트로(반주만), 민트: 벌스, 핑크: 코러스(하이라이트). 세로선은 비트(박자)예요.',
          target: '#deckA .wave-wrap',
        },
        {
          text: 'PLAY와 CUE 버튼',
          detail: 'PLAY(▶)는 재생/일시정지. CUE는 "돌아올 지점"이에요 — 정지 상태에서 누르면 현재 위치를 큐로 저장하고, 재생 중에 누르면 큐 지점으로 돌아가 멈춰요.',
          target: '#deckA .transport',
        },
        {
          text: '템포 슬라이더 & 넛지',
          detail: '슬라이더를 내리면 빨라지고 올리면 느려져요(실제 CDJ와 같은 방향, ±8%). BPM(분당 박자 수)이 바뀌는 게 보일 거예요. ◀▶ 넛지 버튼은 누르는 동안만 살짝 밀고 당겨서 박자를 미세 조정해요.',
          target: '#deckA .tempo-col',
        },
        {
          text: 'HOT CUE 패드',
          detail: '자주 점프할 지점(예: 코러스 시작)을 저장하는 버튼이에요. 빈 패드를 누르면 현재 위치가 저장되고, 저장된 패드를 누르면 바로 그 지점으로 점프! 길게 누르면 삭제돼요.',
          target: '#deckA .hotcue-row',
        },
        {
          text: '가운데가 믹서예요',
          detail: '각 덱의 소리 크기(세로 페이더), 음색(EQ 노브), 그리고 두 덱의 균형(가로 크로스페이더)을 조절해요.',
          target: '#mixer',
        },
        {
          text: 'EQ 노브 — HI / MID / LOW',
          detail: '소리를 3개 대역으로 나눠 조절해요. LOW(저음)=킥드럼·베이스, MID(중음)=보컬·멜로디, HI(고음)=하이햇. 왼쪽 끝까지 돌리면 그 대역을 완전히 제거(킬)해요. 믹싱의 핵심 무기죠. 더블클릭하면 원위치!',
          target: '#mixer .eq-a',
        },
        {
          text: '크로스페이더',
          detail: '왼쪽 끝 = 덱 A만, 오른쪽 끝 = 덱 B만, 가운데 = 둘 다 들려요. 곡 전환의 마무리는 늘 크로스페이더가 담당해요.',
          target: '#mixer .xf-wrap',
        },
        {
          text: '라이브러리 (레코드박스 역할)',
          detail: '실제 DJ는 레코드박스(rekordbox)라는 프로그램에 곡을 모아 분석해두고 덱에 불러와요. 여기선 "LOAD" 버튼이 그 역할! 눌러서 곡 목록을 열고 원하는 곡을 덱에 올려보세요. 각 곡의 BPM과 키가 미리 분석되어 있어요.',
          target: '#deckA .load-btn',
        },
        {
          text: '직접 해보기: 덱 A에 아무 곡이나 로드',
          detail: '덱 A의 LOAD를 눌러 라이브러리를 열고, 마음에 드는 곡의 "덱 A에 로드"를 누르세요.',
          target: '#deckA .load-btn',
          check: (app) => !!app.sys.deckA.track,
        },
        {
          text: '재생해보기',
          detail: '덱 A의 PLAY(▶)를 눌러 음악을 들어보세요. 파형이 흐르는 것도 확인!',
          target: '#deckA .play-btn',
          check: (app) => app.sys.deckA.playing,
        },
        {
          text: '장비 투어 완료! 🎉',
          detail: '이제 각 부분이 뭘 하는지 알았어요. 다음 레슨에서 DJ의 첫 번째 기술, 비트매칭을 배워요.',
        },
      ],
    },

    /* ═══ 1회-B: 비트매칭 ═══ */
    {
      id: 'beatmatch', session: '1회', icon: '🥁',
      title: '비트매칭',
      desc: '두 곡의 박자를 정확히 겹치는 기술. 모든 믹싱의 기초예요.',
      steps: [
        {
          text: '비트매칭이란?',
          detail: '두 곡의 (1) 속도(BPM)를 같게 만들고 (2) 박자(비트)가 정확히 겹치게 하는 것. 이게 맞아야 두 곡이 동시에 나와도 어색하지 않아요. 연습용으로 덱 A에 Sunrise Drive(124 BPM), 덱 B에 Midnight Seoul(121 BPM)을 자동으로 실어뒀어요.',
          setup: async (app) => {
            await app.loadTo('A', T('sunrise'));
            await app.loadTo('B', T('midnight'));
            app.sys.deckA.setFader(1);
            app.sys.deckB.setFader(1);
            app.setCrossfader(0.5);
            app.resetEq();
          },
        },
        {
          text: '덱 A를 재생하세요',
          detail: '기준이 되는 곡이에요. 이 곡의 속도에 B를 맞출 거예요.',
          target: '#deckA .play-btn',
          check: (app) => app.sys.deckA.playing,
        },
        {
          text: 'B의 BPM을 A와 같게 만드세요',
          detail: '덱 B의 템포 슬라이더를 움직여 BPM 숫자를 맞춰요. A는 124.0 — B는 지금 121이니 더 빠르게(슬라이더를 아래로) 해야겠죠? 0.1 이내로 맞추면 통과!',
          target: '#deckB .tempo-col',
          check: (app) => Math.abs(app.sys.deckA.effBpm() - app.sys.deckB.effBpm()) < 0.1 && app.sys.deckA.playing,
          progress: (app) => {
            const d = app.sys.deckB.effBpm() - app.sys.deckA.effBpm();
            if (Math.abs(d) < 0.1) return '✅ BPM 일치!';
            return d > 0 ? `B가 ${d.toFixed(1)} BPM 빨라요 — 슬라이더를 위로` : `B가 ${(-d).toFixed(1)} BPM 느려요 — 슬라이더를 아래로`;
          },
        },
        {
          text: '박자에 맞춰 B를 재생하세요',
          detail: 'A의 킥드럼 "쿵" 소리에 맞춰 B의 PLAY를 눌러보세요. 완벽하지 않아도 괜찮아요 — 다음 단계에서 미세조정할 거예요.',
          target: '#deckB .play-btn',
          check: (app) => app.sys.deckB.playing && app.sys.deckA.playing,
        },
        {
          text: '넛지로 비트를 겹치세요',
          detail: '가운데 비트 미터를 보세요. B가 빠르면 ◀(잠깐 느리게), 느리면 ▶(잠깐 빠르게)를 눌러 두 비트를 겹쳐요. 오차 30ms 이내로 4초간 유지하면 통과!',
          target: '#deckB .nudge-row',
          holdSec: 4,
          check: (app) => {
            const off = app.sys.beatOffsetMs();
            return off !== null && Math.abs(off) < 30;
          },
          progress: (app) => {
            const off = app.sys.beatOffsetMs();
            if (off === null) return '두 덱이 모두 재생 중이어야 해요';
            if (Math.abs(off) < 30) return `✅ 오차 ${Math.abs(off).toFixed(0)}ms — 유지하세요!`;
            return off > 0 ? `B가 ${Math.abs(off).toFixed(0)}ms 빨라요 → ◀ 를 잠깐` : `B가 ${Math.abs(off).toFixed(0)}ms 늦어요 → ▶ 를 잠깐`;
          },
        },
        {
          text: '비트매칭 성공! 🥳',
          detail: '방금 한 걸 실전에선 귀로만 해내요. 참고로 SYNC 버튼은 이 과정을 자동으로 해주지만, 원리를 아는 DJ와 모르는 DJ는 위기 대처가 달라요. 오늘 배운 걸 기억하세요!',
        },
      ],
    },

    /* ═══ 2회: 인트로 & 아웃트로 믹스 ═══ */
    {
      id: 'introoutro', session: '2회', icon: '🔀',
      title: '인트로 & 아웃트로 믹스',
      desc: '가장 기본적인 전환: 나가는 곡의 아웃트로에 다음 곡의 인트로를 겹쳐요.',
      steps: [
        {
          text: '인트로&아웃트로 믹스란?',
          detail: '곡의 인트로/아웃트로는 드럼만 나오는 "믹스용 구간"이에요. A의 아웃트로(회청색 구간)와 B의 인트로를 겹치면 멜로디끼리 부딪히지 않고 자연스럽게 넘어가요. 연습을 위해 A(Sunrise Drive)를 마지막 코러스에, B(Han River Bounce)를 처음에 준비해뒀어요.',
          setup: async (app) => {
            await app.loadTo('A', T('sunrise'));
            await app.loadTo('B', T('hanriver'));
            const lastChorus = DJS.lastSection(T('sunrise'), 'chorus');
            app.sys.deckA.seek(lastChorus.startTime + 8 * app.sys.deckA.meta.barSec);
            app.sys.deckA.setFader(1);
            app.sys.deckB.setFader(1);
            app.setCrossfader(0);
            app.resetEq();
          },
        },
        {
          text: '덱 A를 재생하세요',
          detail: 'A가 마지막 코러스를 지나고 있어요. 잠시 후 아웃트로(회청색)로 넘어가요.',
          target: '#deckA .play-btn',
          check: (app) => app.sys.deckA.playing,
        },
        {
          text: 'SYNC로 B의 템포를 맞추세요',
          detail: '덱 B의 SYNC 버튼을 누르면 지난 시간에 배운 비트매칭을 자동으로 해줘요. B의 BPM이 A와 같아지는 걸 확인!',
          target: '#deckB .sync-btn',
          check: (app) => Math.abs(app.sys.deckA.effBpm() - app.sys.deckB.effBpm()) < 0.1,
        },
        {
          text: 'A가 아웃트로에 들어가면 B를 재생!',
          detail: 'A의 파형이 회청색(아웃트로) 구간에 닿는 순간, B의 PLAY를 누르세요. B는 인트로부터 시작하니 드럼끼리 자연스럽게 겹쳐요. (재생 후 SYNC를 한 번 더 누르면 박자가 딱 맞아요)',
          target: '#deckB .play-btn',
          check: (app) => {
            const a = app.sys.deckA, b = app.sys.deckB;
            if (!a.playing || !b.playing) return false;
            const sa = a.sectionNow(), sb = b.sectionNow();
            return sa && sa.type === 'outro' && sb && sb.type === 'intro';
          },
          progress: (app) => {
            const a = app.sys.deckA, b = app.sys.deckB;
            const sa = a.sectionNow();
            if (!sa) return '';
            if (!a.playing) return '⚠️ A가 멈춰있어요 — A를 다시 재생하세요 (끝났다면 파형을 클릭해 코러스로 이동)';
            const sb = b.sectionNow();
            if (b.playing && sb && sb.type !== 'intro') return '⚠️ B가 인트로를 지났어요 — B의 CUE를 눌러 처음으로 되돌리세요';
            if (sa.type === 'outro') return '🟢 지금이에요! B PLAY!';
            return `A 현재 구간: ${sa.name} — 아웃트로를 기다리세요`;
          },
        },
        {
          text: '크로스페이더를 천천히 B로 (6초 이상)',
          detail: '두 곡이 함께 흐르는 동안 크로스페이더를 조금씩 오른쪽으로 밀어요. 서두르지 마세요 — 좋은 전환은 부드러워요. 6초 이상에 걸쳐 끝까지 밀면 통과!',
          target: '#mixer .xf-wrap',
          setup: (app) => { app.lessonState.xfStart = null; },
          check: (app) => {
            const x = app.xfVal();
            const st = app.lessonState;
            const now = performance.now() / 1000;
            if (x < 0.12) { st.xfStart = null; return false; }
            if (st.xfStart === null) st.xfStart = now;
            if (x >= 0.92) {
              if (now - st.xfStart >= 5) return true;
              // 너무 빨랐음 → 다시
              st.tooFast = true;
              return false;
            }
            return false;
          },
          progress: (app) => {
            const x = app.xfVal();
            const st = app.lessonState;
            if (st.tooFast && x >= 0.92) return '⚠️ 너무 빨라요! 크로스페이더를 다시 왼쪽으로 갔다가 천천히';
            if (x >= 0.92) return '';
            st.tooFast = false;
            if (x < 0.12) return 'A쪽에서 시작해 조금씩 밀어보세요';
            return `진행 중... ${(x * 100).toFixed(0)}% — 천천히!`;
          },
        },
        {
          text: '덱 A를 정지하세요',
          detail: '전환 완료! 이제 A는 역할을 다했으니 정지(또는 곡이 끝나게 두기). 다음 곡을 A에 준비하는 게 실전 루틴이에요.',
          target: '#deckA .play-btn',
          check: (app) => !app.sys.deckA.playing,
        },
        {
          text: '첫 믹스 완성! 🎊',
          detail: '방금 한 것이 DJ 믹싱의 뼈대예요: ①다음 곡 준비 → ②싱크 → ③아웃트로에 인트로 겹치기 → ④크로스페이더 전환. 다음 시간엔 EQ로 이 전환을 더 매끄럽게 만들어요.',
        },
      ],
    },

    /* ═══ 3회: EQ ═══ */
    {
      id: 'eq', session: '3회', icon: '🎚️',
      title: 'EQ 믹스',
      desc: '저음 충돌을 막는 베이스 스왑 — 프로처럼 들리게 하는 비결이에요.',
      steps: [
        {
          text: '왜 EQ가 필요할까?',
          detail: '두 곡이 동시에 나오면 킥드럼과 베이스(저음)가 겹쳐 소리가 탁해지고 "우웅~"하며 부딪혀요. 해결책: 한 곡의 LOW는 항상 내려두는 것! 전환 중간에 저음을 교체하는 걸 "베이스 스왑"이라 해요. A(Sunrise)를 코러스에, B(Neon Night)를 인트로에 준비했어요.',
          setup: async (app) => {
            await app.loadTo('A', T('sunrise'));
            await app.loadTo('B', T('neon'));
            const chorus = DJS.firstSection(T('sunrise'), 'chorus');
            app.sys.deckA.seek(chorus.startTime);
            app.sys.deckA.setFader(1);
            app.sys.deckB.setFader(1);
            app.setCrossfader(0);
            app.resetEq();
            app.sys.deckA.play();
          },
        },
        {
          text: '먼저 B의 LOW를 완전히 내리세요 (킬)',
          detail: '믹서 오른쪽(B 채널)의 LOW 노브를 왼쪽 끝까지. B를 틀기 전에 미리 저음을 빼두는 게 순서예요.',
          target: '#mixer .eq-b',
          check: (app) => app.sys.deckB.eqDb.low <= -24,
        },
        {
          text: 'SYNC 후 B 재생, 크로스페이더는 가운데로',
          detail: 'B의 SYNC를 누르고 PLAY. 크로스페이더를 가운데(50%)로 가져와 두 곡이 함께 들리게 하세요. B는 저음이 없어서 A와 부딪히지 않죠?',
          target: '#mixer .xf-wrap',
          check: (app) => {
            const s = app.sys;
            return s.deckA.playing && s.deckB.playing &&
              Math.abs(s.deckA.effBpm() - s.deckB.effBpm()) < 0.1 &&
              app.xfVal() > 0.3 && app.xfVal() < 0.7;
          },
          progress: (app) => {
            const s = app.sys;
            if (!s.deckB.playing) return 'B를 SYNC 후 재생하세요';
            if (Math.abs(s.deckA.effBpm() - s.deckB.effBpm()) >= 0.1) return 'SYNC 버튼으로 BPM을 맞추세요';
            return '크로스페이더를 가운데로';
          },
        },
        {
          text: '베이스 스왑! A LOW ↓ + B LOW ↑',
          detail: '지금이 마법의 순간이에요. A의 LOW를 왼쪽 끝까지 내리는 동시에 B의 LOW를 원위치(가운데)로 올리세요. 저음의 주인이 A→B로 바뀌면서 곡이 넘어간 느낌이 나요!',
          target: '#mixer .eq-knobs',
          check: (app) => app.sys.deckA.eqDb.low <= -20 && app.sys.deckB.eqDb.low >= -4,
          progress: (app) => {
            const a = app.sys.deckA.eqDb.low, b = app.sys.deckB.eqDb.low;
            if (a > -20 && b < -4) return 'A LOW는 끝까지 ↓, B LOW는 가운데(0)로 ↑';
            if (a > -20) return 'B는 됐어요! 이제 A의 LOW를 끝까지 내려요';
            return 'A는 됐어요! B의 LOW를 가운데(0)까지 올려요';
          },
        },
        {
          text: '크로스페이더를 B로 마무리',
          detail: '저음이 이미 B의 것이니, 크로스페이더를 끝까지 밀면 아주 자연스럽게 전환돼요.',
          target: '#mixer .xf-wrap',
          check: (app) => app.xfVal() >= 0.92,
        },
        {
          text: 'EQ 믹스 마스터! 🧙',
          detail: '핵심 규칙: "저음은 한 곡만". 전환 내내 이 규칙만 지켜도 믹스가 확 좋아져요. MID/HI도 같은 방식으로 쓸 수 있어요 — 보컬이 겹치면 한쪽 MID를 내리는 식으로!',
        },
      ],
    },

    /* ═══ 4회: 코러스 믹스 & HOT CUE ═══ */
    {
      id: 'chorus', session: '4회', icon: '🔥',
      title: '코러스 믹스 & HOT CUE',
      desc: '에너지가 가장 높은 코러스끼리 바로 연결하는 화려한 전환. HOT CUE가 필수 도구예요.',
      steps: [
        {
          text: '코러스 믹스란?',
          detail: '인트로&아웃트로 믹스가 "안전한 전환"이라면, 코러스 믹스는 A의 코러스가 한창일 때 B의 코러스로 바로 점프하는 "화려한 전환"이에요. 타이밍이 생명이라 HOT CUE에 B의 코러스 시작점을 미리 저장해둬야 해요. A(Han River)를 코러스 직전에, B(Sunrise)를 준비했어요.',
          setup: async (app) => {
            await app.loadTo('A', T('hanriver'));
            await app.loadTo('B', T('sunrise'));
            const chorusA = DJS.firstSection(T('hanriver'), 'chorus');
            app.sys.deckA.seek(Math.max(0, chorusA.startTime - 4 * app.sys.deckA.meta.barSec));
            app.sys.deckA.setFader(1);
            app.sys.deckB.setFader(1);
            app.setCrossfader(0);
            app.resetEq();
          },
        },
        {
          text: 'B의 코러스 시작점을 찾으세요',
          detail: '덱 B의 아래쪽 전체 파형에서 핑크색(코러스) 구간이 시작하는 지점을 클릭해 이동하세요. 퀀타이즈가 켜져 있어서 비트에 자동으로 붙어요.',
          target: '#deckB .wave-over-wrap',
          check: (app) => {
            const b = app.sys.deckB;
            if (!b.track) return false;
            const chorus = DJS.firstSection(b.track, 'chorus');
            return Math.abs(b.posNow() - chorus.startTime) <= b.meta.barSec;
          },
          progress: (app) => {
            const b = app.sys.deckB;
            if (!b.track) return '';
            const chorus = DJS.firstSection(b.track, 'chorus');
            const d = b.posNow() - chorus.startTime;
            if (Math.abs(d) <= b.meta.barSec) return '✅ 코러스 시작점 근처예요!';
            return d < 0 ? '더 오른쪽(핑크 구간 시작)으로' : '너무 갔어요 — 핑크 구간의 맨 앞으로';
          },
        },
        {
          text: 'HOT CUE 1에 저장하세요',
          detail: '덱 B의 HOT CUE 패드 1번을 누르면 현재 위치가 저장돼요. 패드에 불이 들어오면 성공!',
          target: '#deckB .hotcue-row',
          check: (app) => {
            const b = app.sys.deckB;
            if (!b.track || b.hotCues[0] === null) return false;
            const chorus = DJS.firstSection(b.track, 'chorus');
            return Math.abs(b.hotCues[0] - chorus.startTime) <= b.meta.barSec;
          },
        },
        {
          text: 'A 재생 + B SYNC',
          detail: 'A를 재생하고(코러스 직전부터 시작해요) B의 SYNC를 눌러 템포를 맞춰두세요.',
          target: '#deckA .play-btn',
          check: (app) => app.sys.deckA.playing && Math.abs(app.sys.deckA.effBpm() - app.sys.deckB.effBpm()) < 0.1,
        },
        {
          text: 'A 코러스에서 HOT CUE 1 발사! 🚀',
          detail: 'A가 코러스(핑크)에 들어가면, 마디 첫 박("쿵"이 강한 순간)에 맞춰 B의 HOT CUE 1을 누르세요. B가 코러스부터 바로 재생돼요!',
          target: '#deckB .hotcue-row',
          check: (app) => {
            const a = app.sys.deckA, b = app.sys.deckB;
            if (!a.playing || !b.playing) return false;
            const sa = a.sectionNow(), sb = b.sectionNow();
            return sa && sa.type === 'chorus' && sb && sb.type === 'chorus';
          },
          progress: (app) => {
            const sa = app.sys.deckA.sectionNow();
            if (!sa) return '';
            return sa.type === 'chorus' ? '🟢 지금! HOT CUE 1!' : `A 현재 구간: ${sa.name} — 코러스를 기다리세요`;
          },
        },
        {
          text: '빠른 전환! 크로스페이더를 4박 안에',
          detail: '코러스 믹스는 인트로 믹스와 달리 짧고 굵게! 크로스페이더를 2~4박(약 2초) 안에 B로 밀어버리세요.',
          target: '#mixer .xf-wrap',
          check: (app) => app.xfVal() >= 0.92 && app.sys.deckB.playing,
        },
        {
          text: '코러스 믹스 성공! 🔥',
          detail: '관중이 가장 열광하는 전환이에요. 포인트 정리: ①HOT CUE로 코러스 시작점 준비 ②A 코러스의 마디 첫 박에 발사 ③빠른 크로스페이드. 이제 정규반의 모든 기술을 배웠어요 — 졸업셋에 도전하세요!',
        },
      ],
    },

    /* ═══ 5~8회: 졸업셋 ═══ */
    {
      id: 'grad', session: '5~8회', icon: '🎓',
      title: '졸업셋 (피드백 모드)',
      desc: '배운 기술로 나만의 셋을 완성하세요. 실시간 모니터링 후 리포트로 피드백해드려요. 80점 이상이면 졸업!',
      graduation: true,
      steps: [],
    },
  ];

  /* ═══════════════ 레슨 진행 엔진 ═══════════════ */
  class LessonEngine {
    constructor(app) {
      this.app = app;
      this.lesson = null;
      this.stepIndex = 0;
      this.holdSince = null;
      this.onUpdate = null;
      this._timer = null;
    }

    progressData() {
      try {
        return JSON.parse(localStorage.getItem('djs-progress') || '{}');
      } catch (e) { return {}; }
    }
    saveProgress(data) {
      localStorage.setItem('djs-progress', JSON.stringify(data));
    }
    isDone(lessonId) { return !!this.progressData()[lessonId]; }
    markDone(lessonId, extra) {
      const d = this.progressData();
      d[lessonId] = extra || true;
      this.saveProgress(d);
    }
    /* 순서 잠금: 이전 레슨을 마쳐야 다음 열림 */
    isUnlocked(lessonId) {
      const idx = DJS.LESSONS.findIndex((l) => l.id === lessonId);
      if (idx <= 0) return true;
      return this.isDone(DJS.LESSONS[idx - 1].id);
    }

    async start(lesson) {
      this.stop();
      this.lesson = lesson;
      this.stepIndex = 0;
      this.holdSince = null;
      this.busy = false;
      this.app.lessonState = {};
      this._notify();
      await this._enterStep();
      this._timer = setInterval(() => this._tick(), 200);
      this._notify();
    }

    stop() {
      if (this._timer) { clearInterval(this._timer); this._timer = null; }
      this.lesson = null;
      this.stepIndex = 0;
      this._notify();
    }

    step() {
      return this.lesson ? this.lesson.steps[this.stepIndex] : null;
    }

    async _enterStep() {
      const s = this.step();
      if (s && s.setup) {
        this.busy = true; // setup(트랙 로드 등) 동안 진행 차단
        this._notify();
        try { await s.setup(this.app); } finally { this.busy = false; }
      }
      this.holdSince = null;
      this._notify();
    }

    /* '다음' 버튼 (check 없는 스텝) */
    async next() {
      const s = this.step();
      if (!s || s.check || this.busy) return;
      await this._advance();
    }

    async _advance() {
      if (!this.lesson) return;
      if (this.stepIndex >= this.lesson.steps.length - 1) {
        const id = this.lesson.id;
        this.markDone(id);
        const done = this.lesson;
        this.stop();
        if (this.onComplete) this.onComplete(done);
        return;
      }
      this.stepIndex++;
      await this._enterStep();
    }

    _tick() {
      if (this.busy) return;
      const s = this.step();
      if (!s || !s.check) { this._notify(); return; }
      let ok = false;
      try { ok = !!s.check(this.app); } catch (e) { ok = false; }
      if (ok) {
        const need = s.holdSec || 0;
        if (need > 0) {
          const now = performance.now() / 1000;
          if (this.holdSince === null) this.holdSince = now;
          if (now - this.holdSince >= need) {
            this.holdSince = null;
            this._advance();
            return;
          }
        } else {
          this._advance();
          return;
        }
      } else {
        this.holdSince = null;
      }
      this._notify();
    }

    holdProgress() {
      const s = this.step();
      if (!s || !s.holdSec || this.holdSince === null) return 0;
      return Math.min(1, (performance.now() / 1000 - this.holdSince) / s.holdSec);
    }

    _notify() { if (this.onUpdate) this.onUpdate(this); }
  }

  /* ═══════════════ 졸업셋 레코더/채점 ═══════════════ */
  class GradRecorder {
    constructor(app) {
      this.app = app;
      this.reset();
    }
    reset() {
      this.active = false;
      this.startedAt = 0;
      this.samples = 0;
      this.bothAudibleSamples = 0;
      this.driftSamples = 0;       // 둘 다 들리는데 박자 어긋남
      this.bassClashSamples = 0;   // 둘 다 들리는데 저음 겹침
      this.clipSamples = 0;        // 마스터 클리핑
      this.silenceSamples = 0;     // 완전 무음
      this.silenceRun = 0;
      this.silenceGaps = 0;        // 1.5초 이상 무음 횟수
      this.transitions = 0;        // 완성된 크로스페이드 횟수
      this.playedTracks = new Set();
      this._xfSide = null;         // 'A'|'B' 크로스페이더가 머문 쪽
      this._timer = null;
    }
    start() {
      this.reset();
      this.active = true;
      this.startedAt = performance.now() / 1000;
      const x = this.app.xfVal();
      this._xfSide = x < 0.35 ? 'A' : x > 0.65 ? 'B' : null;
      this._timer = setInterval(() => this._sample(), 250);
    }
    stopAndReport() {
      this.active = false;
      if (this._timer) { clearInterval(this._timer); this._timer = null; }
      return this._report();
    }
    elapsed() {
      return this.active ? performance.now() / 1000 - this.startedAt : 0;
    }
    _sample() {
      const app = this.app, s = app.sys;
      this.samples++;
      for (const d of [s.deckA, s.deckB]) {
        if (d.track && d.playing) this.playedTracks.add(d.track.id);
      }
      const audA = s.audibility('A'), audB = s.audibility('B');
      const both = audA > 0.25 && audB > 0.25;
      if (both) {
        this.bothAudibleSamples++;
        const off = s.beatOffsetMs();
        if (off !== null && Math.abs(off) > 45) this.driftSamples++;
        if (s.deckA.eqDb.low > -8 && s.deckB.eqDb.low > -8) this.bassClashSamples++;
      }
      const m = s.masterLevel();
      if (m.peak > 0.985) this.clipSamples++;
      const anyPlaying = (s.deckA.playing && audA > 0.03) || (s.deckB.playing && audB > 0.03);
      if (!anyPlaying) {
        this.silenceRun++;
        if (this.silenceRun === 6) this.silenceGaps++; // 6샘플 = 1.5초
      } else {
        this.silenceRun = 0;
      }
      // 크로스페이더 완주 감지
      const x = app.xfVal();
      const side = x < 0.35 ? 'A' : x > 0.65 ? 'B' : null;
      if (side && this._xfSide && side !== this._xfSide) this.transitions++;
      if (side) this._xfSide = side;
    }
    _report() {
      const secs = (n) => n * 0.25;
      const durMin = (performance.now() / 1000 - this.startedAt) / 60;
      const items = [];
      let score = 0;

      // ① 비트매칭 (30점)
      const overlap = Math.max(1, this.bothAudibleSamples);
      const driftRatio = this.driftSamples / overlap;
      const beatScore = Math.round(30 * DJS.clamp(1 - driftRatio * 1.8, 0, 1));
      score += beatScore;
      items.push({
        name: '비트매칭', got: beatScore, max: 30,
        note: driftRatio < 0.1
          ? '두 곡이 겹치는 동안 박자가 잘 맞았어요. 훌륭해요!'
          : `두 곡이 함께 나온 시간의 ${Math.round(driftRatio * 100)}% 동안 박자가 어긋났어요 (약 ${secs(this.driftSamples).toFixed(0)}초). SYNC 또는 넛지로 겹치기 전에 꼭 비트를 맞추세요.`,
      });

      // ② 저음 관리 / EQ (20점)
      const clashRatio = this.bassClashSamples / overlap;
      const eqScore = Math.round(20 * DJS.clamp(1 - clashRatio * 1.6, 0, 1));
      score += eqScore;
      items.push({
        name: 'EQ · 저음 관리', got: eqScore, max: 20,
        note: clashRatio < 0.15
          ? '"저음은 한 곡만" 규칙을 잘 지켰어요!'
          : `저음이 겹친 시간이 ${secs(this.bassClashSamples).toFixed(0)}초 있었어요. 두 곡이 함께 나올 땐 한쪽 LOW를 내려두세요 (3회차 레슨 참고).`,
      });

      // ③ 볼륨 · 흐름 (20점)
      let volScore = 20;
      const clipSec = secs(this.clipSamples);
      if (clipSec > 2) volScore -= Math.min(10, Math.round(clipSec));
      volScore -= Math.min(10, this.silenceGaps * 5);
      volScore = Math.max(0, volScore);
      score += volScore;
      const volNotes = [];
      if (clipSec > 2) volNotes.push(`소리가 너무 커서 찌그러진 구간이 ${clipSec.toFixed(0)}초 (트림/마스터를 낮추세요)`);
      if (this.silenceGaps > 0) volNotes.push(`1.5초 이상 무음이 ${this.silenceGaps}번 (셋이 끊기면 안 돼요!)`);
      items.push({
        name: '볼륨 · 흐름', got: volScore, max: 20,
        note: volNotes.length ? volNotes.join(' · ') : '음량 관리와 흐름이 안정적이었어요.',
      });

      // ④ 전환 구성 (30점)
      let mixScore = 0;
      if (this.transitions >= 1) mixScore += 12;
      if (this.transitions >= 2) mixScore += 10;
      if (this.playedTracks.size >= 3) mixScore += 8;
      else if (this.playedTracks.size >= 2) mixScore += 4;
      score += mixScore;
      items.push({
        name: '전환 구성', got: mixScore, max: 30,
        note: `크로스페이더 전환 ${this.transitions}회 · 사용한 트랙 ${this.playedTracks.size}곡` +
          (this.transitions < 2 ? ' — 전환 2회 이상' : '') +
          (this.playedTracks.size < 3 ? ' · 3곡 이상 사용해보세요' : ''),
      });

      const passed = score >= 80;
      return { score, items, passed, durMin, transitions: this.transitions, tracks: this.playedTracks.size };
    }
  }

  DJS.LessonEngine = LessonEngine;
  DJS.GradRecorder = GradRecorder;

})(window.DJS);
