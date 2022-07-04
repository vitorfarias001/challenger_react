import React, { useState } from "react";
import { deleteEmployee } from "../service/requestAPI";
import { Header } from "../components/Header";

export function DeleteEmployee() {
  const [valueInput, setValueInput] = useState("");
  const [data, setData] = useState("");

  const deleteData = async (pCpf) => {
    try {
      const results = await deleteEmployee(pCpf);
      if (results.status == 204) {
        setData("Funcionário excluído com sucesso");
      } else {
        setData(results.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteData(valueInput);
  };

  return (
    <div id="search-content">
      <Header title={"CPF deve ter 11 dígitos"} />
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength="11"
            value={valueInput}
            onChange={({ target }) => setValueInput(target.value)}
            required
          />
          <button>Excluir</button>
        </form>
        <p>{data}</p>
      </main>
    </div>
  );
}
