import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { hash } from "bcryptjs"
const prisma = new PrismaClient();

const createUser = async function (req: Request, res: Response) {
  try {
    const passwordHash = await hash(req.body.password, 8)
    
    const user = await prisma.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
        telephone: req.body.telephone,
        address: req.body.address
      },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).send({ error: "erro" });
  }
};

const listUsers = async function(req: Request, res: Response) {
  try {
    const result = await prisma.users.findMany()

    res.status(200).json(result)
  } catch (error) {
    res.status(400).send({ error: "erro" });
  }
}

export { createUser, listUsers };
