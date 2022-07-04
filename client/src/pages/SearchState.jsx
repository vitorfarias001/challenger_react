import React, { useEffect, useState, useMemo } from "react";
import { getByState } from "../service/requestAPI";
import { Header } from "../components/Header";

export function State() {
  const [state, setState] = useState(null),
    [valueInput, setValueInput] = useState(""),
    [data, setData] = useState(""),
    desabled = useMemo(() => testState(valueInput), [valueInput]);

  function getState(event) {
    event.preventDefault();
    setState(valueInput);
  }

  function testState(value) {
    const regex = /^[A-Z]{2}/;
    return !regex.test(value);
  }

  const fetchdata = async () => {
    if (state) {
      const results = await getByState(state);
      const { message } = results;
      if (message) {
        setData(message);
      } else {
        setData(results);
      }
    }
  };
  useEffect(() => {
    fetchdata();
  }, [state]);
  return (
    <div id="search-content">
      <Header
        title={"O estado deve ser uma sígla de duas letras (MAIÚSCULAS)"}
      />
      <main>
        <form>
          <input
            type="text"
            value={valueInput}
            onChange={({ target }) => setValueInput(target.value)}
          />
          <button disabled={desabled} onClick={getState}>
            Pesquisar
          </button>
        </form>
        {typeof data === "string" ? <p> {data} </p> : ""}
        {typeof Object.values(data)[0] === "number" ? (
          <p>
            Há {Object.values(data)[0]} funcionário(s) cadastrado(s) nesse
            estado
          </p>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}
