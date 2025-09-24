import React, { useState, useEffect } from "react";

import { AiFillHome } from "react-icons/ai";
import { MdTrendingUp } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { MdOutlineFiberNew } from "react-icons/md";

import chip10 from "../assets/chip-10.png";
import chip50 from "../assets/chip-50.png";
import chip100 from "../assets/chip-100.png";
import chip500 from "../assets/chip-500.png";
import chip10k from "../assets/chip-10k.png";
import casinoTable from "../assets/casino-table.png";
import tigerBody from "../assets/tiger-body.png";
import dragonBody from "../assets/dragon-body.png";
import clockIcon from "../assets/clock-icon.png";

export default function MyComponent() {
  const [selectedChip, setSelectedChip] = useState(null);
  const [timer, setTimer] = useState(15);
  const [phase, setPhase] = useState("play"); // "play" or "result"

  const chips = [
    { id: 10, src: chip10, alt: "10" },
    { id: 50, src: chip50, alt: "50" },
    { id: 100, src: chip100, alt: "100" },
    { id: 500, src: chip500, alt: "500" },
    { id: 10000, src: chip10k, alt: "10k" },
  ];

  const trends = ["T", "T", "T", "D", "T", "D", "T", "D", "D", "Ti"];

  useEffect(() => {
    setTimer(phase === "play" ? 15 : 10);
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t > 1) return t - 1;
        setPhase((p) => (p === "play" ? "result" : "play"));
        return phase === "play" ? 10 : 15;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background image */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={casinoTable}
          alt="Casino Table"
          className="w-full h-full object-contain"
        />

        {/* Overlay content (scales with table) */}
        <div className="absolute inset-0 w-full h-full">
          {/* Home icon */}
          <div className="absolute top-[3%] left-[3%] cursor-pointer z-30 text-[#450b00] bg-yellow-700 border-yellow-500 border-y-2 rounded-full p-[1.5%]">
            <AiFillHome className="w-[4vw] h-[4vw] max-w-[30px] max-h-[30px]" />
          </div>

          {/* Other players icon */}
          <div className="absolute top-[40%] right-[3%] cursor-pointer z-30 text-[rgb(253,155,137)] bg-[#450b00] border-yellow-600 border-r-2 border-t-2 rounded-md p-[1.2%]">
            <FaUserAlt className="w-[3.5vw] h-[3.5vw] max-w-[24px] max-h-[24px]" />
          </div>

          {/* Trend icon */}
          <div className="absolute top-[44%] left-[6%] cursor-pointer bg-yellow-700 border-yellow-500 border-y-2 rounded-full p-[1.2%]">
            <MdTrendingUp className="w-[3.5vw] h-[3.5vw] max-w-[24px] max-h-[24px]" />
          </div>

          {/* New icon */}
          <div className="absolute top-[72%] right-[10%] cursor-pointer bg-yellow-700 border-yellow-500 border-y-2 rounded-full p-[1.2%]">
            <MdOutlineFiberNew className="w-[3.5vw] h-[3.5vw] max-w-[24px] max-h-[24px]" />
          </div>

          {/* Timer */}
          <div
            className="absolute top-[38%] left-[45%] flex items-center justify-center"
            style={{
              width: "12%",
              maxWidth: "60px",
              aspectRatio: "2/1",
              backgroundImage: `url(${clockIcon})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="font-bold text-[3vw] max-text-[18px] text-[#443001] select-none">
              {timer}
            </div>
          </div>

          {/* Trend bar */}
          <div className="absolute top-[44%] right-[12%] flex items-center gap-[0.6%] flex-wrap justify-center max-w-[40%]">
            {trends.map((v, i) => (
              <div
                key={i}
                className={
                  "w-[3.5vw] h-[3.5vw] max-w-[24px] max-h-[24px] flex justify-center items-center rounded-[4px] font-extrabold text-[2vw] border-b-[2px] select-none " +
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

          {/* Dragon left */}
          <div className="absolute animate-upDownImg" style={{ top: "20%", left: "2%", width: "22%" }}>
            <img src={dragonBody} alt="Dragon" className="w-full h-auto object-contain" />
          </div>

          {/* Tiger right */}
          <div className="absolute animate-upDownImg" style={{ top: "20%", right: "2%", width: "22%" }}>
            <img src={tigerBody} alt="Tiger" className="w-full h-auto object-contain" />
          </div>

          {/* Balance icon */}
          <div className="absolute bottom-[15%] left-[28%] cursor-pointer z-40 bg-[#5f1e11] border-[#5b6612] border-[1px] rounded-full p-[1.2%]">
            <MdCurrencyRupee className="w-[3.5vw] h-[3.5vw] max-w-[24px] max-h-[24px] text-[#ffe0da]" />
          </div>

          {/* Balance display */}
          <div
            className="absolute bottom-[7%] left-[28%] w-[30%] border-2 border-[#5f5c07] text-white text-center rounded-3xl py-[1%] px-[2%]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 20px),
                repeating-linear-gradient(-45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 20px)
              `,
              backgroundSize: "20px 20px",
              backgroundColor: "#000000",
            }}
          >
            <h1 className="font-bold text-[2.5vw] max-text-[16px] select-none">
              105555.2
            </h1>
          </div>
        </div>
      </div>

      {/* Chips bar (bottom fixed) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50">
        <div className="border-t-4 border-[#5f5c07]" />
        <div
          className="flex flex-col items-center px-5 py-3 bg-black relative overflow-hidden border border-[#2b0d0d] shadow-inner"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 20px),
              repeating-linear-gradient(-45deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 20px)
            `,
            backgroundSize: "20px 20px",
          }}
        >
          <div className="flex gap-4 justify-center flex-wrap">
            {chips.map((chip) => (
              <img
                key={chip.id}
                src={chip.src}
                alt={chip.alt}
                className={`w-[10vw] h-[10vw] max-w-[55px] max-h-[55px] cursor-pointer object-contain rounded-full ${
                  selectedChip === chip.id ? "pulse-zoom" : ""
                }`}
                onClick={() => setSelectedChip(chip.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
