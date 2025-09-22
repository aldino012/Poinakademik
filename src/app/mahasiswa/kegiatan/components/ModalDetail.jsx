"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserDetailModal({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  const statusColors = {
    Terverifikasi: "bg-green-100 text-green-700 border border-green-200",
    Revisi: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    "Belum Terverifikasi": "bg-red-100 text-red-700 border border-red-200",
  };

  const kegiatan = data.informasi_kegiatan;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col"
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b bg-white rounded-t-2xl">
              <h2 className="text-base md:text-lg font-semibold text-gray-800 flex items-center gap-2">
                <i className="fas fa-clipboard-list text-blue-600"></i>
                Detail Kegiatan Mahasiswa
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            {/* Konten */}
            <div className="p-4 space-y-5 text-sm text-gray-700">
              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">
                      <i className="fas fa-calendar-alt text-blue-600 mr-2"></i>
                      Tanggal Pengajuan:
                    </span>{" "}
                    {kegiatan.tanggal_pengajuan}
                  </p>
                  <p>
                    <span className="font-semibold">
                      <i className="fas fa-calendar-check text-blue-600 mr-2"></i>
                      Tanggal Pelaksanaan:
                    </span>{" "}
                    {kegiatan.tanggal_pelaksanaan}
                  </p>
                  <p>
                    <span className="font-semibold">
                      <i className="fas fa-tag text-blue-600 mr-2"></i>
                      Jenis Kegiatan:
                    </span>{" "}
                    {kegiatan.jenis_kegiatan}
                  </p>
                </div>

                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">
                      <i className="fas fa-university text-blue-600 mr-2"></i>
                      Status BEM:
                    </span>{" "}
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[kegiatan.status_bem]
                      }`}
                    >
                      <i className="fas fa-circle text-[8px]"></i>
                      {kegiatan.status_bem}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">
                      <i className="fas fa-user-graduate text-blue-600 mr-2"></i>
                      Status Kemahasiswaan:
                    </span>{" "}
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[kegiatan.status_kemahasiswaan]
                      }`}
                    >
                      <i className="fas fa-circle text-[8px]"></i>
                      {kegiatan.status_kemahasiswaan}
                    </span>
                  </p>
                </div>
              </div>

              {/* Poin */}
              <div className="flex items-center gap-3 bg-blue-50 rounded-xl px-3 py-2 shadow-inner">
                <i className="fas fa-star text-blue-600 text-lg"></i>
                <p className="font-semibold">Poin Diperoleh:</p>
                <span className="text-lg font-bold text-gray-800">
                  {kegiatan.poin}
                </span>
              </div>

              {/* Bukti PDF */}
              {kegiatan.bukti && (
                <div className="bg-gray-50 p-3 rounded-xl shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <i className="fas fa-file-pdf text-red-600"></i>
                    Bukti Kegiatan
                  </h4>
                  <div className="w-full h-[55vh] border rounded-lg shadow-sm overflow-hidden">
                    <iframe
                      src={`${kegiatan.bukti}#view=FitH&scrollbar=1`}
                      title="Bukti Kegiatan"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end p-3 border-t bg-white rounded-b-2xl">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
