/* Peonara Creator Hub — shared data layer.
   Runs entirely client-side (localStorage) so it works as a static site
   (GitHub Pages) with no backend. Real deployment would swap the
   localStorage calls in this file for API calls to a small server that
   talks to Shopify + UpPromote directly — see README.md. */

const PH = (() => {
  const KEYS = {
    creators: 'ph_creators',
    performance: 'ph_performance',
    importLog: 'ph_import_log',
    currentUser: 'ph_current_user',
    commissionRate: 'ph_commission_rate',
  };

  const ACADEMY_MODULES = [
    {
      id: 'm1',
      title: '1강 · 어필리에이트, 정확히 뭘 하는 거예요?',
      summary: '링크/할인코드가 어떻게 나의 판매로 연결되고 커미션이 되는지 이해합니다.',
      content: [
        '어필리에이트 링크·전용 할인코드로 발생한 주문만 나의 성과로 집계됩니다.',
        '틱톡샵처럼 앱 안에서 바로 결제되는 구조가 아니기 때문에, "코드 기억 → 사이트 방문 → 결제"까지 시청자가 이탈하지 않게 안내하는 것이 핵심입니다.',
        '콘텐츠 마지막에 코드를 한 번 더, 캡션과 고정 댓글에도 반복 노출하세요.',
      ],
    },
    {
      id: 'm2',
      title: '2강 · 클릭을 주문으로 바꾸는 CTA',
      summary: '"코드 써주세요" 대신 어떻게 말해야 실제로 구매까지 이어지는지 배웁니다.',
      content: [
        '"이 세럼 3주 써보고 유분기 진짜 줄었어요, 제 코드로 15% 할인돼요" 처럼 후기+혜택을 한 문장에 붙이세요.',
        '릴스/쇼츠는 시작 3초 안에 결과(Before/After)를, 마지막 3초에 코드를 노출하는 구조가 전환이 가장 잘 나옵니다.',
        '프로필 링크(링크인바이오)에 내 코드가 적용된 링크를 항상 최신 상태로 유지하세요.',
      ],
    },
    {
      id: 'm3',
      title: '3강 · 유럽 광고 표시 규정 지키기',
      summary: '국가별 협찬/광고 표시 의무를 지키지 않으면 계정 제재나 법적 문제가 생길 수 있어요.',
      content: [
        '커미션을 받는 콘텐츠는 반드시 "광고" 또는 "#ad", "#소정의수수료" 등 명확한 표시가 필요합니다(국가별 문구는 리소스 페이지 참고).',
        '독일·프랑스는 표시 규정이 특히 엄격합니다. 애매하면 캡션 맨 앞에 표시하세요.',
        '플랫폼 자체 유료광고 라벨(예: 인스타그램의 "유료 파트너십") 기능도 함께 켜두면 안전합니다.',
      ],
    },
    {
      id: 'm4',
      title: '4강 · K-뷰티 콘텐츠, 이렇게 만들면 반응이 좋아요',
      summary: '성분/루틴 정보를 지루하지 않게 전달하는 포맷을 소개합니다.',
      content: [
        '"성분 하나 설명 + 내 피부 타입 반응" 조합이 저관여 시청자도 끝까지 보게 만듭니다.',
        'GRWM(Get Ready With Me) 루틴 안에 자연스럽게 제품을 녹이면 광고 느낌이 줄어듭니다.',
        '피부 타입/톤이 비슷한 팔로워를 겨냥한 문구("지성 피부라면")가 전환율을 높입니다.',
      ],
    },
    {
      id: 'm5',
      title: '5강 · 내 성과 확인하고 다음 단계 준비하기',
      summary: '대시보드에서 무엇을 보고, 어떻게 하면 다음 티어로 올라가는지 배웁니다.',
      content: [
        '클릭 수와 주문 수를 함께 보세요. 클릭은 많은데 주문이 없다면 CTA나 코드 노출 방식을 바꿔볼 시점입니다.',
        '티어는 자동으로 계산되며, 승급하면 커미션율/리워드가 즉시 올라갑니다.',
        '막히는 부분은 리더보드 상위 크리에이터의 공개 콘텐츠를 참고하세요.',
      ],
    },
  ];

  const MISSIONS = [
    { id: 'welcome', title: '웰컴 미션: 프로필 완성 + 1강 수료', description: '프로필 정보를 채우고 아카데미 1강을 수료하면 즉시 보너스를 드려요.', reward: '스타터 뱃지 + 소액 리워드' },
    { id: 'first-content', title: '첫 콘텐츠 업로드', description: '내 코드가 포함된 콘텐츠를 1개 업로드하세요.', reward: '콘텐츠 크리에이터 뱃지' },
    { id: 'reels-2', title: '이번 달 릴스/쇼츠 2개', description: '이번 달 안에 릴스 또는 쇼츠 2개를 업로드하세요.', reward: '커미션 부스트 +2%p (해당 월)' },
    { id: 'new-product', title: '신제품 리뷰 콘텐츠', description: '이번 시즌 신제품 중 1개를 리뷰해주세요.', reward: 'PR 키트 우선 발송' },
    { id: 'click-50', title: '링크 클릭 50회 달성', description: '내 링크/코드로 50회 클릭을 달성하세요.', reward: 'Rising Star 후보 등록' },
  ];

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.error('PH.read failed', key, e);
      return fallback;
    }
  }
  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function normEmail(e) {
    return (e || '').trim().toLowerCase();
  }

  function getCreators() {
    return read(KEYS.creators, {});
  }
  function saveCreators(obj) {
    write(KEYS.creators, obj);
  }
  function getPerformance() {
    return read(KEYS.performance, {});
  }
  function savePerformance(obj) {
    write(KEYS.performance, obj);
  }
  function getImportLog() {
    return read(KEYS.importLog, []);
  }
  function pushImportLog(entry) {
    const log = getImportLog();
    log.unshift({ ts: entry.ts || new Date().toISOString(), message: entry.message });
    write(KEYS.importLog, log.slice(0, 50));
  }
  function getCommissionRate() {
    return read(KEYS.commissionRate, 0.15);
  }
  function setCommissionRate(rate) {
    write(KEYS.commissionRate, rate);
  }

  function upsertCreator(email, patch) {
    const creators = getCreators();
    const key = normEmail(email);
    const existing = creators[key] || {
      email: key,
      name: '',
      country: '',
      language: '',
      couponCode: '',
      joinedDate: null,
      academyProgress: [],
      missions: {},
      tierOverride: null,
    };
    creators[key] = Object.assign({}, existing, patch);
    saveCreators(creators);
    return creators[key];
  }

  function getCreator(email) {
    return getCreators()[normEmail(email)] || null;
  }

  function getCurrentUser() {
    return read(KEYS.currentUser, null);
  }
  function setCurrentUser(email) {
    write(KEYS.currentUser, normEmail(email));
  }
  function logout() {
    localStorage.removeItem(KEYS.currentUser);
  }

  /* ---------- CSV parsing (RFC4180-ish, handles quoted commas) ---------- */
  function parseCSV(text) {
    const rows = [];
    let row = [];
    let field = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; }
          else inQuotes = false;
        } else field += c;
      } else {
        if (c === '"') inQuotes = true;
        else if (c === ',') { row.push(field); field = ''; }
        else if (c === '\n' || c === '\r') {
          if (c === '\r' && text[i + 1] === '\n') i++;
          row.push(field); field = '';
          if (row.some((v) => v !== '')) rows.push(row);
          row = [];
        } else field += c;
      }
    }
    if (field !== '' || row.length) { row.push(field); rows.push(row); }
    if (!rows.length) return { headers: [], records: [] };
    const headers = rows[0].map((h) => h.trim().toLowerCase());
    const records = rows.slice(1).map((r) => {
      const obj = {};
      headers.forEach((h, idx) => { obj[h] = (r[idx] || '').trim(); });
      return obj;
    });
    return { headers, records };
  }

  function findField(record, candidates) {
    for (const c of candidates) {
      if (record[c] !== undefined && record[c] !== '') return record[c];
    }
    return '';
  }

  /* Import a Shopify order export CSV. Aggregates revenue/order-count by
     discount code, since coupon-code attribution is how affiliate sales
     are tracked without a TikTok Shop-style in-app checkout. */
  function importShopifyOrders(text) {
    const { records } = parseCSV(text);
    const byCode = {};
    let matchedRows = 0;
    records.forEach((r) => {
      const code = findField(r, ['discount code', 'discount codes', 'coupon', 'coupon code']).toLowerCase();
      const total = parseFloat(findField(r, ['total', 'subtotal', 'amount']).replace(/[^0-9.\-]/g, '')) || 0;
      if (!code) return;
      matchedRows++;
      if (!byCode[code]) byCode[code] = { orders: 0, revenue: 0 };
      byCode[code].orders += 1;
      byCode[code].revenue += total;
    });
    pushImportLog({ message: `Shopify 주문 CSV: ${records.length}행 파싱, 할인코드 있는 주문 ${matchedRows}건, 고유 코드 ${Object.keys(byCode).length}개` });
    return byCode;
  }

  /* Import an UpPromote affiliate export CSV: email, name, country,
     coupon code, clicks, joined date. If no Shopify file was provided in
     this pass (hasShopifyData=false), previously-recorded orders/revenue
     are preserved instead of being reset to zero. */
  function importUpPromote(text, shopifyByCode, hasShopifyData) {
    const { records } = parseCSV(text);
    const creators = getCreators();
    const perf = getPerformance();
    let created = 0, updated = 0;
    records.forEach((r) => {
      const email = normEmail(findField(r, ['affiliate email', 'email']));
      if (!email) return;
      const name = findField(r, ['affiliate name', 'name']);
      const country = findField(r, ['country']);
      const couponCode = findField(r, ['coupon code', 'code', 'discount code']).toLowerCase();
      const clicks = parseInt(findField(r, ['clicks']) || '0', 10) || 0;
      const joinedDate = findField(r, ['joined date', 'joined', 'created at']) || null;

      const isNew = !creators[email];
      upsertCreator(email, {
        name: name || (creators[email] && creators[email].name) || '',
        country: country || (creators[email] && creators[email].country) || '',
        couponCode: couponCode || (creators[email] && creators[email].couponCode) || '',
        joinedDate: joinedDate || (creators[email] && creators[email].joinedDate) || null,
      });
      isNew ? created++ : updated++;

      const previous = perf[email] || { orders: 0, revenue: 0 };
      const sales = hasShopifyData
        ? (shopifyByCode[couponCode] || { orders: 0, revenue: 0 })
        : { orders: previous.orders, revenue: previous.revenue };
      perf[email] = {
        clicks,
        orders: sales.orders,
        revenue: Math.round(sales.revenue * 100) / 100,
        lastActivity: joinedDate,
      };
    });
    savePerformance(perf);
    pushImportLog({ message: `UpPromote CSV: ${records.length}명 처리 (신규 ${created}, 갱신 ${updated})` });
    return { created, updated, total: records.length };
  }

  /* ---------- Tier computation ---------- */
  function percentile(values, p) {
    if (!values.length) return Infinity;
    const sorted = [...values].sort((a, b) => a - b);
    const idx = Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length));
    return sorted[idx];
  }

  function daysSince(dateStr) {
    if (!dateStr) return 0;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 0;
    return Math.floor((Date.now() - d.getTime()) / 86400000);
  }

  function computeAllTiers() {
    const creators = getCreators();
    const perf = getPerformance();
    const emails = Object.keys(creators);

    const revenues = emails.map((e) => (perf[e] && perf[e].revenue) || 0).filter((v) => v > 0);
    const convRates = emails
      .map((e) => {
        const p = perf[e];
        if (!p || !p.clicks) return null;
        return p.orders / p.clicks;
      })
      .filter((v) => v !== null && v > 0);

    const p95Revenue = percentile(revenues, 95);
    const p80Conv = percentile(convRates, 80);

    const result = {};
    emails.forEach((email) => {
      const c = creators[email];
      const p = perf[email] || { clicks: 0, orders: 0, revenue: 0 };
      let tier;
      if (c.tierOverride) {
        tier = c.tierOverride;
      } else if (p.clicks === 0 && daysSince(c.joinedDate) > 14) {
        tier = 0;
      } else if (!c.academyProgress || c.academyProgress.length === 0 || p.clicks === 0) {
        tier = 1;
      } else {
        const conv = p.clicks ? p.orders / p.clicks : 0;
        if (p.revenue > 0 && p.revenue >= p95Revenue) tier = 4;
        else if (conv > 0 && conv >= p80Conv) tier = 3;
        else tier = 2;
      }
      result[email] = { tier, perf: p, creator: c };
    });
    return result;
  }

  const TIER_LABELS = {
    0: { name: 'Dormant', ko: '휴면', color: '#9ca3af' },
    1: { name: 'Starter', ko: '스타터', color: '#60a5fa' },
    2: { name: 'Active Creator', ko: '액티브', color: '#34d399' },
    3: { name: 'Rising Star', ko: '라이징 스타', color: '#f59e0b' },
    4: { name: 'Ambassador', ko: '앰버서더', color: '#f43f5e' },
  };

  function buildAffiliateLink(baseUrl, couponCode) {
    try {
      const u = new URL(baseUrl);
      u.searchParams.set('ref', couponCode);
      u.searchParams.set('discount', couponCode.toUpperCase());
      return u.toString();
    } catch (e) {
      return `${baseUrl}?ref=${encodeURIComponent(couponCode)}&discount=${encodeURIComponent(couponCode.toUpperCase())}`;
    }
  }

  function seedSampleDataIfEmpty() {
    // no-op placeholder kept for symmetry; sample data is loaded explicitly
    // from admin.html via the "샘플 데이터 불러오기" button (fetch of CSVs).
  }

  return {
    KEYS,
    ACADEMY_MODULES,
    MISSIONS,
    TIER_LABELS,
    normEmail,
    getCreators,
    saveCreators,
    getPerformance,
    savePerformance,
    getImportLog,
    pushImportLog,
    getCommissionRate,
    setCommissionRate,
    upsertCreator,
    getCreator,
    getCurrentUser,
    setCurrentUser,
    logout,
    parseCSV,
    importShopifyOrders,
    importUpPromote,
    computeAllTiers,
    buildAffiliateLink,
    daysSince,
    seedSampleDataIfEmpty,
  };
})();
