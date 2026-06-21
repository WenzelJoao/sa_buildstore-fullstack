export const usuarioLogado = {
  id: 1,
  nome: 'Joao Funcionario',
  email: 'joao@buildstore.com',
  senha: '12345678',
  criado_em: '2026-06-21T00:00:00.000Z'
};

export const produtosMock = [
  {
    id: 1,
    nome: 'Cimento',
    preco: '35.90',
    quantidade: 50,
    criado_em: '2026-06-21T00:00:00.000Z'
  },
  {
    id: 2,
    nome: 'Tijolo',
    preco: '1.20',
    quantidade: 1000,
    criado_em: '2026-06-21T00:00:00.000Z'
  },
  {
    id: 3,
    nome: 'Tinta',
    preco: '89.90',
    quantidade: 30,
    criado_em: '2026-06-21T00:00:00.000Z'
  }
];

export async function mockApi(page, options = {}) {
  const produtosResposta = options.produtos ?? produtosMock;
  const produtosStatus = options.produtosStatus ?? 200;
  const produtosMensagem = options.produtosMensagem ?? 'Produtos listados com sucesso';

  await page.route('**/usuarios/login', async (route) => {
    const request = route.request();
    const body = request.postDataJSON();

    if (body.email === 'joao@buildstore.com' && body.senha === '12345678') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: true,
          mensagem: 'Login realizado com sucesso',
          data: usuarioLogado
        })
      });
      return;
    }

    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({
        status: false,
        mensagem: 'Email ou senha invalidos',
        data: null
      })
    });
  });

  await page.route('**/usuarios', async (route) => {
    const request = route.request();
    const body = request.postDataJSON();

    if (request.method() !== 'POST') {
      await route.continue();
      return;
    }

    if (body.email === 'existente@buildstore.com') {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          status: false,
          mensagem: 'Email ja cadastrado',
          data: null
        })
      });
      return;
    }

    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({
        status: true,
        mensagem: 'Usuario criado com sucesso',
        data: {
          id: 2,
          nome: body.nome,
          email: body.email,
          senha: body.senha,
          criado_em: '2026-06-21T00:00:00.000Z'
        }
      })
    });
  });

  await page.route('**/produtos', async (route) => {
    const request = route.request();

    if (request.method() === 'POST') {
      const body = request.postDataJSON();

      if (body.nome === 'Produto com erro') {
        await route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({
            status: false,
            mensagem: 'Erro ao cadastrar produto',
            data: null
          })
        });
        return;
      }

      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          status: true,
          mensagem: 'Produto cadastrado com sucesso',
          data: {
            id: 4,
            nome: body.nome,
            preco: body.preco,
            quantidade: body.quantidade,
            criado_em: '2026-06-21T00:00:00.000Z'
          }
        })
      });
      return;
    }

    if (produtosStatus >= 400) {
      await route.fulfill({
        status: produtosStatus,
        contentType: 'application/json',
        body: JSON.stringify({
          status: false,
          mensagem: produtosMensagem,
          data: null
        })
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: true,
        mensagem: produtosMensagem,
        data: produtosResposta
      })
    });
  });
}

export async function loginPeloFormulario(page) {
  await page.goto('/');
  await page.getByLabel('Email').fill('joao@buildstore.com');
  await page.getByLabel('Senha').fill('12345678');
  await page.getByRole('button', { name: 'Entrar' }).click();
}
