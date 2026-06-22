import { expect, test } from '@playwright/test';
import { loginPeloFormulario, mockApi, produtosMock } from './helpers/apiMock.js';

async function abrirCompras(page, options) {
  await mockApi(page, options);
  await loginPeloFormulario(page);
  await page.goto('/consultas');
}

function itemProduto(page, nome) {
  return page.locator('li').filter({ hasText: nome });
}

test.describe('compra de produtos e estoque', () => {
  test('lista produtos disponiveis para compra', async ({ page }) => {
    await abrirCompras(page);

    await expect(page).toHaveURL('/consultas');
    await expect(page.getByRole('heading', { name: 'Registrar compra de produto' })).toBeVisible();
    await expect(itemProduto(page, 'Cimento')).toContainText('Estoque atual: 50 unidades');
    await expect(itemProduto(page, 'Tijolo')).toContainText('R$ 1,20');
  });

  test('filtra produto antes de comprar', async ({ page }) => {
    await abrirCompras(page);

    await page.getByPlaceholder('Digite o nome ou codigo do produto').fill('Tinta');

    await expect(itemProduto(page, 'Tinta')).toBeVisible();
    await expect(itemProduto(page, 'Cimento')).not.toBeVisible();
    await expect(itemProduto(page, 'Tijolo')).not.toBeVisible();
  });

  test('compra produto com sucesso e atualiza estoque na tela', async ({ page }) => {
    await abrirCompras(page);

    await itemProduto(page, 'Cimento').getByRole('button', { name: 'Comprar' }).click();
    await expect(page.getByRole('heading', { name: 'Comprar Cimento' })).toBeVisible();
    await expect(page.getByText('Estoque disponivel: 50 unidades')).toBeVisible();

    await page.getByLabel('Quantidade').fill('3');
    await expect(page.getByText('Total estimado: R$ 107,70')).toBeVisible();
    await page.getByRole('button', { name: 'Confirmar' }).click();

    await expect(page.getByText('Compra realizada com sucesso')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Comprar Cimento' })).not.toBeVisible();
    await expect(itemProduto(page, 'Cimento')).toContainText('Estoque atual: 47 unidades');
  });

  test('bloqueia compra acima do estoque disponivel', async ({ page }) => {
    await abrirCompras(page);

    const quantidade = page.getByLabel('Quantidade');

    await itemProduto(page, 'Cimento').getByRole('button', { name: 'Comprar' }).click();
    await quantidade.fill('51');
    await page.getByRole('button', { name: 'Confirmar' }).click();

    await expect(quantidade).toBeFocused();
    expect(await quantidade.evaluate((input) => input.validity.rangeOverflow)).toBe(true);
    await expect(page.getByRole('heading', { name: 'Comprar Cimento' })).toBeVisible();
  });

  test('desabilita compra quando produto esta sem estoque', async ({ page }) => {
    await abrirCompras(page, {
      produtos: [
        ...produtosMock,
        {
          id: 4,
          nome: 'Bloco',
          preco: '4.50',
          quantidade: 0,
          criado_em: '2026-06-21T00:00:00.000Z',
        },
      ],
    });

    await expect(itemProduto(page, 'Bloco')).toContainText('Estoque atual: 0 unidades');
    await expect(itemProduto(page, 'Bloco').getByRole('button', { name: 'Comprar' })).toBeDisabled();
  });

  test('mostra erro da API quando compra falha', async ({ page }) => {
    await abrirCompras(page, {
      compraStatus: 400,
      compraMensagem: 'Estoque insuficiente',
    });

    await itemProduto(page, 'Tinta').getByRole('button', { name: 'Comprar' }).click();
    await page.getByLabel('Quantidade').fill('2');
    await page.getByRole('button', { name: 'Confirmar' }).click();

    await expect(page.getByText('Estoque insuficiente')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Comprar Tinta' })).toBeVisible();
  });
});
