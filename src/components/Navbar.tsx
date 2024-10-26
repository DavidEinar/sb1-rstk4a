import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Settings, History, Home } from 'lucide-react';

// Home component
function HomePage() {
  return <h1 className="text-2xl font-bold m-4">Welcome to the Homepage</h1>;
}

// History component
function HistoryPage() {
  return <h1 className="text-2xl font-bold m-4">History Page</h1>;
}

// Settings component
function SettingsPage() {
  return <h1 className="text-2xl font-bold m-4">Settings Page</h1>;
}

// Navbar component
function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900">My App</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Home className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate('/history')}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <History className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate('/settings')}
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

// Main App component
export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
