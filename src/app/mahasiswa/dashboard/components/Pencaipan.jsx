"use client";

import React, { useState } from "react";

export default function Pencapaian({ mahasiswa }) {
  const [mode, setMode] = useState("activities"); // activities atau competitions

  const activities = mahasiswa.activities || [];
  const competitions = mahasiswa.competitions || [];

  // Pilih data sesuai mode
  const data = mode === "activities" ? activities : competitions;

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 transition-all duration-700">
      {/* Tombol mode */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setMode("activities")}
          className={`px-4 py-2 rounded-full font-semibold transition ${
            mode === "activities"
              ? "bg-yellow-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Activities
        </button>
        <button
          onClick={() => setMode("competitions")}
          className={`px-4 py-2 rounded-full font-semibold transition ${
            mode === "competitions"
              ? "bg-yellow-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Competitions
        </button>
      </div>

      {/* Judul */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-10 flex items-center gap-3 justify-center">
        <i
          className={`fas ${
            mode === "activities" ? "fa-running" : "fa-medal"
          } text-yellow-500 text-2xl`}
        ></i>
        <span>
          {mode === "activities"
            ? "Kegiatan Terbaru Semester Ini"
            : "Kompetisi Terbaru"}
        </span>
      </h2>

      {/* Jika tidak ada data */}
      {data.length === 0 ? (
        <p className="text-center text-gray-500 text-sm sm:text-base">
          Tidak ada {mode === "activities" ? "kegiatan" : "kompetisi"} yang
          terdaftar.
        </p>
      ) : (
        <div
          className={`relative flex flex-col md:flex-row justify-center items-center gap-12 md:gap-0 ${
            data.length === 1
              ? "md:justify-center"
              : data.length === 2
              ? "md:justify-around"
              : "md:justify-between"
          }`}
        >
          {/* Garis penghubung hanya jika lebih dari 1 item */}
          {data.length > 1 && (
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-300" />
          )}

          {data.map((item) => {
            const maxPoin = item.maxPoin || 5;
            const itemProgress = Math.min((item.poin / maxPoin) * 100, 100);

            const gradient =
              itemProgress >= 80
                ? "from-yellow-400 via-yellow-500 to-yellow-600"
                : itemProgress >= 50
                ? "from-gray-300 via-yellow-300 to-yellow-400"
                : "from-gray-300 to-gray-400";

            return (
              <div
                key={item.id}
                className="relative flex flex-col items-center text-center w-full md:w-1/3 z-10"
              >
                {/* Trophy / Medal container */}
                <div className="relative">
                  <div
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${gradient} shadow-xl flex items-center justify-center border-4 border-white
                  transform transition-all duration-500 hover:scale-110 hover:rotate-6 hover:shadow-[0_0_25px_rgba(255,215,0,0.8)]`}
                  >
                    <i
                      className={`fas ${
                        mode === "activities" ? "fa-running" : "fa-medal"
                      } text-white text-2xl sm:text-3xl`}
                    ></i>

                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                      <div className="shine" />
                    </div>
                  </div>

                  {/* Badge poin */}
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow">
                    +{item.poin}
                  </div>
                </div>

                {/* Info kegiatan / kompetisi */}
                <div className="mt-5 space-y-1">
                  <p className="text-sm sm:text-base font-semibold text-gray-800">
                    {item.namaKegiatan || item.namaKompetisi}
                  </p>
                  {item.tanggal && (
                    <p className="text-xs text-gray-500">{item.tanggal}</p>
                  )}
                  {item.status && (
                    <p className="text-xs text-gray-500">{item.status}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Shine effect animasi */}
      <style jsx>{`
        .shine {
          position: absolute;
          top: -100%;
          left: -100%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            120deg,
            transparent 30%,
            rgba(255, 255, 255, 0.6) 50%,
            transparent 70%
          );
          transform: rotate(25deg);
          animation: shine-move 4s infinite;
        }

        @keyframes shine-move {
          0% {
            transform: translateX(-150%) rotate(25deg);
          }
          100% {
            transform: translateX(150%) rotate(25deg);
          }
        }
      `}</style>
    </div>
  );
}
