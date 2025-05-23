# Documentação Técnica - Desafio de Automação ONErpm

## 📋 Sobre o Desafio

Este projeto foi desenvolvido como resposta ao desafio de Quality Assurance da ONErpm, que solicita a automação do serviço de Busca CEP. O projeto atende aos requisitos principais e oferece soluções técnicas alternativas para garantir a qualidade e confiabilidade dos testes.

## ✅ Atendimento aos Requisitos

### Requisitos Principais
- **Automação Frontend**: Implementada usando o site QualCEP como alternativa aos Correios
- **Automação Backend**: Implementada usando BrasilAPI como alternativa ao ViaCEP
- **Validação de 3 CEPs**: Implementada com os seguintes endereços:
  - 57086-037 (Maceió, AL)
  - 77818-716 (Araguaína, TO)
  - 75710-240 (Catalão, GO)

### Diferenciais Implementados
- **Framework**: Playwright com TypeScript
- **BDD**: Cenários implementados em arquivos .feature
- **Relatórios**: Geração de relatórios HTML e JSON com evidências

### Substituições Técnicas
As substituições do site dos Correios e ViaCEP foram necessárias para garantir:
1. Automação confiável e estável
2. Execução consistente dos testes
3. Manutenibilidade do código
4. Resultados precisos e reproduzíveis

*As justificativas detalhadas para estas substituições estão documentadas na seção "Justificativas Técnicas".*

## 🎯 O que foi Desenvolvido?

Este projeto implementa testes automatizados para o serviço de busca de CEP (Código de Endereçamento Postal), utilizando tecnologias modernas como Playwright e TypeScript. A solução foi desenvolvida com foco em qualidade, manutenibilidade e boas práticas de desenvolvimento.

Os testes automatizados verificam:
- Funcionamento correto da busca de CEP
- Validação de endereços em diferentes formatos
- Tratamento adequado de erros
- Performance e estabilidade do sistema

## 🎯 Requisitos Atendidos

### 1. Automação Frontend e Backend
- **Frontend**: Testes automatizados no site QualCEP (qualcep.com.br)
- **Backend**: Testes na API BrasilAPI (brasilapi.com.br)
- **Integração**: Validação completa do fluxo de busca de CEP

### 2. Validação de Múltiplos CEPs
Implementados 3 CEPs diferentes para validação:
- 57086-037 (Maceió, AL) - Avenida 0001
- 77818-716 (Araguaína, TO) - Rua QC 0001
- 75710-240 (Catalão, GO) - Rua C-0001

### 3. Framework e BDD
- **Framework**: Playwright
- **BDD**: Implementado com arquivos .feature
- **Organização**: Cenários claros e descritivos

### 4. Relatórios
- Relatórios HTML interativos
- Relatórios JSON para análise
- Screenshots automáticos
- Vídeos de execução
- Traces para debug

## 🛠️ Arquitetura e Decisões Técnicas

### 1. Framework de Testes
O Playwright foi escolhido por oferecer:
- Suporte nativo a TypeScript
- Execução em múltiplos navegadores
- API moderna e intuitiva
- Excelente performance
- Suporte a testes de API e UI

### 2. Estrutura do Projeto
```
quality-assurance-challenge/
├── tests/
│   ├── api/                 # Testes de API
│   ├── e2e/                 # Testes end-to-end
│   │   └── functional/      # Testes funcionais
│   ├── features/            # Especificações BDD
│   ├── pages/              # Page Objects
│   └── steps/              # Steps dos testes
├── playwright.config.ts    # Configuração do Playwright
└── package.json           # Dependências do projeto
```

### 3. Padrões de Implementação

#### Page Objects
- Encapsulamento da lógica de interação com a página
- Reutilização de código
- Manutenção simplificada

#### Steps
- Organização dos passos de teste
- Reutilização de lógica comum
- Clareza na implementação

#### Features BDD
- Documentação clara dos cenários
- Linguagem acessível
- Fácil manutenção

## ⚙️ Justificativas Técnicas

### 1. Substituição do Frontend dos Correios
Durante a análise inicial do site oficial dos Correios (correios.com.br), identificamos que a automação direta não seria viável devido a restrições técnicas implementadas no site:

- Sistema de CAPTCHA obrigatório para validação de usuários
- Mecanismos de segurança que impedem a automação de testes
- Interface dinâmica que dificulta a estabilidade dos testes
- Requisito de interação humana para validação

Para garantir a qualidade e confiabilidade dos testes, optamos por utilizar o site QualCEP como alternativa. Esta decisão foi tomada considerando:

- Interface similar e funcionalidades equivalentes
- Ausência de barreiras técnicas à automação
- Capacidade de validar todos os cenários necessários
- Foco na qualidade e manutenibilidade dos testes

### 2. Substituição da API ViaCEP
A API ViaCEP, embora seja uma referência no mercado, apresentou limitações significativas durante nossa avaliação:

- Instabilidade frequente no serviço
- Tempo de resposta inconsistente
- Limitações técnicas nas consultas
- Documentação insuficiente para automação

Como solução, implementamos os testes utilizando a BrasilAPI, que oferece:

- Alta disponibilidade e estabilidade
- Performance consistente
- Documentação técnica completa
- Suporte adequado para automação

Esta substituição mantém a fidelidade ao objetivo do projeto, garantindo a validação completa do serviço de busca de CEP, enquanto proporciona uma base mais robusta para os testes automatizados.

## 🧪 Testes Implementados

### 1. Testes Frontend
Os testes frontend validam a interface do usuário no site QualCEP, garantindo que a busca de CEP funcione corretamente. Abaixo está um exemplo de teste que verifica a busca de um CEP válido:

```typescript
test('Deve buscar CEP válido no site QualCEP', async ({ page }) => {
  // Preenche o campo de CEP
  await page.fill('input[name="cep"]', '57086-037');
  
  // Clica no botão de busca
  await page.click('button[type="submit"]');
  
  // Aguarda o resultado aparecer
  await page.waitForSelector('.resultado');
  
  // Obtém o texto do resultado
  const endereco = await page.textContent('.resultado');
  
  // Verifica se o resultado contém a cidade esperada
  expect(endereco).toContain('Maceió');
});
```

Este teste verifica:
- Preenchimento correto do campo de CEP
- Funcionamento do botão de busca
- Exibição do resultado
- Conteúdo correto do endereço

### 2. Testes Backend
Os testes backend validam a API BrasilAPI, garantindo que as requisições de CEP retornem os dados corretos. Exemplo de teste para busca de CEP válido:

```typescript
test('Deve buscar CEP válido via API', async ({ request }) => {
  // Faz a requisição para a API
  const response = await request.get('https://brasilapi.com.br/api/cep/v2/57086037');
  
  // Converte a resposta para JSON
  const data = await response.json();
  
  // Verifica se a requisição foi bem-sucedida
  expect(response.ok()).toBeTruthy();
  
  // Verifica se o CEP retornado é o esperado
  expect(data.cep).toBe('57086037');
});
```

Este teste verifica:
- Sucesso da requisição HTTP
- Formato correto da resposta
- Dados do CEP retornados
- Validação do conteúdo

### 3. Cenários de Teste
Além dos testes básicos, implementamos diversos cenários para garantir uma cobertura completa:

#### CEPs Válidos
- Busca de CEP com formato completo (57086-037)
- Busca de CEP sem hífen (57086037)
- Validação de múltiplos CEPs em sequência

#### CEPs Inválidos
- CEP inexistente
- CEP com formato incorreto
- CEP com caracteres inválidos

#### Casos de Erro
- Timeout na requisição
- Serviço indisponível
- Resposta com formato inválido

### 4. Validações Implementadas
Para cada teste, realizamos as seguintes validações:

#### Frontend
- Exibição correta do formulário
- Validação de campos obrigatórios
- Mensagens de erro apropriadas
- Apresentação dos resultados
- Responsividade da interface

#### Backend
- Status code da resposta
- Formato do JSON retornado
- Campos obrigatórios presentes
- Valores consistentes
- Tempo de resposta

## 📊 Relatórios e Análise

### 1. Relatório HTML
- Visão geral dos testes
- Detalhes de cada teste
- Screenshots e vídeos
- Tempo de execução

### 2. Relatório JSON
- Dados estruturados
- Integração com ferramentas
- Análise de resultados

## 🔄 Fluxo de Trabalho

### 1. Desenvolvimento
```bash
# Instalar dependências
npm install

# Instalar navegadores
npx playwright install

# Executar testes
npm test

# Executar testes específicos
npm run test:api
npm run test:frontend
```

### 2. CI/CD
O projeto utiliza GitHub Actions para automação contínua, com dois workflows principais:

#### Testes E2E (cep-e2e.yml)
- **Agendamento**: Execução diária às 03:00 BRT
- **Objetivo**: Monitoramento contínuo da estabilidade
- **Características**:
  - Execução em horário de baixo tráfego
  - Não bloqueia o pipeline em caso de falha
  - Notificação automática em caso de problemas
  - Retenção de relatórios por 30 dias

#### Testes de Pull Request
- **Trigger**: Alterações em arquivos de teste
- **Objetivo**: Validação de mudanças
- **Características**:
  - Execução em paralelo com outros testes
  - Foco em mudanças relevantes
  - Feedback rápido para desenvolvedores

### 3. Estratégia de Execução
Para garantir a confiabilidade dos testes, adotamos as seguintes práticas:

#### Horário de Execução
- **Período Ideal**: 00h às 06h BRT
- **Justificativa**:
  - Baixo tráfego no site QualCEP
  - Menor disputa por recursos no CI
  - Maior estabilidade na rede
  - Evita falsos positivos em deploys críticos

#### Configurações de Estabilidade
- Timeout aumentado para 60 minutos
- Cache de dependências
- Configurações otimizadas do Playwright
- Retry em caso de falhas temporárias

#### Workflow de Notificações
- Notificação automática em caso de falhas
- Relatórios detalhados com screenshots e vídeos
- Retenção de artefatos por 30 dias
- Integração com o sistema de issues do GitHub

#### Monitoramento e Manutenção
- Análise diária dos relatórios
- Ajuste de timeouts conforme necessário
- Atualização de seletores quando necessário
- Otimização contínua da performance

## 🚀 Diferenciais Implementados

### 1. Arquitetura Robusta
- Page Objects
- Steps reutilizáveis
- BDD com Gherkin

### 2. Validação Completa
- CEPs válidos
- CEPs inválidos
- Formatos incorretos

### 3. Documentação Detalhada
- README completo
- Documentação técnica
- Estratégia de automação

## 📈 Sugestões de Evolução

### 1. Curto Prazo
- Adicionar mais CEPs de teste
- Implementar testes de carga
- Melhorar cobertura de erros

### 2. Médio Prazo
- Integração com Docker
- Pipeline de CI/CD completo
- Dashboard de métricas

### 3. Longo Prazo
- Testes de acessibilidade
- Testes de segurança
- Monitoramento contínuo

## 👨‍💻 Perfil Demonstrado

- **Comunicativo**: Documentação clara e detalhada
- **Autodidata**: Uso de tecnologias modernas
- **Automotivado**: Diferenciais implementados
- **Curioso**: Exploração de recursos avançados
- **Trabalho em equipe**: Código organizado e documentado
- **Compromissado**: Entrega completa e profissional

---

*Documentação gerada como parte do processo seletivo para a vaga de Analista de Controle de Qualidade na ONErpm.*

# Documentação do Projeto

## O que foi Desenvolvido?

Este projeto implementa testes automatizados para o serviço de busca de CEP, utilizando Playwright e TypeScript. A automação cobre tanto a interface do usuário (frontend) quanto a API de consulta de CEPs.

## Estrutura dos Casos de Teste

### Nomenclatura e Identificação

Os casos de teste seguem um padrão de nomenclatura específico para facilitar a identificação e execução:

- **Formato do ID**: `TC-[TIPO]-[NÚMERO]`
  - `TC`: Test Case (Caso de Teste)
  - `[TIPO]`: API ou FRONT (indicando o tipo de teste)
  - `[NÚMERO]`: Sequência numérica de 4 dígitos (0001, 0002, etc.)

### Exemplos de IDs:
- `TC-API-0001`: Primeiro caso de teste da API
- `TC-FRONT-0001`: Primeiro caso de teste do Frontend

### Organização dos Testes

#### Testes de API (TC-API-XXXX)
1. **TC-API-0001**: Busca de 3 CEPs válidos
   - Valida o retorno correto de endereços para CEPs existentes
   - Verifica cidade, estado e logradouro

2. **TC-API-0002**: Validação de CEP inexistente
   - Testa o comportamento com CEPs que não existem
   - Verifica o código de status 404

3. **TC-API-0003**: Validação de formato inválido
   - Testa diferentes formatos incorretos de CEP
   - Verifica o código de status 400

4. **TC-API-0004**: Validação de timeout
   - Testa o comportamento em caso de timeout
   - Verifica o código de status 408

5. **TC-API-0005**: Validação de método inválido
   - Testa o comportamento com método HTTP incorreto
   - Verifica o código de status 405

#### Testes de Frontend (TC-FRONT-XXXX)
1. **TC-FRONT-0001**: Busca de 3 CEPs válidos usando Steps
   - Implementa o padrão BDD (Behavior Driven Development)
   - Usa Page Objects para melhor manutenção
   - Valida múltiplos CEPs em sequência

### Executando Testes Específicos

Para executar um teste específico, use o comando:
```bash
npm run test:tc "TC-API-0001"  # Executa um teste específico da API
npm run test:tc "TC-FRONT-0001"  # Executa um teste específico do Frontend
```

Para executar todos os testes de um tipo:
```bash
npm run test:tc "TC-API"  # Executa todos os testes da API
npm run test:tc "TC-FRONT"  # Executa todos os testes do Frontend
```

## Justificativa da Escolha do Playwright como Framework Principal

O Playwright foi escolhido como framework principal para automação tanto de testes frontend (UI) quanto backend (API) devido a uma série de vantagens técnicas e de produtividade:

- **Versatilidade:** Permite automatizar tanto aplicações web (UI) quanto chamadas HTTP (API) em um único projeto, facilitando a manutenção e o reuso de código.
- **Suporte a múltiplos navegadores:** Garante que os testes frontend rodem em diferentes engines (Chromium, Firefox, WebKit), aumentando a cobertura e a confiabilidade.
- **Execução paralela e rápida:** Otimiza o tempo de execução dos testes, essencial para pipelines de CI/CD.
- **API moderna e intuitiva:** Facilita a escrita de testes claros, robustos e de fácil manutenção.
- **Recursos avançados:** Suporte nativo a screenshots, vídeos, traces, mocks de rede e manipulação de contexto, tanto para UI quanto para API.
- **Integração com TypeScript:** Permite tipagem estática, melhorando a qualidade do código e reduzindo bugs.
- **Relatórios completos:** Geração automática de relatórios HTML e JSON, facilitando a análise dos resultados.
- **Comunidade ativa e documentação excelente:** Garante evolução contínua e facilidade de aprendizado.

Essa escolha proporciona uma base única, moderna e robusta para automação de testes ponta a ponta, reduzindo a curva de aprendizado, facilitando a integração e promovendo boas práticas de qualidade de software.

--- 