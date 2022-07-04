import mongoose from "mongoose";

const employeesSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: [true, "Campo não pode ficar vazio"],
    trim: true,
  },
  cpf: {
    type: String,
    required: [true, "Campo não pode ficar vazio"],
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, "Campo não pode ficar vazio"],
    trim: true,
  },
  state: {
    type: String,
    required: [true, "Campo não pode ficar vazio"],
    match: [/^[A-Z]{2}/, "Deve ser uma sigla com duas letras em maiúsculo"],
    trim: true,
  },
  salary: {
    type: String,
    required: [true, "Campo não pode ficar vazio"],
    trim: true,
  },
  status: {
    type: String,
    default: "ATIVO",
    match: [
      /(^ATIVO$|^BLOQUEADO$|^INATIVO$)/,
      "Aceita apenas os valores ATIVO, BLOQUEADO ou INATIVO",
    ],
    required: [true, "Campo não pode ficar vazio"],
    trim: true,
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    }),
    match: [
      /^(0[1-9]|[12][0-9]|3[01])[\/\-](0[1-9]|1[012])[\/\-]\d{4}$/,
      "Deve ser no formato DD/MM/YYYY",
    ],
    required: [true, "Campo não pode ficar vazio"],
  },
});

export default mongoose.model("EmployeesModel", employeesSchema);
