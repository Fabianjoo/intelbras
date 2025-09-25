
document.getElementById("consultarBtncpf").addEventListener("click", async () => {
  const cpf = document.getElementById("cpfInput").value.replace(/\D/g, "");
  const resultado = document.getElementById("resultadocpf");

  if (cpf.length !== 11) {
    resultado.textContent = "⚠️ CPF inválido! Digite 11 números.";
    return;
  }

  resultado.textContent = "🔎 Consultando...";

  try {
    // Exemplo com a API do PedeCPF (troque pelo seu endpoint real e token)
    const response = await fetch(`https://api.pedecpf.io/v1/cpf/${cpf}?token=SEU_TOKEN_AQUI`);
    const data = await response.json();

    if (data?.nome) {
      resultado.innerHTML = `
        ✅ <strong>Nome:</strong> ${data.nome} <br>
        📄 <strong>Situação:</strong> ${data.situacao}
      `;
    } else {
      resultado.textContent = "❌ CPF não encontrado ou inválido.";
    }
  } catch (error) {
    console.error(error);
    resultado.textContent = "🚨 Erro ao consultar CPF.";
  }
});
