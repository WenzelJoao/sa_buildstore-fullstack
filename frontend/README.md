# BuildStore Front-end

Front-end em React para uso interno de uma loja de materiais de construcao.

## Tecnologias

- React
- Vite
- Tailwind CSS
- Axios
- Playwright

## Como executar

Instale as dependencias:

```bash
npm install
```

Execute o front-end:

```bash
npm run dev
```

A aplicacao roda em:

```text
http://127.0.0.1:5174
```

## Testes E2E

Os testes do front-end usam Playwright e ficam na pasta `tests`.

Executar todos os testes:

```bash
npm run test:e2e
```

Abrir interface visual do Playwright:

```bash
npm run test:e2e:ui
```

Abrir relatorio HTML apos a execucao:

```bash
npm run test:e2e:report
```

## Cobertura Atual

A cobertura funcional aproximada do front-end esta entre 90% e 95%.

Fluxos cobertos:

- Login com sucesso e falha
- Rotas protegidas
- Cadastro de funcionario
- Cadastro de produto
- Catalogo e busca de produtos
- Compra de produto
- Atualizacao de estoque apos compra
- Erros de API
- Logout
- Responsividade basica em desktop e mobile

## Validacao

Comandos usados na validacao final:

```bash
npm run test:e2e
npm run lint
npm run build
```

Resultado da ultima validacao completa:

```text
59 testes passaram
1 teste foi pulado intencionalmente no mobile
lint passou
build passou
```

O teste pulado verifica o menu textual lateral, que existe apenas no layout desktop.
