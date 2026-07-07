(function () {
  let currentTab = 'home';

  function toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2200);
  }

  function fmtMoney(n) {
    return '€' + (Math.round((n || 0) * 100) / 100).toFixed(2);
  }

  function tierBadgeHTML(tier) {
    const info = PH.TIER_LABELS[tier];
    return `<span class="tier-badge" style="background:${info.color}"><span class="dot"></span>${info.ko} · ${info.name}</span>`;
  }

  function getMe() {
    const email = PH.getCurrentUser();
    if (!email) return null;
    return PH.getCreator(email);
  }

  function showLogin() {
    document.getElementById('view-login').style.display = 'block';
    document.getElementById('tabs').style.display = 'none';
    document.getElementById('userBox').style.display = 'none';
    document.querySelectorAll('.tabview').forEach((v) => (v.style.display = 'none'));
  }

  function showApp() {
    document.getElementById('view-login').style.display = 'none';
    document.getElementById('tabs').style.display = 'flex';
    document.getElementById('userBox').style.display = 'flex';
    const me = getMe();
    document.getElementById('userLabel').textContent = me ? (me.name || me.email) : '';
    renderTab(currentTab);
  }

  function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('nav.tabs button').forEach((b) => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });
    document.querySelectorAll('.tabview').forEach((v) => {
      v.style.display = v.id === `view-${tab}` ? 'block' : 'none';
    });
    renderTab(tab);
  }

  function renderTab(tab) {
    const fns = {
      home: renderHome,
      academy: renderAcademy,
      missions: renderMissions,
      dashboard: renderDashboard,
      resources: renderResources,
      leaderboard: renderLeaderboard,
    };
    if (fns[tab]) fns[tab]();
  }

  function renderHome() {
    const me = getMe();
    if (!me) return;
    document.getElementById('homeGreeting').textContent = `안녕하세요, ${me.name || me.email} 님 👋`;
    const tiers = PH.computeAllTiers();
    const info = tiers[me.email];
    const tier = info ? info.tier : 1;
    document.getElementById('tierRow').innerHTML = tierBadgeHTML(tier);

    const academyDone = (me.academyProgress || []).length >= PH.ACADEMY_MODULES.length;
    const missionsDone = Object.values(me.missions || {}).filter((v) => v === 'completed').length;
    const perf = (info && info.perf) || { clicks: 0, orders: 0 };
    const checklist = [
      { label: '프로필 정보 입력', done: !!(me.name && me.country) },
      { label: '아카데미 최소 1강 수료', done: (me.academyProgress || []).length > 0 },
      { label: '내 할인코드/링크 등록', done: !!me.couponCode },
      { label: '첫 미션 완료', done: missionsDone > 0 },
      { label: '첫 클릭 발생', done: perf.clicks > 0 },
    ];
    document.getElementById('onboardingChecklist').innerHTML = checklist
      .map((c) => `<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span style="font-size:16px;">${c.done ? '✅' : '⬜️'}</span>
        <span class="${c.done ? '' : 'muted'}">${c.label}</span>
      </div>`)
      .join('');

    let next = '모든 온보딩 단계를 완료했어요! 리더보드에서 상위권을 노려보세요 🚀';
    if (!checklist[1].done) next = '아카데미 1강부터 들어보세요. 5분이면 충분해요.';
    else if (!checklist[2].done) next = '리소스 탭에서 내 할인코드를 등록하고 트래킹 링크를 만들어보세요.';
    else if (!checklist[3].done) next = '미션 탭에서 웰컴 미션에 도전해보세요.';
    else if (!academyDone) next = '아카데미 나머지 강의도 마저 들어보세요.';
    document.getElementById('nextActions').textContent = next;
  }

  function renderAcademy() {
    const me = getMe();
    if (!me) return;
    const progress = me.academyProgress || [];
    const pct = Math.round((progress.length / PH.ACADEMY_MODULES.length) * 100);
    document.getElementById('academyProgressBar').style.width = pct + '%';
    document.getElementById('academyProgressLabel').textContent = `${progress.length} / ${PH.ACADEMY_MODULES.length}강 수료 (${pct}%)`;

    document.getElementById('academyList').innerHTML = PH.ACADEMY_MODULES.map((m) => {
      const done = progress.includes(m.id);
      return `<div class="module-item ${done ? 'done' : ''}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;">
          <div>
            <h3>${m.title}</h3>
            <p class="muted">${m.summary}</p>
          </div>
          <button class="btn ${done ? 'secondary' : ''} small" data-module="${m.id}" ${done ? 'disabled' : ''}>
            ${done ? '수료 완료 ✓' : '수료하기'}
          </button>
        </div>
        <ul>${m.content.map((c) => `<li>${c}</li>`).join('')}</ul>
      </div>`;
    }).join('');

    document.querySelectorAll('#academyList button[data-module]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const moduleId = btn.dataset.module;
        const creator = PH.getCreator(me.email);
        const prog = creator.academyProgress || [];
        if (!prog.includes(moduleId)) prog.push(moduleId);
        PH.upsertCreator(me.email, { academyProgress: prog });
        toast('강의를 수료했어요! 🎉');
        renderAcademy();
      });
    });
  }

  function renderMissions() {
    const me = getMe();
    if (!me) return;
    document.getElementById('missionList').innerHTML = PH.MISSIONS.map((m) => {
      const status = (me.missions || {})[m.id];
      const done = status === 'completed';
      return `<div class="mission-item">
        <div class="info">
          <strong>${m.title}</strong>
          <div class="muted">${m.description}</div>
          <div class="badge">리워드: ${m.reward}</div>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <span class="status ${done ? 'done' : 'pending'}">${done ? '완료' : '진행중'}</span>
          <button class="btn small ${done ? 'secondary' : ''}" data-mission="${m.id}" ${done ? 'disabled' : ''}>${done ? '완료됨' : '완료 인증'}</button>
        </div>
      </div>`;
    }).join('');

    document.querySelectorAll('#missionList button[data-mission]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const missionId = btn.dataset.mission;
        const creator = PH.getCreator(me.email);
        const missions = creator.missions || {};
        missions[missionId] = 'completed';
        PH.upsertCreator(me.email, { missions });
        toast('미션 완료! 리워드가 곧 지급돼요 🎁');
        renderMissions();
      });
    });
  }

  function drawBars(canvas, bars) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const max = Math.max(1, ...bars.map((b) => b.value));
    const gap = 24;
    const barW = (w - gap * (bars.length + 1)) / bars.length;
    bars.forEach((b, i) => {
      const barH = Math.max(2, (b.value / max) * (h - 24));
      const x = gap + i * (barW + gap);
      const y = h - barH - 16;
      ctx.fillStyle = b.color;
      ctx.fillRect(x, y, barW, barH);
      ctx.fillStyle = '#7a7180';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${b.label} (${b.value})`, x + barW / 2, h - 4);
    });
  }

  function renderDashboard() {
    const me = getMe();
    if (!me) return;
    const tiers = PH.computeAllTiers();
    const info = tiers[me.email] || { tier: 1, perf: { clicks: 0, orders: 0, revenue: 0 } };
    const perf = info.perf;
    const rate = PH.getCommissionRate();
    const commission = (perf.revenue || 0) * rate;
    const conv = perf.clicks ? ((perf.orders / perf.clicks) * 100).toFixed(1) : '0.0';

    document.getElementById('dashboardKpis').innerHTML = `
      <div class="card kpi"><div class="value">${perf.clicks || 0}</div><div class="label">클릭 수</div></div>
      <div class="card kpi"><div class="value">${perf.orders || 0}</div><div class="label">주문 수</div></div>
      <div class="card kpi"><div class="value">${fmtMoney(perf.revenue)}</div><div class="label">발생 매출</div></div>
      <div class="card kpi"><div class="value">${fmtMoney(commission)}</div><div class="label">예상 커미션 (${Math.round(rate * 100)}%)</div></div>
    `;
    document.getElementById('perfHint').textContent = `전환율 ${conv}% · 현재 티어: ${PH.TIER_LABELS[info.tier].ko}`;
    drawBars(document.getElementById('perfChart'), [
      { label: '클릭', value: perf.clicks || 0, color: '#ffe4ec' },
      { label: '주문', value: perf.orders || 0, color: '#ff7597' },
    ]);
  }

  function renderResources() {
    const me = getMe();
    if (!me) return;
    document.getElementById('couponInput').value = me.couponCode || '';
  }

  function renderLeaderboard() {
    const me = getMe();
    const tiers = PH.computeAllTiers();
    const rows = Object.keys(tiers)
      .map((email) => ({ email, ...tiers[email] }))
      .filter((r) => (r.perf.revenue || 0) > 0)
      .sort((a, b) => (b.perf.revenue || 0) - (a.perf.revenue || 0))
      .slice(0, 10);

    if (!rows.length) {
      document.getElementById('leaderboardList').innerHTML = '<div class="empty-state">아직 리더보드에 표시할 성과 데이터가 없어요.<br/>운영자 콘솔에서 성과 데이터를 업로드하면 여기에 표시됩니다.</div>';
      return;
    }

    document.getElementById('leaderboardList').innerHTML = rows
      .map((r, i) => {
        const name = (r.creator && r.creator.name) || r.email.split('@')[0];
        const isMe = me && r.email === me.email;
        return `<div class="leaderboard-row" style="${isMe ? 'background:#fff6f8;border-radius:8px;' : ''}">
          <div class="rank ${i === 0 ? 'top1' : ''}">${i + 1}</div>
          <div style="flex:1;">
            <strong>${name}${isMe ? ' (나)' : ''}</strong>
            <div class="muted" style="font-size:12px;">${(r.creator && r.creator.country) || ''}</div>
          </div>
          ${tierBadgeHTML(r.tier)}
          <div style="width:90px;text-align:right;font-weight:700;">${fmtMoney(r.perf.revenue)}</div>
        </div>`;
      })
      .join('');
  }

  function init() {
    document.querySelectorAll('nav.tabs button').forEach((btn) => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
      PH.logout();
      showLogin();
    });

    const emailInput = document.getElementById('loginEmail');
    emailInput.addEventListener('input', () => {
      const exists = !!PH.getCreator(emailInput.value);
      document.getElementById('newFieldsBlock').style.display = exists ? 'none' : 'block';
      document.getElementById('newFieldsBlock2').style.display = exists ? 'none' : 'block';
    });

    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email) return;
      const existing = PH.getCreator(email);
      if (!existing) {
        PH.upsertCreator(email, {
          name: document.getElementById('loginName').value.trim(),
          country: document.getElementById('loginCountry').value.trim(),
          joinedDate: new Date().toISOString().slice(0, 10),
        });
      }
      PH.setCurrentUser(email);
      showApp();
    });

    document.getElementById('saveCouponBtn').addEventListener('click', () => {
      const me = getMe();
      if (!me) return;
      const code = document.getElementById('couponInput').value.trim().toUpperCase();
      PH.upsertCreator(me.email, { couponCode: code });
      toast('할인코드를 저장했어요.');
    });

    document.getElementById('generateLinkBtn').addEventListener('click', () => {
      const me = getMe();
      if (!me) return;
      const creator = PH.getCreator(me.email);
      const code = creator.couponCode;
      if (!code) {
        toast('먼저 할인코드를 저장해주세요.');
        return;
      }
      const baseUrl = document.getElementById('baseUrlInput').value.trim() || 'https://piyonna.com';
      const link = PH.buildAffiliateLink(baseUrl, code);
      document.getElementById('generatedLinkBlock').style.display = 'block';
      document.getElementById('generatedLink').value = link;
    });

    document.getElementById('copyLinkBtn').addEventListener('click', () => {
      const el = document.getElementById('generatedLink');
      el.select();
      navigator.clipboard && navigator.clipboard.writeText(el.value).catch(() => {});
      toast('링크를 복사했어요.');
    });

    if (PH.getCurrentUser() && getMe()) {
      showApp();
    } else {
      showLogin();
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
