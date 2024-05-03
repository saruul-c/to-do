"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskList = void 0;
class TaskList {
    constructor(listId, title, tasks) {
        this.listId = listId;
        this.title = title;
        this.tasks = tasks;
    }
    addTask(task) {
        this.tasks.push(task);
    }
    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.taskId !== taskId);
    }
    getTasks() {
        return this.tasks;
    }
}
exports.TaskList = TaskList;
