"use server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateAiResumeFromOpenai(resumeText: string, jobDescription: string) {
  // 1. Model select karein
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

  try {
    // 3. Action: Gemini ko prompt bhejna
    const response = await groq.chat.completions.create({
      //   model: "gpt-5-nano",
      //   input: [
      //     { role: "system", content: "You are an expert career coach and ATS specialist." },
      //     { role: "user", content: finalPrompt },
      //   ],

      messages: [
        {
          role: "user",
          content: "i'm also struggling to get a job",
        },
      ],
      model: "openai/gpt-oss-20b",
    });
    // 4. Output: Result return karein
    return { success: true, output: response.choices[0]?.message?.content || "" };
  } catch (error) {
    return { success: false, error: "Unable to generate. Please try again" };
  }
}
