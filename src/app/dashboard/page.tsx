'use client';
import { useEffect, useState } from 'react';

type Result = {
  role: string;
  score: number;
};

type StoredResults = {
  top3: Result[];
};

export default function DashboardPage() {
  const [results, setResults] = useState<StoredResults | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('results');
    if (data) {
      try {
        setResults(JSON.parse(data) as StoredResults);
      } catch (err) {
        console.error('Failed to parse results from localStorage', err);
        setResults(null);
      }
    }
  }, []);

  if (!results || results.top3.length === 0) {
    return <p className="text-center mt-10 text-gray-600 dark:text-gray-300">No results saved yet.</p>;
  }

  return (
    <div className="min-h-screen p-4 transition-colors duration-500 ease-in-out">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Dashboard</h2>
      {results.top3.map((r) => (
        <div key={r.role} className="bg-white dark:bg-gray-900 p-4 rounded shadow mb-4 card">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{r.role}</h3>
          <p className="text-gray-700 dark:text-gray-300">Score: {r.score}</p>
        </div>
      ))}
    </div>
  );
}
