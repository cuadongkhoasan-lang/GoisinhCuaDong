import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage as Message } from '../types';
import ChatMessage from './ChatMessage';
import LoadingIndicator from './LoadingIndicator';
import { QUICK_REPLIES } from '../constants';
import logo from '../assets/logo.svg';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  showQuickReplies: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading, showQuickReplies }) => {
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() && !isLoading) {
      onSendMessage(userInput);
      setUserInput('');
    }
  };
  
  const handleQuickReplyClick = (reply: string) => {
    if (!isLoading) {
      onSendMessage(reply);
    }
  };


  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-pink-500 text-white p-4 flex items-center shadow-md">
        <img
  src={logo}
  alt="Logo Bệnh viện"
  className="h-10 w-10 mr-4 rounded-full bg-white object-cover p-0.5 border border-white"
/>
        <div>
          <h1 className="text-xl font-bold">Tư vấn Gói sinh</h1>
          <p className="text-sm">Bệnh viện Đa khoa Cửa Đông</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 bg-white border-t border-gray-200">
        {showQuickReplies && (
          <div className="flex flex-wrap justify-start gap-2 mb-3">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => handleQuickReplyClick(reply)}
                className="px-4 py-2 text-sm text-pink-600 bg-white border border-pink-300 rounded-full hover:bg-pink-50 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 disabled:bg-pink-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" transform="rotate(90 12 12)" />
            </svg>
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatInterface;
