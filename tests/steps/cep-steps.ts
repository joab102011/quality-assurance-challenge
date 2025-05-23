import { Page } from '@playwright/test';
import { QualCepPage } from '../pages/QualCepPage';

export class CepSteps {
  private qualCepPage: QualCepPage;

  constructor(private page: Page) {
    this.qualCepPage = new QualCepPage(page);
  }

  async navegarParaPaginaDeBusca(): Promise<void> {
    await this.qualCepPage.navegarParaPaginaDeBusca();
  }

  async pesquisarCep(cep: string, linkText: string, headingText: string): Promise<Page> {
    return await this.qualCepPage.pesquisarCep(cep, linkText, headingText);
  }

  async fecharPopup(): Promise<void> {
    await this.qualCepPage.fecharPopup();
  }

  async validarEnderecoCompleto(page1: Page, headingText: string): Promise<void> {
    const heading = page1.getByRole('heading', { name: headingText });
    await heading.waitFor({ state: 'visible', timeout: 10000 });
  }

  async obterResultadoBusca(page1: Page): Promise<string> {
    const heading = page1.getByRole('heading');
    const texto = await heading.textContent();
    return texto || '';
  }
}