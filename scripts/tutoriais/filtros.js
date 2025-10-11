document.addEventListener('DOMContentLoaded', () => {
  const artigos = document.querySelectorAll('#tutoriais .tutorial');
  const filtros = document.querySelectorAll('.filtros input[type="checkbox"]');

  function atualizarVideos() {
    // Agrupa filtros por categoria
    const filtrosPorCategoria = {
      equip: [],
      softwares: [],
      procedimentos: [],
      config: [],
      erros: [],
      segmento: [],   
      adicionais: []   
    };

    filtros.forEach(ch => {
      if (ch.checked) {
        if (ch.classList.contains('equip')) filtrosPorCategoria.equip.push(ch.dataset.filter);
        if (ch.classList.contains('softwares')) filtrosPorCategoria.softwares.push(ch.dataset.filter);
        if (ch.classList.contains('procedimentos')) filtrosPorCategoria.procedimentos.push(ch.dataset.filter);
        if (ch.classList.contains('config')) filtrosPorCategoria.config.push(ch.dataset.filter);
        if (ch.classList.contains('erros')) filtrosPorCategoria.erros.push(ch.dataset.filter);
        if (ch.classList.contains('segmento')) filtrosPorCategoria.segmento.push(ch.dataset.filter);
        if (ch.classList.contains('adicionais')) filtrosPorCategoria.adicionais.push(ch.dataset.filter); // novo
      }
    });

    // Se nenhum filtro estiver marcado, esconde todos
    const algumFiltroMarcado = filtrosPorCategoria.equip.length > 0 || filtrosPorCategoria.softwares.length > 0 ||
                              filtrosPorCategoria.procedimentos.length > 0 || filtrosPorCategoria.config.length > 0 ||
                              filtrosPorCategoria.erros.length > 0 || filtrosPorCategoria.segmento.length > 0 ||
                              filtrosPorCategoria.adicionais.length > 0; // novo

    artigos.forEach(art => {
      if (!algumFiltroMarcado) {
        art.style.display = 'none';
        return;
      }

      const equip = art.dataset.equip || '';
      const software = art.dataset.software || '';
      const procedimentos = art.dataset.procedimentos || '';
      const config = art.dataset.config || '';
      const erros = art.dataset.erros || '';
      const segmento = art.dataset.segmento || '';
      const adicionais = art.dataset.adicionais || ''; // novo

      let mostrar = true;

      // Para cada categoria, se houver filtros selecionados, o artigo precisa bater com pelo menos um
      if (filtrosPorCategoria.equip.length > 0 && !filtrosPorCategoria.equip.includes(equip)) mostrar = false;
      if (filtrosPorCategoria.softwares.length > 0 && !filtrosPorCategoria.softwares.includes(software)) mostrar = false;
      if (filtrosPorCategoria.procedimentos.length > 0 && !filtrosPorCategoria.procedimentos.includes(procedimentos)) mostrar = false;
      if (filtrosPorCategoria.config.length > 0 && !filtrosPorCategoria.config.includes(config)) mostrar = false;
      if (filtrosPorCategoria.erros.length > 0 && !filtrosPorCategoria.erros.includes(erros)) mostrar = false;
      if (filtrosPorCategoria.segmento.length > 0 && !filtrosPorCategoria.segmento.includes(segmento)) mostrar = false;
      if (filtrosPorCategoria.adicionais.length > 0 && !filtrosPorCategoria.adicionais.includes(adicionais)) mostrar = false; // novo

      art.style.display = mostrar ? 'flex' : 'none';
    });
  }

  filtros.forEach(ch => ch.addEventListener('change', atualizarVideos));
});
