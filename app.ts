import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
const cors = require("cors");

// Import routers
import userRouter from "./routers/user.router";


// Initialize dotenv to use environment variables
dotenv.config();

const app = express();

const port = process.env.PORT || 3100;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: process.env.APP_URL, credentials: true }));

// API route setups
app.use("/api/users", userRouter);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the Todo Backend!",
    documentation_url: "http://api.example.com/docs",
  });
});

// Catch 404 and forward to error handler
app.use((req: Request, res: Response) => {
  res.status(404).send({
    message: "Resource not found",
    status: 404,
  });
});

export default app;
