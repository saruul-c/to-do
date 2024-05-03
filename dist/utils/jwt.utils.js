"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
// utils/jwt.utils.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET || 'default_secret_key';
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, secretKey, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (error) {
        console.log('Error verifying token:', error);
        throw new Error('Invalid token');
    }
};
exports.verifyToken = verifyToken;
