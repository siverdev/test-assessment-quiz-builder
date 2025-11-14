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
