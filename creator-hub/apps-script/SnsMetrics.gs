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
  // accountKw(예: 'partner'/'official')는 반드시 포함해야 하고, platformKwAlts는
  // 그 중 하나만 포함되면 매칭 — 탭 이름이 'tt'/'ig' 같은 축약형이든
  // 'tiktok'/'instagram' 같은 전체 단어든 모두 잡히게 한다.
  function findTab(accountKw, platformKwAlts) {
    for (var i = 0; i < sheets.length; i++) {
      var name = sheets[i].getName().toLowerCase();
      if (name.indexOf(accountKw) === -1) continue;
      var ok = platformKwAlts.some(function (k) { return name.indexOf(k) !== -1; });
      if (ok) return sheets[i];
    }
    return null;
  }

  // 각 raw data 탭은 날짜순으로 누적되며, 맨 아래가 최신 스냅샷이다.
  // 중간에 결측 행이 섞여 있을 수 있어 아래에서부터 값이 있는 행을 순서대로 모은다.
  // 홈 대시보드 미니 추세 그래프용으로 최근 SNS_TREND_DAYS일치를 함께 반환한다.
  // 한 줄씩 개별 API 호출(getRange 반복)로 읽으면 시트가 커질수록 급격히 느려져
  // 사실상 멈춘 것처럼 보인다 — 필요한 범위를 한 번에 통째로 읽는다.
  var SNS_TREND_DAYS = 14;
  // 안전장치: 시트 끝에 서식만 남은 빈 행이 수백~수천 개 붙어있는 경우가 있어
  // (실제 데이터는 130행 정도인데 lastRow가 1000행 넘게 잡히는 식) 너무 작게
  // 잡으면 그 빈 꼬리 안에서만 찾다가 못 찾는다 — 여유있게 잡아둔다.
  var SNS_SCAN_ROWS = 3000;
  function lastSnapshots(sheet, maxCount) {
    if (!sheet) return [];
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    if (lastRow < 2 || lastCol < 1) return [];
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) { return String(h).trim(); });
    var startRow = Math.max(2, lastRow - SNS_SCAN_ROWS + 1);
    var values = sheet.getRange(startRow, 1, lastRow - startRow + 1, lastCol).getValues();
    var out = [];
    for (var i = values.length - 1; i >= 0 && out.length < maxCount; i--) {
      var row = values[i];
      var isEmpty = row.every(function (c) { return c === '' || c === null; });
      if (isEmpty) continue;
      var obj = {};
      headers.forEach(function (h, idx) { obj[h] = row[idx]; });
      out.push(obj);
    }
    return out.reverse(); // 날짜 오름차순으로 반환
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

  var TT_KW = ['tiktok', 'tik tok', 'tt'];
  var IG_KW = ['instagram', 'insta', 'ig'];
  var tabs = {
    partnerTT: findTab('partner', TT_KW),
    partnerIG: findTab('partner', IG_KW),
    officialTT: findTab('official', TT_KW),
    officialIG: findTab('official', IG_KW),
  };

  var result = { sheetUrl: ss.getUrl() };
  Object.keys(tabs).forEach(function (key) {
    var snaps = lastSnapshots(tabs[key], SNS_TREND_DAYS);
    if (!snaps.length) { result[key] = null; return; }
    var latest = snaps[snaps.length - 1];
    result[key] = {
      date: pick(latest, ['데이터 수집일', '날짜', 'Date']),
      followers: num(pick(latest, ['팔로워수', '팔로워 수', 'Followers'])),
      delta: num(pick(latest, ['전일 증감', '증감', 'Delta'])),
      trend: snaps.map(function (s) { return num(pick(s, ['팔로워수', '팔로워 수', 'Followers'])); }),
    };
  });
  return result;
}
