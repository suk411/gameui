import React from "react";
import { Button } from "@/components/ui/button";
import casinoBackground from "@/assets/casino-background.png";
import dragonImage from "@/assets/dragon.png";
import tigerImage from "@/assets/tiger.png";
import dealerImage from "@/assets/dealer.png";

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
        backgroundImage: `url(${casinoBackground})`,
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

        {/* Dealer section */}
        <div className="relative mb-6">
          <div className="flex items-center justify-center relative">
            {/* Dragon */}
            <div className="absolute left-0 w-24 h-24 -translate-x-20">
              <img 
                src={dragonImage} 
                alt="Dragon" 
                className="w-full h-full object-contain filter drop-shadow-lg"
              />
            </div>
            
            {/* Dealer */}
            <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-gold bg-card/80 backdrop-blur-sm shadow-lg">
              <img 
                src={dealerImage} 
                alt="Dealer" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Tiger */}
            <div className="absolute right-0 w-24 h-24 translate-x-20">
              <img 
                src={tigerImage} 
                alt="Tiger" 
                className="w-full h-full object-contain filter drop-shadow-lg"
              />
            </div>
          </div>
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
          <Button
            variant="outline"
            className="flex-1 h-24 p-0 bg-dragon/20 border-2 border-dragon hover:bg-dragon/30 rounded-xl transition-all duration-300 hover:shadow-dragon group"
          >
            <div className="flex flex-col items-center text-dragon-foreground">
              <div className="text-xl font-bold">0</div>
              <div className="text-sm font-bold">DRAGON</div>
              <div className="text-xs opacity-80">x2</div>
            </div>
          </Button>

          {/* Tiger */}
          <Button
            variant="outline"
            className="flex-1 h-24 p-0 bg-tiger/20 border-2 border-tiger hover:bg-tiger/30 rounded-xl transition-all duration-300 hover:shadow-tiger group"
          >
            <div className="flex flex-col items-center text-tiger-foreground">
              <div className="text-xl font-bold">0</div>
              <div className="text-sm font-bold">TIGER</div>
              <div className="text-xs opacity-80">x2</div>
            </div>
          </Button>
        </div>

        {/* User info */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-card rounded-full border-2 border-gold overflow-hidden">
            <img 
              src={dealerImage} 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-lg font-bold text-gold">1.7</span>
        </div>

        {/* Betting chips */}
        <div className="flex flex-wrap gap-2 justify-center max-w-sm">
          {chipValues.map((value, index) => (
            <Button
              key={value}
              variant="outline"
              size="sm"
              className={`w-16 h-16 rounded-full p-0 border-3 border-chip-border bg-gradient-to-br ${chipColors[index]} text-white font-bold shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl`}
            >
              {value >= 1000 ? `${value / 1000}k` : value}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DragonTigerGame;