"use server";

import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export async function generateAiResumeFromGemini(resumeText: string, jobDescription: string) {
  const isMatchingTask = jobDescription && jobDescription.trim().length > 0;

  // 2. Dynamic Prompt
  const finalPrompt = `
      You are an expert ATS Auditor. Perform a critical audit of this resume.
      
      TASK: Identify the top 5 COMPULSORY improvements for ATS optimization.

      STRICT INSTRUCTIONS:
      1. Provide an ATS Score (0-100%).
      2. Provide exactly 5 CRITICAL improvement points. 
      3. Detail: Each point must have a BOLD TITLE followed by a specific action (Total 2 lines per point).
      4. NO generic advice. Focus on: Keywords, Quantification (%), and Formatting.
      5. No extra empty lines between bullets.

      RESUME: ${resumeText}
      ${isMatchingTask ? `JD: ${jobDescription}` : ""}

      OUTPUT FORMAT:
      ### ATS SCORE: [XX]%
      ### IMPROVEMENT POINTS:
        • [Title]: [Detailed actionable advice in 25-30 words]
        • [Title]: [Detailed actionable advice in 25-30 words]
        • [Title]: [Detailed actionable advice in 25-30 words]
        • [Title]: [Detailed actionable advice in 25-30 words]
        • [Title]: [Detailed actionable advice in 25-30 words]
  `;

  try {
    // Initialize the API with your secret key
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
    });

    return { success: true, output: response.text };
  } catch (error: any) {
    return { success: false, error: "Gemini is currently busy. Please try again." };
  }
}
