"use client";

import React from "react";
import Cards from "./components/Cards";

import BarChartAngkatan from "./components/GrafikBar";
import PieChartKegiatan from "./components/GrafikChart"; // 🔹 Import grafik pie

export default function AdminPage() {
  const openDetail = (id) => {
    alert(`Detail mahasiswa ID: ${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Cards Statistik */}
      <Cards />

      {/* Grafik Batang */}
      <BarChartAngkatan />

      {/* Grafik Lingkaran */}
      <PieChartKegiatan />
    </div>
  );
}
