"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
// Import routers
const user_router_1 = __importDefault(require("./routers/user.router"));
// Initialize dotenv to use environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3100;
// Middleware setup
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// API route setups
app.use('/api/users', user_router_1.default);
// Root route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Todo Backend!",
        documentation_url: "http://api.example.com/docs"
    });
});
// Catch 404 and forward to error handler
app.use((req, res) => {
    res.status(404).send({
        message: "Resource not found",
        status: 404
    });
});
exports.default = app;
