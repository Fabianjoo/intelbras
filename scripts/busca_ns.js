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
  if (!token) await geraNovoToken(); // garante token

  try {
    const response = await fetch(`https://api-v2.intelbras.com.br/products/1.0.0/serial-numbers/${serial}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.access_token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error(`Erro na consulta: ${response.status}`);
    const data = await response.json();

    // Exibe resultado na div
    document.getElementById('resultado').innerText = `
Modelo: ${data.name || 'Não encontrado'}
Data de Fabricação: ${data.productionDate || 'Não informada'}
`;
  } catch (err) {
    document.getElementById('resultado').innerText = `Erro: ${err.message}`;
    console.error(err);
  }
}

// Eventos do seu código existente
const btnBusca = document.getElementById('btnbusca');
const popover = document.getElementById('popover');
const closeBtn = document.getElementById('closeBtn');
const consultarBtn = document.getElementById('consultarBtn');
const serialInput = document.getElementById('serialInput');

btnBusca.addEventListener('click', () => {
  popover.style.display = 'flex';
  serialInput.focus();
});

closeBtn.addEventListener('click', () => popover.style.display = 'none');

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
