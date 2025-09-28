import React from "react";

interface SVGCardProps {
  value: number;
  suit: { name: string; symbol: string; color: string };
  isBack?: boolean;
}

const CARD_NAMES = { 1: "A", 11: "J", 12: "Q", 13: "K" };

export default function SVGCard({ value, suit, isBack = false }: SVGCardProps) {
  const displayValue = CARD_NAMES[value as keyof typeof CARD_NAMES] || value;
  
  // Helper function to render suit symbols for number cards
  const renderSuitSymbols = (value: number, suit: any) => {
    const positions: { [key: number]: Array<{x: number, y: number, rotate?: number}> } = {
      2: [
        { x: 31.5, y: 20 },
        { x: 31.5, y: 71, rotate: 180 }
      ],
      3: [
        { x: 31.5, y: 20 },
        { x: 31.5, y: 45.5 },
        { x: 31.5, y: 71, rotate: 180 }
      ],
      4: [
        { x: 20, y: 20 },
        { x: 43, y: 20 },
        { x: 20, y: 71, rotate: 180 },
        { x: 43, y: 71, rotate: 180 }
      ],
      5: [
        { x: 20, y: 20 },
        { x: 43, y: 20 },
        { x: 31.5, y: 45.5 },
        { x: 20, y: 71, rotate: 180 },
        { x: 43, y: 71, rotate: 180 }
      ],
      6: [
        { x: 20, y: 20 },
        { x: 43, y: 20 },
        { x: 20, y: 45.5 },
        { x: 43, y: 45.5 },
        { x: 20, y: 71, rotate: 180 },
        { x: 43, y: 71, rotate: 180 }
      ],
      7: [
        { x: 20, y: 20 },
        { x: 43, y: 20 },
        { x: 31.5, y: 32 },
        { x: 20, y: 45.5 },
        { x: 43, y: 45.5 },
        { x: 20, y: 71, rotate: 180 },
        { x: 43, y: 71, rotate: 180 }
      ],
      8: [
        { x: 20, y: 20 },
        { x: 43, y: 20 },
        { x: 31.5, y: 32 },
        { x: 20, y: 45.5 },
        { x: 43, y: 45.5 },
        { x: 31.5, y: 59, rotate: 180 },
        { x: 20, y: 71, rotate: 180 },
        { x: 43, y: 71, rotate: 180 }
      ],
      9: [
        { x: 20, y: 20 },
        { x: 43, y: 20 },
        { x: 20, y: 32.5 },
        { x: 43, y: 32.5 },
        { x: 31.5, y: 45.5 },
        { x: 20, y: 58.5, rotate: 180 },
        { x: 43, y: 58.5, rotate: 180 },
        { x: 20, y: 71, rotate: 180 },
        { x: 43, y: 71, rotate: 180 }
      ],
      10: [
        { x: 20, y: 18 },
        { x: 43, y: 18 },
        { x: 31.5, y: 26 },
        { x: 20, y: 35 },
        { x: 43, y: 35 },
        { x: 20, y: 56, rotate: 180 },
        { x: 43, y: 56, rotate: 180 },
        { x: 31.5, y: 65, rotate: 180 },
        { x: 20, y: 73, rotate: 180 },
        { x: 43, y: 73, rotate: 180 }
      ]
    };

    if (!positions[value]) return null;

    return positions[value].map((pos, i) => (
      <g key={i} transform={pos.rotate ? `rotate(${pos.rotate} ${pos.x} ${pos.y})` : undefined}>
        <text
          x={pos.x}
          y={pos.y}
          fontSize="10"
          fill={suit.color}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {suit.symbol}
        </text>
      </g>
    ));
  };

  // Face card designs
  const renderFaceCard = (value: number, suit: any) => {
    if (value === 1) { // Ace
      return (
        <text
          x="31.5"
          y="45.5"
          fontSize="28"
          fontWeight="600"
          fill={suit.color}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {suit.symbol}
        </text>
      );
    }
    
    if (value === 11) { // Jack
      return (
        <g>
          <rect x="15" y="25" width="33" height="41" rx="3" fill={suit.color === 'red' ? '#8B0000' : '#000080'} opacity="0.1"/>
          <text x="31.5" y="35" fontSize="8" fill={suit.color} textAnchor="middle" fontWeight="bold">JACK</text>
          <text x="31.5" y="50" fontSize="16" fill={suit.color} textAnchor="middle">{suit.symbol}</text>
          <text x="31.5" y="60" fontSize="8" fill={suit.color} textAnchor="middle" fontWeight="bold">OF</text>
          <text x="31.5" y="70" fontSize="7" fill={suit.color} textAnchor="middle">{suit.name.toUpperCase()}</text>
        </g>
      );
    }
    
    if (value === 12) { // Queen
      return (
        <g>
          <rect x="15" y="25" width="33" height="41" rx="3" fill={suit.color === 'red' ? '#8B0000' : '#000080'} opacity="0.1"/>
          <text x="31.5" y="35" fontSize="8" fill={suit.color} textAnchor="middle" fontWeight="bold">QUEEN</text>
          <text x="31.5" y="50" fontSize="16" fill={suit.color} textAnchor="middle">{suit.symbol}</text>
          <text x="31.5" y="60" fontSize="8" fill={suit.color} textAnchor="middle" fontWeight="bold">OF</text>
          <text x="31.5" y="70" fontSize="7" fill={suit.color} textAnchor="middle">{suit.name.toUpperCase()}</text>
        </g>
      );
    }
    
    if (value === 13) { // King
      return (
        <g>
          <rect x="15" y="25" width="33" height="41" rx="3" fill={suit.color === 'red' ? '#8B0000' : '#000080'} opacity="0.1"/>
          <text x="31.5" y="35" fontSize="8" fill={suit.color} textAnchor="middle" fontWeight="bold">KING</text>
          <text x="31.5" y="50" fontSize="16" fill={suit.color} textAnchor="middle">{suit.symbol}</text>
          <text x="31.5" y="60" fontSize="8" fill={suit.color} textAnchor="middle" fontWeight="bold">OF</text>
          <text x="31.5" y="70" fontSize="7" fill={suit.color} textAnchor="middle">{suit.name.toUpperCase()}</text>
        </g>
      );
    }
    
    return null;
  };
  
  if (isBack) {
    return (
      <svg width="63" height="91" viewBox="0 0 63 91" className="card-svg">
        <defs>
          <pattern id="backPattern" patternUnits="userSpaceOnUse" width="12" height="12">
            <rect width="6" height="6" fill="#b30000"/>
            <rect x="6" y="6" width="6" height="6" fill="#b30000"/>
            <rect x="6" y="0" width="6" height="6" fill="#7a0000"/>
            <rect x="0" y="6" width="6" height="6" fill="#7a0000"/>
          </pattern>
          <linearGradient id="cardBackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d00000"/>
            <stop offset="100%" stopColor="#9a0000"/>
          </linearGradient>
          <radialGradient id="backCenter" cx="50%" cy="50%" r="30%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05"/>
          </radialGradient>
        </defs>
        
        {/* Card background */}
        <rect x="1" y="1" width="61" height="89" rx="6" ry="6" fill="url(#cardBackGradient)" stroke="#fff" strokeWidth="2"/>
        
        {/* Pattern fill */}
        <rect x="3" y="3" width="57" height="85" rx="4" fill="url(#backPattern)"/>
        
        {/* Center decoration */}
        <circle cx="31.5" cy="45.5" r="15" fill="url(#backCenter)"/>
        <circle cx="31.5" cy="45.5" r="12" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.3"/>
        <circle cx="31.5" cy="45.5" r="8" fill="none" stroke="#fff" strokeWidth="0.5" opacity="0.2"/>
        
        {/* Corner decorations */}
        <circle cx="10" cy="12" r="3" fill="#fff" opacity="0.1"/>
        <circle cx="53" cy="12" r="3" fill="#fff" opacity="0.1"/>
        <circle cx="10" cy="79" r="3" fill="#fff" opacity="0.1"/>
        <circle cx="53" cy="79" r="3" fill="#fff" opacity="0.1"/>
      </svg>
    );
  }

  return (
    <svg width="63" height="91" viewBox="0 0 63 91" className="card-svg">
      <defs>
        <linearGradient id={`cardGradient-${value}-${suit.name}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="90%" stopColor="#f9f9f9"/>
        </linearGradient>
        <filter id={`cardShadow-${value}-${suit.name}`}>
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      {/* Card background */}
      <rect
        x="1"
        y="1"
        width="61"
        height="89"
        rx="6"
        ry="6"
        fill={`url(#cardGradient-${value}-${suit.name})`}
        stroke="#ddd"
        strokeWidth="1"
        filter={`url(#cardShadow-${value}-${suit.name})`}
      />
      
      {/* Top left corner */}
      <text x="6" y="14" fontSize="10" fontWeight="bold" fill={suit.color} textAnchor="start">
        {displayValue}
      </text>
      <text x="6" y="24" fontSize="9" fill={suit.color} textAnchor="start">
        {suit.symbol}
      </text>
      
      {/* Bottom right corner (rotated) */}
      <g transform="rotate(180 31.5 45.5)">
        <text x="6" y="14" fontSize="10" fontWeight="bold" fill={suit.color} textAnchor="start">
          {displayValue}
        </text>
        <text x="6" y="24" fontSize="9" fill={suit.color} textAnchor="start">
          {suit.symbol}
        </text>
      </g>
      
      {/* Render face cards or number cards */}
      {value === 1 || value >= 11 ? renderFaceCard(value, suit) : (
        <g>
          {renderSuitSymbols(value, suit)}
        </g>
      )}
    </svg>
  );
}