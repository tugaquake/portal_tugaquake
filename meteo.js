// meteo.js
document.addEventListener('DOMContentLoaded', carregarAvisosMeteo);

async function carregarAvisosMeteo() {
  const cont = document.getElementById('meteo-container');
  cont.innerHTML = '';
  try {
    // Vai buscar o array de avisos
    const res = await fetch('https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json');
    const avisos = await res.json(); // Agora avisos é um array de objetos

    // Ignorar avisos verdes e sem texto
    const avisosFiltrados = avisos.filter(aviso =>
      aviso.awarenessLevelID !== 'green' &&
      aviso.text.trim() !== ''
    );

    if (!avisosFiltrados.length) {
      cont.textContent = 'Sem avisos ativos.';
      return;
    }

    // Mapa de tradução de cores
    const cores = {
      yellow: 'amarelo',
      orange: 'laranja',
      red: 'vermelho'
    };

    // Vai buscar o mapa de áreas (opcional, para mostrar nomes em vez de códigos)
    const regRes = await fetch('https://api.ipma.pt/open-data/distrits-islands.json');
    const regJson = await regRes.json();
    const mapa = {};
    regJson.data.forEach(r => mapa[r.idAreaAviso] = r.local);

    // Mostra cada aviso
    avisosFiltrados.forEach(aviso => {
      const area = mapa[aviso.idAreaAviso] || aviso.idAreaAviso;
      const start = aviso.startTime.replace('T', ' ').slice(0,16);
      const end   = aviso.endTime.replace('T', ' ').slice(0,16);

      // Traduzir awarenessLevelID se existir no mapa de cores
      const corTraduzida = cores[aviso.awarenessLevelID] || aviso.awarenessLevelID;

      const div = document.createElement('div');
      div.className = `aviso ${aviso.awarenessLevelID}`;
      div.innerHTML = `
        <h3>${area} — ${aviso.awarenessTypeName} (${corTraduzida.toUpperCase()})</h3>
        <p>${aviso.text}</p>
        <small>De ${start} até ${end}</small>
      `;
      cont.appendChild(div);
    });
  } catch (e) {
    console.error(e);
    cont.textContent = 'Erro a carregar avisos meteorológicos.';
  }
}
