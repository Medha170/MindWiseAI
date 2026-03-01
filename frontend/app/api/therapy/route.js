import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client using your environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { userMessage, assessmentProfile } = body;

    // We are using gemini-1.5-flash because it is fast and perfect for text chat
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Constructing the prompt with the user's psychological profile
    const prompt = `
      You are MindWise AI, an empathetic, non-judgmental, and supportive conversational agent. 
      Your primary audience is college students and young professionals dealing with academic pressure and burnout.
      
      User's Current Assessment Profile:
      - Stress Level: ${assessmentProfile?.stress || 'Unknown'}
      - Anxiety: ${assessmentProfile?.anxiety || 'Unknown'}
      
      Guidelines for your response:
      1. Validate the user's feelings and mirror a calming, therapeutic tone.
      2. Keep responses concise (under 3-4 sentences) as this is a chat interface.
      3. Gently suggest one small, actionable coping mechanism related to their assessment profile.
      4. Do not attempt to diagnose or provide medical advice.

      The user says: "${userMessage}"
    `;

    // Call the AI
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiText = response.text();

    // Return the generated text to the frontend
    return NextResponse.json({ 
      status: "success",
      role: "assistant",
      content: aiText
    });

  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate AI response" }, { status: 500 });
  }
}