export function renderLogs(logs) {
  const el = document.getElementById('logs');
  if (!logs || logs.length === 0) {
    el.innerHTML = '<div class="log">No events on record.</div>';
    return;
  }

  el.innerHTML = logs
    .slice()
    .reverse()
    .map((log) => {
      const severity = (log.level || 'info').toLowerCase();
      const color = severity === 'critical' ? '#ff6060' : severity === 'warn' ? '#ffbe3f' : '#99cfff';
      return `
      <div class="log" style="border-left-color:${color};">
        <small style="opacity:0.7;">[${log.time || new Date().toISOString()}]</small>
        <div>${log.msg || log.message || 'Unknown log entry'}</div>
      </div>
    `;
    })
    .join('');
}
