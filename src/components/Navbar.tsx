import React from 'react';
import { Settings, History, Home } from 'lucide-react';

interface NavbarProps {
  onHomeClick: () => void;
  onHistoryClick: () => void;
  onSettingsClick: () => void;
}

export function Navbar({ onHomeClick, onHistoryClick, onSettingsClick }: NavbarProps) {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900"></span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onHomeClick}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Home className="h-5 w-5" />
            </button>
            <button
              onClick={onHistoryClick}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <History className="h-5 w-5" />
            </button>
            <button
              onClick={onSettingsClick}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
