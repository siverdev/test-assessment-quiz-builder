import { z } from "zod";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { quizSchema } from "@/lib/schemas";

export type Option = {
  id: number;
  text: string;
};

export type Question = {
  id: number;
  text: string;
  type: "BOOLEAN" | "INPUT" | "CHECKBOX";
  options?: Option[];
};

export type Quiz = {
  id: number;
  title: string;
  questions: Question[];
};

export type QuizFormData = z.infer<typeof quizSchema>;

export type OptionFieldsProps = {
  nestIndex: number;
  control: Control<QuizFormData>;
  register: UseFormRegister<QuizFormData>;
  errors: FieldErrors<QuizFormData>;
};
