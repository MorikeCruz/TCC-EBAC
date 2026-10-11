# TCC-EBAC-QE

Trabalho de Conclusão — **Profissão: Engenheiro de Qualidade de Software (EBAC)**.
Estratégia e automação de testes do e-commerce **EBAC Shop** (http://lojaebac.ebaconline.art.br/).

O documento completo (estratégia, critérios de aceitação em Gherkin, casos de teste) está em
`Trabalho_de_conclusao_-_Engenheiro_de_Qualidade_de_software.docx`.

## Estrutura

| Pasta | Conteúdo | Tecnologia |
|-------|----------|-----------|
| `UI/` | Testes web (US-0001 e US-0002) com Page Objects | Cypress + JavaScript |
| `API/` | Testes da API de cupons (US-0003) + validação de contrato | Supertest + Jest + Joi |
| `Mobile/` | Testes do Catálogo de Produtos (Android) com Page Objects | WebdriverIO + Appium |
| `Performance/` | 2 cenários de carga (login e catálogo) | k6 |
| `.github/workflows/` | Integração contínua | GitHub Actions |
| `docs/` | Mapa mental da estratégia de testes | — |

## Pré-requisitos
Node.js 20+, k6, (Mobile) Android SDK/emulador + JDK 17.

## Como executar
```bash
cp .env.example .env        # preencha API_PASS com a senha da US-0003
npm install

npm run api:test            # API   -> reports/api/relatorio-api.html
npm run ui:run              # UI    -> reports/ui/index.html (mochawesome)
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=Performance/results/login.html npm run perf:login
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=Performance/results/catalogo.html npm run perf:catalogo

# Mobile (coloque o APK em Mobile/app/ebacshop.apk)
cd Mobile && npm install && npm test && npm run report
```

## Segredos no GitHub Actions
Cadastre em *Settings → Secrets and variables → Actions*: `API_USER` e `API_PASS` (credenciais admin da US-0003).

## Ambiente local opcional (Docker)
```bash
docker network create --attachable ebac-network
docker run -d --name wp_db -p 3306:3306 --network ebac-network ernestosbarbosa/lojaebacdb:latest
docker run -d --name wp -p 80:80 --network ebac-network ernestosbarbosa/lojaebac:latest
BASE_URL=http://localhost npm run api:test
```
