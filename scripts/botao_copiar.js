// Seleciona todos os botões de cópia
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

} else if (botao.textContent.includes("1")) {
// Caso seja botão de copiar link de vídeo
const link = 'Tutorial Recuperar Senha de Gravador: https://www.youtube.com/watch?v=UDHGJgvRGe4';

navigator.clipboard.writeText(link)
  .then(() => {
    botao.textContent = "✅ Link copiado!";
    setTimeout(() => {
      botao.textContent = textoOriginal;
    }, 2000);
  })
  .catch(err => {
    alert("Erro ao copiar o link: " + err);
  });
}else if (botao.textContent.includes("2")) {
  // Caso seja botão de copiar link de vídeo
  const link = 'Tutorial Recuperar Senha de Câmera IP: https://www.youtube.com/watch?v=fv3F_IYmAgE&t=57s';
  
  navigator.clipboard.writeText(link)
    .then(() => {
      botao.textContent = "✅ Link copiado!";
      setTimeout(() => {
        botao.textContent = textoOriginal;
      }, 2000);
    })
    .catch(err => {
      alert("Erro ao copiar o link: " + err);
    });
  }
  });
});