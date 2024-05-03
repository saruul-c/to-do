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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
class TaskService {
    constructor(db) {
        this.db = db;
    }
    getAllTasks(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.db.query('SELECT * FROM tasks WHERE todoId = ?', [todoId]);
            return rows;
        });
    }
    addTask(todoId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.db.execute('INSERT INTO tasks (todoId, content) VALUES (?, ?)', [todoId, content]);
            return result;
        });
    }
    updateTaskStatus(taskId, isCompleted) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.db.execute('UPDATE tasks SET isCompleted = ? WHERE id = ?', [isCompleted, taskId]);
            return result;
        });
    }
    deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.db.execute('DELETE FROM tasks WHERE id = ?', [taskId]);
            return result;
        });
    }
}
exports.TaskService = TaskService;
