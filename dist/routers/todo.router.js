"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const todo_controller_1 = require("../controllers/todo.controller");
const express = require('express');
exports.router = express.Router();
exports.router.get('/tasks', todo_controller_1.getTasks);
