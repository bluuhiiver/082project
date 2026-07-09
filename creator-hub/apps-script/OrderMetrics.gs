// 추정 어필리에이트 GMV — 주문 알림 봇(#auto_order_noti_piyonna에 쏘는 팀 자체
// 앱)이 주문을 raw data 시트에도 한 줄씩 쌓아주면, 할인코드가 붙은 주문 중
// **UpPromote에 실제 등록된 어필리에이트 코드로 확인된 것만** 집계한다.
// (BIENVENUE30 같은 웰컴 할인, 랜덤 서프라이즈 코드 등은 공용 코드 블록리스트로
// 걸러내려 하면 새 코드가 생길 때마다 놓치게 돼서, 반대로 "UpPromote 기준
// 허용 목록" 방식으로 뒤집었다 — Code.gs의 fetchUpPromoteGmv()가 반환하는
// couponByEmail을 그대로 재사용한다. 같은 프로젝트라 전역을 공유하므로 바로
// 호출할 수 있다.)
// UpPromote가 아직 추적 못 한(승인 대기 등) 코드 주문까지도 이 방식으로는
// 잡히는 게 아니라, "어필리에이트 코드로 확인된" 주문만 잡는다는 점 참고 —
// 그래도 결제~물류 검수 지연(최대 6일) 없이 주문 시점 기준으로 집계되는
// "추정치"라서, 확정 수치인 UpPromote GMV와 별도로 표기한다. Code.gs는 무변경.
//
// 크롤러가 써줘야 하는 형식 (SNS raw data와 같은 스프레드시트에 새 탭 1개):
//   탭 "orders raw data": 날짜 | 주문번호 | 금액 | 할인코드
//   (주문 하나당 한 줄, 할인코드 없으면 빈칸. 컬럼 순서 무관 — 헤더로 자동 인식)
var ORDERS_SPREADSHEET_ID = '1NOoKuyM92HSe3aiQ_vm1If--ljgHebJtmFzdX7t1w0E';
var ORDERS_MAX_SCAN_ROWS = 3000;
var ORDERS_TREND_DAYS = 14;

// UpPromote에 등록된 어필리에이트 개인 코드 전체를 모아 허용 목록을 만든다.
// UpPromote 연동 전이거나 오류가 나면 빈 목록을 반환 — 이 경우 주문에 코드가
// 있어도 전부 "확인 안 됨"으로 제외된다(공용/웰컴 코드가 새는 것보다 안전).
function omKnownAffiliateCoupons_() {
  var set = {};
  try {
    var gmv = fetchUpPromoteGmv();
    if (gmv && gmv.couponByEmail) {
      Object.keys(gmv.couponByEmail).forEach(function (email) {
        String(gmv.couponByEmail[email] || '').split(',').forEach(function (c) {
          var code = c.trim().toUpperCase();
          if (code) set[code] = true;
        });
      });
    }
  } catch (e) {
    // UpPromote 연동 전 — 빈 허용 목록으로 진행
  }
  return set;
}

function omNum_(v) {
  if (v === null || v === undefined || v === '') return null;
  if (typeof v === 'number') return v;
  var n = Number(String(v).replace(/[^0-9.\-]/g, ''));
  return isNaN(n) ? null : n;
}

function omDateStr_(v, tz) {
  if (v instanceof Date) return Utilities.formatDate(v, tz, 'yyyy-MM-dd');
  return String(v || '').trim().slice(0, 10);
}

function omFindCol_(headers, keywords) {
  for (var i = 0; i < headers.length; i++) {
    var h = String(headers[i]).toLowerCase();
    if (keywords.some(function (k) { return h.indexOf(k) !== -1; })) return i;
  }
  return -1;
}

function getEstimatedAffiliateGmv() {
  var ss;
  try {
    ss = SpreadsheetApp.openById(ORDERS_SPREADSHEET_ID);
  } catch (err) {
    return { enabled: true, error: '시트를 열 수 없습니다 (권한 또는 ID 확인): ' + err };
  }
  var tz = Session.getScriptTimeZone();

  var sheet = null;
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var name = sheets[i].getName().toLowerCase();
    if (name.indexOf('order') !== -1 || name.indexOf('주문') !== -1) { sheet = sheets[i]; break; }
  }
  if (!sheet) {
    return {
      enabled: true,
      error: '주문 기록 탭이 아직 없습니다 — SNS raw data 시트에 "orders raw data" 탭(날짜/주문번호/금액/할인코드)을 만들고 주문 알림 앱이 한 줄씩 쓰게 해주세요.',
    };
  }

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  if (lastRow < 2 || lastCol < 1) return { enabled: true, orders: 0, totalGmv: 0, weekGmv: 0, todayGmv: 0, byCode: [] };

  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) { return String(h).trim(); });
  var idx = {
    date: omFindCol_(headers, ['날짜', 'date', '시각']),
    order: omFindCol_(headers, ['주문', 'order', 'name']),
    amount: omFindCol_(headers, ['금액', 'amount', 'total']),
    code: omFindCol_(headers, ['할인', 'discount', 'code', '코드']),
  };
  if (idx.amount === -1 || idx.code === -1) {
    return { enabled: true, error: '주문 탭에서 금액/할인코드 컬럼을 찾지 못했습니다 — 헤더 이름을 확인해주세요.' };
  }

  var startRow = Math.max(2, lastRow - ORDERS_MAX_SCAN_ROWS + 1);
  var values = sheet.getRange(startRow, 1, lastRow - startRow + 1, lastCol).getValues();

  var knownCodes = omKnownAffiliateCoupons_();
  var knownCodeCount = Object.keys(knownCodes).length;

  var todayStr = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');
  var weekAgoMs = Date.now() - 7 * 24 * 60 * 60 * 1000;

  var totalGmv = 0, weekGmv = 0, todayGmv = 0, orders = 0;
  var byCode = {};
  var byDate = {}; // 날짜별 추이 그래프용
  var seenOrders = {}; // 같은 주문이 중복 기록돼도 한 번만 센다
  var unmatchedCodesSeen = {}; // 참고용 — 코드는 있지만 UpPromote엔 없는 것들

  values.forEach(function (row) {
    var code = String(row[idx.code] || '').replace(/`/g, '').trim().toUpperCase();
    if (!code) return;
    if (!knownCodes[code]) { unmatchedCodesSeen[code] = true; return; } // UpPromote에 등록된 어필리에이트 코드가 아니면 제외
    var amount = omNum_(row[idx.amount]);
    if (amount === null) return;

    var orderKey = idx.order !== -1 ? String(row[idx.order] || '').replace(/^#/, '').trim() : '';
    if (orderKey) {
      if (seenOrders[orderKey]) return;
      seenOrders[orderKey] = true;
    }

    var dateStr = idx.date !== -1 ? omDateStr_(row[idx.date], tz) : '';
    var dateMs = dateStr ? Date.parse(dateStr) : NaN;

    orders += 1;
    totalGmv += amount;
    if (!isNaN(dateMs) && dateMs >= weekAgoMs) weekGmv += amount;
    if (dateStr === todayStr) todayGmv += amount;
    if (!byCode[code]) byCode[code] = { gmv: 0, orders: 0 };
    byCode[code].gmv += amount;
    byCode[code].orders += 1;
    if (dateStr) {
      if (!byDate[dateStr]) byDate[dateStr] = { gmv: 0, orders: 0 };
      byDate[dateStr].gmv += amount;
      byDate[dateStr].orders += 1;
    }
  });

  var byCodeList = Object.keys(byCode).map(function (c) {
    return { code: c, gmv: Math.round(byCode[c].gmv * 100) / 100, orders: byCode[c].orders };
  }).sort(function (a, b) { return b.gmv - a.gmv; });

  // 최근 ORDERS_TREND_DAYS일 — 데이터 없는 날도 0으로 채워 그래프가 끊기지 않게 한다.
  var daily = [];
  for (var d = ORDERS_TREND_DAYS - 1; d >= 0; d--) {
    var dt = new Date(Date.now() - d * 24 * 60 * 60 * 1000);
    var ds = Utilities.formatDate(dt, tz, 'yyyy-MM-dd');
    daily.push({ date: ds, gmv: byDate[ds] ? Math.round(byDate[ds].gmv * 100) / 100 : 0, orders: byDate[ds] ? byDate[ds].orders : 0 });
  }

  var note = '';
  if (knownCodeCount === 0) {
    note = 'UpPromote에서 어필리에이트 코드 목록을 가져오지 못해 전부 0으로 보입니다 — Code.gs의 UpPromote 연동을 확인해주세요.';
  } else {
    var unmatchedCount = Object.keys(unmatchedCodesSeen).length;
    if (unmatchedCount > 0) {
      note = '참고: 할인코드가 있었지만 UpPromote에 없어서 제외된 코드 ' + unmatchedCount + '개(웰컴/공용/서프라이즈 코드 등으로 추정)';
    }
  }

  return {
    enabled: true,
    orders: orders,
    totalGmv: Math.round(totalGmv * 100) / 100,
    weekGmv: Math.round(weekGmv * 100) / 100,
    todayGmv: Math.round(todayGmv * 100) / 100,
    byCode: byCodeList,
    daily: daily,
    note: note,
    fetchedAt: Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm'),
  };
}
