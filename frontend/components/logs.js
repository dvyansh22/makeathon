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

    [...logs].reverse().forEach(log => {
        const div = document.createElement("div");
        div.className = "log";
        div.innerText = `${log.id} | ${log.cmd} | ${formatTime(log.time)}`;
        container.appendChild(div);
    });
}
