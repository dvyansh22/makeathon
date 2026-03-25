export function renderVitals(vitals) {
  const el = document.getElementById('vitals');
  if (!vitals || Object.keys(vitals).length === 0) {
    el.innerHTML = '<div class="vital">No active unit vitals available.</div>';
    return;
  }

  el.innerHTML = Object.entries(vitals)
    .map(([id, data]) => {
      const bpm = typeof data === 'object' ? data.bpm : data;
      const ox = typeof data === 'object' ? data.spO2 : 0;
      const normalized = Math.max(0, Math.min(100, (bpm - 40) / 120 * 100));
      return `
      <div class="vital">
        <div><strong>${id}</strong> <span>${bpm || 'N/A'} BPM</span></div>
        <div class="progress"><div class="progress-bar" style="width:${normalized}%"></div></div>
        <div><span>${ox ? ox + '% SpO2' : 'SpO2 N/A'}</span></div>
      </div>
    `;
    })
    .join('');
}
