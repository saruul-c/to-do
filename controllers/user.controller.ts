//user.controller.ts

import { Request, Response } from "express";
//import connectionPool from "./dummy2";
import { UserService } from "../services/user.service";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { User } from "../models/user.model";
import connectionPool from "./dummy2";
import { generateJWT } from "../handlers/jwt.handler";

export async function register(req: Request, res: Response) {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userService = new UserService(); // Create an instance of UserService
    const User = await userService.createUser(username, hashedPassword); // Create a new user
    res.json({ status: "SUCCESS", message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function login(req: Request, res: Response) {
  
  const { username, password } = req.body;
  const connection = await connectionPool.getConnection();
  try {
    const query = "SELECT * FROM user WHERE username = ?";
    const [results] = (await connection.execute(query, [username])) as any; // Cast as any to simplify, ideally define a type

    const users = results as any[]; // Assume results is array-like
    if (users.length === 0) {
      res.status(401).json({ status: "FAIL", message: "User does not exist" });
      return;
    }

    const user = users[0];
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      res
        .status(401)
        .json({ status: "FAIL", message: "Password is incorrect" });
      return;
    }

    const token = generateJWT({ ...results });
    console.log(token)
    res.cookie("todo-token", token);
    console.log('worked')

    res.json({
      status: "SUCCESS",
      message: "User logged in successfully",
      user: { userId: user.userId, username: user.username },
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
    res.status(500).json({ message: "Internal server error" });
  } finally {
    connection.release();
  }
}

export async function resetPassword(req: Request, res: Response) {
  const { resetToken, newPassword } = req.body;
  const connection = await connectionPool.getConnection();
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
