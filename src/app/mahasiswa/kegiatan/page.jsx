"use client";

import React from "react";
import TableKegiatanMhs from "./components/KegiatanMhs";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function KegiatanPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Halaman */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-2">
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

      {/* Konten Utama */}
      <div>
        <TableKegiatanMhs />
      </div>

      {/* Catatan tambahan */}
      <div className="text-sm text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p>
          <i className="fas fa-info-circle text-blue-500 mr-2"></i>
          Gunakan tombol Detail untuk melihat informasi lebih lengkap tentang
          klaim kegiatan. Tombol Edit dan Hapus digunakan untuk mengelola data
          klaim mahasiswa.
        </p>
      </div>
    </div>
  );
}
