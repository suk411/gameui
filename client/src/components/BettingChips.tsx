import React from "react";

interface BettingChipsProps {
  selectedChip: number | null;
  setSelectedChip: (chip: number | null) => void;
  vertical?: boolean;
}

const CHIP_STYLES = {
  10: { bg: '#3b82f6', border: '#1d4ed8', text: '10' },
  50: { bg: '#ef4444', border: '#991b1b', text: '50' },
  100: { bg: '#22c55e', border: '#15803d', text: '100' },
  500: { bg: '#eab308', border: '#854d0e', text: '500' },
  10000: { bg: '#8b5cf6', border: '#5b21b6', text: '10K' },
};

export default function BettingChips({ selectedChip, setSelectedChip }: BettingChipsProps) {
  const chips = [
    { value: 10, style: CHIP_STYLES[10] },
    { value: 50, style: CHIP_STYLES[50] },
    { value: 100, style: CHIP_STYLES[100] },
    { value: 500, style: CHIP_STYLES[500] },
    { value: 10000, style: CHIP_STYLES[10000] },
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
            rounded-full
            flex items-center justify-center
            font-bold text-white
            ${selectedChip === chip.value ? "scale-110 ring-2 sm:ring-4 ring-yellow-400" : ""}
          `}
          style={{
            backgroundColor: chip.style.bg,
            border: `4px solid ${chip.style.border}`,
            filter: selectedChip === chip.value
              ? "drop-shadow(0 0 10px rgba(251, 191, 36, 0.8))"
              : "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))",
            minWidth: "clamp(2.5rem, 8vw, 3.5rem)",
            minHeight: "clamp(2.5rem, 8vw, 3.5rem)",
            width: "clamp(2.5rem, 8vw, 3.5rem)",
            height: "clamp(2.5rem, 8vw, 3.5rem)",
            fontSize: "clamp(0.7rem, 2vw, 0.9rem)",
          }}
          aria-label={`Select ${chip.value} chip`}
        >
          {chip.style.text}
        </button>
      ))}
    </div>
  );
}