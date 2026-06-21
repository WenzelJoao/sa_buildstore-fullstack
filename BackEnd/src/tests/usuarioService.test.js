import { jest } from '@jest/globals';

const queryMock = jest.fn();

jest.unstable_mockModule('../database/conexao.js', () => ({
  default: {
    query: queryMock
  }
}));

const usuarioService = await import('../services/usuarioService.js');

beforeEach(() => {
  queryMock.mockClear();
});

function mockColunaSenha() {
  queryMock.mockResolvedValueOnce({ rows: [{ column_name: 'senha' }] });
}

test('deve criar um usuario', async () => {
  const usuario = {
    id: 1,
    nome: 'Joao',
    email: 'joao@email.com',
    senha: '123456'
  };

  mockColunaSenha();
  queryMock.mockResolvedValueOnce({ rows: [usuario] });

  const resultado = await usuarioService.criarUsuario({
    nome: 'Joao',
    email: 'joao@email.com',
    senha: '123456'
  });

  expect(resultado).toEqual(usuario);
  expect(queryMock).toHaveBeenLastCalledWith(
    'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email, senha AS senha, criado_em',
    ['Joao', 'joao@email.com', '123456']
  );
});

test('deve listar usuarios', async () => {
  const usuarios = [
    { id: 1, nome: 'Joao', email: 'joao@email.com', senha: '123456' },
    { id: 2, nome: 'Maria', email: 'maria@email.com', senha: 'abc123' }
  ];

  mockColunaSenha();
  queryMock.mockResolvedValueOnce({ rows: usuarios });

  const resultado = await usuarioService.listarUsuarios();

  expect(resultado).toEqual(usuarios);
});

test('deve fazer login com email e senha', async () => {
  const usuario = {
    id: 1,
    nome: 'Joao',
    email: 'joao@email.com',
    senha: '123456'
  };

  mockColunaSenha();
  queryMock.mockResolvedValueOnce({ rows: [usuario] });

  const resultado = await usuarioService.login('joao@email.com', '123456');

  expect(resultado).toEqual(usuario);
  expect(queryMock).toHaveBeenLastCalledWith(
    'SELECT id, nome, email, senha AS senha, criado_em FROM users WHERE email = $1 AND senha = $2',
    ['joao@email.com', '123456']
  );
});
