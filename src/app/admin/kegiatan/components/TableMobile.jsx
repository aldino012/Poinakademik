"use client";
import React from "react";

export default function TableMobile({
  currentClaims = [],
  startIndex = 0,
  handleDelete = () => {},
  statusColors = {},
  openDetailModal = () => {}, // ✅ fungsi buka modal
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
        {currentClaims.length > 0 ? (
          currentClaims.map((claim, idx) => {
            const status = claim.informasi_kegiatan?.status || "-";
            const statusClass =
              statusColors?.[status] ?? "bg-gray-100 text-gray-700";

            return (
              <div
                key={idx}
                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-all bg-white animate-slide-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Header Nama & Prodi */}
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-900 text-base">
                    {claim.identitas_mahasiswa?.nama || "-"}
                  </h4>
                  <span className="text-xs text-gray-500 font-medium">
                    {claim.identitas_mahasiswa?.program_studi || "-"}
                  </span>
                </div>

                {/* NIM */}
                <p className="text-xs text-gray-600 mt-1">
                  <i className="fas fa-id-card mr-1"></i>
                  NIM:{" "}
                  <span className="font-mono">
                    {claim.identitas_mahasiswa?.nim || "-"}
                  </span>
                </p>

                {/* Informasi kegiatan */}
                <div className="mt-2 space-y-1 text-xs text-gray-600">
                  <p>
                    <i className="fas fa-calendar-alt mr-1"></i>
                    Pengajuan:{" "}
                    {claim.informasi_kegiatan?.tanggal_pengajuan || "-"}
                  </p>
                  <p>
                    <i className="fas fa-calendar-check mr-1"></i>
                    Pelaksanaan:{" "}
                    {claim.informasi_kegiatan?.tanggal_pelaksanaan || "-"}
                  </p>
                  <p>
                    <i className="fas fa-list-alt mr-1"></i>
                    Kegiatan: {claim.informasi_kegiatan?.kode_kegiatan || "-"}
                  </p>
                </div>

                {/* Status */}
                <div className="mt-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusClass}`}
                  >
                    {status}
                  </span>
                </div>

                {/* Tombol aksi */}
                <div className="flex flex-col gap-2 mt-3">
                  {/* ✅ Detail (Mobile → Modal) */}
                  <button
                    type="button"
                    onClick={() => openDetailModal(claim)}
                    className="w-full bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-xs hover:bg-blue-200 flex items-center justify-center shadow-sm"
                  >
                    <i className="fas fa-info-circle mr-1"></i> Detail
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    className="w-full bg-amber-100 text-amber-700 px-3 py-2 rounded-lg text-xs hover:bg-amber-200 flex items-center justify-center shadow-sm"
                  >
                    <i className="fas fa-edit mr-1"></i> Edit
                  </button>

                  {/* Hapus */}
                  <button
                    type="button"
                    onClick={() => handleDelete(claim)}
                    className="w-full bg-red-100 text-red-700 px-3 py-2 rounded-lg text-xs hover:bg-red-200 flex items-center justify-center shadow-sm"
                  >
                    <i className="fas fa-trash-alt mr-1"></i> Hapus
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-6 italic">
            Tidak ada data ditemukan.
          </div>
        )}
      </div>
    </>
  );
}
