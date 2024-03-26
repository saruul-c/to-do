import { Router } from "express";
import { UserController } from "../controllers";
const { login, logout } = UserController;

export const userRouter = Router();
userRouter.get("/login", login);
userRouter.post("/logout", logout);
