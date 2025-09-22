"use client";

import React, { useState } from "react";

export default function Navbar({
  isDropdownOpen,
  toggleDropdown,
  toggleSidebar,
  role = "default", // "admin" | "user" | default
  userName = "Pengguna", // nama user di kanan
  userEmail = "pengguna@example.com", // email user
}) {
  // Tentukan judul berdasarkan role
  const getTitle = () => {
    if (role === "admin") return "Dashboard Admin";
    if (role === "user") return "Dashboard Mahasiswa";
    return "Dashboard";
  };

  return (
    <header className="flex items-center justify-between bg-white border-b px-4 py-3 shadow-sm sticky top-0 z-20">
      <div className="flex items-center space-x-3">
        {/* Tombol toggle sidebar (mobile) */}
        <button
          id="menuBtn"
          className="md:hidden text-blue-700 focus:outline-none"
          onClick={toggleSidebar}
        >
          <i className="fas fa-bars text-2xl"></i>
        </button>

        {/* Judul halaman */}
        <h1 className="text-lg font-bold text-blue-800 flex items-center">
          <i className="fas fa-cog mr-2 text-blue-600"></i>
          <span>{getTitle()}</span>
        </h1>
      </div>

      {/* Profile + dropdown */}
      <div className="flex items-center space-x-3 relative">
        <span className="text-sm text-gray-600 hidden sm:block">
          {userName}
        </span>

        <div className="relative">
          <button
            id="profileBtn"
            className="focus:outline-none flex items-center"
            onClick={toggleDropdown}
          >
            <img
              src="https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg"
              alt="profile"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-blue-500 shadow-sm"
            />
            <i className="fas fa-chevron-down ml-1 text-gray-500 text-xs"></i>
          </button>

          {/* Dropdown Profile */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-30 overflow-hidden">
              {/* Header dropdown dengan info user */}
              <div className="px-4 py-3 border-b bg-gray-50">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500 truncate">{userEmail}</p>
              </div>

              {/* Menu dropdown */}
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <i className="fas fa-user-circle mr-2 text-blue-500"></i>{" "}
                  Profil Saya
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <i className="fas fa-cog mr-2 text-blue-500"></i> Pengaturan
                </a>
                {role === "admin" && (
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <i className="fas fa-users-cog mr-2 text-blue-500"></i>{" "}
                    Admin Panel
                  </a>
                )}
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <i className="fas fa-bell mr-2 text-blue-500"></i> Notifikasi
                </a>
              </div>

              {/* Footer dropdown dengan tombol logout */}
              <div className="py-1 border-t">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Keluar
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
