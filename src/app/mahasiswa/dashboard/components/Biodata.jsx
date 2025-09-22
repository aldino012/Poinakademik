"use client";

import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Biodata({ mahasiswa, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...mahasiswa }); // data asli
  const [editData, setEditData] = useState({ ...mahasiswa }); // data sementara saat edit

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Validasi khusus nomor telepon (hanya angka)
    if (name === "phone") {
      newValue = value.replace(/\D/g, ""); // buang semua karakter non-angka
    }

    setEditData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("Ukuran file maksimal 1 MB!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData((prev) => ({ ...prev, foto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setFormData(editData); // commit perubahan
    if (onUpdate) onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(formData); // kembalikan ke data asli
    setIsEditing(false);
  };

  const biodataItems = [
    { label: "NIM", name: "nim", icon: "hashtag", editable: false },
    { label: "Nama", name: "name", icon: "user", editable: false },
    { label: "Angkatan", name: "angkatan", icon: "calendar", editable: false },
    {
      label: "Program Studi",
      name: "prodi",
      icon: "graduation-cap",
      editable: false,
    },
    {
      label: "Tanggal Lahir",
      name: "tanggalLahir",
      icon: "birthday-cake",
      editable: true,
    },
    {
      label: "Tempat Lahir",
      name: "tempatLahir",
      icon: "map-marker-alt",
      editable: true,
    },
    {
      label: "Alamat",
      name: "alamat",
      icon: "map-marker-alt",
      editable: true,
      type: "textarea",
    },
    { label: "No. Telp", name: "phone", icon: "phone", editable: true },
    { label: "Email", name: "email", icon: "envelope", editable: true },
  ];

  const formatTanggal = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-2xl p-6 transition-all duration-700">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <i className="fas fa-id-card text-blue-500"></i> Biodata Mahasiswa
      </h2>

      {/* Upload foto hanya saat edit */}
      {isEditing && (
        <div className="mb-6 flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto Profil
          </label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg shadow border border-blue-300 transition-all duration-300">
              <i className="fas fa-upload"></i>
              <span>Pilih File</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {editData.foto && (
              <img
                src={editData.foto}
                alt="Preview"
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-300 shadow"
              />
            )}
          </div>
          <span className="text-xs text-gray-500 mt-2">
            Maksimal ukuran file: <span className="font-semibold">1 MB</span>
          </span>
        </div>
      )}

      {/* Biodata Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {biodataItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
          >
            <div className="flex items-center gap-2 mb-1">
              <i className={`fas fa-${item.icon} text-blue-600 w-5`}></i>
              <span className="font-semibold text-gray-700">{item.label}</span>
            </div>

            {isEditing ? (
              <div className="relative">
                {item.type === "textarea" ? (
                  <textarea
                    name={item.name}
                    value={editData[item.name]}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 p-2 border rounded-lg w-full text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                ) : item.name === "tanggalLahir" ? (
                  <input
                    type="date"
                    name={item.name}
                    value={
                      editData[item.name]
                        ? new Date(editData[item.name])
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={handleChange}
                    className="date-input mt-1 p-2 border rounded-lg w-full text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                ) : item.name === "phone" ? (
                  <input
                    type="tel"
                    name={item.name}
                    value={editData[item.name]}
                    onChange={handleChange}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className="mt-1 p-2 border rounded-lg w-full text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                ) : (
                  <input
                    type="text"
                    name={item.name}
                    value={editData[item.name]}
                    onChange={handleChange}
                    readOnly={!item.editable}
                    className={`mt-1 p-2 border rounded-lg w-full text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                      !item.editable ? "opacity-70 cursor-not-allowed pr-8" : ""
                    }`}
                  />
                )}
                {!item.editable && (
                  <i className="fas fa-eye absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"></i>
                )}
              </div>
            ) : (
              <span className="ml-1 text-gray-700">
                {item.name === "tanggalLahir"
                  ? formatTanggal(formData[item.name])
                  : formData[item.name]}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center md:justify-start gap-3">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 transition-all duration-300"
            >
              <i className="fas fa-save"></i> Simpan
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 transition-all duration-300"
            >
              <i className="fas fa-times"></i> Batal
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setEditData(formData); // mulai edit dari data asli
              setIsEditing(true);
            }}
            className="bg-blue-400 hover:bg-blue-500 text-white px-5 py-2 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 transition-all duration-300"
          >
            <i className="fas fa-edit"></i> Edit Biodata
          </button>
        )}
      </div>

      {/* Styling tambahan date picker */}
      <style jsx>{`
        .date-input::-webkit-calendar-picker-indicator {
          cursor: pointer;
          filter: invert(31%) sepia(92%) saturate(3119%) hue-rotate(205deg)
            brightness(95%) contrast(97%);
          width: 1.3rem;
          height: 1.3rem;
        }
        .date-input::-webkit-calendar-picker-indicator:hover {
          filter: invert(36%) sepia(89%) saturate(1969%) hue-rotate(210deg)
            brightness(95%) contrast(97%);
        }
      `}</style>
    </div>
  );
}
