// meteo.js
document.addEventListener('DOMContentLoaded', carregarAvisosMeteo);

async function carregarAvisosMeteo() {
  const cont = document.getElementById('meteo-container');
  cont.innerHTML = '';
  try {
    const res = await fetch('https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json');
    const json = await res.json();
    const avisos = json.data.filter(a => a.awarenessLevelID !== 'green');

    if (!avisos.length) {
      cont.textContent = 'Sem avisos ativos.';
      return;
    }

    avisos.forEach(av => {
      const start = av.startTime.replace('T',' ').slice(0,16);
      const end   = av.endTime.replace('T',' ').slice(0,16);
      const div = document.createElement('div');
      div.className = `aviso ${av.awarenessLevelID}`;
      div.innerHTML = `
        <h3>${av.awarenessTypeName} (${av.awarenessLevelID.toUpperCase()})</h3>
        <p>${av.text}</p>
        <small>${av.idAreaAviso}: ${start} → ${end}</small>
      `;
      cont.appendChild(div);
    });
  } catch (e) {
    cont.textContent = 'Erro a carregar avisos meteorológicos.';
  }
}
