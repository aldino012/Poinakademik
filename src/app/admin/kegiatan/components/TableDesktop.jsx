"use client";
import React from "react";
export default function TableDesktop({
  currentClaims,
  startIndex,
  statusColors,
  openDetailModal,
  handleDelete,
}) {
  // Fungsi handle klik detail
  const handleDetailClick = (claim) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      // Mobile → buka dummy.pdf di tab baru
      window.open("/dumy.pdf", "_blank");
    } else {
      // Desktop → buka modal detail
      openDetailModal(claim);
    }
  };
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
          {/* Header */}
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
                <i className="fas fa-calendar-alt mr-2 text-sm"></i>Pengajuan
              </th>
              <th className="px-4 py-3 font-medium">
                <i className="fas fa-calendar-check mr-2 text-sm"></i>Pelaksanaan
              </th>
              <th className="px-4 py-3 font-medium">
                <i className="fas fa-list-alt mr-2 text-sm"></i>Kegiatan
              </th>
              <th className="px-4 py-3 font-medium text-center">
                <i className="fas fa-clipboard-list mr-2 text-sm"></i>Status
              </th>
              <th className="px-4 py-3 font-medium text-center">
                <i className="fas fa-cogs mr-2 text-sm"></i>Aksi
              </th>
            </tr>
          </thead>
          {/* Body */}
          <tbody className="divide-y divide-gray-200">
            {currentClaims && currentClaims.length > 0 ? (
              currentClaims.map((claim, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-blue-50/60 transition-colors duration-150 animate-slide-in"
                  style={{ 
                    animationDelay: `${idx * 0.1}s`,
                  }}
                >
                  {/* No */}
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {startIndex + idx + 1}
                  </td>
                  {/* NIM */}
                  <td className="px-4 py-3 font-mono text-gray-900">
                    {claim.identitas_mahasiswa?.nim || "-"}
                  </td>
                  {/* Nama */}
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {claim.identitas_mahasiswa?.nama || "-"}
                  </td>
                  {/* Prodi */}
                  <td className="px-4 py-3 text-gray-700">
                    {claim.identitas_mahasiswa?.program_studi || "-"}
                  </td>
                  {/* Pengajuan */}
                  <td className="px-4 py-3 text-gray-700">
                    {claim.informasi_kegiatan?.tanggal_pengajuan || "-"}
                  </td>
                  {/* Pelaksanaan */}
                  <td className="px-4 py-3 text-gray-700">
                    {claim.informasi_kegiatan?.tanggal_pelaksanaan || "-"}
                  </td>
                  {/* Kegiatan */}
                  <td className="px-4 py-3 text-gray-700">
                    {claim.informasi_kegiatan?.kode_kegiatan || "-"}
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[claim.informasi_kegiatan?.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {claim.informasi_kegiatan?.status || "-"}
                    </span>
                  </td>
                  {/* Aksi */}
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-center">
                      {/* Detail */}
                      <button
                        type="button"
                        className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-xs hover:bg-blue-200 flex items-center transition-colors shadow-sm"
                        onClick={() => handleDetailClick(claim)}
                      >
                        <i className="fas fa-info-circle mr-1"></i> Detail
                      </button>
                      {/* Edit */}
                      <button
                        type="button"
                        className="bg-amber-100 text-amber-700 px-3 py-2 rounded-lg text-xs hover:bg-amber-200 flex items-center transition-colors shadow-sm"
                      >
                        <i className="fas fa-edit mr-1"></i> Edit
                      </button>
                      {/* Hapus */}
                      <button
                        type="button"
                        onClick={() => handleDelete(claim)}
                        className="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-xs hover:bg-red-200 flex items-center transition-colors shadow-sm"
                      >
                        <i className="fas fa-trash-alt mr-1"></i> Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-gray-500 py-6 italic">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}