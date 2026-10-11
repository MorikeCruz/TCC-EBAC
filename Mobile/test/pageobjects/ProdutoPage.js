/** Page Object dos detalhes do produto (app EBAC Shop - Android). */
class ProdutoPage {
  get nome() { return $('android=new UiSelector().className("android.widget.TextView").instance(0)'); }
  get botaoAdicionar() { return $('android=new UiSelector().textContains("Add")'); }
}

module.exports = new ProdutoPage();
