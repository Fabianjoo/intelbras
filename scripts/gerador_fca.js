// SUGESTÕES PADRÃO
const sugestoesDefault = {
  fato: [
    "Cliente alega que o gravador não liga",
    "Cliente alega que o gravador está sem acesso remoto",
    "Cliente alega que o gravador está com o Intelbras Cloud Desconectado",
    "Cliente alega que o gravador está com o Intelbras Cloud conectado, mas sem acesso remoto",
    "Cliente solicitou suporte para recuperação de senha da Câmera IP",
    "Cliente solicitou suporte para recuperação de senha do DVR",
    "Cliente solicitou suporte para recuperação de senha do Sim Next",
    "Cliente alega que o gravador está apresentando ERRO no HD",
    "Cliente relatou que o gravador não está reconhecendo o HD",
    "Cliente solicitou auxílio para cadastrar o equipamento no Sim Next",
    "Cliente solicitou auxílio para cadastrar o equipamento no Sim Play",
    "Cliente solicitou auxílio para cadastrar o equipamento no aplicativo iSIC Lite.",
    "Cliente solicitou auxílio para cadastrar a câmera Mibo no software Sim Next",
    "Cliente solicitou auxílio para cadastrar a câmera Mibo no Gravador",
    "Cliente solicitou auxílio para cadastrar a câmera no gravador",
    "Cliente solicitou ajuda para cadastrar uma câmera Hikvision no gravador, alegando que não está conseguindo realizar o procedimento",
    "Cliente relatou que a câmera estava sem audio/som e gostaria de ativar",
    "Cliente relatou que a câmera Full Color estava com o LED piscando e solicitou desativação",
    "Cliente solicitou auxílio para configurar o gravador para gravação por detecção de movimento",
    "Cliente solicitou auxílio para configurar o gravador para gravação por Regular",
    "Cliente relatou que não estava conseguindo vincular a conta Intelbras no Sim Next",
    "Cliente relatou que não estava conseguindo instalar o Sim Next",
    "Cliente relatou que o mouse parou de funcionar no gravador",
    "Cliente solicitou assistência técnica em sua região",
    "Cliente queria acionar a garantia do produto",
    "Cliente gostaria de atualizar o firmware do gravador",
    "Cliente gostaria de saber qual é a última versão de firmware disponível para o gravador",
    "Cliente gostaria de configurar a inteligência de vídeo de linha e cerca virtual",
    "Cliente gostaria de configurar a inteligência de vídeo de detecção inteligente",
    "Cliente gostaria de configurar a inteligência de vídeo de reconhecimento facial",
    "Cliente gostaria de acionar uma sirene com o multibox",
    "Cliente gostaria de acionar uma porta com eletroimã utilizando multibox",
    "Cliente alega que o gravador não está gravando por detecção de movimento",
    "Cliente alega que não consegue cadastrar a câmera no gravador",
    "Cliente alega que não consegue cadastrar a câmera Mibo no gravador",
    "Cliente alega que não consegue cadastrar o gravador no Sim Next",
    "Cliente alega que não consegue cadastrar o gravador no Sim Play",
    "Cliente alega que não consegue cadastrar o gravador no Isic Lite",
    "Cliente solicitou auxílio para criar e configurar um DDNS",
    "Cliente alega que configurou um DDNS mas não está conseguindo acessar",
    "Cliente solicitou auxílio para configurar um tour",
    "Cliente solicitou liberação de aplicativo na loja de aplicativos de outra região",
    "Cliente alega que o gravador não está inicializando",
    "Cliente gostaria de saber se havia aplicativo de monitoramento para Smart TV",
    "Cliente gostaria de configurar o espelhamento entre gravadores"
  ],
  causa: [
    "Situação Alegada", 
    "Especificação",
    "Configuração",
    "Solicitação de Arquivo / Procedimento"
  ]
};

// CARREGAR SUGESTÕES (PADRÃO + LOCALSTORAGE)
function carregarSugestoes(chave) {
  const salvas = JSON.parse(localStorage.getItem("sugestoes_" + chave)) || [];
  return [...sugestoesDefault[chave], ...salvas];
}

// SALVAR SUGESTÃO
function salvarSugestao(chave, valor) {
  if (!valor.trim()) return;
  const salvas = JSON.parse(localStorage.getItem("sugestoes_" + chave)) || [];
  if (!salvas.includes(valor)) {
    salvas.push(valor);
    localStorage.setItem("sugestoes_" + chave, JSON.stringify(salvas));
  }
}

// CONFIGURAR AUTOCOMPLETE
function configurarSugestoes(campoId, listaId, chave) {
  const campo = document.getElementById(campoId);
  const lista = document.getElementById(listaId);

  function mostrar() {
    const todas = carregarSugestoes(chave);
    const valor = campo.value.toLowerCase();
    lista.innerHTML = "";

    const filtradas = todas.filter(op => op.toLowerCase().includes(valor));
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

  campo.addEventListener("input", mostrar);
  campo.addEventListener("focus", mostrar);
  document.addEventListener("click", e => {
    if (!campo.parentElement.contains(e.target)) lista.style.display = "none";
  });
}

// ADICIONAR MARCADORES
function adicionarMarcador(texto) {
  return texto.split("\n").map(linha => linha === "" ? "" : `\t• ${linha}`).join("\n");
}

// GERAR FCA
function criarFCA() {
  const modelo = adicionarMarcador(document.getElementById("modelo").value);
  const fato = adicionarMarcador(document.getElementById("fato").value);
  const causa = adicionarMarcador(document.getElementById("causa").value);
  const acao = adicionarMarcador(document.getElementById("acao").value);
  const info = adicionarMarcador(document.getElementById("info").value);

  let resultado = "";

  if (modelo.trim() !== "") {
    resultado += `MODELO:\n${modelo}\n\n`;
  }

  resultado += `FATO:\n${fato}\n\n`;
  resultado += `CAUSA:\n${causa}\n\n`;
  resultado += `AÇÃO:\n${acao}\n\n`;

  if (info.trim() !== "") {
    resultado += `INFORMAÇÕES ADICIONAIS:\n${info}`;
  }

  document.getElementById("resultadofca").textContent = resultado;

  navigator.clipboard.writeText(resultado)
    .then(() => {
      const mensagem = document.getElementById("mensagem");
      mensagem.textContent = "✅ FCA gerado e copiado para a área de transferência!";
      setTimeout(() => mensagem.textContent = "", 3000);
    })
    .catch(err => {
      document.getElementById("mensagem").textContent = "Erro ao copiar FCA.";
      console.error(err);
    });
}

// LIMPAR CAMPOS
function limparCampos() {
  ["modelo", "fato", "causa", "acao", "info"].forEach(id => document.getElementById(id).value = "");
  document.getElementById("resultadofca").textContent = "";
  document.getElementById("mensagem").textContent = "";
}

// INICIALIZAÇÃO
window.onload = () => {
  // Limpa todos os campos
  ["modelo", "fato", "causa", "acao", "info"].forEach(id => document.getElementById(id).value = "");

  // Configura sugestões
  const campos = ["fato", "causa"];
  campos.forEach(chave => configurarSugestoes(chave, "sugestoes-" + chave, chave));

  // Configura botões de salvar
  ["fato", "causa"].forEach(chave => {
    const botao = document.getElementById("salvar-" + chave);
    const campo = document.getElementById(chave);

    botao.addEventListener("click", () => {
      if (campo.value.trim() !== "") {
        salvarSugestao(chave, campo.value);
        botao.textContent = "✅ Salvo";
        setTimeout(() => botao.textContent = "⭐ Salvar", 2000);
      } else {
        document.getElementById("sugestoes-fato").style.display = "none";
        document.getElementById("sugestoes-causa").style.display = "none";

        botao.textContent = "❌ Campo vazio";
        setTimeout(() => botao.textContent = "⭐ Salvar", 2000);
      }
    });
  });
}; 