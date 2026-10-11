import ProdutoPage from '../support/pages/ProdutoPage';
import CarrinhoPage from '../support/pages/CarrinhoPage';

const PRODUTO = {
  slug: 'ingrid-running-jacket',
  tamanho: 'XS',
  cor: 'Red',
};

describe('US-0001 - Adicionar item ao carrinho', () => {
  it('CT-US1-01 - Deve adicionar 1 item válido ao carrinho', () => {
    ProdutoPage.visitar(PRODUTO.slug);

    ProdutoPage.adicionar({
      ...PRODUTO,
      quantidade: 1,
    });

    ProdutoPage.elementos.mensagem().should('contain', 'adicionado');

    CarrinhoPage.visitar();

    CarrinhoPage.elementos.linhas().should('have.length', 1);
  });

  it('CT-US1-03 - Não deve permitir mais de 10 itens do mesmo produto (limite: 11)', () => {
    ProdutoPage.visitar(PRODUTO.slug);

    ProdutoPage.adicionar({
      ...PRODUTO,
      quantidade: 11,
    });

    CarrinhoPage.visitar();

    CarrinhoPage.elementos.quantidade().then(($quantidade) => {
      const quantidadeAtual = Number($quantidade.val());

      if (quantidadeAtual > 10) {
        cy.log(
          'DEFEITO IDENTIFICADO: o site permite adicionar mais de 10 unidades.'
        );

        cy.screenshot('defeito-limite-quantidade-11');
      }

      expect(
        quantidadeAtual,
        'A quantidade no carrinho deveria ser limitada a 10'
      ).to.be.at.most(10);
    });
  });

  it('CT-US1-04 - Deve aceitar exatamente 10 itens do mesmo produto (limite: 10)', () => {
    ProdutoPage.visitar(PRODUTO.slug);

    ProdutoPage.adicionar({
      ...PRODUTO,
      quantidade: 10,
    });

    CarrinhoPage.visitar();

    CarrinhoPage.elementos.quantidade().should('have.value', '10');
  });
});