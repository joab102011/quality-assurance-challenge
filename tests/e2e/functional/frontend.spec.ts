import { test, expect } from '@playwright/test';
import { CepSteps } from '../../steps/cep-steps';
import { cepsValidos } from '../../data/cep-data';

test.describe('Testes Funcionais - Busca de CEP', () => {
  test('TC-FRONT-0001: Deve buscar 3 CEPs válidos com sucesso', async ({ browser }) => {
    test.setTimeout(180000);
    
    const context = await browser.newContext();
    let page = await context.newPage();
    let cepSteps = new CepSteps(page);
    
    try {
      await test.step('Dado que estou na página de busca de CEP', async () => {
        await cepSteps.navegarParaPaginaDeBusca();
      });

      for (const cepData of cepsValidos) {
        if (page.isClosed()) {
          page = await context.newPage();
          cepSteps = new CepSteps(page);
          await cepSteps.navegarParaPaginaDeBusca();
        }

        let page1;
        await test.step(`Quando pesquiso o CEP ${cepData.cep}`, async () => {
          page1 = await cepSteps.pesquisarCep(cepData.cep, cepData.linkText, cepData.headingText);
        });

        await test.step(`Então devo ver o endereço contendo ${cepData.headingText}`, async () => {
          await cepSteps.validarEnderecoCompleto(page1, cepData.headingText);
        });

        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);

        // Volta para a página inicial para o próximo CEP
        await page.close();
        page = await context.newPage();
        cepSteps = new CepSteps(page);
        await cepSteps.navegarParaPaginaDeBusca();
      }
    } catch (error) {
      throw error;
    } finally {
      try {
        if (!page.isClosed()) {
          await page.close();
        }
        await context.close();
      } catch (error) {}
    }
  });
}); 