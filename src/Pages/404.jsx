import React from "react";
import { Home, ArrowLeft } from "lucide-react";

/*
  404 Page Component
  This page is shown when the user visits a route that does not exist.
*/

export default function NotFoundPage() {

  // Go back to previous page using browser history
  const handleGoBack = () => {
    window.history.back();
  };

  // Redirect user to home page
  // (If using React Router, this should be replaced with navigate("/"))
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4">
      <div className="text-center text-white">

        {/* ---------- 404 Number ---------- */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] animate-pulse">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] mx-auto rounded-full"></div>
        </div>

        {/* ---------- Message Section ---------- */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
            The page you are looking for might have been removed,
            renamed, or is temporarily unavailable.
          </p>
        </div>

        {/* ---------- Illustration ---------- */}
        <div className="mb-8">
          <div className="w-28 h-28 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
            <div className="text-5xl">🔍</div>
          </div>
        </div>

        {/* ---------- Action Buttons ---------- */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

          {/* Go Back Button */}
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/10"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          {/* Go Home Button */}
          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white rounded-lg hover:scale-105 transition-all duration-200"
          >
            <Home size={18} />
            Home
          </button>
        </div>

      </div>
    </div>
  );
}
