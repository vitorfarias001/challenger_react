import React, { useEffect, useState, useMemo } from "react";
import { getByDate } from "../service/requestAPI";
import { Header } from "../components/Header";
import { List } from "../components/List";

export function Date() {
  const [date, setDate] = useState(null),
    [valueInput, setValueInput] = useState(""),
    [data, setData] = useState(""),
    desabled = useMemo(() => testDate(valueInput), [valueInput]);

  function getDate(event) {
    event.preventDefault();
    setDate(valueInput);
  }

  function testDate(value) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])[\/\-](0[1-9]|1[012])[\/\-]\d{4}$/;
    return !regex.test(value);
  }

  const fetchdata = async () => {
    if (date) {
      const results = await getByDate(date);
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
  }, [date]);
  return (
    <div id="search-content">
      <Header title={"A data deve estar no formato DD/MM/YYYY"} />
      <main>
        <form>
          <input
            type="text"
            value={valueInput}
            onChange={({ target }) => setValueInput(target.value)}
          />
          <button disabled={desabled} onClick={getDate}>
            Pesquisar
          </button>
        </form>
        {typeof data === "string" ? <p> {data} </p> : ""}
        {typeof data[0] === "object" ? <List employees={data} /> : ""}
      </main>
    </div>
  );
}
