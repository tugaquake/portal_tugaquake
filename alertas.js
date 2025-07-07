// alertas.js
document.addEventListener('DOMContentLoaded', () => {
  carregarAlertasTQ();
  carregarANEPC();
});

async function carregarAlertasTQ() {
  const lista = document.getElementById('lista-alertas');
  lista.innerHTML = '';
  try {
    const res = await fetch('https://raw.githubusercontent.com/tugaquake/portal-tugaquake/main/alertas.json');
    const data = await res.json();
    data.forEach(a => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>[${a.data}] ${a.tipo}</strong> — ${a.mensagem}`;
      lista.appendChild(li);
    });
  } catch (e) {
    lista.innerHTML = '<li>Erro ao carregar alertas TQ.</li>';
  }
}

async function carregarANEPC() {
  const cont = document.getElementById('anepc-container');
  cont.innerHTML = '';
  try {
    const res = await fetch('https://raw.githubusercontent.com/teu-usuario/portal-tugaquake/main/anepc.json');
    const data = await res.json();
    data.forEach(a => {
      const div = document.createElement('div');
      div.className = 'alerta-oficial';
      div.innerHTML = `<b>${a.titulo}</b><br>${a.descricao}`;
      cont.appendChild(div);
    });
  } catch (e) {
    cont.textContent = 'Erro ao carregar alertas oficiais.';
  }
}
