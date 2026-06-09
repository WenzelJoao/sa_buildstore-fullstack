import conexao from '../database/conexao.js';

async function criarUsuario(dadosUsuario) {
  const { nome, email, senha } = dadosUsuario;

  const resultado = await conexao.query(
    'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email, senha, criado_em',
    [nome, email, senha]
  );

  return resultado.rows[0];
}

async function listarUsuarios() {
  const resultado = await conexao.query(
    'SELECT id, nome, email, senha, criado_em FROM users ORDER BY id'
  );

  return resultado.rows;
}

async function buscarUsuarioPorId(id) {
  const resultado = await conexao.query(
    'SELECT id, nome, email, senha, criado_em FROM users WHERE id = $1',
    [id]
  );

  return resultado.rows[0];
}

async function atualizarUsuario(id, dadosUsuario) {
  const { nome, email, senha } = dadosUsuario;

  const resultado = await conexao.query(
    'UPDATE users SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING id, nome, email, senha, criado_em',
    [nome, email, senha, id]
  );

  return resultado.rows[0];
}

async function deletarUsuario(id) {
  const resultado = await conexao.query(
    'DELETE FROM users WHERE id = $1 RETURNING id, nome, email, senha, criado_em',
    [id]
  );

  return resultado.rows[0];
}

export default {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario
};

export {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario
};
