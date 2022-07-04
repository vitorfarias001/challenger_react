import React, { useEffect, useState, useMemo } from "react";
import { getByStatus } from "../service/requestAPI";
import { Header } from "../components/Header";
import { List } from "../components/List";

export function Status() {
  const [status, setStatus] = useState(null),
    [valueInput, setValueInput] = useState(""),
    [data, setData] = useState(""),
    desabled = useMemo(() => testStatus(valueInput), [valueInput]);

  function getStatus(event) {
    event.preventDefault();
    setStatus(valueInput);
  }

  function testStatus(value) {
    const regex = /(^ATIVO$|^BLOQUEADO$|^INATIVO$)/i;
    return !regex.test(value);
  }

  const fetchdata = async () => {
    if (status) {
      const results = await getByStatus(status);
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
  }, [status]);
  return (
    <div id="search-content">
      <Header title={"O status deve ser ATIVO, BLOQUEADO ou INATIVO"} />
      <main>
        <form>
          <input
            type="text"
            value={valueInput}
            onChange={({ target }) => setValueInput(target.value)}
          />
          <button disabled={desabled} onClick={getStatus}>
            Pesquisar
          </button>
        </form>
        {typeof data === "string" ? <p> {data} </p> : ""}
        {typeof data[0] === "object" ? <List employees={data} /> : ""}
      </main>
    </div>
  );
}
