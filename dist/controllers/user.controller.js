"use strict";
//user.controller.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.resetPassword = exports.forgotPassword = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const user_model_1 = require("../models/user.model");
const dummy2_1 = __importDefault(require("./dummy2"));
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password, email } = req.body;
        try {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = new user_model_1.User(username, hashedPassword, email); // Assuming User constructor can handle undefined userId
            // await new UserService(newUser); 
            res.json({ status: "SUCCESS", message: "User registered successfully" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        const connection = yield dummy2_1.default.getConnection();
        try {
            const query = "SELECT * FROM user WHERE username = ?";
            const [results] = yield connection.execute(query, [username]); // Cast as any to simplify, ideally define a type
            const users = results; // Assume results is array-like
            if (users.length === 0) {
                res.status(401).json({ status: "FAIL", message: "User does not exist" });
                return;
            }
            const user = users[0];
            const passwordIsValid = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordIsValid) {
                res.status(401).json({ status: "FAIL", message: "Password is incorrect" });
                return;
            }
            res.json({ status: "SUCCESS", message: "User logged in successfully", user: { userId: user.userId, username: user.username } });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
        finally {
            connection.release();
        }
    });
}
exports.login = login;
function forgotPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        const connection = yield dummy2_1.default.getConnection();
        try {
            const resetToken = crypto_1.default.randomBytes(20).toString('hex');
            const expireTime = new Date(Date.now() + 3600000);
            // Assuming the table has columns for resetToken and resetTokenExpiry
            yield connection.execute("UPDATE user SET resetToken = ?, resetTokenExpiry = ? WHERE email = ?", [resetToken, expireTime, email]);
            res.json({ message: "If a user with that email exists, a password reset link has been sent." });
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
        finally {
            connection.release();
        }
    });
}
exports.forgotPassword = forgotPassword;
function resetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { resetToken, newPassword } = req.body;
        const connection = yield dummy2_1.default.getConnection();
        try {
            const [users] = yield connection.execute("SELECT * FROM user WHERE resetToken = ? AND resetTokenExpiry > ?", [resetToken, new Date()]);
            if (users.length === 0) {
                res.status(400).json({ message: "Invalid or expired password reset token." });
                return;
            }
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
            yield connection.execute("UPDATE user SET password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE userId = ?", [hashedPassword, users[0].userId]);
            res.json({ message: "Password successfully reset." });
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
        finally {
            connection.release();
        }
    });
}
exports.resetPassword = resetPassword;
exports.UserController = {
    login,
    register,
    forgotPassword,
    resetPassword
};
