"use server";

import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export async function generateAiResume(formData: FormData) {
  try {
    const resumeText = formData.get("resumeText") as string;
    const jobDescription = formData.get("jobDescription") as string;

    const isMatchingTask = jobDescription && jobDescription.trim().length > 0;

    // 2. Dynamic Prompt banayein
    const finalPrompt = isMatchingTask
      ? `You are a Senior Technical Recruiter and Resume Optimizer.
     
     TASK:
     Align the provided RESUME with the JOB DESCRIPTION (JD). 
     
     INSTRUCTIONS:
     1. Identify missing keywords and skills from the JD and integrate them naturally into the resume.
     2. Rewrite work experience into high-impact bullet points using the "Action Verb + Task + Result" framework.
     3. Ensure the tone is professional, confident, and ATS-friendly.
     4. Do not lie or invent fake experiences; only enhance the existing ones to match the JD requirements.

     RESUME: ${resumeText}
     JD: ${jobDescription}
     
     OUTPUT FORMAT: Return only the improved resume content in a clear, structured format.`
      : `You are a Professional Resume Writer.
     
     TASK:
     Improve the provided RESUME to make it world-class.
     
     INSTRUCTIONS:
     1. Transform vague sentences into impact-oriented achievements (e.g., instead of "Responsible for sales," use "Driven $50k in monthly revenue...").
     2. Fix grammar, improve vocabulary, and use strong industry-standard action verbs.
     3. Remove repetitive words and fluff.
     4. Focus on quantification (use numbers, percentages, and metrics where possible).

     RESUME: ${resumeText}
     
     OUTPUT FORMAT: Return only the optimized resume content with clear section headers.`;

    // Initialize the API with your secret key
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
    });

    return { success: true, output: response.text };
  } catch (error: any) {
    return { success: false, error: "AI Generation Failed" };
  }
}
