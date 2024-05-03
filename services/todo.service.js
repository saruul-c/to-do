import { Task } from "../models/task.model";
import connectionPool from "../controllers/dummy2";

export class TodoService {
  async createTask(title, priority, projectId) {
    const sql = 'INSERT INTO Task (task_name, priority, project_id) VALUES (?, ?, ?)';
    await connectionPool.execute(sql, [title, priority, projectId]);

    const newTask = {
      taskId: generateTaskId(),
      title,
      dueDate: new Date(),
      priority,
      status: "Pending",
    };

    return newTask;
  }

  async getAllTasks() {
    const sql = 'SELECT * FROM Task';
    const [rows] = await connectionPool.query(sql);
    const tasks = rows.map((row) => {
      return {
        taskId: row.id,
        title: row.task_name,
        dueDate: row.dueDate,
        priority: row.priority,
        status: row.completion_status ? "Completed" : "Pending",
      };
    });
    return tasks;
  }

  async updateTask(taskId, updates) {
    const sql = 'UPDATE Task SET ? WHERE id = ?';
    const [result] = await connectionPool.query(sql, [updates, taskId]);
    if (result.affectedRows === 0) {
      return null;
    } else {
      const updatedTask = { ...updates, taskId };
      return updatedTask;
    }
  }

  async deleteTask(taskId) {
    const sql = 'DELETE FROM Task WHERE id = ?';
    const [result] = await connectionPool.query(sql, [taskId]);
    return result.affectedRows > 0;
  }
}

function generateTaskId() {
  return Math.random().toString();
}
