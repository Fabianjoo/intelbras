document.getElementById("consultarBtncpf").addEventListener("click", async () => {
    const cpf = document.getElementById("cpfInput").value.replace(/\D/g, "");
    const resultado = document.getElementById("resultadocpf");
  
    if (cpf.length !== 11) {
      resultado.textContent = "⚠️ CPF inválido! Digite 11 números.";
      return;
    }
  
    resultado.textContent = "🔎 Consultando...";
  
    try {
      const response = await fetch(`https://api.cpfhub.io/api/cpf/${cpf}`, {
        method: "GET",
        headers: {
          "Authorization": "Bearer 932b10cb45a54969e0dcfc03ceb715bb91a30aee5436fdb7421ed0eec4801452",
          "Content-Type": "application/json"
        }
      });
  
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
  