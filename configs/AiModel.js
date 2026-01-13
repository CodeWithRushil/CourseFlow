"use server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "https://www.courseflow.tech", // change to prod later
    "X-Title": "CourseFlow",
  },
});

export async function generateCourseLayout_AI(userInput) {
  const response = await client.chat.completions.create({
    model: "deepseek/deepseek-r1-0528:free",
    messages: [
      {
        role: "user",
        content: userInput,
      },
    ],
    temperature: 0.2,
    max_tokens: 1500,
  });

  return response.choices[0].message.content;
}

export async function generateChapterContent_AI(userInput) {
  const response = await client.chat.completions.create({
    model: "deepseek/deepseek-r1-0528:free",
    messages: [
      {
        role: "user",
        content: userInput,
      },
    ],
    temperature: 0.4,
    max_tokens: 2500,
  });

  return response.choices[0].message.content;
}
