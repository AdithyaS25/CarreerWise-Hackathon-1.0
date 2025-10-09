"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setProgress(Math.round(((current + 1) / questions.length) * 100));
  }, [current]);

  const handleChange = (val: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = val;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => current < questions.length - 1 && setCurrent(current + 1);
  const prevQuestion = () => current > 0 && setCurrent(current - 1);

  const handleSubmit = () => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    router.push("/results");
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -20 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 ease-in-out">
      <h2 className="text-4xl font-bold mb-6 text-white text-center drop-shadow-lg">
        Career Quiz
      </h2>

      {/* Progress Bar */}
      <div className="w-full max-w-lg bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 shadow-lg backdrop-blur-md mb-6 card">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden mb-2">
          <div
            className="h-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-700 dark:text-gray-300 font-medium">
          Question {current + 1} of {questions.length} ({progress}%)
        </p>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-lg relative h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 rounded-xl p-6 shadow-lg backdrop-blur-md text-center flex flex-col justify-between card"
          >
            <p className="font-medium text-lg">{questions[current]}</p>

            <input
              type="range"
              min={0}
              max={10}
              value={answers[current]}
              onChange={(e) => handleChange(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer mt-4"
            />

            <div className="text-right text-sm text-gray-700 dark:text-gray-300 mt-1">{answers[current]}</div>

            <div className="flex justify-between mt-4">
              <button
                onClick={prevQuestion}
                disabled={current === 0}
                className={`px-5 py-2 rounded-xl font-semibold btn ${
                  current === 0
                    ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                    : "bg-purple-500 text-white hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700"
                }`}
              >
                Previous
              </button>

              {current < questions.length - 1 ? (
                <button
                  onClick={nextQuestion}
                  disabled={answers[current] === 0}
                  className={`px-5 py-2 rounded-xl font-semibold btn ${
                    answers[current] === 0
                      ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={answers.includes(0)}
                  className={`px-5 py-2 rounded-xl font-semibold btn ${
                    answers.includes(0)
                      ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                  }`}
                >
                  See Results
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
