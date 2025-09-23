"use client";
import React, { useState, useRef, useEffect } from "react";
import students from "@/data/mahasiswa.json";
import { useReactToPrint } from "react-to-print";

import TableToolbar from "./TableToolbar";
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";
import TablePagination from "@/components/Pagianation";
import CetakCV from "./CetakCV";

import DetailModal from "./ModalDetail";
import ModalTambahMhs from "./Tambah";
import ModalEdit from "./Edit";

import { useToast } from "@/components/Toats";

export default function TableMhs() {
  const { addToast } = useToast();

  const [studentsData, setStudentsData] = useState(students);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTambahOpen, setIsTambahOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [filterPoin, setFilterPoin] = useState("all");

  // Flag untuk request cetak (dipisah dari selectedStudent agar kontrol lebih jelas)
  const [printRequested, setPrintRequested] = useState(false);

  const prodiMap = {
    S1: "S1_Teknik_Informatika",
    D3: "D3_Manajemen_Informatika",
  };

  // ref container yang akan diprint (wrapper yang selalu ada)
  const componentRef = useRef(null);

  // handler dari react-to-print (tidak memanggilnya langsung di openCetak)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    // documentTitle ditentukan di sini — walau jika mau dinamis bisa di-set ke generic
    documentTitle: selectedStudent
      ? `${selectedStudent.name.replace(/\s+/g, "_")}_${
          prodiMap[selectedStudent?.prodi] || selectedStudent?.prodi
        }`
      : "CV_Mahasiswa",
    onAfterPrint: () => {
      // bersihkan selectedStudent setelah cetak
      setSelectedStudent(null);
    },
  });

  // ketika user klik tombol Cetak -> set data dan tandai sebagai requested
  const openCetak = (student) => {
    if (!student) {
      addToast({ message: "Data mahasiswa tidak valid", type: "error" });
      return;
    }
    setSelectedStudent(student);
    setPrintRequested(true);
  };

  // useEffect untuk menunggu render <CetakCV> lalu panggil handlePrint
  useEffect(() => {
    if (!printRequested || !selectedStudent) return;

    let cancelled = false;
    let tries = 0;
    const maxTries = 30; // max 30 * interval ms (misal 30 * 100ms = 3s)
    const interval = 100; // ms

    const attemptPrint = () => {
      if (cancelled) return;
      tries += 1;

      const container = componentRef.current;
      // cek apakah CetakCV sudah ter-render — CetakCV root punya className="page"
      const printableElement =
        container && container.querySelector && container.querySelector(".page");

      if (printableElement) {
        try {
          // beberapa versi react-to-print menerima optional content param.
          // kita pass function agar pasti menunjuk ke node yang sudah ada.
          handlePrint(() => container);
        } catch (err) {
          // fallback: coba tanpa param
          try {
            handlePrint();
          } catch (err2) {
            console.error("Print failed:", err2);
            addToast({
              message: `Gagal mencetak: ${err2?.message || "Unknown error"}`,
              type: "error",
            });
          }
        } finally {
          setPrintRequested(false);
        }
      } else if (tries < maxTries) {
        // tunggu sebentar lalu coba lagi
        setTimeout(attemptPrint, interval);
      } else {
        // gagal menemukan konten setelah beberapa percobaan
        setPrintRequested(false);
        console.error("Timeout: printable content not found");
        addToast({
          message:
            "Gagal memuat CV untuk dicetak. Silakan reload halaman lalu coba lagi.",
          type: "error",
        });
      }
    };

    // mulai coba beberapa ms setelah selectedStudent di-set agar re-render terjadi
    setTimeout(attemptPrint, 50);

    return () => {
      cancelled = true;
    };
  }, [printRequested, selectedStudent, handlePrint, addToast]);

  const openTambah = () => setIsTambahOpen(true);
  const closeTambah = () => setIsTambahOpen(false);

  const handleTambah = (newStudent) => {
    setStudentsData((prev) => [...prev, { id: Date.now(), ...newStudent }]);
    addToast({ message: "Mahasiswa berhasil ditambahkan", type: "success" });
  };

  const openEdit = (student) => {
    setSelectedStudent(student);
    setIsEditOpen(true);
  };
  const closeEdit = () => setIsEditOpen(false);

  const openDetail = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = (student) => {
    addToast({
      message: `Apakah Anda yakin ingin menghapus mahasiswa "${student.name}"?`,
      type: "error",
      onConfirm: () => {
        setStudentsData((prev) => prev.filter((s) => s.id !== student.id));
        addToast({ message: "Mahasiswa berhasil dihapus", type: "success" });
      },
    });
  };

  const handleUpdate = (updatedStudent) => {
    setStudentsData((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
    addToast({
      message: "Data mahasiswa berhasil diperbarui",
      type: "success",
    });
  };

  // filter data
  const filteredStudents = studentsData.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.nim.includes(search);
    let matchPoin = true;
    if (filterPoin === "nol") matchPoin = s.poin === 0;
    if (filterPoin === "<5") matchPoin = s.poin > 0 && s.poin < 5;
    if (filterPoin === ">=5") matchPoin = s.poin >= 5;
    return matchSearch && matchPoin;
  });

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredStudents.slice(startIndex, endIndex);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      {/* Toolbar */}
      <TableToolbar
        search={search}
        setSearch={setSearch}
        filterPoin={filterPoin}
        setFilterPoin={setFilterPoin}
        onAdd={openTambah}
      />

      {/* Table */}
      <TableDesktop
        students={currentItems}
        openDetail={openDetail}
        openCetak={openCetak}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
      <TableMobile
        students={currentItems}
        openDetail={openDetail}
        openCetak={openCetak}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        filteredCount={filteredStudents.length}
      />

      {/* Modals */}
      <ModalTambahMhs
        isOpen={isTambahOpen}
        onClose={closeTambah}
        onSubmit={handleTambah}
      />
      <DetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        student={selectedStudent}
      />
      <ModalEdit
        isOpen={isEditOpen}
        onClose={closeEdit}
        student={selectedStudent}
        onSubmit={handleUpdate}
      />

      {/* Hidden CV area (wrapper selalu ada; CetakCV dirender ketika selectedStudent ada) */}
      <div style={{ visibility: "hidden", height: 0, overflow: "hidden" }}>
        <div ref={componentRef}>
          {selectedStudent ? <CetakCV mahasiswa={selectedStudent} /> : null}
        </div>
      </div>
    </div>
  );
}
