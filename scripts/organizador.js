let carregandoDoStorage = false;

function criarPasta(nomePasta = '') {
  const nome = nomePasta || document.getElementById('nomePasta').value.trim();
  if (!nome) {
    alert('[ERRO] Digite o nome da pasta!');
    return;
  }

  const details = document.createElement('details');
  const summary = document.createElement('summary');
  summary.textContent = nome;

  const botaoEditarNome = document.createElement('button');
  botaoEditarNome.textContent = '✏️ Editar Nome';
  botaoEditarNome.className = 'editar-nome';
  botaoEditarNome.onclick = () => {
    const novoNome = prompt('Editar nome da pasta:', summary.textContent);
    if (novoNome && novoNome.trim()) {
      summary.textContent = novoNome.trim();
      salvarPastasNoStorage();
    }
  };

  const botaoAdicionarTexto = document.createElement('button');
  botaoAdicionarTexto.textContent = '📝 Adicionar Texto';
  botaoAdicionarTexto.className = 'novo-texto';

  const botaoExcluirPasta = document.createElement('button');
  botaoExcluirPasta.textContent = '❌ Excluir Pasta';
  botaoExcluirPasta.className = 'excluir-pasta';

  const containerTextos = document.createElement('div');
  const hr = document.createElement('hr');

  botaoAdicionarTexto.onclick = () => {
    adicionarTexto(containerTextos);
    salvarPastasNoStorage();
  };

  botaoExcluirPasta.onclick = () => {
    if (confirm(`Excluir a pasta "${summary.textContent}" e todos os seus textos?`)) {
      details.remove();
      salvarPastasNoStorage(); // <-- Aqui garante a atualização
    }
  };

  details.appendChild(summary);
  details.appendChild(botaoAdicionarTexto);
  details.appendChild(botaoEditarNome);
  details.appendChild(botaoExcluirPasta);
  details.appendChild(hr);
  details.appendChild(containerTextos);

  document.getElementById('pastasContainer').appendChild(details);
  if (!nomePasta) document.getElementById('nomePasta').value = '';

  if (!carregandoDoStorage) salvarPastasNoStorage();
}

function adicionarTexto(container, titulo = '', texto = '') {
  const bloco = document.createElement('div');
  bloco.className = 'bloco_respostas';

  const inputTitulo = document.createElement('input');
  inputTitulo.type = 'text';
  inputTitulo.placeholder = 'Título da resposta pronta!';
  inputTitulo.value = titulo;
  inputTitulo.className = 'titulo-texto';
  inputTitulo.addEventListener('input', salvarPastasNoStorage);

  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Digite aqui a sua resposta pronta!';
  textarea.value = texto;
  textarea.addEventListener('input', salvarPastasNoStorage);

  const copiarBtn = document.createElement('button');
  copiarBtn.textContent = '📋 Copiar';
  copiarBtn.className = 'copiar-btn';
  copiarBtn.onclick = () => {
    textarea.select();
    document.execCommand('copy');
  };

  const excluirTextoBtn = document.createElement('button');
  excluirTextoBtn.textContent = '❌ Excluir Texto';
  excluirTextoBtn.className = 'excluir-texto';
  excluirTextoBtn.onclick = () => {
    if (confirm('Excluir este texto?')) {
      bloco.remove();
      salvarPastasNoStorage(); // <-- Aqui também salva após remoção
    }
  };

  bloco.appendChild(inputTitulo);
  bloco.appendChild(textarea);
  bloco.appendChild(copiarBtn);
  bloco.appendChild(excluirTextoBtn);
  container.appendChild(bloco);

  if (!carregandoDoStorage) salvarPastasNoStorage();
}

function salvarPastasNoStorage() {
  const pastasContainer = document.getElementById('pastasContainer');
  const pastas = [];

  pastasContainer.querySelectorAll('details').forEach(details => {
    const nome = details.querySelector('summary').textContent;
    const textos = [];

    details.querySelectorAll('.bloco_respostas').forEach(bloco => {
      const titulo = bloco.querySelector('.titulo-texto').value;
      const texto = bloco.querySelector('textarea').value;
      textos.push({ titulo, texto });
    });

    pastas.push({ nome, textos });
  });

  localStorage.setItem('pastas', JSON.stringify(pastas));
}

function carregarPastasDoStorage() {
  const pastasStr = localStorage.getItem('pastas');
  if (!pastasStr) return;

  const pastas = JSON.parse(pastasStr);
  const pastasContainer = document.getElementById('pastasContainer');
  pastasContainer.innerHTML = '';

  carregandoDoStorage = true;

  pastas.forEach(pasta => {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = pasta.nome;

    const botaoEditarNome = document.createElement('button');
    botaoEditarNome.textContent = '✏️ Editar Nome';
    botaoEditarNome.className = 'editar-nome';
    botaoEditarNome.onclick = () => {
      const novoNome = prompt('Editar nome da pasta:', summary.textContent);
      if (novoNome && novoNome.trim()) {
        summary.textContent = novoNome.trim();
        salvarPastasNoStorage();
      }
    };

    const botaoAdicionarTexto = document.createElement('button');
    botaoAdicionarTexto.textContent = '📝 Adicionar Texto';
    botaoAdicionarTexto.className = 'novo-texto';

    const botaoExcluirPasta = document.createElement('button');
    botaoExcluirPasta.textContent = '❌ Excluir Pasta';
    botaoExcluirPasta.className = 'excluir-pasta';

    const containerTextos = document.createElement('div');

    botaoAdicionarTexto.onclick = () => {
      adicionarTexto(containerTextos);
      salvarPastasNoStorage();
    };

    botaoExcluirPasta.onclick = () => {
      if (confirm(`Excluir a pasta "${pasta.nome}" e todos os seus textos?`)) {
        details.remove();
        salvarPastasNoStorage(); // <-- Atualiza o localStorage
      }
    };

    details.appendChild(summary);
    details.appendChild(botaoAdicionarTexto);
    details.appendChild(botaoEditarNome);
    details.appendChild(botaoExcluirPasta);
    details.appendChild(containerTextos);

    pasta.textos.forEach(textoObj => {
      adicionarTexto(containerTextos, textoObj.titulo, textoObj.texto);
    });

    pastasContainer.appendChild(details);
  });

  carregandoDoStorage = false;
}

window.onload = carregarPastasDoStorage;
