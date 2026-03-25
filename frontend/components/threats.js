export function loadThreats() {
    const threats = [
        "DDoS Alert",
        "Signal Lost",
        "Jamming Detected",
        "Intrusion Alert"
    ];

    const container = document.getElementById("threats");

    threats.forEach(t => {
        const div = document.createElement("div");
        div.className = "threat-card";
        div.innerText = t;
        container.appendChild(div);
    });
}