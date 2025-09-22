import React from "react";
import { Button } from "@/components/ui/button";
import casinoTable from "@/assets/casino-table.png";
import chipsImage from "@/assets/casino-chips-hd.png";
import tigerCard from "@/assets/tiger-betting-card-hd.png";
import dragonCard from "@/assets/dragon-betting-card-hd.png";

const DragonTigerGame = () => {
  // Mock betting history data
  const bettingHistory = [
    { type: "T", color: "bg-gold" },
    { type: "T", color: "bg-tiger" },
    { type: "T", color: "bg-tiger" },
    { type: "D", color: "bg-dragon" },
    { type: "T", color: "bg-tiger" },
    { type: "D", color: "bg-dragon" },
    { type: "T", color: "bg-tiger" },
    { type: "T", color: "bg-tiger" },
    { type: "D", color: "bg-dragon" },
    { type: "T", color: "bg-tiger" },
    { type: "D", color: "bg-dragon" },
  ];

  const chipValues = [10, 50, 100, 500, 1000, 10000];
  
  const chipColors = [
    "from-tiger to-tiger-glow",
    "from-emerald-500 to-emerald-400",
    "from-dragon to-dragon-glow",
    "from-purple-600 to-purple-400",
    "from-red-600 to-red-400",
    "from-slate-700 to-slate-500"
  ];

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col"
      style={{ 
        backgroundImage: `url(${casinoTable})`,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Mystical overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/60" />
      
      {/* Top section with dealer and dragons */}
      <div className="relative z-10 flex-1 flex flex-col items-center pt-4 px-4">
        
        {/* Timer and status bar */}
        <div className="w-full max-w-md mb-4">
          <div className="flex items-center justify-between bg-card/80 backdrop-blur-sm rounded-2xl p-3 border border-border">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center border-2 border-gold-glow">
                <span className="text-lg font-bold text-gold-foreground">2</span>
              </div>
              <span className="text-sm font-medium text-foreground">Draw Time</span>
            </div>
            <div className="text-sm font-medium text-muted-foreground">Last</div>
            <div className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-gold rounded-sm" />
            </div>
          </div>
        </div>

        {/* Betting history */}
        <div className="flex gap-1 mb-6">
          {bettingHistory.map((bet, index) => (
            <div
              key={index}
              className={`w-7 h-7 rounded-lg ${bet.color} flex items-center justify-center border border-border shadow-sm`}
            >
              <span className="text-xs font-bold text-white">{bet.type}</span>
            </div>
          ))}
        </div>

        {/* Dealer section - now part of background */}
        <div className="relative mb-6">
          <div className="h-20" /> {/* Spacer for dealer area */}
        </div>

        {/* TIE betting area */}
        <div className="w-full max-w-sm mb-4">
          <Button 
            variant="default"
            size="lg"
            className="w-full h-16 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg rounded-2xl border-2 border-ring shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <div className="flex flex-col items-center">
              <div className="text-xs opacity-80">TIE X10</div>
              <div>Click to play</div>
            </div>
          </Button>
        </div>

        {/* Dragon vs Tiger betting cards */}
        <div className="flex gap-4 mb-6 w-full max-w-sm">
          {/* Dragon */}
          <div className="flex-1 relative cursor-pointer transition-all duration-300 hover:scale-105">
            <img 
              src={dragonCard} 
              alt="Dragon betting card" 
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Tiger */}
          <div className="flex-1 relative cursor-pointer transition-all duration-300 hover:scale-105">
            <img 
              src={tigerCard} 
              alt="Tiger betting card" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* User info */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gold rounded-full border-2 border-gold-glow flex items-center justify-center">
            <span className="text-xs font-bold text-gold-foreground">P</span>
          </div>
          <span className="text-lg font-bold text-gold">1.7</span>
        </div>

        {/* Betting chips */}
        <div className="flex flex-wrap gap-2 justify-center max-w-sm">
          {chipValues.map((value, index) => (
            <div
              key={value}
              className="relative w-16 h-16 cursor-pointer transition-all duration-300 hover:scale-110"
              style={{
                backgroundImage: `url(${chipsImage})`,
                backgroundPosition: `${-index * 256}px 0px`,
                backgroundSize: '1536px 512px',
                backgroundRepeat: 'no-repeat'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DragonTigerGame;