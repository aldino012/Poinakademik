"use client";
import React, { useState } from "react";

export default function ModalTambahMhs({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    nim: "",
    name: "",
    prodi: "S1",
    poin: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ nim: "", name: "", prodi: "S1", poin: 0 });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            <i className="fas fa-user-plus mr-2 text-blue-600"></i>
            Tambah Mahasiswa
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
          {/* NIM */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              NIM
            </label>
            <input
              type="text"
              name="nim"
              value={form.nim}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Prodi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prodi
            </label>
            <select
              name="prodi"
              value={form.prodi}
              onChange={handleChange}
              className="w-full max-w-full px-3 py-2 border rounded-lg shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="S1">S1</option>
              <option value="D3">D3</option>
            </select>
          </div>

          {/* Total Poin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Poin
            </label>
            <input
              type="number"
              name="poin"
              value={form.poin}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border rounded-lg shadow-sm bg-white text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Tombol */}
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
