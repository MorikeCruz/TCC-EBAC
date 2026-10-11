import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { stagesPadrao, BASE_URL } from './options.js';

/** Teste de performance 2 - Catálogo de produtos: home -> listagem -> detalhe do produto. */
export const options = {
  stages: stagesPadrao,
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<3000'],
    checks: ['rate>0.95'],
  },
};

export default function () {
  group('Home', () => {
    const r = http.get(`${BASE_URL}/`);
    check(r, { 'home 200': (res) => res.status === 200 });
  });

  group('Listagem de produtos', () => {
    const r = http.get(`${BASE_URL}/produtos/`);
    check(r, {
      'listagem 200': (res) => res.status === 200,
      'exibe produtos': (res) => res.body.includes('product'),
    });
  });

  group('Detalhe do produto', () => {
    const r = http.get(`${BASE_URL}/product/ingrid-running-jacket/`);
    check(r, { 'detalhe 200': (res) => res.status === 200 });
  });

  sleep(1);
}
