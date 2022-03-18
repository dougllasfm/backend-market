import express from "express";
const Companys = express.Router();
import { authenticateCompanyController } from "../controllers/authenticateCompany/authenticateCompanyController";
import { refreshTokenCompanyController } from "../controllers/refreshTokenCompany/refreshTokenCompanyController";
import { createCompany, listCompanys, companyData, companyFilter } from "../controllers/companys";

Companys.post("/createCompany", createCompany);

Companys.get("/companys", listCompanys);

Companys.get("/company", companyData);

Companys.get("/companyFilter", companyFilter);

Companys.post("/authenticate", authenticateCompanyController);

Companys.post("/refresh-token", refreshTokenCompanyController);

export { Companys };
