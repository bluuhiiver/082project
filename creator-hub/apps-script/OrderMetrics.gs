// 추정 어필리에이트 GMV — 주문 알림 봇(#auto_order_noti_piyonna에 쏘는 팀 자체
// 앱)이 주문을 raw data 시트에도 한 줄씩 쌓아주면, 할인코드가 붙은 주문 중
// 공용 프로모 코드가 아닌 것(= 크리에이터 개인 코드로 추정)을 집계한다.
// UpPromote가 추적하지 못한 코드 주문까지 잡는 "추정치"라서, 확정 수치인
// UpPromote GMV와 별도로 표기한다. Code.gs는 무변경.
//
// 크롤러가 써줘야 하는 형식 (SNS raw data와 같은 스프레드시트에 새 탭 1개):
//   탭 "orders raw data": 날짜 | 주문번호 | 금액 | 할인코드
//   (주문 하나당 한 줄, 할인코드 없으면 빈칸. 컬럼 순서 무관 — 헤더로 자동 인식)
var ORDERS_SPREADSHEET_ID = '1NOoKuyM92HSe3aiQ_vm1If--ljgHebJtmFzdX7t1w0E';
var ORDERS_MAX_SCAN_ROWS = 3000;

// 공용 프로모 코드 — 어필리에이트 개인 코드가 아닌 사이트 전체 할인.
// 새 공용 코드를 만들면 여기에만 추가하면 된다 (대소문자 무관).
var GENERAL_PROMO_CODES = ['SUMMER26'];

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

  var generalSet = {};
  GENERAL_PROMO_CODES.forEach(function (c) { generalSet[String(c).toUpperCase().trim()] = true; });

  var todayStr = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');
  var weekAgoMs = Date.now() - 7 * 24 * 60 * 60 * 1000;

  var totalGmv = 0, weekGmv = 0, todayGmv = 0, orders = 0;
  var byCode = {};
  var seenOrders = {}; // 같은 주문이 중복 기록돼도 한 번만 센다

  values.forEach(function (row) {
    var code = String(row[idx.code] || '').replace(/`/g, '').trim().toUpperCase();
    if (!code || generalSet[code]) return;
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
  });

  var byCodeList = Object.keys(byCode).map(function (c) {
    return { code: c, gmv: Math.round(byCode[c].gmv * 100) / 100, orders: byCode[c].orders };
  }).sort(function (a, b) { return b.gmv - a.gmv; });

  return {
    enabled: true,
    orders: orders,
    totalGmv: Math.round(totalGmv * 100) / 100,
    weekGmv: Math.round(weekGmv * 100) / 100,
    todayGmv: Math.round(todayGmv * 100) / 100,
    byCode: byCodeList,
    fetchedAt: Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm'),
  };
}
