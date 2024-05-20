import connectionPool from "../controllers/dummy2";
import { FieldPacket } from 'mysql2/promise';
import bcrypt from 'bcrypt';

export class UserService {
  static findUserByEmail(email: any) {
    throw new Error("Method not implemented.");
  }
  async createUser(username: string, password: string, email: string): Promise<void> {
    const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    await connectionPool.execute(sql, [username, password, email]);
  }

  async findUserByUsername(username: string): Promise<any> {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const [rows]: [any[], FieldPacket[]] = await connectionPool.execute(sql, [username]) as [any[], FieldPacket[]];
    return rows[0]; // Assumed that rows is array of any    
  }

  async loginUser(username: string, password: string): Promise<boolean> {
    const user = await this.findUserByUsername(username);
    if (!user) return false; // User not found

    // Compare hashed password with the provided password
    return bcrypt.compare(password, user.password);
  }

  async forgotPassword(email: string): Promise<void> {
    // Implement logic to generate and send a password reset email
  }

  async resetPassword(email: string, newPassword: string, resetToken: string): Promise<void> {
    // Implement logic to reset user's password
  }
}
