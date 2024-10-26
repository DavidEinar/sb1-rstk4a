import React, { useState, useCallback } from 'react';
import { Download, Eye, FileText, Settings, History as HistoryIcon, X } from 'lucide-react';
import { DropZone } from './components/DropZone';
import { ConversionHistory, HistoryItem } from './components/ConversionHistory';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Settings as SettingsPanel } from './components/Settings';
import { convertToPdf } from './services/converter';
import { ConversionOptions } from './types';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [converting, setConverting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [conversionQuality, setConversionQuality] = useState<'standard' | 'high'>('high');
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const selectedFile = acceptedFiles[0];
      if (!selectedFile) return;

      setFile(selectedFile);
      setConverting(true);
      setProgress(0);
      setError(null);

      // Start progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      // Convert the file
      const options: ConversionOptions = {
        quality: conversionQuality,
        preserveMetadata: true,
      };

      const pdfBlob = await convertToPdf(selectedFile, options);
      const objectUrl = URL.createObjectURL(pdfBlob);

      // Complete the progress
      clearInterval(progressInterval);
      setProgress(100);
      setConverting(false);
      setPreview(objectUrl);

      // Add to history
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setHistory(prev => [{
        id: uniqueId,
        fileName: selectedFile.name,
        timestamp: new Date(),
        status: 'completed',
        url: objectUrl,
        size: pdfBlob.size,
        type: 'application/pdf'
      }, ...prev]);
    } catch (error) {
      console.error('Error processing file:', error);
      setError(error instanceof Error ? error.message : 'Failed to convert file');
      setConverting(false);
      setProgress(0);
      setFile(null);
    }
  }, [conversionQuality]);

  const handlePreview = useCallback((url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  }, []);

  const handleDownload = useCallback((url: string, fileName: string) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName.replace(/\.[^/.]+$/, '') + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      setError('Failed to download file');
    }
  }, []);

  const handleClearFile = useCallback(() => {
    setFile(null);
    setProgress(0);
    setPreview(null);
    setError(null);
  }, []);

  React.useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      history.forEach(item => {
        if (item.url) {
          URL.revokeObjectURL(item.url);
        }
      });
    };
  }, [preview, history]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onHistoryClick={() => setShowHistory(true)} onSettingsClick={() => setShowSettings(true)} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!file && (
          <>
            <Hero />
            <Features />
          </>
        )}

        <div className={`transition-all duration-300 ${file ? 'mt-8' : 'mt-16'}`}>
          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-8">
              {!file && (
                <div className="text-center mb-8">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Convert your files to PDF
                  </h2>
                  <p className="text-gray-600">
                    Drop your files here or click to browse
                  </p>
                </div>
              )}

              <DropZone onDrop={onDrop} file={file} />

              {error && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {file && !error && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">
                        {file.name}
                      </span>
                    </div>
                    <button
                      onClick={handleClearFile}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {preview && !converting && !error && (
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => handlePreview(preview)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </button>
                  <button
                    onClick={() => file && handleDownload(preview, file.name)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                </div>
              )}

              {converting && (
                <div className="mt-6 flex items-center justify-center text-sm text-gray-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600 mr-2" />
                  Converting your document...
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        quality={conversionQuality}
        onQualityChange={setConversionQuality}
      />

      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          showHistory ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <HistoryIcon className="h-4 w-4 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">History</h2>
            </div>
            <button
              onClick={() => setShowHistory(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ConversionHistory
              items={history}
              onPreview={handlePreview}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;