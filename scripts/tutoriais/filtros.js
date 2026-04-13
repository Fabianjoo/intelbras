document.addEventListener('DOMContentLoaded', () => {
    const artigos = document.querySelectorAll('#tutoriais .tutorial');
    const filtros = document.querySelectorAll('.filtros input[type="checkbox"]');
    // Seleciona o botão Limpar Filtros
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
            'vhd-control', 'vtn', 'ballun', 'multibox', 'microfone','vipw'
        ],
        softwares: [
            'sim-next', 'sim-play', 'sim-plus', 'guardian', 'isic-lite',
            'defenselite','guardian-parceiro'
        ],
        procedimentos: [
            'cadastro', 'firmware', 'senha', 'download', 'gravacoes', 
            'inicializacao', 'inteligencias', 'acesso-remoto', 'interface-web', 'instalacao', 'gravacao-nuvem', 'inicializar'
        ],
        config: [
            'data-hora', 'ftp', 'rtmp', 'smtp', 'pos', 'espelhamento', 'conta-intelbras', 
            'audio', 'encoder', 'OSD', 'PTZ', 'reconhecimento-facial', 
            'linha-cerca', 'busca-avancada', 'mosaico-visualizacao', 
            'importar', 'alarme-config', 'notificacoes', 'autoregistro', 'full-color', 'incontrol', 'lpr'
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

    const filtrosPermitidosControleAcesso = {
        equip: [ 
            'catracas', 'porteiros', 'controlador'
        ],
        softwares: [
           'incontrol'
        ],
        procedimentos: [
            'backup', 'cadastro', 'interface-web', 'cadastrousuario', 'instalacao', 'chamada'
        ],
        config: [
           
        ],
        adicionais: ['antigos'],
    };
    
    const filtrosPermitidosMibo = {
        equip: ['automacao', 'cameras-ip'],
        softwares: ['mibo-smart', 'mibo-cam', 'mibo-home', 'mibo'],
        procedimentos: ['cadastro','download','mibo-cloud','mibo-+', 'criar-conta','alexa', 'google-assistant'],
        config: ['automacoes','criar-conta', 'compartilhar-gravacoes', 'compartilhar-cameras', 'importar', 'desvincular', 'mosaico-visualizacao', 'baba-eletronica', 'rotinas', 'ambientes'],
        adicionais:['antigos']
    };
    
    const filtrosPermitidosAlarme = {
        equip: ['central-alarme', 'central-choque', 'sensor', 'automacao'],
        softwares: ['guardian'],
        procedimentos: ['alexa','cadastro'],
        config: ['notificacoes', 'alarme-config'],
        adicionais: ['erros'],
    };
  
    // ===================================================================================
  
    const mapaFiltrosSegmento = {
        'cftv': filtrosPermitidosCftv,
        'tmr': filtrosPermitidosTmr,
        'controle-acesso': filtrosPermitidosControleAcesso,
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
  // 3. Função principal de filtragem de tutoriais
  // --------------------------------------------------------------------------------------
  function atualizarVideos() {
      // 3a. Agrupa filtros por categoria
      const filtrosPorCategoria = {
          equip: [], softwares: [], procedimentos: [], config: [],
          erros: [], segmento: [], adicionais: []
      };
  
      filtros.forEach(ch => {
          if (ch.checked) {
              if (ch.classList.contains('equip')) filtrosPorCategoria.equip.push(ch.dataset.filter);
              if (ch.classList.contains('softwares')) filtrosPorCategoria.softwares.push(ch.dataset.filter);
              if (ch.classList.contains('procedimentos')) filtrosPorCategoria.procedimentos.push(ch.dataset.filter);
              if (ch.classList.contains('config')) filtrosPorCategoria.config.push(ch.dataset.filter);
              if (ch.classList.contains('erros')) filtrosPorCategoria.erros.push(ch.dataset.filter);
              if (ch.classList.contains('segmento')) filtrosPorCategoria.segmento.push(ch.dataset.filter);
              if (ch.classList.contains('adicionais')) filtrosPorCategoria.adicionais.push(ch.dataset.filter);
          }
      });
  
      // 3b. Gerencia a visibilidade dos filtros secundários (USA O SEGMENTO SELECIONADO)
      const segmentoSelecionado = filtrosPorCategoria.segmento[0];
      gerenciarVisibilidadeGrupos(segmentoSelecionado);
  
      // ===================================================================================
      // Verifica se o segmento foi selecionado.
      // ===================================================================================
      const algumFiltroMarcado = Object.values(filtrosPorCategoria).some(arr => arr.length > 0);
      const segmentoFoiSelecionado = filtrosPorCategoria.segmento.length > 0;
  
      // 3c. Executa a filtragem dos artigos
      artigos.forEach(art => {
          // Se nenhum filtro está marcado OU se o segmento não foi selecionado, ESCONDE TUDO.
          if (!algumFiltroMarcado || !segmentoFoiSelecionado) {
              art.style.display = 'none';
              return;
          }
  
          // Pega os datasets dos artigos (SUA LÓGICA DE DADOS SIMPLES)
          const equip = art.dataset.equip || '';
          const software = art.dataset.software || '';
          const procedimentos = art.dataset.procedimentos || '';
          const config = art.dataset.config || '';
          const erros = art.dataset.erros || '';
          const segmento = art.dataset.segmento || '';
          const adicionais = art.dataset.adicionais || '';
  
          let mostrar = true;
  
          // Aplica a lógica de filtro
          if (filtrosPorCategoria.equip.length > 0 && !filtrosPorCategoria.equip.includes(equip)) mostrar = false;
          if (filtrosPorCategoria.softwares.length > 0 && !filtrosPorCategoria.softwares.includes(software)) mostrar = false;
          if (filtrosPorCategoria.procedimentos.length > 0 && !filtrosPorCategoria.procedimentos.includes(procedimentos)) mostrar = false;
          if (filtrosPorCategoria.config.length > 0 && !filtrosPorCategoria.config.includes(config)) mostrar = false;
          if (filtrosPorCategoria.erros.length > 0 && !filtrosPorCategoria.erros.includes(erros)) mostrar = false;
          if (filtrosPorCategoria.segmento.length > 0 && !filtrosPorCategoria.segmento.includes(segmento)) mostrar = false;
          if (filtrosPorCategoria.adicionais.length > 0 && !filtrosPorCategoria.adicionais.includes(adicionais)) mostrar = false;
  
          art.style.display = mostrar ? 'flex' : 'none';
      });
  }
    
    // --------------------------------------------------------------------------------------
    // 4. Listener de eventos para seleção única e atualização de filtros
    // --------------------------------------------------------------------------------------
    filtros.forEach(ch => {
        ch.addEventListener('change', (e) => {
            const checkboxAtual = e.target;
            
            // Lógica de seleção única para o 'segmento'
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
    // 5. Listener para o botão "Limpar Filtros" (Mantém o segmento)
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
    // 6. Inicialização da Página
    // --------------------------------------------------------------------------------------
    artigos.forEach(art => art.style.display = 'none');
    gerenciarVisibilidadeGrupos(null); 
  });