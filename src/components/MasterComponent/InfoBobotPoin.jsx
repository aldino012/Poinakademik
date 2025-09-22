"use client";
import React from "react";

export default function InfoBobotPoin() {
  return (
    <div className="text-xs md:text-sm text-gray-600 bg-blue-50/50 border border-blue-100 rounded-lg p-3 md:p-4">
      <div className="flex items-start gap-2 md:gap-3">
        <i className="fas fa-info-circle text-blue-500 mt-0.5 text-sm"></i>
        <div>
          <p className="font-medium text-blue-800 mb-1 md:mb-2 text-sm md:text-base">
            Informasi Bobot Poin
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 text-xs">
            <span className="inline-flex items-center">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-blue-600 rounded-full mr-1.5 md:mr-2"></div>
              Tinggi (30+ poin)
            </span>
            <span className="inline-flex items-center">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full mr-1.5 md:mr-2"></div>
              Sedang (15-29 poin)
            </span>
            <span className="inline-flex items-center">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-yellow-400 rounded-full mr-1.5 md:mr-2"></div>
              Rendah (5-14 poin)
            </span>
            <span className="inline-flex items-center">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-gray-300 rounded-full mr-1.5 md:mr-2"></div>
              Minimal (1-4 poin)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
