"use client"; // This tells Next.js to treat this as a standard React component
import { useState } from "react";

export default function Assessment() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800">MindWise AI</h1>
          <p className="text-sm text-slate-500 mt-2">Personalized Psychological Assessment</p>
        </div>

        {/* Question Area */}
        <div className="mb-6">
          <p className="text-sm font-medium text-blue-600 mb-2">Question {step} of 5</p>
          <h2 className="text-xl font-semibold text-slate-700">
            Over the past two weeks, how often have you felt overwhelmed by academic or workplace stress?
          </h2>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 mb-8">
          {["Not at all", "Several days", "More than half the days", "Nearly every day"].map((option, index) => (
            <button 
              key={index}
              className="w-full rounded-xl border border-slate-200 p-4 text-left text-slate-700 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              onClick={() => setStep(step < 5 ? step + 1 : 5)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full rounded-full bg-slate-100">
          <div 
            className="h-2 rounded-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>

      </div>
    </div>
  );
}