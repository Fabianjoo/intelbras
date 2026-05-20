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
  document.getElementById('resultado').innerText = "🔎 Consultando número de série...\nAguarde...";

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

    // Tratamento de erros específicos
    if (response.status === 404) {
      document.getElementById('resultado').innerText = "❌ Erro 404: Número de série não encontrado";
      return;
    }

    if (response.status === 401) {
      document.getElementById('resultado').innerText = "⏳ Acesso expirado. Por favor, recarregue a página.";
      return;
    }

    // Outros erros
    if (!response.ok) throw new Error(`Erro na consulta: ${response.status}`);

    const data = await response.json();

    // Exibe resultado na div
    document.getElementById('resultado').innerHTML = `
      ✅ Modelo: ${data.name || 'Não encontrado'} <br>
      🗓️ Data de Fabricação: ${data.productionDate || 'Não informado'} <br>
      🔁 Política de Troca: ${data.repairPolicy || 'Não informado'}
    `;

  } catch (err) {
    document.getElementById('resultado').innerText = `⚠️ Erro: ${err.message}`;
    console.error(err);
  }
}


// BOTÕES HTML DO POPOVER
const btnBusca = document.getElementById('btnbusca');
const popover = document.getElementById('popover');
const consultarBtn = document.getElementById('consultarBtn');
const serialInput = document.getElementById('serialInput');
const tabelaBtn = document.getElementById('tabela-transferenciabtn');
const popoverContents = document.querySelectorAll('.popover-content');
const tabelaTransferencia = document.querySelector('.tabela-transferencia');

// Estado inicial: esconde a tabela
tabelaTransferencia.style.display = 'none';

function resetPopover() {
  tabelaTransferencia.style.display = 'none';
  popoverContents.forEach(el => el.style.display = 'block');
  tabelaBtn.innerHTML = 'Tabela de Transferência';
  tabelaBtn.classList.remove('btn-voltar');
}

/* BUSCAR */
btnBusca.addEventListener('click', () => {
  popover.style.display = 'flex';
  serialInput.focus();
});

/* AO CLICAR FORA FECHA E RESETA */
popover.addEventListener('click', e => {
  if (e.target === popover) {
    popover.style.display = 'none';
    resetPopover();
  }
});

/* TABELA TRANSFERENCIA TOGGLE */
tabelaBtn.addEventListener('click', () => {
  const isVisible = tabelaTransferencia.style.display === 'block';

  if (!isVisible) {
    popoverContents.forEach(el => el.style.display = 'none');
    tabelaTransferencia.style.display = 'block';
    tabelaBtn.innerHTML = 'Voltar';
    tabelaBtn.classList.add('btn-voltar');
  } else {
    resetPopover();
  }
});

/* CONSULTAR */
consultarBtn.addEventListener('click', () => {
  const serial = serialInput.value.trim();
  if (!serial) {
    alert('Digite um número de série!');
    return;
  }

  consultarSerial(serial);
});
