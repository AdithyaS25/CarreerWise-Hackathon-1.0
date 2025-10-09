"use client";

import { useState, useEffect } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") setDarkMode(true);

    // Apply initial theme class
    if (savedMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <html lang="en">
      <body className="min-h-screen">
        <div
          className={`min-h-screen flex flex-col relative bg-animated transition-colors duration-500 ${
            darkMode
              ? "bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800"
              : "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400"
          }`}
        >
          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-2 rounded-full shadow-md transition-all hover:scale-105"
            aria-label="Toggle Dark/Light Mode"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>

          {children}
        </div>
      </body>
    </html>
  );
}
