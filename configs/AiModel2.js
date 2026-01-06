"use server"
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // change to your domain later
    "X-Title": "CourseFlow",
  },
});

/**
 * Generate Course Layout (Outline)
 */
export async function generateCourseLayout_AI(userInput) {
  const response = await client.chat.completions.create({
    model: "mistralai/mistral-7b-instruct",
    messages: [
      {
        role: "user",
        content: userInput,
      },
    ],
    temperature: 0.4,        // lower = better structure
    max_tokens: 1200,        // enough for full outline
  });

  return response.choices[0].message.content;
}

/**
 * Generate Chapter Content
 */
export async function generateChapterContent_AI(userInput) {
  const response = await client.chat.completions.create({
    model: "mistralai/mistral-7b-instruct",
    messages: [
      {
        role: "user",
        content: userInput,
      },
    ],
    temperature: 0.7,        // slightly more creative
    max_tokens: 2000,        // good for chapter text
  });

  return response.choices[0].message.content;
}