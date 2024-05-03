import app from './app';  // Import the express app setup from app.ts

const port = process.env.PORT || 3100;  // Set the port

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Press CTRL+C to stop the server`);
});
