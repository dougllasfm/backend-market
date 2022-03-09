import { Request, Response } from "express";
import { refreshTokenCompanyCase } from "./refreshTokenCompanyCase";

const refreshTokenCompanyController = async function (
  req: Request,
  res: Response
) {
  try {
    const { refresh_token } = req.body;

    const token = await refreshTokenCompanyCase(refresh_token);

    res.status(200).json(token);
  } catch (error) {
    console.log(error);
  }
};

export { refreshTokenCompanyController }