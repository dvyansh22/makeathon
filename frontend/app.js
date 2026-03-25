import { loadLogs } from './components/logs.js';
import { loadThreats } from './components/threats.js';
import { loadVitals } from './components/vitals.js';
import { loadMap } from './components/map.js';

loadMap();
loadLogs();
loadThreats();
loadVitals();

setInterval(() => {
    const now = new Date();
    document.getElementById("time").innerText = now.toLocaleTimeString();
    document.getElementById("date").innerText = now.toDateString();
}, 1000);
