import React, { useState } from "react";
import casinoTable from '../assets/casino-table.png';
import { AiFillHome } from "react-icons/ai";

import chip10 from "../assets/chip-10.png";
import chip50 from "../assets/chip-50.png";
import chip100 from "../assets/chip-100.png";
import chip500 from "../assets/chip-500.png";
import chip10k from "../assets/chip-10k.png";
import tigerBody from '../assets/tiger-body.png';
import dragonBody from '../assets/dragon-body.png';

export default function MyComponent() {
  const [selectedChip, setSelectedChip] = useState(null);

  const chips = [
    { id: 10, src: chip10, alt: "10" },
    { id: 50, src: chip50, alt: "50" },
    { id: 100, src: chip100, alt: "100" },
    { id: 500, src: chip500, alt: "500" },
    { id: 10000, src: chip10k, alt: "10k" },
  ];

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

          /* Smooth vertical image movement */
          @keyframes upDownImg {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .animate-upDownImg {
            animation: upDownImg 4s ease-in-out infinite;
          }

          /* Flame container animates upward */
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

          /* Creature container for positioning images */
          .creature-container {
            position: absolute;
            top: 25%;
            width: 90px;
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
          overflow: 'hidden',
        }}
      >
        <div
          className="relative rounded-xl shadow-2xl bg-cover bg-no-repeat bg-center"
          style={{
            width: "100vw",
            maxWidth: "430px",
            minWidth: "320px",
            height: "100vh",
            maxHeight: "932px",
            minHeight: "500px",
            backgroundImage: `url(${casinoTable})`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* Home icon */}
          <div className="absolute top-3 left-3 cursor-pointer z-30 text-[#450b00] rounded-full bg-yellow-700 border-yellow-500 border-y-2 select-none">
            <AiFillHome size={28} />
          </div>
          {/* Dragon container on left with no effect */}
          <div
            className="creature-container animate-upDownImg"
            style={{
              left: 0,
              top:75,
              width: 180,  // 3x approx 90px * 3
              height: 'auto', // keep aspect ratio
            }}
          >
            <img src={dragonBody} alt="Dragon" style={{ width: '100%', height: 'auto' }} />
          </div>

         {/* Tiger container on right with flame effects */}
          <div
            className="creature-container animate-upDownImg"
            style={{
              right: 0,
              top: 75,
              width: 180,  // 3x approx 90px * 3
              height: 'auto', // keep auto to maintain aspect ratio
            }}
          >
            <img src={tigerBody} alt="Tiger" style={{ width: '100%', height: 'auto' }} />
            <div className="flame-container" style={{ width: '100%', height: 140 * 3 }}>
           
              <div className="flame-particle"></div>
              <div className="flame-particle"></div>
              <div className="flame-particle"></div>
            </div>
          </div>


          {/* Bottom chips bar */}
          <div
            className="w-full"
            style={{
              position: 'fixed',
              left: '50%',
              bottom: 0,
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: "430px",
              zIndex: 20,
            }}
          >
            <div
              style={{
                height: '6px',
                background:
                  'linear-gradient(90deg, #8b5a2b, #a97453, #8b5a2b)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
              }}
            />
            <div className="flex flex-col items-center bg-black px-4 py-3 rounded-t-none shadow-inner w-full border-t border-[#8b5a2b]">
              <div className="flex gap-4 justify-center">
                {chips.map((chip) => (
                  <img
                    key={chip.id}
                    src={chip.src}
                    alt={chip.alt}
                    className={`w-14 h-14 cursor-pointer object-contain rounded-full ${
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
