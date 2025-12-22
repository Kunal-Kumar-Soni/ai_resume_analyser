"use server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateAiResumeFromOpenai(resumeText: string, jobDescription: string) {
  // 1. Model select karein
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
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful ATS analyzer that provides concise and professional feedback.",
        },
        {
          role: "user",
          content: finalPrompt,
        },
      ],
      // Groq ke best models: llama-3.3-70b-versatile ya llama3-8b-8192
      model: "llama-3.3-70b-versatile",
      temperature: 0.5, // Thoda low temperature rakha hai taaki output consistent rahe
    });

    return { success: true, output: response.choices[0]?.message?.content || "" };
  } catch (error: any) {
    console.error("Groq Error:", error);
    return { success: false, error: "Groq is currently busy. Please try again." };
  }
}
