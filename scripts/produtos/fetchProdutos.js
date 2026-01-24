function carregarProdutos(callback) {
    fetch("../scripts/produtos/bd-produtos/dvrs.json")
      .then(res => res.json())
      .then(dados => {
        callback(dados.produtos);
      })
      .catch(err => console.error("Erro ao carregar produtos:", err));
  }
  