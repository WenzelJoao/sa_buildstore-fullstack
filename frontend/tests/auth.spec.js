import { expect, test } from '@playwright/test';
import { loginPeloFormulario, mockApi } from './helpers/apiMock.js';

test.describe('autenticacao e navegacao inicial', () => {
  test.beforeEach(async ({ page }) => {
    await mockApi(page);
  });

  test('exibe a tela de login', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Entrar na loja' })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Senha')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
  });

  test('redireciona rota protegida para login quando nao ha usuario autenticado', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Entrar na loja' })).toBeVisible();
  });

  test('faz login com sucesso e abre o dashboard', async ({ page }) => {
    await loginPeloFormulario(page);

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Painel da Loja' })).toBeVisible();
    await expect(page.getByText('Bem vindo, Joao Funcionario')).toBeVisible();
    await expect(page.getByText('Produtos em destaque')).toBeVisible();
    await expect(page.getByText('Cimento')).toBeVisible();
  });

  test('mostra erro quando login falha', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Email').fill('erro@buildstore.com');
    await page.getByLabel('Senha').fill('senhaerrada');
    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page.getByText('Email ou senha invalidos')).toBeVisible();
    await expect(page).toHaveURL('/');
  });
});
