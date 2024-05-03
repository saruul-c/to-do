"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./user.router");
const app = (0, express_1.default)();
// Use the userRouter for handling user-related routes
app.use("/user", user_router_1.userRouter);
// Serve a simple web page
app.get("/", (req, res) => {
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
// Start the server
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
