// TikTok 해시태그 / Discord 멤버 지표 — 크롤러(팀 자체 앱)가 슬랙에 올리는
// 그 값을 SNS 팔로워 리포트처럼 raw data 시트에도 한 줄씩 쌓아주면, 여기서
// 시트를 직접 읽는다. 슬랙 앱·봇 토큰이 전혀 필요 없다. Code.gs는 무변경.
//
// 크롤러가 써줘야 하는 형식 (같은 SNS raw data 스프레드시트 안에 새 탭 2개):
//   탭 "tiktok_hashtag raw data": 날짜 | 해시태그 | videoCount | 신규
//     (해시태그 하나당 한 줄, 매일 아래로 누적)
//   탭 "discord raw data": 날짜 | 총 멤버 | 신규 가입
//     (하루 한 줄씩 누적)
// 탭 이름은 'hashtag'(또는 '해시태그') / 'discord'가 포함돼 있으면 자동 인식,
// 컬럼도 헤더 이름으로 찾으므로 순서는 상관없다.
var UGC_SPREADSHEET_ID = '1NOoKuyM92HSe3aiQ_vm1If--ljgHebJtmFzdX7t1w0E';
var UGC_MAX_SCAN_ROWS = 500; // 최근 행만 훑는 안전장치

function ugcNum_(v) {
  if (v === null || v === undefined || v === '') return null;
  if (typeof v === 'number') return v;
  var n = Number(String(v).replace(/[^0-9.\-]/g, ''));
  return isNaN(n) ? null : n;
}

function ugcDateStr_(v, tz) {
  if (v instanceof Date) return Utilities.formatDate(v, tz, 'yyyy-MM-dd');
  return String(v || '').trim().slice(0, 10);
}

function ugcFindCol_(headers, keywordSets) {
  // keywordSets: [['날짜','date'], ...] — 각 세트의 키워드 중 하나라도 포함되면 매칭
  for (var s = 0; s < keywordSets.length; s++) {
    for (var i = 0; i < headers.length; i++) {
      var h = String(headers[i]).toLowerCase();
      if (keywordSets[s].some(function (k) { return h.indexOf(k) !== -1; })) return i;
    }
  }
  return -1;
}

function ugcReadTab_(ss, nameKeywords) {
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var name = sheets[i].getName().toLowerCase();
    if (nameKeywords.some(function (k) { return name.indexOf(k) !== -1; })) {
      var sheet = sheets[i];
      var lastRow = sheet.getLastRow();
      var lastCol = sheet.getLastColumn();
      if (lastRow < 2 || lastCol < 1) return { headers: [], rows: [] };
      var startRow = Math.max(2, lastRow - UGC_MAX_SCAN_ROWS + 1);
      return {
        headers: sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) { return String(h).trim(); }),
        rows: sheet.getRange(startRow, 1, lastRow - startRow + 1, lastCol).getValues(),
      };
    }
  }
  return null; // 탭 없음
}

function getSlackDailyMetrics() {
  var ss;
  try {
    ss = SpreadsheetApp.openById(UGC_SPREADSHEET_ID);
  } catch (err) {
    return { enabled: true, error: '시트를 열 수 없습니다 (권한 또는 ID 확인): ' + err };
  }
  var tz = Session.getScriptTimeZone();

  var tiktokTab = ugcReadTab_(ss, ['hashtag', '해시태그']);
  var discordTab = ugcReadTab_(ss, ['discord', '디스코드']);

  if (!tiktokTab && !discordTab) {
    return {
      enabled: true,
      error: '크롤러 기록 탭이 아직 없습니다 — SNS raw data 시트에 "tiktok_hashtag raw data" / "discord raw data" 탭을 만들고 크롤러가 매일 한 줄씩 쓰게 해주세요.',
    };
  }

  // --- TikTok: 가장 최근 날짜의 해시태그별 행들을 모은다 ---
  var tiktok = null;
  if (tiktokTab && tiktokTab.rows.length) {
    var tIdx = {
      date: ugcFindCol_(tiktokTab.headers, [['날짜', 'date']]),
      tag: ugcFindCol_(tiktokTab.headers, [['해시태그', 'hashtag', 'tag']]),
      video: ugcFindCol_(tiktokTab.headers, [['videocount', 'video', '영상']]),
      fresh: ugcFindCol_(tiktokTab.headers, [['신규', 'new']]),
    };
    if (tIdx.date !== -1 && tIdx.tag !== -1) {
      var latestDate = '';
      tiktokTab.rows.forEach(function (r) {
        var d = ugcDateStr_(r[tIdx.date], tz);
        if (d && d > latestDate) latestDate = d;
      });
      var tags = {};
      tiktokTab.rows.forEach(function (r) {
        if (ugcDateStr_(r[tIdx.date], tz) !== latestDate) return;
        var tag = String(r[tIdx.tag] || '').replace(/^#/, '').trim();
        if (!tag) return;
        tags[tag] = {
          videoCount: tIdx.video !== -1 ? ugcNum_(r[tIdx.video]) : null,
          newYesterday: tIdx.fresh !== -1 ? ugcNum_(r[tIdx.fresh]) : null,
        };
      });
      if (Object.keys(tags).length) tiktok = { date: latestDate, tags: tags };
    }
  }

  // --- Discord: 맨 아래(최신) 값이 있는 행 하나 ---
  var discord = null;
  if (discordTab && discordTab.rows.length) {
    var dIdx = {
      date: ugcFindCol_(discordTab.headers, [['날짜', 'date']]),
      total: ugcFindCol_(discordTab.headers, [['총 멤버', '총멤버', 'total', '멤버']]),
      fresh: ugcFindCol_(discordTab.headers, [['신규', 'new']]),
    };
    if (dIdx.total !== -1) {
      for (var r = discordTab.rows.length - 1; r >= 0; r--) {
        var row = discordTab.rows[r];
        var total = ugcNum_(row[dIdx.total]);
        if (total === null) continue;
        discord = {
          date: dIdx.date !== -1 ? ugcDateStr_(row[dIdx.date], tz) : '',
          total: total,
          newToday: dIdx.fresh !== -1 ? ugcNum_(row[dIdx.fresh]) : null,
        };
        break;
      }
    }
  }

  return {
    enabled: true,
    tiktok: tiktok,
    discord: discord,
    fetchedAt: Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd HH:mm'),
  };
}
