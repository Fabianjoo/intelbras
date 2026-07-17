// Seleciona todos os botões
const botoesCopiar = document.querySelectorAll("button");

botoesCopiar.forEach(botao => {
  const textoOriginal = botao.textContent;

  botao.addEventListener("click", () => {
    // Procura o textarea mais próximo acima do botão
    const textarea = botao.previousElementSibling;

    if (textarea && textarea.tagName.toLowerCase() === "textarea") {
      // Seleciona o conteúdo do textarea
      textarea.select();
      textarea.setSelectionRange(0, 99999); // Compatibilidade com mobile

      // Copia o texto
      document.execCommand("copy");

      // Feedback opcional
      botao.textContent = "✅ Copiado!";
      setTimeout(() => {
        botao.textContent = textoOriginal;
      }, 2000);
    }
  });
});

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
