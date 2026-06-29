# BuildStore Fullstack

Sistema fullstack simples para uso interno de funcionarios de uma loja de materiais de construcao.

O projeto foi desenvolvido com foco academico, mantendo uma arquitetura simples e direta:

- Back-end em Node.js, Express 5 e PostgreSQL
- Front-end em React, Vite e Tailwind CSS
- SQL puro com `pg`, sem ORM
- Login simples com email e senha
- Controle de produtos, usuarios, compras e estoque
- Testes unitarios no back-end com Jest
- Testes E2E no front-end com Playwright

## Visao Geral

O sistema permite:

- Criar, listar, atualizar e deletar usuarios
- Fazer login simples de funcionario
- Criar, listar, atualizar e deletar produtos
- Registrar compra de produtos
- Validar estoque antes da compra
- Reduzir estoque automaticamente apos a compra 
- Usar uma interface visual integrada ao back-end

## Estrutura do Projeto

```text
sa_buildstore-fullstack/
|-- BackEnd/
|   |-- src/
|   |   |-- routes/
|   |   |-- services/
|   |   |-- database/
|   |   |-- tests/
|   |   |-- app.js
|   |   `-- server.js
|   |-- package.json
|   `-- package-lock.json
|
|-- frontend/
|   |-- src/
|   |   |-- api/
|   |   |-- assets/
|   |   |-- components/
|   |   |-- contexts/
|   |   |-- layouts/
|   |   |-- pages/
|   |   `-- main.jsx
|   |-- tests/
|   |-- playwright.config.js
|   |-- package.json
|   `-- README.md
|
|-- README.md
`-- LICENSE
```

## Tecnologias

### Back-end

- Node.js 18+
- Express 5
- PostgreSQL
- pg
- dotenv
- cors
- Jest

### Front-end

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- React Toastify
- Playwright

## Banco de Dados

O banco utilizado e PostgreSQL.

O script inicial esta em:

```text
BackEnd/src/database/script.sql
```

Esse script cria as tabelas:

- `users`
- `products`

E tambem insere produtos iniciais:

- Cimento
- Tijolo
- Areia
- Brita
- Tinta
- Ferro
- Bloco

### Modelo da Tabela users

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(100) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Modelo da Tabela products

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco NUMERIC(10, 2) NOT NULL,
  quantidade INTEGER NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Configuracao do Back-end

Acesse a pasta do back-end:

```bash
cd BackEnd
```

Instale as dependencias:

```bash
npm install
```

Crie um arquivo `.env` dentro da pasta `BackEnd`.

Exemplo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=buildstore
```

Crie o banco no PostgreSQL e execute o script:

```text
BackEnd/src/database/script.sql
```

Depois inicie o servidor:

```bash
npm run dev
```

A API roda por padrao em:

```text
http://localhost:3000
```

## Padrao de Resposta da API

Todas as respostas seguem o formato:

```json
{
  "status": true,
  "mensagem": "",
  "data": null
}
```

Em caso de erro:

```json
{
  "status": false,
  "mensagem": "Mensagem clara do erro",
  "data": null
}
```

## Rotas da API

### Rota Inicial

```http
GET /
```

Retorna uma mensagem informando que a API esta funcionando.

### Usuarios

Criar usuario:

```http
POST /usuarios
```

Body:

```json
{
  "nome": "Joao Funcionario",
  "email": "joao@buildstore.com",
  "senha": "12345678"
}
```

Listar usuarios:

```http
GET /usuarios
```

Buscar usuario por ID:

```http
GET /usuarios/:id
```

Atualizar usuario:

```http
PUT /usuarios/:id
```

Body:

```json
{
  "nome": "Joao Atualizado",
  "email": "joao@buildstore.com",
  "senha": "12345678"
}
```

Deletar usuario:

```http
DELETE /usuarios/:id
```

Login:

```http
POST /usuarios/login
```

Body:

```json
{
  "email": "joao@buildstore.com",
  "senha": "12345678"
}
```

Observacao: o login e simples. Nao usa JWT e nao usa criptografia de senha.

### Produtos

Criar produto:

```http
POST /produtos
```

Body:

```json
{
  "nome": "Cimento",
  "preco": 35.9,
  "quantidade": 50
}
```

Listar produtos:

```http
GET /produtos
```

Buscar produto por ID:

```http
GET /produtos/:id
```

Atualizar produto:

```http
PUT /produtos/:id
```

Body:

```json
{
  "nome": "Cimento CP II",
  "preco": 39.9,
  "quantidade": 40
}
```

Deletar produto:

```http
DELETE /produtos/:id
```

Comprar produto:

```http
POST /produtos/:id/comprar
```

Body:

```json
{
  "quantidade": 3
}
```

Essa rota valida o estoque e reduz a quantidade do produto apos a compra.

## Validacoes

### Usuarios

Campos obrigatorios:

- nome
- email
- senha

### Produtos

Campos obrigatorios:

- nome
- preco
- quantidade

Regras:

- preco deve ser maior que zero
- quantidade deve ser maior ou igual a zero
- compra deve ter quantidade maior que zero
- compra nao pode ultrapassar o estoque disponivel

## Configuracao do Front-end

Acesse a pasta do front-end:

```bash
cd frontend
```

Instale as dependencias:

```bash
npm install
```

Execute a aplicacao:

```bash
npm run dev
```

O front-end roda em:

```text
http://127.0.0.1:5174
```

O front-end consome a API em:

```text
http://localhost:3000
```

Essa configuracao esta em:

```text
frontend/src/api/api.js
```

## Telas do Front-end

### Login

Rota:

```text
/
```

Funcionalidades:

- Login de funcionario
- Cadastro rapido de funcionario em modal
- Mensagens de erro e sucesso

### Dashboard

Rota:

```text
/dashboard
```

Funcionalidades:

- Resumo da loja
- Contadores de produtos
- Produtos em destaque
- Busca rapida de produtos

### Catalogo

Rota:

```text
/prontuarios
```

Funcionalidades:

- Lista completa de produtos
- Busca por nome ou codigo
- Exibicao de preco e estoque

### Novo Produto

Rota:

```text
/pacientes
```

Funcionalidades:

- Cadastro de produto
- Validacao de nome, preco e quantidade
- Mensagens de sucesso e erro

### Compras

Rota:

```text
/consultas
```

Funcionalidades:

- Listagem de produtos para compra
- Busca de produto
- Modal de compra
- Calculo de total estimado
- Baixa de estoque apos compra
- Bloqueio de compra sem estoque

### Usuarios

Rota:

```text
/exames
```

Funcionalidades:

- Cadastro de funcionario
- Validacao de senha
- Mensagens de sucesso e erro

## Testes

### Testes do Back-end

Os testes unitarios do back-end usam Jest e testam os services.

Acesse:

```bash
cd BackEnd
```

Execute:

```bash
npm test
```

Arquivos de teste:

```text
BackEnd/src/tests/usuarioService.test.js
BackEnd/src/tests/produtoService.test.js
```

### Testes do Front-end

Os testes do front-end usam Playwright.

Acesse:

```bash
cd frontend
```

Execute:

```bash
npm run test:e2e
```

Abrir interface visual do Playwright:

```bash
npm run test:e2e:ui
```

Abrir relatorio HTML:

```bash
npm run test:e2e:report
```

Arquivos de teste:

```text
frontend/tests/auth.spec.js
frontend/tests/user-registration.spec.js
frontend/tests/product-registration.spec.js
frontend/tests/product-catalog.spec.js
frontend/tests/product-purchase.spec.js
frontend/tests/navigation-responsive.spec.js
frontend/tests/helpers/apiMock.js
```

Cobertura funcional aproximada do front-end:

```text
90% a 95%
```

Fluxos cobertos:

- Login com sucesso
- Login com erro
- Rotas protegidas
- Cadastro de funcionario
- Cadastro de produto
- Listagem e busca de produtos
- Compra de produto
- Controle de estoque
- Tratamento de erros da API
- Logout
- Responsividade basica

## Como Executar o Projeto Completo

### 1. Preparar o Banco

No PostgreSQL:

1. Crie o banco `buildstore`
2. Execute o script `BackEnd/src/database/script.sql`

### 2. Iniciar o Back-end

```bash
cd BackEnd
npm install
npm run dev
```

Servidor:

```text
http://localhost:3000
```

### 3. Iniciar o Front-end

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Aplicacao:

```text
http://127.0.0.1:5174
```

### 4. Usar o Sistema

1. Acesse o front-end
2. Crie um funcionario
3. Faca login com email e senha
4. Cadastre ou consulte produtos
5. Registre compras
6. Verifique a baixa do estoque

## Scripts Principais

### Back-end

```bash
npm run dev
npm start
npm test
```

### Front-end

```bash
npm run dev
npm run build
npm run lint
npm run test:e2e
npm run test:e2e:ui
npm run test:e2e:report
```

## Regras de Arquitetura

O back-end segue uma arquitetura simples:

- `routes`: recebem as requisicoes e retornam respostas
- `services`: executam as regras e consultas SQL
- `database`: conexao e script SQL
- `tests`: testes unitarios dos services

O projeto nao usa:

- controllers
- repositories
- ORM
- JWT
- bcrypt
- arquitetura complexa

## Observacoes Importantes

- As senhas ficam em texto puro porque o objetivo do projeto e academico e simples.
- O login apenas valida se email e senha existem no banco.
- O back-end usa SQL puro com `pg`.
- O front-end usa mocks nos testes E2E para validar a interface sem depender do banco real.
- O padrao de resposta da API foi mantido em todas as rotas.

## Status Final

Projeto funcional com:

- Back-end integrado ao PostgreSQL
- Front-end integrado ao back-end
- CRUD de usuarios
- Login simples
- CRUD de produtos
- Compra com controle de estoque
- Validacoes obrigatorias
- Tratamento de erros
- Testes unitarios no back-end
- Testes E2E no front-end
- Documentacao completa
