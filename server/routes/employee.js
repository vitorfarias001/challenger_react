import express from "express";

import {
  updateOrCreate,
  getByQuery,
  deleteByCPF,
} from "../controllers/employeesController.js";

import {
  checkCpfAndSalary,
  checkByQuery,
  checkCPFtoDelete,
} from "../middleware/employeesMiddleware.js";

const router = express.Router();

router.post("/", checkCpfAndSalary, updateOrCreate);
router.get("/", checkByQuery, getByQuery);
router.delete("/", checkCPFtoDelete, deleteByCPF);

export default router;
