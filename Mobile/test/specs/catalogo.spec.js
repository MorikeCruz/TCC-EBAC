const CatalogoPage = require('../pageobjects/CatalogoPage');
const ProdutoPage = require('../pageobjects/ProdutoPage');

/**
 * Catálogo de Produtos (mobile) - único escopo mobile do TCC.
 * CT-CAT-M01 (caminho feliz), CT-CAT-M02 (alternativo), CT-CAT-M03 (negativo).
 */
describe('Catálogo de Produtos - App Android', () => {
  before(async () => {
    await CatalogoPage.aguardarCarregar();
  });

  it('CT-CAT-M01 - Deve listar produtos no catálogo ao abrir o app', async () => {
    const cards = await CatalogoPage.cardsProduto;
    await expect(cards.length).toBeGreaterThan(0);
  });

  it('CT-CAT-M02 - Deve abrir os detalhes ao tocar em um produto', async () => {
    await CatalogoPage.primeiroProduto.click();

    await expect(ProdutoPage.nome).toBeDisplayed();
    await driver.back();
  });

  it('CT-CAT-M03 - Deve informar quando a busca não retorna produtos', async () => {
    await CatalogoPage.buscar('produto-inexistente-xyz');

    await expect(CatalogoPage.mensagemSemResultado).toBeDisplayed();
  });
});
