import { PrismaClient, QuestionType } from "../src/generated/client/index.js";

const prisma = new PrismaClient();

async function seed(): Promise<void> {
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();

  const result = await prisma.quiz.create({
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

  console.log("Seeded quiz:", result.id);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
