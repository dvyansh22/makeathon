export function loadLogs() {
    const logs = [
        { time: "16:18:05", unit: "CENTER", msg: "Copy Raven-04. Proceed to rally point Beta.", type: "center" },
        { time: "16:18:06", unit: "GHOST-ACTUAL", msg: "Center, Ghost-Actual. Reading you five by five.", type: "ghost" },
        { time: "16:18:07", unit: "CENTER", msg: "Copy Raven-04. Proceed to rally point Gamma.", type: "center" },
        { time: "16:18:08", unit: "SABER-6", msg: "Center, Saber-6. Reading you five by five.", type: "saber" },
        { time: "16:18:09", unit: "SYSTEM", msg: "Satellite handshake complete. Low latency mode active.", type: "system" },
        { time: "16:18:10", unit: "RAVEN-04", msg: "Objective secure. Waiting for further orders.", type: "raven" },
        { time: "16:18:05", unit: "CENTER", msg: "Copy Raven-04. Proceed to rally point Beta.", type: "center" },
        { time: "16:18:06", unit: "GHOST-ACTUAL", msg: "Center, Ghost-Actual. Reading you five by five.", type: "ghost" },
        { time: "16:18:07", unit: "CENTER", msg: "Copy Raven-04. Proceed to rally point Gamma.", type: "center" },
        { time: "16:18:08", unit: "SABER-6", msg: "Center, Saber-6. Reading you five by five.", type: "saber" },
        { time: "16:18:09", unit: "SYSTEM", msg: "Satellite handshake complete. Low latency mode active.", type: "system" },
        { time: "16:18:10", unit: "RAVEN-04", msg: "Objective secure. Waiting for further orders.", type: "raven" }
    ];

    const container = document.getElementById("logs");
    const ul = document.createElement("ul");
    ul.className = "log-list";

    logs.forEach(log => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="log-time">[${log.time}]</span>
            <span class="log-unit ${log.type}">${log.unit}:</span>
            <span class="log-msg">${log.msg}</span>
        `;

        ul.appendChild(li);
    });

    container.appendChild(ul);
}