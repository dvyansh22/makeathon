function formatTime(timestamp) {
    const date = new Date(Number(timestamp) * 1000);
    return Number.isNaN(date.getTime()) ? 'NO TIME' : date.toLocaleTimeString();
}

export function loadLogs(logs = []) {
    const container = document.getElementById("logs");
    container.innerHTML = '';

    if (!logs.length) {
        container.innerHTML = '<div class="placeholder">No incoming command text.</div>';
        return;
    }

    const ul = document.createElement("ul");
    ul.className = "log-list";

    [...logs].reverse().forEach(log => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="log-time">[${formatTime(log.time)}]</span>
            <span class="log-unit">${log.id}:</span>
            <span class="log-msg">${log.cmd}</span>
        `;

        ul.appendChild(li);
    });

    container.appendChild(ul);
}