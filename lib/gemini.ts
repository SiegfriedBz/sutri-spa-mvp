import { GoogleGenAI } from "@google/genai";

/** Easy to bump later (e.g. gemini-3.8-flash). */
export const GEMINI_MODEL = "gemini-3.5-flash";

export function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing GEMINI_API_KEY. Add it to .env.local and restart the server."
    );
  }
  return new GoogleGenAI({ apiKey });
}
