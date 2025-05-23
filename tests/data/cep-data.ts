export interface CepData {
  cep: string;
  linkText: string;
  headingText: string;
  cidade: string;
  uf: string;
}

export const cepsValidos: CepData[] = [
  {
    cep: '01001-000',
    linkText: 'Avenida 0001 (Cj Cidade',
    headingText: 'Rua 01 (Cj Cidade Sorriso I',
    cidade: 'São Paulo',
    uf: 'SP'
  },
  {
    cep: '30130-010',
    linkText: 'Praça Sete de Setembro Centro',
    headingText: 'Praça Sete de Setembro Centro',
    cidade: 'Belo Horizonte',
    uf: 'MG'
  },
  {
    cep: '20040-002',
    linkText: 'Avenida Rio Branco - de 128 a',
    headingText: 'Avenida Rio Branco - de 128 a',
    cidade: 'Rio de Janeiro',
    uf: 'RJ'
  }
]; 