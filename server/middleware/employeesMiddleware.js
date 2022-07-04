import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

const checkCpfAndSalary = (request, response, next) => {
  const { cpf, salary } = request.body;
  const regexCpf = /^\d{11}$/;
  const regexSalary = /^\d+(\.\d\d)$/;
  if (!regexCpf.test(cpf)) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "São 11 números no campo cpf, no formato string" });
  }
  if (!regexSalary.test(salary)) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      message:
        "O campo salary aceita apenas valores com dois numeros após o ponto, no formato string.Exemplo: 'salary': '5312.70'",
    });
  }
  if (typeof cpf !== "string" || typeof salary !== "string") {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Os campos cpf e salary devem ser strings" });
  }
  next();
};

const checkCPFQuery = (request, response, next) => {
  const { cpf } = request.query;
  const regex = /^\d{11}$/;
  if (!regex.test(cpf)) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "São 11 números no campo cpf" });
  }
  next();
};

const checkState = (request, response, next) => {
  const { state } = request.query;
  const regex = /^[A-Z]{2}/;

  if (!regex.test(state)) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Deve ser uma sigla com duas letras em maiúsculo" });
  }
  next();
};

const checkName = (request, response, next) => {
  const { name } = request.query;
  const regex = /^\d+$/;
  if (regex.test(name)) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Esta pesquisa aceita apenas strings" });
  }
  next();
};

const checkJobTitle = (request, response, next) => {
  const { jobTitle } = request.query;
  const regex = /^\d+$/;
  if (regex.test(jobTitle)) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Esta pesquisa aceita apenas strings" });
  }
  next();
};

const checkSalary = (request, response, next) => {
  const { salary } = request.query;
  const regex = /^\d+(\.\d\d)$/;
  if (!regex.test(salary)) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      message:
        "Esta pesquisa aceita apenas valores com dois numeros após o ponto",
    });
  }
  next();
};

const checkStatus = (request, response, next) => {
  const { status } = request.query;

  const regex = /(^ATIVO$|^BLOQUEADO$|^INATIVO$)/;

  if (!regex.test(status.toUpperCase())) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      message:
        "A pesquisa aceita apenas os valores ATIVO, BLOQUEADO ou INATIVO",
    });
  }
  next();
};

const checkDate = (request, response, next) => {
  const { date } = request.query;
  const regex = /^(0[1-9]|[12][0-9]|3[01])[\/\-](0[1-9]|1[012])[\/\-]\d{4}$/;
  if (!regex.test(date)) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      message: "O valor para pesquisa deve ser no formato DD/MM/YYYY",
    });
  }
  next();
};

function checkByQuery(request, response, next) {
  if (Object.keys(request.query)[0] === "name") {
    return checkName(request, response, next);
  } else if (Object.keys(request.query)[0] === "cpf") {
    return checkCPFQuery(request, response, next);
  } else if (Object.keys(request.query)[0] === "jobTitle") {
    return checkJobTitle(request, response, next);
  } else if (Object.keys(request.query)[0] === "state") {
    return checkState(request, response, next);
  } else if (Object.keys(request.query)[0] === "salary") {
    return checkSalary(request, response, next);
  } else if (Object.keys(request.query)[0] === "status") {
    return checkStatus(request, response, next);
  } else if (Object.keys(request.query)[0] === "date") {
    return checkDate(request, response, next);
  }
}

const checkCPFtoDelete = (request, response, next) => {
  const { cpf } = request.query;
  const regex = /^\d{11}$/;
  if (!regex.test(cpf)) {
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "São 11 dígitos no campo cpf" });
  }
  next();
};

export { checkCpfAndSalary, checkByQuery, checkCPFtoDelete };
