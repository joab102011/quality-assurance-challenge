# language: pt
Funcionalidade: Busca de CEP
  Como usuário do sistema
  Eu quero buscar um CEP
  Para obter informações de endereço

  Contexto:
    Dado que tenho acesso à API BrasilAPI

  Cenário: Buscar CEP válido via API
    Quando eu consultar o CEP "57086-037" via API
    Então devo receber um status code 200
    E o retorno deve conter os dados do endereço
    E o logradouro deve ser "Avenida 0001"
    E a cidade deve ser "Maceió"
    E o estado deve ser "AL"

  Cenário: Validar CEP inválido
    Quando eu informar o CEP "00000-000"
    Então devo ver uma mensagem de erro
    E a mensagem deve indicar que o CEP não foi encontrado

  Cenário: Validar múltiplos CEPs
    Quando eu consultar os seguintes CEPs:
      | cep        | logradouro    | cidade     | uf |
      | 57086-037  | Avenida 0001  | Maceió     | AL |
      | 77818-716  | Rua QC 0001   | Araguaína  | TO |
      | 75710-240  | Rua C-0001    | Catalão    | GO |
    Então cada consulta deve retornar os dados corretos
    E os dados devem corresponder aos valores esperados

  Cenário: Validar formato inválido de CEP
    Quando eu informar os seguintes CEPs com formato inválido:
      | cep        |
      | 1234-567   |
      | 123456     |
      | 12345678-9 |
      | abcde-fgh  |
    Então devo receber uma mensagem indicando "CEP inválido"

Funcionalidade: Busca de CEP no site

  Cenário: Buscar CEP válido na interface
    Dado que estou na página inicial de busca de CEP
    Quando eu digito o CEP "01001-000" e pressiono Enter
    E seleciono o link "Avenida 0001 (Cj Cidade"
    Então devo ver o heading "Rua 01 (Cj Cidade Sorriso I"
