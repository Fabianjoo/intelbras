async function enviarTexto(texto) {
  try {
    const response = await fetch("/api/reformular", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("Resposta API:", data);
    return data.resultado;
  } catch (error) {
    console.error("Erro no frontend:", error);
    return null;
  }
}

// Seleciona todos os botões de reformular
document.querySelectorAll(".reformular").forEach(btn => {
  btn.addEventListener("click", async (e) => {
    const targetId = e.target.dataset.target; // pega o data-target do botão
    if (!targetId) {
      console.error("Data-target não definido!");
      return;
    }

    const textarea = document.getElementById(targetId);
    if (!textarea) {
      console.error(`Textarea com id "${targetId}" não encontrado!`);
      return;
    }

    const texto = textarea.value.trim();
    if (!texto) {
      alert("Digite algo para reformular!");
      return;
    }

    const resultado = await enviarTexto(texto);
    console.log("Texto reformulado recebido:", resultado);

    if (resultado) {
      textarea.value = resultado; // substitui o texto reformulado
    } else {
      alert("Não foi possível reformular o texto. Confira o console.");
    }
  });
});
