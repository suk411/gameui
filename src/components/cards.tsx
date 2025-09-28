import React, { useState, useEffect } from "react";
import SVGCard from "./SVGCard";

const CARD_VALUES = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const SUITS = [
  { name: "Spades", symbol: "♠", color: "black" },
  { name: "Hearts", symbol: "♥", color: "red" },
  { name: "Clubs", symbol: "♣", color: "black" },
  { name: "Diamonds", symbol: "♦", color: "red" }
];

function randomCard() {
  return {
    value: CARD_VALUES[Math.floor(Math.random() * CARD_VALUES.length)],
    suit: SUITS[Math.floor(Math.random() * SUITS.length)]
  };
}

interface CardProps {
  value: number;
  suit: { name: string; symbol: string; color: string };
  flipped: boolean;
  winner: boolean;
}

function Card({ value, suit, flipped, winner }: CardProps) {
  return (
    <div className="card-wrapper">
      <div className={`card ${flipped ? "flipped" : ""} ${winner ? "winner" : ""}`}>
        <div className="card-face card-back">
          <SVGCard value={value} suit={suit} isBack={true} />
        </div>
        <div className="card-face card-front">
          <SVGCard value={value} suit={suit} isBack={false} />
        </div>
      </div>
    </div>
  );
}

interface GameCardsProps {
  currentPhase: 'betting' | 'revealing';
  timeRemaining: number;
}

function GameCards({ currentPhase, timeRemaining }: GameCardsProps) {
  const [cards, setCards] = useState([randomCard(), randomCard()]);
  const [flipped, setFlipped] = useState([false, false]);
  const [winner, setWinner] = useState<number | null>(null);

  useEffect(() => {
    if (currentPhase === 'betting') {
      // Reset cards for new round
      setFlipped([false, false]);
      setWinner(null);
      const card1 = randomCard();
      const card2 = randomCard();
      setCards([card1, card2]);
    } else if (currentPhase === 'revealing') {
      // Flip cards one by one during reveal phase (10 seconds)
      if (timeRemaining <= 8 && timeRemaining > 6) {
        // First card flips at 8 seconds remaining
        setFlipped([true, false]);
      } else if (timeRemaining <= 4 && timeRemaining > 2) {
        // Second card flips at 4 seconds remaining  
        setFlipped([true, true]);
        // Determine winner
        if (cards[0].value > cards[1].value) setWinner(0);
        else if (cards[1].value > cards[0].value) setWinner(1);
        else setWinner(null); // tie
      } else if (timeRemaining <= 2) {
        // Flip back in last 2 seconds
        setFlipped([false, false]);
        setWinner(null);
      }
    }
  }, [currentPhase, timeRemaining, cards]);

  return (
    <>
      <style>{`
        .card-wrapper {
          perspective: 1200px;
          width: 63px;
          height: 91px;
          margin: 6px;
        }
        .card {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 1s;
          border-radius: 8px;
        }
        .card.flipped {
          transform: rotateY(180deg);
        }
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-back {
          transform: rotateY(0deg);
        }
        .card-front {
          transform: rotateY(180deg);
        }
        .card-svg {
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.13));
        }
        .winner .card-svg {
          animation: glowZoom 0.6s ease-in-out 2;
        }
        @keyframes glowZoom {
          0% { transform: scale(1); filter: drop-shadow(0 2px 8px rgba(0,0,0,0.13)); }
          50% { transform: scale(1.09); filter: drop-shadow(0 0 18px 4px gold); }
          100% { transform: scale(1); filter: drop-shadow(0 2px 8px rgba(0,0,0,0.13)); }
        }
      `}</style>
      <div className="flex gap-24 justify-center items-center bg-transparent">
        <Card value={cards[0].value} suit={cards[0].suit} flipped={flipped[0]} winner={winner === 0} />
        <Card value={cards[1].value} suit={cards[1].suit} flipped={flipped[1]} winner={winner === 1} />
      </div>
    </>
  );
}

export default GameCards;
export type { GameCardsProps };
