mostrarCards(colaboradores);

function mostrarCards(lista) {
  const container = document.getElementById('cards');
  container.innerHTML = '';

  lista.forEach(colab => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${colab.foto}" alt="${colab.nome}">
      <h3>${colab.nome}</h3>
      <p><strong>Setor:</strong> ${colab.setor}</p>
      <p><strong>Hardware:</strong> ${colab.hardware}</p>
      <p><strong>Chamados:</strong> ${calcularChamados(colab)}</p>
      <a href="${colab.teams}" target="_blank">Falar no Teams</a>
    `;

    container.appendChild(card);
  });
}

function calcularChamados(colab) {
  const mesSelecionado = document.getElementById('filtroMes').value;
  if (mesSelecionado === 'Todos') {
    return Object.values(colab.chamados).reduce((a,b) => a+b, 0);
  } else {
    return colab.chamados[mesSelecionado] || 0;
  }
}

// filtros
document.getElementById('filtroSetor').addEventListener('change', filtrar);
document.getElementById('filtroMes').addEventListener('change', filtrar);

function filtrar() {
  const setor = document.getElementById('filtroSetor').value;
  const mes = document.getElementById('filtroMes').value;

  let filtrados = colaboradores;
  if (setor !== 'Todos') filtrados = filtrados.filter(c => c.setor === setor);

  mostrarCards(filtrados);
}
