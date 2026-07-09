// 어필리에이트 추적 주문(UpPromote 리퍼럴 × Shopify 주문 라인아이템)에서 계산한
// "인기 제품" 결과를 저장/조회한다. 실제 매칭·집계는 프런트(Index.html)에서
// 업로드한 두 파일(Shopify 주문 CSV, UpPromote 리퍼럴 CSV/XLSX)로 브라우저가
// 직접 계산하고, 여기서는 그 결과(제품명/수량/주문건수 요약)만 저장한다.
// 원본 파일(고객 이메일·주소 등 PII 포함)은 서버로 전송되지 않는다.
// Code.gs는 무변경 — SPREADSHEET_ID/requireAuth/logEdit을 그대로 재사용.

var TOP_PRODUCTS_TAB_NAME = '_인기제품';

function ensureTopProductsSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(TOP_PRODUCTS_TAB_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(TOP_PRODUCTS_TAB_NAME);
    sheet.hideSheet();
  }
  return sheet;
}

function getTopProducts() {
  var sheet = ensureTopProductsSheet_();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return { items: [], meta: null };

  var metaRaw = sheet.getRange(1, 1).getValue();
  var meta = null;
  try { meta = metaRaw ? JSON.parse(metaRaw) : null; } catch (e) { meta = null; }

  if (lastRow < 3) return { items: [], meta: meta };
  var values = sheet.getRange(3, 1, lastRow - 2, 3).getValues();
  var items = values
    .filter(function (r) { return String(r[0] || '').trim() !== ''; })
    .map(function (r) { return { title: r[0], qty: Number(r[1]) || 0, orders: Number(r[2]) || 0 }; });
  return { items: items, meta: meta };
}

function saveTopProducts(items, meta, pw, editorName) {
  requireAuth(pw);
  if (!items || !items.length) throw new Error('저장할 항목이 없습니다.');

  var sheet = ensureTopProductsSheet_();
  sheet.clear();
  var tz = Session.getScriptTimeZone();
  var fullMeta = Object.assign({}, meta, {
    updatedAt: Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm'),
    updatedBy: editorName,
  });
  sheet.getRange(1, 1).setValue(JSON.stringify(fullMeta));
  sheet.getRange(2, 1, 1, 3).setValues([['제품명', '수량', '주문건수']]);
  sheet.getRange(3, 1, items.length, 3).setValues(items.map(function (i) {
    return [String(i.title || ''), Number(i.qty) || 0, Number(i.orders) || 0];
  }));

  logEdit(editorName, TOP_PRODUCTS_TAB_NAME, 0, '(인기 제품 갱신)', '', items.length + '개 제품 · 매칭 주문 ' + (meta && meta.matchedOrders || 0) + '건');
  return getTopProducts();
}
