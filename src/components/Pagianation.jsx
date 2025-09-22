"use client";

import React from "react";

export default function TablePagination({
  currentPage = 1,
  setCurrentPage = () => {},
  filteredCount = 0,
  itemsPerPage = 10,
}) {
  // Hitung totalPages dari filteredCount dan itemsPerPage
  const totalPages = Math.ceil(filteredCount / itemsPerPage);

  // Hitung startIndex & endIndex
  const startIndex =
    filteredCount === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredCount);

  // Buat array nomor halaman
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  if (filteredCount === 0) return null; // tidak render pagination jika kosong

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 bg-white rounded-xl shadow-sm border mt-4">
      {/* Info jumlah data */}
      <p className="text-xs md:text-sm text-gray-600">
        Menampilkan {startIndex} - {endIndex} dari {filteredCount} data
      </p>

      {/* Navigasi halaman */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* Tombol Prev */}
        <button
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border shadow-sm transition ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {/* Nomor halaman (mobile: hanya currentPage ±1, desktop: semua) */}
        <div className="flex gap-1 md:gap-2">
          {/* Mobile */}
          <div className="flex sm:hidden gap-1">
            {pageNumbers
              .filter(
                (num) =>
                  num === currentPage ||
                  num === currentPage - 1 ||
                  num === currentPage + 1
              )
              .map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border shadow-sm transition ${
                    currentPage === num
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {num}
                </button>
              ))}
          </div>

          {/* Desktop */}
          <div className="hidden sm:flex gap-1 md:gap-2">
            {pageNumbers.map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border shadow-sm transition ${
                  currentPage === num
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Tombol Next */}
        <button
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border shadow-sm transition ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
