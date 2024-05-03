//services/user.service.ts
import { User } from "../models/user.model";
import connectionPool from "../controllers/dummy2";

export class UserService {
  async createUser(username: string, password: string): Promise<User> {
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    await connectionPool.execute(sql, [username, password]);

    const newUser: User = {
      userId: generateUserId(),
      username,
      password, // Note: In a real application, you would hash the password here
      email: "" // Assuming email is optional
      ,
      login: function (): void {
        throw new Error("Function not implemented.");
      },
      logout: function (): void {
        throw new Error("Function not implemented.");
      }
    };

    return newUser;
  }
}

function generateUserId(): string {
  // Generate a unique user ID using a library like uuid
  // For simplicity, we'll just return a random string here
  return Math.random().toString();
}
