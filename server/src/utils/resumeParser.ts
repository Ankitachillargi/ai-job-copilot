import nlp from "compromise";

interface ParsedResume {
  email: string | null;
  phone: string | null;
  skills: string[];
}

function extractSkills(text: string): string[] {

  const doc = nlp(text);

  const nouns = doc.nouns().out("array") as string[];

  const skills = nouns.filter(skill => {

    const clean = skill.toLowerCase();

    return (
      clean.length > 2 &&
      clean.length < 25 &&
      !clean.includes("experience") &&
      !clean.includes("education") &&
      !clean.includes("project")
    );
  });

  return [...new Set(skills)];
}

export function parseResume(text: string): ParsedResume {

  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\d{10}/;

  const email = text.match(emailRegex)?.[0] || null;
  const phone = text.match(phoneRegex)?.[0] || null;

  const skills = extractSkills(text);

  return {
    email,
    phone,
    skills
  };
}