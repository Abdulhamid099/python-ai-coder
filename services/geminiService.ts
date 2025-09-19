
import { GoogleGenAI } from "@google/genai";
import { TaskMode } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = (taskMode: TaskMode): string => {
  switch (taskMode) {
    case TaskMode.GENERATE:
      return "You are PyPro, an expert Python programming assistant. Your task is to generate clean, efficient, and correct Python code based on the user's request. Only output the raw Python code itself, without any surrounding text, explanations, or markdown formatting like ```python.";
    case TaskMode.EXPLAIN:
      return "You are PyPro, an expert Python programming assistant. Your task is to explain a piece of Python code in a clear and concise way. Use markdown for formatting, explain the logic, variables, and functionality step-by-step. Use bullet points for clarity.";
    case TaskMode.REFACTOR:
      return "You are PyPro, an expert Python programming assistant. Your task is to refactor a piece of Python code to improve its readability, performance, and adherence to best practices (PEP 8). Provide the refactored code inside a markdown code block, followed by a bulleted list explaining the key changes you made.";
    default:
      return "You are a helpful Python assistant.";
  }
};

const getUserPrompt = (taskMode: TaskMode, input: string): string => {
   switch (taskMode) {
    case TaskMode.GENERATE:
      return `Generate a Python script that does the following: ${input}`;
    case TaskMode.EXPLAIN:
      return `Please explain the following Python code:\n\n\`\`\`python\n${input}\n\`\`\``;
    case TaskMode.REFACTOR:
      return `Please refactor the following Python code:\n\n\`\`\`python\n${input}\n\`\`\``;
    default:
      return input;
  }
}

export const runPythonTask = async (taskMode: TaskMode, input: string): Promise<string> => {
  try {
    const systemInstruction = getSystemInstruction(taskMode);
    const userPrompt = getUserPrompt(taskMode, input);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get response from AI. Please check your API key and network connection.");
  }
};
