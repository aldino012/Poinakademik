"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useToast } from "@/components/Toats";

export default function DetailKlaimModal({ isOpen, onClose, claim }) {
  const { addToast } = useToast();

  // 🟢 Hooks harus selalu dipanggil
  const [status, setStatus] = useState("Belum Terverifikasi");

  // Update status ketika modal atau claim berubah
  useEffect(() => {
    if (claim?.informasi_kegiatan?.status) {
      setStatus(claim.informasi_kegiatan.status);
    } else {
      setStatus("Belum Terverifikasi");
    }
  }, [claim]);

  if (!isOpen || !claim) return null;

  const mahasiswa = claim.identitas_mahasiswa || {};
  const kegiatan = claim.informasi_kegiatan || {};

  const statusOptions = [
    {
      label: "Terverifikasi",
      value: "Terverifikasi",
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Belum Terverifikasi",
      value: "Belum Terverifikasi",
      color: "bg-red-100 text-red-700",
    },
    {
      label: "Revisi",
      value: "Revisi",
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  const selectedColor =
    statusOptions.find((opt) => opt.value === status)?.color || "bg-gray-100";

  const handleSave = () => {
    addToast({
      message: `Status klaim "${mahasiswa.nama}" berhasil diperbarui menjadi "${status}"`,
      type: "success",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-2 md:p-4 bg-black/40">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-auto max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white rounded-t-2xl z-10">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <i className="fas fa-info-circle text-blue-600"></i>
            Detail Klaim Kegiatan
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Identitas Mahasiswa */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">
              Identitas Mahasiswa
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">NIM:</span> {mahasiswa.nim}
              </p>
              <p>
                <span className="font-medium">Nama:</span> {mahasiswa.nama}
              </p>
              <p>
                <span className="font-medium">Periode:</span>{" "}
                {mahasiswa.periode}
              </p>
              <p>
                <span className="font-medium">Program Studi:</span>{" "}
                {mahasiswa.program_studi}
              </p>
            </div>
          </div>

          {/* Informasi Kegiatan */}
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3">
              Informasi Kegiatan
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Tanggal Pengajuan:</span>{" "}
                {kegiatan.tanggal_pengajuan}
              </p>
              <p>
                <span className="font-medium">Kode Kegiatan:</span>{" "}
                {kegiatan.kode_kegiatan}
              </p>
              <p className="md:col-span-2">
                <span className="font-medium">Rincian Acara:</span>{" "}
                {kegiatan.rincian_acara}
              </p>
              <p>
                <span className="font-medium">Tingkat:</span> {kegiatan.tingkat}
              </p>
              <p>
                <span className="font-medium">Tempat:</span> {kegiatan.tempat}
              </p>
              <p>
                <span className="font-medium">Tanggal Pelaksanaan:</span>{" "}
                {kegiatan.tanggal_pelaksanaan}
              </p>
              <p>
                <span className="font-medium">Mentor:</span> {kegiatan.mentor}
              </p>
              <p>
                <span className="font-medium">Narasumber:</span>{" "}
                {kegiatan.narasumber}
              </p>

              {/* Status */}
              <div className="md:col-span-2 mt-2">
                <label className="font-medium text-gray-700 mb-1 block">
                  Status:
                </label>
                <div className="relative w-full max-w-sm">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`block w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none pr-10 ${selectedColor}`}
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <i className="fa-solid fa-caret-down"></i>
                  </span>
                </div>
              </div>

              {/* Bukti PDF */}
              <div className="md:col-span-2 mt-2">
                <label className="font-medium text-gray-700 mb-1 block">
                  Bukti Poin:
                </label>
                {kegiatan.bukti_poin ? (
                  <iframe
                    src={kegiatan.bukti_poin}
                    className="w-full h-60 border rounded-lg"
                  />
                ) : (
                  <p className="text-sm text-gray-500">Belum ada bukti PDF.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t sticky bottom-0 bg-white rounded-b-2xl gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Tutup
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

DetailKlaimModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  claim: PropTypes.object,
};
