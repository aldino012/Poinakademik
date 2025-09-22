"use client";
import React from "react";
export default function TableDesktop({ 
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
      <div className="hidden lg:block overflow-x-auto rounded-xl shadow-lg border border-gray-100">
        <table className="w-full text-left text-sm">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <tr>
              <th className="px-4 py-3 font-medium">
                <i className="fas fa-hashtag mr-2 text-sm"></i>No
              </th>
              <th className="px-4 py-3 font-medium">
                <i className="fas fa-id-card mr-2 text-sm"></i>NIM
              </th>
              <th className="px-4 py-3 font-medium">
                <i className="fas fa-user mr-2 text-sm"></i>Nama
              </th>
              <th className="px-4 py-3 font-medium">
                <i className="fas fa-graduation-cap mr-2 text-sm"></i>Prodi
              </th>
              <th className="px-4 py-3 font-medium">
                <i className="fas fa-star mr-2 text-sm"></i>Total Poin
              </th>
              <th className="px-4 py-3 font-medium">
                <i className="fas fa-cogs mr-2 text-sm"></i>Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student, idx) => (
              <tr
                key={student.id}
                className="hover:bg-blue-50/60 transition-colors duration-150 animate-slide-in"
                style={{ 
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                <td className="px-4 py-3 font-medium text-gray-700">{idx + 1}</td>
                <td className="px-4 py-3 font-mono text-gray-900">
                  {student.nim}
                </td>
                <td className="px-4 py-3 font-semibold text-gray-900">
                  {student.name}
                </td>
                <td className="px-4 py-3 text-gray-700">{student.prodi}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <i className="fas fa-star mr-1 text-xs"></i>
                    {student.poin} Poin
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {/* Detail */}
                    <button
                      className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-xs hover:bg-blue-200 flex items-center transition-colors shadow-sm"
                      onClick={() => openDetail(student)}
                    >
                      <i className="fas fa-info-circle mr-1"></i> Detail
                    </button>
                    {/* Edit */}
                    <button
                      className="bg-amber-100 text-amber-700 px-3 py-2 rounded-lg text-xs hover:bg-amber-200 flex items-center transition-colors shadow-sm"
                      onClick={() => onEdit(student)}
                    >
                      <i className="fas fa-edit mr-1"></i> Edit
                    </button>
                    {/* Hapus */}
                    <button
                      className="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-xs hover:bg-red-200 flex items-center transition-colors shadow-sm"
                      onClick={() => onDelete(student)}
                    >
                      <i className="fas fa-trash-alt mr-1"></i> Hapus
                    </button>
                    {/* Cetak */}
                    <button
                      className="bg-green-100 text-green-700 px-3 py-2 rounded-lg text-xs hover:bg-green-200 flex items-center transition-colors shadow-sm"
                      onClick={() => openCetak(student)}
                    >
                      <i className="fas fa-print mr-1"></i> Cetak
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}