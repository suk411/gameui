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
import casinoTable from "../assets/casino-table.jpg";
import tigerBody from "../assets/tiger-body.png";
import dragonBody from "../assets/dragon-body.png";
import clockIcon from "../assets/clock-icon.png";
import { relative } from "path";

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
    <>
      <style>
        {`
          html, body, #root {
             height: 100%;
             
             margin: 0;
             padding: 0;
             background: #000;
             overflow: hidden;
           }
           .pulse-zoom {
             animation: pulseScale 1s ease-in-out infinite;
             border-radius: 9999px;
             border: 2px solid #FFD700;
           }
           @keyframes pulseScale {
             0%, 100% { transform: scale(1.03); box-shadow: 0 0 2px 2px #FFD700; }
             50% { transform: scale(1.08); box-shadow: 0 0 3px 4px #FFD700; }
           }
           @keyframes upDownImg {
             0%, 100% { transform: translateY(0); }
             50% { transform: translateY(-20px); }
           }
           .animate-upDownImg {
             animation: upDownImg 4s ease-in-out infinite;
           }
           .flame-container {
             position: absolute;
             bottom: 0;
             left: 50%;
             width: 90px;
             height: 140px;
             transform: translateX(-50%);
             pointer-events: none;
             z-index: 16;
             overflow: visible;
           }
           .flame-glow {
             position: absolute;
             bottom: 0;
             width: 100%;
             height: 100%;
             border-radius: 9999px;
             background: radial-gradient(circle at bottom, rgba(255,140,0,0.8) 35%, transparent 80%);
             filter: blur(18px);
             animation: flamePulse 4s ease-in-out infinite;
           }
           @keyframes flamePulse {
             0%, 100% { opacity: 0.7; }
             50% { opacity: 1; }
           }
           .flame-particle {
             position: absolute;
             bottom: 16px;
             width: 12px;
             height: 12px;
             background: radial-gradient(circle, rgba(255,165,0,0.9) 40%, transparent 90%);
             border-radius: 50%;
             filter: drop-shadow(0 0 4px #ffae00);
             animation: particleUp 4s linear infinite;
           }
           .flame-particle:nth-child(1) { left: 12%; animation-delay: 0s; }
           .flame-particle:nth-child(2) { left: 45%; animation-delay: 1.3s; }
           .flame-particle:nth-child(3) { left: 77%; animation-delay: 2.6s; }
           @keyframes particleUp {
             0% { opacity: 1; transform: translateY(0) scale(1); }
             100% { opacity: 0; transform: translateY(-90px) scale(1.4); }
           }
           .creature-container {
             position: absolute;
             top: 20%;
             width: 25%;
             max-width: 180px;
             user-select: none;
             z-index: 20;
             display: flex;
             justify-content: center;
             align-items: flex-end;
           }
            
         `}
      </style>

      <div
        className="bg-[#2b0d0d] flex items-center justify-center relative"
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          overflow: "hidden",
        }}
      >
        {/* game  screen */}
        <div
  className="relative rounded-xl shadow-2xl border-2 border-red-500 flex flex-col justify-end items-center mx-auto overflow-hidden"
  style={{
    width: "100vw",         // fills viewport width
    height: "100vh",        // fills viewport height
    maxWidth: "460px",      // image's original width
    maxHeight: "932px",     // image's original height
    backgroundImage: `url(${casinoTable})`,
    backgroundSize: "cover",  // scales image without cropping
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }}
>
 
          {/* Home icon */}
          <div className="  cursor-pointer z-30 text-[#450b00] rounded-full bg-yellow-700 border-yellow-500 border-y-2 select-none p-1 md:p-2">
            <AiFillHome size={24} className="md:text-3xl" />
          </div>

          {/* other players icon */}
          <div className="absolute top-60 right-3 cursor-pointer z-30 text-[rgb(253,155,137)] rounded-[8px] border-yellow-600 border-r-2 border-t-2 p-1 md:p-2 bg-[#450b00] select-none">
            <FaUserAlt size={18} className="md:text-2xl" />
          </div>

          {/* trand icon */}
          <div className="absolute top-[44.5vh] left-[6vh] px-2 cursor-pointer z-30 text-[#450b00] rounded-full bg-yellow-700 border-yellow-500 border-y-2 select-none">
            <MdTrendingUp size={20} />
          </div>

          {/* new icon */}
          <div className="absolute top-72 right-10 px-2 cursor-pointer z-30 text-[#450b00] rounded-full bg-yellow-700 border-yellow-500 border-y-2 select-none">
            <MdOutlineFiberNew size={20} />
          </div>

          {/* timer */}
          <div
            className="absolute top-[38vh] flex items-center justify-center"
            style={{
              width: "12vw",
              height: "6.5vh",
              maxWidth: "60px",
              maxHeight: "45px",
              backgroundImage: `url(${clockIcon})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              marginRight: "11px",
            }}
          >
            <div
              className="pt-3 flex items-center justify-center font-bold text-[1.4rem] text-[#443001] select-none"
              style={{ backgroundColor: "transparent" }}
            >
              {timer}
            </div>
          </div>

          <div className="z-40 flex items-center justify-between px-4 py-2 rounded-xl shadow-lg max-w-[370px] mx-auto mb-4 bg-transparent">
            {/* Trend Bar */}
            <div className="absolute top-[44.5vh] bg-red-600 right-[12vh] flex items-center gap-1 flex-wrap justify-center flex-1 max-w-[38vh]">
              {trends.map((v, i) => (
                <div
                  key={i}
                  className={
                    "w-[3vh] h-[3vh] flex justify-center items-center rounded-[4px] text-yellow-600 font-extrabold text-[0.9rem] border-b-[2px] select-none shadow " +
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
          </div>

          {/* Dragon animation on left */}
          <div
            className="creature-container animate-upDownImg"
            style={{
              left: "2%",
              height: "auto",
            }}
          >
            <img
              src={dragonBody}
              alt="Dragon"
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          {/* Tiger animation on right with flame effects */}
          <div
            className="creature-container animate-upDownImg"
            style={{
              right: "2%",
              height: "auto",
            }}
          >
            <img
              src={tigerBody}
              alt="Tiger"
              style={{ width: "100%", height: "auto" }}
            />
            <div
              className="flame-container"
              style={{ width: "100%", height: 140 * 3 }}
            >
              <div className="flame-particle"></div>
              <div className="flame-particle"></div>
              <div className="flame-particle"></div>
            </div>
          </div>

          {/* user balance */}
          <div className="absolute bottom-[10vh] left-[28vw] cursor-pointer z-40 text-[#ffe0da] rounded-full bg-[#5f1e11] border-[#5b6612] border-[1px] select-none  md:p-2">
            <MdCurrencyRupee size={20} />
          </div>

          <div
            className="flex items-start gap-1 flex-wrap  justify-center flex-1 absolute bottom-[6vh] left-[28vw] cursor-pointer text-white rounded-3xl w-[30vw]   border-2 border-[#5f5c07] select-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 20px),
                repeating-linear-gradient(-45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 20px)
              `,
              backgroundSize: "20px 20px",
              backgroundColor: "#000000",
            }}
          >
            <h1
              className=" pb-[4vh]
             font-bold text-sm md:text-lg"
            >
              105555.2
            </h1>
          </div>

          {/* Bottom chips bar */}
          <div className="fixed left-1/2 bottom-0 transform -translate-x-1/2 w-full max-w-[430px] z-20">
            <div className="border-t-4   border-[#5f5c07]" />
            <div
              className=" rounded-tl-lg rounded-tr-lg flex flex-col items-center  bg-black relative overflow-hidden border border-[#2b0d0d] rounded-t-none shadow-inner"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(45deg, rgba(255,255,25,0.05) 0, rgba(25,255,255,0.05) 1px, transparent 1px, transparent 20px),
                  repeating-linear-gradient(-45deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 20px)
                `,
                backgroundSize: "25px 30px",
              }}
            >
              <div className="flex gap-[4vh] justify-center flex-wrap">
                {chips.map((chip) => (
                  <img
                    key={chip.id}
                    src={chip.src}
                    alt={chip.alt}
                    className={`w-[7vh] h-[7vh] cursor-pointer object-contain rounded-full ${
                      selectedChip === chip.id ? "pulse-zoom" : ""
                    }`}
                    onClick={() => setSelectedChip(chip.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
