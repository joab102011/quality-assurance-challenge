import { test, expect } from '@playwright/test';
import { CepApiService } from '../services/CepApiService';

test.describe('Testes de API - Busca de CEP', () => {
  let cepApiService: CepApiService;

  test.beforeEach(async ({ request }) => {
    cepApiService = new CepApiService(request);
  });

  test('TC-API-0001: Deve buscar 3 CEPs válidos com sucesso', async () => {
    const ceps = [
      { cep: '57086-037', logradouro: 'Avenida 0001', cidade: 'Maceió', estado: 'AL' },
      { cep: '77818-716', logradouro: 'Rua QC 0001', cidade: 'Araguaína', estado: 'TO' },
      { cep: '75710-240', logradouro: 'Rua C-0001', cidade: 'Catalão', estado: 'GO' }
    ];

    for (const cepData of ceps) {
      const resultado = await cepApiService.buscarCep(cepData.cep);
      expect(resultado.cep).toBe(cepData.cep.replace('-', ''));
      expect(resultado.logradouro).toBe(cepData.logradouro);
      expect(resultado.cidade).toBe(cepData.cidade);
      expect(resultado.uf).toBe(cepData.estado);
    }
  });

  test('TC-API-0002: Deve retornar erro para CEP inexistente', async ({ request }) => {
    const cepApiService = new CepApiService(request);
    const response = await cepApiService.buscarCep('00000-000');
    expect(response.erro).toBeTruthy();
  });

  test('TC-API-0003: Deve validar formato de CEP inválido', async () => {
    await expect(cepApiService.buscarCep('123456'))
      .rejects
      .toThrow('CEP inválido: 123456. O CEP deve conter 8 dígitos.');
  });

  test('TC-API-0004: Deve validar timeout da requisição', async () => {
    await expect(cepApiService.buscarCep('57086-037', 1))
      .rejects
      .toThrow('Request timed out');
  });

  test('TC-API-0005: Deve validar requisição com método inválido', async ({ request }) => {
    const response = await request.post('https://brasilapi.com.br/api/cep/v1/57086-037');
    expect(response.status()).toBe(404);
  });
}); 