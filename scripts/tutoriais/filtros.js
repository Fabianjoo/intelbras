document.addEventListener('DOMContentLoaded', () => {
    const artigos = document.querySelectorAll('#tutoriais .tutorial');
    const filtros = document.querySelectorAll('.filtros input[type="checkbox"]');
  
    // Função para atualizar vídeos exibidos
    function atualizarVideos() {
      // Pega todos os filtros selecionados
      const filtrosSelecionados = Array.from(filtros)
        .filter(ch => ch.checked)
        .map(ch => ch.dataset.filter);
  
      artigos.forEach(art => {
        const equip = art.dataset.equip;
        const erro = art.dataset.erro;
  
        // Se algum filtro bate com equipamento ou erro, mostra
        if (filtrosSelecionados.length === 0) {
          art.style.display = 'none'; // nada selecionado -> esconde tudo
        } else if (filtrosSelecionados.includes(equip) || filtrosSelecionados.includes(erro)) {
          art.style.display = 'flex'; // mostra como flex
        } else {
          art.style.display = 'none';
        }
      });
    }
  
    // Adiciona listener em todos os checkboxes
    filtros.forEach(ch => ch.addEventListener('change', atualizarVideos));
  });
  