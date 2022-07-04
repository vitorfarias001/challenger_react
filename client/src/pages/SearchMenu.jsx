import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";

export function SearchMenu() {
  return (
    <div id="menu-content">
      <Header
        title={"Escolha um atributo para realizar a pesquisa de funcionários"}
      />
      <main>
        <div className="default-menu">
          <Link to={"/search/cpf"}>CPF</Link>
          <Link to={"/search/name"}>Nome</Link>
          <Link to={"/search/job-title"}>Cargo</Link>
          <Link to={"/search/state"}>Quantidade por estado</Link>
          <Link to={"/search/salary"}>Salário</Link>
          <Link to={"/search/date"}>Data de cadastro</Link>
          <Link to={"/search/status"}>Status</Link>
        </div>
      </main>
    </div>
  );
}
