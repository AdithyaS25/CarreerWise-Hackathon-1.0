"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  "How much do you enjoy writing code and building software?",
  "Do you enjoy designing user interfaces and improving user experiences?",
  "How interested are you in analyzing data and drawing insights?",
  "Do you enjoy managing and maintaining servers or backend systems?",
  "How fascinated are you by AI, machine learning, and emerging technologies?",
  "Are you keen on cybersecurity and protecting systems from threats?",
  "Do you enjoy planning, organizing, and guiding projects as a product manager?",
  "How interested are you in automating workflows and optimizing deployments?",
];


export default function QuizPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(0)
  );

  const handleChange = (idx: number, val: number) => {
    const newAnswers = [...answers];
    newAnswers[idx] = val;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    router.push("/results");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-6">
      <h2 className="text-4xl font-bold mb-8 text-white text-center drop-shadow-lg">
        Career Quiz
      </h2>

      <div className="w-full max-w-lg bg-white bg-opacity-70 rounded-xl p-6 shadow-lg backdrop-blur-md">
        {questions.map((q, idx) => (
          <div key={idx} className="mb-6">
            <p className="font-medium mb-2">{q}</p>
            <input
              type="range"
              min={0}
              max={10}
              value={answers[idx]}
              onChange={(e) => handleChange(idx, Number(e.target.value))}
              className="w-full accent-purple-600"
            />
            <div className="text-right text-sm text-gray-700 mt-1">
              {answers[idx]}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
        >
          See Results
        </button>
      </div>
    </div>
  );
}
