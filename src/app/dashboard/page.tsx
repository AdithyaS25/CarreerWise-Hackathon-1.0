'use client';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('results');
    if (data) setResults(JSON.parse(data));
  }, []);

  if (!results) return <p>No results saved yet.</p>;

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {results.top3.map((r: any) => (
        <div key={r.role} className="bg-white p-4 rounded shadow mb-4">
          <h3 className="font-semibold">{r.role}</h3>
          <p>Score: {r.score}</p>
        </div>
      ))}
    </div>
  );
}
