"use server";

import { getQuizzes } from "@/lib/api";
import QuizCard from "../../components/QuizCard";
import { Quiz } from "@/types/quiz";
import { deleteQuizAction } from "@/lib/actions";
import Link from "next/link";

export default async function QuizzesPage() {
  const quizzes: Quiz[] = await getQuizzes();

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">All Quizzes</h1>

        <Link
          href="/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          + Create Quiz
        </Link>
      </div>

      <div className="space-y-3">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <QuizCard key={quiz.id} id={quiz.id} title={quiz.title} questionCount={quiz.questions.length}>
              <form action={deleteQuizAction}>
                <input type="hidden" name="id" value={quiz.id} />
                <button
                  type="submit"
                  className="text-red-500 hover:text-red-700 font-semibold hover:underline text-sm cursor-pointer transition"
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
