import express from "express";
import cors from "cors"

import { Users } from "./routes/users";
import { Companys } from "./routes/companys"
import { Products } from "./routes/products";

const app = express();

app.use(cors())
app.use(express.json());
app.use(Users);
app.use(Companys);
app.use(Products);

app.listen(3060);
