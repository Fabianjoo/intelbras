const express = require('express');
const path = require('path');

const app = express();
const PORT = 37171;

// Diz ao Express para servir todos os arquivos da pasta atual
app.use(express.static(__dirname));

// Quando alguém acessar "/", abre o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});