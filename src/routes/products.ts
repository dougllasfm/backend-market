import express from "express";
const Products = express.Router()
import { createProduct, listProducts } from "../controllers/products"

Products.post(
  '/createProduct',
  createProduct
)

Products.get(
  '/products',
  listProducts
)

export { Products }