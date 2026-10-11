class LoginPage {
  elementos = {
    usuario: () => cy.get('#username'),
    senha: () => cy.get('#password'),
    botaoLogin: () => cy.get('input[name="login"][type="submit"]'),
    erro: () => cy.get('.woocommerce-error'),
    conteudoConta: () => cy.get('.woocommerce-MyAccount-content'),
  };

  visitar() {
    cy.visit('/minha-conta/');
  }

  preencher(usuario, senha) {
    this.elementos.usuario().clear().type(usuario);
    this.elementos.senha().clear().type(senha, { log: false });
  }

  submeter() {
    this.elementos.botaoLogin().click();
  }

  logar(usuario, senha) {
    this.visitar();
    this.preencher(usuario, senha);
    this.submeter();
  }
}

export default new LoginPage();