import express from "express";
import { router } from "./routers";

const app: express.Application = express();

app.use(router);
const PORT = 3001;

// Server setup
app.listen(PORT, () => {
  console.log(`server is running on
		http://localhost:${PORT}/`);
    console.log('temp')
});
