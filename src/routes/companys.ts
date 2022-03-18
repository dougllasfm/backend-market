import express from "express";
import { authenticateCompanyController } from "../controllers/authenticateCompany/authenticateCompanyController";
import { companyData, companyFilter, createCompany, listCompanys } from "../controllers/companys";
const Companys = express.Router();

Companys.post("/createCompany", createCompany);

Companys.get("/companys", listCompanys);

Companys.get("/company", companyData);

Companys.get("/companyFilter", companyFilter);

Companys.post("/authenticate", authenticateCompanyController);

export { Companys };
