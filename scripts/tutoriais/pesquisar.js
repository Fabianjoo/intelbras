document.addEventListener('DOMContentLoaded', () => {
    const inputPesquisa = document.getElementById('caixa-pesquisa');
    const artigos = document.querySelectorAll('#tutoriais .tutorial');
  
    inputPesquisa.addEventListener('input', () => {
      const termo = inputPesquisa.value.toLowerCase().trim();
  
      if (termo === '') {
        // Se o input estiver vazio, esconde todos os vídeos
        artigos.forEach(art => art.style.display = 'none');
        return;
      }
  
      artigos.forEach(art => {
        const titulo = art.querySelector('h3').textContent.toLowerCase();
        
        if (titulo.includes(termo)) {
          art.style.display = 'flex';  // mostra o vídeo se bater
        } else {
          art.style.display = 'none';  // esconde se não bater
        }
      });
    });
  });
  