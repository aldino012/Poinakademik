"use client";

import React from "react";
import TableMhs from "./components/TableMhs";

export default function MahasiswaPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* Header halaman yang lebih clean */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-3 mb-2">
          <i className="fas fa-user-graduate text-blue-600"></i>
          Data Mahasiswa
        </h1>
        <p className="text-gray-600 text-sm">
          Kelola data mahasiswa dan informasi poin yang terkumpul
        </p>
      </div>

      {/* Table mahasiswa - komponen utama */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <TableMhs />
      </div>

      {/* Info tambahan yang lebih minimalis */}
      <div className="text-sm text-gray-600 bg-blue-50/50 border border-blue-100 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <i className="fas fa-info-circle text-blue-500 mt-0.5"></i>
          <div>
            <p className="font-medium text-blue-800 mb-1">Informasi Status</p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="inline-flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Terverifikasi
              </span>
              <span className="inline-flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                Belum Terverifikasi
              </span>
              <span className="inline-flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                Perlu Revisi
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
