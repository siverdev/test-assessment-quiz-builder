"use client";

import { Option } from "@/types/quiz";

type QuestionProps = {
  text: string;
  type: string;
  options?: Option[];
};

export default function Question({text, type, options}: QuestionProps) {
    return (
        <div className="p-4 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition">
            <p className="font-semibold mb-2">{text}</p>

            {(() => {
                switch (type) {
                case "BOOLEAN":
                    if (!options || options.length === 0) {
                        return <p className="text-gray-400 text-sm">No options defined</p>;
                    }

                    return (
                        <div className="flex gap-4">
                            {options?.map((opt) => (
                                <label key={opt.id}>
                                    <input type="radio" disabled /> {opt.text}
                                </label>
                            ))}
                        </div>
                    );

                case "INPUT":
                    return (
                        <input
                            type="text"
                            disabled
                            placeholder="Your answer"
                            className="border p-1 rounded"
                        />
                    );

                case "CHECKBOX":
                    if (!options || options.length === 0) {
                        return <p className="text-gray-400 text-sm">No options defined</p>;
                    }
                    
                    return (
                        <div className="flex flex-col gap-2">
                            {options?.map((opt) => (
                                <label key={opt.id}>
                                    <input type="checkbox" disabled /> {opt.text}
                                </label>
                            ))}
                        </div>
                    );

                default:
                    return <p className="text-gray-500">Unknown question type</p>;
                }
            })()}
        </div>
    );
}
