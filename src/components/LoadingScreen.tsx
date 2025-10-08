import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import casinoTable from "../assets/image.png";
import dragonBody from "../assets/dragon-body.png";
import tigerBody from "../assets/tiger-body.png";
import cardBack from "../assets/cards/card-back.svg";

// Import all card SVGs
import aceHearts from "../assets/cards/ace-hearts.svg";
import aceDiamonds from "../assets/cards/ace-diamonds.svg";
import aceClubs from "../assets/cards/ace-clubs.svg";
import aceSpades from "../assets/cards/ace-spades.svg";
import twoHearts from "../assets/cards/2-hearts.svg";
import twoSpades from "../assets/cards/2-spades.svg";
import threeDiamonds from "../assets/cards/3-diamonds.svg";
import fourClubs from "../assets/cards/4-clubs.svg";
import fiveHearts from "../assets/cards/5-hearts.svg";
import sixSpades from "../assets/cards/6-spades.svg";
import sevenClubs from "../assets/cards/7-clubs.svg";
import eightDiamonds from "../assets/cards/8-diamonds.svg";
import nineHearts from "../assets/cards/9-hearts.svg";
import tenDiamonds from "../assets/cards/10-diamonds.svg";
import jackClubs from "../assets/cards/jack-clubs.svg";
import jackSpades from "../assets/cards/jack-spades.svg";
import queenDiamonds from "../assets/cards/queen-diamonds.svg";
import queenHearts from "../assets/cards/queen-hearts.svg";
import kingSpades from "../assets/cards/king-spades.svg";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const imagesToPreload = [
      casinoTable, dragonBody, tigerBody, cardBack,
      aceHearts, aceDiamonds, aceClubs, aceSpades,
      twoHearts, twoSpades, threeDiamonds, fourClubs,
      fiveHearts, sixSpades, sevenClubs, eightDiamonds,
      nineHearts, tenDiamonds, jackClubs, jackSpades,
      queenDiamonds, queenHearts, kingSpades
    ];
    let loadedCount = 0;
    let serverConnected = false;

    const preloadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          const imageProgress = Math.floor((loadedCount / imagesToPreload.length) * 90);
          setProgress(imageProgress);
          resolve(src);
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    // Test server connection
    const testConnection = async () => {
      try {
        const { data } = await supabase
          .from("game_rounds")
          .select("id")
          .limit(1);
        serverConnected = true;
        setProgress(prev => Math.max(prev, 95));
      } catch (error) {
        console.error("Server connection test failed:", error);
      }
    };

    Promise.all([
      ...imagesToPreload.map(preloadImage),
      testConnection()
    ])
      .then(() => {
        setProgress(100);
        setAssetsLoaded(true);
        setTimeout(() => onLoadComplete(), 500);
      })
      .catch((error) => {
        console.error("Error loading assets:", error);
        setTimeout(() => onLoadComplete(), 1000);
      });
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 animate-pulse">
            Dragon Tiger
          </h1>
        </div>

        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-gray-400 text-sm">
          {assetsLoaded ? "Ready!" : `Loading assets... ${progress}%`}
        </p>
      </div>
    </div>
  );
}
