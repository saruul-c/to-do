import express, { Request, Response } from "express";
import { userRouter } from "./user.router";

const app = express();

// Use the userRouter for handling user-related routes
app.use("/user", userRouter);

// Serve a simple web page
app.get("/", (req: Request, res: Response) => {
  res.send(`
    <html>
      <head>
        <title>Todo App</title>
      </head>
      <body>
        <h1>Welcome to the Todo App</h1>
        <p>Use the following endpoints to test the API:</p>
        <ul>
          <li>/user/login - User login</li>
          <li>/user/register - User registration</li>
          <li>/user/forgotPassword - Forgot password</li>
          <li>/user/resetPassword - Reset password</li>
        </ul>
      </body>
    </html>
  `);
});
