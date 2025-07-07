// incendios.js
document.addEventListener('DOMContentLoaded', carregarFogos);

async function carregarFogos() {
  const cont = document.getElementById('fogos-container');
  cont.innerHTML = '';
  try {
    const res = await fetch('https://fogos.pt/api/incidents');
    const json = await res.json();
    const ativos = json
      .filter(f => f.state === 'active')
      .slice(0, 5);

    if (!ativos.length) {
      cont.textContent = 'Sem incêndios ativos.';
      return;
    }

    ativos.forEach(f => {
      const div = document.createElement('div');
      div.className = 'incendio';
      div.innerHTML = `
        <b>${f.incident_name}</b> — ${f.concelho}  
        <br>Início: ${new Date(f.start_date).toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' })}  
        <br><a href="${f.url}" target="_blank">Mais info</a>
      `;
      cont.appendChild(div);
    });
  } catch (e) {
    cont.textContent = 'Erro a carregar incêndios.';
  }
}
