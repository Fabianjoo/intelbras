document.addEventListener('DOMContentLoaded', () => {
  const artigos = document.querySelectorAll('#tutoriais .tutorial');
  const filtros = document.querySelectorAll('.filtros input[type="checkbox"]');
  // NOVO: Seleciona o botão Limpar Filtros
  const limparFiltrosBtn = document.querySelector('.limpar-filtro'); 
  
  // Mapeamento dos grupos de filtros (divs pai dos checkboxes)
  const gruposFiltros = {
      equip: document.querySelector('.filtros-grupo.equip'),
      softwares: document.querySelector('.filtros-grupo.softwares'),
      procedimentos: document.querySelector('.filtros-grupo.procedimentos'),
      config: document.querySelector('.filtros-grupo.config'),
      erros: document.querySelector('.filtros-grupo.erros'),
      segmento: document.querySelector('.filtros-grupo.segmento'), 
      adicionais: document.querySelector('.filtros-grupo.adicionais') 
  };

  // ===================================================================================
  // 1. DEFINIÇÃO DE FILTROS PERMITIDOS POR SEGMENTO
  // ===================================================================================
  
  const filtrosPermitidosCftv = {
      equip: [
          'gravadores-cftv', 'cameras-ip', 'speed-dome', 'analog-cam', 
          'vhd-control', 'vtn', 'ballun', 'multibox'
      ],
      softwares: [
          'sim-next', 'sim-play', 'sim-plus', 'guardian', 'isic-lite',
          'defenselite'
      ],
      procedimentos: [
          'cadastro', 'firmware', 'senha', 'download', 'gravacoes', 
          'inicializacao', 'inteligencias', 'acesso-remoto', 'interface-web', 'instalacao'
      ],
      config: [
          'data-hora', 'ftp', 'rtmp', 'smtp', 'pos', 'espelhamento', 'conta-intelbras', 
          'audio', 'encoder', 'OSD', 'PTZ', 'reconhecimento-facial', 
          'linha-cerca', 'busca-avancada', 'mosaico-visualizacao', 
          'importar', 'alarme-config', 'notificacoes', 'autoregistro'
      ],
      adicionais: ['antigos', 'erros'],
  };

  const filtrosPermitidosTmr = {
      equip: [
          'gravadores-cftv', 'veicular-cam', 'corporal-cam'
      ],
      softwares: [
         'defenseia', 'defenseia-mobile', 'moovsec','guardian'
      ],
      procedimentos: [
          'cadastro', 'firmware', 'senha', 'download', 'gravacoes', 
          'inteligencias', 'interface-web', 'instalacao'
      ],
      config: [
          'data-hora', 'smtp',
          'mosaico-visualizacao', 
          'alarme-config',
      ],
  };
  
  const filtrosPermitidosMibo = {
      equip: ['automacao'],
      softwares: ['mibo-home'],
      procedimentos: ['cadastro'],
      config: [],
      adicionais: [],
  };
  
  const filtrosPermitidosAlarme = {
      equip: ['central-alarme', 'central-choque', 'sensor', 'automacao'],
      softwares: ['incontrol'],
      procedimentos: ['cadastro'],
      config: [],
      adicionais: [],
  };

  const mapaFiltrosSegmento = {
      'cftv': filtrosPermitidosCftv,
      'tmr': filtrosPermitidosTmr,
      'mibo': filtrosPermitidosMibo,
      'alarme': filtrosPermitidosAlarme,
  };
  
  // ===================================================================================

  const categoriaUnica = ['segmento']; 

  // --------------------------------------------------------------------------------------
  // 2. Função para gerenciar a visibilidade dos grupos de filtros e seus checkboxes internos
  // --------------------------------------------------------------------------------------
  function gerenciarVisibilidadeGrupos(segmentoSelecionado) {
      const filtrosPermitidos = mapaFiltrosSegmento[segmentoSelecionado];
      const deveMostrarOutrosFiltros = !!filtrosPermitidos; 

      for (const categoria in gruposFiltros) {
          const grupo = gruposFiltros[categoria];
          if (!grupo) continue;
          
          if (categoria === 'segmento') {
              grupo.style.display = 'block'; 
              continue;
          }

          grupo.style.display = deveMostrarOutrosFiltros ? 'block' : 'none';

          if (deveMostrarOutrosFiltros) {
              const filtrosAparecer = filtrosPermitidos[categoria] || [];
              
              grupo.querySelectorAll('input[type="checkbox"]').forEach(ch => {
                  const dataFilter = ch.dataset.filter;
                  const filtroDeveAparecer = filtrosAparecer.includes(dataFilter);
                  
                  const elementoPai = ch.closest('label') || ch.closest('div'); 
                  
                  if (elementoPai) {
                     elementoPai.style.display = filtroDeveAparecer ? 'block' : 'none';
                  }
                  
                  if (!filtroDeveAparecer) {
                      ch.checked = false;
                  }
              });
          } else {
               grupo.querySelectorAll('input[type="checkbox"]').forEach(ch => {
                  ch.checked = false;
              });
          }
      }
  }


  // --------------------------------------------------------------------------------------
  // Função principal de filtragem de tutoriais
  // --------------------------------------------------------------------------------------
  function atualizarVideos() {
      const filtrosPorCategoria = { equip: [], softwares: [], procedimentos: [], config: [], erros: [], segmento: [], adicionais: [] };
      
      // 1. Coleta os filtros marcados
      filtros.forEach(ch => {
          if (ch.checked) {
              const categoriaClasses = ['equip', 'softwares', 'procedimentos', 'config', 'erros', 'segmento', 'adicionais'];
              for (const cat of categoriaClasses) {
                  if (ch.classList.contains(cat)) {
                      filtrosPorCategoria[cat].push(ch.dataset.filter);
                      break;
                  }
              }
          }
      });

      // 2. Gerencia a visibilidade dos grupos de filtros
      const segmentoSelecionado = filtrosPorCategoria.segmento[0];
      gerenciarVisibilidadeGrupos(segmentoSelecionado); 
      
      // Se houver algum segmento selecionado, a filtragem continua. Se não, oculta todos os artigos.
      const algumFiltroSegmentoMarcado = filtrosPorCategoria.segmento.length > 0;
      
      artigos.forEach(art => {
          if (!algumFiltroSegmentoMarcado) {
              art.style.display = 'none';
              return;
          }

          // 3. Obtém os datasets do artigo
          const artData = {
              equip: (art.dataset.equip || '').split(',').map(s => s.trim()).filter(s => s),
              software: (art.dataset.software || '').split(',').map(s => s.trim()).filter(s => s),
              procedimentos: (art.dataset.procedimentos || '').split(',').map(s => s.trim()).filter(s => s),
              config: (art.dataset.config || '').split(',').map(s => s.trim()).filter(s => s),
              erros: (art.dataset.erros || '').split(',').map(s => s.trim()).filter(s => s),
              segmento: (art.dataset.segmento || '').split(',').map(s => s.trim()).filter(s => s),
              adicionais: (art.dataset.adicionais || '').split(',').map(s => s.trim()).filter(s => s)
          };

          let mostrar = true;

          // 4. Aplica a lógica de filtro (AND entre categorias)
          for (const categoria in filtrosPorCategoria) {
              const filtrosSelecionados = filtrosPorCategoria[categoria];
              if (filtrosSelecionados.length > 0) {
                  const categoriaCorresponde = filtrosSelecionados.some(f => artData[categoria].includes(f));
                  if (!categoriaCorresponde) {
                      mostrar = false;
                      break; 
                  }
              }
          }

          art.style.display = mostrar ? 'flex' : 'none';
      });
  }
  
  // --------------------------------------------------------------------------------------
  // Listener de eventos para seleção única e atualização de filtros
  // --------------------------------------------------------------------------------------
  filtros.forEach(ch => {
      ch.addEventListener('change', (e) => {
          const checkboxAtual = e.target;
          
          if (categoriaUnica.some(cat => checkboxAtual.classList.contains(cat))) {
              if (checkboxAtual.checked) {
                  filtros.forEach(outroCh => {
                      if (outroCh.classList.contains('segmento') && outroCh !== checkboxAtual) {
                          outroCh.checked = false;
                      }
                  });
              }
          }
          
          atualizarVideos();
      });
  });

  // --------------------------------------------------------------------------------------
  // NOVO: Listener para o botão "Limpar Filtros" (Mantém o segmento)
  // --------------------------------------------------------------------------------------
  if (limparFiltrosBtn) {
      limparFiltrosBtn.addEventListener('click', () => {
          filtros.forEach(ch => {
              // Desmarca apenas os checkboxes que NÃO TÊM a classe 'segmento'
              if (!ch.classList.contains('segmento')) {
                  ch.checked = false;
              }
          });

          // Reexecuta o filtro para atualizar os resultados e a visibilidade dos filtros secundários.
          atualizarVideos();
      });
  }
  
  // --------------------------------------------------------------------------------------
  // Inicialização da Página
  // --------------------------------------------------------------------------------------
  artigos.forEach(art => art.style.display = 'none');
  gerenciarVisibilidadeGrupos(null); 
});