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

document.querySelectorAll(".btn-reformular").forEach(btn => {
  btn.addEventListener("click", async (e) => {
    // acha o textarea que está no mesmo bloco do botão
    const textarea = e.target.closest("div").querySelector("textarea");

    if (!textarea) {
      console.error("Textarea não encontrado!");
      return;
    }

    const texto = textarea.value.trim();
    if (!texto) {
      alert("Digite algo para reformular!");
      return;
    }

    const resultado = await enviarTexto(texto);
    if (resultado) {
      textarea.value = resultado; // substitui o texto reformulado
    }
  });
});
