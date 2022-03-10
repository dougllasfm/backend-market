import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const createCompany = async function (req: Request, res: Response) {
  try {
    const passwordHash = await hash(req.body.password, 8);

    const company = await prisma.companys.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,
        address: req.body.address,
        taxMinimum: req.body.taxMinimum,
        buyMinimum: req.body.buyMinimum,
        hourOpen: req.body.hourOpen,
        hourClosed: req.body.hourClosed,
      },
    });

    res.status(200).json(company);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error });
  }
};

const listCompanys = async function (req: Request, res: Response) {
  try {
    const result = await prisma.companys.findMany();

    res.status(200).json(result);
  } catch (error) {
    res.status(400).send({ error: "erro" });
  }
};

export { createCompany, listCompanys };
