import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900 tracking-tight mb-6">
        Convert any file to PDF
        <br />
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          in seconds
        </span>
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Transform your documents into professional PDFs with our powerful conversion tool.
        Support for Word, Excel, PowerPoint, Images, and more.
      </p>
      <div className="flex items-center justify-center gap-4 mb-12">
        <div className="flex items-center text-sm text-gray-600">
          <FileText className="h-4 w-4 mr-1" />
          Multiple formats supported
        </div>
        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
        <div className="flex items-center text-sm text-gray-600">
          <ArrowRight className="h-4 w-4 mr-1" />
          Instant conversion
        </div>
        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
        <div className="text-sm text-gray-600">
          100% secure
        </div>
      </div>
    </div>
  );
}