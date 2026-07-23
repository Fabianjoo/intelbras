document.addEventListener('DOMContentLoaded', () => {
  const artigos = document.querySelectorAll('.tutorial');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const btnLimpar = document.querySelector('.limpar-filtro');

  // === FUNÇÃO DE COPIAR TEXTO ===
  async function copiarTexto(texto) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(texto);
        return;
      }

      const textarea = document.createElement("textarea");
      textarea.value = texto;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      document.execCommand("copy");

      document.body.removeChild(textarea);

    } catch (err) {
      console.error('Erro ao copiar: ', err);
    }
  }


  // === FUNÇÃO PRINCIPAL DE FILTRO ===
  function atualizarFiltros() {
    const filtrosAtivos = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.dataset.filter);


    if (filtrosAtivos.length === 0) {
      artigos.forEach(art => art.style.display = 'none');
      return;
    }


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


  // === BOTÃO LIMPAR FILTROS ===
  if (btnLimpar) {
    btnLimpar.addEventListener('click', () => {

      checkboxes.forEach(cb => cb.checked = false);

      artigos.forEach(art => {
        art.style.display = 'none';
      });

    });
  }


  // === ATUALIZA FILTROS AO CLICAR NOS CHECKBOXES ===
  checkboxes.forEach(cb => {
    cb.addEventListener('change', atualizarFiltros);
  });


  // === VÍDEOS E COPIAR LINK ===
  artigos.forEach(art => {

    const imgThumb = art.querySelector('.thumb');
    const btnYouTube = art.querySelector('.youtube');
    const btnCopiar = art.querySelector('.link-video');
    const titulo = art.querySelector('h3');


    if (!imgThumb || !btnYouTube || !btnCopiar || !titulo) return;


    const videoID = imgThumb.dataset.videoId.replace('?', '');
    const youtubeLink = `https://www.youtube.com/watch?v=${videoID}`;


    // Abrir YouTube
    btnYouTube.addEventListener('click', () => {
      window.open(youtubeLink, '_blank');
    });


    // Copiar título + link
    btnCopiar.addEventListener('click', async () => {

      const textoParaCopiar =
        `${titulo.textContent.trim()}\n${youtubeLink}`;


      await copiarTexto(textoParaCopiar);


      btnCopiar.textContent = "✅ Copiado!";


      setTimeout(() => {
        btnCopiar.textContent = "Copiar link";
      }, 2000);

    });

  });


  // === OCULTA TUTORIAIS AO CARREGAR ===
  artigos.forEach(art => {
    art.style.display = 'none';
  });

});