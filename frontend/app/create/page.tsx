import QuizForm from "@/components/QuizForm";

export default function CreatePage() {
    return (
        <div className="p-6 space-y-4 min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
                Create a New Quiz
            </h1>

            <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg">
                <QuizForm />
            </div>
        </div>
    );
}
