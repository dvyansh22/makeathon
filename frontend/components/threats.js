export function loadThreats() {
    const threats = [
        {
            title: "DDoS ALERT",
            desc: "Traffic spike: 20369 req/sec attempting to flood Comm Gateway.",
            tag: "MAXFRAME BUFFER",
            type: "critical",
            time: "16:17:54"
        },
        {
            title: "BIOMETRIC ALERT",
            desc: "Biometric link lost. Signal offline.",
            tag: "BRAVO-6 (GHOST)",
            type: "warning",
            time: "16:17:55"
        },
        {
            title: "BIOMETRIC ALERT",
            desc: "Elevated stress levels detected. Adrenaline spike.",
            tag: "ALPHA-1 (CAPT. PRICE)",
            type: "danger",
            time: "16:17:56"
        },
        {
            title: "JAMMING ALERT",
            desc: "Signal-to-noise ratio falling below threshold.",
            tag: "RADIO TOWER B",
            type: "warning",
            time: "16:17:57"
        },
        {
            title: "INTRUSION ALERT",
            desc: "Brute force signature detected on admin panel.",
            tag: "INTERNAL DB NODE",
            type: "critical",
            time: "16:17:58"
        },
        {
            title: "DDoS ALERT",
            desc: "Traffic spike: 20369 req/sec attempting to flood Comm Gateway.",
            tag: "MAXFRAME BUFFER",
            type: "critical",
            time: "16:17:54"
        },
        {
            title: "BIOMETRIC ALERT",
            desc: "Biometric link lost. Signal offline.",
            tag: "BRAVO-6 (GHOST)",
            type: "warning",
            time: "16:17:55"
        },
        {
            title: "BIOMETRIC ALERT",
            desc: "Elevated stress levels detected. Adrenaline spike.",
            tag: "ALPHA-1 (CAPT. PRICE)",
            type: "danger",
            time: "16:17:56"
        },
        {
            title: "JAMMING ALERT",
            desc: "Signal-to-noise ratio falling below threshold.",
            tag: "RADIO TOWER B",
            type: "warning",
            time: "16:17:57"
        },
        {
            title: "INTRUSION ALERT",
            desc: "Brute force signature detected on admin panel.",
            tag: "INTERNAL DB NODE",
            type: "critical",
            time: "16:17:58"
        },
    ];

    const container = document.getElementById("threats");

    threats.forEach(t => {
        const card = document.createElement("div");
        card.className = `threat-card ${t.type}`;

        card.innerHTML = `
            <div class="threat-header">
                <span class="dot"></span>
                <span class="title">${t.title}</span>
                <span class="time">${t.time}</span>
            </div>
            <div class="desc">${t.desc}</div>
            <div class="tag">SRC: ${t.tag}</div>
        `;

        container.appendChild(card);
    });
}