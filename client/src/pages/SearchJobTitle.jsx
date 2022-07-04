import React, { useEffect, useState, useMemo } from "react";
import { getByJobTitle } from "../service/requestAPI";
import { Header } from "../components/Header";
import { List } from "../components/List";

export function JobTitle() {
  const [jobTitle, setJobTitle] = useState(null),
    [valueInput, setValueInput] = useState(""),
    [data, setData] = useState(""),
    desabled = useMemo(() => testJobTitle(valueInput), [valueInput]);

  function getJobTitle(event) {
    event.preventDefault();
    setJobTitle(valueInput);
  }

  function testJobTitle(value) {
    const regex = /^\d+$/;
    return regex.test(value);
  }

  const fetchdata = async () => {
    if (jobTitle) {
      const results = await getByJobTitle(jobTitle);
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
  }, [jobTitle]);
  
  return (
    <div id="search-content">
      <Header title={"Cargo"} />
      <main>
        <form>
          <input
            type="text"
            value={valueInput}
            onChange={({ target }) => setValueInput(target.value)}
          />
          <button disabled={desabled} onClick={getJobTitle}>
            Pesquisar
          </button>
        </form>
        {typeof data === "string" ? <p> {data} </p> : ""}
        {typeof data[0] === "object" ? <List employees={data} /> : ""}
      </main>
    </div>
  );
}
