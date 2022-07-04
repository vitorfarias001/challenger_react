import { response } from "express";
import { StatusCodes } from "http-status-codes";

const handleValidationError = (err, res) => {
  const errorDetails = Object.values(err.errors || {}).map((e) => ({
    field: e.path,
    message: e.message,
  }));

  res.status(StatusCodes.BAD_REQUEST).send({
    error: {
      message: "Erro ao validar os campos",
      details: errorDetails,
    },
  });
};

export default (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return handleValidationError(err, res);
  }
  if (err.name === "CastError") {
    return res.status(StatusCodes.BAD_REQUEST).send({
      field: err.path,
      message: err.message,
    });
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
};
