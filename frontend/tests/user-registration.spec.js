import { expect, test } from '@playwright/test';
import { loginPeloFormulario, mockApi } from './helpers/apiMock.js';

function modalFuncionario(page) {
  return page.locator('.fixed').filter({ has: page.getByRole('heading', { name: 'Criar Funcionario' }) });
}

function camposCadastro(modal) {
  const senhas = modal.locator('input[type="password"]');

  return {
    nome: modal.locator('input#nome'),
    email: modal.locator('input[type="email"]'),
    senha: senhas.first(),
    confirmarSenha: senhas.nth(1),
  };
}

test.describe('cadastro de funcionario', () => {
  test.beforeEach(async ({ page }) => {
    await mockApi(page);
  });

  test('abre o modal de criar funcionario pela tela de login', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Criar funcionario' }).click();
    const modal = modalFuncionario(page);
    const campos = camposCadastro(modal);

    await expect(page.getByRole('heading', { name: 'Criar Funcionario' })).toBeVisible();
    await expect(campos.nome).toBeVisible();
    await expect(campos.email).toBeVisible();
    await expect(campos.senha).toBeVisible();
    await expect(campos.confirmarSenha).toBeVisible();
  });

  test('cadastra funcionario com sucesso no modal', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Criar funcionario' }).click();
    const modal = modalFuncionario(page);
    const campos = camposCadastro(modal);

    await campos.nome.fill('Maria Atendente');
    await campos.email.fill('maria@buildstore.com');
    await campos.senha.fill('12345678');
    await campos.confirmarSenha.fill('12345678');
    await modal.getByRole('button', { name: 'Criar funcionario' }).click();

    await expect(page.getByText('Funcionario criado com sucesso!')).toBeVisible();
    await expect(campos.nome).toHaveValue('');
    await expect(campos.email).toHaveValue('');
  });

  test('valida senha divergente no cadastro', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Criar funcionario' }).click();
    const modal = modalFuncionario(page);
    const campos = camposCadastro(modal);

    await campos.nome.fill('Maria Atendente');
    await campos.email.fill('maria@buildstore.com');
    await campos.senha.fill('12345678');
    await campos.confirmarSenha.fill('87654321');
    await modal.getByRole('button', { name: 'Criar funcionario' }).click();

    await expect(page.getByText('As senhas nao correspondem')).toBeVisible();
    await expect(page.getByText('As senhas devem ter pelo menos 8 caracteres e serem iguais.')).toBeVisible();
  });

  test('mostra erro retornado pela API ao cadastrar email existente', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Criar funcionario' }).click();
    const modal = modalFuncionario(page);
    const campos = camposCadastro(modal);

    await campos.nome.fill('Usuario Existente');
    await campos.email.fill('existente@buildstore.com');
    await campos.senha.fill('12345678');
    await campos.confirmarSenha.fill('12345678');
    await modal.getByRole('button', { name: 'Criar funcionario' }).click();

    await expect(page.getByText('Email ja cadastrado')).toBeVisible();
  });

  test('acessa cadastro de usuarios pelo menu apos login', async ({ page }) => {
    await loginPeloFormulario(page);
    await page.goto('/exames');

    await expect(page).toHaveURL('/exames');
    await expect(page.getByRole('heading', { name: 'Criar Funcionario' })).toBeVisible();
  });
});
