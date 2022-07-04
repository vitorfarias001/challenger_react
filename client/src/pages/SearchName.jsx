import React, { useEffect, useState, useMemo } from "react";
import { getByName } from "../service/requestAPI";
import { Header } from "../components/Header";
import { List } from "../components/List";

export function Name() {
  const [name, setName] = useState(null),
    [valueInput, setValueInput] = useState(""),
    [data, setData] = useState(""),
    desabled = useMemo(() => testName(valueInput), [valueInput]);

  function getName(event) {
    event.preventDefault();
    setName(valueInput);
  }

  function testName(value) {
    const regex = /^\d+$/;
    return regex.test(value);
  }

  const fetchdata = async () => {
    if (name) {
      const results = await getByName(name);
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
  }, [name]);
  return (
    <div id="search-content">
      <Header title={"Nome"} />
      <main>
        <form>
          <input
            type="text"
            value={valueInput}
            onChange={({ target }) => setValueInput(target.value)}
          />
          <button disabled={desabled} onClick={getName}>
            Pesquisar
          </button>
        </form>
        {typeof data === "string" ? <p> {data} </p> : ""}
        {typeof data[0] === "object" ? <List employees={data} /> : ""}
      </main>
    </div>
  );
}
