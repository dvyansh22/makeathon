function formatTime(timestamp) {
    const date = new Date(Number(timestamp) * 1000);
    return Number.isNaN(date.getTime()) ? 'NO TIME' : date.toLocaleTimeString();
}

function formatCoordinate(value) {
    return Number.isFinite(Number(value)) ? Number(value).toFixed(5) : '--';
}

export function loadThreats(threats = []) {
    const container = document.getElementById("threats");
    container.innerHTML = '';

    if (!threats.length) {
        container.innerHTML = '<div class="placeholder">No enemy coordinates in the latest packet.</div>';
        return;
    }

    [...threats].reverse().forEach(threat => {
        const div = document.createElement("div");
        div.className = "threat-card";
        div.innerText = `${threat.node_id} -> E${threat.enemy_id} | ${formatCoordinate(threat.lat)}, ${formatCoordinate(threat.lon)} | ${formatTime(threat.time)}`;
        container.appendChild(div);
    });
}
