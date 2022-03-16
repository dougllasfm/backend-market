import express from "express";
const Companys = express.Router();
import { authenticateCompanyController } from "../controllers/authenticateCompany/authenticateCompanyController";
import { refreshTokenCompanyController } from "../controllers/refreshTokenCompany/refreshTokenCompanyController";
import { createCompany, listCompanys, companyData } from "../controllers/companys";

Companys.post("/createCompany", createCompany);

Companys.get("/companys", listCompanys);

Companys.get("/company", companyData);

Companys.post("/authenticate", authenticateCompanyController);

Companys.post("/refresh-token", refreshTokenCompanyController);

export { Companys };
