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

    // Verificação se data é array e se está vazio
    if (!Array.isArray(data) || data.length === 0) {
      lista.innerHTML = '<li>Não há alertas TugaQuake.</li>';
      return;
    }

    // 2) Para cada alerta, usar os campos hora, titulo e mensagem
    data.forEach(a => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>[${new Date(a.hora).toLocaleString()}] ${a.titulo}</strong><br>
        ${a.mensagem}
        <em> (${a.zona}, Tipo: ${a.canal})</em>
      `;
      lista.appendChild(li);
    });

  } catch (e) {
    console.error(e);
    lista.innerHTML = '<li>Erro ao carregar alertas TugaQuake.</li>';
  }
}

