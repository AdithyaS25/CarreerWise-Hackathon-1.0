// src/app/layout.tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-400">
        {children}
      </body>
    </html>
  );
}
