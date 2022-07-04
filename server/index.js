// Importing all the required modules
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./swagger.js";

import erroToCreated from "./middleware/erroToCreated.js";
import employeeRoute from "./routes/employee.js";

// Setting the dotenv configurations
dotenv.config();

// Getting the MongoDB_URL and PORT from the enviroment variables
const { MONGODB_URL, PORT } = process.env;

// Validating if the MongoDB_URL is undefined
if (!MONGODB_URL) {
  throw new Error(
    "Defina uma variável de ambiente com nome MONGODB_URL no arquivo .env"
  );
}

// Validating if the PORT is undefined
if (!PORT) {
  throw new Error(
    "Defina uma variável de ambiente com nome PORT no arquivo .env"
  );
}

// Using express as the middleware
const app = express();

// Using bodyParser as the content parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Making the app use CORS mechanism
app.use(cors());

// Setting docs API endpoint using swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Setting employee endpoint using the imported routes
app.use("/employee", employeeRoute);

// Handling errors with custom middleware
app.use(erroToCreated);

// Trying to connect to mongoDB
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`))
  )
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

mongoose.set("useFindAndModify", false);

// Setting local enviroment
app.listen(5000);

export default app;
