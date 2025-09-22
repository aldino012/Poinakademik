"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import kegiatanData from "@/data/poin2025.json";
import { useToast } from "@/components/Toats"; // import hook Toast

export default function ClaimPoinModal({ isOpen, onClose, user }) {
  const { addToast } = useToast(); // gunakan toast
  const [dataPoin, setDataPoin] = useState([]);
  const [formData, setFormData] = useState({
    nim: user?.nim || "202301234",
    nama: user?.nama || "Ahmad Aldino",
    jenisKegiatan: "",
    role: "",
    deskripsi: "",
    tanggal: null,
  });

  useEffect(() => {
    setDataPoin(kegiatanData);
    if (kegiatanData.length > 0) {
      setFormData((prev) => ({
        ...prev,
        jenisKegiatan: kegiatanData[0].jenis,
        role: kegiatanData[0].peran,
      }));
    }
  }, []);

  if (!isOpen) return null;

  const jenisOptions = [...new Set(dataPoin.map((d) => d.jenis))];
  const roleOptions = dataPoin
    .filter((d) => d.jenis === formData.jenisKegiatan)
    .map((d) => d.peran);

  const getPoin = (jenis, role) => {
    const item = dataPoin.find((d) => d.jenis === jenis && d.peran === role);
    return item ? item.poin : 0;
  };

  const getBadgeClass = (poin) => {
    if (poin >= 30) return "bg-blue-600 text-white";
    if (poin >= 15) return "bg-green-500 text-white";
    if (poin >= 5) return "bg-yellow-400 text-gray-900";
    return "bg-gray-300 text-gray-900";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "jenisKegiatan") {
      const firstRole =
        dataPoin.find((d) => d.jenis === value)?.peran || "";
      setFormData((prev) => ({
        ...prev,
        jenisKegiatan: value,
        role: firstRole,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, tanggal: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Klaim Poin:", formData);

    // 🌟 Ganti alert dengan toast
    addToast({ message: "Klaim poin berhasil diajukan!", type: "success" });

    onClose();
  };

  const poin = getPoin(formData.jenisKegiatan, formData.role);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50 animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* modal */}
      <div className="relative bg-white shadow-2xl rounded-2xl p-6 max-w-2xl w-full mx-4 z-10 transform animate-scaleIn">
        {/* badge di pojok kanan */}
        <div className="absolute top-3 right-12 animate-bounce-slow">
          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold shadow-md ${getBadgeClass(
              poin
            )}`}
          >
            {poin} Poin
          </span>
        </div>

        {/* tombol close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* judul */}
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Formulir Klaim Poin
        </h2>

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* NIM */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIM
            </label>
            <input
              type="text"
              name="nim"
              value={formData.nim}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Jenis Kegiatan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Kegiatan
            </label>
            <select
              name="jenisKegiatan"
              value={formData.jenisKegiatan}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            >
              {jenisOptions.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Posisi / Peran
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            >
              {roleOptions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Tuliskan deskripsi kegiatan..."
            />
          </div>

          {/* Tanggal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Pelaksanaan
            </label>
            <DatePicker
              selected={formData.tanggal}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Pilih tanggal"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              isClearable
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={15}
              todayButton="Hari Ini"
            />
          </div>

          {/* Tombol Klaim */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2 shadow-lg transition-transform transform hover:scale-105"
            >
              <i className="fas fa-star"></i> Klaim Poin
            </button>
          </div>
        </form>
      </div>

      {/* animasi CSS */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounceSlow 2s infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
