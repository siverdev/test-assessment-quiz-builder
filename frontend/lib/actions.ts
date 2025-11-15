"use server";

import { QuizFormData } from "@/types/quiz";
import { revalidatePath } from "next/cache";
import { createQuiz, deleteQuiz } from "./api";


export async function deleteQuizAction(formData: FormData) {
    const id = Number(formData.get("id"));
    if (!id) throw new Error("Invalid quiz ID");

    await deleteQuiz(id);
    revalidatePath("/quizzes");
}

export async function createQuizAction(quizData: QuizFormData) {
    const quiz = await createQuiz(quizData);
    return quiz;
}
