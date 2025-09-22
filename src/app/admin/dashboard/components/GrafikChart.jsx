"use client";
import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  FaUsers,
  FaTrophy,
  FaChalkboardTeacher,
  FaHandsHelping,
  FaEllipsisH,
} from "react-icons/fa";
const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#9333ea"];
export default function PieChartKegiatan() {
  const data = [
    { name: "Organisasi", value: 30, icon: <FaUsers /> },
    { name: "Lomba", value: 25, icon: <FaTrophy /> },
    { name: "Seminar / Workshop", value: 20, icon: <FaChalkboardTeacher /> },
    { name: "Pengabdian Masyarakat", value: 15, icon: <FaHandsHelping /> },
    { name: "Lain-lain", value: 10, icon: <FaEllipsisH /> },
  ];
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    setWindowWidth(window.innerWidth);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Outer radius menyesuaikan mobile
  const getOuterRadius = () => {
    if (windowWidth < 480) return 70; // xs: lebih kecil untuk mobile sangat kecil
    if (windowWidth < 640) return 80; // mobile
    if (windowWidth < 768) return 90; // sm
    if (windowWidth < 1024) return 110; // md
    return 130; // lg+
  };
  // Radius untuk lingkaran persentase
  const getLabelCircleRadius = () => {
    if (windowWidth < 480) return 12; // xs
    if (windowWidth < 640) return 14; // mobile
    if (windowWidth < 768) return 16; // sm
    return 18; // md+
  };
  // Font size untuk teks persentase
  const getLabelFontSize = () => {
    if (windowWidth < 480) return "8"; // xs
    if (windowWidth < 640) return "9"; // mobile
    if (windowWidth < 768) return "10"; // sm
    return "11"; // md+
  };
  // Custom label untuk pie chart dengan ikon dan persentase dalam lingkaran
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    let radiusOffset = 0;
    if (isMobile) {
      if (data[index].value / 100 < 0.15) {
        radiusOffset = 15;
      }
    }
    const radius =
      innerRadius + (outerRadius - innerRadius) * 0.5 + radiusOffset;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <foreignObject
        x={x - getLabelCircleRadius()}
        y={y - getLabelCircleRadius()}
        width={getLabelCircleRadius() * 2}
        height={getLabelCircleRadius() * 2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="w-full h-full flex items-center justify-center text-[22px] text-white">
          {data[index].icon}
        </div>
      </foreignObject>
    );
  };
  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
          <p className="font-semibold text-gray-800 flex items-center">
            <span className="mr-2" style={{ color: payload[0].payload.fill }}>
              {data.find((item) => item.name === payload[0].name)?.icon}
            </span>
            {payload[0].name}
          </p>
          <p className="text-gray-600">
            {payload[0].value}% dari total kegiatan
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg pie-chart-container">
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
        @keyframes pieGrow {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
        }
        @keyframes highlightSegment {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes lineExpand {
          to {
            width: 100%;
          }
        }
        .pie-chart-container {
          animation: fadeInUp 0.8s ease-out;
        }
        .chart-title-wrapper {
          position: relative;
          display: inline-block;
          animation: fadeInUp 0.8s ease-out;
        }
        .title-container {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          position: relative;
        }
        .title-container::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #16a34a, #22c55e);
          border-radius: 2px;
          animation: lineExpand 1s ease forwards;
          animation-delay: 0.5s;
        }
        .chart-title {
          position: relative;
          display: inline-block;
        }
        .pulse-circle {
          display: inline-block;
          width: 12px;
          height: 12px;
          background-color: #16a34a;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        .pie-segment {
          animation: pieGrow 1.5s ease-out;
          transform-origin: center;
        }
        .pie-segment:hover {
          animation: highlightSegment 0.5s ease;
          opacity: 0.9;
        }
        .legend-item {
          transition: all 0.3s ease;
          padding: 6px 10px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          margin: 4px;
        }
        .legend-item:hover {
          background-color: #f3f4f6;
          transform: translateX(5px);
        }
        @media (max-width: 640px) {
          .pie-legend-container {
            flex-direction: column;
          }
          .pie-chart-wrapper {
            height: 220px !important;
          }
          .legend-grid {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
          .legend-item {
            padding: 8px;
            margin: 2px 0;
          }
        }
      `}</style>
      <div className="chart-title-wrapper">
        <div className="title-container">
          <span className="pulse-circle"></span>
          <FaChalkboardTeacher className="text-green-600 text-xl" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 chart-title">
            Distribusi Jenis Kegiatan Mahasiswa
          </h2>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between pie-legend-container">
        <div
          className="w-full lg:w-1/2 pie-chart-wrapper"
          style={{ height: isMobile ? "220px" : "320px" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={getOuterRadius()}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
                isAnimationActive={true}
                animationDuration={1500}
                animationEasing="ease-out"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="pie-segment"
                    style={{ transition: "opacity 0.3s" }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full lg:w-1/2 mt-6 lg:mt-0 lg:pl-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 legend-grid">
            {data.map((entry, index) => (
              <div
                key={`legend-${index}`}
                className="legend-item flex items-center p-3 rounded-lg border border-gray-100"
                style={{ color: COLORS[index % COLORS.length] }}
              >
                <div
                  className="w-4 h-4 rounded-full mr-3 flex-shrink-0"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-lg mr-2">{entry.icon}</span>
                <span className="text-sm font-medium">
                  {entry.name} ({entry.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}