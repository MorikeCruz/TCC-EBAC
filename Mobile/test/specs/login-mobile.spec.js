const HomePage = require('../pageobjects/HomePage');

describe('Acesso mobile - WooCommerce', () => {
  it('CT-MOB-01 - Deve exibir a opção de entrar na loja', async () => {
    await HomePage.aguardarCarregar();

    await expect(HomePage.botaoEntrarNaLoja).toBeDisplayed();
    await expect(HomePage.botaoWordPress).toBeDisplayed();
  });

  it('CT-MOB-02 - Deve abrir o fluxo de acesso à loja', async () => {
    await HomePage.aguardarCarregar();
    await HomePage.entrarNaLoja();

    await driver.pause(1500);

    const telaAtual = await driver.getPageSource();

    await expect(telaAtual).toContain('store');
  });
});