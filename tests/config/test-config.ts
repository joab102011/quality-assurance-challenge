export const TEST_CONFIG = {
  timeouts: {
    default: 60000,
    action: 30000,
    navigation: 30000,
    expect: 30000
  },
  retries: {
    ci: 2,
    local: 1
  },
  viewport: {
    width: 1280,
    height: 720
  },
  browsers: ['chromium'],
  reporters: ['html', 'json'],
  outputDir: 'test-results/',
  api: {
    baseUrl: 'https://brasilapi.com.br/api/cep/v2'
  }
}; 