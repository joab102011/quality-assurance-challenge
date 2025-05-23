import { defineConfig, devices } from '@playwright/test';
import { TEST_CONFIG } from './tests/config/test-config';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Configuração do Playwright para execução de testes
 * Otimizada para evitar flaky tests e garantir estabilidade em CI/CD
 */
export default defineConfig({
  // Diretório onde estão os testes
  testDir: './tests',

  // Timeouts globais
  timeout: 60000, // 60 segundos para cada teste
  expect: {
    timeout: 30000 // 30 segundos para expectativas
  },

  // Configurações de execução
  fullyParallel: false, // Desativa execução paralela
  forbidOnly: !!process.env.CI,
  // Reporters
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/test-results.json' }]
  ],

  // Configurações globais para todos os projetos
  use: {
    // URL base para navegação
    baseURL: 'https://qualcep.com.br',

    // Configurações de trace e evidências
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Atributo para identificação de elementos
    testIdAttribute: 'data-testid',

    // Timeouts específicos
    actionTimeout: 30000, // 30 segundos para ações
    navigationTimeout: 30000, // 30 segundos para navegação

    // Viewport padrão
    viewport: { width: 1280, height: 720 },

    // Configurações de rede
    bypassCSP: true, // Ignora Content Security Policy
    ignoreHTTPSErrors: true, // Ignora erros de HTTPS

    // Configurações de performance
    launchOptions: {
      slowMo: 100, // Adiciona delay entre ações
    }
  },

  // Projetos para diferentes navegadores
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

  // Diretório de saída para relatórios e evidências
  outputDir: 'test-results/',

  // Configurações de CI
  preserveOutput: 'failures-only', // Mantém apenas evidências de falhas
  quiet: false, // Mostra logs detalhados
});
