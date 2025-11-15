// api/index.ts
import { QuizFormData } from "@/types/quiz";

export async function getQuizzes() {
    const res = await fetch(`${process.env.API_URL}/quizzes`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch quizzes");
    const data = await res.json();
    return data.quizzes;
}

export async function getQuiz(id: string) {
    const res = await fetch(`${process.env.API_URL}/quizzes/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.quiz;
}

export async function createQuiz(quizData: QuizFormData) {
    const res = await fetch(`${process.env.API_URL}/quizzes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    const data = await res.json();
    return data.quiz;
}

export async function deleteQuiz(id: number) {
    const res = await fetch(`${process.env.API_URL}/quizzes/${id}`, {
        method: "DELETE",
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return true;
}
