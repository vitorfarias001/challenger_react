import React, { useState } from "react";
import { Header } from "../components/Header";
import { validate } from "gerador-validador-cpf";
import { createEmployee } from "../service/requestAPI";
import "../styles/globals.css";

export function CreateEmployee() {
  const [employeeData, setEmployeeData] = useState({
    status: "",
    createdAt: new Date().toLocaleDateString(),
    jobTitle: "",
    cpf: "",
    name: "",
    state: "",
    salary: "",
  });
  const [errorCPF, setErrorCPF] = useState(false);
  const [idInput, setIdInput] = useState("");
  const [id, setId] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");

  const ErrorComponent = () => {
    return <p className="error">Erro no campo CPF</p>;
  };

  const handleChange = (event) => {
    setEmployeeData({
      ...employeeData,
      [event.target.name]: event.target.value,
    });
  };

  const postData = async (pData) => {
    try {
      const results = await createEmployee(pData);
      console.log(results);
      if (results.hasOwnProperty("_id")) {
        setId("Funcionário atualizado com sucesso");
        return;
      }
      if (results.id !== undefined) {
        setId(`ID do funcionário criado: ${results.id}`);
      } else {
        setId(`Falha ao criar/atualizar funcionário`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idInput !== "" && registrationDate !== "") {
      employeeData.id = idInput;
      employeeData.createdAt = registrationDate;
      postData(employeeData);
      return;
    }
    const validCPF = validate(employeeData.cpf);
    if (validCPF) {
      postData(employeeData);
    } else {
      setErrorCPF(true);
    }
  };

  return (
    <div id="search-content">
      <Header title={"Criar um funcionário "} />
      <main>
        <h3>Preenchimento do formulário</h3>
        <br />
        <p>
          <span>ID -</span> Adicionar ID somente para atualizar informações
        </p>
        <p>
          <span>Data de Cadastro -</span> Para a atualização dos dados você deve
          informar a data de cadastro original
        </p>
        <p>
          <span>Nome -</span> sem regras
        </p>
        <p>
          <span>CPF -</span> 11 digitos sem pontuação
        </p>
        <p>
          <span>Cargo -</span> sem regras
        </p>
        <p>
          <span>Salário -</span> O salário deve ter dois número após o ponto
        </p>
        <p>
          <span>Status -</span> ATIVO/INATIVO/BLOQUEADO
        </p>
        <br />
        {errorCPF ? <ErrorComponent /> : ""}
        <br />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={idInput}
            onChange={({ target }) => setIdInput(target.value)}
          />
          <input
            type="text"
            name="registration-date"
            placeholder="Data de Cadastro"
            value={registrationDate}
            onChange={({ target }) => setRegistrationDate(target.value)}
          />
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={employeeData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cpf"
            maxLength="11"
            placeholder="CPF"
            value={employeeData.cpf}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="jobTitle"
            placeholder="Cargo"
            value={employeeData.jobTitle}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="salary"
            placeholder="Salário"
            value={employeeData.salary}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="Estado"
            value={employeeData.state}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={employeeData.status}
            onChange={handleChange}
            required
          />
          <button>CRIAR</button>
        </form>
        <p className="created-id">{id}</p>
      </main>
    </div>
  );
}
