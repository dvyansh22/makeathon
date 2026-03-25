import { renderMap } from './components/map.js';
import { renderLogs } from './components/logs.js';
import { renderThreats } from './components/threats.js';
import { renderVitals } from './components/vitals.js';
import { initStatus } from './components/status.js';

const API_BASE = 'http://localhost:5000';



async function update() {
  try {
    const [nodes, logs, threats, vitals] = await Promise.all([
      fetch(`${API_BASE}/nodes`).then(res => res.ok ? res.json() : []),
      fetch(`${API_BASE}/logs`).then(res => res.ok ? res.json() : []),
      fetch(`${API_BASE}/threats`).then(res => res.ok ? res.json() : []),
      fetch(`${API_BASE}/vitals`).then(res => res.ok ? res.json() : {}),
    ]);

    renderMap(nodes);
    renderLogs(logs);
    renderThreats(threats);
    renderVitals(vitals);
  } catch (err) {
    console.error('Update failed', err);
    document.getElementById('logs').innerHTML = `<div class="log">API connection error: ${err.message}</div>`;
  }
}
initStatus();
update();
setInterval(update, 2000);
