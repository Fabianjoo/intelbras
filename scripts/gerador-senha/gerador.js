/* ================= ELEMENTOS ================= */

const btnGerar = document.getElementById('gerar-senha')
const btnCopiar = document.getElementById('copiar-senha')
const btnLimpar = document.getElementById('limpar-senha')

const nsInput = document.getElementById('ns')
const dataInput = document.getElementById('data')
const versaoInput = document.getElementById('versao')

const resultadoSenha = document.getElementById('resultado-senha')

const textoOriginalBotao = btnCopiar.innerHTML

resultadoSenha.style.display = 'none'
btnCopiar.style.display = 'none'
btnLimpar.style.display = 'none'

/* ================= EVENTOS ================= */

btnGerar.addEventListener('click', async () => {
  const ns = nsInput.value.trim().toUpperCase()
  const data = dataInput.value
  const versao = versaoInput.value

  if (!ns || ns.length !== 13 || !data) {
    alert('⚠️ Preencha o NS (13 caracteres) e a Data do Gravador.')
    return
  }

  resultadoSenha.style.display = 'block'
  resultadoSenha.innerHTML = '<strong>⏳ Gerando senhas...</strong>'

  try {
    const senhas = await gerarTodasSenhas(data, ns, versao)

    let html = `
      <p><strong>🔐 Acesso provisório</strong></p>
      <p>
        Vá até o monitor e mouse do gravador e digite uma das senhas abaixo.<br><br>
        Usuário: <strong>admin</strong><br><br>
        Senhas:
      </p>
    `

    senhas.forEach(s => {
      html += `<p style="font-size:20px"><strong>${s.senha}</strong></p>`
    })

    html += `
      <p>
        ⚠️ Caso apareça <strong>Usuário Bloqueado</strong>, ou <strong>Conta Bloqueada</strong> reinicie o equipamento pois se não mesmo com a senha correta ele não irá entrar.
      </p>

      <p>
        Após acessar, altere a senha:<br>
        <strong>Vá em Menu Principal &gt; Sistema &gt; Conta</strong><br>
        Edite o usuário <strong>admin</strong> e clique em <strong>Modificar Senha</strong>. (A senha antiga é a numeração usada para acessar o gravador)
        <br><br>
        <strong>Senha provisória válida por 1 dia.</strong>
      </p>

     <p><strong>🎥 TUTORIAL MODIFICAR SENHA:</strong></p>

      <p>
        <strong>Interface Nova</strong><br>
        <a href="https://youtube.com/clip/UgkxjzIt-XWW_FYuSKqRotqnkJ7FxpoCUvue?si=9e2VzKmWYX_Az9c_" target="_blank">
          https://youtube.com/clip/UgkxjzIt-XWW_FYuSKqRotqnkJ7FxpoCUvue
        </a>
      </p>

      <p>
        <strong>Interface Antiga</strong><br>
        <a href="https://bit.ly/2OTkom5" target="_blank">
          https://bit.ly/2OTkom5
        </a>
      </p>

       <p>
        <strong>Interface VD</strong><br>
        <a href="https://www.youtube.com/watch?v=p27Dj5RQguQ" target="_blank">
          https://www.youtube.com/watch?v=p27Dj5RQguQ
        </a>
      </p>
    `

    resultadoSenha.innerHTML = html
    btnCopiar.style.display = 'block'
    btnLimpar.style.display = 'block'
  } catch (erro) {
    resultadoSenha.innerHTML = '<p style="color:red"><strong>Erro ao gerar senha.</strong></p>'
    btnLimpar.style.display = 'block'
    console.error(erro)
  }
})

btnCopiar.addEventListener('click', async () => {
  const texto = resultadoSenha.innerText.trim()
  if (!texto) return

  try {
    await navigator.clipboard.writeText(texto)

    btnCopiar.innerHTML = '✅ Texto copiado!'
    btnCopiar.classList.add('copiado')
    btnCopiar.disabled = true

    setTimeout(() => {
      btnCopiar.innerHTML = textoOriginalBotao
      btnCopiar.classList.remove('copiado')
      btnCopiar.disabled = false
    }, 2000)
  } catch (err) {
    console.error('Erro ao copiar:', err)
  }
})

btnLimpar.addEventListener('click', async () => {
    resultadoSenha.style.display = 'none'
    btnCopiar.style.display = 'none'
    btnLimpar.style.display = 'none'

    nsInput.value = ''
    dataInput.value = ''
    versaoInput.value = ''
  })

/* ================= REGRAS DE VERSÃO ================= */

function obterAnoVersao(versao) {
  if (!versao) return null
  return Number(versao.split('-')[0])
}

function definirGeradores(anoVersao) {
  if (!anoVersao) {
    return [4,'3-api','3-local',2,1]
  }

  if (anoVersao <= 2016) {
    return [2,1]
  }

  if (anoVersao >= 2017 && anoVersao <= 2018) {
    return ['3-api','3-local']
  }

  return [4]
}

/* ================= GERADOR PRINCIPAL ================= */

async function gerarTodasSenhas(dataDvr, ns, versao) {
  const anoVersao = obterAnoVersao(versao)
  const geradores = definirGeradores(anoVersao)
  const senhas = []

  for (const g of geradores) {
    if (g === 1) {
      senhas.push({ tipo: 1, senha: await gerarSenhaAPI(1, dataDvr) })
    }

    if (g === 2) {
      senhas.push({ tipo: 2, senha: await gerarSenhaAPI(2, dataDvr) })
    }

    if (g === '3-local') {
      senhas.push({ tipo: '3 (local)', senha: gerarSenha3Local(dataDvr) })
    }

    if (g === '3-api') {
      senhas.push({ tipo: '3 (API)', senha: await gerarSenhaAPI(3, dataDvr, ns) })
    }

    if (g === 4) {
      senhas.push({ tipo: 4, senha: await gerarSenhaAPI(4, dataDvr, ns) })
    }
  }

  return senhas
}

/* ================= GERADORES ================= */

function gerarSenha3Local(dataDvr) {
  const [ano, mes, dia] = dataDvr.split('-')
  const date = (+dia) + (+mes * 100) + (+ano * 10000)
  const senha = (date * 283848 % 1000000) + 1000000
  return String(senha).substring(1)
}

async function gerarSenhaAPI(tipo, dataDvr, ns = '') {
  let url = `https://recsenha-callcenter.intelbras.com.br/ws/gera_senha/${tipo}/?data=${dataDvr}`
  if (ns) url += `&ns=${ns}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Erro no gerador ${tipo}`)
  }

  const json = await response.json()
  return json.contra_senha
}


/* JUFENG */

function consultarContraSenha() {
  const el = document.getElementById("resultado-jufeng");
  var chave = document.getElementById("chave-jufeng").value.trim();

  if (!chave) {
    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.innerText = "⚠️ Informe a chave!";
    return;
  }

  var authorization = "QW1YdjAyX2dwSFVWeVZ4dUp1ZkRzZWE3RmZBYTpVMVRjblJDNWZ3Y2lzbFd1U0NaR2RzMTRMOThh";

  el.style.display = "block";
  el.innerText = "⏳ Gerando...";

  fetch("https://apim.intelbras.com.br/oauth2/token", {
    method: "POST",
    headers: {
      "Authorization": "Basic " + authorization,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  })
  .then(response => {
    if (response.ok) return response.json();
    throw new Error("Erro na solicitação de token");
  })
  .then(data => {
    var accessToken = data.access_token;
    return fetch(`https://api-v2.intelbras.com.br/contra-senha/1.0.0/${chave}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    });
  })
  .then(response => {
    if (response.ok) return response.json();
    throw new Error("Erro na solicitação da contra-senha");
  })
  .then(data => {
    const codigo = data.contra_senha;

    const instrucao = `🔐 Código de Reset: ${codigo}

📋 Passo a passo para resetar o equipamento:

1️⃣ Abra o software e localize o campo "Código"
2️⃣ Digite o código: ${codigo}
3️⃣ Selecione a opção "Geral" na caixa de seleção
4️⃣ Clique no botão "Reset Geral"

✅ Se aparecer a mensagem "Sucesso", o equipamento foi resetado com êxito!

🔑 Após o reset, utilize as credenciais padrão:
   • Usuário: admin
   • Senha: admin`;

    el.innerHTML = `
      <div style="
        background: #f0f8e8;
        border: 1px solid #639922;
        border-radius: 8px;
        padding: 14px 16px;
        margin-top: 8px;
        font-size: 14px;
        line-height: 1.7;
        color: #1a2e10;
        white-space: pre-wrap;
      ">${instrucao}</div>

      <div style="display:flex; gap:10px; margin-top:10px;">
        <button onclick="copiarInstrucao()" style="
          padding: 8px 18px;
          background: #3B6D11;
          color: #EAF3DE;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background .2s;
        " onmouseover="this.style.background='#27500A'"
           onmouseout="this.style.background='#3B6D11'">
          📋 Copiar instruções
        </button>

        <button onclick="limparResultado()" style="
          padding: 8px 18px;
          background: #fff;
          color: #991b1b;
          border: 1.5px solid #991b1b;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background .2s, color .2s;
        " onmouseover="this.style.background='#991b1b'; this.style.color='#fff'"
           onmouseout="this.style.background='#fff'; this.style.color='#991b1b'">
          🗑️ Limpar
        </button>
      </div>
    `;

    window._instrucaoCopiar = instrucao;
  })
  .catch(error => {
    console.error(error);
    el.innerText = "❌ Erro ao consultar API";
  });
}

function copiarInstrucao() {
  if (!window._instrucaoCopiar) return;

  const btn = document.querySelector('[onclick="copiarInstrucao()"]');

  navigator.clipboard.writeText(window._instrucaoCopiar)
    .then(() => {
      if (btn) {
        btn.innerText = '✅ Copiado!';
        setTimeout(() => { btn.innerText = '📋 Copiar instruções'; }, 2000);
      }
    })
    .catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = window._instrucaoCopiar;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      if (btn) {
        btn.innerText = '✅ Copiado!';
        setTimeout(() => { btn.innerText = '📋 Copiar instruções'; }, 2000);
      }
    });
}

function limparResultado() {
  const el = document.getElementById("resultado-jufeng");
  el.innerHTML = '';
  el.style.display = 'none';
  el.style.flexDirection = '';
  document.getElementById("chave-jufeng").value = '';
  window._instrucaoCopiar = null;
}
