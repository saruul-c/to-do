"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.generateJWT = void 0;
// handlers/jwt.handler.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
};
exports.generateJWT = generateJWT;
const verifyJWT = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    }
    catch (error) {
        return null;
    }
};
exports.verifyJWT = verifyJWT;
