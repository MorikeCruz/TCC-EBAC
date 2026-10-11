import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { stagesPadrao, BASE_URL } from './options.js';

/** Teste de performance 1 - Login (US-0002): fluxo completo com nonce do WooCommerce. */
const usuarios = new SharedArray('usuarios', () => JSON.parse(open('./data/usuarios.json')));

export const options = {
  stages: stagesPadrao,
  thresholds: {
    http_req_failed: ['rate<0.05'], // < 5% de erros
    http_req_duration: ['p(95)<3000'], // 95% das requisições abaixo de 3 s
    checks: ['rate>0.95'],
  },
};

export default function () {
  const user = usuarios[(__VU - 1) % usuarios.length]; // distribui os 5 usuários entre os VUs

  group('Login', () => {
    const pagina = http.get(`${BASE_URL}/minha-conta/`);
    check(pagina, { 'tela de login carregou (200)': (r) => r.status === 200 });

    const nonce = pagina.html().find('input[name="woocommerce-login-nonce"]').attr('value');

    const login = http.post(`${BASE_URL}/minha-conta/`, {
      username: user.usuario,
      password: user.senha,
      'woocommerce-login-nonce': nonce,
      _wp_http_referer: '/minha-conta/',
      login: 'Login',
    });

    check(login, {
      'login retornou 200': (r) => r.status === 200,
      'área Minha Conta exibida': (r) => r.body.includes('woocommerce-MyAccount-navigation'),
    });
  });

  sleep(1);
}
