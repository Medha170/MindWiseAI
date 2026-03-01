"use client"; // Required for Next.js when using React state

import { useState, useEffect } from "react";

export default function ChatInterface() {

  const [assessmentProfile, setAssessmentProfile] = useState({ stress: "Pending...", anxiety: "Pending..." });

  // State to hold the chat history
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: "Hi there. I noticed from your assessment that your stress levels have been quite high lately. How are you holding up today?" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // When the component loads, grab the profile from the assessment page
    const savedProfile = localStorage.getItem("mindwiseProfile");
    if (savedProfile) {
      setAssessmentProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Function to call your working API
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    
    // 1. Add user's message to the UI immediately
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Call your local Gemini API route
      const response = await fetch("/api/therapy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: userMessage,
          assessmentProfile: assessmentProfile
        }),
      });

      const data = await response.json();

      // 3. Add the AI's response to the UI
      if (data.status === "success") {
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      {/* Top Navigation & Hardcoded Scores */}
      <header className="bg-white p-4 shadow-sm flex justify-between items-center border-b border-slate-200">
        <h1 className="text-xl font-bold text-blue-600">MindWise AI</h1>
        <div className="flex gap-4 text-sm">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">Stress: {assessmentProfile.stress}</span>
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">Anxiety: {assessmentProfile.anxiety}</span>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-4 max-w-3xl mx-auto w-full">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-5 py-3 max-w-[80%] shadow-sm ${
              msg.role === "user" 
                ? "bg-blue-600 text-white rounded-2xl rounded-tr-none" 
                : "bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-none"
            }`}>
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl rounded-tl-none px-5 py-3 shadow-sm flex gap-2">
              <span className="animate-pulse">●</span>
              <span className="animate-pulse delay-100">●</span>
              <span className="animate-pulse delay-200">●</span>
            </div>
          </div>
        )}
      </main>

      {/* Input Area */}
      <footer className="bg-white p-4 border-t border-slate-200">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..." 
            className="flex-1 border border-slate-300 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}