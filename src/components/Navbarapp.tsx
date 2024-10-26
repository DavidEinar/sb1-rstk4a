import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './Navbar';

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
