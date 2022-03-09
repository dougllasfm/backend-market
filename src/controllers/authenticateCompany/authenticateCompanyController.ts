import { Request, Response } from "express";
import { authenticateCompany } from "./authenticateCompanyCase";

const authenticateCompanyController = async function (req: Request, res: Response) {
  try {
    const { email, password } = req.body

    const token = await authenticateCompany({email, password})
    res.status(200).json(token)
  } catch (error) {
    console.log(error);
  }
};

export { authenticateCompanyController }