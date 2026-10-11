const Joi = require('joi');

/**
 * Contrato (schema) de um cupom retornado pela API WooCommerce v3.
 * allowUnknown: a API devolve muitos campos opcionais; validamos os que importam
 * para o negócio e seus tipos. Se o tipo/forma mudar, o teste de contrato quebra.
 */
const cupom = Joi.object({
  id: Joi.number().integer().required(),
  code: Joi.string().required(),
  amount: Joi.string().required(),
  discount_type: Joi.string().valid('percent', 'fixed_cart', 'fixed_product').required(),
  description: Joi.string().allow('').required(),
  date_created: Joi.string().allow(null),
  date_expires: Joi.string().allow(null),
  usage_count: Joi.number().integer(),
  individual_use: Joi.boolean(),
  product_ids: Joi.array().items(Joi.number().integer()),
}).unknown(true);

const listaDeCupons = Joi.array().items(cupom);

const erro = Joi.object({
  code: Joi.string().required(),
  message: Joi.string().required(),
  data: Joi.object({ status: Joi.number().required() }).unknown(true),
}).unknown(true);

module.exports = { cupom, listaDeCupons, erro };
