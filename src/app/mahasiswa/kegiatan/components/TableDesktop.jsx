"use client";
import React from "react";

export default function TableDesktop({
  currentClaims,
  startIndex,
  statusColors,
  openDetailModalDesktop,
}) {
  const handleDetailClick = (claim) => {
    // Semua perangkat → buka modal, tidak ada lagi window.open
    openDetailModalDesktop(claim);
  };

  return (
    <div className="hidden lg:block overflow-x-auto rounded-xl shadow-lg border border-gray-100">
      <table className="w-full text-left text-sm">
        <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <tr>
            <th className="px-4 py-3 font-medium">No</th>
            <th className="px-4 py-3 font-medium">Tgl Pengajuan</th>
            <th className="px-4 py-3 font-medium">Jenis Kegiatan</th>
            <th className="px-4 py-3 font-medium">Tgl Pelaksanaan</th>
            <th className="px-4 py-3 font-medium text-center">Status BEM</th>
            <th className="px-4 py-3 font-medium text-center">
              Status Kemahasiswaan
            </th>
            <th className="px-4 py-3 font-medium text-center">Bukti</th>
            <th className="px-4 py-3 font-medium text-center">Poin</th>
            <th className="px-4 py-3 font-medium text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentClaims && currentClaims.length > 0 ? (
            currentClaims.map((claim, idx) => (
              <tr
                key={idx}
                className="hover:bg-blue-50/60 transition-colors duration-150"
              >
                <td className="px-4 py-3 font-medium text-gray-700">
                  {startIndex + idx + 1}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {claim.informasi_kegiatan?.tanggal_pengajuan || "-"}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {claim.informasi_kegiatan?.jenis_kegiatan || "-"}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {claim.informasi_kegiatan?.tanggal_pelaksanaan || "-"}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[claim.informasi_kegiatan?.status_bem] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {claim.informasi_kegiatan?.status_bem || "-"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[
                        claim.informasi_kegiatan?.status_kemahasiswaan
                      ] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {claim.informasi_kegiatan?.status_kemahasiswaan || "-"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {claim.informasi_kegiatan?.bukti ? (
                    <span className="text-blue-600">Tersedia</span>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-4 py-3 text-center text-gray-700">
                  {claim.informasi_kegiatan?.poin || "-"}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-xs hover:bg-blue-200 flex items-center justify-center transition-colors shadow-sm"
                    onClick={() => handleDetailClick(claim)}
                  >
                    <i className="fas fa-info-circle mr-1"></i> Detail
                  </button>
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
  );
}
