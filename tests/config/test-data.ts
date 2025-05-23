export const CEP_TEST_DATA = {
  valid: [
    {
      cep: '01311-000',
      logradouro: 'Avenida Paulista',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      uf: 'SP',
      descricao: 'Avenida Paulista - São Paulo'
    },
    {
      cep: '20010-020',
      logradouro: 'Rua São José',
      bairro: 'Centro',
      cidade: 'Rio de Janeiro',
      uf: 'RJ',
      descricao: 'Rua São José - Rio de Janeiro'
    },
    {
      cep: '90050-170',
      logradouro: 'Rua Sarmento Leite',
      bairro: 'Centro Histórico',
      cidade: 'Porto Alegre',
      uf: 'RS',
      descricao: 'Rua Sarmento Leite - Porto Alegre'
    }
  ],
  invalid: [
    {
      cep: '00000-000',
      descricao: 'CEP inexistente'
    },
    {
      cep: '12345',
      descricao: 'CEP incompleto'
    },
    {
      cep: '123456789',
      descricao: 'CEP com dígitos extras'
    }
  ],
  performance: {
    timeout: 3000, // 3 segundos
    batchSize: 3 // número de CEPs para teste de performance
  }
}; 