// ================= COPIAR TEXTO COMPATÍVEL =================

async function copiarTexto(texto) {
  try {

    // HTTPS ou localhost
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(texto);
      return;
    }

    // Fallback para HTTP interno
    const textarea = document.createElement("textarea");

    textarea.value = texto;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    document.execCommand("copy");

    document.body.removeChild(textarea);

  } catch (erro) {
    console.error("Erro ao copiar:", erro);
    throw erro;
  }
}


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
    "Cliente relatou que a câmera estava sem audio/som e gostaria de ativar",
    "Cliente relatou que a câmera Full Color estava com o LED piscando e solicitou desativação",
    "Cliente solicitou auxílio para configurar o gravador para gravação por detecção de movimento",
    "Cliente solicitou auxílio para configurar o gravador para gravação por Regular"
  ],

  causa: [
    "Situação Alegada",
    "Especificação",
    "Configuração",
    "Solicitação de Arquivo / Procedimento",
    "n/a"
  ]
};


// CARREGAR SUGESTÕES
function carregarSugestoes(chave) {

  const salvas =
    JSON.parse(localStorage.getItem("sugestoes_" + chave)) || [];

  return [
    ...sugestoesDefault[chave],
    ...salvas
  ];
}


// SALVAR SUGESTÃO
function salvarSugestao(chave, valor) {

  if (!valor.trim()) return;


  const salvas =
    JSON.parse(localStorage.getItem("sugestoes_" + chave)) || [];


  if (!salvas.includes(valor)) {

    salvas.push(valor);

    localStorage.setItem(
      "sugestoes_" + chave,
      JSON.stringify(salvas)
    );

  }
}


// AUTOCOMPLETE
function configurarSugestoes(campoId, listaId, chave) {

  const campo = document.getElementById(campoId);
  const lista = document.getElementById(listaId);


  function mostrar() {

    const todas = carregarSugestoes(chave);

    const valor =
      campo.value.toLowerCase();


    lista.innerHTML = "";


    const filtradas =
      todas.filter(op =>
        op.toLowerCase().includes(valor)
      );


    if (filtradas.length === 0) {

      lista.style.display = "none";
      return;

    }


    filtradas.forEach(op => {

      const li =
        document.createElement("li");


      li.textContent = op;


      li.onclick = () => {

        campo.value = op;
        lista.style.display = "none";

      };


      lista.appendChild(li);

    });


    lista.style.display = "block";

  }


  campo.addEventListener("input", mostrar);

  campo.addEventListener("focus", mostrar);


  document.addEventListener("click", e => {

    if (!campo.parentElement.contains(e.target)) {

      lista.style.display = "none";

    }

  });

}


// MARCADORES
function adicionarMarcador(texto) {

  return texto
    .split("\n")
    .map(linha =>
      linha === "" ? "" : `\t• ${linha}`
    )
    .join("\n");

}


// GERAR FCA
async function criarFCA() {


  const modelo =
    adicionarMarcador(
      document.getElementById("modelo").value
    );


  const fato =
    adicionarMarcador(
      document.getElementById("fato").value
    );


  const causa =
    adicionarMarcador(
      document.getElementById("causa").value
    );


  const acao =
    adicionarMarcador(
      document.getElementById("acao").value
    );


  const info =
    adicionarMarcador(
      document.getElementById("info").value
    );



  let resultado = "";



  if (modelo.trim() !== "") {

    resultado +=
      `MODELO:\n${modelo}\n\n`;

  }



  resultado +=
    `FATO:\n${fato}\n\n`;


  resultado +=
    `CAUSA:\n${causa}\n\n`;


  resultado +=
    `AÇÃO:\n${acao}\n\n`;



  if (info.trim() !== "") {

    resultado +=
      `INFORMAÇÕES ADICIONAIS:\n${info}`;

  }



  document.getElementById("resultadofca").textContent =
    resultado;



  try {

    await copiarTexto(resultado);


    const mensagem =
      document.getElementById("mensagem");


    mensagem.textContent =
      "✅ FCA gerado e copiado para a área de transferência!";


    setTimeout(() => {

      mensagem.textContent = "";

    },3000);


  } catch(e) {


    document.getElementById("mensagem").textContent =
      "FCA gerado, mas não foi possível copiar.";


    console.error(e);

  }

}


// LIMPAR CAMPOS
function limparCampos() {

  [
    "modelo",
    "fato",
    "causa",
    "acao",
    "info"

  ].forEach(id => {

    document.getElementById(id).value = "";

  });


  document.getElementById("resultadofca").textContent = "";

  document.getElementById("mensagem").textContent = "";

}



// INICIALIZAÇÃO
window.onload = () => {


  const campos = [
    "fato",
    "causa"
  ];


  campos.forEach(chave => {

    configurarSugestoes(
      chave,
      "sugestoes-" + chave,
      chave
    );

  });



  ["fato","causa"].forEach(chave => {


    const botao =
      document.getElementById(
        "salvar-" + chave
      );


    const campo =
      document.getElementById(chave);



    if(!botao) return;



    botao.addEventListener("click", () => {


      if(campo.value.trim() !== "") {


        salvarSugestao(
          chave,
          campo.value
        );


        botao.textContent =
          "✅ Salvo";


        setTimeout(() => {

          botao.textContent =
            "⭐ Salvar";

        },2000);


      } else {


        botao.textContent =
          "❌ Campo vazio";


        setTimeout(() => {

          botao.textContent =
            "⭐ Salvar";

        },2000);

      }


    });


  });


};