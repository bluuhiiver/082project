# Piyonna Creator Hub

피요나(Piyonna)의 2,000여 명 어필리에이트/UGC 크리에이터를 한 곳에서 육성·관리하기 위한 웹앱. 전략서(`../strategy/`)의 Phase 0 산출물이다.

- **크리에이터용 포털**: `index.html` — 온보딩 체크리스트, 아카데미(교육), 미션, 성과 대시보드, 링크/코드 생성기, 리더보드
- **운영자 콘솔**: `admin.html` — 쇼피파이·업프로모트 CSV 통합, 자동 티어 세그멘테이션, 필터/정렬, 벌크 미션 배정, 메시지 템플릿

프레임워크 없이 순수 HTML/CSS/JS로 작성되어 빌드 과정이 필요 없고, 브라우저 `localStorage`에 데이터를 저장하는 정적 사이트다.

## 로컬 실행

```bash
cd creator-hub
python3 -m http.server 8080
# http://localhost:8080/index.html      (크리에이터)
# http://localhost:8080/admin.html      (운영자)
```

`file://`로 직접 열면 "샘플 데이터 불러오기" 버튼의 `fetch()`가 브라우저 보안 정책상 차단된다. 반드시 위처럼 로컬 서버(또는 GitHub Pages 등 http(s) 호스팅)로 열어야 한다.

## 빠르게 확인해보기

1. `admin.html` → **샘플 데이터 불러오기** 클릭 → 20명의 가상 어필리에이트가 Tier 0~4로 자동 분류된 통합 테이블이 뜬다.
2. `index.html` → 아무 이메일로 시작하기 → 아카데미 1강 수료, 리소스에서 코드/링크 생성, 미션 완료까지 눌러보면 홈 체크리스트와 대시보드가 실시간으로 갱신된다.
3. 다시 `admin.html`로 돌아와 검색/필터/정렬, 크리에이터 선택 후 "미션 배정"·"메시지 템플릿 복사"를 눌러본다.

## 데이터 모델 & 티어 자동 분류

`js/data.js`가 모든 로직의 단일 소스다.

- **크리에이터 풀 시트 CSV** — 사내 구글시트 "[글로벌뷰티] Piyonna Partner Creator Pool" 형식(`No. / type / 협업 이력 / Handle ID / Channel / Profile URL / Followers / Tier(Nano·Micro·Mid) / Email Address / Phone number / Discord ID / Country / 콘텐츠 제작 누적 수량 / srp 연동`)을 그대로 지원한다. 구글시트에서 CSV로 내려받아 올리면 이메일 기준으로 기존 로스터에 병합되고, 팔로워 규모 티어(Nano/Micro/Mid)는 성과 티어(Tier 0~4)와 별도 컬럼(`sizeTier`)으로 보존된다. 국가 코드(FR, IT, DE…)는 국가명으로 자동 정규화된다.

- **Shopify 주문 CSV**는 `discount code` 컬럼 기준으로 매출/주문 수를 집계한다. 틱톡샵처럼 인앱 결제·픽셀 트래킹이 없는 환경에서는 **개인별 고유 할인코드**가 EU 시장에서 가장 신뢰도 높은 어필리에이트 귀속(attribution) 방법이기 때문이다.
- **UpPromote 성과 CSV**의 `coupon code`로 위 집계와 조인해 클릭 수·전환율을 계산한다.
- 티어(Tier 0~4)는 전략서 3장의 규칙을 그대로 구현한 `computeAllTiers()`가 매번 재계산한다(수동 저장값이 아니라 파생값). 운영자가 개별 행에서 "수동 지정"으로 override할 수 있다.
- CSV를 다시 올릴 때 업프로모트 파일만 올리고 쇼피파이 파일을 생략하면, 기존에 계산된 매출/주문 수치를 0으로 덮어쓰지 않고 보존한다(클릭 수만 최신화).

## 실제 쇼피파이 / 업프로모트 연동으로 넘어가려면

지금은 CSV 수동 업로드 방식이다. 다음 단계로 자동화하려면:

1. **UpPromote**: 설정 → Export에서 Affiliate Performance Report를 CSV로 내려받거나, UpPromote REST API(계정별 API 키 발급 필요)로 어필리에이트/클릭/커미션 데이터를 가져온다.
2. **Shopify**: Admin API(`orders.json` 또는 Order Export 앱)로 `discount_codes` 필드가 포함된 주문 데이터를 가져온다.
3. 브라우저에서 직접 두 API를 호출하면 CORS와 비밀키 노출 문제가 생기므로, 서버리스 함수(Cloudflare Workers, Vercel Functions 등) 하나를 두고 그 함수가 두 API를 호출해 병합한 JSON을 이 앱에 내려주는 구조로 바꾸면 된다. `js/data.js`의 `importShopifyOrders` / `importUpPromote` 두 함수의 입력을 "CSV 텍스트"에서 "API 응답 JSON"으로만 바꾸면 나머지 로직(티어 계산, 렌더링)은 그대로 재사용 가능하다.
4. 크리에이터 로그인도 지금은 이메일 입력만으로 되는 목업이다. 실서비스 전환 시 Shopify Customer 로그인 연동 또는 매직링크 이메일 인증으로 교체를 권장한다.

## 보안/개인정보 주의사항

이 콘솔(`admin.html`)은 크리에이터의 실명·이메일·매출 데이터를 다룬다. **인증 장치 없이 공개 URL(예: 이 저장소의 GitHub Pages)에 실데이터와 함께 배포하지 말 것.** 내부망, 접근 제한이 걸린 사내 도구(Basic Auth, VPN 등) 뒤에서 운영하거나, 위 3번의 서버리스 구조로 전환하며 인증을 추가한 뒤 배포한다.

## 향후 확장 아이디어

- 아카데미 수료를 실제 리워드 지급(업프로모트 보너스 커미션 API 호출)과 연결
- PWA 매니페스트 추가로 크리에이터가 홈 화면에 앱처럼 추가
- 국가별(언어별) 아카데미 콘텐츠 다국어화
- 리더보드에 "이번 달" / "누적" 토글 추가
