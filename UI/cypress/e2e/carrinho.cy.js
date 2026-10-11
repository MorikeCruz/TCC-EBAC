
import ProdutoPage from '../support/pages/ProdutoPage';
import CarrinhoPage from '../support/pages/CarrinhoPage';

const PRODUTO = {
  slug: 'ingrid-running-jacket',
  tamanho: 'XS',
  cor: 'Red',
};

describe('US-0001 - Adicionar item ao carrinho', () => {
  function diagnosticarCarrinho() {
    cy.url().then((url) => {
      cy.log(`URL atual: ${url}`);
    });

    cy.get('body').then(($body) => {
      cy.log(`Linhas no carrinho: ${$body.find('.cart_item').length}`);
      cy.log(`Campos de quantidade: ${$body.find('input.qty').length}`);
      cy.log(`Texto da página: ${$body.text().slice(0, 500)}`);
    });
  }

  it('CT-US1-01 - Deve adicionar 1 item válido ao carrinho', () => {
    ProdutoPage.visitar(PRODUTO.slug);

    ProdutoPage.adicionar({
      ...PRODUTO,
      quantidade: 1,
    });

    ProdutoPage.elementos.mensagem().should('contain', 'adicionado');

    CarrinhoPage.visitar();

    CarrinhoPage.elementos.linhas().should('have.length', 1);
    CarrinhoPage.elementos.quantidade().should('have.value', '1');
  });

  it('CT-US1-03 - Deve registrar a quantidade aceita pelo carrinho', () => {
    ProdutoPage.visitar(PRODUTO.slug);

    ProdutoPage.adicionar({
      ...PRODUTO,
      quantidade: 11,
    });

    CarrinhoPage.visitar();
    diagnosticarCarrinho();

    CarrinhoPage.elementos.quantidade().should('exist');

    CarrinhoPage.elementos.quantidade().then(($quantidade) => {
      const quantidadeAtual = Number($quantidade.val());

      cy.log(
        `Resultado exploratório: quantidade encontrada no carrinho = ${quantidadeAtual}`
      );

      expect(
        quantidadeAtual,
        'A quantidade no carrinho deve ser maior que zero'
      ).to.be.greaterThan(0);
    });
  });

  it('CT-US1-04 - Deve aceitar exatamente 10 itens do mesmo produto', () => {
    ProdutoPage.visitar(PRODUTO.slug);

    ProdutoPage.adicionar({
      ...PRODUTO,
      quantidade: 10,
    });

    CarrinhoPage.visitar();
    diagnosticarCarrinho();

    CarrinhoPage.elementos.quantidade().should('have.value', '10');
  });
});
