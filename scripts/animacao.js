// seleciona todos os títulos
const titulos = document.querySelectorAll(".ferramentas .titulo");

titulos.forEach(titulo => {
  const ul = titulo.nextElementSibling; // pega a ul correspondente

  // mostra ao passar o mouse
  titulo.addEventListener("mouseenter", () => {
    ul.style.opacity = "1";
    ul.style.transform = "translateY(0)";
    ul.style.pointerEvents = "auto";

    // garante que fique acima de tudo
    ul.style.position = "relative";
    ul.style.zIndex = "9999";

    // muda seta para cima
    const p = titulo.querySelector("p");
    p.textContent = p.textContent.replace("⬇️", "⬆️");
  });

  // esconde quando o mouse sai do container
  titulo.parentElement.addEventListener("mouseleave", () => {
    ul.style.opacity = "0";
    ul.style.transform = "translateY(-10px)";
    ul.style.pointerEvents = "none";

    // reseta o z-index se quiser
    ul.style.zIndex = "1";

    // volta a seta para baixo
    const p = titulo.querySelector("p");
    p.textContent = p.textContent.replace("⬆️", "⬇️");
  });
});
