import { useState, useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router'
import { Footer, Header } from './components'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Hide splash screen after animation
      setTimeout(() => {
        setShowSplash(false);
      }, 800); // Extra time for fade out animation
    }, 2500); // Show splash for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Splash Screen Component
  if (showSplash) {
    return (
      <div className={`fixed inset-0 z-50 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center transition-opacity duration-800 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-6">
          {/* Logo Animation */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300">
                <svg className="w-14 h-14 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              {/* Pulse rings */}
              <div className="absolute inset-0 w-24 h-24 bg-white rounded-2xl animate-ping opacity-20"></div>
              <div className="absolute -inset-2 w-28 h-28 bg-white rounded-2xl animate-ping opacity-10 animation-delay-1000"></div>
            </div>
          </div>

          {/* Brand Name with Animation */}
          <div className="mb-4">
            <h1 className="text-5xl font-bold text-white mb-2 animate-fade-in-up">
              NoteHub
            </h1>
            <p className="text-blue-100 text-xl animate-fade-in-up animation-delay-500">
              Your note-taking companion
            </p>
          </div>

          {/* Loading Animation */}
          <div className="mt-12 animate-fade-in-up animation-delay-1000">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="flex space-x-2 mb-4">
                  <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-200"></div>
                  <div className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-400"></div>
                </div>
                <p className="text-blue-100 text-sm font-medium">Preparing your workspace...</p>
              </div>
            ) : (
              <div className="flex items-center justify-center text-white">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg font-medium">Ready!</span>
              </div>
            )}
          </div>

          {/* Welcome Message */}
          <div className="mt-8 animate-fade-in-up animation-delay-1500">
            <p className="text-blue-100 text-sm max-w-md mx-auto leading-relaxed">
              Welcome to your digital note-taking space. Organize thoughts, capture ideas, and never lose track of what matters.
            </p>
          </div>
        </div>

        {/* Bottom Branding */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-blue-200 text-xs animate-fade-in animation-delay-2000">
            Made with ❤️ for better note-taking
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <Header />
      <main className="flex-1 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Main content */}
        <div className="relative z-10 min-h-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
