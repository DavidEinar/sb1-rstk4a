import React from 'react';
import { X, Settings as SettingsIcon } from 'lucide-react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  quality: 'standard' | 'high';
  onQualityChange: (quality: 'standard' | 'high') => void;
}

export function Settings({ isOpen, onClose, quality, onQualityChange }: SettingsProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <SettingsIcon className="h-4 w-4 text-gray-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-4">
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    Conversion Quality
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="quality"
                        value="standard"
                        checked={quality === 'standard'}
                        onChange={() => onQualityChange('standard')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Standard</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="quality"
                        value="high"
                        checked={quality === 'high'}
                        onChange={() => onQualityChange('high')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">High Quality</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}