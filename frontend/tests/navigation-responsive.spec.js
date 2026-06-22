import { expect, test } from '@playwright/test';
import { loginPeloFormulario, mockApi } from './helpers/apiMock.js';

const rotasProtegidas = [
  { path: '/dashboard', titulo: 'Dashboard' },
  { path: '/prontuarios', titulo: 'Materiais de construcao' },
  { path: '/pacientes', titulo: 'Cadastrar novo produto' },
  { path: '/consultas', titulo: 'Registrar compra de produto' },
  { path: '/exames', titulo: 'Criar Funcionario' },
];

test.describe('navegacao, logout e responsividade', () => {
  test.beforeEach(async ({ page }) => {
    await mockApi(page);
    await loginPeloFormulario(page);
  });

  test('acessa todas as rotas protegidas principais', async ({ page }) => {
    for (const rota of rotasProtegidas) {
      await page.goto(rota.path);

      await expect(page).toHaveURL(rota.path);
      await expect(page.getByRole('heading', { name: rota.titulo })).toBeVisible();
    }
  });

  test('navega pelo menu lateral no desktop', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Menu textual fica oculto no perfil mobile.');

    await page.locator('aside a[href="/prontuarios"]').click();
    await expect(page).toHaveURL('/prontuarios');
    await expect(page.getByRole('heading', { name: 'Materiais de construcao' })).toBeVisible();

    await page.locator('aside a[href="/pacientes"]').click();
    await expect(page).toHaveURL('/pacientes');
    await expect(page.getByRole('heading', { name: 'Cadastrar novo produto' })).toBeVisible();

    await page.locator('aside a[href="/consultas"]').click();
    await expect(page).toHaveURL('/consultas');
    await expect(page.getByRole('heading', { name: 'Registrar compra de produto' })).toBeVisible();
  });

  test('faz logout e bloqueia novo acesso ao painel', async ({ page }) => {
    await page.locator('main header').getByRole('button', { name: 'Sair' }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Entrar na loja' })).toBeVisible();

    await page.goto('/dashboard');
    await expect(page).toHaveURL('/');
  });

  test('mantem conteudo principal visivel sem rolagem horizontal', async ({ page }) => {
    for (const rota of rotasProtegidas) {
      await page.goto(rota.path);

      await expect(page.getByRole('heading', { name: rota.titulo })).toBeVisible();
      const temOverflowHorizontal = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(temOverflowHorizontal).toBe(false);
    }
  });
});
