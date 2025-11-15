import { PrismaClient, QuestionType } from "../src/generated/client/index.js";

const prisma = new PrismaClient();

async function seed(): Promise<void> {
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();

  const quiz1 = await prisma.quiz.create({
    data: {
      title: "General Knowledge Quiz",
      questions: {
        create: [
          {
            text: "The sky is blue.",
            type: QuestionType.BOOLEAN,
            options: {
              create: [{ text: "True" }, { text: "False" }],
            },
          },
          {
            text: "What is the capital of France?",
            type: QuestionType.INPUT,
          },
          {
            text: "Select all prime numbers:",
            type: QuestionType.CHECKBOX,
            options: {
              create: [{ text: "2" }, { text: "3" }, { text: "4" }],
            },
          },
        ],
      },
    },
    include: {
      questions: {
        include: {
          options: true,
        },
      },
    },
  });

  const quiz2 = await prisma.quiz.create({
    data: {
      title: "Another Quiz",
      questions: {
        create: [
          {
            text: "What is the capital of France?",
            type: QuestionType.BOOLEAN,
            options: {
              create: [{ text: "Paris" }, { text: "London" },  { text: "Berlin" }],
            },
          },
          {
            text: "Explain the theory of relativity",
            type: QuestionType.INPUT,
          },
          {
            text: "Select all prime numbers:",
            type: QuestionType.CHECKBOX,
            options: {
              create: [{ text: "2" }, { text: "3" }, { text: "4" }, { text: "5" }],
            },
          },
        ],
      },
    },
    include: {
      questions: {
        include: {
          options: true,
        },
      },
    },
  });

  console.log("Seeded quizzes:", [quiz1, quiz2]);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
