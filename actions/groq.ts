"use server";
import Groq from "groq-sdk";

// The client gets the API key from the environment variable `GROQ_API_KEY`.
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateAiResumeFromGroq(resumeText: string, jobDescription: string) {
  const isMatchingTask = jobDescription && jobDescription.trim().length > 0;

  // Dynamic Prompt
  const finalPrompt = `
      You are an expert ATS Auditor. Your goal is to evaluate the resume strictly based on parsing compatibility, keyword matching, and impact metrics.

      SCORING CRITERIA:
      - Formatting (25%): No columns, tables, or complex graphics.
      - Keyword Alignment (35%): Match between Resume and JD skills.
      - Impact & Metrics (40%): Presence of percentages (%), currency ($), and numbers.

      TASK: Perform a critical audit. Compare the Resume against the JD (if provided). Calculate a realistic, variable score based on the criteria above.

      STRICT INSTRUCTIONS:
      1. Provide a dynamic ATS Score (0-100%). High scores (90+) are ONLY for resumes with heavy quantification and perfect JD alignment.
      2. Provide exactly 5 CRITICAL improvement points. 
      3. Detail: Each point must have a BOLD TITLE followed by a specific action (Total 2 lines per point).
      4. NO generic advice. Focus on: Hard Keywords, Result-oriented metrics, and ATS-parseable layout.
      5. No extra empty lines between bullets.

      RESUME: ${resumeText}
      ${isMatchingTask ? `TARGET JOB DESCRIPTION: ${jobDescription}` : "General Industry Standards"}

      OUTPUT FORMAT:
      ### ATS SCORE: [XX]%
      ### IMPROVEMENT POINTS:
      • **[Title]**: [Detailed actionable advice in 25-30 words focusing on specific missing elements]
      • **[Title]**: [Detailed actionable advice in 25-30 words focusing on specific missing elements]
      • **[Title]**: [Detailed actionable advice in 25-30 words focusing on specific missing elements]
      • **[Title]**: [Detailed actionable advice in 25-30 words focusing on specific missing elements]
      • **[Title]**: [Detailed actionable advice in 25-30 words focusing on specific missing elements]
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
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
    });

    return { success: true, output: response.choices[0]?.message?.content || "" };
  } catch (error: any) {
    console.error("Groq Error:", error);
    return { success: false, error: "Groq is currently busy. Please try again." };
  }
}
