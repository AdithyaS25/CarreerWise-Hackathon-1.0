import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import rolesData from "../../../../data/roles.json";

type Role = {
  role: string;
  skills: string[];
  description: string;
  resources: string[];
};

const roles: Role[] = rolesData;

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();
    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json({ roadmap: "Invalid quiz answers" }, { status: 400 });
    }

    const maxScore = Math.max(...answers);
    const topIndexes = answers
      .map((score: number, i: number) => (score === maxScore ? i : -1))
      .filter((i: number) => i !== -1);

    const recommendedRoles: Role[] = topIndexes.map((idx: number) => roles[idx]).filter(Boolean);
    const roleNames = recommendedRoles.map((r) => r.role).join(", ");
    const prompt = `You are a career guidance assistant.
Generate a personalized roadmap for the following roles based on a user quiz: ${roleNames}.
Provide 5-6 practical steps in a concise and actionable way.
Respond in plain text.`;

    let llmRoadmap = "";
    try {
      // Use a valid model name as per Google Generative AI latest supported models
      const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent([prompt]);
      const contentObj = result.response?.candidates?.[0]?.content;
      llmRoadmap = typeof contentObj === "string"
        ? contentObj
        : contentObj?.parts?.[0]?.text ?? "";
    } catch (e) {
      console.error("Gemini API error:", e);
    }

    const staticRoadmap = recommendedRoles
      .map(
        (r) =>
          `${r.role}:\nDescription: ${r.description}\nSkills: ${r.skills.join(
            ", "
          )}\nResources:\n${r.resources.map((link) => `- ${link}`).join("\n")}\n`
      )
      .join("\n");

    const roadmapToSend = llmRoadmap ? llmRoadmap : staticRoadmap;
    const isFallback = !llmRoadmap;

    return NextResponse.json({ roadmap: roadmapToSend, isFallback });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { roadmap: "Error generating roadmap. Using static fallback.", isFallback: true },
      { status: 500 }
    );
  }
}
