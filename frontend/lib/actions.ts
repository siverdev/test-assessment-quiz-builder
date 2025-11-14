import { revalidatePath } from "next/cache";

export async function deleteQuizAction(formData: FormData) {
    "use server";

    const id = Number(formData.get("id"));
    if (!id) throw new Error("Invalid quiz ID");

    const res = await fetch(`${process.env.API_URL}/quizzes/${id}`, {
        method: "DELETE",
        cache: "no-store",
    });

    if (!res.ok) {
        console.error("Failed to delete quiz:", await res.text());
    }

    revalidatePath("/quizzes");
}