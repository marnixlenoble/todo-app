import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

import user from "./routes/user";
import task from "./routes/task";

dotenv.config();
const app: Express = express();
const port: string | undefined = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/user", user);
app.use("/task", task);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
