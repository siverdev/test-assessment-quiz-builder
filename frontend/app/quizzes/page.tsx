"use server";

import { getQuizzes } from "@/lib/api";
import QuizCard from "../../components/QuizCard";
import { Quiz } from "@/types/quiz";
import { deleteQuizAction } from "@/lib/actions";


export default async function QuizzesPage() {
    const quizzes:Quiz[] = await getQuizzes();

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-3xl font-semibold mb-6">All Quizzes</h1>

            <div className="space-y-3">
                {quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                        <QuizCard
                            key={quiz.id}
                            id={quiz.id}
                            title={quiz.title}
                            questionCount={quiz.questions.length}>
                            <form action={deleteQuizAction}>
                                <input type="hidden" name="id" value={quiz.id} />
                                <button
                                    type="submit"
                                    className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 cursor-pointer"
                                >
                                Delete
                                </button>
                            </form>
                      
                        </QuizCard>
                    ))
                ) : (
                    <p className="text-gray-600 italic">No quizzes found.</p>
                )}
            </div>
        </div>
    );
}
