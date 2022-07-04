import React from "react";
import "../styles/header.css";

export function Header({ title }) {
  return (
    <header className="headerContainer">
      <h1>{title}</h1>
    </header>
  );
}
