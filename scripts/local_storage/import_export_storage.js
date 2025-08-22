// Exportar todo o localStorage
document.getElementById("exportar").addEventListener("click", () => {
  const dados = {};
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    dados[chave] = localStorage.getItem(chave);
  }

  const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "backup_localstorage.json";
  a.click();
  URL.revokeObjectURL(url);
});

// Importar para o localStorage (limpando antes)
document.getElementById("importar").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const dados = JSON.parse(e.target.result);

      // Limpa o localStorage antes de importar
      localStorage.clear();

      // Reinsere os dados do backup
      for (const chave in dados) {
        localStorage.setItem(chave, dados[chave]);
      }

      alert("Dados importados com sucesso!");
      location.reload(); // Recarrega a página para aplicar os dados
    } catch (err) {
      alert("Erro ao importar JSON: " + err.message);
    }
  };
  reader.readAsText(file);
});

//LIMPAR LOCAL STORAGE

const botaoLimpar = document.getElementById("limpar");
botaoLimpar.addEventListener("click", () => {
  if (confirm("Tem certeza que deseja limpar todo o localStorage? Isso não pode ser desfeito!")) {
    localStorage.clear();
    alert("✅ LocalStorage limpo com sucesso!");
  }
});