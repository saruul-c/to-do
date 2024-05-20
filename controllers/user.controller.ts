//user.controller.ts

import { Request, Response } from "express";
//import connectionPool from "./dummy2";
import { UserService } from "../services/user.service";
import bcrypt from "bcrypt";
import crypto from "crypto";
import connectionPool from "./dummy2";
import { PoolConnection } from "mysql2/promise";
import { UserPayload, generateJWT, generateRefreshToken } from "../utils/jwt.utils";

export async function register(req: Request, res: Response) {
  const { username, password, email } = req.body;
  console.log("Register attempt:", { username, email });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userService = new UserService();
    await userService.createUser(username, hashedPassword, email);
    console.log("User registered:", username);
    res
      .status(201)
      .json({ status: "SUCCESS", message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req: Request, res: Response) {
  console.log("123");
  const { username, password } = req.body;
  console.log("Login request received with username:", username);

  const connection: PoolConnection = await connectionPool.getConnection();
  try {
    console.log("Database connection established.");
    const [results] = await connection.execute(
      "SELECT * FROM task.users WHERE username = ?",
      [username]
    );

    console.log("User fetch results:", results);

    const users = results as any[]; // Assume results is array-like
    if (users.length === 0) {
      console.log(`No user found for username: ${username}`);
      res.status(401).json({ status: "FAIL", message: "User does not exist" });
      return;
    }

    const user = users[0];

    const passwordIsValid = await bcrypt.compare(password, user.password);
    console.log("Password validation result:", passwordIsValid);

    if (!passwordIsValid) {
      res
        .status(401)
        .json({ status: "FAIL", message: "Password is incorrect" });
      return;
    }

    const accessToken = generateJWT(user);
    const refreshToken = generateRefreshToken(user); // Generate refresh token

    console.log("Generated JWT:", accessToken);
    console.log("Generated Refresh Token:", refreshToken); // Log refresh token

    res.cookie("todo-token", accessToken);
    console.log("JWT token set for user:", username);
    
    res.json({
      status: "SUCCESS",
      message: "User logged in successfully",
      user: { userId: user.id, username: user.username },
      accessToken,
      refreshToken, // Include refresh token in response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    connection.release();
  }
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;
  const connection = await connectionPool.getConnection();
  console.log("Password reset requested for email:", email);

  try {
    const resetToken = crypto.randomBytes(20).toString("hex");
    const expireTime = new Date(Date.now() + 3600000);
    // Assuming the table has columns for resetToken and resetTokenExpiry
    await connection.execute(
      "UPDATE user SET resetToken = ?, resetTokenExpiry = ? WHERE email = ?",
      [resetToken, expireTime, email]
    );
    res.json({
      message:
        "If a user with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function resetPassword(req: Request, res: Response) {
  const { resetToken, newPassword } = req.body;
  const connection = await connectionPool.getConnection();
  console.log("Resetting password with token:", resetToken);

  try {
    const [users] = (await connection.execute(
      "SELECT * FROM user WHERE resetToken = ? AND resetTokenExpiry > ?",
      [resetToken, new Date()]
    )) as any;
    if (users.length === 0) {
      res
        .status(400)
        .json({ message: "Invalid or expired password reset token." });
      return;
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await connection.execute(
      "UPDATE user SET password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE userId = ?",
      [hashedPassword, users[0].userId]
    );
    res.json({ message: "Password successfully reset." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  } finally {
    connection.release();
  }
}

export const UserController = {
  login,
  register,
  forgotPassword,
  resetPassword,
};
