import React from 'react';
import { Download, Eye, FileText } from 'lucide-react';

export interface HistoryItem {
  id: string;
  fileName: string;
  timestamp: Date;
  status: 'completed' | 'failed';
  url: string;
  size: number;
  type: string;
}

interface ConversionHistoryProps {
  items: HistoryItem[];
  onPreview: (url: string) => void;
  onDownload: (url: string, fileName: string) => void;
}

export function ConversionHistory({ items, onPreview, onDownload }: ConversionHistoryProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12 px-6">
        <FileText className="h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600 text-sm text-center">
          No conversion history yet. Convert your first file to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {items.map((item) => (
        <div key={item.id} className="p-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-gray-400 mr-2" />
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.fileName}
                </p>
              </div>
              <div className="mt-1 flex items-center text-xs text-gray-500">
                <span>{new Date(item.timestamp).toLocaleString()}</span>
                <span className="mx-1">•</span>
                <span>{formatFileSize(item.size)}</span>
              </div>
            </div>
            <div className="ml-4 flex items-center space-x-2">
              <button
                onClick={() => onPreview(item.url)}
                className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDownload(item.url, item.fileName)}
                className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}