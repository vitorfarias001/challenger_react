export const swaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "API de manipulação banco de dados de funcionários",
    description:
      "Essa API tem como objetivo manipular os dados de uma lista de usário para um desafio prático",
    contact: {
      email: "sepulvedabruna@gmail.com",
    },
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "baseUrl para teste",
    },
  ],
  paths: {
    "/employee": {
      post: {
        summary: "Cadastro de novo funcionário",
        description:
          "Essa rota será responsável tanto por adicionar um novo funcionário ao banco de dados ou atualiza os dados do funcionário já existente caso seja passado um identificador. Observação: passar campo 'id' apenas se desejar fazer atulização de dados.",
        tags: ["Employees"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                oneOf: [
                  { $ref: "#/components/schemas/EmployeeCreate" },
                  { $ref: "#/components/schemas/EmployeeUpdate" },
                ],
              },
              examples: {
                create: {
                  value: {
                    status: "ATIVO",
                    createdAt: "03/07/2021",
                    jobTitle: "Dev Jr",
                    cpf: "85235708709",
                    name: "Aaron Aaberg",
                    state: "AP",
                    salary: "8965.30",
                  },
                },
                update: {
                  value: {
                    id: "60e09f55a82c7519f58a101d",
                    status: "ATIVO",
                    createdAt: "03/07/2021",
                    jobTitle: "Dev Jr",
                    cpf: "85235708709",
                    name: "Aaron Aaberg",
                    state: "AP",
                    salary: "8965.30",
                  },
                },
              },
            },
          },
        },
        responses: {
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  oneOf: [
                    { $ref: "#/components/schemas/Message" },
                    { $ref: "#/components/schemas/ValidationModel" },
                    { $ref: "#/components/schemas/ValidationId" },
                  ],
                },
              },
            },
          },
          404: {
            description: "Not Found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          200: {
            description: "Ok",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Return",
                },
              },
            },
          },
          201: {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  properties: {
                    id: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      get: {
        summary: "Localizar funcionários",
        description:
          "Essa rota será responsável por localizar e retornar ao usuário o funcionário de acordo com a query passada por parâmetro. Observação: não há pesquisa para combinações de parâmetros! A pesquisa sempre será feita pela primeira query passada ou caso seja apenas uma, será feita pesquisa com base nela.",
        tags: ["Employees"],
        parameters: [
          {
            in: "query",
            name: "name",
            description:
              "Retorna uma lista de funcionários(as) com os(as) nomes correspondentes ao passado na query",
            schema: { type: "string" },
          },
          {
            in: "query",
            name: "cpf",
            description:
              "Retorna o funcionário com o cpf correspondente ao valor da query. Deve ser uma sequência de 11 números",
            schema: { type: "string" },
          },
          {
            in: "query",
            name: "jobTitle",
            description:
              "Retorna uma lista de funcionários(as) que tenham o cargo correspondente ao valor da query.",
            schema: { type: "string" },
          },
          {
            in: "query",
            name: "state",
            description:
              "Retorna um JSON, sendo a chave a sigla do estado correspondente ao valor da query, e sendo o valor a quantidade de funcionários cadastrados que tenham esse estado como registro",
            schema: { type: "string" },
          },
          {
            in: "query",
            name: "salary",
            description:
              "Retorna uma lista de funcionários(as) que tenham o salário correspondente ao valor da query.",
            schema: { type: "string" },
          },
          {
            in: "query",
            name: "status",
            description:
              "Retorna uma lista de funcionários(as) que tenham o status correspondente ao valor da query. Observação: para essa pesquisa, deve ser atribuído a query apenas um dos três valores: ATIVO, INATIVO ou BLOQUEADO",
            schema: { type: "string" },
          },
          {
            in: "query",
            name: "date",
            description:
              "Retorna uma lista de funcionários(as) que tenham o cadastro realizado no dia correspondente ao valor da query. Observação: para essa pesquisa deve ser atribuido a query apenas um valor no formato DD/MM/YYYY",
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Ok",
            content: {
              "application/json": {
                schema: {
                  oneOf: [
                    { $ref: "#/components/schemas/Return" },
                    { $ref: "#/components/schemas/ReturnArray" },
                  ],
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          404: {
            description: "Not Found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        summary: "Deletar funcionário",
        descriptin:
          "Esta rota será responsável por excluir um funcionário do banco através do número do CPF",
        tags: ["Employees"],
        parameters: [
          {
            in: "query",
            name: "cpf",
            description:
              "Exclui um funcionário do banco de dados. Deve ser uma sequência de 11 números enviada por",
            schema: { type: "string" },
          },
        ],
        responses: {
          404: {
            description: "Not Found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          400: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          204: {
            description: "No content",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      EmployeeUpdate: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          createdAt: {
            type: "string",
          },
          jobTitle: {
            type: "string",
          },
          cpf: {
            type: "string",
          },
          name: {
            type: "string",
          },
          state: {
            type: "string",
          },
          salary: {
            type: "string",
          },
          status: {
            type: "string",
          },
        },
      },
      EmployeeCreate: {
        type: "object",
        properties: {
          createdAt: {
            type: "string",
          },
          jobTitle: {
            type: "string",
          },
          cpf: {
            type: "string",
          },
          name: {
            type: "string",
          },
          state: {
            type: "string",
          },
          salary: {
            type: "string",
          },
          status: {
            type: "string",
          },
        },
      },
      Return: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          createdAt: {
            type: "string",
          },
          jobTitle: {
            type: "string",
          },
          cpf: {
            type: "string",
          },
          name: {
            type: "string",
          },
          state: {
            type: "string",
          },
          salary: {
            type: "string",
          },
          status: {
            type: "string",
          },
          __v: {
            type: "number",
          },
        },
      },
      ReturnArray: {
        type: "array",
        properties: {
          id: {
            type: "string",
          },
          createdAt: {
            type: "string",
          },
          jobTitle: {
            type: "string",
          },
          cpf: {
            type: "string",
          },
          name: {
            type: "string",
          },
          state: {
            type: "string",
          },
          salary: {
            type: "string",
          },
          status: {
            type: "string",
          },
          __v: {
            type: "number",
          },
        },
      },
      Message: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
      ValidationModel: {
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: {
              message: {
                type: "string",
              },
              details: {
                type: "array",
                properties: {
                  field: {
                    type: "string",
                  },
                  message: { type: "string" },
                },
              },
            },
          },
        },
      },
      ValidationId: {
        type: "object",
        properties: {
          field: {
            type: "string",
          },
          message: { type: "string" },
        },
      },
    },
  },
};
