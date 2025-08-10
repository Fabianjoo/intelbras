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
