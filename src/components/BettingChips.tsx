import React from "react";
import chip10 from "../assets/chip-10.png";
import chip50 from "../assets/chip-50.png";
import chip100 from "../assets/chip-100.png";
import chip500 from "../assets/chip-500.png";
import chip10k from "../assets/chip-10k.png";

interface BettingChipsProps {
  selectedChip: number | null;
  setSelectedChip: (chip: number | null) => void;
}

export default function BettingChips({ selectedChip, setSelectedChip }: BettingChipsProps) {
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
          .pulse-zoom {
            animation: pulseScale 1s ease-in-out infinite;
            border-radius: 9999px;
            border: 2px solid #FFD700;
          }
          @keyframes pulseScale {
            0%, 100% { transform: scale(1.03); box-shadow: 0 0 2px 2px #FFD700; }
            50% { transform: scale(1.08); box-shadow: 0 0 3px 4px #FFD700; }
          }
        `}
      </style>

      <div className="w-full max-w-[367px]">
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
    </>
  );
}