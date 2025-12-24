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
