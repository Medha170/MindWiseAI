"use client";
import { useState } from "react";

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [journalEntry, setJournalEntry] = useState("");
  const [aiReflection, setAiReflection] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const moods = [
    { emoji: "😭", label: "Terrible" },
    { emoji: "😕", label: "Bad" },
    { emoji: "😐", label: "Okay" },
    { emoji: "🙂", label: "Good" },
    { emoji: "😄", label: "Great" },
  ];

  const handleJournalSubmit = () => {
    if (!journalEntry.trim()) return;
    setIsAnalyzing(true);
    
    // Simulate AI processing time for the video demo
    setTimeout(() => {
      setAiReflection("I hear you. It sounds like you are carrying a heavy cognitive load right now. Remember that it is okay to step away and take a break. What is one small thing you can do for yourself tonight?");
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Your Wellness Dashboard</h1>
            <p className="text-slate-500">Track your mood and reflect on your day.</p>
          </div>
          <a href="/chat" className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-medium hover:bg-blue-200 transition">
            Start Therapy Chat
          </a>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Mood Tracker Module */}
          <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
            <h2 className="text-xl font-semibold text-slate-700">Daily Mood Log</h2>
            <p className="text-sm text-slate-500">How are you feeling today?</p>
            
            <div className="flex justify-between">
              {moods.map((mood, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMood(index)}
                  className={`text-3xl transition-transform hover:scale-110 ${selectedMood === index ? "scale-125 drop-shadow-md" : "opacity-50 grayscale"}`}
                  title={mood.label}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>

            {selectedMood !== null && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium text-center border border-green-200">
                Mood logged successfully!
              </div>
            )}
          </div>

          {/* AI-Assisted Journaling Module */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h2 className="text-xl font-semibold text-slate-700">AI-Assisted Journaling</h2>
            <p className="text-sm text-slate-500">Write about your day. MindWise AI will provide a gentle reflection.</p>
            
            <textarea
              className="w-full h-32 p-4 border border-slate-200 text-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="I felt really overwhelmed during my classes today..."
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
            ></textarea>

            <button
              onClick={handleJournalSubmit}
              disabled={isAnalyzing || !journalEntry.trim()}
              className="bg-slate-800 text-white px-6 py-2 rounded-xl font-medium hover:bg-slate-900 transition disabled:bg-slate-300"
            >
              {isAnalyzing ? "Analyzing Tone..." : "Save & Reflect"}
            </button>

            {/* AI Feedback Block */}
            {aiReflection && (
              <div className="mt-4 p-5 bg-blue-50 border border-blue-100 rounded-xl">
                <p className="text-sm font-semibold text-blue-800 mb-1">MindWise AI Reflection:</p>
                <p className="text-slate-700">{aiReflection}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}