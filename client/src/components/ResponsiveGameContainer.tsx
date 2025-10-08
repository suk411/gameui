
import { ReactNode, useEffect, useState, useCallback } from "react";

interface ResponsiveGameContainerProps {
  children: ReactNode;
  aspectRatio?: number;
}

export default function ResponsiveGameContainer({ 
  children, 
  aspectRatio = 16 / 9 
}: ResponsiveGameContainerProps) {
  const [scale, setScale] = useState(1);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const calculateScale = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate dimensions based on aspect ratio
    let gameWidth = viewportWidth;
    let gameHeight = viewportWidth / aspectRatio;
    
    if (gameHeight > viewportHeight) {
      gameHeight = viewportHeight;
      gameWidth = viewportHeight * aspectRatio;
    }
    
    // Calculate scale for proper sizing
    const scaleValue = Math.min(
      viewportWidth / 1920,
      viewportHeight / 1080,
      1
    );
    
    setScale(scaleValue);
    setDimensions({ width: gameWidth, height: gameHeight });
  }, [aspectRatio]);

  useEffect(() => {
    calculateScale();
    
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculateScale, 100);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [calculateScale]);

  return (
    <div 
      className="flex items-center justify-center w-screen h-screen bg-black overflow-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div
        className="relative"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          maxWidth: '100vw',
          maxHeight: '100vh',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </div>
  );
}
