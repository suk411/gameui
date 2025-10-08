import React, { useEffect, useState } from "react";

interface CoinAnimationProps {
  amount: number;
  targetId: string;
  onComplete: () => void;
}

const CHIP_COLORS = {
  10: { bg: '#3b82f6', border: '#1d4ed8' },
  50: { bg: '#ef4444', border: '#991b1b' },
  100: { bg: '#22c55e', border: '#15803d' },
  500: { bg: '#eab308', border: '#854d0e' },
  10000: { bg: '#8b5cf6', border: '#5b21b6' },
};

export default function CoinAnimation({ amount, targetId, onComplete }: CoinAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Map targetId to actual betting area elements
    const targetMap: Record<string, string> = {
      'dragon': 'dragon-betting-area',
      'tiger': 'tiger-betting-area',
      'tie': 'tie-betting-area'
    };
    
    const actualTargetId = targetMap[targetId] || targetId;
    const targetElement = document.getElementById(actualTargetId);
    
    if (targetElement) {
      const targetRect = targetElement.getBoundingClientRect();
      const centerX = targetRect.left + targetRect.width / 2;
      const centerY = targetRect.top + targetRect.height / 2;
      setTargetPosition({ x: centerX, y: centerY });
    }

    const timer = setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 800);

    return () => clearTimeout(timer);
  }, [onComplete, targetId]);

  if (!isAnimating) return null;

  // Select appropriate chip color based on amount
  let chipColor = CHIP_COLORS[10];
  if (amount >= 10000) chipColor = CHIP_COLORS[10000];
  else if (amount >= 500) chipColor = CHIP_COLORS[500];
  else if (amount >= 100) chipColor = CHIP_COLORS[100];
  else if (amount >= 50) chipColor = CHIP_COLORS[50];

  return (
    <>
      <style>{`
        @keyframes coinFly {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(var(--tx), var(--ty)) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0.5);
            opacity: 0;
          }
        }
        .coin-flying {
          position: fixed;
          z-index: 1000;
          pointer-events: none;
          animation: coinFly 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      <div
        className="coin-flying"
        style={{
          width: "32px",
          height: "32px",
          left: "50%",
          bottom: "80px",
          transform: "translateX(-50%)",
          "--tx": `${targetPosition.x - window.innerWidth / 2}px`,
          "--ty": `${targetPosition.y - window.innerHeight + 80}px`,
          backgroundColor: chipColor.bg,
          border: `3px solid ${chipColor.border}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
        } as React.CSSProperties}
      >
        {amount >= 1000 ? `${amount/1000}K` : amount}
      </div>
    </>
  );
}
