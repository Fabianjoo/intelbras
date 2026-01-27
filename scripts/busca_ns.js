let token = null;

// Função para gerar token
async function geraNovoToken() {
  try {
    const response = await fetch('https://apim.intelbras.com.br/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic RkZfbGwyUF9Va2FXOHJBaWQ4MGZuc0hNZ0JJYTpoZ3hUZGRhU2djY2t0NWFhcEprSThXUXVKSHNh',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    if (!response.ok) throw new Error(`Erro ao obter token: ${response.status}`);
    token = await response.json();
  } catch (err) {
    console.error('Erro ao gerar token:', err);
    document.getElementById('resultado').innerText = `Erro ao gerar token`;
  }
}

// Função para consultar o número de série
async function consultarSerial(serial) {
  // Feedback enquanto consulta
  document.getElementById('resultado').innerText =
    "🔎 Consultando número de série...\nAguarde...";

  try {
    // 👉 Agora chama SUA API, não a Intelbras
    const response = await fetch(`/api/serial?serial=${serial}`);

    if (response.status === 404) {
      document.getElementById('resultado').innerText =
        "❌ Número de série não encontrado";
      return;
    }

    if (!response.ok) {
      document.getElementById('resultado').innerText =
        "⚠️ Erro ao consultar número de série";
      return;
    }

    const data = await response.json();

    document.getElementById('resultado').innerHTML = `
      ✅ Modelo: ${data.name || 'Não encontrado'} <br>
      🗓️ Data de Fabricação: ${data.productionDate || 'Não informado'} <br>
      🔁 Política de Troca: ${data.repairPolicy || 'Não informado'}
    `;

  } catch (err) {
    document.getElementById('resultado').innerText =
      "⚠️ Erro de conexão";
    console.error(err);
  }
}



// BOTÕES HTML DO POPOVER
const btnBusca = document.getElementById('btnbusca');
const popover = document.getElementById('popover');
const consultarBtn = document.getElementById('consultarBtn');
const serialInput = document.getElementById('serialInput');

/* BUSCAR */
btnBusca.addEventListener('click', () => {
  popover.style.display = 'flex';
  serialInput.focus();
});

/* AO CLICAR FORA FECHA */
popover.addEventListener('click', e => {
  if (e.target === popover) popover.style.display = 'none';
});

// Adaptando seu consultarBtn para chamar a API
consultarBtn.addEventListener('click', () => {
  const serial = serialInput.value.trim();
  if (!serial) {
    alert('Digite um número de série!');
    return;
  }

  consultarSerial(serial); // chama função que faz fetch e exibe resultado
});
