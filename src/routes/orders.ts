import express from "express";
const Orders = express.Router();
import { createOrder, listOrdersUser, listOrders } from "../controllers/orders";

Orders.post("/createOrder", createOrder);

Orders.get("/orderUser", listOrdersUser);

Orders.get("/orders", listOrders);

export { Orders };
