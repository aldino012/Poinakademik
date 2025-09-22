"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Sistem Poin Non Akademik (SIPAK)
        </h1>

        <div className="flex flex-col gap-5">
          {/* Tombol Panel Admin */}
          <Link href="/admin/dashboard">
            <button className="w-full bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition-all duration-200 text-lg font-semibold shadow-md">
              Panel Admin
            </button>
          </Link>

          {/* Tombol Panel Mahasiswa */}
          <Link href="/mahasiswa/dashboard">
            <button className="w-full bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition-all duration-200 text-lg font-semibold shadow-md">
              Panel Mahasiswa
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
