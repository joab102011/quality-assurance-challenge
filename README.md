# 🚀 Desafio de Automação ONErpm

![Build](https://img.shields.io/github/actions/workflow/status/ONErpm-Lab/quality-assurance-challenge/cep-e2e.yml?branch=main)
![Node](https://img.shields.io/badge/node-%3E=18.0.0-green)
![Playwright](https://img.shields.io/badge/playwright-tested-brightgreen)

## 📋 Sobre o Projeto

Este projeto implementa testes automatizados para o serviço de busca de CEP, utilizando Playwright e TypeScript. A solução foi desenvolvida como parte do processo seletivo para a vaga de Analista de Controle de Qualidade na ONErpm.

## 🎯 Requisitos Atendidos

### Automação Frontend e Backend
- **Frontend**: Testes automatizados no site QualCEP
- **Backend**: Testes na API BrasilAPI
- **Validação**: 3 CEPs diferentes implementados

### Diferenciais Implementados
- Framework: Playwright com TypeScript
- BDD: Cenários em arquivos .feature
- Relatórios: HTML e JSON com evidências

## 🧪 Resumo dos Testes

| Tipo      | Cenário                        | Status  |
|-----------|-------------------------------|---------|
| Frontend  | Busca CEP válido              | ✅      |
| Frontend  | Busca CEP inválido            | ✅      |
| Backend   | Busca CEP válido              | ✅      |
| Backend   | Busca CEP inexistente         | ✅      |
| Backend   | Formato inválido              | ✅      |

## ✅ Boas Práticas Adotadas

- [x] Page Objects
- [x] BDD com Gherkin
- [x] Relatórios automáticos (HTML/JSON)
- [x] Testes parametrizados
- [x] Estrutura modular e reutilizável
- [x] Documentação detalhada

## 🚀 Executando os Testes

O projeto oferece várias opções para execução dos testes, permitindo flexibilidade e controle sobre o processo de teste:

### 1. Executar Todos os Testes
```bash
npm test
```

### 2. Executar Testes Específicos
```bash
# Executar apenas testes de API
npm run test:api

# Executar apenas testes de Frontend
npm run test:frontend
```

### 3. Executar Testes por ID
```bash
# Executar teste específico da API
npm run test:tc "TC-API-0001"

# Executar teste específico do Frontend
npm run test:tc "TC-FRONT-0001"
```

### 4. Executar Grupos de Testes
```bash
# Executar todos os testes de API
npm run test:tc "TC-API"

# Executar todos os testes de Frontend
npm run test:tc "TC-FRONT"
```

### 5. Executar Testes por Descrição
```bash
# Executar todos os testes que contêm "Deve buscar" na descrição
npm run test:tc "Deve buscar"
```

### 6. Visualizar Relatório
```bash
# Abrir relatório HTML com os resultados dos testes
npm run report
```

## 📋 Estrutura dos IDs dos Testes

Os testes seguem um padrão de nomenclatura para fácil identificação:

- **Formato**: `TC-[TIPO]-[NÚMERO]`
  - `TC`: Test Case (Caso de Teste)
  - `[TIPO]`: API ou FRONT
  - `[NÚMERO]`: Sequência numérica (0001, 0002, etc.)

### Exemplos:
- `TC-API-0001`: Primeiro caso de teste da API
- `TC-FRONT-0001`: Primeiro caso de teste do Frontend

Para mais detalhes sobre os casos de teste implementados, consulte a [documentação completa](DOCUMENTATION.md).

## 🚀 Comandos Úteis

```bash
# Instalar dependências
npm install

# Instalar navegadores
npx playwright install

# Executar todos os testes
npm test

# Executar apenas testes de API
npm run test:api

# Executar apenas testes frontend
npm run test:frontend

# Visualizar relatório
npm run report
```

## ❓ FAQ

**Por que não usar Correios/ViaCEP?**  
Restrições técnicas e instabilidade inviabilizaram a automação confiável. Veja detalhes na seção de justificativas técnicas do DOCUMENTATION.md.

**Como rodar apenas os testes de API?**  
Use o comando:  
```bash
npm run test:api
```

**Como visualizar os relatórios?**  
Após rodar os testes, execute:  
```bash
npm run report
```

## 🔗 Referências

- [Playwright](https://playwright.dev/)
- [BrasilAPI](https://brasilapi.com.br/docs)
- [QualCEP](https://qualcep.com.br/)

## 🤝 Como Contribuir

1. Faça um fork do repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Faça suas alterações e commit: `git commit -m 'Minha contribuição'`
4. Envie um push para a branch: `git push origin minha-feature`
5. Abra um Pull Request

## 📚 Documentação Detalhada

Para mais detalhes sobre a implementação, decisões técnicas e justificativas, consulte o arquivo [DOCUMENTATION.md](DOCUMENTATION.md).

## Sobre o `.gitignore`

Este projeto utiliza um arquivo `.gitignore` abrangente para garantir que arquivos desnecessários, sensíveis ou específicos de ambiente/local não sejam versionados no repositório.

Isso inclui:
- Dependências (`node_modules/`)
- Relatórios e resultados de testes (`test-results/`, `playwright-report/`, `coverage/`)
- Arquivos de configuração de IDEs e editores (`.vscode/`, `.idea/`)
- Arquivos temporários e de sistema operacional (`*.log`, `.DS_Store`, `Thumbs.db`, etc)
- Arquivos de ambiente (`.env`)

Dessa forma, o repositório permanece limpo, seguro e fácil de clonar/executar em qualquer ambiente.

---

*Desenvolvido como parte do processo seletivo para a vaga de Analista de Controle de Qualidade na ONErpm.*
