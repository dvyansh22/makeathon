export function renderThreats(threats) {
  const el = document.getElementById('threats');

  if (!threats || threats.length === 0) {
    el.innerHTML = '<div class="alert" style="background:rgba(30,92,46,0.2); border-color:#2e9b51; color:#a2ffd7;">All clear. No threats detected.</div>';
    return;
  }

  el.innerHTML = threats
    .map((t) => {
      const severity = t.severity || 'medium';
      const color = severity === 'high' ? '#ff8f8f' : severity === 'critical' ? '#ff5757' : '#ffe25f';
      const conf = Math.round((t.confidence || 0) * 100);
      return `
      <div class="alert" style="border-color:${color}; background:rgba(180, 24, 24, 0.2);">
        <div>${t.type || 'Unknown'} • ${t.source || 'sensor'} • <span>${conf}%</span></div>
        <small style="opacity:0.8;">${t.location || 'U/D'}</small>
      </div>
    `;
    })
    .join('');
}
