/**
 * Dados de teste para os cenários de busca de CEP
 */
export const CEP_TEST_DATA = {
  // CEP válido
  VALID: {
    cep: '01311-000',
    logradouro: 'Avenida Paulista',
    bairro: 'Bela Vista',
    cidade: 'São Paulo',
    uf: 'SP',
    descricao: 'CEP válido'
  },

  // CEP inválido
  INVALID: {
    cep: '00000-000',
    descricao: 'CEP inválido'
  },

  // CEP não existente
  NONEXISTENT: {
    cep: '99999-999',
    descricao: 'CEP não encontrado'
  },

  // CEP com formato inválido
  INVALID_FORMAT: {
    cep: '12345',
    descricao: 'Formato de CEP inválido'
  },

  // CEP especial
  SPECIAL: {
    cep: '00000-000',
    descricao: 'CEP especial'
  },

  // CEP vazio
  EMPTY: {
    cep: '',
    descricao: 'CEP não informado'
  },

  // CEP com caracteres especiais
  SPECIAL_CHARS: {
    cep: '12345-@#$',
    descricao: 'CEP contém caracteres especiais'
  },

  // CEP com letras
  LETTERS: {
    cep: '12345-ABC',
    descricao: 'CEP contém letras'
  },

  // CEP com números extras
  EXTRA_NUMBERS: {
    cep: '123456-789',
    descricao: 'CEP contém números extras'
  },

  // CEP com números insuficientes
  INSUFFICIENT_NUMBERS: {
    cep: '123-456',
    descricao: 'CEP contém números insuficientes'
  },

  // Configurações de performance
  PERFORMANCE: {
    timeout: 3000,
    batchSize: 3
  }
}; 