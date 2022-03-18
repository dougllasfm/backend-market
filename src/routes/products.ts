import express from "express";
const Products = express.Router();
import {
  createProduct,
  listProducts,
  listProductsCategory,
} from "../controllers/products";

Products.post("/createProduct", createProduct);

Products.get("/products", listProducts);

Products.get("/productsCategory", listProductsCategory);

export { Products };
