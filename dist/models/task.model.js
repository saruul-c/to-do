"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor(taskId, title, description, dueDate, priority, status) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }
    changeStatus(newStatus) {
        this.status = newStatus;
    }
    editTaskDetails(newTitle, newDescription) {
        this.title = newTitle;
        this.description = newDescription;
    }
    deleteTask() {
        // Logic for deleting the task
    }
}
exports.Task = Task;
