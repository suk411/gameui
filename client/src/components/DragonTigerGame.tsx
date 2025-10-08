import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import BettingAreaWithBets from "./BettingAreaWithBets";
import BottomBar from "./BottomBar";
import { useGameManager } from "@/hooks/useGameManager";
import { Toaster } from "@/components/ui/toaster";
import OrientationGuard from "./OrientationGuard";
import ResponsiveGameContainer from "./ResponsiveGameContainer";

export default function DragonTigerGame() {
  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const [timer] = useState(15);
  const { balance } = useGameManager();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <Toaster />
      <OrientationGuard />
      <style>
        {`
          html, body, #root {
             height: 100%;
             margin: 0;
             padding: 0;
             background: #000;
             overflow: hidden;
           }
          .game-container {
            position: relative;
            width: 100%;
            height: 100%;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .mobile-viewport {
            position: relative;
            width: 100%;
            height: 100%;
            background-image: url('/casino-table-bg.svg');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            overflow: hidden;
          }
          .game-element {
            position: absolute;
          }
          @media (max-width: 767px) {
            .mobile-viewport {
              min-height: 100vh;
            }
          }
          @media (min-width: 768px) and (max-width: 1024px) {
            .mobile-viewport {
              max-width: 90vw;
              max-height: 90vh;
            }
          }
          @media (min-width: 1025px) {
            .mobile-viewport {
              max-width: 80vw;
              max-height: 85vh;
            }
          }
        `}
      </style>

      {isMobile ? (
        <>
          {/* Mobile layout - original design */}
          <div className="fixed top-4 left-4 z-50">
            <TopBar />
          </div>
          <div className="game-container">
            <div className="mobile-viewport">
              <BettingAreaWithBets timer={timer} selectedChip={selectedChip} />
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center">
            <BottomBar selectedChip={selectedChip} setSelectedChip={setSelectedChip} balance={balance} />
          </div>
        </>
      ) : (
        <ResponsiveGameContainer aspectRatio={16 / 9}>
          <div className="relative w-full h-full">
            <div className="absolute top-4 left-4 z-50">
              <TopBar />
            </div>
            <div className="game-container">
              <div className="mobile-viewport">
                <BettingAreaWithBets timer={timer} selectedChip={selectedChip} />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-50 flex flex-col items-center">
              <BottomBar selectedChip={selectedChip} setSelectedChip={setSelectedChip} balance={balance} />
            </div>
          </div>
        </ResponsiveGameContainer>
      )}
    </>
  );
}
