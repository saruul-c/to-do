// routes/todoRoutes.js
import express, { Router } from "express";
import { todoController } from "../controllers/todo.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const { getAllTasks, createTask, updateTask, deleteTask } = todoController;

export const todoRouter = Router();

// Route with authentication middleware
todoRouter.use(authMiddleware);

// Routes for tasks
todoRouter.get("/", getAllTasks);
todoRouter.post("/", createTask);
todoRouter.put("/:id", updateTask);
todoRouter.delete("/:id", deleteTask);

export default todoRouter;