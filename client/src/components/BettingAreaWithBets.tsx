import dragonBody from "../assets/dragon-body.png";
import tigerBody from "../assets/tiger-body.png";
import GameCards from "./cards";
import CountdownTimer from "./CountdownTimer";
import TrendSection from "./TrendSection";
import { useState } from "react";
import { useGameManager } from "@/hooks/useGameManager";
import CoinAnimation from "./CoinAnimation";
import { useToast } from "@/hooks/use-toast";

interface BettingAreaProps {
  timer: number;
  selectedChip: number | null;
}

export default function BettingAreaWithBets({ timer, selectedChip }: BettingAreaProps) {
  const [currentPhase, setCurrentPhase] = useState<'betting' | 'revealing'>('betting');
  const [timeRemaining, setTimeRemaining] = useState(timer);
  const [animations, setAnimations] = useState<Array<{ id: string; targetId: string; amount: number }>>([]);
  const { placeBet, getTotalBets, balance, currentRound } = useGameManager();
  const { toast } = useToast();

  const handlePhaseChange = (phase: 'betting' | 'revealing', time: number) => {
    setCurrentPhase(phase);
    setTimeRemaining(time);
  };

  const handleBetClick = async (betType: string) => {
    if (!selectedChip) {
      toast({
        title: "Select a chip",
        description: "Please select a chip amount to place your bet",
        variant: "destructive",
      });
      return;
    }

    if (currentPhase !== 'betting') {
      toast({
        title: "Betting closed",
        description: "You can only bet during the betting phase (15 seconds)",
        variant: "destructive",
      });
      return;
    }

    if (balance < selectedChip) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough balance to place this bet",
        variant: "destructive",
      });
      return;
    }

    // Add coin animation
    const animId = `${Date.now()}_${Math.random()}`;
    setAnimations(prev => [...prev, { id: animId, targetId: betType, amount: selectedChip }]);

    // Place bet
    const success = await placeBet(betType, selectedChip);
    if (!success) {
      toast({
        title: "Bet failed",
        description: "Could not place your bet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeAnimation = (id: string) => {
    setAnimations(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="relative w-full h-full">
      <style>
        {`
          @keyframes upDownImg {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .animate-upDownImg {
            animation: upDownImg 4s ease-in-out infinite;
          }
          .flame-container {
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 18%;
            height: 15%;
            transform: translateX(-50%);
            pointer-events: none;
            z-index: 16;
            overflow: visible;
          }
          .flame-glow {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 100%;
            border-radius: 9999px;
            background: radial-gradient(circle at bottom, rgba(255,140,0,0.8) 35%, transparent 80%);
            filter: blur(18px);
            animation: flamePulse 4s ease-in-out infinite;
          }
          @keyframes flamePulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
          .flame-particle {
            position: absolute;
            bottom: 16px;
            width: 12px;
            height: 12px;
            background: radial-gradient(circle, rgba(255,165,0,0.9) 40%, transparent 90%);
            border-radius: 50%;
            filter: drop-shadow(0 0 4px #ffae00);
            animation: particleUp 4s linear infinite;
          }
          .flame-particle:nth-child(1) { left: 12%; animation-delay: 0s; }
          .flame-particle:nth-child(2) { left: 45%; animation-delay: 1.3s; }
          .flame-particle:nth-child(3) { left: 77%; animation-delay: 2.6s; }
          @keyframes particleUp {
            0% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-90px) scale(1.4); }
          }
          .creature-container {
            position: absolute;
            top: 0%;
            width: 25%;
            max-width: 180px;
            user-select: none;
            z-index: 20;
            display: flex;
            justify-content: center;
            align-items: flex-end;
          }
        `}
      </style>

      {/* Coin animations */}
      {animations.map(anim => (
        <CoinAnimation
          key={anim.id}
          amount={anim.amount}
          targetId={anim.targetId}
          onComplete={() => removeAnimation(anim.id)}
        />
      ))}

      {/* Dragon animation on left */}
      <div className="creature-container animate-upDownImg"
           style={{ top:'3%', left: '5%' }}>
        <img
          src={dragonBody}
          alt="Dragon"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      {/* Tiger animation on right with flame effects */}
      <div className="creature-container animate-upDownImg"
           style={{ top:'3.7%', right: '5%' }}>
        <img
          src={tigerBody}
          alt="Tiger"
          style={{ width: '100%', height: 'auto' }}
        />
        <div className="flame-container">
          <div className="flame-particle"></div>
          <div className="flame-particle"></div>
          <div className="flame-particle"></div>
        </div>
      </div>

      {/* Clock centered below animation */}
      <div className="absolute left-1/2" style={{ top: '29%', transform: 'translateX(-50%)' }}>
        <CountdownTimer initial={timer} onPhaseChange={handlePhaseChange} />
      </div>

      {/* Trend section */}
      <div className="absolute right-0" style={{ top: '36%', height: '10%', width: '80%' }}>
        <TrendSection />
      </div>

      {/* Cards */}
      <div className="absolute left-1/2" style={{ top: '15%', transform: 'translateX(-50%)' }}>
        <GameCards 
          currentPhase={currentPhase} 
          timeRemaining={timeRemaining}
          dragonCard={currentRound?.dragon_card || null}
          tigerCard={currentRound?.tiger_card || null}
          roundWinner={currentRound?.winner || null}
        />
      </div>

      {/* Tie betting area */}
      <div 
        id="tie-betting-area"
        className="game-element rounded-xl border-yellow-500 border-2 sm:border-4 bg-gradient-to-br from-yellow-700 to-amber-600 shadow-lg cursor-pointer select-none flex items-center justify-center z-10 touch-manipulation active:scale-95 transition-transform"
        style={{ bottom: '35%', left: '35%', width: '30%', height: '18%' }}
        onClick={() => handleBetClick('tie')}
        role="button"
        aria-label="Bet on Tie (10x payout)"
        tabIndex={0}
      >
        <span className="absolute text-white font-bold bg-black bg-opacity-50 rounded px-2 sm:px-3 select-none z-20"
              style={{ 
                top: '8%', 
                left: '50%', 
                transform: 'translateX(-50%)',
                fontSize: 'clamp(0.625rem, 2vw, 0.875rem)'
              }}>
          {getTotalBets('tie').toLocaleString()}
        </span>
        <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-yellow-600 to-amber-700">
          <span className="text-white font-bold tracking-wide"
                style={{ 
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                  fontSize: 'clamp(1rem, 3vw, 1.5rem)'
                }}>
            Tie x9
          </span>
        </div>
      </div>

      {/* Dragon betting area */}
      <div 
        id="dragon-betting-area"
        className="game-element rounded-xl border-blue-400 border-2 bg-gradient-to-br from-blue-900 to-indigo-800 shadow-lg cursor-pointer select-none flex items-center justify-center z-10 touch-manipulation active:scale-95 transition-transform"
        style={{ bottom: '11%', left: '10%', width: '38%', height: '23%' }}
        onClick={() => handleBetClick('dragon')}
        role="button"
        aria-label="Bet on Dragon (2x payout)"
        tabIndex={0}
      >
        <span className="absolute text-white font-bold bg-black bg-opacity-50 rounded px-2 sm:px-3 select-none z-20"
              style={{ 
                top: '8%', 
                left: '50%', 
                transform: 'translateX(-50%)',
                fontSize: 'clamp(0.625rem, 2vw, 0.875rem)'
              }}>
          {getTotalBets('dragon').toLocaleString()}
        </span>
        <div className="relative flex h-full w-full items-center justify-center rounded-xl">
          <span className="text-white font-bold tracking-wide flex flex-col items-center"
                style={{ 
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)'
                }}>
            <span>DRAGON</span>
            <span>X2</span>
          </span>
        </div>
      </div>

      {/* Tiger betting area */}
      <div 
        id="tiger-betting-area"
        className="game-element rounded-xl border-red-500 border-2 bg-gradient-to-br from-red-900 to-orange-800 shadow-lg cursor-pointer select-none flex items-center justify-center touch-manipulation active:scale-95 transition-transform"
        style={{ bottom: '11%', right: '10%', width: '38%', height: '23%', zIndex: 10 }}
        onClick={() => handleBetClick('tiger')}
        role="button"
        aria-label="Bet on Tiger (2x payout)"
        tabIndex={0}
      >
        <span className="absolute text-white font-bold bg-black bg-opacity-50 rounded px-2 sm:px-3 select-none z-20"
              style={{ 
                top: '8%', 
                left: '50%', 
                transform: 'translateX(-50%)',
                fontSize: 'clamp(0.625rem, 2vw, 0.875rem)'
              }}>
          {getTotalBets('tiger').toLocaleString()}
        </span>
        <div className="relative flex h-full w-full items-center justify-center rounded-xl">
          <span className="text-white font-bold tracking-wide flex flex-col items-center"
                style={{ 
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)'
                }}>
            <span>TIGER</span>
            <span>X2</span>
          </span>
        </div>
      </div>
    </div>
  );
}
