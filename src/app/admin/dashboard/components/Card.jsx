"use client";

import React from "react";

export default function Card({
  title,
  value,
  change, // bisa null kalau tidak dipakai
  changeIcon, // ikon kecil sesuai konteks
  changeColor = "", // default biar aman
  iconBg = "bg-blue-100",
  icon = "fas fa-chart-bar", // ikon besar di kanan
  border = "",
  textColor = "text-gray-800",
  extraClass = "",
}) {
  return (
    <div
      className={`stats-card bg-white p-4 md:p-5 rounded-xl shadow-md ${border} ${extraClass}`}
    >
      <div className="flex justify-between items-start">
        {/* Keterangan */}
        <div>
          <p className={`text-xs md:text-sm font-medium ${textColor}`}>
            {title}
          </p>
          <h2 className={`text-xl md:text-2xl font-bold mt-1 ${textColor}`}>
            {value}
          </h2>

          {/* Hanya tampil kalau ada "change" */}
          {change && (
            <p className={`text-xs mt-2 flex items-center ${changeColor}`}>
              <i className={`${changeIcon} mr-1`}></i>
              {change}
            </p>
          )}
        </div>

        {/* Ikon Besar */}
        <div className={`${iconBg} p-2 md:p-3 rounded-lg`}>
          <i className={`${icon} text-lg md:text-xl`}></i>
        </div>
      </div>
    </div>
  );
}
