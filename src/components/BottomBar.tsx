import React from "react";
import BettingChips from "./BettingChips";
import UserBalance from "./UserBalance";

interface BottomBarProps {
  selectedChip: number | null;
  setSelectedChip: (chip: number | null) => void;
}

export default function BottomBar({ selectedChip, setSelectedChip }: BottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex flex-col items-center">
      <UserBalance />
      <BettingChips selectedChip={selectedChip} setSelectedChip={setSelectedChip} />
    </div>
  );
}