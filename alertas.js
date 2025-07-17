// alertas.js
document.addEventListener('DOMContentLoaded', () => {
  carregarAlertasTQ();
  carregarANEPC();
});

async function carregarAlertasTQ() {
  const lista = document.getElementById('lista-alertas');
  lista.innerHTML = '';

  try {
    // 1) Apontar para o teu GitHub Pages
    const res = await fetch('https://tugaquake.github.io/dados_tugaquake/alertas.json');
    const data = await res.json();

    // 2) Para cada alerta, usar os campos hora, titulo e mensagem
    data.forEach(a => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>[${new Date(a.hora).toLocaleString()}] ${a.titulo}</strong><br>
        ${a.mensagem}
        <em> (${a.zona}, canal: ${a.canal})</em>
      `;
      lista.appendChild(li);
    });

  } catch (e) {
    console.error(e);
    lista.innerHTML = '<li>Erro ao carregar alertas TugaQuake.</li>';
  }
}

async function carregarANEPC() {
  const cont = document.getElementById('anepc-container');
  cont.innerHTML = '';
  try {
    const res = await fetch('https://raw.githubusercontent.com/tugaquake/portal-tugaquake/main/anepc.json');
    const data = await res.json();
    data.forEach(a => {
      const div = document.createElement('div');
      div.className = 'alerta-oficial';
      div.innerHTML = `<b>${a.titulo}</b><br>${a.descricao}`;
      cont.appendChild(div);
    });
  } catch (e) {
    console.error(e);
    cont.textContent = 'Erro ao carregar alertas oficiais.';
  }
}
