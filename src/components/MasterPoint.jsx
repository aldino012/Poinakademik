"use client";

import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import kegiatanData from "@/data/poin2025.json";

// Komponen
import TableMaster from "./MasterComponent/TableMaster";
import CardMaster from "./MasterComponent/CardMaster";
import Pagination from "../components/Pagianation";
import InfoBobotPoin from "./MasterComponent/InfoBobotPoin";
import ModalTambahPoin from "./MasterComponent/Tambah";
import ModalEditPoin from "./MasterComponent/Edit";

// Toast
import { useToast } from "@/components/Toats";

export default function MasterPoint({ role = "admin" }) {
  const { addToast } = useToast(); // 🎯 Hook Toast
  const isAdmin = role === "admin";

  const [kegiatan, setKegiatan] = useState(kegiatanData);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal Tambah
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data
  const filteredKegiatan = kegiatan.filter((item) => {
    const search = searchTerm.toLowerCase();

    return (
      (item.jenis?.toLowerCase() || "").includes(search) ||
      (item.peran?.toLowerCase() || "").includes(search) ||
      (item.kode?.toLowerCase() || "").includes(search)
    );
  });

  const totalPages = Math.ceil(filteredKegiatan.length / itemsPerPage) || 1;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredKegiatan.slice(indexOfFirst, indexOfLast);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getBadgeClass = (poin) => {
    if (poin >= 30) return "bg-blue-600 text-white";
    if (poin >= 15) return "bg-green-500 text-white";
    if (poin >= 5) return "bg-yellow-400 text-gray-900";
    return "bg-gray-300 text-gray-900";
  };

  // Simpan data baru
  const handleSave = (newData) => {
    setKegiatan([
      ...kegiatan,
      {
        kode: newData.kode,
        jenis: newData.jenisKegiatan,
        peran: newData.posisi,
        poin: parseInt(newData.poin, 10),
      },
    ]);
    addToast({ message: "Data berhasil ditambahkan", type: "success" });
  };

  // Simpan data hasil edit
  const handleEditSave = (updatedData) => {
    setKegiatan((prev) =>
      prev.map((item) =>
        item.kode === updatedData.kode
          ? {
              ...item,
              jenis: updatedData.jenis,
              peran: updatedData.posisi,
              poin: parseInt(updatedData.poin, 10),
            }
          : item
      )
    );
    addToast({ message: "Data berhasil diperbarui", type: "success" });
  };

  // Trigger edit dari TableMaster
  const handleEditTrigger = (item) => {
    setEditData(item);
    setIsEditOpen(true);
  };

  // 🎯 Hapus dengan konfirmasi toast (warna merah)
  const handleDelete = (item) => {
    addToast({
      message: `Hapus kegiatan ${item.jenis} - ${item.peran}?`,
      type: "danger", // ← merah
      onConfirm: () => {
        setKegiatan((prev) => prev.filter((i) => i.kode !== item.kode));
        addToast({ message: "Data berhasil dihapus", type: "success" });
      },
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Search + Action */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-2">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Cari kegiatan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-full bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all shadow-sm"
          />
          <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>

        {isAdmin && (
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 text-sm flex items-center justify-center transition-colors shadow-sm"
            >
              <span className="hidden sm:inline">Tambah</span>
              <i className="fas fa-plus sm:hidden"></i>
            </button>
            <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 text-sm flex items-center justify-center transition-colors shadow-sm">
              <span className="hidden sm:inline">Export</span>
              <i className="fas fa-download sm:hidden"></i>
            </button>
          </div>
        )}
      </div>

      {/* Tabel & Card */}
      <div className="bg-white rounded-lg md:rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <TableMaster
          currentItems={currentItems}
          isAdmin={isAdmin}
          getBadgeClass={getBadgeClass}
          onEdit={handleEditTrigger}
          onDelete={handleDelete} // 🎯 konfirmasi toast merah
        />
        <CardMaster
          currentItems={currentItems}
          isAdmin={isAdmin}
          getBadgeClass={getBadgeClass}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        startIndex={indexOfFirst}
        endIndex={indexOfLast}
        filteredCount={filteredKegiatan.length}
      />

      {/* Info Bobot */}
      <InfoBobotPoin />

      {/* Modal Tambah */}
      <ModalTambahPoin
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      {/* Modal Edit */}
      <ModalEditPoin
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditSave}
        initialData={editData}
      />
    </div>
  );
}
