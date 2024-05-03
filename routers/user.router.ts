import express, { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const { login, register, forgotPassword, resetPassword } = UserController;

export const userRouter = Router();

userRouter.get("/", (req, res) => {
  console.log("test");
  res.send("Hello World");
});

userRouter.post("/login", login);
userRouter.get("/forgotPassword", forgotPassword);
userRouter.get("/resetPassword", resetPassword);
// Route with authentication middleware
userRouter.post("/register", authMiddleware, register);

export default userRouter;
