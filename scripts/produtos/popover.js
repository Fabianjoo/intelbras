function abrirPopover(id) {
    if (!window.produtosCache || !window.produtosCache.length) {
      console.error("produtosCache vazio ou não definido");
      return;
    }
  
    const produto = window.produtosCache.find(
      p => String(p.id) === String(id));

    if (!produto) return;
  
    const container = document.getElementById("container-popover");
    const conteudo = document.getElementById("popover-conteudo");
  
    conteudo.innerHTML = montarFichaTecnica(produto);
    container.style.display = "flex";
  }
  
  /* FECHAR AO CLICAR FORA */
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container-popover");
  
    if (!container) return;
  
    container.addEventListener("click", e => {
      if (e.target === container) {
        container.style.display = "none";
      }
    });
  });
  