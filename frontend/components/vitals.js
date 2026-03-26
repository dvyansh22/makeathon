function createStat(label, value) {
    const stat = document.createElement('div');
    stat.className = 'vital-stat';

    const statLabel = document.createElement('div');
    statLabel.className = 'vital-label';
    statLabel.textContent = label;

    const statValue = document.createElement('div');
    statValue.className = 'vital-value';
    statValue.textContent = value;

    stat.appendChild(statLabel);
    stat.appendChild(statValue);
    return stat;
}

export function loadVitals(vitals = []) {
    const container = document.getElementById('vitals');
    container.innerHTML = '';

    if (!vitals.length) {
        container.innerHTML = '<div class="placeholder">Waiting for heart-rate packets from ESP...</div>';
        return;
    }

    vitals.forEach((vital) => {
        const card = document.createElement('div');
        card.className = 'vital-card';

        const title = document.createElement('div');
        title.className = 'vital-name';
        title.textContent = vital.id;

        const grid = document.createElement('div');
        grid.className = 'vital-grid';
        grid.appendChild(createStat('Heart Rate', vital.hr == null ? '--' : `${vital.hr} BPM`));
        grid.appendChild(createStat('Enemy Count', `${vital.enemy_count ?? 0}`));

        card.appendChild(title);
        card.appendChild(grid);
        container.appendChild(card);
    });
}
