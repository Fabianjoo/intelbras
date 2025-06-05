function criarPasta() {
    const nome = document.getElementById('nomePasta').value.trim();
    if (!nome) {
      alert('[ERRO] Digite o nome da pasta!');
      return;
    }
  
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = nome;
  
    const botaoAdicionarTexto = document.createElement('button');
    botaoAdicionarTexto.textContent = '📝 Adicionar Texto';
    botaoAdicionarTexto.className = 'novo-texto';
    botaoAdicionarTexto.onclick = () => adicionarTexto(containerTextos);
  
    const botaoExcluirPasta = document.createElement('button');
    botaoExcluirPasta.textContent = '❌ Excluir Pasta';
    botaoExcluirPasta.className = 'excluir-pasta';
    botaoExcluirPasta.onclick = () => {
      if (confirm(`Excluir a pasta "${nome}" e todos os seus textos?`)) {
        details.remove();
        salvarPastasNoStorage();
      }
    };
  
    const containerTextos = document.createElement('div');
  
    details.appendChild(summary);
    details.appendChild(botaoAdicionarTexto);
    details.appendChild(botaoExcluirPasta);
    details.appendChild(containerTextos);
  
    const pastasContainer = document.getElementById('pastasContainer');
    pastasContainer.appendChild(details);
  
    document.getElementById('nomePasta').value = '';
  
    salvarPastasNoStorage();
  }
  
  function adicionarTexto(container) {
    const bloco = document.createElement('div');
    bloco.className = 'bloco_respostas';
  
    const textarea = document.createElement('textarea');
    textarea.placeholder = "Digite aqui a sua resposta pronta!";
  
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
        salvarPastasNoStorage();
      }
    };
  
    bloco.appendChild(textarea);
    bloco.appendChild(copiarBtn);
    bloco.appendChild(excluirTextoBtn);
    container.appendChild(bloco);
  
    salvarPastasNoStorage();
  }
  
  // Função para salvar tudo no localStorage
  function salvarPastasNoStorage() {
    const pastasContainer = document.getElementById('pastasContainer');
    const pastas = [];
  
    pastasContainer.querySelectorAll('details').forEach(details => {
      const nome = details.querySelector('summary').textContent;
      const textos = [];
      details.querySelectorAll('.bloco_respostas textarea').forEach(textarea => {
        textos.push(textarea.value);
      });
      pastas.push({ nome, textos });
    });
  
    localStorage.setItem('pastas', JSON.stringify(pastas));
  }
  
  // Função para carregar do localStorage ao iniciar a página
  function carregarPastasDoStorage() {
    const pastasStr = localStorage.getItem('pastas');
    if (!pastasStr) return;
  
    const pastas = JSON.parse(pastasStr);
    const pastasContainer = document.getElementById('pastasContainer');
    pastasContainer.innerHTML = '';
  
    pastas.forEach(pasta => {
      const details = document.createElement('details');
      const summary = document.createElement('summary');
      summary.textContent = pasta.nome;
  
      const botaoAdicionarTexto = document.createElement('button');
      botaoAdicionarTexto.textContent = '📝 Adicionar Texto';
      botaoAdicionarTexto.className = 'novo-texto';
  
      const botaoExcluirPasta = document.createElement('button');
      botaoExcluirPasta.textContent = '❌ Excluir Pasta';
      botaoExcluirPasta.className = 'excluir-pasta';
  
      const containerTextos = document.createElement('div');
  
      botaoAdicionarTexto.onclick = () => adicionarTexto(containerTextos);
  
      botaoExcluirPasta.onclick = () => {
        if (confirm(`Excluir a pasta "${pasta.nome}" e todos os seus textos?`)) {
          details.remove();
          salvarPastasNoStorage();
        }
      };
  
      details.appendChild(summary);
      details.appendChild(botaoAdicionarTexto);
      details.appendChild(botaoExcluirPasta);
      details.appendChild(containerTextos);
  
      pasta.textos.forEach(texto => {
        const bloco = document.createElement('div');
        bloco.className = 'bloco_respostas';
  
        const textarea = document.createElement('textarea');
        textarea.placeholder = "Digite aqui a sua resposta pronta!";
        textarea.value = texto;
  
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
            salvarPastasNoStorage();
          }
        };
  
        bloco.appendChild(textarea);
        bloco.appendChild(copiarBtn);
        bloco.appendChild(excluirTextoBtn);
        containerTextos.appendChild(bloco);
      });
  
      pastasContainer.appendChild(details);
    });
  }
  
  window.onload = carregarPastasDoStorage;
  