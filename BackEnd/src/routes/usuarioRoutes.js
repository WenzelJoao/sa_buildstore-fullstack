import express from 'express';
import usuarioService from '../services/usuarioService.js';

const rotasUsuarios = express.Router();

function validarDadosUsuario(dadosUsuario) {
  const { nome, email, senha } = dadosUsuario;

  if (!nome || !email || !senha) {
    return 'Nome, email e senha sao obrigatorios';
  }

  return null;
}

function tratarErroBancoUsuario(erro, acao) {
  console.error(`Erro ao ${acao} usuario:`, erro.message);

  if (erro.code === '23505') {
    return { statusHttp: 400, mensagem: 'Email ja cadastrado' };
  }

  if (erro.code === 'ECONNREFUSED') {
    return { statusHttp: 500, mensagem: 'Nao foi possivel conectar ao PostgreSQL. Verifique se o banco esta rodando.' };
  }

  if (erro.code === '42P01') {
    return { statusHttp: 500, mensagem: 'Tabela users nao encontrada. Execute o script SQL inicial.' };
  }

  if (erro.code === '42703') {
    return { statusHttp: 500, mensagem: 'Coluna esperada nao existe na tabela users. Verifique o script SQL do banco.' };
  }

  return { statusHttp: 500, mensagem: `Erro ao ${acao} usuario` };
}

rotasUsuarios.post('/', async (req, res) => {
  try {
    const erroValidacao = validarDadosUsuario(req.body);

    if (erroValidacao) {
      return res.status(400).json({
        status: false,
        mensagem: erroValidacao,
        data: null
      });
    }

    const usuario = await usuarioService.criarUsuario(req.body);

    return res.status(201).json({
      status: true,
      mensagem: 'Usuario criado com sucesso',
      data: usuario
    });
  } catch (erro) {
    const erroTratado = tratarErroBancoUsuario(erro, 'criar');

    return res.status(erroTratado.statusHttp).json({
      status: false,
      mensagem: erroTratado.mensagem,
      data: null
    });
  }
});

rotasUsuarios.get('/', async (req, res) => {
  try {
    const usuarios = await usuarioService.listarUsuarios();

    return res.json({
      status: true,
      mensagem: 'Usuarios listados com sucesso',
      data: usuarios
    });
  } catch (erro) {
    return res.status(500).json({
      status: false,
      mensagem: 'Erro ao listar usuarios',
      data: null
    });
  }
});

rotasUsuarios.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        status: false,
        mensagem: 'Email e senha sao obrigatorios',
        data: null
      });
    }

    const usuario = await usuarioService.login(email, senha);

    if (!usuario) {
      return res.status(400).json({
        status: false,
        mensagem: 'Email ou senha invalidos',
        data: null
      });
    }

    return res.json({
      status: true,
      mensagem: 'Login realizado com sucesso',
      data: usuario
    });
  } catch (erro) {
    const erroTratado = tratarErroBancoUsuario(erro, 'realizar login');

    return res.status(erroTratado.statusHttp).json({
      status: false,
      mensagem: erroTratado.mensagem,
      data: null
    });
  }
});

rotasUsuarios.get('/:id', async (req, res) => {
  try {
    const usuario = await usuarioService.buscarUsuarioPorId(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        status: false,
        mensagem: 'Usuario nao encontrado',
        data: null
      });
    }

    return res.json({
      status: true,
      mensagem: 'Usuario encontrado com sucesso',
      data: usuario
    });
  } catch (erro) {
    return res.status(500).json({
      status: false,
      mensagem: 'Erro ao buscar usuario',
      data: null
    });
  }
});

rotasUsuarios.put('/:id', async (req, res) => {
  try {
    const erroValidacao = validarDadosUsuario(req.body);

    if (erroValidacao) {
      return res.status(400).json({
        status: false,
        mensagem: erroValidacao,
        data: null
      });
    }

    const usuario = await usuarioService.atualizarUsuario(req.params.id, req.body);

    if (!usuario) {
      return res.status(404).json({
        status: false,
        mensagem: 'Usuario nao encontrado',
        data: null
      });
    }

    return res.json({
      status: true,
      mensagem: 'Usuario atualizado com sucesso',
      data: usuario
    });
  } catch (erro) {
    if (erro.code === '23505') {
      return res.status(400).json({
        status: false,
        mensagem: 'Email ja cadastrado',
        data: null
      });
    }

    return res.status(500).json({
      status: false,
      mensagem: 'Erro ao atualizar usuario',
      data: null
    });
  }
});

rotasUsuarios.delete('/:id', async (req, res) => {
  try {
    const usuario = await usuarioService.deletarUsuario(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        status: false,
        mensagem: 'Usuario nao encontrado',
        data: null
      });
    }

    return res.json({
      status: true,
      mensagem: 'Usuario deletado com sucesso',
      data: usuario
    });
  } catch (erro) {
    return res.status(500).json({
      status: false,
      mensagem: 'Erro ao deletar usuario',
      data: null
    });
  }
});

export default rotasUsuarios;
