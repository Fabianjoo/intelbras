const hamburguer = document.getElementById("hamburguer")
const paginas = document.getElementById("paginas")

hamburguer.addEventListener("click", () => {
    paginas.classList.toggle("ativo");
    hamburguer.classList.toggle("ativo");
  });