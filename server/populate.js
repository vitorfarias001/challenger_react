// File created to populate the DB with placeholder data so it can run tests
// File created to populate the DB with placeholder data so it can run tests
// File created to populate the DB with placeholder data so it can run tests

import dotenv from "dotenv";
import mongoose from "mongoose";
import { createRequire } from "module";

import EmployeesModel from "./models/employeesModels.js";

const require = createRequire(import.meta.url);

const funcionarios = require("./funcionarios.json");

dotenv.config();

const { MONGODB_URL } = process.env;
if (!MONGODB_URL) {
  throw new Error(
    "Defina uma variável de ambiente com nome MONGODB_URL no arquivo .env"
  );
}

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => EmployeesModel.collection.drop())
  .then(() =>
    EmployeesModel.insertMany(funcionarios)
      .then(function () {
        console.log("Data inserted"); // Success
      })
      .then(() => mongoose.connection.close())
  )
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
