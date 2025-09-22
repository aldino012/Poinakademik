"use client";
import React from "react";
import PropTypes from "prop-types";

export default function DetailModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-3 md:p-6 bg-black/40">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl border border-gray-200 max-h-[90vh] flex flex-col md:max-h-[85vh] animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-2xl">
          <h3 className="text-xl font-semibold text-white flex items-center gap-3">
            <i className="fas fa-user-graduate"></i>
            Detail Mahasiswa
          </h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/20"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 overflow-y-auto flex-grow bg-gradient-to-b from-white to-blue-50">
          {/* Biodata */}
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <img
                  src={
                    student.foto ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
                  }
                  alt={student.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>
              <div className="flex-1 w-full">
                <h4 className="font-semibold text-blue-700 mb-4 flex items-center gap-2">
                  <i className="fas fa-id-card"></i>
                  Biodata Mahasiswa
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                  <div>
                    <span className="text-xs text-gray-500">Nama</span>
                    <p className="text-gray-800 font-semibold">
                      {student.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Angkatan</span>
                    <p className="text-gray-800">{student.angkatan || "-"}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Program Studi</span>
                    <p className="text-gray-800">{student.prodi || "-"}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Tanggal Lahir</span>
                    <p className="text-gray-800">
                      {student.tanggalLahir || "-"}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-xs text-gray-500">Alamat</span>
                    <p className="text-gray-800">{student.alamat || "-"}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Telepon</span>
                    <p className="text-gray-800">{student.phone || "-"}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Email</span>
                    <p className="text-gray-800">{student.email || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Daftar Kegiatan */}
          <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm">
            <h4 className="font-semibold text-blue-700 mb-4 flex items-center gap-2">
              <i className="fas fa-list-check"></i>
              Daftar Kegiatan Semester Ini
            </h4>
            {student.activities && student.activities.length > 0 ? (
              <div className="space-y-4">
                {student.activities.map((act, idx) => (
                  <div
                    key={act.id || idx}
                    className="p-4 bg-blue-50/60 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-gray-500">
                        {act.tanggal}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          act.status === "Terverifikasi"
                            ? "bg-green-100 text-green-700"
                            : act.status === "Revisi"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {act.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {act.namaKegiatan}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="inline-flex items-center">
                        <i className="fas fa-star text-yellow-500 mr-1"></i>
                        {act.poin} Poin
                      </span>
                      {act.kategori && (
                        <span className="inline-flex items-center">
                          <i className="fas fa-tag text-blue-500 mr-1"></i>
                          {act.kategori}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-blue-50 rounded-lg border border-blue-100">
                <i className="fas fa-inbox text-gray-300 text-2xl mb-2"></i>
                <p className="text-sm text-gray-500">
                  Belum ada kegiatan tercatat semester ini
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-5 border-t border-gray-200 bg-white rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

DetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  student: PropTypes.object,
};
