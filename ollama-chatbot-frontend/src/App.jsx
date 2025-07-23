import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChatSidebar from './components/ChatSidebar'
import ChatWindow from './components/ChatWindow'
import { Github } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { Code } from 'lucide-react';

function App() {
  return (
    <div className="flex h-screen">
      <Router>
        <ChatSidebar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col flex-1 h-full bg-slate-800">
                <div className="flex items-center justify-between p-4 border-b border-gray-700 text-white">
                  <div className="text-lg font-semibold">ChatBot</div>
                  <div className="flex space-x-4">
                    <a href="https://github.com/mallicksoumik1711" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-400">
                      <Github />
                    </a>
                    <a href="https://www.linkedin.com/in/soumik-mallick-82b951222/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-400">
                      <Linkedin />
                    </a>
                    <a href="https://leetcode.com/u/mallicksoumik1/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-400">
                      <Code />
                    </a>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center text-gray-400">
                  Select a chat to start messaging
                </div>
              </div>
            }
          />
          <Route path="/chat/:chatId" element={<ChatWindow />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
