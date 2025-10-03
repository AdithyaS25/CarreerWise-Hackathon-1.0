"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateRoadmap } from "../../../utils/roadmap";

export default function ResultsPage() {
  const [results, setResults] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("quizAnswers");
    if (data) {
      const answers = JSON.parse(data);
      // Simple mapping logic for demo
      const top3 = [
        { role: "Frontend Developer", score: answers[0] + 5 },
        { role: "UI/UX Designer", score: answers[1] + 5 },
        { role: "Data Analyst", score: answers[2] + 5 },
      ];
      setResults({ top3 });
    } else router.push("/quiz");
  }, [router]);

  if (!results) return <p>Loading...</p>;

  const handleRoadmap = (role: any) => {
    const roadmap = generateRoadmap(role);
    alert(`Roadmap for ${roadmap.role}:\n\n${roadmap.steps.join("\n")}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h2 className="text-3xl font-bold mb-6">Top Career Matches</h2>
      {results.top3.map((r: any) => (
        <div key={r.role} className="bg-white p-4 rounded shadow mb-4 w-full max-w-md">
          <h3 className="text-xl font-semibold">{r.role}</h3>
          <div className="h-2 bg-gray-200 rounded mt-2">
            <div
              className="h-2 bg-blue-500 rounded"
              style={{ width: `${(r.score / 10) * 100}%` }}
            ></div>
          </div>
          <button
            onClick={() => handleRoadmap(r)}
            className="mt-2 bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
          >
            Generate Roadmap
          </button>
        </div>
      ))}
    </div>
  );
}
