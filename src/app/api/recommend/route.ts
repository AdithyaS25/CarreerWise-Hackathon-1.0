import type { NextApiRequest, NextApiResponse } from 'next';
import roles from '../../../../data/roles.json'; // your roles dataset

type Role = {
  role: string;
  skills: string[];
  description: string;
  resources: string[];
};

type QuizAnswer = {
  skills: string[];
};

type ApiResponse = {
  top3: { role: string; score: number }[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const answers: QuizAnswer = req.body;

  if (!answers || !Array.isArray(answers.skills)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  // Calculate simple matching score
  const scores = roles.map((role: Role) => {
    const matchCount = role.skills.filter((skill) =>
      answers.skills.includes(skill)
    ).length;
    return { role: role.role, score: matchCount };
  });

  // Sort by score descending and take top 3
  const top3 = scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => ({
      ...r,
      score: r.score, // optional: scale if needed
    }));

  res.status(200).json({ top3 });
}