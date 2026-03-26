import { loadLogs } from './components/logs.js';
import { loadThreats } from './components/threats.js';
import { loadVitals } from './components/vitals.js';
import { loadMap } from './components/map.js';

const API_BASE_URL = window.__API_BASE_URL__ || (
    window.location.protocol === 'file:'
        ? 'http://127.0.0.1:5000'
        : `${window.location.protocol}//${window.location.hostname}:5000`
);

const POLL_INTERVAL_MS = 3000;

function updateClock() {
    const now = new Date();

    const time = now.toLocaleTimeString('en-US', {
        hour12: false
    });

    const date = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    document.getElementById("time").innerText = time;
    document.getElementById("date").innerText = date;
}

function formatTimestamp(timestamp) {
    if (timestamp == null) {
        return '';
    }

    const date = new Date(Number(timestamp) * 1000);
    return Number.isNaN(date.getTime()) ? String(timestamp) : date.toLocaleTimeString();
}

function updateBackendStatus(message, isError = false) {
    const status = document.getElementById('backend-status');
    status.textContent = message;
    status.classList.toggle('error', isError);
}

function updateSummary(summary = {}) {
    const nodeCount = summary.node_count ?? 0;
    const enemyCount = summary.enemy_count ?? 0;
    const messageCount = summary.message_count ?? 0;
    const countElement = document.getElementById('node-count');
    const nodeLabel = `active unit${nodeCount === 1 ? '' : 's'}`;
    const enemyLabel = `tracked enem${enemyCount === 1 ? 'y' : 'ies'}`;
    const messageLabel = `command${messageCount === 1 ? '' : 's'}`;

    countElement.textContent = `${nodeCount} ${nodeLabel} | ${enemyCount} ${enemyLabel} | ${messageCount} ${messageLabel}`;
}

async function refreshDashboard() {
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard`);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const dashboard = await response.json();
        const nodes = dashboard.nodes || [];
        const logs = dashboard.logs || [];
        const threats = dashboard.threats || [];
        const vitals = dashboard.vitals || [];
        const lastUpdated = formatTimestamp(dashboard.summary?.last_updated);

        loadMap(nodes, threats);
        loadLogs(logs);
        loadThreats(threats);
        loadVitals(vitals);
        updateSummary(dashboard.summary);
        updateBackendStatus(
            lastUpdated ? `ESP stream active - last packet ${lastUpdated}` : 'Waiting for ESP data...'
        );
    } catch (error) {
        loadMap([], []);
        loadLogs([]);
        loadThreats([]);
        loadVitals([]);
        updateSummary();
        updateBackendStatus(`Backend unavailable at ${API_BASE_URL}`, true);
        console.error('Failed to load dashboard data', error);
    }
}

updateClock();
refreshDashboard();

setInterval(updateClock, 1000);
setInterval(refreshDashboard, POLL_INTERVAL_MS);
setInterval(() => {
    const live = document.querySelector(".live-indicator");
    if (live) {
        live.style.opacity = live.style.opacity === "0.3" ? "1" : "0.3";
    }
}, 800);
