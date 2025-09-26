import React, { useState } from "react";
import GameBoard from "./GameBoard";

export default function DragonTigerGame() {
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const [timer, setTimer] = useState(15);

  return (
    <GameBoard 
      selectedChip={selectedChip} 
      setSelectedChip={setSelectedChip} 
      timer={timer} 
    />
  );
}
