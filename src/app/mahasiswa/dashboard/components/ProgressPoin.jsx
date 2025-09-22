"use client";

import React from "react";

export default function ProgressPoin({ mahasiswa, targetPoin = 100 }) {
  const progress = Math.min((mahasiswa.poin / targetPoin) * 100, 100);

  // Gradient progress bar selalu bernuansa biru → indigo
  const gradient = "from-blue-400 via-blue-500 to-indigo-600";

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 transition-all duration-700">
      {/* Judul */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <i className="fas fa-chart-line text-blue-600"></i>
        <span>Progress Poin</span>
      </h2>

      <div className="relative">
        {/* Header Info */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold py-1 px-3 uppercase rounded-full text-blue-600 bg-blue-100">
            Poin Terkumpul
          </span>
          <span className="text-sm font-bold text-blue-600">
            {progress.toFixed(0)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-6 rounded-full bg-gray-100 overflow-hidden">
          {/* Bar terisi */}
          <div
            className={`h-6 bg-gradient-to-r ${gradient} transition-all duration-1000 ease-out relative`}
            style={{ width: `${progress}%` }}
          >
            {/* Animasi stripes */}
            <div className="absolute inset-0 bg-stripes animate-stripes opacity-30"></div>
          </div>

          {/* Badge poin di atas bar */}
          <div
            className="absolute -top-8 transform -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${progress}%` }}
          >
            <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              {mahasiswa.poin} Poin
            </div>
            <div className="w-1 h-4 bg-blue-600 rounded-b"></div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex justify-end text-sm text-gray-700 mt-4">
          <span>Target: {targetPoin} Poin</span>
        </div>
      </div>

      {/* CSS tambahan */}
      <style jsx>{`
        .bg-stripes {
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.3) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.3) 75%,
            transparent 75%,
            transparent
          );
          background-size: 1rem 1rem;
        }
        @keyframes stripes {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 2rem 0;
          }
        }
        .animate-stripes {
          animation: stripes 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
