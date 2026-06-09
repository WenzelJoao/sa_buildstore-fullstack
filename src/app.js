const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({
    status: true,
    mensagem: 'API da loja de materiais de construcao funcionando',
    data: null
  });
});

module.exports = app;
