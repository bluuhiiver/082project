# Apps Script 웹앱 병합본 — "🐣 Piyonna Partner Creator Pool" + 티어 세그먼트 + 오늘의 운영 + 캠페인 시트

사내 Apps Script 웹앱(Creator 운영 페이지)에 Creator Hub의 기능을 병합한 패키지다. 파일 구성:

- `Index.html` — 프런트 전체 (기존 파일 교체)
- `Campaigns.gs` — 캠페인 시트 브라우저 + 콘텐츠 업로드 타임라인 서버 함수 (새 파일로 추가, **Code.gs는 무변경**)
- `Schedule.gs` — 팀 업무 일정 CRUD 서버 함수 (새 파일로 추가, **Code.gs는 무변경**)
- `appsscript.json` — 매니페스트 (드라이브 읽기 권한 `drive.readonly` 추가됨)

## 🗂 캠페인 시트 브라우저 적용 방법

1. Apps Script 편집기 → 파일 옆 **+** → **스크립트** → 이름 `Campaigns` → 내용을 `Campaigns.gs`로 교체
2. `Index.html` 내용을 이 폴더의 최신본으로 교체
3. 왼쪽 톱니(프로젝트 설정) → **"appsscript.json" 매니페스트 파일 표시** 체크 → 파일 목록에 나타난 `appsscript.json`을 이 폴더의 것으로 교체 (drive.readonly 스코프 추가)
4. 배포 → 배포 관리 → 새 버전으로 배포
5. 웹앱 접속 후 캠페인 시트 탭 첫 클릭 시 **재승인 화면**이 한 번 뜬다 (드라이브 읽기 권한) — 허용하면 이후 자동

동작: 드라이브에서 제목에 "글로벌뷰티"가 포함된 스프레드시트를 자동 발견해 목록화(최신 수정순)하고, 클릭하면 탭별 내용을 웹앱 안에서 조회한다. **새 캠페인 시트를 만들어도 코드 수정 없이 자동으로 목록에 잡힌다.** 이메일 컬럼이 있는 탭은 풀×GMV 조인으로 계산한 성과 티어 칩이 각 행에 자동으로 붙는다. 탭당 최대 400행까지 표시(초과 시 안내 문구), `_` 로 시작하는 캐시성 탭과 숨김 탭은 제외. 캠페인 시트를 열면 상단에 조회수/좋아요/댓글/공유/저장/평균 ER 합계가 자동 집계돼 표시된다.

## 📅 일정 탭

캠페인 콘텐츠 업로드 일정(자동)과 팀 업무 일정(수동)을 한 페이지에서 본다.

- **캠페인 콘텐츠 일정**: `Campaigns.gs`의 `getCampaignTimeline()`이 각 캠페인 시트의 UploadDate류 컬럼만 훑어 날짜별 업로드 건수를 집계 — 수기 입력 없이 항상 최신 상태. 최근 30일만 표시.
- **팀 업무 일정**: 마감일·회의·캠페인 오픈 등을 팀에서 직접 추가/상태 변경/삭제. 크리에이터 풀 시트 안에 숨겨진 `_일정` 탭에 저장되며, `Schedule.gs`가 CRUD를 담당한다. 기존 "편집 모드"(🐣 크리에이터 풀 탭의 🔒 버튼)로 잠금 해제해야 추가/수정/삭제 가능 — 별도 비밀번호 설정 불필요, 기존 `EDIT_PASSWORD`를 그대로 재사용한다.

**적용**: 새 파일 `Campaigns`(기존 파일에 덮어쓰기), `Schedule`(신규 추가) → 각각 [Campaigns.gs](https://github.com/bluuhiiver/082project/raw/claude/peonara-affiliate-strategy-odvuqf/creator-hub/apps-script/Campaigns.gs) / [Schedule.gs](https://github.com/bluuhiiver/082project/raw/claude/peonara-affiliate-strategy-odvuqf/creator-hub/apps-script/Schedule.gs) 내용 붙여넣기 → `Index.html` 최신본으로 교체 → 배포 → 새 버전. **추가 권한 승인 불필요**(이미 있는 스프레드시트/드라이브 권한만 사용).

## 📈 홈 대시보드의 SNS 팔로워 카드

슬랙 `#team_글로벌뷰티제품-마케팅` 채널에 매일 올라오는 "Piyonna SNS 팔로워 리포트"(n8n 자동화)와 **같은 원본 시트**("[글로벌뷰티] Piyonna SNS 채널 raw data")를 `SnsMetrics.gs`가 직접 읽어 홈 카드로 보여준다. Partner/Official × TikTok/Instagram 4개 탭에서 최신 행(팔로워 수, 전일 증감)을 가져오며, 탭 이름에 `partner`/`official` + `tt`/`ig`가 포함되어 있으면 자동으로 찾는다 — 시트 소유자가 탭을 재배치해도 이름 패턴만 유지되면 깨지지 않는다.

- **적용**: 새 파일 `SnsMetrics` 추가 → [SnsMetrics.gs](https://github.com/bluuhiiver/082project/raw/claude/peonara-affiliate-strategy-odvuqf/creator-hub/apps-script/SnsMetrics.gs) 붙여넣기. **추가 권한 승인 불필요** (이미 있는 스프레드시트 읽기 권한만 사용).
- TikTok 해시태그(videoCount)와 Discord 멤버 현황은 별도 시트 없이 크롤링 → 슬랙 게시만 되는 구조라, `SlackMetrics.gs`가 **슬랙 채널 히스토리를 직접 읽어 봇 메시지 텍스트를 파싱**한다.

### 슬랙 연동 설정 (최초 1회)

1. [api.slack.com/apps](https://api.slack.com/apps) → **Create New App** → From scratch → 워크스페이스 선택
2. **OAuth & Permissions** → Scopes → Bot Token Scopes에 `channels:history`, `channels:read` 추가
3. **Install to Workspace** → 발급된 `xoxb-...` 토큰 복사
4. 슬랙에서 `#team_글로벌뷰티제품-마케팅` 채널에 이 봇을 초대: `/invite @앱이름`
5. Apps Script 편집기 → 새 파일 `SlackMetrics` 추가 → [SlackMetrics.gs](https://github.com/bluuhiiver/082project/raw/claude/peonara-affiliate-strategy-odvuqf/creator-hub/apps-script/SlackMetrics.gs) 붙여넣기
6. `SlackMetrics.gs` 안의 `setSlackToken()` 함수에서 `token` 값을 3번의 토큰으로 교체 → 상단 함수 선택 드롭다운에서 `setSlackToken` 선택 → ▶ 실행 (최초 실행 시 권한 승인 필요할 수 있음)
7. 실행 로그에 "저장 완료"가 뜨면 성공. 보안상 `token` 변수 값은 다시 지우고 저장해도 무방 (Script Properties에 이미 안전하게 저장됨)
8. `Index.html`을 최신본으로 교체 → 배포 → 새 버전

추가 OAuth 스코프(appsscript.json 수정)는 필요 없다 — 외부 URL 호출은 기존 `script.external_request` 권한으로 이미 충분하다. 채널 ID가 바뀌거나 다른 채널을 보고 싶으면 `SlackMetrics.gs`의 `SLACK_CHANNEL_ID` 값만 바꾸면 된다.

## ⚠️ 보안 권고

현재 매니페스트의 웹앱 접근이 `ANYONE_ANONYMOUS`(링크만 알면 로그인 없이 접속)로 되어 있다. 크리에이터 이메일·전화번호가 담긴 데이터이므로, 배포 관리에서 액세스 권한을 **"Google 계정이 있는 사용자"** 또는 도메인 제한으로 바꾸는 것을 강력히 권장한다. 캠페인 시트 브라우저가 추가되면 노출 범위가 더 넓어지므로 특히 중요하다.

## 무엇이 추가됐나

기존 웹앱의 크리에이터 풀 / 성과 분석 / GMV 페이지는 그대로 두고, 메인 탭에 **🎯 티어 세그먼트** 페이지 하나를 추가했다.

- **자동 티어 계산**: 풀 시트(KOC/KOL/에이전시)의 이메일과 UpPromote GMV 데이터를 브라우저에서 조인해 5단계 성과 티어를 계산한다. 수동 관리가 필요 없고, 페이지를 열 때마다 최신 캐시 기준으로 재계산된다.
  - **T0 휴면·미등록** — 풀에는 있지만 UpPromote에 어필리에이트 계정이 없음 → 활성화 캠페인 대상
  - **T1 스타터** — 계정은 있지만 주문 0건 → 온보딩/교육 대상
  - **T2 액티브** — 주문 발생 → 미션·리텐션 대상
  - **T3 라이징 스타** — 최근 7일 GMV 상위 20% → 부스트/PR 키트 대상
  - **T4 앰버서더** — 누적 GMV 상위 5% → 파트너십 대상
- **KPI 카드**: 활성 풀 인원, 업프로모트 등록률, 매출 발생 인원, 풀 누적 GMV
- **티어 칩 필터 + 검색**, 티어순/GMV순 정렬
- **메시지 템플릿 복사**: 현재 표시된 대상 전원의 `이메일 ⇥ 티어별 영어 DM 문구`를 클립보드로 복사 (아웃리치용)
- **"풀 시트 밖 매출자" 토글**: UpPromote에서 매출은 잡히는데 풀 시트에 없는 어필리에이트를 함께 표시 — 시트 누락 발견용
- `상태 = 비활성` 행은 집계에서 제외. 이메일 헤더는 `Email Address` / `Email` / `이메일` 모두 인식.

## 적용 방법 (5분)

1. [script.google.com](https://script.google.com)에서 "Piyonna Creator Pool" 프로젝트 열기
2. 왼쪽 파일 목록에서 `Index.html` 선택 → 전체 내용을 이 폴더의 `Index.html`로 교체
3. **`Code.gs`는 수정하지 않는다** — 추가 기능은 전부 프런트에서 기존 `dataJson`/`gmvJson` 데이터를 재활용하므로 서버 코드·비밀번호·API 키 설정에 변화가 없다
4. 저장 후 배포 → 배포 관리 → 기존 배포 편집 → 새 버전으로 배포

기존 배포 URL이 그대로 유지되고, 편집 모드·시트 실시간 연동·GMV 갱신 주기도 모두 기존과 동일하게 동작한다.

## 주의

- `Code.gs`에 편집 비밀번호가 하드코딩되어 있다. 이 저장소에는 **의도적으로 Code.gs를 포함하지 않았다** — 커밋하면 비밀번호가 저장소에 노출된다. 장기적으로는 `EDIT_PASSWORD`를 Script Properties로 옮기는 것을 권장.
- 티어 기준(상위 5%/20%, 주문 1건)은 `Index.html`의 `buildSegments()` 안에 있으니 운영하면서 조정하면 된다.

## 검증

Playwright로 GAS 템플릿 변수를 샘플 데이터로 치환해 렌더링 테스트 완료: 티어 5단계 분류 정확성, 기존 페이지 무손상, 비활성 행 제외, KOL 탭 헤더 변형(`Email`) 인식, 모바일(390px) 가로 스크롤 없음, 콘솔 에러 0건. 일정 탭은 편집 모드 잠금/해제에 따른 추가·상태변경·삭제 버튼 노출, CRUD 동작, 타임라인 날짜별 집계까지 검증했다.
