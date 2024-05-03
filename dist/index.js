"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app")); // Import the express app setup from app.ts
const port = process.env.PORT || 3100; // Set the port
// Start the server
app_1.default.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Press CTRL+C to stop the server`);
});
