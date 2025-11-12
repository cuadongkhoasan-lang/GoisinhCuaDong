import React, { useMemo } from 'react';
import { marked } from 'marked';
import type { ChatMessage as Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  const botMessageContent = useMemo(() => {
    if (isUser) return null;
    marked.setOptions({
      breaks: true, // Render newlines as <br>
    });
    const rawHtml = marked.parse(message.text) as string;
    return { __html: rawHtml };
  }, [isUser, message.text]);

  return (
    <div className={`flex items-end ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl text-sm ${
          isUser
            ? 'bg-pink-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.text}</p>
        ) : (
          <div
            className="bot-content"
            dangerouslySetInnerHTML={botMessageContent!}
          />
        )}
      </div>
      {/* Scoped styles for rendered Markdown content */}
      <style>{`
        .bot-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .bot-content li {
          margin-bottom: 0.25rem;
        }
        .bot-content strong {
          font-weight: 600;
        }
        .bot-content p {
            margin-bottom: 0.5rem;
        }
        .bot-content p:last-child {
            margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default ChatMessage;
