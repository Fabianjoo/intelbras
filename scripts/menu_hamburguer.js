const hamburguer = document.getElementById("hamburguer")
const paginas = document.getElementById("paginas")

hamburguer.addEventListener("click", () => {
    paginas.classList.toggle("ativo");
    hamburguer.classList.toggle("ativo");
  });

  window.addEventListener("scroll", () => {
    if (paginas.classList.contains("ativo")) {
      paginas.classList.remove("ativo");
      hamburguer.classList.remove("ativo");
    }
  });

  document.addEventListener("click", (event) => {
    const cliqueDentroMenu = paginas.contains(event.target);
    const cliqueNoHamburguer = hamburguer.contains(event.target);

    if (paginas.classList.contains("ativo") && !cliqueDentroMenu && !cliqueNoHamburguer) {
      paginas.classList.remove("ativo");
      hamburguer.classList.remove("ativo");
    }
  });