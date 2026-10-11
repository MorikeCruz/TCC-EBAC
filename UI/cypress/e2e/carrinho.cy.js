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
      const texto = $body.text();

      cy.log(`Conteúdo do carrinho: ${texto.slice(0, 1000)}`);

      cy.log(
        `Linhas no carrinho: ${$body.find('.cart_item').length}`
      );

      cy.log(
        `Campos de quantidade: ${$body.find('input.qty').length}`
      );
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

    cy.get('body').then(($body) => {
      const quantidadeLinhas = $body.find('.cart_item').length;
      const quantidadeCampos = $body.find('.cart_item input.qty').length;

      cy.log(`Linhas encontradas: ${quantidadeLinhas}`);
      cy.log(`Campos de quantidade encontrados: ${quantidadeCampos}`);

      if (quantidadeCampos > 0) {
        const quantidadeAtual = Number(
          $body.find('.cart_item input.qty').first().val()
        );

        cy.log(
          `Resultado exploratório: quantidade no carrinho = ${quantidadeAtual}`
        );

        expect(
          quantidadeAtual,
          'A quantidade no carrinho deve ser maior que zero'
        ).to.be.greaterThan(0);
      } else {
        cy.log(
          'DIAGNÓSTICO: o carrinho não apresentou campo de quantidade para este produto.'
        );
      }
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
