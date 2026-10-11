import LoginPage from '../support/pages/LoginPage';

/**
 * US-0002 - Login na plataforma
 * CT-US2-01 (caminho feliz) e CT-US2-02 / 03 / 04 (caminhos negativos)
 */
describe('US-0002 - Login na plataforma', () => {
  beforeEach(() => {
    cy.fixture('usuarios').as('usuarios');
  });

  it('CT-US2-01 - Deve logar com credenciais válidas e exibir a área Minha Conta', function () {
    LoginPage.logar(this.usuarios.valido.usuario, this.usuarios.valido.senha);

    LoginPage.elementos.conteudoConta().should('be.visible');
    cy.url().should('include', '/minha-conta');
  });

  it('CT-US2-02 - Deve exibir mensagem de erro com senha inválida', function () {
    LoginPage.logar(this.usuarios.senhaInvalida.usuario, this.usuarios.senhaInvalida.senha);

    LoginPage.elementos.erro().should('be.visible');
    LoginPage.elementos.conteudoConta().should('not.exist');
  });

  it('CT-US2-03 - Deve exibir mensagem de erro com usuário inexistente', function () {
    LoginPage.logar(this.usuarios.inexistente.usuario, this.usuarios.inexistente.senha);

    LoginPage.elementos.erro().should('be.visible');
  });

  it('CT-US2-04 - Não deve permitir login com campos vazios', () => {
    LoginPage.visitar();
    LoginPage.submeter();

    LoginPage.elementos.erro().should('be.visible');
  });
});
