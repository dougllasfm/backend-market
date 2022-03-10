import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
const prisma = new PrismaClient();

const createOrder = async function (req: Request, res: Response) {
  try {
    const order = await prisma.orders.create({
      data: {
        companyId: req.body.company,
        userId: req.body.user,
        products: {
          create: req.body.product.map((element: number) => {
            return {
              product: {
                connect: {
                  id: element,
                },
              },
            };
          }),
        },
      },
    });

    res.status(200).json(order);
  } catch (error) {
    res.status(400).send({ error });
    console.log(error);
  }
};

const listOrdersUser = async function (req: Request, res: Response) {
  try {
    const listOrders = await prisma.orders.findMany({
      where: { userId: req.body.userId },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    res.status(200).json(listOrders);
  } catch (error) {
    res.status(400).send({ error });
    console.log(error);
  }
};

const listOrders = async function (req: Request, res: Response) {
  try {
    const listOrders = await prisma.orders.findMany({
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    res.status(200).json(listOrders);
  } catch (error) {
    res.status(400).send({ error });
    console.log(error);
  }
};

export { createOrder, listOrdersUser, listOrders };
