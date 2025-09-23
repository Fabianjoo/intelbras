const btnBusca = document.getElementById('btnbusca');
const popover = document.getElementById('popover');
const closeBtn = document.getElementById('closeBtn');
const consultarBtn = document.getElementById('consultarBtn');
const serialInput = document.getElementById('serialInput');

// Abrir popover
btnBusca.addEventListener('click', () => {
  popover.style.display = 'flex';
  serialInput.focus();
});

// Fechar popover
closeBtn.addEventListener('click', () => {
  popover.style.display = 'none';
});

// Consultar número de série
consultarBtn.addEventListener('click', () => {
  const serial = serialInput.value.trim();
  if (!serial) {
    alert('Digite um número de série!');
    return;
  }

  // Aqui você pode fazer a chamada para a API
  console.log('Número de série consultado:', serial);

  // Exemplo usando fetch (substitua a URL e o método conforme sua API)
  /*
  fetch(`https://suaapi.com/consulta?serial=${serial}`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
  */

  // Opcional: fechar o popover depois da consulta
  // popover.style.display = 'none';
});

// Fechar se clicar fora do conteúdo
popover.addEventListener('click', e => {
  if (e.target === popover) {
    popover.style.display = 'none';
  }
});