"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type StaticRole = {
  role: string;
  description: string;
  skills: string[];
  resources: string[];
};

export default function ResultsPage() {
  const router = useRouter();
  const [roadmap, setRoadmap] = useState<string | StaticRole[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFallback, setIsFallback] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [topRoles, setTopRoles] = useState<string[]>([]);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const answers = JSON.parse(localStorage.getItem("quizAnswers") || "[]");

        const res = await fetch("/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers }),
        });

        const data = await res.json();

        if (data.roadmap) {
          setRoadmap(data.roadmap);
          setIsFallback(data.llmFailed);
          setTopRoles(data.topRoles || []);

          if (data.topRoles?.length === 1) {
            setSelectedRole(data.topRoles[0]);
          }
        } else {
          setRoadmap([{ role: "N/A", description: "No roadmap found", skills: [], resources: [] }]);
          setIsFallback(true);
        }
      } catch (err) {
        console.error(err);
        setRoadmap([{ role: "N/A", description: "Error fetching roadmap", skills: [], resources: [] }]);
        setIsFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) =>
      urlRegex.test(part) ? (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  const renderRoadmap = () => {
    if (typeof roadmap === "string") {
      // LLM-generated string
      return <p className="text-gray-800 whitespace-pre-line">{renderTextWithLinks(roadmap)}</p>;
    } else if (Array.isArray(roadmap) && selectedRole) {
      // Static fallback roadmap from roles.json
      const roleData = roadmap.find((r: StaticRole) => r.role === selectedRole);
      if (!roleData) return null;

      return (
        <div>
          <h3 className="text-xl font-bold mb-2">{roleData.role}</h3>
          <p className="mb-2">{roleData.description}</p>
          <p className="font-semibold">Skills:</p>
          <ul className="list-disc list-inside mb-2">
            {roleData.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="font-semibold">Resources:</p>
          <ul className="list-disc list-inside">
            {roleData.resources.map((r) => (
              <li key={r}>
                <a href={r} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {r}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-6">
      <h2 className="text-4xl font-bold mb-8 text-white text-center drop-shadow-lg">Your Career Roadmap</h2>

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

            {/* Role selector if multiple roles */}
            {topRoles.length > 1 && (
              <div className="mb-4">
                <label className="font-semibold mr-2">Select Role:</label>
                <select
                  value={selectedRole || ""}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="p-1 border rounded"
                >
                  <option value="">--Choose--</option>
                  {topRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {renderRoadmap()}

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
