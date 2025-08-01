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

  // Importar para o localStorage
  document.getElementById("importar").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const dados = JSON.parse(e.target.result);
        for (const chave in dados) {
          localStorage.setItem(chave, dados[chave]);
        }
        alert("Dados importados com sucesso!");
      } catch (err) {
        alert("Erro ao importar JSON: " + err.message);
      }
    };
    reader.readAsText(file);
  });