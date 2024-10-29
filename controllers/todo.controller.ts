// import { Request, Response } from "express";
// import { TodoService } from "../services/todo.service";


// const todoService = new TodoService();

// export const todoController = {
//   // Controller method to get all tasks
//   getAllTasks: async (req: Request, res: Response) => {
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     try {
//       const tasks = await todoService.getAllTasks();
//       res.status(200).json(tasks);
//     } catch (error) {
//       console.error("Error while getting tasks:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   },

//   // Controller method to create a new task
//   createTask: async (req: Request, res: Response) => {
//     try {
//       if (!req.user) {
//         return res.status(401).json({ message: "Unauthorized" });
//       }
//       const userId = req.user.id;
//       const taskData = {
//         ...req.body,
//         user_id: userId,
//       };
//       const newTask = await todoService.createTask(taskData);
//       res.status(201).json(newTask);
//     } catch (error) {
//       console.error("Error while creating task:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   },

//   // Controller method to update task time
//   updateTaskTime: async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { timeSpent } = req.body;

//     console.log("Request params:", req.params);
//     console.log("Request body:", req.body);
    
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     try {
//       const taskId = Number(id);
//       const timeToAdd = Number(timeSpent);

//       if (!id || !timeToAdd) {
//         return res.status(400).json({ message: "Invalid request: missing id or timeToAdd" });
//       }

//       const updatedTask = await todoService.updateTaskTime(taskId, timeToAdd);

//       if (!updatedTask) {
//         return res.status(404).json({ message: "Task not found" });
//       }

//       res.status(200).json(updatedTask);
//     } catch (error) {
//       console.error("Failed to update task time: ", error);
//       res.status(500).json({ message: "Failed to update task time" });
//     }
//   },

//   // Controller method to update an existing task
//   updateTask: async (req: Request, res: Response) => {
//     try {
//       const taskId = parseInt(req.params.id);
//       const updates = req.body;
//       const updatedTask = await todoService.updateTask(taskId, updates);
//       res.status(200).json(updatedTask);
//     } catch (error) {
//       console.error("Error while updating task:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   },

//   // Controller method to delete an existing task
//   deleteTask: async (req: Request, res: Response) => {
//     try {
//       const taskId = parseInt(req.params.id);
//       await todoService.deleteTask(taskId);
//       res.status(200).json({ message: "Task deleted successfully" });
//     } catch (error) {
//       console.error("Error while deleting task:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   },
// };
