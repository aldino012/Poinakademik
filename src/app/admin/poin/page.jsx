"use client";

import React from "react";
import MasterPoint from "../../../components/MasterPoint"; // komponen utama tabel
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function MasterPointAdminPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Halaman */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <i className="fas fa-star text-blue-600"></i> Master Point
        </h1>
        <p className="text-sm text-gray-600">
          Daftar lengkap jenis kegiatan mahasiswa beserta kode, kategori,
          posisi/tingkatan, dan bobot poin yang sesuai. Data ini digunakan
          sebagai acuan dalam verifikasi kegiatan akademik maupun non-akademik.
        </p>
      </div>

      {/* Konten Utama */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        {/* Admin punya tombol tambah, edit, hapus */}
        <MasterPoint role="admin" />
      </div>
    </div>
  );
}
