'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();

    if (!inputText.trim() || disabled) return;

    onSendMessage(inputText.trim());
    setInputText('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  return (
    <div className="sticky bottom-0 bg-white/95 backdrop-blur-lg border-t border-tekweiser-pink-light shadow-lg">
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end space-x-3 bg-white rounded-2xl border border-tekweiser-pink-light shadow-sm focus-within:border-tekweiser-teal focus-within:ring-2 focus-within:ring-tekweiser-teal/20 transition-all">
            <div className="flex-1 min-w-0 p-3">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={disabled ? 'TekBot is typing...' : 'Type your message...'}
                disabled={disabled}
                rows={1}
                className="w-full py-2 bg-transparent border-0 resize-none outline-none placeholder-tekweiser-gray-blue text-tekweiser-navy text-sm leading-relaxed disabled:opacity-50"
                style={{ maxHeight: '120px' }}
              />
            </div>
            <div className="p-3">
              <button
                type="submit"
                disabled={!inputText.trim() || disabled}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  inputText.trim() && !disabled
                    ? 'bg-gradient-to-r from-tekweiser-teal via-tekweiser-navy to-tekweiser-burgundy text-white shadow-md hover:shadow-lg hover:scale-105'
                    : 'bg-tekweiser-pink-light text-tekweiser-gray-blue cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-xs text-tekweiser-gray-blue mt-2 ml-1">
            Press Enter to send, Shift + Enter for new line
          </p>
        </form>

        <div className="flex flex-wrap gap-2 mt-3">
          {[
            'What services does Tekweiser offer?',
            'What is the importance of a good website according to Tekweiser?',
            'How can I contact the Tekweiser team?',
            'How does Tekweiser ensure customer satisfaction?',
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => !disabled && onSendMessage(suggestion)}
              disabled={disabled}
              className="px-3 py-1.5 text-xs bg-tekweiser-pink-light hover:bg-tekweiser-pink-lighter text-tekweiser-navy rounded-full border border-tekweiser-pink-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}