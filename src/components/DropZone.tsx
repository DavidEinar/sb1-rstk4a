import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface DropZoneProps {
  onDrop: (files: File[]) => void;
  file: File | null;
}

export function DropZone({ onDrop, file }: DropZoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-xl p-8 transition-all duration-200
        ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}
        ${file ? 'bg-gray-50' : 'hover:bg-gray-50 hover:border-gray-400'}
      `}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <Upload className={`mx-auto h-12 w-12 ${isDragActive ? 'text-blue-400' : 'text-gray-400'}`} />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? 'Drop your file here...'
            : 'Drag & drop a file here, or click to select'}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Supports PDF, Word, Excel, PowerPoint, and Images
        </p>
      </div>
    </div>
  );
}