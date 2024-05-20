import express from "express";
import bodyParser from "body-parser";

// Type definitions for Todo items
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Initialize Express.js server
const app = express();

// Use body-parser for JSON request body parsing
app.use(bodyParser.json());

// In-memory storage for todos (replace with a persistent database later)
let todos: Todo[] = [];

// GET endpoint to fetch all todo items
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST endpoint to create a new todo item
app.post("/todos", (req, res) => {
  const newTodo: Todo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: req.body.completed || false,
  };

  // Validate required fields (title)
  if (!newTodo.title) {
    return res.status(400).json({ error: "Title is required" });
  }

  todos.push(newTodo);
  res.status(201).json(newTodo); // Return the created todo
});

// PUT endpoint to update an existing todo item
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const updatedTodo: Todo = {
    ...todos[index], // Spread operator to copy existing properties
    title: req.body.title || todos[index].title,
    completed: req.body.completed || todos[index].completed,
  };

  // Validate required fields (title)
  if (!updatedTodo.title) {
    return res.status(400).json({ error: "Title is required" });
  }

  todos[index] = updatedTodo;
  res.json(updatedTodo);
});

app.post("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  
  
});
// DELETE endpoint to remove an existing todo item
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todos.splice(index, 1);
  res.status(204).send(); // No content to return on successful deletion
});

// Start the server
const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
