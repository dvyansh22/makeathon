import { loadLogs } from './components/logs.js';
import { loadThreats } from './components/threats.js';
import { loadVitals } from './components/vitals.js';
import { loadMap } from './components/map.js';

/* INITIAL LOAD */
loadMap();
loadLogs();
loadThreats();
loadVitals();

/* TIME + DATE UPDATE */
function updateTime() {
    const now = new Date();
<<<<<<< HEAD
    document.getElementById("time").innerText = now.toLocaleTimeString();
    document.getElementById("date").innerText = now.toDateString();
}, 1000);
=======

    // Digital style time (24-hour)
    const time = now.toLocaleTimeString('en-US', {
        hour12: false
    });

    // Better formatted date
    const date = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    document.getElementById("time").innerText = time;
    document.getElementById("date").innerText = date;
}

/* RUN CLOCK */
updateTime();
setInterval(updateTime, 1000);

/* OPTIONAL: BLINKING LIVE INDICATOR */
setInterval(() => {
    const live = document.querySelector(".live-indicator");
    if (live) {
        live.style.opacity = live.style.opacity === "0.3" ? "1" : "0.3";
    }
}, 800);
>>>>>>> 6a6db19 (updated frontend components)
