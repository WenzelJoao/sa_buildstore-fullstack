import { expect, test } from '@playwright/test';
import { loginPeloFormulario, mockApi, produtosMock } from './helpers/apiMock.js';

test.describe('catalogo de produtos', () => {
  test('mostra produtos em destaque no dashboard', async ({ page }) => {
    await mockApi(page);
    await loginPeloFormulario(page);

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Produtos em destaque' })).toBeVisible();
    await expect(page.getByText('Cimento')).toBeVisible();
    await expect(page.getByText('Codigo #1')).toBeVisible();
    await expect(page.getByText('R$ 35,90')).toBeVisible();
    await expect(page.getByText('50 unidades em estoque')).toBeVisible();
  });

  test('filtra produtos em destaque pelo nome', async ({ page }) => {
    await mockApi(page);
    await loginPeloFormulario(page);

    await page.getByPlaceholder('Digite nome ou codigo').fill('Tinta');

    await expect(page.getByText('Tinta')).toBeVisible();
    await expect(page.getByText('Cimento')).not.toBeVisible();
    await expect(page.getByText('Tijolo')).not.toBeVisible();
  });

  test('abre catalogo completo e lista produtos da API', async ({ page }) => {
    await mockApi(page);
    await loginPeloFormulario(page);
    await page.goto('/prontuarios');

    await expect(page).toHaveURL('/prontuarios');
    await expect(page.getByRole('heading', { name: 'Materiais de construcao' })).toBeVisible();

    for (const produto of produtosMock) {
      await expect(page.getByText(produto.nome, { exact: true })).toBeVisible();
      await expect(page.getByText(`#${produto.id}`)).toBeVisible();
    }
  });

  test('filtra catalogo completo por codigo', async ({ page }) => {
    await mockApi(page);
    await loginPeloFormulario(page);
    await page.goto('/prontuarios');

    await page.getByPlaceholder('Digite nome ou codigo').fill('2');

    await expect(page.getByText('Tijolo', { exact: true })).toBeVisible();
    await expect(page.getByText('Cimento', { exact: true })).not.toBeVisible();
    await expect(page.getByText('Tinta', { exact: true })).not.toBeVisible();
  });

  test('mostra mensagem quando busca nao encontra produto', async ({ page }) => {
    await mockApi(page);
    await loginPeloFormulario(page);
    await page.goto('/prontuarios');

    await page.getByPlaceholder('Digite nome ou codigo').fill('Madeira');

    await expect(page.getByText('Nenhum produto encontrado.')).toBeVisible();
  });

  test('mostra erro amigavel quando API de produtos falha', async ({ page }) => {
    await mockApi(page, { produtosStatus: 500, produtosMensagem: 'Erro ao listar produtos' });
    await loginPeloFormulario(page);
    await page.goto('/prontuarios');

    await expect(page.getByText('Nao foi possivel carregar o catalogo. Verifique se o back-end esta rodando.')).toBeVisible();
  });
});
