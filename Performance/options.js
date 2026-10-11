// Configuração comum exigida no enunciado:
// 20 usuários virtuais | 2 minutos de execução | ramp-up de 20 segundos.
export const stagesPadrao = [
  { duration: '20s', target: 20 }, // ramp-up
  { duration: '1m40s', target: 20 }, // carga sustentada (total = 2 min)
];

export const BASE_URL = __ENV.BASE_URL || 'http://lojaebac.ebaconline.art.br';
