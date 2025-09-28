import React from "react";

interface SVGCardProps {
  value: number;
  suit: { name: string; symbol: string; color: string };
  isBack?: boolean;
}

const CARD_NAMES = { 1: "A", 11: "J", 12: "Q", 13: "K" };

export default function SVGCard({ value, suit, isBack = false }: SVGCardProps) {
  const displayValue = CARD_NAMES[value as keyof typeof CARD_NAMES] || value;
  
  if (isBack) {
    return (
      <svg width="63" height="91" viewBox="0 0 63 91" className="card-svg">
        {/* Card background */}
        <rect
          x="1"
          y="1"
          width="61"
          height="89"
          rx="6"
          ry="6"
          fill="url(#cardBackGradient)"
          stroke="#fff"
          strokeWidth="2"
        />
        {/* Back pattern */}
        <defs>
          <pattern id="backPattern" patternUnits="userSpaceOnUse" width="8" height="8">
            <rect width="4" height="4" fill="#b30000"/>
            <rect x="4" y="4" width="4" height="4" fill="#b30000"/>
            <rect x="4" y="0" width="4" height="4" fill="#7a0000"/>
            <rect x="0" y="4" width="4" height="4" fill="#7a0000"/>
          </pattern>
          <linearGradient id="cardBackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d00000"/>
            <stop offset="100%" stopColor="#9a0000"/>
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="57" height="85" rx="4" fill="url(#backPattern)"/>
        {/* Decorative border */}
        <rect x="5" y="5" width="53" height="81" rx="3" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.3"/>
      </svg>
    );
  }

  const suitSymbols = {
    2: "♠♠",
    3: "♠♠♠", 
    4: "♠♠\n♠♠",
    5: "♠♠\n♠\n♠♠",
    6: "♠♠♠\n♠♠♠",
    7: "♠♠♠\n♠\n♠♠♠",
    8: "♠♠♠\n♠♠\n♠♠♠",
    9: "♠♠♠\n♠♠♠\n♠♠♠",
    10: "♠♠♠♠\n♠♠\n♠♠♠♠"
  };

  return (
    <svg width="63" height="91" viewBox="0 0 63 91" className="card-svg">
      <defs>
        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="90%" stopColor="#f9f9f9"/>
        </linearGradient>
      </defs>
      
      {/* Card background */}
      <rect
        x="1"
        y="1"
        width="61"
        height="89"
        rx="6"
        ry="6"
        fill="url(#cardGradient)"
        stroke="#fff"
        strokeWidth="2"
      />
      
      {/* Top left corner */}
      <text
        x="6"
        y="12"
        fontSize="9"
        fontWeight="bold"
        fill={suit.color}
        textAnchor="start"
      >
        {displayValue}
      </text>
      <text
        x="6"
        y="22"
        fontSize="8"
        fill={suit.color}
        textAnchor="start"
      >
        {suit.symbol}
      </text>
      
      {/* Bottom right corner (rotated) */}
      <g transform="rotate(180 31.5 45.5)">
        <text
          x="6"
          y="12"
          fontSize="9"
          fontWeight="bold"
          fill={suit.color}
          textAnchor="start"
        >
          {displayValue}
        </text>
        <text
          x="6"
          y="22"
          fontSize="8"
          fill={suit.color}
          textAnchor="start"
        >
          {suit.symbol}
        </text>
      </g>
      
      {/* Center suit symbol */}
      <text
        x="31.5"
        y="50"
        fontSize="20"
        fontWeight="600"
        fill={suit.color}
        textAnchor="middle"
        dominantBaseline="middle"
        opacity="0.97"
      >
        {suit.symbol}
      </text>
      
      {/* Additional symbols for number cards */}
      {value >= 2 && value <= 10 && (
        <g>
          {Array.from({ length: Math.min(value, 9) }, (_, i) => {
            const positions = [
              { x: 31.5, y: 25 }, { x: 31.5, y: 66 }, // 2
              { x: 31.5, y: 35 }, // 3 (middle)
              { x: 20, y: 25 }, { x: 43, y: 25 }, // 4 (sides top)
              { x: 20, y: 66 }, { x: 43, y: 66 }, // 4 (sides bottom)
              { x: 20, y: 45 }, { x: 43, y: 45 } // 6 (middle sides)
            ];
            
            let posIndex = i;
            if (value === 3 && i === 2) posIndex = 2; // middle for 3
            if (value >= 4) {
              if (i < 2) posIndex = i; // top two
              else if (i < 4) posIndex = i + 2; // bottom two  
              else if (value >= 6) posIndex = i + 3; // middle sides
            }
            
            if (posIndex < positions.length) {
              return (
                <text
                  key={i}
                  x={positions[posIndex].x}
                  y={positions[posIndex].y}
                  fontSize="12"
                  fill={suit.color}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {suit.symbol}
                </text>
              );
            }
            return null;
          })}
        </g>
      )}
    </svg>
  );
}