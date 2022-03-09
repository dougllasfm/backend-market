import express from "express";
const Users = express.Router()
import { createUser, listUsers } from "../controllers/users"

Users.post(
  '/createUser',
  createUser
)

Users.get(
  '/users',
  listUsers
)

export { Users }