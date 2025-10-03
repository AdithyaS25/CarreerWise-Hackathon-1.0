"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const router = useRouter();
  const [roadmap, setRoadmap] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isFallback, setIsFallback] = useState<boolean>(false); // New state

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const answers = JSON.parse(localStorage.getItem("quizAnswers") || "[]");
        const role = "Frontend Developer"; // Replace with dynamic logic if needed

        const res = await fetch("/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role, answers }),
        });

        const data = await res.json();
        if (data.roadmap) {
          setRoadmap(data.roadmap);

          // If returned roadmap equals static fallback, mark as fallback
          if (data.roadmap.includes("1. Learn HTML, CSS, and JavaScript")) {
            setIsFallback(true);
          }
        } else {
          setRoadmap("No roadmap found. Try taking the quiz again!");
        }
      } catch (err) {
        console.error(err);
        setRoadmap("Error fetching roadmap. Please try again later.");
        setIsFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-6">
      <h2 className="text-4xl font-bold mb-8 text-white text-center drop-shadow-lg">
        Your Career Roadmap
      </h2>

      <div className="w-full max-w-lg bg-white bg-opacity-80 rounded-xl p-6 shadow-lg backdrop-blur-md">
        {loading ? (
          <p className="text-center text-gray-700">Generating your roadmap...</p>
        ) : (
          <div>
            {isFallback && (
              <p className="text-sm text-red-600 mb-4 text-center font-semibold">
                ⚠ Using static fallback roadmap due to API limit or key issue
              </p>
            )}
            <p className="text-gray-800 whitespace-pre-line">{roadmap}</p>
            <button
              onClick={() => router.push("/quiz")}
              className="mt-6 w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
