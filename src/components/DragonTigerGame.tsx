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

export default function MyComponent() {
  const [selectedChip, setSelectedChip] = useState(null);
  const [timer, setTimer] = useState(15);
  const [phase, setPhase] = useState("play"); // "play" or "result"
  const [trendOpen, setTrendOpen] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      // Original image dimensions
      const originalWidth = 460;
      const originalHeight = 932;
      const aspectRatio = originalWidth / originalHeight;
      
      // Calculate container size maintaining aspect ratio
      let width = Math.min(vw, originalWidth);
      let height = vh;
      
      // If width would be too small for viewport height, adjust
      if (width / aspectRatio < vh) {
        height = vh;
        width = height * aspectRatio;
      } else {
        height = width / aspectRatio;
      }
      
      // Don't exceed original dimensions
      if (width > originalWidth) {
        width = originalWidth;
        height = originalHeight;
      }
      
      setContainerSize({ width, height });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

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

      <div className="bg-[#2b0d0d] flex items-center justify-center min-h-screen overflow-hidden">
        {/* Responsive game container */}
        <div
          className="relative shadow-2xl border-2 border-red-500 flex flex-col justify-end items-center mx-auto overflow-hidden"
          style={{
            width: `${containerSize.width}px`,
            height: `${containerSize.height}px`,
            backgroundImage: `url(${casinoTable})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {/* Home icon - responsive positioning */}
          <div 
            className="absolute z-30 text-[#450b00] rounded-full bg-yellow-700 border-yellow-500 border-y-2 select-none"
            style={{
              top: `${2}%`,
              left: `${2}%`,
              padding: `${containerSize.width * 0.02}px`,
            }}
          >
            <AiFillHome 
              size={Math.max(16, containerSize.width * 0.05)} 
              className="md:text-3xl" 
            />
          </div>

          {/* Other players icon - responsive positioning */}
          <div 
            className="absolute z-30 text-[rgb(253,155,137)] rounded-[8px] border-yellow-600 border-r-2 border-t-2 bg-[#450b00] select-none"
            style={{
              top: `${40.8}%`,
              right: `${3}%`,
              padding: `${containerSize.width * 0.02}px`,
            }}
          >
            <FaUserAlt 
              size={Math.max(14, containerSize.width * 0.04)} 
              className="md:text-2xl" 
            />
          </div>

          {/* Trend icon - responsive positioning */}
          <div
            className="absolute z-30 text-[#450b00] rounded-full bg-yellow-700 border-yellow-500 border-y-2 select-none cursor-pointer"
            style={{
              top: `${47.2}%`,
              left: `${16}%`,
              padding: `${containerSize.width * 0.015}px`,
            }}
          >
            <MdTrendingUp size={Math.max(20, containerSize.width * 0.055)} />
          </div>

          {/* New icon - responsive positioning */}
          <div 
            className="absolute z-400 text-[#450b00] rounded-t-full rounded-r-full bg-yellow-700 border-yellow-500 border-2 select-none"
            style={{
              top: `${45.1}%`,
              right: `${18.5}%`,
            }}
          >
            <MdOutlineFiberNew size={Math.max(16, containerSize.width * 0.044)} />
          </div>

          {/* Timer - responsive positioning */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              top: `${40.8}%`,
              left: '50%',
              transform: 'translateX(-50%)',
              width: `${containerSize.width * 0.13}px`,
              height: `${containerSize.height * 0.054}px`,
              backgroundImage: `url(${clockIcon})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div
              className="flex items-center justify-center font-bold text-[#443001] select-none"
              style={{ 
                backgroundColor: "transparent",
                fontSize: `${Math.max(14, containerSize.width * 0.026)}px`,
                paddingTop: `${containerSize.height * 0.01}px`
              }}
            >
              {timer}
            </div>
          </div>

          <div className="z-40 flex items-center justify-between px-4 py-2 rounded-xl shadow-lg max-w-[370px] mx-auto mb-4 bg-transparent">
            {/* Trend Bar - responsive positioning */}
            <div 
              className="absolute bg-black/40 rounded-lg flex items-center gap-1 flex-wrap border-blue-300 border-y justify-center flex-1"
              style={{
                top: `${47.8}%`,
                right: `${22}%`,
                padding: `${containerSize.width * 0.01}px`,
                borderRadius: `${containerSize.width * 0.01}px`,
                maxWidth: `${containerSize.width * 0.38}px`,
              }}
            >
              {trends.map((v, i) => (
                <div
                  key={i}
                  className={
                    "flex justify-center items-center rounded-[4px] text-yellow-600 font-extrabold border-b-[2px] select-none shadow " +
                    (v === "T"
                      ? "bg-[#7f4f25] text-white border-[#c8a978]"
                      : v === "D"
                      ? "bg-[#326474] text-white border-[#93d7f8]"
                      : "bg-[#255e38] text-white border-[#43ad66]")
                  }
                  style={{
                    width: `${containerSize.width * 0.04}px`,
                    height: `${containerSize.width * 0.04}px`,
                    fontSize: `${Math.max(10, containerSize.width * 0.02)}px`,
                  }}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>

          {/* Dragon animation on left - responsive positioning */}
          <div
            className="absolute animate-upDownImg"
            style={{
              left: "2%",
              top: "20%",
              width: `${containerSize.width * 0.25}px`,
              maxWidth: "180px",
              zIndex: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <img
              src={dragonBody}
              alt="Dragon"
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          {/* Tiger animation on right with flame effects - responsive positioning */}
          <div
            className="absolute animate-upDownImg"
            style={{
              right: "2%",
              top: "20%",
              width: `${containerSize.width * 0.25}px`,
              maxWidth: "180px",
              zIndex: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <img
              src={tigerBody}
              alt="Tiger"
              style={{ width: "100%", height: "auto" }}
            />
            <div
              className="flame-container"
              style={{ 
                width: "100%", 
                height: containerSize.height * 0.45,
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                pointerEvents: "none",
                zIndex: 16,
                overflow: "visible"
              }}
            >
              <div className="flame-particle"></div>
              <div className="flame-particle"></div>
              <div className="flame-particle"></div>
            </div>
          </div>

          {/* User balance - responsive positioning */}
          <div 
            className="absolute z-50 text-[#ffe0da] rounded-lg bg-[#5f1e11] border-[#5b6612] border select-none"
            style={{
              bottom: `${7.2}%`,
              left: `${36}%`,
              padding: `${containerSize.width * 0.008}px`,
            }}
          >
            <MdCurrencyRupee size={Math.max(16, containerSize.width * 0.044)} />
          </div>

          {/* Balance display - responsive positioning */}
          <div
            className="z-40 flex-wrap justify-center flex-1 absolute text-white rounded-3xl border-2 border-[#5f5c07] select-none"
            style={{
              bottom: `${4}%`,
              left: `${40}%`,
              width: `${20}%`,
              backgroundImage: `
                repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 20px),
                repeating-linear-gradient(-45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 20px)
              `,
              backgroundSize: "20px 20px",
              backgroundColor: "#000000",
            }}
          >
            <h1 
              className="font-bold text-center"
              style={{
                paddingBottom: `${containerSize.height * 0.032}px`,
                fontSize: `${Math.max(12, containerSize.width * 0.03)}px`,
              }}
            >
              951888
            </h1>
          </div>

          {/* TIE betting area - responsive positioning */}
          <div 
            className="absolute rounded-xl border-blue-400 bg-gradient-to-br from-emerald-900 to-teal-700 shadow-lg cursor-pointer select-none flex items-center justify-center"
            style={{
              bottom: `${35}%`,
              left: '10%',
              width: `${80}%`,
              height: `${15}%`,
              borderWidth: `${containerSize.width * 0.005}px`,
              borderRadius: `${containerSize.width * 0.026}px`,
            }}
          >
            {/* Total bets count centered on top layer */}
            <span
              className="absolute text-emerald-100/65 font-bold bg-green-700 bg-opacity-40 rounded-b-sm select-none"
              style={{
                top: '2vh',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
                padding: `0 ${containerSize.width * 0.08}px`,
                fontSize: `${Math.max(12, containerSize.width * 0.03)}px`,
              }}
            >
              0
            </span>

            <div 
              className="absolute rounded-xl bg-gradient-to-br from-emerald-700 to-cyan-700 opacity-20 blur-lg pointer-events-none"
              style={{
                inset: `-${containerSize.width * 0.05}px`,
              }}
            ></div>

            <div 
              className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-800 to-teal-800"
              style={{
                height: '87%',
                width: '100%',
              }}
            >
              <span
                className="text-cyan-100 font-semibold tracking-wide"
                style={{
                  textShadow: '0 2px 5px #0c4a6e',
                  opacity: 0.5,
                  fontSize: `${Math.max(16, containerSize.width * 0.044)}px`,
                }}
              >
                TIE x10
              </span>
            </div>
          </div>



          {/* Dragon betting area - responsive positioning */}
          <div 
            className="absolute rounded-xl border-black bg-gradient-to-br from-indigo-900 to-blue-700 shadow-lg cursor-pointer select-none flex items-center justify-center"
            style={{
              bottom: `${9}%`,
              left: `${8}%`,
              width: `${40}%`,
              height: `${25}%`,
              borderWidth: `${containerSize.width * 0.002}px`,
              borderRadius: `${containerSize.width * 0.026}px`,
            }}
          >
            {/* Total bets count centered on top layer */}
            <span
              className="absolute text-emerald-100/65 font-bold bg-indigo-900 bg-opacity-40 rounded-b-sm select-none"
              style={{
                top: '2vh',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
                padding: `0 ${containerSize.width * 0.06}px`,
                fontSize: `${Math.max(12, containerSize.width * 0.03)}px`,
              }}
            >
              0
            </span>

            <div 
              className="relative rounded-xl bg-gradient-to-br from-blue-700 to-sky-700 opacity-20 blur-lg pointer-events-none"
              style={{
                inset: `-${containerSize.width * 0.05}px`,
              }}
            ></div>

            <div 
              className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-800 to-blue-800"
              style={{
                height: '76%',
                width: '100%',
              }}
            >
              <span
                className="text-blue-500 font-semibold tracking-wide"
                style={{ 
                  opacity: 0.5, 
                  textShadow: '0 2px 0 black', 
                  display: 'inline-flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  fontSize: `${Math.max(14, containerSize.width * 0.038)}px`,
                }}
              >
                <span>DRAGON</span>
                <span>2x</span>
              </span>
            </div>
          </div>

          {/* Tiger betting area - responsive positioning */}
          <div 
            className="absolute rounded-xl border-black bg-gradient-to-br from-red-900 to-yellow-700 shadow-lg cursor-pointer select-none flex items-center justify-center"
            style={{
              bottom: `${9}%`,
              right: `${8}%`,
              width: `${40}%`,
              height: `${25}%`,
              borderWidth: `${containerSize.width * 0.002}px`,
              borderRadius: `${containerSize.width * 0.026}px`,
            }}
          >
            {/* Total bets count centered on top layer */}
            <span
              className="absolute text-emerald-100/65 font-bold bg-red-900 bg-opacity-40 rounded-b-sm select-none"
              style={{
                top: '2vh',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
                padding: `0 ${containerSize.width * 0.06}px`,
                fontSize: `${Math.max(12, containerSize.width * 0.03)}px`,
              }}
            >
              0
            </span>

            <div 
              className="relative rounded-xl bg-gradient-to-br from-red-700 to-yellow-700 opacity-20 blur-lg pointer-events-none"
              style={{
                inset: `-${containerSize.width * 0.05}px`,
              }}
            ></div>

            <div 
              className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-yellow-800 to-red-800"
              style={{
                height: '76%',
                width: '100%',
              }}
            >
              <span
                className="text-yellow-500 font-semibold tracking-wide"
                style={{ 
                  opacity: 0.5, 
                  textShadow: '0 2px 0 black', 
                  display: 'inline-flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  fontSize: `${Math.max(14, containerSize.width * 0.038)}px`,
                }}
              >
                <span>TIGER</span>
                <span>2x</span>
              </span>
            </div>
          </div>









          {/* Bottom chips bar - responsive positioning */}
          <div 
            className="fixed z-40 bottom-0 transform -translate-x-1/2"
            style={{
              left: '50%',
              width: '100%',
              maxWidth: `${containerSize.width}px`,
              zIndex: 20,
            }}
          >
            <div 
              className="border-t-4 border-[#5f5c07]" 
              style={{
                borderTopWidth: `${containerSize.width * 0.009}px`,
              }}
            />
            <div
              className="rounded-tl-lg rounded-tr-lg flex flex-col items-center bg-black relative overflow-hidden border border-[#2b0d0d] rounded-t-none shadow-inner"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(45deg, rgba(255,255,25,0.05) 0, rgba(25,255,255,0.05) 1px, transparent 1px, transparent 20px),
                  repeating-linear-gradient(-45deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 20px)
                `,
                backgroundSize: "25px 30px",
                borderRadius: `${containerSize.width * 0.015}px ${containerSize.width * 0.015}px 0 0`,
              }}
            >
              <div 
                className="flex justify-center flex-wrap"
                style={{
                  gap: `${containerSize.width * 0.06}px`,
                  padding: `${containerSize.width * 0.02}px`,
                }}
              >
                {chips.map((chip) => (
                  <img
                    key={chip.id}
                    src={chip.src}
                    alt={chip.alt}
                    className={`object-contain rounded-full ${
                      selectedChip === chip.id ? "pulse-zoom" : ""
                    }`}
                    style={{
                      width: `${containerSize.width * 0.15}px`,
                      height: `${containerSize.width * 0.15}px`,
                    }}
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
