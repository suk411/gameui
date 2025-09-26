import React from "react";
import casinoTable from "../assets/casino-table.png";
import TopBar from "./TopBar";
import TrendSection from "./TrendSection";
import BettingArea from "./BettingArea";
import BottomBar from "./BottomBar";

interface GameBoardProps {
  selectedChip: number | null;
  setSelectedChip: (chip: number | null) => void;
  timer: number;
}

export default function GameBoard({ selectedChip, setSelectedChip, timer }: GameBoardProps) {
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
            max-width: 367px; /* Mobile viewport size */
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
              height: min(100vh - 40px, calc((367px) * 2));
              width: min(367px, calc((100vh - 40px) / 2));
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
          <TopBar timer={timer} />
          <TrendSection />
          <BettingArea />
        </div>
        <BottomBar selectedChip={selectedChip} setSelectedChip={setSelectedChip} />
      </div>
    </>
  );
}