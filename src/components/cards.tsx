import React, { useState, useEffect } from "react";

const CARD_VALUES = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const CARD_NAMES = { 1: "A", 11: "J", 12: "Q", 13: "K" };
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

function Card({ value, suit, flipped, winner }) {
  const displayValue = CARD_NAMES[value] || value;
  return (
    <div className="card-wrapper">
      <div className={`card ${flipped ? "flipped" : ""} ${winner ? "winner" : ""}`}>
        <div className="card-face card-back"></div>
        <div className="card-face card-front">
          <div className="card-corner" style={{ color: suit.color }}>
            {displayValue}
            <br />
            {suit.symbol}
          </div>
          <div className="card-suit-center" style={{ color: suit.color }}>
            {suit.symbol}
          </div>
        </div>
      </div>
    </div>
  );
}

function GameCards() {
  const [cards, setCards] = useState([randomCard(), randomCard()]);
  const [flipped, setFlipped] = useState([false, false]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const playRound = () => {
      setFlipped([false, false]);
      setWinner(null);
      setTimeout(() => {
        const card1 = randomCard();
        const card2 = randomCard();
        setCards([card1, card2]);
        setTimeout(() => setFlipped([true, false]), 500);
        setTimeout(() => setFlipped([true, true]), 1500);
        setTimeout(() => {
          if (card1.value > card2.value) setWinner(0);
          else if (card2.value > card1.value) setWinner(1);
        }, 2500);
        setTimeout(() => setFlipped([false, false]), 6000);
      }, 500);
    };

    playRound();
    const interval = setInterval(playRound, 25000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .card-wrapper {
          perspective: 1200px;
          width: 90px;
          height: 130px;
          margin: 8px;
        }
        .card {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 1s;
          border-radius: 12px;
        }
        .card.flipped {
          transform: rotateY(180deg);
        }
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.13);
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          background: linear-gradient(180deg, #fff, #f9f9f9 90%);
        }
        .card-back {
          background: repeating-linear-gradient(
            45deg,
            #b30000,
            #b30000 12px,
            #7a0000 12px,
            #7a0000 24px
          );
        }
        .card-front {
          transform: rotateY(180deg);
          flex-direction: column;
        }
        .card-corner {
          position: absolute;
          left: 12px;
          top: 10px;
          font-size: 1.25rem;
          font-weight: bold;
          text-align: left;
          line-height: 1.1;
        }
        .card-suit-center {
          position: absolute;
          left: 50%;
          top: 58%;
          transform: translate(-50%, -50%);
          font-size: 2.9rem;
          font-weight: 600;
          opacity: 0.97;
          pointer-events: none;
        }
        .winner {
          animation: glowZoom 0.6s ease-in-out 2;
        }
        @keyframes glowZoom {
          0% { transform: scale(1) rotateY(180deg); box-shadow: 0 0 0 0; }
          50% { transform: scale(1.09) rotateY(180deg); box-shadow: 0 0 18px 4px gold; }
          100% { transform: scale(1) rotateY(180deg); box-shadow: 0 0 0 0; }
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
