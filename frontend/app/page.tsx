"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Add this import

export default function Assessment() {
  const [step, setStep] = useState(1);
  const router = useRouter(); // Initialize the router

  const handleOptionClick = (optionIndex) => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // On the final step, save a dynamic profile based on their answers
      // (For the PoC, we will simulate a high stress/anxiety result)
      const mockProfile = {
        stress: "High",
        anxiety: "Moderate",
        sleep: "Poor"
      };
      
      // Save it to browser storage
      localStorage.setItem("mindwiseProfile", JSON.stringify(mockProfile));
      
      // Navigate to the chat page
      router.push("/chat");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-slate-800">MindWise AI</h1>
          <p className="text-sm text-slate-500 mt-2">Personalized Psychological Assessment</p>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-blue-600 mb-2">Question {step} of 5</p>
          <h2 className="text-xl font-semibold text-slate-700">
            {step === 5 
              ? "How often do you find it difficult to fall asleep due to racing thoughts?" 
              : "Over the past two weeks, how often have you felt overwhelmed by academic or workplace stress?"}
          </h2>
        </div>

        <div className="flex flex-col gap-3 mb-8">
          {["Not at all", "Several days", "More than half the days", "Nearly every day"].map((option, index) => (
             <button 
             key={index}
             className="w-full rounded-xl border border-slate-200 p-4 text-left text-slate-700 hover:border-blue-500 hover:bg-blue-50 transition-colors"
             onClick={() => handleOptionClick(index)}
           >
             {option}
           </button>
          ))}
        </div>

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