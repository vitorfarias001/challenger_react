import { StatusCodes } from "http-status-codes";
import EmployeesModel from "../models/employeesModels.js";

async function getEmployeesByName(request, response, next) {
  try {
    const { name } = request.query;
    const employees = await EmployeesModel.find({
      name: new RegExp(name, "i"),
    });
    if (employees.length === 0) {
      return response.status(StatusCodes.NOT_FOUND).json({
        message: "Não foram encontrados(as) funcionários(as) com esse nome",
      });
    }
    return response.status(StatusCodes.OK).json(employees);
  } catch (err) {
    return next(err);
  }
}

async function getEmployeesByCPF(request, response, next) {
  try {
    const { cpf } = request.query;
    const employee = await EmployeesModel.findOne({ cpf });
    if (!employee) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Não foi encontrado(a) funcionário(a) com esse CPF" });
    }
    return response.status(StatusCodes.OK).json(employee);
  } catch (err) {
    return next(err);
  }
}

async function getEmployeesByJobTitle(request, response, next) {
  try {
    const { jobTitle } = request.query;
    const employees = await EmployeesModel.find({
      jobTitle: new RegExp(jobTitle, "i"),
    });
    if (employees.length === 0) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Não há funcionários(as) com esse cargo" });
    }
    return response.status(StatusCodes.OK).json(employees);
  } catch (err) {
    return next(err);
  }
}

async function getEmployeesByState(request, response, next) {
  try {
    const { state } = request.query;
    const employees = await EmployeesModel.find({ state });
    if (employees.length === 0) {
      return response.status(StatusCodes.NOT_FOUND).json({
        message: "Não há funcionários(as) cadastrados nessa sigla de estado",
      });
    }
    return response
      .status(StatusCodes.OK)
      .json({ [`${state}`]: employees.length });
  } catch (err) {
    return next(err);
  }
}
async function getEmployeesBySalary(request, response, next) {
  try {
    const { salary } = request.query;
    const employees = await EmployeesModel.find({ salary });
    if (employees.length === 0) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Não há funcionários(as) com esse valor de salário" });
    }
    return response.status(StatusCodes.OK).json(employees);
  } catch (err) {
    return next(err);
  }
}

async function getEmployeesByStatus(request, response, next) {
  try {
    const { status } = request.query;
    const employees = await EmployeesModel.find({
      status: status.toUpperCase(),
    });
    if (employees.length === 0) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Não há funcionários(as) com esse status" });
    }
    return response.status(StatusCodes.OK).json(employees);
  } catch (err) {
    return next(err);
  }
}

async function getEmployeesByCreatAt(request, response, next) {
  try {
    const { date } = request.query;
    const employees = await EmployeesModel.find({
      createdAt: date,
    });
    if (employees.length === 0) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Não há funcionários(as) cadastrados nesse dia" });
    }
    return response.status(StatusCodes.OK).json(employees);
  } catch (err) {
    return next(err);
  }
}

async function getByQuery(request, response, next) {
  const key = Object.keys(request.query)[0];
  try {
    if (key === "name") {
      return getEmployeesByName(request, response, next);
    } else if (key === "cpf") {
      return getEmployeesByCPF(request, response, next);
    } else if (key === "jobTitle") {
      return getEmployeesByJobTitle(request, response, next);
    } else if (key === "state") {
      return getEmployeesByState(request, response, next);
    } else if (key === "salary") {
      return getEmployeesBySalary(request, response, next);
    } else if (key === "status") {
      return getEmployeesByStatus(request, response, next);
    } else if (key === "date") {
      return getEmployeesByCreatAt(request, response, next);
    }
    return response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Não foi possível fazer a pesquisa" });
  } catch (err) {
    return next(err);
  }
}

async function deleteByCPF(request, response, next) {
  try {
    const { cpf } = request.query;
    const employee = await EmployeesModel.findOne({ cpf });
    if (!employee) {
      return response.status(StatusCodes.NOT_FOUND).json({
        message:
          "Não foi encontrado(a) funcionário(a) com esse CPF para ser deletado",
      });
    }
    await EmployeesModel.findOneAndDelete({ cpf });
    return response.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    return next(err);
  }
}

async function update(request, response, next) {
  try {
    const { id, createdAt, jobTitle, cpf, name, state, salary, status } =
      request.body;

    const updatedEmployee = await EmployeesModel.findOneAndUpdate(
      { _id: id },
      { $set: { createdAt, jobTitle, cpf, name, state, salary, status } },
      { new: true }
    );
    if (!updatedEmployee) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Não há funcionário(a) com esse identificador" });
    }
    return response.status(StatusCodes.OK).json(updatedEmployee);
  } catch (err) {
    return next(err);
  }
}

async function create(request, response, next) {
  try {
    const { createdAt, jobTitle, cpf, name, state, salary, status } =
      request.body;
    const createEmployee = await EmployeesModel.create({
      createdAt,
      jobTitle,
      cpf,
      name,
      state,
      salary,
      status: status.toUpperCase(),
    });
    return response
      .status(StatusCodes.CREATED)
      .json({ id: createEmployee._id });
  } catch (err) {
    return next(err);
  }
}

async function updateOrCreate(request, response, next) {
  try {
    if (request.body.id) {
      const employee = await EmployeesModel.findOne({
        _id: request.body.id,
      });
      if (employee) {
        return update(request, response, next);
      }
    }
    return create(request, response, next);
  } catch (err) {
    return next(err);
  }
}
export { getByQuery, deleteByCPF, updateOrCreate };
