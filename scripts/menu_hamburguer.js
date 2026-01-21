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
  