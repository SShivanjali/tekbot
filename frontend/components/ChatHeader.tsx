"use client";

import { Bot, Wifi, Info } from "lucide-react";
import { useState } from "react";

export default function ChatHeader() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-lg border-b border-tekweiser-pink-light shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Profile Avatar with Online Status */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-tekweiser-teal via-tekweiser-navy to-tekweiser-burgundy rounded-full flex items-center justify-center shadow-lg ring-2 ring-tekweiser-pink-light">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm">
                <div className="w-full h-full bg-emerald-500 rounded-full animate-pulse-green"></div>
              </div>
            </div>

            {/* Bot Info */}
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-tekweiser-navy leading-tight">
                TekBot
              </h1>
              <p className="text-sm text-tekweiser-gray-blue font-medium">
                Tekweiser AI Assistant
              </p>
            </div>
          </div>

          {/* Connection Status & Info Icon */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-200">
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">
                Connected
              </span>
            </div>

            <div className="relative group">
              <button
                onClick={() => setShowPopup(!showPopup)}
                className="p-2 text-tekweiser-gray-blue hover:text-tekweiser-navy hover:bg-tekweiser-pink-light rounded-lg transition-colors"
              >
                <Info className="w-4 h-4" />
              </button>
              <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition z-50">
                Know about me
              </span>

              {showPopup && (
                <div className="absolute right-0 mt-2 w-64 bg-white p-4 shadow-lg rounded-lg border z-50">
                  <h2 className="text-lg font-semibold mb-2">Creators</h2>
                  <p className="text-sm text-gray-700">
                    This chatbot was created by <strong>Shivanjali</strong> and{" "}
                    <strong>Milonee</strong> as part of Tekweiser’s AI assistant
                    project.
                  </p>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="mt-3 text-sm text-blue-500 hover:underline"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
