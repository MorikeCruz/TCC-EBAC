/**
 * Page Object do Catálogo de Produtos (app EBAC Shop - Android).
 * ATENÇÃO: confirme os seletores com o Appium Inspector no APK real e ajuste aqui;
 * por estarem centralizados, a manutenção fica em um único arquivo.
 */
class CatalogoPage {
  get titulo() { return $('android=new UiSelector().textContains("EBAC")'); }
  get cardsProduto() { return $$('android=new UiSelector().descriptionContains("product")'); }
  get primeiroProduto() { return $('(//android.view.ViewGroup[@content-desc])[1]'); }
  get campoBusca() { return $('android=new UiSelector().className("android.widget.EditText")'); }
  get mensagemSemResultado() { return $('android=new UiSelector().textContains("No products")'); }

  async aguardarCarregar() {
    await this.titulo.waitForDisplayed({ timeout: 30000 });
  }

  async buscar(termo) {
    await this.campoBusca.setValue(termo);
    await driver.hideKeyboard().catch(() => {});
  }
}

module.exports = new CatalogoPage();
