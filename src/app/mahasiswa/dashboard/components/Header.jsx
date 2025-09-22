"use client";

import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const gradients = [
  "bg-gradient-to-br from-blue-400 to-indigo-500",
  "bg-gradient-to-br from-pink-400 to-red-500",
  "bg-gradient-to-br from-green-400 to-lime-500",
  "bg-gradient-to-br from-purple-400 to-pink-500",
];

const iconOptions = ["fa-cat", "fa-heart", "fa-dove", "fa-leaf"]; // cat, heart, bird, flower

export default function Header({ mahasiswa }) {
  const [isVisible, setIsVisible] = useState(false);
  const [bgGradient, setBgGradient] = useState(gradients[0]);
  const [bgIcon, setBgIcon] = useState(iconOptions[0]);
  const [patternPositions, setPatternPositions] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // generate cute pattern grid
    const rows = 6;
    const cols = 12;
    const positions = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions.push({
          top: `${r * (100 / rows)}%`,
          left: `${(c + (r % 2) * 0.5) * (100 / cols)}%`,
          rotate: ((r + c) % 2) * 15 - 7 + "deg",
        });
      }
    }
    setPatternPositions(positions);
  }, []);

  // Badge logic
  let badgeSymbol = "bronze";
  if (mahasiswa.poin >= 100) badgeSymbol = "diamond";
  else if (mahasiswa.poin >= 80) badgeSymbol = "gold";
  else if (mahasiswa.poin >= 50) badgeSymbol = "silver";

  const badgeColor =
    badgeSymbol === "diamond"
      ? "bg-purple-500"
      : badgeSymbol === "gold"
      ? "bg-yellow-400"
      : badgeSymbol === "silver"
      ? "bg-gray-400"
      : "bg-orange-500";

  const badgeIcon = {
    diamond: "fas fa-gem",
    gold: "fas fa-medal",
    silver: "fas fa-award",
    bronze: "fas fa-star",
  };

  // Helper untuk inisial nama
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  return (
    <div
      className={`relative rounded-3xl shadow-2xl overflow-visible transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${bgGradient} p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6`}
    >
      {/* Background cute pattern */}
      {patternPositions.map((pos, index) => (
        <i
          key={index}
          className={`fas ${bgIcon} text-white absolute`}
          style={{
            top: pos.top,
            left: pos.left,
            transform: `rotate(${pos.rotate})`,
            fontSize: "1.2rem",
            opacity: 0.08,
            pointerEvents: "none",
          }}
        ></i>
      ))}

      {/* Profile */}
      <div className="relative z-10 flex-shrink-0">
        {mahasiswa.foto ? (
          <img
            src={mahasiswa.foto}
            alt="Foto Mahasiswa"
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover shadow-xl border-4 border-white transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gray-300 text-white flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold border-4 border-white shadow-xl">
            {getInitials(mahasiswa.name)}
          </div>
        )}
        {/* Badge */}
        <div
          className={`absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 ${badgeColor} rounded-full flex items-center justify-center shadow-md border-2 border-white`}
        >
          <i className={`${badgeIcon[badgeSymbol]} text-white text-sm sm:text-base md:text-lg`}></i>
        </div>
      </div>

      {/* Info */}
      <div className="text-center sm:text-left relative z-10 flex-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
          <i className="fas fa-user-graduate animate-bounce"></i>
          Dashboard Mahasiswa
        </h1>
        <p className="text-xs sm:text-sm text-white mt-1 flex flex-col sm:flex-row items-center gap-1 sm:gap-2 justify-center sm:justify-start">
          <span className="font-semibold">{mahasiswa.name}</span>
          <span className="px-2 py-1 bg-white/30 text-white rounded-full text-xs sm:text-sm font-semibold shadow">
            NIM: {mahasiswa.nim}
          </span>
        </p>
      </div>

      {/* Settings button */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="bg-white/30 text-white px-3 py-1 rounded-lg shadow hover:bg-white/50 transition"
        >
          <i className="fas fa-cog"></i>
        </button>

        {showSettings && (
          <div className="fixed top-16 right-2 sm:right-4 z-50 p-4 bg-white rounded-lg shadow-lg w-64 sm:w-72 max-h-[80vh] overflow-y-auto flex flex-col gap-4">
            {/* Gradients */}
            <div>
              <span className="font-semibold text-gray-700">Pilih Gradient:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {gradients.map((grad, idx) => (
                  <button
                    key={idx}
                    onClick={() => setBgGradient(grad)}
                    className={`
        ${grad} w-10 h-10 rounded-full border-2 shadow
        ${bgGradient === grad ? "border-blue-500 ring-2 ring-blue-300" : "border-white"}
        transition-all
      `}
                  ></button>
                ))}
              </div>
            </div>

            {/* Icons */}
            <div>
              <span className="font-semibold text-gray-700 mt-2 block">Pilih Icon:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {iconOptions.map((icon, idx) => (
                  <button
                    key={idx}
                    onClick={() => setBgIcon(icon)}
                    className={`
        w-10 h-10 rounded flex items-center justify-center shadow
        ${bgIcon === icon ? "bg-blue-100 border-2 border-blue-500 ring-2 ring-blue-300 text-blue-700" : "bg-gray-200 text-gray-800 border-none"}
        transition-all
      `}
                  >
                    <i className={`fas ${icon}`}></i>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
