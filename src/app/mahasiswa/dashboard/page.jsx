"use client";

import React, { useState } from "react";

// Import data mahasiswa
import mahasiswaData from "@/data/mahasiswa.json";

// Import komponen
import Header from "./components/Header";
import Biodata from "./components/Biodata";
import ProgressPoin from "./components/ProgressPoin";
import Pencapaian from "./components/Pencaipan";

export default function MahasiswaPage() {
  // Ambil data mahasiswa dengan id 2
  const mahasiswaInitial = mahasiswaData.find((m) => m.id === 2);

  // Gunakan state agar bisa update biodata
  const [mahasiswa, setMahasiswa] = useState(mahasiswaInitial);

  // Fungsi update biodata dari Biodata.jsx
  const handleUpdateBiodata = (updatedData) => {
    setMahasiswa((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6 space-y-6">
      {/* Header */}
      <Header mahasiswa={mahasiswa} />

      {/* Biodata */}
      <Biodata mahasiswa={mahasiswa} onUpdate={handleUpdateBiodata} />

      {/* Progress Poin */}
      <ProgressPoin mahasiswa={mahasiswa} targetPoin={100} />

      {/* Pencapaian */}
      <Pencapaian mahasiswa={mahasiswa} />
    </div>
  );
}
