import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription } = await req.json();

    const isMatchingTask = jobDescription && jobDescription.trim().length > 0;

    // 2. Dynamic Prompt banayein
    const finalPrompt = isMatchingTask
      ? `You are a Resume Expert. Match this Resume to this specific Job Description. 
         RESUME: ${resumeText} 
         JD: ${jobDescription}`
      : `You are a Resume Expert. Improve this resume by making it more professional and impact-oriented. 
         RESUME: ${resumeText}`;

    // Initialize the API with your secret key
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
    });

    return NextResponse.json({ output: response.text });
  } catch (error: any) {
    return NextResponse.json({ error: "AI Generation Failed" }, { status: 500 });
  }
}
