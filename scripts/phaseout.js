let produtos = [];

// 1. Carrega o JSON
fetch("../scripts/produtos.json")
  .then(res => res.json())
  .then(data => {
    produtos = data.tabela;
  });

const input = document.getElementById("serialInputphaseout");
const sugestoes = document.getElementById("sugestoes");
const resultado = document.getElementById("resultadophaseout");

// 2. Mostrar sugestões enquanto digita
input.addEventListener("input", () => {
  const termo = input.value.toLowerCase().trim();
  sugestoes.innerHTML = ""; // limpa sugestões anteriores

  if (termo.length > 0) {
    const filtrados = produtos.filter(p =>
      p.nome.toLowerCase().includes(termo)
    );

    filtrados.slice(0, 5).forEach(p => {
      const li = document.createElement("li");
      li.textContent = p.nome;
      li.style.cursor = "pointer";
      li.style.padding = "6px";
      li.style.borderBottom = "1px solid #ddd";
      li.style.background = "#fff";

      li.addEventListener("mouseover", () => li.style.background = "#f0f0f0");
      li.addEventListener("mouseout", () => li.style.background = "#fff");

      // ao clicar em uma sugestão, preencher o input com ela
      li.addEventListener("click", () => {
        input.value = p.nome;
        sugestoes.innerHTML = ""; // esconde a lista
      });

      sugestoes.appendChild(li);
    });
  }
});

// 3. Quando clicar em Consultar, mostra a data de phaseout e se deve atender
document.getElementById("consultarBtnphaseout").addEventListener("click", () => {
  const termo = input.value.toLowerCase().trim();
  const produto = produtos.find(p => p.nome.toLowerCase() === termo);

  if (produto) {
    let atender = "";
    let cor = "green";

    // Caso esteja em linha
    if (produto.phaseout.toLowerCase() === "equipamento em linha") {
      atender = "Sim";
    } 
    // Caso tenha data válida
    else if (produto.data) {
      const hoje = new Date();
      const dataPhaseout = new Date(produto.data);
      const diffAnos = (hoje - dataPhaseout) / (1000 * 60 * 60 * 24 * 365);

      if (diffAnos > 3) {
        atender = "Não";
        cor = "red";
      } else {
        atender = "Sim";
        cor = "green";
      }
    } 
    // Caso não tenha data e não esteja em linha
    else {
      atender = "Desconhecido";
      cor = "gray";
    }

    resultado.innerHTML = `
  <strong style="color:black;">Modelo:</strong> <span style="color:black;">${produto.nome}</span> <br>
  <strong style="color:black;">Phase Out:</strong> <span style="color:black;">${produto.phaseout}</span> <br>
  <strong style="color:black;">Devo atender?</strong> 
  <span style="color:${cor}; font-weight:bold">${atender}</span><br>
  <a href="${produto.link}" target="_blank" class="ver-detalhes">Página do Produto</a>
`;
  } else {
    resultado.innerHTML = "<p style='color:red;'>Produto não encontrado.</p>";
  }
});

// 4. Esconder sugestões ao clicar fora
document.addEventListener("click", (e) => {
  if (!sugestoes.contains(e.target) && e.target !== input) {
    sugestoes.innerHTML = "";
  }
});
