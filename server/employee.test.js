// Importing supertest as the requester of data
import request from "supertest";

// Importing our app so supertest can query data
import app from "./index";

// Setting a longer timeout so jest doesn't get in the way
jest.setTimeout(10000);

describe("API Data Services", () => {
  // Returns a list of employees by NAME queried
  it("returns employee by NAME", async () => {
    const res = await request(app).get("/employee?name=Afonso");
    expect(res._body[0]).toHaveProperty("name");
    expect(res._body[0].name).toBe("Bernie Afonso");
  });

  // Returns a employee with the CPF queried
  it("returns employee by CPF", async () => {
    const res = await request(app).get("/employee?cpf=72523904624");
    expect(res._body).toHaveProperty("cpf");
    expect(res._body.cpf).toBe("72523904624");
  });

  // Returns a list of employees by TITLE queried
  it("returns employee by TITLE", async () => {
    const res = await request(app).get("/employee?jobTitle=Analista");
    expect(res._body[0]).toHaveProperty("jobTitle");
    expect(res._body[0].jobTitle).toContain("Analista");
  });

  // Returns a list of employees by REGISTRATION DATE queried
  it("returns employee by REGISTRATION DATE", async () => {
    const res = await request(app).get("/employee?date=19%2F04%2F2017");
    expect(res._body[0]).toHaveProperty("createdAt");
    expect(res._body[0].createdAt).toContain("19/04/2017");
  });

  // Returns the quantity of employees by STATE queried
  it("returns employee by STATE", async () => {
    const res = await request(app).get("/employee?state=SC");
    expect(res._body).toHaveProperty("SC");
    expect(res._body.SC).toBe(15);
  });

  // Returns a list of employees by SALARY queried
  it("returns employee by SALARY", async () => {
    const res = await request(app).get("/employee?salary=4361.90");
    expect(res._body[0]).toHaveProperty("salary");
    expect(res._body[0].salary).toBe("4361.90");
  });

  // Returns a list quantity of employees by STATUS queried
  it("returns employee by STATUS", async () => {
    const res = await request(app).get("/employee?status=BLOQUEADO");
    expect(res._body[0]).toHaveProperty("status");
    expect(res._body[0].status).toBe("BLOQUEADO");
  });
});

// Separate unit test to create, update and delete a employee
describe("API Create/Update/Delete Data Services", () => {
  // Create a employee and returns the id of the employee
  it("Create a employee", async () => {
    const req = await request(app)
      .post("/employee")
      .send({
        status: "ATIVO",
        createdAt: "01/07/2022",
        jobTitle: "Dev Senior",
        cpf: "10873848004",
        name: "Joao Pedro Alvares Cabral",
        state: "RS",
        salary: "10000.30",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(req.statusCode).toBe(201);
    expect(req._body).toHaveProperty("id");
  });

  it("Update a employee", async () => {
    const req = await request(app)
      .post("/employee")
      .send({
        status: "BLOQUEADO",
        createdAt: "15/04/2017",
        id: "62be8048f267e4211cda5407",
        jobTitle: "Analista SENIOR",
        cpf: "17949337435",
        name: "Bertie Agans",
        state: "SP",
        salary: "9000.00",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(req.statusCode).toBe(200);
  });

  it("Delete a employee", async () => {
    const req = await request(app).delete("/employee?cpf=90491769768");
    expect(req.statusCode).toBe(204);
  });
});
