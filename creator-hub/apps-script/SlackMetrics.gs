// 슬랙 #team_글로벌뷰티제품-마케팅 채널에 봇이 직접 올리는 "TikTok 해시태그
// 리포트"와 "Discord 멤버 현황" 메시지를 그대로 읽어와 파싱한다. 이 두 지표는
// 별도 추적 시트 없이 크롤링 → 슬랙 게시만 되는 구조라, 슬랙 API로 채널
// 히스토리를 읽어 텍스트에서 숫자를 뽑아낸다. Code.gs는 무변경.
var SLACK_TOKEN_PROP = 'SLACK_BOT_TOKEN';
var SLACK_CHANNEL_ID = 'C0A6ZGSNJET'; // #team_글로벌뷰티제품-마케팅
var SLACK_HISTORY_LIMIT = 150;

// --- 최초 1회, Apps Script 편집기에서 이 함수를 직접 실행해 토큰을 등록한다 ---
// 1) 아래 token 값을 발급받은 xoxb- 토큰으로 바꾼다
// 2) 상단 함수 선택 드롭다운에서 setSlackToken 선택 후 ▶ 실행
// 3) 실행 로그에 "저장 완료"가 뜨면 성공 — 이후 아래 token 값은 다시 지우고 저장해도 무방
//    (Script Properties에 안전하게 보관되며, 이 파일에 평문으로 남겨둘 필요 없음)
function setSlackToken() {
  var token = 'xoxb-여기에-발급받은-토큰-붙여넣기';
  if (token.indexOf('xoxb-') !== 0 || token.indexOf('여기에') !== -1) {
    throw new Error('token 값을 실제 발급받은 슬랙 봇 토큰으로 바꾼 뒤 다시 실행하세요.');
  }
  PropertiesService.getScriptProperties().setProperty(SLACK_TOKEN_PROP, token);
  Logger.log('Slack 토큰 저장 완료.');
}

function parseTikTokHashtagMessage(text) {
  var dateMatch = text.match(/TikTok 해시태그 리포트 \(([\d-]+)\)/);
  var tags = {};
  // "#태그명" 으로 시작하는 섹션 단위로 분리 (첫 조각은 헤더이므로 버림)
  var sections = text.split(/\n(?=#[^\s#]+)/).slice(1);
  sections.forEach(function (section) {
    var tagMatch = section.match(/^#([^\s\n]+)/);
    if (!tagMatch) return;
    var videoMatch = section.match(/총\s*videoCount[:：]\s*([\d,]+)/);
    var newMatch = section.match(/신규\s*\(어제\)[:：]\s*([\d,]+)/);
    tags[tagMatch[1]] = {
      videoCount: videoMatch ? Number(videoMatch[1].replace(/,/g, '')) : null,
      newYesterday: newMatch ? Number(newMatch[1].replace(/,/g, '')) : null,
    };
  });
  return { date: dateMatch ? dateMatch[1] : '', tags: tags };
}

function parseDiscordStatusMessage(text) {
  var dateMatch = text.match(/Discord 멤버 현황 \(([\d-]+)\)/);
  var totalMatch = text.match(/총\s*멤버[:：]\s*([\d,]+)/);
  var newMatch = text.match(/신규\s*가입[:：]\s*\+?([\d,]+)/);
  return {
    date: dateMatch ? dateMatch[1] : '',
    total: totalMatch ? Number(totalMatch[1].replace(/,/g, '')) : null,
    newToday: newMatch ? Number(newMatch[1].replace(/,/g, '')) : null,
  };
}

function getSlackDailyMetrics() {
  var token = PropertiesService.getScriptProperties().getProperty(SLACK_TOKEN_PROP);
  if (!token) return { enabled: false };

  var resp;
  try {
    resp = UrlFetchApp.fetch(
      'https://slack.com/api/conversations.history?channel=' + SLACK_CHANNEL_ID + '&limit=' + SLACK_HISTORY_LIMIT,
      { headers: { Authorization: 'Bearer ' + token }, muteHttpExceptions: true }
    );
  } catch (err) {
    return { enabled: true, error: '슬랙 호출 실패: ' + err };
  }

  var body;
  try {
    body = JSON.parse(resp.getContentText());
  } catch (err) {
    return { enabled: true, error: '슬랙 응답을 해석하지 못했습니다.' };
  }
  if (!body.ok) {
    var hint = body.error === 'not_in_channel' ? ' — 슬랙에서 해당 채널에 봇을 초대해주세요 (/invite @봇이름)' : '';
    return { enabled: true, error: 'Slack API 오류: ' + body.error + hint };
  }

  var messages = body.messages || [];
  var tiktok = null, discord = null;
  for (var i = 0; i < messages.length; i++) {
    var text = messages[i].text || '';
    if (!tiktok && text.indexOf('TikTok 해시태그 리포트') !== -1) tiktok = parseTikTokHashtagMessage(text);
    if (!discord && text.indexOf('Discord 멤버 현황') !== -1) discord = parseDiscordStatusMessage(text);
    if (tiktok && discord) break;
  }

  return {
    enabled: true,
    tiktok: tiktok,
    discord: discord,
    fetchedAt: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm'),
  };
}
