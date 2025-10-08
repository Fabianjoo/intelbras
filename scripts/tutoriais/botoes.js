const artigos = document.querySelectorAll('.tutorial');

artigos.forEach(art => {
  const btnYouTube = art.querySelector('.youtube');      
  const btnCopiar = art.querySelector('.link-video');    
  const iframe = art.querySelector('iframe');           

  const embedLink = iframe.src; // link do iframe

  // Extrair o VIDEO_ID do embed
  const videoIDMatch = embedLink.match(/\/embed\/([a-zA-Z0-9_-]+)/);
  const youtubeLink = videoIDMatch ? `https://www.youtube.com/watch?v=${videoIDMatch[1]}` : embedLink;

  // Abrir no YouTube em nova aba
  btnYouTube.addEventListener('click', () => {
    window.open(youtubeLink, '_blank');
  });

  // Copiar link para a área de transferência e mostrar mensagem temporária
  btnCopiar.addEventListener('click', () => {
    navigator.clipboard.writeText(youtubeLink)
      .then(() => {
        const textoOriginal = btnCopiar.textContent;
        btnCopiar.textContent = '✅ Copiado!';
        setTimeout(() => {
          btnCopiar.textContent = textoOriginal;
        }, 2000);
      })
      .catch(err => {
        console.error('Erro ao copiar: ', err);
      });
  });
});
