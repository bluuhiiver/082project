// 캠페인 시트 브라우저 — 드라이브에서 "글로벌뷰티" 스프레드시트를 자동 발견해
// 웹앱 안에서 내용을 조회한다. Code.gs와 같은 프로젝트에 "추가 파일"로 넣으며,
// Code.gs는 수정하지 않는다 (전역이 공유되므로 SPREADSHEET_ID 등을 그대로 참조).
// 이 파일을 추가하면 appsscript.json의 oauthScopes에
// "https://www.googleapis.com/auth/drive.readonly" 를 함께 추가해야 한다.

var CAMPAIGN_TITLE_KEYWORD = '글로벌뷰티';
var CAMPAIGN_MAX_SHEETS = 80;
var CAMPAIGN_MAX_ROWS_PER_TAB = 400;

function listCampaignSheets() {
  var files = DriveApp.searchFiles(
    "title contains '" + CAMPAIGN_TITLE_KEYWORD + "' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false"
  );
  var tz = Session.getScriptTimeZone();
  var out = [];
  while (files.hasNext() && out.length < CAMPAIGN_MAX_SHEETS) {
    var f = files.next();
    var id = f.getId();
    // 풀 시트/성과 시트는 이미 전용 페이지가 있으므로 목록에서 제외
    if (typeof SPREADSHEET_ID !== 'undefined' && id === SPREADSHEET_ID) continue;
    if (typeof PERF_SPREADSHEET_ID !== 'undefined' && id === PERF_SPREADSHEET_ID) continue;
    out.push({
      id: id,
      name: f.getName(),
      updated: Utilities.formatDate(f.getLastUpdated(), tz, 'yyyy-MM-dd HH:mm'),
      updatedMs: f.getLastUpdated().getTime(),
      url: f.getUrl(),
    });
  }
  out.sort(function (a, b) { return b.updatedMs - a.updatedMs; });
  return out;
}

function getCampaignSheetData(fileId) {
  var ss;
  try {
    ss = SpreadsheetApp.openById(fileId);
  } catch (err) {
    throw new Error('시트를 열 수 없습니다 (권한 또는 삭제 여부 확인): ' + err);
  }
  // 웹앱 이용자가 임의 ID로 무관한 시트를 조회하지 못하도록 이름 패턴을 강제
  if (ss.getName().indexOf(CAMPAIGN_TITLE_KEYWORD) === -1) {
    throw new Error('허용되지 않은 시트입니다.');
  }

  var tz = Session.getScriptTimeZone();
  var result = { name: ss.getName(), tabs: [] };
  ss.getSheets().forEach(function (sheet) {
    if (sheet.isSheetHidden()) return;
    var tabName = sheet.getName();
    if (tabName.charAt(0) === '_') return; // 캐시/로그성 탭 제외
    var totalRows = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    if (totalRows < 2 || lastCol < 1) return;

    var readRows = Math.min(totalRows, CAMPAIGN_MAX_ROWS_PER_TAB + 1);
    var values = sheet.getRange(1, 1, readRows, lastCol).getValues();
    var headers = values[0].map(function (h) { return String(h).trim(); });

    var rows = [];
    for (var i = 1; i < values.length; i++) {
      var row = values[i];
      var isEmpty = row.every(function (c) { return c === '' || c === null; });
      if (isEmpty) continue;
      rows.push(row.map(function (val) {
        return (val instanceof Date) ? Utilities.formatDate(val, tz, 'yyyy-MM-dd') : val;
      }));
    }
    if (rows.length > 0) {
      result.tabs.push({
        name: tabName,
        headers: headers,
        rows: rows,
        totalRows: totalRows - 1,
        truncated: totalRows - 1 > rows.length,
      });
    }
  });
  return result;
}
