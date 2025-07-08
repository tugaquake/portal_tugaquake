document.addEventListener('DOMContentLoaded', carregarFogosAtivos);

async function carregarFogosAtivos() {
  const cont = document.getElementById('fogos-container');
  cont.innerHTML = '';
  try {
    const res = await fetch('https://api.fogos.pt/v2/incidents/active?all=1');
    const incidentes = await res.json(); // A API devolve um array diretamente

    // Filtra incêndios ativos (Em Curso ou Em Resolução)
    const ativos = incidentes
      .filter(f => f.status === 'Em Curso' || f.status === 'Em Resolução')
      .slice(0, 5);

    if (!ativos.length) {
      cont.textContent = 'Sem incêndios ativos.';
      return;
    }

    ativos.forEach(f => {
      const inicio = f.date && f.hour
        ? `${f.date} ${f.hour}`
        : 'Data/hora desconhecida';
      const div = document.createElement('div');
      div.className = 'incendio';
      div.innerHTML = `
        <b>${f.location || 'Localização desconhecida'}</b> — ${f.natureza || 'Sem informação'}<br>
        Estado: ${f.status}<br>
        Início: ${inicio}<br>
        <a href="https://fogos.pt" target="_blank">Mais informações em fogos.pt</a>
      `;
      cont.appendChild(div);
    });
  } catch (e) {
    console.error(e);
    cont.textContent = 'Erro a carregar incêndios.';
  }
}
