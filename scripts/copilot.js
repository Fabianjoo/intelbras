async function enviarTexto() {
  const texto = document.getElementById("entrada").value;
  const saida = document.getElementById("saida");
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
}
