import { Request, Response } from "express";
import { userAuthenticateCase } from "./userAuthenticateCase";

const authenticateUserController = async function (req: Request, res: Response) {
  try {
    const { email, password } = req.body

    const token = await userAuthenticateCase({email, password})
    
    res.status(200).json(token)
  } catch (error) {
    console.log(error);
  }
};

export { authenticateUserController }