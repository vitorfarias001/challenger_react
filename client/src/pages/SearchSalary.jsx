import React, { useEffect, useState, useMemo } from "react";
import { getBySalary } from "../service/requestAPI";
import { Header } from "../components/Header";
import { List } from "../components/List";

export function Salary() {
  const [salary, setSalary] = useState(null),
    [valueInput, setValueInput] = useState(""),
    [data, setData] = useState(""),
    desabled = useMemo(() => testSalary(valueInput), [valueInput]);

  function getSalary(event) {
    event.preventDefault();
    setSalary(valueInput);
  }

  function testSalary(value) {
    const regex = /^\d+(\.\d\d)$/;
    return !regex.test(value);
  }

  const fetchdata = async () => {
    if (salary) {
      const results = await getBySalary(salary);
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
  }, [salary]);

  return (
    <div id="search-content">
      <Header title={"O salário deve ter dois número após o ponto"} />
      <main>
        <form>
          <input
            type="text"
            value={valueInput}
            onChange={({ target }) => setValueInput(target.value)}
          />
          <button disabled={desabled} onClick={getSalary}>
            Pesquisar
          </button>
        </form>
        {typeof data === "string" ? <p> {data} </p> : ""}
        {typeof data[0] === "object" ? <List employees={data} /> : ""}
      </main>
    </div>
  );
}
