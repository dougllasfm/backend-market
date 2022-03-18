import express from "express";
const Users = express.Router();
import { authenticateUserController } from "src/controllers/userAuthenticate/userAuthenticateController";
import { createUser, listUsers } from "../controllers/users";

Users.post("/createUser", createUser);

Users.get("/users", listUsers);

Users.post("/authenticateUser", authenticateUserController);

export { Users };
