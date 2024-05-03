"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dummy2.ts
const promise_1 = __importDefault(require("mysql2/promise"));
// Replace placeholders with your actual credentials (store securely)
const DB_HOST = 'localhost';
const DB_USER = 'admin';
const DB_PASSWORD = 'host';
const DB_NAME = 'Pomodoro_Todo';
// Create a Connection Pool with type safety
const connectionPool = promise_1.default.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});
exports.default = connectionPool; // Use export default for default export
