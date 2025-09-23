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

  const [printRequested, setPrintRequested] = useState(false);

  const prodiMap = {
    S1: "S1_Teknik_Informatika",
    D3: "D3_Manajemen_Informatika",
  };

  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: selectedStudent
      ? `${selectedStudent.name.replace(/\s+/g, "_")}_${
          prodiMap[selectedStudent?.prodi] || selectedStudent?.prodi
        }`
      : "CV_Mahasiswa",
    onAfterPrint: () => {
      setSelectedStudent(null);
    },
  });

  const openCetak = (student) => {
    if (!student) {
      addToast({ message: "Data mahasiswa tidak valid", type: "error" });
      return;
    }
    setSelectedStudent(student);
    setPrintRequested(true);
  };

  // useEffect menunggu render CetakCV lalu panggil handlePrint
  useEffect(() => {
    if (!printRequested || !selectedStudent) return;

    const timer = setTimeout(() => {
      handlePrint();
      setPrintRequested(false);
    }, 200); // tunggu 200ms agar CetakCV render

    return () => clearTimeout(timer);
  }, [printRequested, selectedStudent, handlePrint]);

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
  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / itemsPerPage)
  );
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

      {/* Hidden CV area: tetap di DOM tapi tidak terlihat di layar */}
      <div className="printable-wrapper">
        <div ref={componentRef}>
          {selectedStudent ? <CetakCV mahasiswa={selectedStudent} /> : null}
        </div>
      </div>
    </div>
  );
}
