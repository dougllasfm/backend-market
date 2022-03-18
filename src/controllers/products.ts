import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

const createProduct = async function (req: Request, res: Response) {
  try {
    const product = await prisma.products.create({
      data: {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        weight: req.body.weight,
        category: req.body.category,
        description: req.body.description,
        companyId: req.body.companyId
      },
    });

    res.status(200).json(product);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error });
  }
};

const listProducts = async function(req: Request, res: Response) {
  try {
    const result = await prisma.products.findMany()

    res.status(200).json(result)
  } catch (error) {
    res.status(400).send({ error });
  }
}

const listProductsCategory = async function(req: Request, res: Response) {
  try {
    const result = await prisma.products.findMany({
      where: {
        category: req.body.category
      }
    })

    res.status(200).json(result)
  } catch (error) {
    res.status(400).send({ error });
  }
}

export { createProduct, listProducts, listProductsCategory };
