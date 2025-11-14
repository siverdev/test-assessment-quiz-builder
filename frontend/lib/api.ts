export async function getQuizzes() {
    const res = await fetch(`${process.env.API_URL}/quizzes`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch quizzes");
    const data = await res.json();
    return data.quizzes;
}

export async function getQuiz(id: string) {
    const res = await fetch(`${process.env.API_URL}/quizzes/${id}`, { cache: "no-store" });
    console.log(res)
    if (!res.ok) return null;
    const data = await res.json();
    return data.quiz;
}
