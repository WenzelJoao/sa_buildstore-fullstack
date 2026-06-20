import express from 'express';
import produtoService from '../services/produtoService.js';

const rotasProdutos = express.Router();

function validarDadosProduto(dadosProduto) {
  const { nome, preco, quantidade } = dadosProduto;
  const precoNumero = Number(preco);
  const quantidadeNumero = Number(quantidade);

  if (!nome || preco === undefined || preco === null || preco === '') {
    return 'Nome e preco sao obrigatorios';
  }

  if (quantidade === undefined || quantidade === null || quantidade === '') {
    return 'Quantidade e obrigatoria';
  }

  if (Number.isNaN(precoNumero) || precoNumero <= 0) {
    return 'Preco deve ser um numero maior que zero';
  }

  if (Number.isNaN(quantidadeNumero) || quantidadeNumero < 0) {
    return 'Quantidade deve ser um numero maior ou igual a zero';
  }

  return null;
}

rotasProdutos.post('/', async (req, res) => {
  try {
    const erroValidacao = validarDadosProduto(req.body);

    if (erroValidacao) {
      return res.status(400).json({
        status: false,
        mensagem: erroValidacao,
        data: null
      });
    }

    const produto = await produtoService.criarProduto({
      nome: req.body.nome,
      preco: Number(req.body.preco),
      quantidade: Number(req.body.quantidade)
    });

    return res.status(201).json({
      status: true,
      mensagem: 'Produto criado com sucesso',
      data: produto
    });
  } catch (erro) {
    return res.status(500).json({
      status: false,
      mensagem: 'Erro ao criar produto',
      data: null
    });
  }
});

rotasProdutos.get('/', async (req, res) => {
  try {
    const produtos = await produtoService.listarProdutos();

    return res.json({
      status: true,
      mensagem: 'Produtos listados com sucesso',
      data: produtos
    });
  } catch (erro) {
    return res.status(500).json({
      status: false,
      mensagem: 'Erro ao listar produtos',
      data: null
    });
  }
});

rotasProdutos.post('/:id/comprar', async (req, res) => {
  try {
    const { quantidade } = req.body;
    const quantidadeCompra = Number(quantidade);

    if (!quantidade || Number.isNaN(quantidadeCompra) || quantidadeCompra <= 0) {
      return res.status(400).json({
        status: false,
        mensagem: 'Quantidade da compra e obrigatoria',
        data: null
      });
    }

    const resultado = await produtoService.comprarProduto(req.params.id, quantidadeCompra);

    if (resultado.erro === 'Produto nao encontrado') {
      return res.status(404).json({
        status: false,
        mensagem: resultado.erro,
        data: null
      });
    }

    if (resultado.erro) {
      return res.status(400).json({
        status: false,
        mensagem: resultado.erro,
        data: null
      });
    }

    return res.json({
      status: true,
      mensagem: 'Compra realizada com sucesso',
      data: resultado.produto
    });
  } catch (erro) {
    return res.status(500).json({
      status: false,
      mensagem: 'Erro ao realizar compra',
      data: null
    });
  }
});

rotasProdutos.get('/:id', async (req, res) => {
  try {
    const produto = await produtoService.buscarProdutoPorId(req.params.id);

    if (!produto) {
      return res.status(404).json({
        status: false,
        mensagem: 'Produto nao encontrado',
        data: null
      });
    }

    return res.json({
      status: true,
      mensagem: 'Produto encontrado com sucesso',
      data: produto
    });
  } catch (erro) {
    return res.status(500).json({
      status: false,
      mensagem: 'Erro ao buscar produto',
      data: null
    });
  }
});

rotasProdutos.put('/:id', async (req, res) => {
  try {
    const erroValidacao = validarDadosProduto(req.body);

    if (erroValidacao) {
      return res.status(400).json({
        status: false,
        mensagem: erroValidacao,
        data: null
      });
    }

    const produto = await produtoService.atualizarProduto(req.params.id, {
      nome: req.body.nome,
      preco: Number(req.body.preco),
      quantidade: Number(req.body.quantidade)
    });

    if (!produto) {
      return res.status(404).json({
        status: false,
        mensagem: 'Produto nao encontrado',
        data: null
      });
    }

    return res.json({
      status: true,
      mensagem: 'Produto atualizado com sucesso',
      data: produto
    });
  } catch (erro) {
    return res.status(500).json({
      status: false,
      mensagem: 'Erro ao atualizar produto',
      data: null
    });
  }
});

rotasProdutos.delete('/:id', async (req, res) => {
  try {
    const produto = await produtoService.deletarProduto(req.params.id);

    if (!produto) {
      return res.status(404).json({
        status: false,
        mensagem: 'Produto nao encontrado',
        data: null
      });
    }

    return res.json({
      status: true,
      mensagem: 'Produto deletado com sucesso',
      data: produto
    });
  } catch (erro) {
    return res.status(500).json({
      status: false,
      mensagem: 'Erro ao deletar produto',
      data: null
    });
  }
});

export default rotasProdutos;
