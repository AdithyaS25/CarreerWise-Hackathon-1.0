"use client"; // Mark as Client Component

import { useState, useEffect } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en">
      <body>
        {/* Keep all styling inside a div, not directly on <body> */}
        <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-400">
          {isClient ? children : null}
        </div>
      </body>
    </html>
  );
}
