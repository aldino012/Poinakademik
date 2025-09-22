"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function ModalTambahPoin({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    kode: "",
    jenis: "",
    posisi: "",
    poin: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "kode" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[A-Z0-9]{4,}$/.test(form.kode)) {
      alert("Kode harus huruf kapital & minimal 4 digit, contoh: BEM1");
      return;
    }
    if (!form.jenis || !form.posisi || !form.poin) {
      alert("Semua field wajib diisi!");
      return;
    }
    onSave(form);
    setForm({ kode: "", jenis: "", posisi: "", poin: 0 });
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-xl shadow-2xl overflow-auto max-h-[90vh] z-50 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <i className="fas fa-plus-circle mr-2 text-blue-600"></i>
            Tambah Master Poin
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          {/* Kode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kode
            </label>
            <input
              type="text"
              name="kode"
              value={form.kode}
              onChange={handleChange}
              placeholder="Contoh: BEM1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none uppercase text-sm"
              required
            />
          </div>

          {/* Jenis Kegiatan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Kegiatan
            </label>
            <input
              type="text"
              name="jenis"
              value={form.jenis}
              onChange={handleChange}
              placeholder="Masukkan jenis kegiatan"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              required
            />
          </div>

          {/* Posisi / Peran */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Posisi / Peran
            </label>
            <input
              type="text"
              name="posisi"
              value={form.posisi}
              onChange={handleChange}
              placeholder="Masukkan posisi/peran"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              required
            />
          </div>

          {/* Poin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Poin
            </label>
            <input
              type="number"
              name="poin"
              value={form.poin}
              onChange={handleChange}
              placeholder="Masukkan jumlah poin"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              min={0}
              required
            />
          </div>

          {/* Tombol */}
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-md text-sm"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
