
import React, { useState, useEffect } from "react";

const CARD_VALUES = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const CARD_NAMES = {
  1: "A",
  11: "J",
  12: "Q",
  13: "K"
}

function Card({ value, highlight, flipped }) {
  const displayValue = CARD_NAMES[value] || value;

  return (
    <>
      <style>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
      <div className={`w-16 h-24 perspective`}>
        <div className={`relative w-full h-full duration-700 transform-style-preserve-3d transition-transform ${flipped ? "rotate-y-180" : "rotate-y-0"}`}>
          {/* Front side - card back */}
          <div className={`absolute w-full h-full rounded-xl bg-red-700 border-4 border-white shadow-inner backface-hidden`}>
          </div>
          {/* Back side - card front value */}
          <div className={`absolute w-full h-full rounded-xl bg-red-800 border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-4xl rotate-y-180 backface-hidden ${highlight ? "border-yellow-400 shadow-yellow-500" : ""}`}>
            {displayValue}
          </div>
        </div>
      </div>
    </>
  );
}

function GameCards() {
  const [cards, setCards] = useState([1, 1]);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    function randomCard() {
      return CARD_VALUES[Math.floor(Math.random() * CARD_VALUES.length)];
    }

    const interval = setInterval(() => {
      setFlipped(false);
      setTimeout(() => {
        const card1 = randomCard();
        const card2 = randomCard();
        setCards([card1, card2]);
        setFlipped(true);
      }, 500);
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  const highlightCard1 = cards[0] > cards[1];
  const highlightCard2 = cards[1] > cards[0];

  return (
    <div className="flex flex-row gap-20 bg-black/ items-center   justify-center">
      <Card value={cards[0]} highlight={highlightCard1} flipped={flipped} />
      <Card value={cards[1]} highlight={highlightCard2} flipped={flipped} />
    </div>
  );
}

export default GameCards;
