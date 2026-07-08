// SNS 팔로워 지표 — 슬랙 #team_글로벌뷰티제품-마케팅 채널에 매일 올라오는
// "Piyonna SNS 팔로워 리포트"(n8n 자동화)와 같은 원본 시트를 직접 읽어
// 홈 대시보드에 그대로 보여준다. Code.gs는 무변경.
var SNS_SPREADSHEET_ID = '1NOoKuyM92HSe3aiQ_vm1If--ljgHebJtmFzdX7t1w0E';

function getSnsFollowerSnapshot() {
  var ss;
  try {
    ss = SpreadsheetApp.openById(SNS_SPREADSHEET_ID);
  } catch (err) {
    return { error: '시트를 열 수 없습니다 (권한 또는 ID 확인): ' + err };
  }

  var sheets = ss.getSheets();
  function findTab(mustHaveAll) {
    for (var i = 0; i < sheets.length; i++) {
      var name = sheets[i].getName().toLowerCase();
      var ok = mustHaveAll.every(function (k) { return name.indexOf(k) !== -1; });
      if (ok) return sheets[i];
    }
    return null;
  }

  // 각 raw data 탭은 날짜순으로 누적되며, 맨 아래가 최신 스냅샷이다.
  // 중간에 결측 행이 섞여 있을 수 있어 아래에서부터 값이 있는 첫 행을 찾는다.
  function lastSnapshot(sheet) {
    if (!sheet) return null;
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    if (lastRow < 2 || lastCol < 1) return null;
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) { return String(h).trim(); });
    var scanFrom = Math.min(lastRow, 2 + 2000); // 안전장치: 과도하게 큰 시트라도 아래쪽만 훑는다
    for (var r = lastRow; r >= 2; r--) {
      var row = sheet.getRange(r, 1, 1, lastCol).getValues()[0];
      var isEmpty = row.every(function (c) { return c === '' || c === null; });
      if (isEmpty) continue;
      var obj = {};
      headers.forEach(function (h, idx) { obj[h] = row[idx]; });
      return obj;
    }
    return null;
  }

  function num(v) {
    if (v === null || v === undefined || v === '') return 0;
    if (typeof v === 'number') return v;
    return Number(String(v).replace(/[^0-9.\-]/g, '')) || 0;
  }
  function pick(obj, keys) {
    for (var i = 0; i < keys.length; i++) if (obj[keys[i]] !== undefined) return obj[keys[i]];
    return '';
  }

  var tabs = {
    partnerTT: findTab(['partner', 'tt']),
    partnerIG: findTab(['partner', 'ig']),
    officialTT: findTab(['official', 'tt']),
    officialIG: findTab(['official', 'ig']),
  };

  var result = { sheetUrl: ss.getUrl() };
  Object.keys(tabs).forEach(function (key) {
    var snap = lastSnapshot(tabs[key]);
    if (!snap) { result[key] = null; return; }
    result[key] = {
      date: pick(snap, ['데이터 수집일', '날짜', 'Date']),
      followers: num(pick(snap, ['팔로워수', '팔로워 수', 'Followers'])),
      delta: num(pick(snap, ['전일 증감', '증감', 'Delta'])),
    };
  });
  return result;
}
