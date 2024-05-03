import { Pool } from 'mysql2/promise';



export class TaskService {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }
  

  async getAllTasks(todoId: number) {
    const [rows] = await this.db.query('SELECT * FROM tasks WHERE todoId = ?', [todoId]);
    return rows;
  }

  async addTask(todoId: number, content: string) {
    const [result] = await this.db.execute(
      'INSERT INTO tasks (todoId, content) VALUES (?, ?)',
      [todoId, content]
    );
    return result;
  }

  async updateTaskStatus(taskId: number, isCompleted: boolean) {
    const [result] = await this.db.execute(
      'UPDATE tasks SET isCompleted = ? WHERE id = ?',
      [isCompleted, taskId]
    );
    return result;
  }

  async deleteTask(taskId: number) {
    const [result] = await this.db.execute(
      'DELETE FROM tasks WHERE id = ?',
      [taskId]
    );
    return result;
  }
}
