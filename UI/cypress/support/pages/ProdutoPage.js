
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

  selecionarVariacao(tamanho, cor) {
    this.elementos.tamanho(tamanho)
      .should('be.visible')
      .click();

    this.elementos.cor(cor)
      .should('be.visible')
      .click();

    // Aguarda o WooCommerce atualizar o estado do botão.
    this.elementos.botaoComprar()
      .should('be.visible')
      .should('not.have.class', 'wc-variation-selection-needed')
      .and('not.have.class', 'disabled')
      .and('not.be.disabled');
  }

  adicionar({ tamanho, cor, quantidade }) {
    this.selecionarVariacao(tamanho, cor);

    this.elementos.quantidade()
      .should('be.visible')
      .clear()
      .type(String(quantidade));

    this.elementos.botaoComprar()
      .should('not.have.class', 'disabled')
      .and('not.be.disabled')
      .click();
  }
}

export default new ProdutoPage();
