import React from "react";
import chip10 from "../assets/chip-10.png";
import chip50 from "../assets/chip-50.png";
import chip100 from "../assets/chip-100.png";
import chip500 from "../assets/chip-500.png";
import chip10k from "../assets/chip-10k.png";

interface BettingChipsProps {
  selectedChip: number | null;
  setSelectedChip: (chip: number | null) => void;
  vertical?: boolean;
}

export default function BettingChips({ selectedChip, setSelectedChip }: BettingChipsProps) {
  const chips = [
    { value: 10, image: chip10 },
    { value: 50, image: chip50 },
    { value: 100, image: chip100 },
    { value: 500, image: chip500 },
    { value: 10000, image: chip10k },
  ];

  return (
    <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center items-center py-2 px-2">
      {chips.map((chip) => (
        <button
          key={chip.value}
          onClick={() => setSelectedChip(chip.value === selectedChip ? null : chip.value)}
          className={`
            relative transition-all duration-200 
            hover:scale-110 active:scale-95
            touch-manipulation
            ${selectedChip === chip.value ? "scale-110 ring-2 sm:ring-4 ring-yellow-400" : ""}
          `}
          style={{
            filter: selectedChip === chip.value
              ? "drop-shadow(0 0 10px rgba(251, 191, 36, 0.8))"
              : "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))",
            minWidth: "clamp(2.5rem, 8vw, 3.5rem)",
            minHeight: "clamp(2.5rem, 8vw, 3.5rem)",
          }}
          aria-label={`Select ${chip.value} chip`}
        >
          <img 
            src={chip.image} 
            alt={`${chip.value} chip`} 
            className="w-full h-full object-contain"
            style={{
              width: "clamp(2.5rem, 8vw, 3.5rem)",
              height: "clamp(2.5rem, 8vw, 3.5rem)",
            }}
          />
        </button>
      ))}
    </div>
  );
}