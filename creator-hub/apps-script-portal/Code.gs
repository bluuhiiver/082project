// Piyonna Creator Hub — 크리에이터 본인용 포털 (외부 공개용 웹앱)
// 데이터는 각 크리에이터의 브라우저(localStorage)에만 저장되며, 서버에는
// 아무것도 기록하지 않는다. 실성과 연동은 추후 UpPromote 프록시 함수를
// 여기에 추가해 확장한다.
function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle('Piyonna Creator Hub');
}
