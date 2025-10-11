document.addEventListener('DOMContentLoaded', () => {
  const artigos = document.querySelectorAll('.tutorial');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const btnLimpar = document.querySelector('.limpar-filtro');

  // === FUNÇÃO PRINCIPAL DE FILTRO ===
  function atualizarFiltros() {
    const filtrosAtivos = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.dataset.filter);

    // Se nenhum filtro estiver ativo, mostra tudo
    if (filtrosAtivos.length === 0) {
      artigos.forEach(art => art.style.display = 'block');
      return;
    }

    // Caso contrário, exibe apenas os artigos que correspondem a algum filtro ativo
    artigos.forEach(art => {
      const corresponde = filtrosAtivos.some(filtro =>
        art.dataset.segmento === filtro ||
        art.dataset.equip === filtro ||
        art.dataset.software === filtro ||
        art.dataset.procedimento === filtro ||
        art.dataset.config === filtro ||
        art.dataset.adicional === filtro
      );

      art.style.display = corresponde ? 'block' : 'none';
    });
  }

  // === BOTÃO "LIMPAR FILTROS" ===
  btnLimpar.addEventListener('click', () => {
    checkboxes.forEach(cb => cb.checked = false);
    atualizarFiltros(); // Mostra tudo novamente
  });

  // === MONITORA CHECKBOXES PARA ATUALIZAR AUTOMATICAMENTE ===
  checkboxes.forEach(cb => cb.addEventListener('change', atualizarFiltros));

  // === FUNÇÕES DE VÍDEO E COPIAR LINK ===
  artigos.forEach(art => {
    const imgThumb = art.querySelector('.thumb');
    const btnYouTube = art.querySelector('.youtube');
    const btnCopiar = art.querySelector('.link-video');
    const titulo = art.querySelector('h3'); // título do vídeo

    if (!imgThumb || !btnYouTube || !btnCopiar || !titulo) return;

    const videoID = imgThumb.dataset.videoId.replace('?', '');
    const youtubeLink = `https://www.youtube.com/watch?v=${videoID}`;

    // Abrir vídeo no YouTube
    btnYouTube.addEventListener('click', () => {
      window.open(youtubeLink, '_blank');
    });

    // Copiar título + link
    btnCopiar.addEventListener('click', async () => {
      const textoParaCopiar = `${titulo.textContent.trim()}\n${youtubeLink}`;

      try {
        await navigator.clipboard.writeText(textoParaCopiar);
        const textoOriginal = btnCopiar.textContent;
        btnCopiar.textContent = '✅ Copiado!';
        setTimeout(() => {
          btnCopiar.textContent = textoOriginal;
        }, 2000);
      } catch (err) {
        console.error('Erro ao copiar: ', err);
      }
    });
  });
});
