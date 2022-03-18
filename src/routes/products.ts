import express from "express";
import {
  createProduct,
  listProducts
} from "../controllers/products";
const Products = express.Router();

Products.post("/createProduct", createProduct);

Products.get("/products", listProducts);

export { Products };
