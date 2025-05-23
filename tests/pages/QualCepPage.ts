// Função utilitária para escapar regex
function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

import { Page, Locator } from '@playwright/test';

export class QualCepPage {
  private readonly url = 'https://www.qualcep.com.br/';

  constructor(private page: Page) {}

  async navegarParaPaginaDeBusca(): Promise<void> {
    try {
      await this.page.goto(this.url, { waitUntil: 'domcontentloaded', timeout: 10000 });
      await this.fecharPopup();
    } catch (error) {
      console.error('Erro ao navegar para a página:', error);
      throw error;
    }
  }

  async pesquisarCep(cep: string, linkText: string, headingText: string): Promise<Page> {
    try {
      await this.fecharPopup();
      const input = this.page.getByRole('textbox', { name: 'Digite o CEP, nome da cidade' });
      let tentativas = 0;
      while (tentativas < 3) {
        try {
          await input.click({ force: true, timeout: 5000 });
          break;
        } catch (error) {
          tentativas++;
          if (tentativas === 3) throw error;
          await this.page.waitForTimeout(1000);
        }
      }
      await input.fill('');
      await input.fill(cep);
      await this.page.keyboard.press('Enter');

      // Busca o link pelo texto exato do linkText
      const linkResultado = this.page.getByRole('link', { name: linkText });
      await linkResultado.waitFor({ state: 'visible', timeout: 10000 });
      tentativas = 0;
      while (tentativas < 3) {
        try {
          await linkResultado.click({ force: true, timeout: 5000 });
          break;
        } catch (error) {
          tentativas++;
          if (tentativas === 3) throw error;
          await this.page.waitForTimeout(1000);
        }
      }
      const page1 = await this.page.waitForEvent('popup', { timeout: 10000 });
      await page1.waitForLoadState('domcontentloaded', { timeout: 10000 });
      // Valida o heading pelo texto exato de headingText
      const heading = page1.getByRole('heading', { name: headingText });
      await heading.waitFor({ state: 'visible', timeout: 10000 });
      return page1;
    } catch (error) {
      console.error('Erro ao pesquisar CEP:', error);
      throw error;
    }
  }

  async fecharPopup(): Promise<void> {
    try {
      const popupSelectors = [
        'button[aria-label="Fechar"]',
        'button.close',
        'button.fechar',
        'button[class*="close"]',
        'button[class*="fechar"]',
        'div[class*="cookie"] button',
        'div[class*="consent"] button',
        'button[class*="accept"]',
        'button[class*="aceitar"]',
        'button[class*="agree"]',
        'button[class*="concordar"]',
        'button[class*="ok"]',
        'button[class*="confirm"]',
        'button[class*="confirmar"]'
      ];

      for (const selector of popupSelectors) {
        const locator = this.page.locator(selector);
        if (await locator.isVisible().catch(() => false)) {
          await locator.click({ force: true }).catch(() => {});
          await this.page.waitForTimeout(500);
        }
      }
    } catch {
      // Ignora erros ao tentar fechar popups
    }
  }
} 