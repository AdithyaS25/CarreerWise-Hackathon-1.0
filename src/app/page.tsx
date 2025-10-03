"use client";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to CareerWise
      </h1>
      <p className="text-center mb-6 max-w-lg">
        Struggling to choose your career? Take the quiz and discover top career matches with personalized roadmaps.
      </p>
      <button
        onClick={() => router.push("/quiz")}
        className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700"
      >
        Get Started
      </button>
    </div>
  );
}
