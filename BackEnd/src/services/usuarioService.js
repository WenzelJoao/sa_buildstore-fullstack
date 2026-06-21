import conexao from '../database/conexao.js';

async function buscarColunaSenha() {
  const resultado = await conexao.query(`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'users'
      AND column_name IN ('senha', 'password')
    ORDER BY CASE column_name WHEN 'senha' THEN 1 ELSE 2 END
    LIMIT 1
  `);

  return resultado.rows[0]?.column_name || 'senha';
}

async function criarUsuario(dadosUsuario) {
  const { nome, email, senha } = dadosUsuario;
  const colunaSenha = await buscarColunaSenha();

  const resultado = await conexao.query(
    `INSERT INTO users (nome, email, ${colunaSenha}) VALUES ($1, $2, $3) RETURNING id, nome, email, ${colunaSenha} AS senha, criado_em`,
    [nome, email, senha]
  );

  return resultado.rows[0];
}

async function listarUsuarios() {
  const colunaSenha = await buscarColunaSenha();

  const resultado = await conexao.query(
    `SELECT id, nome, email, ${colunaSenha} AS senha, criado_em FROM users ORDER BY id`
  );

  return resultado.rows;
}

async function buscarUsuarioPorId(id) {
  const colunaSenha = await buscarColunaSenha();

  const resultado = await conexao.query(
    `SELECT id, nome, email, ${colunaSenha} AS senha, criado_em FROM users WHERE id = $1`,
    [id]
  );

  return resultado.rows[0];
}

async function atualizarUsuario(id, dadosUsuario) {
  const { nome, email, senha } = dadosUsuario;
  const colunaSenha = await buscarColunaSenha();

  const resultado = await conexao.query(
    `UPDATE users SET nome = $1, email = $2, ${colunaSenha} = $3 WHERE id = $4 RETURNING id, nome, email, ${colunaSenha} AS senha, criado_em`,
    [nome, email, senha, id]
  );

  return resultado.rows[0];
}

async function deletarUsuario(id) {
  const colunaSenha = await buscarColunaSenha();

  const resultado = await conexao.query(
    `DELETE FROM users WHERE id = $1 RETURNING id, nome, email, ${colunaSenha} AS senha, criado_em`,
    [id]
  );

  return resultado.rows[0];
}

async function login(email, senha) {
  const colunaSenha = await buscarColunaSenha();

  const resultado = await conexao.query(
    `SELECT id, nome, email, ${colunaSenha} AS senha, criado_em FROM users WHERE email = $1 AND ${colunaSenha} = $2`,
    [email, senha]
  );

  return resultado.rows[0];
}

export default {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario,
  login
};

export {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario,
  login
};
