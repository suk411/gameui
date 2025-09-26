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
import casinoTable from "../assets/casino-table1.png";
import tigerBody from "../assets/tiger-body.png";
import dragonBody from "../assets/dragon-body.png";
import clockIcon from "../assets/clock-icon.png";

export default function MyComponent() {
  const [selectedChip, setSelectedChip] = useState(null);
  const [timer, setTimer] = useState(15);
 
  const chips = [
    { id: 10, src: chip10, alt: "10" },
    { id: 50, src: chip50, alt: "50" },
    { id: 100, src: chip100, alt: "100" },
    { id: 500, src: chip500, alt: "500" },
    { id: 10000, src: chip10k, alt: "10k" },
  ];

  const trends = ["T", "T", "T", "D", "T", "D", "T", "D", "D", "Ti"];

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
            width: 18%;
            height: 15%;
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
          
          /* Responsive Game Container */
          .game-container {
            position: relative;
            width: 100%;
            height: 100vh;
            max-width: 100vw;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          /* Mobile viewport container - maintains aspect ratio */
          .mobile-viewport {
            position: relative;
            width: 100%;
            height: 100%;
            max-width: 500px; /* Max mobile width */
            aspect-ratio: 9/18; /* Mobile aspect ratio */
            background-image: url(${casinoTable});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            overflow: hidden;
          }
          
          /* Desktop: Center with mobile ratio */
          @media (min-width: 768px) {
            .game-container {
              padding: 20px;
            }
            .mobile-viewport {
              height: min(100vh - 40px, calc((500px) * 2));
              width: min(500px, calc((100vh - 40px) / 2));
              margin: 0 auto;
            }
          }
          
          /* All game elements use percentage positioning relative to container */
          .game-element {
            position: absolute;
          }
        `}
      </style>

      <div className="game-container">
        <div className="mobile-viewport">
          {/* Home icon */}
          <div className="game-element text-[#450b00] rounded-full bg-yellow-700 border-yellow-500 border-2 select-none p-2 z-30" 
               style={{ top: '3%', left: '4%' }}>
            <AiFillHome size={20} />
          </div>

          {/* Other players icon */}
          <div className="game-element text-[rgb(253,155,137)] rounded-lg border-yellow-600 border-r-2 border-t-2 p-2 bg-[#450b00] select-none z-30"
               style={{ top: '40%', right: '6%' }}>
            <FaUserAlt size={16} />
          </div>

          {/* Trend icon */}
          <div className="game-element text-[#450b00] rounded-full bg-yellow-700 border-yellow-500 border-2 select-none cursor-pointer p-2 z-30"
               style={{ top: '47%', left: '32%' }}>
            <MdTrendingUp size={22} />
          </div>

          {/* New icon */}
          <div className="game-element text-[#450b00] rounded-t-full rounded-r-full bg-yellow-700 border-yellow-500 border-2 select-none p-1"
               style={{ top: '45%', right: '37%', zIndex: 400 }}>
            <MdOutlineFiberNew size={18} />
          </div>

          {/* Timer */}
          <div className="game-element flex items-center justify-center z-50"
               style={{
                 top: '8%',
                 left: '50%',
                 transform: 'translateX(-50%)',
                 width: '15%',
                 height: '9%',
                 backgroundImage: `url(${clockIcon})`,
                 backgroundSize: '100% 100%',
                 backgroundRepeat: 'no-repeat',
                 backgroundPosition: 'center',
               }}>
            <div className="flex items-center justify-center pt-2 font-bold text-lg text-[#443001] select-none">
              {timer}
            </div>
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

          {/* Dragon animation on left */}
          <div className="creature-container animate-upDownImg"
               style={{ left: '2%' }}>
            <img
              src={dragonBody}
              alt="Dragon"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>

          {/* Tiger animation on right with flame effects */}
          <div className="creature-container animate-upDownImg"
               style={{ right: '2%' }}>
            <img
              src={tigerBody}
              alt="Tiger"
              style={{ width: '100%', height: 'auto' }}
            />
            <div className="flame-container">
              <div className="flame-particle"></div>
              <div className="flame-particle"></div>
              <div className="flame-particle"></div>
            </div>
          </div>

          {/* User balance icon */}
          <div className="game-element text-[#ffe0da] rounded-lg bg-[#5f1e11] border-[#5b6612] border select-none p-1 z-50"
               style={{ bottom: '14%', left: '72%' }}>
            <MdCurrencyRupee size={18} />
          </div>

          {/* User balance display */}
          <div className="game-element text-white rounded-3xl border-2 border-[#5f5c07] select-none flex items-center justify-center text-sm font-bold z-20"
               style={{
                 bottom: '8%',
                 left: '60%',
                 width: '35%',
                 height: '5%',
                 backgroundImage: `
                   repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 20px),
                   repeating-linear-gradient(-45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 20px)
                 `,
                 backgroundSize: '20px 20px',
                 backgroundColor: '#000000',
               }}>
            951888
          </div>

          {/* Tie betting area */}
          <div className="game-element rounded-xl border-blue-400 border-4 bg-gradient-to-br from-emerald-900 to-teal-700 shadow-lg cursor-pointer select-none flex items-center justify-center z-10"
               style={{ bottom: '38%', left: '10%', width: '80%', height: '16%' }}>
            {/* Total bets count */}
            <span className="absolute text-emerald-100/65 text-sm font-bold bg-green-700 bg-opacity-40 rounded-b-sm px-8 select-none z-20"
                  style={{
                    top: '10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}>
              0
            </span>
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-br from-emerald-700 to-cyan-700 opacity-20 blur-lg pointer-events-none"></div>
            <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-emerald-800 to-teal-800">
              <span className="text-cyan-100 text-xl font-semibold tracking-wide"
                    style={{
                      textShadow: '0 2px 5px #0c4a6e',
                      opacity: 0.5,
                    }}>
                TIE x10
              </span>
            </div>
          </div>

          {/* Dragon betting area */}
          <div className="game-element rounded-xl border-black border-2 bg-gradient-to-br from-indigo-900 to-blue-700 shadow-lg cursor-pointer select-none flex items-center justify-center z-10"
               style={{ bottom: '10%', left: '16%', width: '32%', height: '27%' }}>
            {/* Total bets count */}
            <span className="absolute text-emerald-100/65 text-sm font-bold bg-indigo-900 bg-opacity-40 rounded-b-sm px-6 select-none z-20"
                  style={{
                    top: '8%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}>
              0
            </span>
            <div className="relative -inset-4 rounded-xl bg-gradient-to-br from-blue-700 to-sky-700 opacity-20 blur-lg pointer-events-none"></div>
            <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-blue-800 to-blue-800">
              <span className="text-blue-500 text-lg font-semibold tracking-wide flex flex-col items-center"
                    style={{ 
                      opacity: 0.5, 
                      textShadow: '0 2px 0 black'
                    }}>
                <span>DRAGON</span>
                <span>2x</span>
              </span>
            </div>
          </div>

          {/* Tiger betting area */}
          <div className="game-element rounded-xl border-black border-2 bg-gradient-to-br from-red-900 to-yellow-700 shadow-lg cursor-pointer select-none flex items-center justify-center"
               style={{ bottom: '10%', right: '16%', width: '32%', height: '27%', zIndex: 10 }}>
            {/* Total bets count */}
            <span className="absolute text-emerald-100/65 text-sm font-bold bg-red-900 bg-opacity-40 rounded-b-sm px-6 select-none z-20"
                  style={{
                    top: '8%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}>
              0
            </span>
            <div className="relative -inset-4 rounded-xl bg-gradient-to-br from-red-700 to-yellow-700 opacity-20 blur-lg pointer-events-none"></div>
            <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-yellow-800 to-red-800">
              <span className="text-yellow-500 text-lg font-semibold tracking-wide flex flex-col items-center"
                    style={{ 
                      opacity: 0.5, 
                      textShadow: '0 2px 0 black'
                    }}>
                <span>TIGER</span>
                <span>2x</span>
              </span>
            </div>
          </div>

          {/* Bottom chips bar */}
          <div className="game-element w-full z-20"
               style={{ bottom: '0%', left: '0%' }}>
            <div className="border-t-4 border-[#5f5c07]" />
            <div className="rounded-tl-lg rounded-tr-lg flex flex-col items-center bg-black relative overflow-hidden border border-[#2b0d0d] rounded-t-none shadow-inner"
                 style={{
                   backgroundImage: `
                     repeating-linear-gradient(45deg, rgba(255,255,25,0.05) 0, rgba(25,255,255,0.05) 1px, transparent 1px, transparent 20px),
                     repeating-linear-gradient(-45deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 20px)
                   `,
                   backgroundSize: "25px 30px",
                 }}>
              <div className="flex gap-8 justify-center flex-wrap py-2">
                {chips.map((chip) => (
                  <img
                    key={chip.id}
                    src={chip.src}
                    alt={chip.alt}
                    className={`w-12 h-12 object-contain rounded-full ${
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
