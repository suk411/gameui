import React, { useState, useEffect } from "react";
import cardBack from "../assets/cards/card-back.svg";

// Import all card SVGs directly
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

// Card mapping object
const CARD_IMAGES: Record<string, string> = {
  "ace-hearts": aceHearts,
  "ace-diamonds": aceDiamonds,
  "ace-clubs": aceClubs,
  "ace-spades": aceSpades,
  "2-hearts": twoHearts,
  "2-spades": twoSpades,
  "3-diamonds": threeDiamonds,
  "4-clubs": fourClubs,
  "5-hearts": fiveHearts,
  "6-spades": sixSpades,
  "7-clubs": sevenClubs,
  "8-diamonds": eightDiamonds,
  "9-hearts": nineHearts,
  "10-diamonds": tenDiamonds,
  "jack-clubs": jackClubs,
  "jack-spades": jackSpades,
  "queen-diamonds": queenDiamonds,
  "queen-hearts": queenHearts,
  "king-spades": kingSpades,
};

function getCardImage(cardString: string | null): string {
  if (!cardString) return cardBack;
  
  // cardString format: "5-hearts", "ace-spades", etc.
  const cardKey = cardString.toLowerCase();
  return CARD_IMAGES[cardKey] || cardBack;
}

interface CardProps {
  cardString: string | null;
  flipped: boolean;
  winner: boolean;
}

function Card({ cardString, flipped, winner }: CardProps) {
  const cardImage = getCardImage(cardString);
  
  return (
    <div className="card-wrapper">
      <div className={`card ${flipped ? "flipped" : ""} ${winner ? "winner" : ""}`}>
        <div className="card-face card-back">
          <img src={cardBack} alt="Card back" className="card-image" draggable="false" />
        </div>
        <div className="card-face card-front">
          <img src={cardImage} alt={cardString || "Card"} className="card-image" draggable="false" />
        </div>
      </div>
    </div>
  );
}

interface GameCardsProps {
  currentPhase: 'betting' | 'revealing';
  timeRemaining: number;
  dragonCard: string | null;
  tigerCard: string | null;
  roundWinner: string | null;
}

function GameCards({ currentPhase, timeRemaining, dragonCard, tigerCard, roundWinner }: GameCardsProps) {
  const [flipped, setFlipped] = useState([false, false]);
  const [winner, setWinner] = useState<number | null>(null);

  useEffect(() => {
    if (currentPhase === 'betting') {
      // Betting phase (15 seconds): cards stay face down
      setFlipped([false, false]);
      setWinner(null);
    } else if (currentPhase === 'revealing') {
      // Result phase (10 seconds total)
      if (timeRemaining <= 10 && timeRemaining > 7) {
        // First 3 seconds (10-7s): flip first card (dragon)
        setFlipped([true, false]);
        setWinner(null);
      } else if (timeRemaining <= 7 && timeRemaining > 2) {
        // Next 5 seconds (7-2s): flip second card (tiger) and show winner
        setFlipped([true, true]);
        // Determine winner from server data
        if (roundWinner === 'dragon') setWinner(0);
        else if (roundWinner === 'tiger') setWinner(1);
        else setWinner(null); // tie
      } else if (timeRemaining <= 2) {
        // Last 2 seconds (2-0s): flip cards back
        setFlipped([false, false]);
        setWinner(null);
      }
    }
  }, [currentPhase, timeRemaining, roundWinner]);

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
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }
        .winner .card-image {
          animation: glowZoom 0.6s ease-in-out 2;
        }
        @keyframes glowZoom {
          0% { transform: scale(1); filter: drop-shadow(0 2px 8px rgba(0,0,0,0.13)); }
          50% { transform: scale(1.09); filter: drop-shadow(0 0 18px 4px gold); }
          100% { transform: scale(1); filter: drop-shadow(0 2px 8px rgba(0,0,0,0.13)); }
        }
      `}</style>
      <div className="flex gap-24 justify-center items-center bg-transparent">
        <Card cardString={dragonCard} flipped={flipped[0]} winner={winner === 0} />
        <Card cardString={tigerCard} flipped={flipped[1]} winner={winner === 1} />
      </div>
    </>
  );
}

export default GameCards;
export type { GameCardsProps };
