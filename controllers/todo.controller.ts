import { Request, Response } from "express";
import { Task } from "../models/task.model";

// Sample in-memory storage for tasks (replace with database logic)
let tasks: Task[] = [];

// GET /tasks - Get all tasks
export const getAllTasks = (req: Request, res: Response) => {
  try {
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /tasks - Create a new task
export const createTask = (req: Request, res: Response) => {
  try {
    const { id, task_name, priority, completion_status, project_id, time_spent, created_at } = req.body;
    const newTask = new Task(id, task_name, priority, completion_status, project_id, time_spent, created_at);
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /tasks/:id - Update an existing task
export const updateTask = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { task_name, priority, completion_status, project_id, time_spent, created_at } = req.body;
    const task = tasks.find(task => task.id === id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    task.updateCompletionStatus(completion_status);
    task.renameTask(task_name);
    task.editTaskDetails(task_name, priority, project_id);
    if (time_spent) {
      task.addTimeSpent(time_spent);
    }
    if (created_at) {
      task.updateCreatedAt(created_at);
    }
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /tasks/:id - Delete an existing task
export const deleteTask = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) {
      res.status(404).json({ message: "Daalgavar oldsongui" });
      return;
    }
    tasks.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Uuchlaarai, servert aldaa garlaa" });
  }
};

export const todoController = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};