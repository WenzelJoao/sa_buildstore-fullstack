import { jest } from '@jest/globals';

const queryMock = jest.fn();

jest.unstable_mockModule('../database/conexao.js', () => ({
  default: {
    query: queryMock
  }
}));

const produtoService = await import('../services/produtoService.js');

beforeEach(() => {
  queryMock.mockClear();
});

test('deve criar um produto', async () => {
  const produto = {
    id: 1,
    nome: 'Cimento',
    preco: '35.90',
    quantidade: 50
  };

  queryMock.mockResolvedValueOnce({ rows: [produto] });

  const resultado = await produtoService.criarProduto({
    nome: 'Cimento',
    preco: 35.9,
    quantidade: 50
  });

  expect(resultado).toEqual(produto);
  expect(queryMock).toHaveBeenCalledWith(
    'INSERT INTO products (nome, preco, quantidade) VALUES ($1, $2, $3) RETURNING id, nome, preco, quantidade, criado_em',
    ['Cimento', 35.9, 50]
  );
});

test('deve listar produtos', async () => {
  const produtos = [
    { id: 1, nome: 'Cimento', preco: '35.90', quantidade: 50 },
    { id: 2, nome: 'Tijolo', preco: '1.20', quantidade: 1000 }
  ];

  queryMock.mockResolvedValueOnce({ rows: produtos });

  const resultado = await produtoService.listarProdutos();

  expect(resultado).toEqual(produtos);
});

test('deve comprar produto quando houver estoque', async () => {
  const produto = {
    id: 1,
    nome: 'Cimento',
    preco: '35.90',
    quantidade: 50
  };

  const produtoAtualizado = {
    id: 1,
    nome: 'Cimento',
    preco: '35.90',
    quantidade: 45
  };

  queryMock
    .mockResolvedValueOnce({ rows: [produto] })
    .mockResolvedValueOnce({ rows: [produtoAtualizado] });

  const resultado = await produtoService.comprarProduto(1, 5);

  expect(resultado).toEqual({
    erro: null,
    produto: produtoAtualizado
  });
});

test('nao deve comprar produto sem estoque suficiente', async () => {
  const produto = {
    id: 1,
    nome: 'Cimento',
    preco: '35.90',
    quantidade: 2
  };

  queryMock.mockResolvedValueOnce({ rows: [produto] });

  const resultado = await produtoService.comprarProduto(1, 5);

  expect(resultado).toEqual({
    erro: 'Estoque insuficiente',
    produto: null
  });
  expect(queryMock).toHaveBeenCalledTimes(1);
});
