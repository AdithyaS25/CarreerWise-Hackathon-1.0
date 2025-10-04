export type Roadmap = { role: string; steps: string[] };

const roleTemplates: Record<string, string[]> = {
  "Frontend Developer": [
    "Learn HTML, CSS, JS",
    "Master React",
    "Learn TypeScript",
    "Build portfolio projects",
    "Deploy apps",
  ],
  "UI/UX Designer": [
    "Learn design principles",
    "Master Figma/Adobe XD",
    "Build wireframes & prototypes",
    "Create design portfolio",
    "Understand UX testing",
  ],
  "Data Analyst": [
    "Learn Excel & SQL",
    "Master Python/R",
    "Learn Tableau/Power BI",
    "Analyze real datasets",
    "Build data portfolio",
  ],
  // ... add other roles
};

export function generateRoadmap(role: { role: string }): Roadmap {
  const steps = roleTemplates[role.role] || [
    "Learn the basics",
    "Build small projects",
    "Improve skills",
    "Network",
    "Apply for internships/jobs",
  ];
  return { role: role.role, steps };
}
