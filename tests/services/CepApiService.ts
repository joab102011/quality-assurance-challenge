import { APIRequestContext } from '@playwright/test';
import { TEST_CONFIG } from '../config/test-config';

interface CepResponse {
  cep: string;
  logradouro: string;
  cidade: string;
  uf: string;
  erro?: boolean;
}

export class CepApiService {
  private readonly baseUrl: string;
  private readonly defaultTimeout: number = 30000;
  private readonly maxRetries: number = 3;
  private readonly retryDelay: number = 1000;

  constructor(private request: APIRequestContext) {
    this.baseUrl = 'https://brasilapi.com.br/api/cep/v1';
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private validarFormatoCep(cep: string): boolean {
    const cepLimpo = cep.replace(/\D/g, '');
    return cepLimpo.length === 8;
  }

  async buscarCep(cep: string, timeout?: number): Promise<CepResponse> {
    if (!this.validarFormatoCep(cep)) {
      throw new Error(`CEP inválido: ${cep}. O CEP deve conter 8 dígitos.`);
    }

    const cepLimpo = cep.replace(/\D/g, '');
    const timeoutValue = timeout || this.defaultTimeout;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        if (timeout) {
          await this.sleep(timeout + 100);
        }

        const response = await this.request.get(
          `${this.baseUrl}/${cepLimpo}`,
          { 
            timeout: timeoutValue,
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'Playwright Test'
            }
          }
        );

        if (!response.ok()) {
          if (response.status() === 404) {
            return {
              cep: cep,
              logradouro: '',
              cidade: '',
              uf: '',
              erro: true
            };
          }
          throw new Error(`Erro na requisição: ${response.status()} ${response.statusText()}`);
        }

        const data = await response.json();
        return {
          cep: data.cep,
          logradouro: data.street || '',
          cidade: data.city || '',
          uf: data.state || '',
          erro: data.erro
        };
      } catch (error) {
        lastError = error;
        if (error.message.includes('timeout') || timeout) {
          throw new Error('Request timed out');
        }
        if (attempt < this.maxRetries) {
          await this.sleep(this.retryDelay * attempt);
          continue;
        }
      }
    }

    throw new Error(`Falha após ${this.maxRetries} tentativas. Último erro: ${lastError?.message}`);
  }

  async buscarMultiplosCeps(ceps: string[]): Promise<CepResponse[]> {
    try {
      const promises = ceps.map(cep => this.buscarCep(cep));
      const results = await Promise.allSettled(promises);

      return results
        .filter((result): result is PromiseFulfilledResult<CepResponse> => 
          result.status === 'fulfilled')
        .map(result => result.value);
    } catch (error) {
      throw new Error(`Erro ao buscar múltiplos CEPs: ${error.message}`);
    }
  }

  async validarCeps(ceps: string[]): Promise<{ cep: string; valido: boolean }[]> {
    return Promise.all(
      ceps.map(async (cep) => {
        try {
          if (!this.validarFormatoCep(cep)) {
            return { cep, valido: false };
          }
          const response = await this.buscarCep(cep);
          return { cep, valido: !response.erro };
        } catch {
          return { cep, valido: false };
        }
      })
    );
  }
} 