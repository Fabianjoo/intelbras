// copilot.js
async function enviarTexto(texto) {
  try {
    const response = await fetch("/api/reformular", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto }),
    });

    if (!response.ok) {
      // Pega o erro como texto (para não quebrar no JSON inválido)
      const errorText = await response.text();
      throw new Error(`Erro ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("Resposta do servidor:", data);

    return data;
  } catch (error) {
    console.error("Erro no frontend:", error);
    alert("Falha ao processar requisição. Veja o console para detalhes.");
    return null;
  }
}

// Exemplo de uso:
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnEnviar");
  const input = document.getElementById("inputTexto");

  if (btn && input) {
    btn.addEventListener("click", async () => {
      const texto = input.value.trim();
      if (!texto) return alert("Digite algo primeiro!");

      const resultado = await enviarTexto(texto);
      if (resultado && resultado.resultado) {
        alert("Resultado: " + resultado.resultado);
      }
    });
  }
});
