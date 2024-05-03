import { Pool } from 'mysql2/promise';

export class TaskListService {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  async getTaskLists() {
    const [rows] = await this.db.query('SELECT * FROM taskLists');
    return rows;
  }

  async addTaskList(name: string, description: string) {
    const [result] = await this.db.execute(
      'INSERT INTO taskLists (name, description) VALUES (?, ?)',
      [name, description]
    );
    return result;
  }

  async updateTaskList(id: number, name: string, description: string) {
    const [result] = await this.db.execute(
      'UPDATE taskLists SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
    return result;
  }

  async deleteTaskList(id: number) {
    const [result] = await this.db.execute(
      'DELETE FROM taskLists WHERE id = ?',
      [id]
    );
    return result;
  }
}
