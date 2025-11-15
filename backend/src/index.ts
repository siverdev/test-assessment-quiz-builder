//Imports
import express, { type Express } from "express";
import dotenv from "dotenv";
import quizRouter from "./routes/quizzes.ts";

//Config
dotenv.config();
const app: Express = express();

//Middleware
app.use(express.json());

//Routes
app.use("/quizzes", quizRouter);

//Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
