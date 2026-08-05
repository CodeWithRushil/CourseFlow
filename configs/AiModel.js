"use server";
import OpenAI from "openai";

function getOpenRouterApiKey() {
  return (
    process.env.OPENROUTER_API_KEY ||
    process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ||
    ""
  );
}

function getOpenRouterClient() {
  const apiKey = getOpenRouterApiKey();
  if (!apiKey) {
    throw new Error(
      "Missing OpenRouter API key. Set OPENROUTER_API_KEY (or NEXT_PUBLIC_OPENROUTER_API_KEY) in .env.local"
    );
  }

  return new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer":
        process.env.NEXT_PUBLIC_HOST_NAME || "https://www.courseflow.tech",
      "X-Title": "CourseFlow",
    },
  });
}

function extractJson(raw) {
  let text = String(raw || "").trim();
  text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1) {
    text = text.slice(firstBrace, lastBrace + 1);
  }
  const firstBracket = text.indexOf("[");
  const lastBracket = text.lastIndexOf("]");
  if (
    (firstBrace === -1 || (firstBracket !== -1 && firstBracket < firstBrace)) &&
    firstBracket !== -1 &&
    lastBracket !== -1
  ) {
    return JSON.parse(text.slice(firstBracket, lastBracket + 1));
  }
  return JSON.parse(text);
}

async function callOpenRouter(prompt, { maxTokens = 6000 } = {}) {
  const client = getOpenRouterClient();
  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

  const response = await client.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content:
          "You are an expert course author who writes detailed, classroom-quality lessons. Return ONLY valid JSON with no markdown fences or commentary.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.55,
    max_tokens: maxTokens,
  });

  const content = response.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenRouter returned an empty response");
  }
  return content.trim();
}

export async function generateCourseLayout({
  category,
  topic,
  description,
  level,
  duration,
  chapterCount,
}) {
  const prompt = `Create a detailed course outline for a full tutorial.

Category: ${category}
Topic: ${topic}
User description: ${description || "N/A"}
Level: ${level}
Total course duration: ${duration}
Number of chapters: ${chapterCount}

Return ONLY valid JSON (no markdown) with this shape:
{
  "category": "${category}",
  "topic": "${topic}",
  "courseName": "...",
  "description": "A rich 4-6 sentence overview of what learners will achieve",
  "level": "${level}",
  "duration": "${duration}",
  "chapters": [
    {
      "chapterName": "...",
      "about": "2-3 sentences summarizing what this chapter covers and why it matters",
      "duration": "..."
    }
  ]
}

Rules:
- Exactly ${chapterCount} chapters in a logical learning order
- chapterName is the name only (no numbering)
- courseName must be a polished, marketable course title — NOT a near-copy of the topic. Invent a clear product-style name (e.g. topic "react hooks" → "React Hooks Mastery: Build Real Apps with Confidence"). Make it distinctive, benefit-focused, and 4–10 words. Never return the topic string unchanged or with only minor wording tweaks.
- description must be detailed and motivating
- Keep keys exactly as specified (case sensitive)`;

  const raw = await callOpenRouter(prompt, { maxTokens: 2500 });
  const parsed = extractJson(raw);

  if (!Array.isArray(parsed.chapters) || parsed.chapters.length === 0) {
    throw new Error("AI response missing chapters array");
  }

  parsed.chapters = parsed.chapters.slice(0, chapterCount);
  return parsed;
}

export async function generateChapterContent({
  courseName,
  topic,
  level,
  category,
  chapterName,
  about,
  chapterIndex,
  chapterCount,
}) {
  const prompt = `Write in-depth lesson content for ONE course chapter.

Course: ${courseName || topic}
Topic: ${topic}
Category: ${category}
Level: ${level}
Chapter ${chapterIndex + 1} of ${chapterCount}: ${chapterName}
Chapter summary: ${about || "N/A"}

Return ONLY valid JSON (no markdown) with this shape:
{
  "content": [
    {
      "title": "Section title",
      "explanation": "Long detailed teaching text...",
      "code": "code snippet or empty string"
    }
  ]
}

Rules for DETAILED content:
- Include 4 to 6 sections in the content array
- Each explanation must be thorough: at least 8-12 full sentences (about 120-220 words)
- Teach like a Coursera/Udemy instructor: define concepts, explain why they matter, give examples, common mistakes, and a short practice tip
- Use clear paragraphs separated by \\n\\n inside explanation strings when helpful
- Put runnable/example code ONLY in the "code" field as a plain string (use real newlines escaped as \\n in JSON). Do NOT wrap code in markdown fences. Do NOT put code blocks inside explanation.
- For Coding category, include useful non-empty code in at least half of the sections; otherwise use ""
- Do not invent numbering in titles
- Keep keys exactly: title, explanation, code`;

  const raw = await callOpenRouter(prompt, { maxTokens: 4500 });
  const parsed = extractJson(raw);

  const blocks = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed.content)
      ? parsed.content
      : null;

  if (!blocks || blocks.length === 0) {
    return [
      {
        title: chapterName,
        explanation:
          about ||
          `This chapter covers ${chapterName}. Review the key ideas carefully and practice with examples related to ${topic}.`,
        code: "",
      },
    ];
  }

  return blocks.map((b) => ({
    title: b.title || "Lesson section",
    explanation: b.explanation || b.content || "",
    code: normalizeCodeValue(b.code ?? b.Code ?? b.snippet),
  }));
}

function normalizeCodeValue(value) {
  if (value == null) return "";
  if (Array.isArray(value)) {
    return value
      .map((line) => (typeof line === "string" ? line : String(line ?? "")))
      .join("\n")
      .trim();
  }
  if (typeof value === "object") {
    return normalizeCodeValue(value.code ?? value.content ?? value.text ?? "");
  }
  let text = String(value).trim();
  if (!text || text === "null" || text === "undefined") return "";
  // Unescape common JSON-escaped sequences if the model double-escaped
  if (text.includes("\\n") || text.includes("\\t")) {
    text = text
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }
  // Strip markdown fences if the model included them in the code field
  text = text
    .replace(/^```[\w+-]*\s*\n?/i, "")
    .replace(/\n?```$/i, "")
    .trim();
  return text;
}

/** @deprecated Prefer generateCourseLayout({...}) */
export async function generateCourseLayout_AI(userInput) {
  const raw = await callOpenRouter(userInput, { maxTokens: 2500 });
  return raw;
}

/** @deprecated Prefer generateChapterContent({...}) */
export async function generateChapterContent_AI(userInput) {
  const raw = await callOpenRouter(userInput, { maxTokens: 4500 });
  return raw;
}
