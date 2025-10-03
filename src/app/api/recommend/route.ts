// src/app/api/recommend/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Static fallback roadmap
const staticRoadmap = `1. Learn HTML, CSS, and JavaScript fundamentals
2. Build small web projects to practice
3. Get comfortable with React and frontend frameworks
4. Learn version control (Git) and deployment basics
5. Explore backend basics (Node.js, APIs)
6. Start contributing to open-source or personal projects`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { answers, role } = await req.json();

    // Generate prompt for OpenAI
    const prompt = `You are a career guidance assistant.
Generate a concise, actionable roadmap for the role "${role}" based on these quiz answers: ${JSON.stringify(
      answers
    )}.
Provide 5-6 practical steps.`;

    // Try calling OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
    });

    const result = response.choices[0].message?.content;

    // If OpenAI fails to return, fallback to static roadmap
    return NextResponse.json({ roadmap: result || staticRoadmap });
  } catch (err: any) {
    console.error("OpenAI error:", err.message);

    // Fallback to static roadmap in case of errors
    return NextResponse.json({ roadmap: staticRoadmap });
  }
}
