'use client';

import { useEffect, useState } from 'react';
import { Message } from '@/app/page';
import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === 'user';
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const ts = new Date(message.timestamp);
    const formatter = new Intl.DateTimeFormat([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    setTimeString(formatter.format(ts));
  }, [message.timestamp]);

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
    >
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`relative px-4 py-3 rounded-2xl shadow-sm ${
            isUser
              ? 'bg-gradient-to-br from-tekweiser-teal via-tekweiser-navy to-tekweiser-burgundy text-white rounded-br-md'
              : 'bg-white text-tekweiser-navy rounded-bl-md border border-tekweiser-pink-light'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.text}
          </p>

          <p
            className={`text-xs mt-2 ${
              isUser ? 'text-white/70' : 'text-tekweiser-gray-blue'
            }`}
          >
            {timeString}
          </p>

          <div
            className={`absolute bottom-0 w-3 h-3 ${
              isUser
                ? 'right-0 translate-x-1 bg-gradient-to-br from-tekweiser-teal via-tekweiser-navy to-tekweiser-burgundy'
                : 'left-0 -translate-x-1 bg-white border-l border-b border-tekweiser-pink-light'
            } rotate-45`}
          ></div>
        </div>

        <div
          className={`flex items-center mt-2 space-x-2 ${
            isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isUser
                ? 'bg-gradient-to-br from-tekweiser-gray-blue to-tekweiser-olive'
                : 'bg-gradient-to-br from-tekweiser-teal via-tekweiser-navy to-tekweiser-burgundy'
            }`}
            aria-label={isUser ? 'User icon' : 'Bot icon'}
          >
            {isUser ? (
              <User className="w-3 h-3 text-white" />
            ) : (
              <Bot className="w-3 h-3 text-white" />
            )}
          </div>
          <span className="text-xs text-tekweiser-gray-blue font-medium">
            {isUser ? 'You' : 'TekBot'}
          </span>
        </div>
      </div>
    </div>
  );
}
