import { PrismaClient, Products, ProductsOnOrders } from "@prisma/client";
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

type OrderProps = {
  orderId: number;
  price: string;
  quantity: number;
  products: string[];
};

const listOrders = async function (req: Request, res: Response) {
  try {
    const listOrders = await prisma.orders.findMany({
      where: {
        companyId: req.body.companyId
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    let arrayOrders: OrderProps[] = [];
    let flag = 0;

    listOrders.map((item) => {
      let productsArray: string[] = [];
      flag = 0;
      item.products.map((element) => {
        if (arrayOrders.length === 0) {
          productsArray.push(element.product.name);
          arrayOrders.push({
            orderId: element.orderId,
            price: element.product.price,
            quantity: 1,
            products: [...productsArray],
          });
        } else {
          arrayOrders.forEach((product) => {
            if (product.orderId === element.orderId) {
              productsArray.push(element.product.name);
              product.price = (
                parseInt(product.price) + parseInt(element.product.price)
              )
                .toFixed(2)
                .toString()
                .replaceAll(".", ",");
              product.quantity = product.quantity + 1;
              product.products = [...productsArray];
              return { product };
            } else if (flag == 0) {
              flag = 1;
              productsArray.push(element.product.name);
              arrayOrders.push({
                orderId: element.orderId,
                price: element.product.price,
                quantity: 1,
                products: [...productsArray],
              });
            }
          });
        }
      });
    });

    res.status(200).json(arrayOrders);
  } catch (error) {
    res.status(400).send({ error });
    console.log(error);
  }
};

export { createOrder, listOrdersUser, listOrders };
