import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="text-center space-y-6">
        {/* Animated Wrench Icon */}
        <div className="flex items-center justify-center">
          <div className="relative w-20 h-20">
            {/* Outer Spinning Circle */}
            <div className="absolute w-20 h-20 border-4 border-gray-400 border-dashed rounded-full animate-spin"></div>
            {/* Inner Static Circle */}
            <div className="absolute w-14 h-14 bg-gray-600 rounded-full flex items-center justify-center text-white">
              🛠️
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl font-bold text-gray-700">
          We're Under Maintenance
        </h1>

        {/* Subtext */}
        <p className="text-lg text-gray-600">
          We're working hard to bring you a better experience. Please check back
          soon!
        </p>

        {/* Animated Progress Bar */}
        <div className="w-64 mx-auto h-3 bg-gray-300 rounded-full overflow-hidden relative">
          <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-loading-bar"></div>
        </div>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-500 hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
