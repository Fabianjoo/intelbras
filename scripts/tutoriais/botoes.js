document.addEventListener('DOMContentLoaded', () => {
  const artigos = document.querySelectorAll('.tutorial');

  artigos.forEach(art => {
    const imgThumb = art.querySelector('.thumb');
    const btnYouTube = art.querySelector('.youtube');
    const btnCopiar = art.querySelector('.link-video');

    if (!imgThumb || !btnYouTube || !btnCopiar) return;

    // Pega o ID do vídeo e monta o link do YouTube
    const videoID = imgThumb.dataset.videoId.replace('?', '');
    const youtubeLink = `https://www.youtube.com/watch?v=${videoID}`;

    // Abrir no YouTube
    btnYouTube.addEventListener('click', () => {
      window.open(youtubeLink, '_blank');
    });

    // Copiar link
    btnCopiar.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(youtubeLink);
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
