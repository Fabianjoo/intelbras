async function reformularTexto() {
    const btn = document.getElementById('reformular');
    btn.disabled = true; btn.textContent = '⏳ Reformulando...';
    document.getElementById('mensagem').textContent = '';
  
    const payload = {
      modelo: document.getElementById('modelo').value,
      fato: document.getElementById('fato').value,
      causa: document.getElementById('causa').value,
      acao: document.getElementById('acao').value,
      info: document.getElementById('info').value
    };
  
    try {
      const r = await fetch('../scripts/api/reformular', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
      const data = await r.json();
  
      if (data.success) {
        document.getElementById('modelo').value = data.modelo || payload.modelo;
        document.getElementById('fato').value = data.fato || payload.fato;
        document.getElementById('causa').value = data.causa || payload.causa;
        document.getElementById('acao').value = data.acao || payload.acao;
        document.getElementById('info').value = data.info || payload.info;
        document.getElementById('mensagem').textContent = '✅ Reformulado com sucesso';
      } else {
        document.getElementById('mensagem').textContent = '⚠️ Resposta não está em JSON. Veja console.';
        console.log('Resposta bruta do servidor:', data.raw || data);
      }
    } catch (err) {
      console.error(err);
      document.getElementById('mensagem').textContent = '❌ Erro ao chamar o endpoint';
    } finally {
      btn.disabled = false;
      btn.textContent = '✏️ Reformular';
    }
  }
  
  document.getElementById('reformular').addEventListener('click', reformularTexto);