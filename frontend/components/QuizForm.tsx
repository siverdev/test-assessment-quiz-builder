"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createQuizAction } from "@/lib/actions";
import { quizSchema } from "@/lib/schemas";
import { OptionFieldsProps, QuizFormData } from "@/types/quiz";
import Link from "next/link";

export default function QuizForm() {
  const router = useRouter();

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      questions: [{ text: "", type: "INPUT", options: [] }],
    },
  });

  const {
    fields: questions,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "questions",
  });
  const onSubmit = async (data: QuizFormData) => {
    const quiz = await createQuizAction(data);
    router.push(`/quizzes/${quiz.id}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-8  space-y-8 ">
      {/* Quiz Title */}
      <div className="flex flex-col">
        <label className="font-semibold text-gray-800 mb-2 text-lg">Quiz Title</label>
        <input
          {...register("title")}
          className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none shadow-sm transition"
          placeholder="Enter quiz title"
        />
        {errors.title && <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>}
      </div>

      {/* Questions */}
      {questions.map((question, questionIndex) => {
        const questionType = watch(`questions.${questionIndex}.type`);

        return (
          <div key={question.id} className="border border-gray-200 rounded-xl p-6 space-y-4 bg-gray-50 shadow-sm">
            {/* Question Text */}
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Question Text</label>
              <input
                {...register(`questions.${questionIndex}.text` as const)}
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                placeholder="Enter question text"
              />
              {errors.questions?.[questionIndex]?.text && (
                <p className="text-red-500 mt-1 text-sm">{errors.questions[questionIndex]?.text?.message}</p>
              )}
            </div>

            {/* Question Type */}
            <div className="flex flex-col">
              <label className="font-medium text-gray-700">Type</label>
              <select
                {...register(`questions.${questionIndex}.type` as const)}
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              >
                <option value="INPUT">Input</option>
                <option value="BOOLEAN">Boolean</option>
                <option value="CHECKBOX">Checkbox</option>
              </select>
            </div>

            {/* Options */}
            {(questionType === "BOOLEAN" || questionType === "CHECKBOX") && (
              <OptionFields nestIndex={questionIndex} {...{ control, register, errors }} />
            )}

            {/* Remove Question Button */}
            <button
              type="button"
              onClick={() => questions.length > 1 && remove(questionIndex)}
              className={`px-4 py-2 rounded-lg font-medium transition border 
                                ${
                                  questions.length === 1
                                    ? "border-gray-300 text-gray-400 cursor-not-allowed bg-transparent"
                                    : "border-red-400 text-red-500 hover:bg-red-50"
                                }`}
              disabled={questions.length === 1}
            >
              Remove Question
            </button>
          </div>
        );
      })}

      {/* Add Question Button */}
      <button
        type="button"
        onClick={() => append({ text: "", type: "INPUT", options: [] })}
        className="px-5 py-2 rounded-lg font-medium border border-indigo-400 text-indigo-500 hover:bg-indigo-50 transition"
      >
        Add Question
      </button>

      <div className="mt-6 space-y-3">
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 cursor-pointer text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-green-600 shadow-lg transition"
        >
          Submit Quiz
        </button>

        {/* Go back Button */}
        <Link
          href="/quizzes"
          className="block text-center w-full border border-gray-400 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
        >
          Back to all quizzes
        </Link>
      </div>
    </form>
  );
}

function OptionFields({ nestIndex, control, register, errors }: OptionFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${nestIndex}.options`,
  });

  const questionErrors = errors.questions?.[nestIndex]?.options;

  return (
    <div className="pl-4 space-y-3">
      <h4 className="font-medium text-gray-700">Options</h4>

      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <input
              {...register(`questions.${nestIndex}.options.${index}.text` as const)}
              className="border border-gray-300 p-2 rounded-lg flex-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              placeholder={`Option ${index + 1}`}
            />

            <button
              type="button"
              onClick={() => remove(index)}
              className="px-3 py-1 rounded-lg font-medium transition border border-red-400 text-red-500 hover:bg-red-50"
            >
              Remove
            </button>
          </div>

          {/* Error */}
          {questionErrors?.[index]?.text && (
            <p className="text-red-500 text-sm">{questionErrors[index].text?.message}</p>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ text: "" })}
        className="text-indigo-500 font-medium hover:underline mt-1"
      >
        Add Option
      </button>
    </div>
  );
}
