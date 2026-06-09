import express from 'express';
import cors from 'cors';
import rotasUsuarios from './routes/usuarioRoutes.js';

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

app.use('/usuarios', rotasUsuarios);

export default app;
