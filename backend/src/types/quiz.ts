import { QuestionType } from "../generated/client/index.js";

export interface CreateOption {
  text: string;
}

export interface CreateQuestion {
  text: string;
  type: QuestionType;
  options?: CreateOption[];
}

export interface CreateQuiz {
  title: string;
  questions: CreateQuestion[];
}
