import connectionPool from "../controllers/dummy2";
import { Task } from "../models/task.model";
import { OkPacket, RowDataPacket, ResultSetHeader } from "mysql2";

export class TodoService {
  // Method to find a task by its primary key
  public async findTaskByPk(taskId: number): Promise<Task | null> {
    const sql = 'SELECT * FROM task WHERE id = ?';
    const [rows] = await connectionPool.query<RowDataPacket[]>(sql, [taskId]);

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];
    return new Task(row.id, row.task_name, row.completion_status, row.time_spent, row.created_at);
  }

  public async updateTaskTime(taskId: number, timeToAdd: number): Promise<Task | null> {
    const task = await this.findTaskByPk(taskId);

    if (!task) {
      return null;
    }

    task.time_spent += timeToAdd;
    const sql = 'UPDATE task SET time_spent = ? WHERE id = ?';
    await connectionPool.query(sql, [task.time_spent, taskId]);

    return task;
  }

  async createTask(task: Task): Promise<Task | null> {
    try {
      console.log("Creating task:", task);

      const { task_name, completion_status, time_spent, created_at } = task;
      const taskName = task_name.substring(0, 255); // Truncate task_name if it exceeds 255 characters

      // Format created_at value
      const formattedCreatedAt = created_at ? new Date(created_at).toISOString().slice(0, 19).replace('T', ' ') : new Date().toISOString().slice(0, 19).replace('T', ' ');

      const sql = 'INSERT INTO task (task_name, completion_status, time_spent, created_at) VALUES (?, ?, ?, ?)';
      console.log("SQL:", sql);

      const [result] = await connectionPool.execute<ResultSetHeader>(sql, [taskName, completion_status, time_spent, formattedCreatedAt]);
      console.log("Execution result:", result);

      if (result.affectedRows === 0) {
        console.log("Task not created, affected rows: 0");
        return null;
      } else {
        console.log("Task created successfully");
        return task;
      }
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  async getAllTasks(): Promise<Task[]> {
    try {
      const sql = 'SELECT * FROM task';
      const [rows] = await connectionPool.query<RowDataPacket[]>(sql);
      const tasks: Task[] = rows.map((row) => {
        return new Task(
          row.id,
          row.task_name,
          row.completion_status,
          row.time_spent,
          row.created_at
        );
      });
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  async updateTask(taskId: number, updates: Partial<Task>): Promise<Task | null> {
    try {
      const sql = 'UPDATE task SET ? WHERE id = ?';
      const [result] = await connectionPool.query<ResultSetHeader>(sql, [updates, taskId]);

      if (result.affectedRows === 0) {
        return null;
      } else {
        const updatedTask = { ...updates, id: taskId } as Task;
        return updatedTask;
      }
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  async getTaskById(taskId: number): Promise<Task | null> {
    try {
      const sql = 'SELECT * FROM task WHERE id = ?';
      const [rows] = await connectionPool.query<RowDataPacket[]>(sql, [taskId]);
      if (rows.length === 0) {
        return null;
      }
      const row = rows[0];
      return new Task(row.id, row.task_name, row.completion_status, row.time_spent, row.created_at);
    } catch (error) {
      console.error('Error fetching task by id:', error);
      throw error;
    }
  }

  async deleteTask(taskId: number): Promise<boolean> {
    try {
      const sql = 'DELETE FROM task WHERE id = ?';
      const [result] = await connectionPool.query<ResultSetHeader>(sql, [taskId]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }
}
