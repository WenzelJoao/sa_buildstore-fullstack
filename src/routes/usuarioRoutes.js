import express from 'express';
import usuarioService from '../services/usuarioService.js';

const rotasUsuarios = express.Router();

rotasUsuarios.post('/', async (req, res) => {
  try {
    const usuario = await usuarioService.criarUsuario(req.body);

    return res.status(201).json({
      status: true,
      mensagem: 'Usuario criado com sucesso',
      data: usuario
    });
  } catch (erro) {
    return res.status(500).json({
      status: false,
      mensagem: 'Erro ao criar usuario',
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
    return res.status(500).json({
      status: false,
      mensagem: 'Erro ao realizar login',
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
