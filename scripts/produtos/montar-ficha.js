function montarFichaTecnica(produto) {
    return `
      <h2>${produto.nome}</h2>
      <p class="descricao">${produto.descricao}</p>

      <div class="btn-produto-container">
        <a href="${produto.ficha}" target="_blank" class="btn-produto-ficha">
          📄 Abrir Ficha Técnica
        </a>
          <a href="${produto.manual}" target="_blank" class="btn-produto-manual">
          📚 Abrir Manual
        </a>
      </div>
  
      ${secao("Canais", `
        <ul>
          <li>${produto.canais.bnc} canais BNC</li>
          <li>${produto.canais.ip_adicional} canais IP adicionais</li>
          <li>Máx. IP modo NVR: ${produto.canais.max_ip_modo_nvr}</li>
        </ul>
      `)}
  
      ${secao("Tecnologias", `
        <p>${produto.tecnologias.join(" / ")}</p>
      `)}
  
      ${secao("Resoluções suportadas", resolucoesDetalhadas(produto.resolucoes_suportadas))}
  
      ${secao("Vídeo", `
        <ul>
          <li>Compressão: ${produto.video.compressao.join(", ")}</li>
          <li>Saídas: ${produto.video.saidas_video.join(", ")}</li>
          <li>Resolução de saída: ${produto.video.resolucao_saida_max}</li>
          <li>Tela Adicional: ${produto.video.tela_adicional}</li>
        </ul>
      `)}
  
      ${secao("Áudio", `
        <ul>
          <li>Entrada: ${produto.audio.entrada}</li>
          <li>Saída: ${produto.audio.saida}</li>
          <li>Áudio HDCVI: ${simNao(produto.audio.hdcvi_audio)}</li>
        </ul>
      `)}
  
      ${secao("Gravação", gravacaoDetalhada(produto.gravacao))}
  
      ${secao("Inteligência de vídeo", inteligenciaDetalhada(produto.inteligencia))}
  
      ${secao("Rede", `
        <ul>
          <li>Ethernet: ${produto.rede.ethernet}</li>
          <li>Throughput: ${produto.rede.throughput_mbps} Mbps</li>
          <li>ONVIF: ${simNao(produto.rede.onvif)}</li>
          <li>Wi-Fi USB: ${simNao(produto.rede.wifi_usb)}</li>
          <li>Conexões simultâneas: ${produto.rede.conexoes_simultaneas}</li>
        </ul>
      `)}
  
      ${secao("Armazenamento", `
        <ul>
          <li>${produto.armazenamento.sata}× SATA</li>
          <li>Capacidade máxima: ${produto.armazenamento.capacidade_max_tb} TB</li>
        </ul>
      `)}
  
      ${secao("Interfaces", `
        <ul>
          <li>USB: ${produto.interfaces.usb}</li>
          <li>RS-485: ${simNao(produto.interfaces.rs485)}</li>
          <li>RS-232: ${simNao(produto.interfaces.rs232)}</li>
        </ul>
      `)}
  
      ${secao("Energia", `
        <ul>
          <li>Fonte: ${produto.energia.fonte}</li>
          <li>Consumo: ${produto.energia.consumo_w}</li>
        </ul>
      `)}
  
      ${secao("Dimensões físicas", `
        <ul>
          <li>Dimensões: ${produto.fisico.dimensoes_mm} mm</li>
          <li>Peso: ${produto.fisico.peso_kg} kg</li>
        </ul>
      `)}
  
      
    `;
  }
  

  function secao(titulo, conteudo) {
    return `
      <section class="secao">
        <h3>${titulo}</h3>
        ${conteudo}
      </section>
    `;
  }
  
  function simNao(valor) {
    return valor ? "Sim" : "Não";
  }
  
  function resolucoesDetalhadas(res) {
    let html = "<ul>";
    if (res.hdcvi) html += `<li>HDCVI: ${res.hdcvi.join(" / ")}</li>`;
    if (res.ahd) html += `<li>AHD: ${res.ahd.join(" / ")}</li>`;
    if (res.hdtvi) html += `<li>HDTVI: ${res.hdtvi.join(" / ")}</li>`;
    if (res.ip) html += `<li>IP: ${res.ip.join(" / ")}</li>`;
    if (res.analogico) html += `<li>Analógico: ${res.analogico.join(" / ")}</li>`;
    html += "</ul>";
    return html;
  }

  function gravacaoDetalhada(gravacao) {
    let html = "";
  
    // HDCVI
    if (gravacao.hdcvi && gravacao.hdcvi.length > 0) {
      html += "<h5>HDCVI</h5><ul>";
      gravacao.hdcvi.forEach(item => {
        html += `
          <li>
            • ${item.canais ? item.canais + " canal(is) em " : ""}
            ${item.resolucao} (${item.fps} FPS)
          </li>
        `;
      });
      html += "</ul><br>";
    }
  
    // IP
    if (gravacao.ip && gravacao.ip.length > 0) {
      html += "<h5>IP</h5><ul>";
      gravacao.ip.forEach(item => {
        html += `
          <li>
            • ${item.resolucao} (${item.fps} FPS)
          </li>
        `;
      });
      html += "</ul><br>";
    }
  
    // Analógico
    if (gravacao.analogico && gravacao.analogico.length > 0) {
      html += "<h5>Analógico</h5><ul>";
      gravacao.analogico.forEach(item => {
        html += `
          <li>
            • ${item.resolucao} (${item.fps} FPS)
          </li>
        `;
      });
      html += "</ul>";
    }
  
    return html;
  }
  
  function inteligenciaDetalhada(ia) {
    if (!ia) return "<p>—</p>";
  
    let html = "<ul>";
  
    if (ia.detecao_inteligente?.ativo)
      html += `<li>• Detecção inteligente (${ia.detecao_inteligente.canais} canais)</li>`;
  
    if (ia.linha_cerca_virtual?.ativo)
      html += `<li>• Linha e cerca virtual (Avançado: ${ia.linha_cerca_virtual.canais_avancado}, Geral: ${ia.linha_cerca_virtual.canais_geral})</li>`;
  
    if (ia.cerca_virtual?.ativo)
      html += `<li>• Cerca virtual (${ia.cerca_virtual.canais} canais)</li>`;
  
    if (ia.reconhecimento_facial?.ativo)
      html += `
        <li>• Reconhecimento facial
          <ul>
            <li>Canais: ${ia.reconhecimento_facial.canais_processamento}</li>
            <li>Faces/s: ${ia.reconhecimento_facial.faces_por_segundo}</li>
            <li>Bancos: ${ia.reconhecimento_facial.bancos_faces}</li>
            <li>Máx faces: ${ia.reconhecimento_facial.max_faces}</li>
          </ul>
        </li>
      `;
  
    html += "</ul>";
    return html;
  }
  