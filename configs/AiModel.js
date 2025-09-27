import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

export async function generateCourseLayout_AI(userInput) {
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `${userInput}`
        },
      ],
    },
  ];

  const tools = [
    {
      googleSearch: {
      }
    },
  ];
  
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
  };

  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    config,
    contents,
  });

  return response.text;
}

export async function generateChapterContent_AI(userInput) {
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `${userInput}`
        },
      ],
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents,
  });

  return response.text;
}