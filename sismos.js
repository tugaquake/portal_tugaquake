// sismos.js
document.addEventListener('DOMContentLoaded', carregarSismosIPMA);

async function carregarSismosIPMA() {
  const cont = document.getElementById('sismos-container');
  cont.innerHTML = '';
  try {
    const res = await fetch('https://api.ipma.pt/open-data/observation/seismic/7.json');
    const json = await res.json();
    const agora = new Date();

    const relevantes = json.data
      .filter(ev => {
        const mag = parseFloat(ev.magnitud);
        const dataEv = new Date(ev.time);
        const dentroDos7Dias = (agora - dataEv) <= 7 * 24 * 60 * 60 * 1000;
        return mag > 2.0 && dentroDos7Dias;
      })
      .reverse(); // agora os mais recentes aparecem primeiro

    if (!relevantes.length) {
      cont.textContent = 'Sem sismos significativos (> M2.0) nos últimos 7 dias.';
      return;
    }

    relevantes.forEach(ev => {
      const mag = parseFloat(ev.magnitud).toFixed(1);
      const d = new Date(ev.time).toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' });
      const div = document.createElement('div');
      div.className = 'sismo';
      div.innerHTML = `
        <b>${ev.obsRegion}</b> — M${ev.magType} ${mag}  
        <br>Data/Hora: ${d}  
        <br>Profundidade: ${ev.depth} km
      `;
      cont.appendChild(div);
    });
  } catch (e) {
    cont.textContent = 'Erro ao carregar sismos.';
  }
}
