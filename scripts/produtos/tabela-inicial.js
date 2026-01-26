window.produtosCache = [];

carregarProdutos(produtos => {
    console.log("Produtos recebidos:", produtos);
  
    window.produtosCache = produtos; 
  
    gerarTabela(produtos);
  });

function gerarTabela(produtos) {
    const tbody = document.getElementById("tabela-corpo");
    tbody.innerHTML = "";
  
    produtos.forEach(produto => {
      const tr = document.createElement("tr");
  
      tr.innerHTML = `
        <td>
          <input type="checkbox" class="check-comparar" data-id="${produto.id}">
        </td>
  
        <td><button onclick="abrirPopover('${produto.id}')">${produto.nome}</button></td>
  
        <td>
          ${produto.canais.bnc} BNC
          ${produto.canais.ip_adicional ? `+ ${produto.canais.ip_adicional} IP` : ""}
        </td>
  
        <td>${resolucoesPorTecnologia(produto.resolucoes_suportadas)}</td>
  
        <td>${produto.tecnologias.join(" / ")}</td>
  
        <td>${produto.armazenamento.sata}× SATA / ${produto.armazenamento.capacidade_max_tb} TB</td>

        <td>${produto.rede.adaptador}</td>
  
        <td>
          <a href="${produto.site}" target="_blank" class="btn-produto">
            Ver produto
          </a>
        </td>
      `;
  
      tbody.appendChild(tr);
    });
  }
  
