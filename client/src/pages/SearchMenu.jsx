import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";

export function SearchMenu() {
  return (
    <div id="menu-content">
      <Header
        title={"Choose an attribute to perform the employee search"}
      />
      <main>
        <div className="default-menu">
          <Link to={"/search/cpf"}>CPF</Link>
          <Link to={"/search/name"}>Name</Link>
          <Link to={"/search/job-title"}>Office</Link>
          <Link to={"/search/state"}>Quantity by state</Link>
          <Link to={"/search/salary"}>Salary</Link>
          <Link to={"/search/date"}>Registration date</Link>
          <Link to={"/search/status"}>Status</Link>
        </div>
      </main>
    </div>
  );
}
