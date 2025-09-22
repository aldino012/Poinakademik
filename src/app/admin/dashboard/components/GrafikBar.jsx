"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function BarChartAngkatan() {
  // Data dummy jumlah mahasiswa per angkatan
  const data = [
    { angkatan: "2021", jumlah: 120 },
    { angkatan: "2022", jumlah: 150 },
    { angkatan: "2023", jumlah: 180 },
    { angkatan: "2024", jumlah: 140 },
    { angkatan: "2025", jumlah: 100 },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md bar-chart-container">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes barGrow {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
          }
        }

        @keyframes lineExpand {
          to {
            width: 100%;
          }
        }

        .bar-chart-container {
          animation: fadeInUp 0.8s ease-out;
        }

        .chart-title {
          position: relative;
          display: inline-block;
        }

        .chart-title::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #2563eb, #3b82f6);
          border-radius: 2px;
          animation: lineExpand 1s ease forwards;
          animation-delay: 0.5s;
        }

        .custom-bar {
          animation: barGrow 1.2s ease-out;
          transform-origin: bottom;
        }

        .pulse-circle {
          display: inline-block;
          width: 12px;
          height: 12px;
          background-color: #2563eb;
          border-radius: 50%;
          margin-right: 8px;
          animation: pulse 2s infinite;
        }
      `}</style>

      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 chart-title">
        <span className="pulse-circle"></span>
        <i className="fas fa-chart-bar text-blue-600"></i>
        Grafik Mahasiswa per Angkatan
      </h2>

      <div className="w-full h-72 sm:h-80 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis dataKey="angkatan" />
            <YAxis />
            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
              contentStyle={{
                borderRadius: "8px",
                boxShadow:
                  "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                border: "none",
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: 10,
                fontSize: "0.85rem",
                color: "#1e293b",
              }}
            />
            <Bar
              dataKey="jumlah"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
              className="custom-bar"
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
