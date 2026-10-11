const request = require('supertest');
const { cupom, listaDeCupons, erro } = require('./schemas/cupom.schema');

/**
 * US-0003 - API de cupons (WooCommerce REST API v3)
 * Automatizados: CT-US3-01 (GET lista), CT-US3-02 (GET por ID), CT-US3-03 (POST feliz),
 *                CT-US3-04 (POST nome repetido), CT-US3-05 (sem autenticação), CT-US3-06 (sem code).
 */
const BASE_URL = process.env.BASE_URL || 'http://lojaebac.ebaconline.art.br';
const ENDPOINT = '/wp-json/wc/v3/coupons';

const { API_USER, API_PASS } = process.env;
if (!API_USER || !API_PASS) {
  throw new Error('Defina API_USER e API_PASS (arquivo .env local ou GitHub Secrets).');
}
const AUTH = 'Basic ' + Buffer.from(`${API_USER}:${API_PASS}`).toString('base64');

const api = () => request(BASE_URL);
const novoCupom = (extra = {}) => ({
  code: `ganhe10-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  amount: '10.00',
  discount_type: 'fixed_product',
  description: 'Cupom de teste',
  ...extra,
});

describe('US-0003 - API de cupons', () => {
  const criados = [];

  const criar = async (body) => {
    const res = await api().post(ENDPOINT).set('Authorization', AUTH).send(body);
    if (res.status === 201) criados.push(res.body.id);
    return res;
  };

  afterAll(async () => {
    // Limpeza: remove os cupons criados pelos testes (massa de dados controlada).
    await Promise.all(
      criados.map((id) =>
        api().delete(`${ENDPOINT}/${id}`).query({ force: true }).set('Authorization', AUTH)
      )
    );
  });

  describe('GET', () => {
    it('CT-US3-01 - deve listar os cupons cadastrados e respeitar o contrato', async () => {
      const res = await api().get(ENDPOINT).set('Authorization', AUTH);

      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toMatch(/application\/json/);
      const { error } = listaDeCupons.validate(res.body);
      expect(error).toBeUndefined();
    });

    it('CT-US3-02 - deve buscar um cupom pelo ID e respeitar o contrato', async () => {
      const body = novoCupom();
      const criado = await criar(body);
      expect(criado.status).toBe(201);

      const res = await api().get(`${ENDPOINT}/${criado.body.id}`).set('Authorization', AUTH);

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(criado.body.id);
      expect(res.body.code).toBe(body.code.toLowerCase());
      expect(cupom.validate(res.body).error).toBeUndefined();
    });

    it('CT-US3-07 - deve retornar 404 ao buscar ID inexistente', async () => {
      const res = await api().get(`${ENDPOINT}/99999999`).set('Authorization', AUTH);

      expect(res.status).toBe(404);
      expect(erro.validate(res.body).error).toBeUndefined();
    });
  });

  describe('POST', () => {
    it('CT-US3-03 - deve cadastrar cupom com os campos obrigatórios (201) e respeitar o contrato', async () => {
      const body = novoCupom();
      const res = await criar(body);

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        code: body.code.toLowerCase(), // o WooCommerce normaliza o código para minúsculas
        amount: '10.00',
        discount_type: 'fixed_product',
        description: 'Cupom de teste',
      });
      expect(cupom.validate(res.body).error).toBeUndefined();
    });

    it('CT-US3-04 - não deve cadastrar cupom com nome repetido (400)', async () => {
      const body = novoCupom();
      const primeiro = await criar(body);
      expect(primeiro.status).toBe(201);

      const res = await criar(body);

      expect(res.status).toBe(400);
      expect(res.body.code).toBe('woocommerce_rest_coupon_code_already_exists');
      expect(erro.validate(res.body).error).toBeUndefined();
    });

    it('CT-US3-05 - não deve cadastrar cupom sem autenticação (401)', async () => {
      const res = await api().post(ENDPOINT).send(novoCupom());

      expect(res.status).toBe(401);
      expect(erro.validate(res.body).error).toBeUndefined();
    });

    it('CT-US3-06 - não deve cadastrar cupom sem o campo obrigatório "code" (400)', async () => {
      const { code, ...semCodigo } = novoCupom();
      const res = await criar(semCodigo);

      expect(res.status).toBe(400);
      expect(erro.validate(res.body).error).toBeUndefined();
    });
  });
});
