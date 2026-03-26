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
        const card = document.createElement("div");
        card.className = "threat-card";

        card.innerHTML = `
            <div class="threat-header">
                <span class="dot"></span>
                <span class="title">Enemy E${threat.enemy_id}</span>
                <span class="time">${formatTime(threat.time)}</span>
            </div>
            <div class="desc">
                Node ${threat.node_id} detected enemy at 
                (${formatCoordinate(threat.lat)}, ${formatCoordinate(threat.lon)})
            </div>
            <div class="tag">SOURCE: NODE ${threat.node_id}</div>
        `;

        container.appendChild(card);
    });
}