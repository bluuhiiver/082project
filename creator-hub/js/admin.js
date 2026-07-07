(function () {
  const SEEDED_GRADUATES = [
    'active1@mail.it', 'active2@mail.pl', 'active3@mail.se',
    'star1@mail.pt', 'star2@mail.be', 'ambassador1@mail.de',
  ];

  let sortKey = 'revenue';
  let sortDir = 'desc';
  const selected = new Set();

  function toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2500);
  }

  function fmtMoney(n) {
    return '€' + (Math.round((n || 0) * 100) / 100).toFixed(2);
  }

  function copyText(text) {
    const helper = document.getElementById('clipboardHelper');
    helper.value = text;
    helper.style.display = 'block';
    helper.select();
    try {
      if (navigator.clipboard) navigator.clipboard.writeText(text);
      else document.execCommand('copy');
    } catch (e) { /* ignore */ }
    helper.style.display = 'none';
  }

  function buildRows() {
    const tiers = PH.computeAllTiers();
    const rate = PH.getCommissionRate();
    return Object.keys(tiers).map((email) => {
      const t = tiers[email];
      const c = t.creator;
      const p = t.perf;
      return {
        email,
        name: c.name || email.split('@')[0],
        country: c.country || '—',
        tier: t.tier,
        clicks: p.clicks || 0,
        orders: p.orders || 0,
        revenue: p.revenue || 0,
        commission: (p.revenue || 0) * rate,
        academy: (c.academyProgress || []).length,
        couponCode: c.couponCode || '—',
        joinedDate: c.joinedDate,
        tierOverride: c.tierOverride,
      };
    });
  }

  function segmentTags(row, allRows) {
    const tags = [];
    if (row.tier === 0) tags.push('휴면');
    if (row.tier === 3) tags.push('앰버서더 후보');
    if (row.tier === 2) {
      const convs = allRows.filter((r) => r.clicks > 0).map((r) => r.orders / r.clicks);
      const avg = convs.length ? convs.reduce((a, b) => a + b, 0) / convs.length : 0;
      const myConv = row.clicks ? row.orders / row.clicks : 0;
      if (myConv > avg * 1.5 && myConv > 0) tags.push('잠재 스타');
    }
    if (row.joinedDate && PH.daysSince(row.joinedDate) <= 30) tags.push('신규');
    return tags;
  }

  function renderKPIs(rows) {
    const total = rows.length;
    const active = rows.filter((r) => r.tier !== 0).length;
    const totalRevenue = rows.reduce((s, r) => s + r.revenue, 0);
    const clicksTotal = rows.reduce((s, r) => s + r.clicks, 0);
    const ordersTotal = rows.reduce((s, r) => s + r.orders, 0);
    const avgConv = clicksTotal ? ((ordersTotal / clicksTotal) * 100).toFixed(1) : '0.0';
    const thisMonth = new Date().toISOString().slice(0, 7);
    const newThisMonth = rows.filter((r) => r.joinedDate && r.joinedDate.slice(0, 7) === thisMonth).length;
    const tier0Ratio = total ? Math.round((rows.filter((r) => r.tier === 0).length / total) * 100) : 0;

    document.getElementById('kpiCards').innerHTML = `
      <div class="card kpi"><div class="value">${active} / ${total}</div><div class="label">활성 어필리에이트</div></div>
      <div class="card kpi"><div class="value">${fmtMoney(totalRevenue)}</div><div class="label">누적 매출</div></div>
      <div class="card kpi"><div class="value">${avgConv}%</div><div class="label">평균 전환율</div></div>
      <div class="card kpi"><div class="value">${tier0Ratio}%</div><div class="label">휴면 비율 (Tier 0)</div></div>
      <div class="card kpi"><div class="value">${newThisMonth}</div><div class="label">이번 달 신규 온보딩</div></div>
    `;
  }

  function populateCountryFilter(rows) {
    const sel = document.getElementById('countryFilter');
    const current = sel.value;
    const countries = Array.from(new Set(rows.map((r) => r.country))).sort();
    sel.innerHTML = '<option value="">전체</option>' + countries.map((c) => `<option value="${c}">${c}</option>`).join('');
    sel.value = current;
  }

  function populateMissionSelect() {
    const sel = document.getElementById('missionSelect');
    sel.innerHTML = PH.MISSIONS.map((m) => `<option value="${m.id}">${m.title}</option>`).join('');
  }

  function applyFiltersAndSort(rows) {
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    const tierF = document.getElementById('tierFilter').value;
    const countryF = document.getElementById('countryFilter').value;

    let filtered = rows.filter((r) => {
      if (q && !(r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q))) return false;
      if (tierF !== '' && String(r.tier) !== tierF) return false;
      if (countryF && r.country !== countryF) return false;
      return true;
    });

    filtered.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      let cmp;
      if (typeof av === 'string') cmp = av.localeCompare(bv);
      else cmp = (av || 0) - (bv || 0);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return filtered;
  }

  function renderTable(allRows) {
    const rows = applyFiltersAndSort(allRows);
    const tbody = document.getElementById('creatorTableBody');

    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="13"><div class="empty-state">표시할 크리에이터가 없어요. 데이터를 가져오거나 필터를 조정해보세요.</div></td></tr>`;
      document.getElementById('tableCount').textContent = '';
      return;
    }

    tbody.innerHTML = rows.map((r) => {
      const info = PH.TIER_LABELS[r.tier];
      const tags = segmentTags(r, allRows);
      const checked = selected.has(r.email) ? 'checked' : '';
      return `<tr>
        <td class="checkbox-cell"><input type="checkbox" data-email="${r.email}" class="rowSelect" ${checked} /></td>
        <td>${r.name}</td>
        <td class="muted">${r.email}</td>
        <td>${r.country}</td>
        <td><span class="tier-badge" style="background:${info.color}"><span class="dot"></span>${info.ko}</span></td>
        <td>${tags.map((t) => `<span class="badge">${t}</span>`).join('')}</td>
        <td>${r.clicks}</td>
        <td>${r.orders}</td>
        <td>${fmtMoney(r.revenue)}</td>
        <td>${fmtMoney(r.commission)}</td>
        <td>${r.academy}/${PH.ACADEMY_MODULES.length}</td>
        <td>${r.couponCode}</td>
        <td>
          <select data-override="${r.email}" style="font-size:12px; padding:4px;">
            <option value="">자동</option>
            ${[0, 1, 2, 3, 4].map((t) => `<option value="${t}" ${r.tierOverride === t ? 'selected' : ''}>${PH.TIER_LABELS[t].ko}로 고정</option>`).join('')}
          </select>
        </td>
      </tr>`;
    }).join('');

    document.getElementById('tableCount').textContent = `${rows.length}명 표시 중 (전체 ${allRows.length}명)`;

    tbody.querySelectorAll('.rowSelect').forEach((cb) => {
      cb.addEventListener('change', () => {
        if (cb.checked) selected.add(cb.dataset.email);
        else selected.delete(cb.dataset.email);
      });
    });
    tbody.querySelectorAll('select[data-override]').forEach((sel) => {
      sel.addEventListener('change', () => {
        const email = sel.dataset.override;
        const val = sel.value === '' ? null : parseInt(sel.value, 10);
        PH.upsertCreator(email, { tierOverride: val });
        toast('티어를 수동으로 지정했어요.');
        refresh();
      });
    });
  }

  function renderImportLog() {
    const log = PH.getImportLog();
    document.getElementById('importLog').innerHTML = log.length
      ? log.map((l) => `<div class="log-line">[${l.ts.slice(0, 19).replace('T', ' ')}] ${l.message}</div>`).join('')
      : '<p class="muted">아직 가져온 데이터가 없어요.</p>';
  }

  function refresh() {
    const rows = buildRows();
    renderKPIs(rows);
    populateCountryFilter(rows);
    renderTable(rows);
    renderImportLog();
  }

  function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  function runImport(shopifyText, uppromoteText) {
    const hasShopifyData = !!(shopifyText && shopifyText.trim());
    const byCode = hasShopifyData ? PH.importShopifyOrders(shopifyText) : {};
    const result = PH.importUpPromote(uppromoteText, byCode, hasShopifyData);
    toast(`가져오기 완료: ${result.total}명 처리 (신규 ${result.created})`);
    refresh();
  }

  function seedAcademyForDemo() {
    SEEDED_GRADUATES.forEach((email) => {
      const c = PH.getCreator(email);
      if (!c) return;
      PH.upsertCreator(email, { academyProgress: PH.ACADEMY_MODULES.map((m) => m.id) });
    });
  }

  function init() {
    document.getElementById('commissionRateInput').value = Math.round(PH.getCommissionRate() * 100);
    populateMissionSelect();
    refresh();

    document.querySelectorAll('#creatorTable th[data-sort]').forEach((th) => {
      th.addEventListener('click', () => {
        const key = th.dataset.sort;
        if (sortKey === key) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
        else { sortKey = key; sortDir = 'desc'; }
        refresh();
      });
    });

    ['searchInput', 'tierFilter', 'countryFilter'].forEach((id) => {
      document.getElementById(id).addEventListener('input', refresh);
      document.getElementById(id).addEventListener('change', refresh);
    });

    document.getElementById('selectAll').addEventListener('change', (e) => {
      document.querySelectorAll('.rowSelect').forEach((cb) => {
        cb.checked = e.target.checked;
        if (e.target.checked) selected.add(cb.dataset.email);
        else selected.delete(cb.dataset.email);
      });
    });

    document.getElementById('commissionRateInput').addEventListener('change', (e) => {
      const rate = Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)) / 100;
      PH.setCommissionRate(rate);
      refresh();
    });

    document.getElementById('importBtn').addEventListener('click', async () => {
      const shopifyFile = document.getElementById('shopifyFile').files[0];
      const uppromoteFile = document.getElementById('uppromoteFile').files[0];
      if (!uppromoteFile) {
        toast('업프로모트 CSV는 필수입니다.');
        return;
      }
      const shopifyText = shopifyFile ? await readFileAsText(shopifyFile) : '';
      const uppromoteText = await readFileAsText(uppromoteFile);
      runImport(shopifyText, uppromoteText);
    });

    document.getElementById('sampleBtn').addEventListener('click', async () => {
      try {
        const [shopifyRes, uppromoteRes] = await Promise.all([
          fetch('sample-data/shopify_orders_sample.csv'),
          fetch('sample-data/uppromote_sample.csv'),
        ]);
        if (!shopifyRes.ok || !uppromoteRes.ok) throw new Error('fetch failed');
        const [shopifyText, uppromoteText] = await Promise.all([shopifyRes.text(), uppromoteRes.text()]);
        runImport(shopifyText, uppromoteText);
        seedAcademyForDemo();
        refresh();
        toast('샘플 데이터를 불러왔어요. (일부 크리에이터는 아카데미 수료 상태로 시드했습니다)');
      } catch (e) {
        toast('샘플 데이터를 불러오지 못했어요. 로컬 서버(http-server 등)로 열어야 fetch가 동작합니다.');
      }
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
      if (!confirm('정말 모든 크리에이터/성과 데이터를 초기화할까요?')) return;
      Object.values(PH.KEYS).forEach((k) => localStorage.removeItem(k));
      selected.clear();
      refresh();
      toast('데이터를 초기화했어요.');
    });

    document.getElementById('assignMissionBtn').addEventListener('click', () => {
      if (!selected.size) {
        toast('먼저 크리에이터를 선택해주세요.');
        return;
      }
      const missionId = document.getElementById('missionSelect').value;
      selected.forEach((email) => {
        const c = PH.getCreator(email);
        if (!c) return;
        const missions = c.missions || {};
        if (missions[missionId] !== 'completed') missions[missionId] = 'assigned';
        PH.upsertCreator(email, { missions });
      });
      toast(`${selected.size}명에게 미션을 배정했어요.`);
      refresh();
    });

    document.getElementById('copyTemplateBtn').addEventListener('click', () => {
      const rows = buildRows();
      const targets = selected.size ? rows.filter((r) => selected.has(r.email)) : applyFiltersAndSort(rows);
      if (!targets.length) {
        toast('대상이 없어요.');
        return;
      }
      const lines = targets.map((r) => {
        const info = PH.TIER_LABELS[r.tier];
        return `안녕하세요 ${r.name}님, 피요나입니다 :) 현재 ${info.ko} 등급이시고, 이번 달 매출은 ${fmtMoney(r.revenue)}예요. Creator Hub에서 새 미션을 확인해보세요!`;
      });
      copyText(lines.join('\n\n'));
      toast(`${targets.length}명 대상 메시지 템플릿을 클립보드에 복사했어요.`);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
