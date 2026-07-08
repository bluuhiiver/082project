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

    var readRows = Math.min(totalRows, CAMPAIGN_MAX_ROWS_PER_TAB + 2);
    var values = sheet.getRange(1, 1, readRows, lastCol).getValues();

    // 2단 헤더 감지: 첫 행이 병합 그룹(틱톡/인스타그램 등)이라 대부분 비어 있고
    // 둘째 행에 실제 필드명이 있으면 "그룹 · 필드"로 합치고 데이터는 3행부터 읽는다.
    var firstRow = values[0].map(function (h) { return String(h).trim(); });
    var secondRow = values.length > 1 ? values[1].map(function (h) { return String(h).trim(); }) : null;
    function countFilled(arr) { return arr.filter(function (v) { return v !== ''; }).length; }
    var headers, dataStart;
    if (secondRow &&
        countFilled(firstRow) <= Math.max(2, Math.floor(firstRow.length * 0.5)) &&
        countFilled(secondRow) > countFilled(firstRow)) {
      var group = '';
      headers = secondRow.map(function (f, idx) {
        if (firstRow[idx]) group = firstRow[idx];
        if (!f) return group;
        return (group && group !== f) ? (group + ' · ' + f) : f;
      });
      dataStart = 2;
    } else {
      headers = firstRow;
      dataStart = 1;
    }

    var rows = [];
    for (var i = dataStart; i < values.length; i++) {
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
        totalRows: totalRows - dataStart,
        truncated: totalRows - dataStart > rows.length,
      });
    }
  });
  return result;
}

// 캠페인 콘텐츠 일정 — 각 캠페인 시트의 UploadDate류 컬럼만 훑어 날짜별
// 업로드 건수를 집계한다(전체 행을 안 읽고 날짜 열만 보는 가벼운 스캔).
// 시트/행 수에 안전장치를 둬 실행 시간을 보호한다.
var TIMELINE_MAX_SHEETS = 15;
var TIMELINE_MAX_ROWS_PER_TAB = 800;

function getCampaignTimeline() {
  var allFiles = listCampaignSheets();
  var files = allFiles.slice(0, TIMELINE_MAX_SHEETS);
  var entries = [];
  var tz = Session.getScriptTimeZone();

  files.forEach(function (f) {
    var ss;
    try {
      ss = SpreadsheetApp.openById(f.id);
    } catch (err) {
      return; // 접근 불가한 시트는 건너뜀
    }
    ss.getSheets().forEach(function (sheet) {
      if (sheet.isSheetHidden()) return;
      var tabName = sheet.getName();
      if (tabName.charAt(0) === '_') return;
      var lastRow = sheet.getLastRow();
      var lastCol = sheet.getLastColumn();
      if (lastRow < 2 || lastCol < 1) return;

      var headerRow = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) { return String(h).trim(); });
      var dateIdx = headerRow.findIndex(function (h) { return /upload\s*date|업로드일|게시일|데이터\s*수집일/i.test(h); });
      if (dateIdx === -1) return;

      var readRows = Math.min(lastRow - 1, TIMELINE_MAX_ROWS_PER_TAB);
      var values = sheet.getRange(2, dateIdx + 1, readRows, 1).getValues();
      var counts = {};
      values.forEach(function (r) {
        var v = r[0];
        if (!v) return;
        var dateStr = (v instanceof Date) ? Utilities.formatDate(v, tz, 'yyyy-MM-dd') : String(v).trim().slice(0, 10);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return;
        counts[dateStr] = (counts[dateStr] || 0) + 1;
      });
      Object.keys(counts).forEach(function (d) {
        entries.push({ date: d, campaign: f.name.replace('[글로벌뷰티] ', ''), tab: tabName, count: counts[d] });
      });
    });
  });

  entries.sort(function (a, b) { return b.date.localeCompare(a.date); });
  return { entries: entries, scannedSheets: files.length, truncatedSheets: allFiles.length > files.length };
}
