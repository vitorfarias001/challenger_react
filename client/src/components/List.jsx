import React from "react";
import "../styles/list.css";

export function List({ employees }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Data Cadastro</th>
            <th>Cargo</th>
            <th>cpf</th>
            <th>nome</th>
            <th>estado</th>
            <th>salário</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 &&
            employees.map((employee, index) => (
              <tr key={index}>
                <td data-label="createdAt">{employee.createdAt}</td>
                <td data-label="jobTitle">{employee.jobTitle}</td>
                <td data-label="cpf">{employee.cpf}</td>
                <td data-label="name">{employee.name}</td>
                <td data-label="state">{employee.state}</td>
                <td data-label="salary">{employee.salary}</td>
                <td data-label="status">{employee.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
