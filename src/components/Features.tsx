import React from 'react';
import { Shield, Zap, FileType2, Lock } from 'lucide-react';

const features = [
  {
    icon: FileType2,
    title: 'Multiple Formats',
    description: 'Convert DOC, DOCX, XLS, XLSX, PPT, PPTX, and images to PDF'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Convert your files in seconds with our optimized engine'
  },
  {
    icon: Shield,
    title: 'High Quality',
    description: 'Maintain the original quality and formatting of your documents'
  },
  {
    icon: Lock,
    title: 'Secure',
    description: 'Your files are processed locally and never uploaded to servers'
  }
];

export function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
      {features.map((feature, index) => (
        <div
          key={index}
          className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors"
        >
          <feature.icon className="h-8 w-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {feature.title}
          </h3>
          <p className="text-sm text-gray-600">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}