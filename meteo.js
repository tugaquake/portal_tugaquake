// meteo.js
document.addEventListener('DOMContentLoaded', carregarAvisosMeteo);

async function carregarAvisosMeteo() {
  const cont = document.getElementById('meteo-container');
  cont.innerHTML = '';
  try {
    const res = await fetch('https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json');
    const json = await res.json();

    // Ignorar verdes e sem texto
    const avisos = json.data.filter(a =>
      a.awarenessLevelID !== 'green' &&
      a.text.trim() !== ''
    );

    if (!avisos.length) {
      cont.textContent = 'Sem avisos ativos.';
      return;
    }

    // Precisamos do map de idAreaAviso → local
    const regRes = await fetch('https://api.ipma.pt/open-data/distrits-islands.json');
    const regJson = await regRes.json();
    const mapa = {};
    regJson.data.forEach(r => mapa[r.idAreaAviso] = r.local);

    avisos.forEach(av => {
      const area = mapa[av.idAreaAviso] || av.idAreaAviso;
      const start = av.startTime.replace('T', ' ').slice(0,16);
      const end   = av.endTime.replace('T', ' ').slice(0,16);
      const div = document.createElement('div');
      div.className = `aviso ${av.awarenessLevelID}`;
      div.innerHTML = `
        <h3>${area} — ${av.awarenessTypeName} (${av.awarenessLevelID.toUpperCase()})</h3>
        <p>${av.text}</p>
        <small>De ${start} até ${end}</small>
      `;
      cont.appendChild(div);
    });
  } catch (e) {
    console.error(e);
    cont.textContent = 'Erro a carregar avisos meteorológicos.';
  }
}
