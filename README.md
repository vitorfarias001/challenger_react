# Web_Services

## Sobre o projeto

Este protejo tem o server e o cliente, o server é uma API feita em Node.js e o cliente feito em ReactJS.
Tem como objteivo criar uma API que realize os seguintes requisitos:

- Serviço que localiza/retorna funcionários por Nome;
- Serviço que localiza/retorna funcionários por CPF;
- Serviço que localiza/retorna funcionários por Cargo;
- Serviço que localiza/retorna funcionários por Data de Cadastros;
- Serviço que retorna funcionários agrupados por UF de Nascimento, de forma quantitativa;
- Serviço que localiza/retorna funcionários por faixa salarial;
- Serviço que localiza/retorna funcionários por status;
- Serviço para incluir um novo funcionário (caso o funcionário já exista, apenas atualizar);
- Serviço para excluir um funcionário pelo número do CPF;

## Assim como criar um frontend que consuma os serviços criados

## Sobre o server

## Usa MongoDB

MongoDB é um software de banco de dados de código aberto e multiplataforma e classificado NoSQL.

- [Wikipedia](https://pt.wikipedia.org/wiki/MongoDB)
- [MongoDB](https://www.mongodb.com/)
- [MongoDB Atlas](https://mongodb.com/atlas)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Configurações


### Configuração MongoDB database

Configure MongoDB localmente usando os dados do [MongoDB Atlas for free](https://mongodb.com/atlas).

- Primeiro passo é criar um cluster shared seguindo o print https://prnt.sc/Nkuag7M6Hl8f
- Necessário criar um usuario e senha a sua preferencia - https://prnt.sc/j4QRx9Rwied4

### Configuração de variáveis de ambiente

Copie as variáveis do arquivo`env.example` para o`.env`:

```bash
 .env.example
```

Set each variable on `.env`:

- Segue a print como exemplo  https://prnt.sc/z6bYjrebarJF que por padrão costumo rodar na porta 27017 

- `MONGODB_URL` - Nessa variável você deve por a string de conexão MongoDB do [MongoDB Atlas](https://mongodb.com/atlas) você pode encontrá-la clicando em "Connect" no seu cluster.
- `PORT` - Nessa variável você deve por a porta que será usada para levantar o sistema.


### Conectando MongoDB

- Conectando o Cluster basta agora você clicar em connect abrindo este modal - https://prnt.sc/61uTJx3DypBe no primeiro guia em verde

```Add You Current Ip Address ```
- Logo após só clicar em Add Ip Adress https://prnt.sc/hMQX-vfYkebk

- Agora conectar nossa aplicação clicando em ```Connect your application ``` https://prnt.sc/YDtRx0c-QG4S

- Agora você vai copiar o url gerado clicando no icone de copy e este vai ser nosso mongodb url https://prnt.sc/TEyUNEyDVsF6

- Seguindo desta manteira https://prnt.sc/_5Lkc_yuUuQw

- Para finalizar onde esta escrito password você deve colocar sua senha do admin criado no cluster onde nós fizemos no passo anterior lemnbrando de remover os sinais de <> seguindo o print como exemplo https://prnt.sc/fKvwuZX3rYuk

### Iniciando o projeto

```bash
entre na pasta client e digite o comando no terminal yarn
entre na pasta server e digite o comando no terminal yarn

Você tera que abrir um segundo terminal deixando 2 em aberto
Em primeiro lugar utilize o comando npm start dentro da pasta server
Em seguida utilize o comando npm start dentro da pasta client

Só isso ja ira funcionar nosso projeto
```
#### Scripts
Antes de testar os scripts é necessario uma configuração com o puplate no terminal de server rodar o seguinte comando

```
npm run populate
```

Logo em seguinda rodar o proximo comando 

```
npm run test
```

### Documentação


A documentação da API foi feita com swagger-ui você pode acessá-la na rota /api-docs

Para acessar esta rota voce fazer isso tera que configurar seu localhost para 5000 disponibilizando a doc /api-docs

seguindo desta forma http://localhost:5000/api-docs

---


## Este projeto usa SASS 4.14.1

Para que não ocorra nenhum problema observe se a versão do node que você está usando suporta o [Sass](https://sass-lang.com/).

## Páginas Implementadas

Essa aplicação consome apenas as rotas que usa o verbo GET. O objetivo deveria ser cosumir todas as rotas criadas no serve.


### Explicação do projeto

- A parte de criar funcionários é a parte mais completa , então temos que seguir algumas regras nesse preenchimento onde coloquei
- O nosso id vai ser usado apenas para atualizar informações então só passamos id quando for atualizar e isso tambem pra data de cadastro se não ele não vai conseguir achar o usuario cadastrado.
- No resto podemos fazer tranquilamente um usuario naquela data, preenchendo os campos da forma correta ele sempre ira criar um usuario
na data atual.
- Tem uma regra no cpf onde ele testa nosso cpf , ele valida o cpf se é real. 
- Lembrando que o id e a data de cadastrado é criada automaticamente , você cadastraria um usario usando a partir do nome.

Video Expliativo https://files.fm/f/x5e3w6k9c de como funciona o programa