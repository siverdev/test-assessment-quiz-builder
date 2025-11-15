"use client";

import Link from "next/link";

type QuizCardProps = {
  id: number;
  title: string;
  questionCount: number;
  children?: React.ReactNode;
};

export default function QuizCard({ id, title, questionCount, children }: QuizCardProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition">
      <Link href={`/quizzes/${id}`} className="text-blue-600 underline hover:text-blue-800">
        {title} — {questionCount} questions
      </Link>
      {children}
    </div>
  );
}
