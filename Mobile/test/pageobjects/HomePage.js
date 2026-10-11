class HomePage {
  get botaoEntrarNaLoja() {
    return $('id:com.woocommerce.android:id/button_login_store');
  }

  get botaoWordPress() {
    return $('id:com.woocommerce.android:id/button_login_wpcom');
  }

  async aguardarCarregar() {
    await this.botaoEntrarNaLoja.waitForDisplayed({ timeout: 30000 });
  }

  async entrarNaLoja() {
    await this.botaoEntrarNaLoja.click();
  }
}

module.exports = new HomePage();