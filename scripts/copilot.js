document.querySelectorAll(".reformular").forEach(btn => {
  btn.addEventListener("click", async () => {
    const targetId = btn.getAttribute("data-target");
    const textarea = document.getElementById(targetId);
    const texto = textarea.value;

    // Onde mostrar a resposta (pode ser um <ul> ou <textarea>)
    let saida = textarea.nextElementSibling; // pega o próximo elemento após o textarea
    if (!saida) {
      saida = document.createElement("div");
      textarea.insertAdjacentElement("afterend", saida);
    }

    saida.innerText = "⏳ Processando...";

    try {
      const response = await fetch("/api/reformular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto }),
      });

      const data = await response.json();
      saida.innerText = data.resposta || "⚠️ Nenhuma resposta recebida";
    } catch (error) {
      console.error(error);
      saida.innerText = "❌ Erro ao conectar com o servidor";
    }
  });
});
