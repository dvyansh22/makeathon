export function loadVitals() {

    let bpm = 175; // 🔁 change this dynamically later if needed

    let ecgPath;

    if (bpm === 0) {
        // Flat line (no heartbeat)
        ecgPath = `
            <path d="M0,30 L300,30" class="flatline"/>
        `;
    } else {
        // Normal ECG waveform
        ecgPath = `
            <path d="M0,30 
                     L20,30 
                     L30,10 
                     L40,50 
                     L50,30 
                     L70,30 
                     L80,25 
                     L90,35 
                     L100,30 
                     L130,30 
                     L140,5 
                     L150,55 
                     L160,30 
                     L200,30 
                     L300,30" />
        `;
    }

    document.getElementById("vitals").innerHTML = `
        <div>CPL. JENKINS</div>
        <div class="vital">${bpm} BPM</div>

        <div class="ecg">
            <svg viewBox="0 0 300 60" preserveAspectRatio="none">
                ${ecgPath}
            </svg>
        </div>
    `;
}