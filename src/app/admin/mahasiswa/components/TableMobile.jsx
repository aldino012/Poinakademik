"use client";
import React from "react";
export default function TableMobile({ 
  students, 
  openDetail, 
  openCetak,
  onEdit,
  onDelete
}) {
  return (
    <>
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideInLeft 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      <div className="lg:hidden p-4 space-y-4">
        {students.map((student, idx) => (
          <div
            key={student.id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md bg-white animate-slide-in"
            style={{ 
              animationDelay: `${idx * 0.1}s`,
            }}
          >
            {/* Header nama dan prodi */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800 text-lg">
                {student.name}
              </h3>
              <span className="text-xs text-gray-500 font-medium">
                {student.prodi}
              </span>
            </div>
            {/* Detail mahasiswa */}
            <div className="text-sm text-gray-600 space-y-1 mb-3">
              <p>
                <span className="font-medium">NIM:</span> {student.nim}
              </p>
              <p>
                <span className="font-medium">Poin:</span> {student.poin}
              </p>
            </div>
            {/* Tombol aksi */}
            <div className="grid grid-cols-2 gap-2">
              {/* Detail */}
              <button
                className="flex items-center justify-center w-full bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                onClick={() => openDetail(student)}
              >
                <i className="fas fa-info-circle mr-2"></i> Detail
              </button>
              {/* Cetak */}
              <button
                className="flex items-center justify-center w-full bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
                onClick={() => openCetak(student)}
              >
                <i className="fas fa-print mr-2"></i> Cetak CV
              </button>
              {/* Edit */}
              <button
                className="flex items-center justify-center w-full bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-yellow-600 transition-colors"
                onClick={() => onEdit(student)}
              >
                <i className="fas fa-edit mr-2"></i> Edit
              </button>
              {/* Hapus */}
              <button
                className="flex items-center justify-center w-full bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors"
                onClick={() => onDelete(student)}
              >
                <i className="fas fa-trash-alt mr-2"></i> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}