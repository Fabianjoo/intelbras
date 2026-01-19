document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("caixa-pesquisa");
  const pdfBoxes = document.querySelectorAll(".pdf-box");
  const filtros = document.querySelectorAll(".softwares, .equip, .outros");
  const limparBtn = document.querySelector(".limpar-filtro");

  // 🔒 Esconder todos ao carregar
  pdfBoxes.forEach(box => {
    box.style.display = "none";
  });

  function aplicarFiltros() {
    const textoBusca = searchInput.value.trim().toLowerCase();

    const softwaresSelecionados = Array.from(
      document.querySelectorAll(".softwares:checked")
    ).map(el => el.dataset.filter);

    const equipamentosSelecionados = Array.from(
      document.querySelectorAll(".equip:checked")
    ).map(el => el.dataset.filter);

    const outrosSelecionados = Array.from(
      document.querySelectorAll(".outros:checked")
    ).map(el => el.dataset.filter);

    const nenhumFiltroAtivo =
      textoBusca === "" &&
      softwaresSelecionados.length === 0 &&
      equipamentosSelecionados.length === 0 &&
      outrosSelecionados.length === 0;

    if (nenhumFiltroAtivo) {
      pdfBoxes.forEach(box => (box.style.display = "none"));
      return;
    }

    pdfBoxes.forEach(box => {
      const titulo = box.querySelector("h3")?.innerText.toLowerCase() || "";
      const software = box.dataset.software || "";
      const equipamento = box.dataset.equipamento || "";
      const outros = box.dataset.outros || "";

      const matchBusca = titulo.includes(textoBusca);

      const matchSoftware =
        softwaresSelecionados.length === 0 ||
        softwaresSelecionados.includes(software);

      const matchEquip =
        equipamentosSelecionados.length === 0 ||
        equipamentosSelecionados.includes(equipamento);

      const matchOutros =
        outrosSelecionados.length === 0 ||
        outrosSelecionados.some(o => outros.includes(o));

      if (matchBusca && matchSoftware && matchEquip && matchOutros) {
        box.style.display = "block";
      } else {
        box.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", aplicarFiltros);
  filtros.forEach(f => f.addEventListener("change", aplicarFiltros));

  limparBtn.addEventListener("click", () => {
    searchInput.value = "";
    filtros.forEach(f => (f.checked = false));
    pdfBoxes.forEach(box => (box.style.display = "none"));
  });
});
