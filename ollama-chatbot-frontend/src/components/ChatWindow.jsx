
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChatMessages, sendMessage } from '../services/api';


const ChatWindow = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {

      try {
        const data = await getChatMessages(chatId);
        setMessages(data);
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };
    if (chatId) fetchMessages();
  }, [chatId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const newMessages = await sendMessage(chatId, input);
      setMessages((prev) => [...prev, ...newMessages]);
      setInput('');
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-[#1e293b] text-white">
      {/* Navbar */}
      <div className="px-6 py-4 bg-[#0f172a] border-b border-slate-700 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Ollama Chatbot</h1>
        <span className="text-sm text-slate-400">Powered by gemma:1b</span>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
          >
            <div
              className={`px-4 py-2 rounded-lg inline-block break-words shadow ${msg.role === 'user'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-600 text-white'
                }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-lg bg-slate-600 text-white inline-block animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700 bg-[#0f172a] flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 p-2 rounded-md bg-slate-800 text-white border border-slate-600 resize-none outline-none"
          rows={1}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
