export default function ChatInterface() {
  return (
    <div className="flex h-screen flex-col bg-slate-50">
      {/* Top Navigation & Hardcoded Scores */}
      <header className="bg-white p-4 shadow-sm flex justify-between items-center border-b border-slate-200">
        <h1 className="text-xl font-bold text-blue-600">MindWise AI</h1>
        <div className="flex gap-4 text-sm">
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">Stress: High</span>
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">Anxiety: Moderate</span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Sleep: Fair</span>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-4 max-w-3xl mx-auto w-full">
        {/* AI Message */}
        <div className="flex justify-start">
          <div className="bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-none px-5 py-3 max-w-[80%] shadow-sm">
            <p>Hi there. I noticed from your assessment that your stress levels have been quite high lately. How are you holding up today?</p>
          </div>
        </div>

        {/* User Message */}
        <div className="flex justify-end">
          <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none px-5 py-3 max-w-[80%] shadow-sm">
            <p>Honestly, I&apos;m just exhausted. Midterms are coming up and I feel like I&apos;m falling behind.</p>
          </div>
        </div>

        {/* AI Message */}
        <div className="flex justify-start">
          <div className="bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tl-none px-5 py-3 max-w-[80%] shadow-sm">
            <p>It is completely understandable to feel overwhelmed with midterms looming. Let&apos;s take a quick breath. What is one small task you can focus on right now to make today feel a little more manageable?</p>
          </div>
        </div>
      </main>

      {/* Input Area */}
      <footer className="bg-white p-4 border-t border-slate-200">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="flex-1 border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            disabled
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}