// 팀 업무 일정(마감일·회의·캠페인 오픈 등) — 크리에이터 풀과 같은
// 스프레드시트(SPREADSHEET_ID, Code.gs에 정의됨) 안에 숨겨진 전용 탭을 두고
// 여기서 읽고 쓴다. Code.gs의 EDIT_PASSWORD/requireAuth/logEdit을 그대로
// 재사용하므로(Apps Script는 프로젝트 내 모든 .gs 파일이 전역을 공유한다)
// Code.gs는 무변경이다.
var SCHEDULE_TAB_NAME = '_일정';
var SCHEDULE_HEADERS = ['날짜', '제목', '유형', '담당자', '메모', '상태'];

function ensureScheduleSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SCHEDULE_TAB_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SCHEDULE_TAB_NAME);
    sheet.appendRow(SCHEDULE_HEADERS);
    sheet.hideSheet();
  }
  return sheet;
}

function getTeamSchedule() {
  var sheet = ensureScheduleSheet_();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return { items: [] };

  var tz = Session.getScriptTimeZone();
  var values = sheet.getRange(2, 1, lastRow - 1, SCHEDULE_HEADERS.length).getValues();
  var items = [];
  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var isEmpty = row.every(function (c) { return c === '' || c === null; });
    if (isEmpty) continue;
    var dateVal = row[0];
    items.push({
      rowNum: i + 2,
      date: (dateVal instanceof Date) ? Utilities.formatDate(dateVal, tz, 'yyyy-MM-dd') : String(dateVal || ''),
      title: row[1] || '',
      type: row[2] || '',
      owner: row[3] || '',
      note: row[4] || '',
      status: row[5] || '예정',
    });
  }
  items.sort(function (a, b) { return a.date.localeCompare(b.date); });
  return { items: items };
}

function addScheduleItem(date, title, type, owner, note, pw, editorName) {
  requireAuth(pw);
  if (!date || !title) throw new Error('날짜와 제목은 필수입니다.');
  var sheet = ensureScheduleSheet_();
  sheet.appendRow([date, title, type || '', owner || '', note || '', '예정']);
  logEdit(editorName, SCHEDULE_TAB_NAME, sheet.getLastRow(), '(신규 일정)', '', title);
  return getTeamSchedule();
}

function updateScheduleStatus(rowNum, status, pw, editorName) {
  requireAuth(pw);
  var sheet = ensureScheduleSheet_();
  var oldVal = sheet.getRange(rowNum, 6).getValue();
  sheet.getRange(rowNum, 6).setValue(status);
  logEdit(editorName, SCHEDULE_TAB_NAME, rowNum, '상태', oldVal, status);
  return getTeamSchedule();
}

function deleteScheduleItem(rowNum, pw, editorName) {
  requireAuth(pw);
  var sheet = ensureScheduleSheet_();
  var title = sheet.getRange(rowNum, 2).getValue();
  sheet.deleteRow(rowNum);
  logEdit(editorName, SCHEDULE_TAB_NAME, rowNum, '(삭제)', title, '');
  return getTeamSchedule();
}
