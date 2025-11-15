import type { Request, Response } from "express";
import { PrismaClient } from "../generated/client/index.js";
import type { CreateQuiz } from "../types/quiz.ts";

const prisma = new PrismaClient();

export const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await prisma.quiz.findMany({ include: { questions: true } });
    return res.status(200).json({ error: false, message: "Quizzes successfully fetched", quizzes });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const getQuiz = async (req: Request, res: Response) => {
  try {
    const quizId = Number(req.params.id);
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: { include: { options: true } } },
    });

    if (!quiz) {
      return res.status(404).json({ error: true, message: "Quiz not found" });
    }

    return res.status(200).json({ error: false, message: "Quiz successfully fetched", quiz });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const quizId = Number(req.params.id);

    await prisma.quiz.delete({
      where: { id: quizId },
    });

    return res.status(200).json({ error: false, message: "Quizzes successfully deleted" });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: true, message: error.message });
  }
};

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const data: CreateQuiz = req.body;
    if (!data.title || !Array.isArray(data.questions) || data.questions.length === 0) {
      return res.status(400).json({ message: "Quiz title and questions are required" });
    }

    const quiz = await prisma.quiz.create({
      data: {
        title: data.title,
        questions: {
          create: data.questions.map((q) => ({
            text: q.text,
            type: q.type,
            ...(q.options && q.options.length > 0
              ? {
                  options: {
                    create: q.options.map((opt) => ({ text: opt.text })),
                  },
                }
              : {}),
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return res.status(200).json({ error: false, message: "Quiz successfully created", quiz });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: true, message: error.message });
  }
};
