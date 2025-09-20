import React, { useState } from 'react';
import Header from './ui/Header';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your AI Internship Assistant.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#a8edea] via-[#fed6e3] to-[#fcb69f]">
      <Header />
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center pt-8 px-2 gap-8">
        {/* Info Section (left) */}
        <aside className="hidden lg:flex flex-col justify-center items-start max-w-xs bg-white/80 rounded-2xl shadow-xl p-6 mr-2 mt-2">
          <h2 className="text-2xl font-bold mb-2 text-[#7f53ac]">AI Chat Help</h2>
          <p className="text-base text-gray-700 mb-4">Get instant answers about internships, application process, and more. Just type your question and our AI will assist you!</p>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            <li>Ask about government internships</li>
            <li>Get profile or application tips</li>
            <li>Find out how to use the portal</li>
          </ul>
        </aside>
        {/* Chatbox Section (right) */}
        <div className="w-full max-w-2xl flex flex-col bg-white/90 rounded-2xl shadow-2xl p-0 sm:p-4 h-[70vh] sm:h-[600px] mt-2">
          <div className="flex-1 overflow-y-auto mb-4 p-4 space-y-3 scrollbar-thin scrollbar-thumb-blue-200">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] break-words p-3 rounded-2xl shadow-md text-base ${
                  msg.role === 'user'
                    ? 'ml-auto bg-gradient-to-r from-[#fcb69f] to-[#a1c4fd] text-[#4b2e83]'
                    : 'mr-auto bg-gradient-to-r from-[#fff1eb] to-[#ace0f9] text-[#2d5c7f] border border-blue-100'
                }`}
                style={msg.role === 'assistant' ? {maxHeight: '8em', overflowY: 'auto'} : {}}
              >
                {msg.content}
              </div>
            ))}
            {loading && <div className="text-gray-400">AI is typing...</div>}
          </div>
          <form onSubmit={sendMessage} className="flex gap-2 p-2 border-t bg-white rounded-b-2xl">
            <input
              className="flex-1 border border-blue-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 text-base"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:from-pink-600 hover:to-indigo-600 transition"
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
