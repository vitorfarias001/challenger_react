import React from "react";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import "../styles/globals.css";
import "../styles/menus.css";

export function Home() {
  return (
    <div id="home-content">
      <Header title={"Web Services"} />
      <main>
        <div className="default-menu">
          <Link to={"/search"}>Pesquisar</Link>
          <Link to={"/create"}>Criar/Atualizar</Link>
          <Link to={"/delete"}>Remover</Link>
        </div>
      </main>
    </div>
  );
}
