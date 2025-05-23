export const formatarCep = (cep: string): string => {
  return cep.replace(/\D/g, '');
};

export const validarFormatoCep = (cep: string): boolean => {
  const regexCep = /^\d{5}-?\d{3}$/;
  return regexCep.test(cep);
};

export const medirTempoExecucao = async (fn: () => Promise<any>): Promise<number> => {
  const startTime = Date.now();
  await fn();
  return Date.now() - startTime;
};

export const gerarRelatorioPerformance = (tempos: number[]): {
  media: number;
  minimo: number;
  maximo: number;
} => {
  return {
    media: tempos.reduce((a, b) => a + b, 0) / tempos.length,
    minimo: Math.min(...tempos),
    maximo: Math.max(...tempos)
  };
};

export const validarRespostaApi = (response: any): boolean => {
  return (
    response &&
    typeof response === 'object' &&
    'cep' in response &&
    'logradouro' in response &&
    'localidade' in response &&
    'uf' in response
  );
}; 