import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the incoming JSON from Postman
    const body = await request.json();
    const { userMessage, assessmentProfile } = body;

    // In the real app, this is where you call OpenAI/Anthropic. 
    // For the demo, we are mocking the AI's personalized response.
    
    let aiResponse = "";

    if (assessmentProfile.stress === "High") {
      aiResponse = `I hear you. Dealing with high stress is exhausting. Since you mentioned feeling overwhelmed, would you like to try a quick 2-minute grounding exercise?`;
    } else {
      aiResponse = `Thank you for sharing that with me. How can I support you best right now?`;
    }

    // Return the response as JSON
    return NextResponse.json({ 
      status: "success",
      role: "assistant",
      content: aiResponse,
      context_used: assessmentProfile 
    });

  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}