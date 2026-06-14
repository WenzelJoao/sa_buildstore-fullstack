import conexao from '../database/conexao.js';

async function criarProduto(dadosProduto) {
  const { nome, preco, quantidade } = dadosProduto;

  const resultado = await conexao.query(
    'INSERT INTO products (nome, preco, quantidade) VALUES ($1, $2, $3) RETURNING id, nome, preco, quantidade, criado_em',
    [nome, preco, quantidade]
  );

  return resultado.rows[0];
}

async function listarProdutos() {
  const resultado = await conexao.query(
    'SELECT id, nome, preco, quantidade, criado_em FROM products ORDER BY id'
  );

  return resultado.rows;
}

async function buscarProdutoPorId(id) {
  const resultado = await conexao.query(
    'SELECT id, nome, preco, quantidade, criado_em FROM products WHERE id = $1',
    [id]
  );

  return resultado.rows[0];
}

async function atualizarProduto(id, dadosProduto) {
  const { nome, preco, quantidade } = dadosProduto;

  const resultado = await conexao.query(
    'UPDATE products SET nome = $1, preco = $2, quantidade = $3 WHERE id = $4 RETURNING id, nome, preco, quantidade, criado_em',
    [nome, preco, quantidade, id]
  );

  return resultado.rows[0];
}

async function deletarProduto(id) {
  const resultado = await conexao.query(
    'DELETE FROM products WHERE id = $1 RETURNING id, nome, preco, quantidade, criado_em',
    [id]
  );

  return resultado.rows[0];
}

export default {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  deletarProduto
};

export {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  deletarProduto
};
