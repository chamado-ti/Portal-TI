mostrarCards(colaboradores);

function mostrarCards(lista) {
  const container = document.getElementById('cards');
  container.innerHTML = '';

  lista.forEach(colab => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = 
      `<img src="${colab.foto}" alt="${colab.nome}" class="colaborador-img">
      <h3>${colab.nome}</h3>
      <p><strong>Setor:</strong> ${colab.setor}</p>
      <p><strong>Hardware:</strong> ${colab.hardware}</p>
      <p><strong>Chamados:</strong> ${calcularChamados(colab)}</p>
      <a href="${colab.teams}" target="_blank">Falar no Teams</a>`;

    container.appendChild(card);
  });

  setupModal(); // Atualiza modal das imagens
}

function calcularChamados(colab) {
  const mesSelecionado = document.getElementById('filtroMes')?.value || 'Todos';
  const anoSelecionado = document.getElementById('filtroAno')?.value || '2025';

  if (mesSelecionado === 'Todos') {
    return Object.values(colab.chamados[anoSelecionado] || {}).reduce((a,b) => a+b, 0);
  } else {
    return (colab.chamados[anoSelecionado] && colab.chamados[anoSelecionado][mesSelecionado]) || 0;
  }
}

// filtros
document.getElementById('filtroSetor')?.addEventListener('change', filtrar);
document.getElementById('filtroMes')?.addEventListener('change', filtrar);
document.getElementById('filtroAno')?.addEventListener('change', filtrar);

function filtrar() {
  const setor = document.getElementById('filtroSetor').value;
  const mes = document.getElementById('filtroMes').value;
  const ano = document.getElementById('filtroAno')?.value || '2025';

  let filtrados = colaboradores;
  if (setor !== 'Todos') filtrados = filtrados.filter(c => c.setor === setor);

  mostrarCards(filtrados);
}

// Modal das imagens
function setupModal() {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const imgs = document.querySelectorAll(".colaborador-img");
  const closeBtn = document.querySelector(".close");

  imgs.forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
    });
  });

  closeBtn.onclick = () => modal.style.display = "none";
  window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; }
}
