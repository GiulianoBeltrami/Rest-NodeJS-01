# Rest-NodeJS <br />
Neste programa foi realizado a criação de uma agenda de um petshop usando o padrão REST com NodeJS.

# Arquvios e explicações <br />
Assets : pasta responsável pelo armazenamento de imagens<br />

Config : configuração customizada do Express<br />

Controller : resposável pela criação das rotas<br />
 ->atendimento.js
   ->Esse arquivo cria e responde as requisições :
     ->Get:
       /atendimentos -> Ao chamar vai retornar uma lista de todos os atendimentos cadastrados no banco de dados
       /atendimentos/:id ->Ao chamar vai retornar um atendimento específico
     ->Post:
       /atendimentos -> Ao chamar vai criar um atendimento novo
       No corpo da requisição devem estar especificados : Cliente ; Pet ; Servico ; Status ; Observacoes ; Data
     ->Patch:
       /atendimentos/:id -> Ao chamar altera os valores de um agendamento específico
       No corpo da requisição devem estar qualquer um desses atributos : Cliente ; Pet ; Servico ; Status ; Observacoes ; Data
     ->Delete:
       /atendimentos:id -> Ao chamar deleta um atendimento específico
 ->pets.js
   ->Esse arquivo cria e responde as requisições :
     ->Get:
       /pets -> Ao chamar vai criar um novo arquivo em uma pasta específica com a foto do pet que foi passada
       No corpo da requisição devem estar esses atributos: Nome ; Imagem(informar o local onde está salvo a foto do animal)
       
Infrastructure:
  Arquivos: local resposável por guardar a lógica de leitura e salvamento de stream
    ->uploadDeArquivos.js
  Database:
    ->connection.js : responsável por se conectar com o banco de dados
    ->query.js : lógica responsável por abstrair o uso de uma query utilizando Promises
    ->table.js : criação das tabelas necessárias para utilizar o software
    
Models: criação da lógica que será aplicada nos controllers
  ->atendimento.js : adiciona() , lista() , buscaPorId(id) , altera(id,valores) , deleta(id)
  ->pets.js: adiciona()
  
Repositorios : local resposável por armazenar o SQL
  ->atendimento.js : classe que se comunica com a models para escrever as querys para o banco de dados - adiciona() , lista() , buscaPorId(id) , altera(id,valores) , deleta(id)
  
Servicos : local resposável pelo armazenamento das APIs que serão utilizadas pelo software
  ->cliente.js : API que faz o vínculo entre cliente e um cpf gerado aleatóriamente
  
#Como utilizar
1.Faça o clone do projeto
2.Vá na pasta REST-NODEJS-01 com o terminal e digite: npm install
3.Digite : npm start
4.Utilize o postman para testar

#Tecnologias
Node.js
 Express
 Consign
 Path
 Fs
 Moment
 Axios
 Mysql
 Body-parser
 Faker
 
