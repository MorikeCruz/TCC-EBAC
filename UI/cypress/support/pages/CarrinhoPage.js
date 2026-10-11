/** Page Object do carrinho (US-0001). */
class CarrinhoPage {
  elementos = {
    linhas: () => cy.get('.cart_item'),
    quantidade: () => cy.get('.cart_item input.qty'),
    totalCarrinho: () => cy.get('.cart_totals .order-total .amount'),
    campoCupom: () => cy.get('#coupon_code'),
    aplicarCupom: () => cy.get('button[name="apply_coupon"]'),
    atualizar: () => cy.get('button[name="update_cart"]'),
    mensagem: () => cy.get('.woocommerce-message, .woocommerce-error'),
  };

  visitar() {
    cy.visit('/carrinho/');
  }

  aplicarCupom(codigo) {
    this.elementos.campoCupom().type(codigo);
    this.elementos.aplicarCupom().click();
  }
}

export default new CarrinhoPage();
