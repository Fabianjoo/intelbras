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
    console.log("Resposta do servidor:", data);
    return data;
  } catch (error) {
    console.error("Erro no frontend:", error);
    return null;
  }
}

// exemplo para botão de reformular no campo "fato"
document.addEventListener("DOMContentLoaded", () => {
  const btns = document.querySelectorAll(".btn-reformular");

  btns.forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const textarea = e.target.closest("div").querySelector("textarea");
      const texto = textarea.value.trim();

      if (!texto) return alert("Digite algo para reformular!");

      const resultado = await enviarTexto(texto);

      if (resultado && resultado.resultado) {
        textarea.value = resultado.resultado;
      }
    });
  });
});
