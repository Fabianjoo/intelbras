function resolucoesPorTecnologia(resolucoes) {
    if (!resolucoes) return "-";
  
    const prioridade = [
      "8K",
      "4K",
      "6MP",
      "5MP",
      "4MP",
      "3MP",
      "1080p",
      "720p",
      "960H",
      "D1",
      "CIF"
    ];
  
    function maiorResolucao(lista) {
      for (let p of prioridade) {
        if (lista.includes(p)) return p;
      }
      return lista[0];
    }
  
    const linhas = [];
  
    if (resolucoes.hdcvi?.length) {
      linhas.push(`HDCVI: ${maiorResolucao(resolucoes.hdcvi)}`);
    }
  
    if (resolucoes.ip?.length) {
      linhas.push(`IP: ${maiorResolucao(resolucoes.ip)}`);
    }

    if (resolucoes.analogico?.length) {
        linhas.push(`Analógico: ${maiorResolucao(resolucoes.analogico)}`);
      }
  
    return linhas.join(" <br> ");
  }



  
  function resumoIA(inteligencia) {
    if (!inteligencia) return "-";
  
    const itens = [];
  
    if (inteligencia.linha_cerca_virtual?.ativo)
      itens.push(`Perimetral (${inteligencia.linha_cerca_virtual.canais_avancado} avançado / ${inteligencia.linha_cerca_virtual.canais_geral} geral)`);
  
    if (inteligencia.reconhecimento_facial?.ativo)
      itens.push("Reconhecimento Facial");
  
    if (inteligencia.detecao_inteligente?.ativo)
      itens.push("Detecção Inteligente");
  
  
    return itens.length ? itens.join(" / ") : "—";
  }
  