   document.querySelectorAll('button').forEach(function(botao){

    // Caso 1: botões novos com data-copiar-alvo (Procedimentos Internos)
    if (botao.dataset.copiarAlvo) {
      botao.addEventListener('click', function(){
        var textarea = document.getElementById(botao.dataset.copiarAlvo);
        var alerta = document.getElementById(botao.dataset.alertaAlvo);
        if (!textarea) return;
  
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        document.execCommand('copy');
  
        if (alerta) {
          alerta.style.display = 'block';
          setTimeout(function(){ alerta.style.display = 'none'; }, 2000);
        }
      });
      return;
    }
  
    // Caso 2: botões antigos (textarea logo antes do botão no HTML)
    var textarea = botao.previousElementSibling;
    if (textarea && textarea.tagName && textarea.tagName.toLowerCase() === 'textarea') {
      var textoOriginal = botao.textContent;
      botao.addEventListener('click', function(){
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        document.execCommand('copy');
  
        botao.textContent = '✅ Copiado!';
        setTimeout(function(){ botao.textContent = textoOriginal; }, 2000);
      });
    }
  });
  
  /* ABAS PAG DE SENHA */
  document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
  
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
  
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });
  });