import React from "react";
import { MdTrendingUp } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineFiberNew } from "react-icons/md";

export default function TrendSection() {
  const trends = ["T", "T", "T", "D", "T", "D", "T", "D", "D", "Ti"];

  return (
    <>
      {/* Other players icon */}
      <div className="game-element text-[rgb(253,155,137)] rounded-lg border-yellow-600 border-r-2 border-t-2 p-2 bg-[#450b00] select-none z-30"
           style={{ top: '40%', right: '6%' }}>
        <FaUserAlt size={16} />
      </div>

      {/* Trend icon */}
      {/* Removed duplicate trend icon */}

      {/* New icon */}
      <div className="game-element text-[#450b00] rounded-t-full rounded-r-full bg-yellow-700 border-yellow-500 border-2 select-none p-1"
           style={{ top: '45%', right: '37%', zIndex: 400 }}>
        <MdOutlineFiberNew size={18} />
      </div>

      {/* Trend Bar */}
      <div className="game-element bg-black/40 rounded-lg p-2 flex items-center gap-1 flex-wrap border-blue-300 border-2 justify-center z-40"
           style={{ top: '47.5%', right: '44%', width: '38%' }}>
        {trends.map((v, i) => (
          <div
            key={i}
            className={
              "w-6 h-6 flex justify-center items-center rounded text-xs font-extrabold border-b-2 select-none shadow " +
              (v === "T"
                ? "bg-[#7f4f25] text-white border-[#c8a978]"
                : v === "D"
                ? "bg-[#326474] text-white border-[#93d7f8]"
                : "bg-[#255e38] text-white border-[#43ad66]")
            }
          >
            {v}
          </div>
        ))}
      </div>
    </>
  );
}
