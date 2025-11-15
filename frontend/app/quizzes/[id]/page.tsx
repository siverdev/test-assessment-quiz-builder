import Question from "@/components/Question";
import { getQuiz } from "@/lib/api";
import { Quiz } from "@/types/quiz";
import Link from "next/link";
import { notFound } from "next/navigation";

type QuizPageProps = {
  params: { id: string };
};

export default async function QuizPage({ params }: QuizPageProps) {
  const { id } = await params;

  const quiz: Quiz = await getQuiz(id);

  if (!quiz) notFound();

  return (
    <div className="p-6 space-y-4">
      <div className="mb-4">
        <Link href="/quizzes" className="text-blue-600 hover:underline">
          ← Back to all quizzes
        </Link>
      </div>
      <h1 className="text-2xl font-semibold mb-6">{quiz.title} (Read-only)</h1>

      <div className="space-y-6">
        {quiz.questions.map((question) => (
          <Question key={question.id} text={question.text} type={question.type} options={question.options} />
        ))}
      </div>
    </div>
  );
}
