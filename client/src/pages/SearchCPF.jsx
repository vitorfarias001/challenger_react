import React, { useEffect, useState, useMemo } from "react";
import { getByCPF } from "../service/requestAPI";
import { Header } from "../components/Header";
import { ListWithId } from "../components/ListWithId";

export function CPF() {
  const [cpf, setCpf] = useState(null),
    [valueInput, setValueInput] = useState(""),
    [data, setData] = useState(""),
    desabled = useMemo(() => testCPF(valueInput), [valueInput]);

  function getCpf(event) {
    event.preventDefault();
    if (!cpf) {
      setCpf(valueInput);
    }
  }

  function testCPF(value) {
    const regex = /^\d{11}$/;
    return !regex.test(value);
  }

  const fetchdata = async () => {
    if (cpf) {
      const results = await getByCPF(cpf);
      if (results.hasOwnProperty("message")) {
        setData(results.message);
      } else {
        setData(results);
      }
    }
  };

  useEffect(() => {
    fetchdata();
  }, [cpf]);

  return (
    <div id="search-content">
      <Header title={"CPF deve ter 11 dígitos"} />
      <main>
        <form>
          <input
            type="text"
            maxLength="11"
            value={valueInput}
            onChange={({ target }) => setValueInput(target.value)}
          />
          <button disabled={desabled} onClick={getCpf}>
            Pesquisar
          </button>
        </form>
        {typeof data === "string" ? <p> {data} </p> : ""}
        {typeof data === "object" ? <ListWithId employee={data} /> : ""}
      </main>
    </div>
  );
}
