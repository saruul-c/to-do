// import { Router } from "express";
// import { todoController } from "../controllers/todo.controller";
// import { authMiddleware } from "../middleware/auth.middleware";

// const { getAllTasks, createTask, updateTask, deleteTask, updateTaskTime } = todoController;

// const todoRouter = Router();

// // Route for the root URL ("/") to respond with a message
// todoRouter.get("/", (req, res) => {
//   res.send("Todo hesegt tavtai moril");
// });

// // Routes for tasks
// todoRouter.get("/getAllTasks", authMiddleware, getAllTasks);
// todoRouter.post("/createTask", authMiddleware, createTask);
// todoRouter.put("/:id", authMiddleware, updateTask);
// todoRouter.delete("/:id", authMiddleware, deleteTask);
// todoRouter.post("/updateTime/:id", authMiddleware, updateTaskTime);

// export default todoRouter;
