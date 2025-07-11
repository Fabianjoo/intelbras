const sugestoesFato = [
  "Cliente alega que o gravador não liga",
  "Cliente alega que o gravador está sem acesso remoto",
  "Cliente alega que o gravador está com o Intelbras Cloud Desconectado",
  "Cliente alega que o gravador está com o Intelbras Cloud conectado, mas sem acesso remoto",
  "Cliente alega que esqueceu a senha do gravador",
  "Cliente alega que esqueceu a senha da Câmera IP",
  "Cliente solicitou suporte para recuperação de senha da Câmera IP",
  "Cliente solicitou suporte para recuperação de senha do DVR",
  "Cliente alega que o gravador está apresentando ERRO no HD",
];

const sugestoesCausa = [
  "Situação Alegada",
  "Especificação",
  "Configuração",
  "Solicitação de Arquivo / Procedimento"
];

function configurarSugestoes(textareaId, listaId, opcoes) {
  const campo = document.getElementById(textareaId);
  const lista = document.getElementById(listaId);

  campo.addEventListener("input", () => mostrarSugestoes(campo, lista, opcoes));
  campo.addEventListener("focus", () => mostrarSugestoes(campo, lista, opcoes));

  document.addEventListener("click", (e) => {
    if (!document.getElementById(textareaId).parentElement.contains(e.target)) {
      lista.style.display = "none";
    }
  });
}

function mostrarSugestoes(campo, lista, opcoes) {
  const valor = campo.value.toLowerCase();
  lista.innerHTML = "";

  const filtradas = opcoes.filter(op => op.toLowerCase().includes(valor));
  if (filtradas.length === 0) {
    lista.style.display = "none";
    return;
  }

  filtradas.forEach(op => {
    const li = document.createElement("li");
    li.textContent = op;
    li.addEventListener("click", () => {
      campo.value = op;
      lista.style.display = "none";
    });
    lista.appendChild(li);
  });

  lista.style.display = "block";
}

// Função que mantém espaços e quebras e adiciona tab + bullet para indentação
function adicionarMarcador(texto) {
  return texto
    .split('\n')
    .map(linha => linha === "" ? "" : `\t• ${linha}`)  // mantém linha vazia, adiciona tab + bullet nas demais
    .join('\n');
}

function criarFCA() {
  const modelo = adicionarMarcador(document.getElementById("modelo").value);
  const fato = adicionarMarcador(document.getElementById("fato").value);
  const causa = adicionarMarcador(document.getElementById("causa").value);
  const acao = adicionarMarcador(document.getElementById("acao").value);
  const info = adicionarMarcador(document.getElementById("info").value);

  const resultado =
`MODELO:
${modelo}

FATO:
${fato}

CAUSA:
${causa}

AÇÃO:
${acao}

INFORMAÇÕES ADICIONAIS:
${info}`;

  document.getElementById("resultado").textContent = resultado;

  navigator.clipboard.writeText(resultado)
    .then(() => {
      const mensagem = document.getElementById("mensagem");
      mensagem.textContent = "✅ FCA gerado e copiado para a área de transferência!";
      setTimeout(() => mensagem.textContent = "", 3000);
    })
    .catch(err => {
      document.getElementById("mensagem").textContent = "Erro ao copiar FCA.";
      console.error("Erro ao copiar: ", err);
    });
}

function limparCampos() {
  ["modelo", "fato", "causa", "acao", "info"].forEach(id => {
    document.getElementById(id).value = "";
  });
  document.getElementById("resultado").textContent = "";
  document.getElementById("mensagem").textContent = "";
}

configurarSugestoes("fato", "sugestoes-fato", sugestoesFato);
configurarSugestoes("causa", "sugestoes-causa", sugestoesCausa);