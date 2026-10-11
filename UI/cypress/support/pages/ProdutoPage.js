/** Page Object da página de produto (US-0001). */
class ProdutoPage {
  elementos = {
    tamanho: (t) => cy.get(`.variable-item[data-value="${t}"]`),
    cor: (c) => cy.get(`.variable-item[data-value="${c}"]`),
    quantidade: () => cy.get('input.qty'),
    botaoComprar: () => cy.get('.single_add_to_cart_button'),
    mensagem: () => cy.get('.woocommerce-message, .woocommerce-error'),
  };

  visitar(slug) {
    cy.visit(`/product/${slug}/`);
  }

  adicionar({ tamanho, cor, quantidade }) {
    this.elementos.tamanho(tamanho).click();
    this.elementos.cor(cor).click();

    this.elementos.quantidade()
      .should('be.visible')
      .clear()
      .type(String(quantidade));

    this.elementos.botaoComprar()
      .should('be.visible')
      .should('not.have.class', 'disabled')
      .and('not.be.disabled')
      .click();
  }
}

export default new ProdutoPage();
