export function renderMap(nodes) {
  const map = document.getElementById('map');
  map.innerHTML = '<div class="map-grid"></div>';

  for (const [id, node] of Object.entries(nodes || {})) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    const x = Math.max(12, Math.min(map.clientWidth - 12, Number(node.x) || 20));
    const y = Math.max(12, Math.min(map.clientHeight - 12, Number(node.y) || 20));
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;

    dot.addEventListener('mouseenter', () => {
      const tip = document.createElement('div');
      tip.className = 'node-tooltip';
      tip.id = 'node-tooltip';
      tip.textContent = `${id} | ${node.status || 'ONLINE'} | ${node.uptime || 'N/A'}`;
      map.appendChild(tip);
      tip.style.left = `${x + 16}px`;
      tip.style.top = `${y - 14}px`;
    });

    dot.addEventListener('mouseleave', () => {
      document.querySelectorAll('#node-tooltip').forEach(t => t.remove());
    });

    map.appendChild(dot);

    if (node.label) {
      const label = document.createElement('div');
      label.className = 'node-tooltip';
      label.style.left = `${x + 16}px`;
      label.style.top = `${y + 12}px`;
      label.textContent = node.label;
      map.appendChild(label);
    }
  }
}