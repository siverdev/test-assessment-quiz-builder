import { z } from "zod";

export const optionSchema = z.object({
  text: z.string().min(1, "Option text is required"),
});

export const questionSchema = z.object({
  text: z.string().min(1, "Question text is required"),
  type: z.enum(["BOOLEAN", "INPUT", "CHECKBOX"]),
  options: z.array(optionSchema).default([]),
});

export const quizSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  questions: z.array(questionSchema).min(1, "At least one question is required"),
});
