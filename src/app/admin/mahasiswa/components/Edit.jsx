"use client";
import React, { useState, useEffect } from "react";

export default function ModalEditMhs({ isOpen, onClose, student, onSubmit }) {
  const [form, setForm] = useState({
    nim: "",
    name: "",
    prodi: "",
    poin: 0,
  });

  // Set data dari student saat modal dibuka
  useEffect(() => {
    if (student) {
      setForm({
        nim: student.nim,
        name: student.name,
        prodi: student.prodi,
        poin: student.poin,
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            <i className="fas fa-edit mr-2 text-amber-600"></i>Edit Mahasiswa
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
              readOnly
              disabled
              className="w-full px-3 py-2 border rounded-lg shadow-sm bg-gray-100 text-black cursor-not-allowed"
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
              readOnly
              disabled
              className="w-full px-3 py-2 border rounded-lg shadow-sm bg-gray-100 text-black cursor-not-allowed"
            />
          </div>

          {/* Prodi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prodi
            </label>
            <input
              type="text"
              name="prodi"
              value={form.prodi}
              readOnly
              disabled
              className="w-full px-3 py-2 border rounded-lg shadow-sm bg-gray-100 text-black cursor-not-allowed"
            />
          </div>

          {/* Poin */}
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
              className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition shadow-md"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
