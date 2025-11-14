import { Router } from "express";
import { createQuiz, deleteQuiz, getAllQuizzes, getQuiz, temporary } from "../controllers/quizzes.ts";

const router = Router();

//GET
router.get("/", getAllQuizzes);
router.get("/:id", getQuiz);

//POST
router.post("/", createQuiz);

//DELETE
router.delete("/:id", deleteQuiz);

export default router;
