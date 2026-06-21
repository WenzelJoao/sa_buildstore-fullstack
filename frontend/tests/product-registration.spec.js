import { expect, test } from '@playwright/test';
import { loginPeloFormulario, mockApi } from './helpers/apiMock.js';

async function abrirCadastroProduto(page) {
  await mockApi(page);
  await loginPeloFormulario(page);
  await page.goto('/pacientes');
}

test.describe('cadastro de produtos', () => {
  test('exibe formulario de novo produto', async ({ page }) => {
    await abrirCadastroProduto(page);

    await expect(page).toHaveURL('/pacientes');
    await expect(page.getByRole('heading', { name: 'Cadastrar novo produto' })).toBeVisible();
    await expect(page.getByLabel('Nome do produto')).toBeVisible();
    await expect(page.getByLabel('Categoria')).toBeVisible();
    await expect(page.getByLabel('Preco')).toBeVisible();
    await expect(page.getByLabel('Quantidade em estoque')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Salvar produto' })).toBeVisible();
  });

  test('cadastra produto com sucesso e limpa campos principais', async ({ page }) => {
    await abrirCadastroProduto(page);

    await page.getByLabel('Nome do produto').fill('Areia fina');
    await page.getByLabel('Categoria').selectOption('Agregados');
    await page.getByLabel('Preco').fill('22.50');
    await page.getByLabel('Quantidade em estoque').fill('80');
    await page.getByLabel('Destaque comercial').fill('Produto em promocao');
    await page.getByLabel('Observacoes internas').fill('Conferir entrega');
    await page.getByRole('button', { name: 'Salvar produto' }).click();

    await expect(page.getByText('Produto cadastrado com sucesso')).toBeVisible();
    await expect(page.getByLabel('Nome do produto')).toHaveValue('');
    await expect(page.getByLabel('Preco')).toHaveValue('');
    await expect(page.getByLabel('Quantidade em estoque')).toHaveValue('');
  });

  test('valida preco maior que zero antes de chamar API', async ({ page }) => {
    await abrirCadastroProduto(page);

    await page.getByLabel('Nome do produto').fill('Brita');
    await page.getByLabel('Preco').fill('0');
    await page.getByLabel('Quantidade em estoque').fill('20');
    await page.getByRole('button', { name: 'Salvar produto' }).click();

    await expect(page.getByText('Preco deve ser maior que zero.')).toBeVisible();
  });

  test('valida quantidade maior ou igual a zero antes de chamar API', async ({ page }) => {
    await abrirCadastroProduto(page);

    const quantidade = page.getByLabel('Quantidade em estoque');

    await page.getByLabel('Nome do produto').fill('Ferro');
    await page.getByLabel('Preco').fill('45.90');
    await quantidade.fill('-1');
    await page.getByRole('button', { name: 'Salvar produto' }).click();

    await expect(quantidade).toBeFocused();
    expect(await quantidade.evaluate((input) => input.validity.rangeUnderflow)).toBe(true);
  });

  test('mostra erro retornado pela API ao cadastrar produto', async ({ page }) => {
    await abrirCadastroProduto(page);

    await page.getByLabel('Nome do produto').fill('Produto com erro');
    await page.getByLabel('Preco').fill('12.90');
    await page.getByLabel('Quantidade em estoque').fill('15');
    await page.getByRole('button', { name: 'Salvar produto' }).click();

    await expect(page.getByText('Erro ao cadastrar produto')).toBeVisible();
  });
});
