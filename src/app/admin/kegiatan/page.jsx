"use client";

import React from "react";
import TableKlaim from "./components/TableKlaim";

export default function KegiatanPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Card header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-3">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <i className="fas fa-calendar-alt text-blue-600"></i>
          Data Klaim Kegiatan
        </h1>
        <p className="text-gray-600 text-sm">
          Halaman ini berisi daftar klaim kegiatan mahasiswa. Gunakan tabel di
          bawah untuk melihat detail klaim kegiatan dan mengelola aksi seperti
          Detail, Edit, atau Hapus.
        </p>
      </div>

      {/* Table klaim */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <TableKlaim />
      </div>

      {/* Catatan tambahan */}
      <div className="text-sm text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="flex items-center gap-2">
          <i className="fas fa-info-circle text-blue-500"></i>
          Gunakan tombol Detail untuk melihat informasi lebih lengkap tentang
          klaim kegiatan. Tombol Edit dan Hapus digunakan untuk mengelola data
          klaim mahasiswa.
        </p>
      </div>
    </div>
  );
}
