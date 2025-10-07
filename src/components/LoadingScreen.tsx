import { useEffect, useState } from "react";
import casinoTable from "../assets/image.png";
import dragonBody from "../assets/dragon-body.png";
import tigerBody from "../assets/tiger-body.png";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const imagesToPreload = [casinoTable, dragonBody, tigerBody];
    let loadedCount = 0;

    const preloadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setProgress(Math.floor((loadedCount / imagesToPreload.length) * 100));
          resolve(src);
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    Promise.all(imagesToPreload.map(preloadImage))
      .then(() => {
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
