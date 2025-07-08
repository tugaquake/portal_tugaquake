// incendios.js
document.addEventListener('DOMContentLoaded', carregarFogosAtivos);

async function carregarFogosAtivos() {
  const cont = document.getElementById('fogos-container');
  cont.innerHTML = '';
  try {
    const res = await fetch('https://api.fogos.pt/v2/incidents/active?all=1');
    const json = await res.json();

    const ativos = json.data
      .filter(f => f.state === 'active')
      .slice(0, 5);

    if (!ativos.length) {
      cont.textContent = 'Sem incêndios ativos.';
      return;
    }

    ativos.forEach(f => {
      const inicio = new Date(f.start_date).toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' });
      const div = document.createElement('div');
      div.className = 'incendio';
      div.innerHTML = `
        <b>${f.location}</b> — ${f.natureza}  
        <br>Início: ${f.date} ${f.hour}  
        <br><a href="https://fogos.pt" target="_blank">Mais informações em fogos.pt</a>
      `;
      cont.appendChild(div);
    });
  } catch (e) {
    console.error(e);
    cont.textContent = 'Erro a carregar incêndios.';
  }
}
