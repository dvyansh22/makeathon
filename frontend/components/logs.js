export function loadLogs() {
    const logs = [
        "Proceed to rally point",
        "Reading you five by five",
        "Secure channel active"
    ];

    const container = document.getElementById("logs");

    logs.forEach(log => {
        const div = document.createElement("div");
        div.className = "log";
        div.innerText = log;
        container.appendChild(div);
    });
}