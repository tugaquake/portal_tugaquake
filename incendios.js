document.addEventListener('DOMContentLoaded', carregarFogosAtivos);

async function carregarFogosAtivos() {
  const cont = document.getElementById('fogos-container');
  cont.innerHTML = '';
  try {
    const res = await fetch('https://api.fogos.pt/v2/incidents/active?all=1');
    const json = await res.json();
    const incidentes = json.data || [];

    // Filtra só incêndios ativos (onde active é true)
    // Depois ordena por número de bombeiros (man) em ordem decrescente
    const ativos = incidentes
      .filter(f => f.active)
      .sort((a, b) => (b.man || 0) - (a.man || 0))
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
        <b>Bombeiros:</b> ${f.man || 0} &nbsp; 
        <b>Viaturas:</b> ${f.terrain || 0} &nbsp; 
        <b>Meios aéreos:</b> ${f.aerial || 0}<br>
        <a href="https://fogos.pt" target="_blank">Mais informações em fogos.pt</a>
      `;
      cont.appendChild(div);
    });
  } catch (e) {
    console.error(e);
    cont.textContent = 'Erro a carregar incêndios.';
  }
}
