import React, { useState } from "react";
import casinoTable from '../assets/casino-table.png';
import { GoPersonFill } from "react-icons/go";

import chip10 from "../assets/chip-10.png";
import chip50 from "../assets/chip-50.png";
import chip100 from "../assets/chip-100.png";
import chip500 from "../assets/chip-500.png";
import chip10k from "../assets/chip-10k.png";

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
          @keyframes pulseScale {
            0%, 100% { transform: scale(1.03); box-shadow: 0 0 2px 2px #FFD700; }
            50% { transform: scale(1.08); box-shadow: 0 0 3px 4px #FFD700; }
          }
          .pulse-zoom {
            animation: pulseScale 1s ease-in-out infinite;
            border-radius: 9999px;
            border: 2px solid #FFD700;
          }
        `}
      </style>
      <div className="min-h-screen flex justify-center bg-black" style={{ overflowX: 'hidden', height: '100vh', width: '100vw' }}>
        {/* Container with max width aligned to background image */}
        <div
          className="w-full max-w-md flex flex-col justify-between"
          style={{
            height: '100%', 
            backgroundImage: `url(${casinoTable})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
          }}
        >
          {/* Spacer for content above or place actual game UI here if needed */}
          <div className="flex-grow" />

          {/* Chip bar container attached to background width */}
          <div>
            <div
              style={{
                height: '6px',
                background: 'linear-gradient(90deg, #8b5a2b, #a97453, #8b5a2b)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
              }}
            />
            <div className="flex flex-col items-center bg-black px-4 py-3 rounded-t-none shadow-inner w-full border-t border-[#8b5a2b]">
              <div className="flex items-center mb-2 space-x-3">
                <GoPersonFill
                  size={32}
                  color="white"
                  style={{ borderRadius: "50%", border: "4px solid #2b0d0d", backgroundColor: "#2b0d0d" }}
                />
                <span className="text-white text-base font-semibold">1.7</span>
              </div>
              <div className="flex gap-4">
                {chips.map((chip) => (
                  <img
                    key={chip.id}
                    src={chip.src}
                    alt={chip.alt}
                    className={`w-12 h-12 cursor-pointer object-contain rounded-full ${
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
