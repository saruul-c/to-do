"use strict";
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
exports.UserService = void 0;
const dummy2_1 = __importDefault(require("../controllers/dummy2"));
class UserService {
    createUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
            yield dummy2_1.default.execute(sql, [username, password]);
            const newUser = {
                userId: generateUserId(),
                username,
                password, // Note: In a real application, you would hash the password here
                email: "" // Assuming email is optional
                ,
                login: function () {
                    throw new Error("Function not implemented.");
                },
                logout: function () {
                    throw new Error("Function not implemented.");
                }
            };
            return newUser;
        });
    }
}
exports.UserService = UserService;
function generateUserId() {
    // Generate a unique user ID using a library like uuid
    // For simplicity, we'll just return a random string here
    return Math.random().toString();
}
