import dragonBody from "../assets/dragon-body.png";
import tigerBody from "../assets/tiger-body.png";
import GameCards from "./cards";
import CountdownTimer from "./CountdownTimer";
import TrendSection from "./TrendSection";

interface BettingAreaProps {
  timer: number;
}

export default function BettingArea({ timer }: BettingAreaProps) {
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


      {/* Dragon animation on left */}
      <div className="creature-container animate-upDownImg"
           style={{ top:'3%', left: '2%' }}>
        <img
          src={dragonBody}
          alt="Dragon"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      {/* Tiger animation on right with flame effects */}
      <div className="creature-container animate-upDownImg"
           style={{ top:'3.7%', right: '2%' }}>
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
      <div className="absolute left-1/2 " style={{ top: '29%', transform: 'translateX(-50%)' }}>
        <CountdownTimer initial={timer} />
      </div>


      {/*  trend section */}

      <div className="  absolute right-0" style={{ top: '36%', height: '10%', width: '80%',  }}>
				<TrendSection />
        </div>


      {/*  cards */}

      <div className="  absolute left-1/2" style={{ top: '15%', transform: 'translateX(-50%)' }}>
				<GameCards />
        </div>


   
      {/* Tie betting area */}
      <div className="game-element rounded-xl border-blue-400 border-4 bg-gradient-to-br from-emerald-900 to-teal-700 shadow-lg cursor-pointer select-none flex items-center justify-center z-10"
           style={{ bottom: '38%', left: '10%', width: '80%', height: '16%' }}>
        {/* Total bets count */}
        <span className="absolute text-emerald-100/65 text-sm font-bold bg-green-700 bg-opacity-40 rounded-b-sm px-8 select-none z-20"
              style={{
                top: '0%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}>
          0
        </span>
        <div className="absolute -inset-4 rounded-xl bg-gradient-to-br from-emerald-700 to-cyan-700 opacity-20 blur-lg pointer-events-none"></div>
        <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-emerald-800 to-teal-800">
          <span className="text-cyan-100 text-xl font-semibold tracking-wide"
                style={{
                  textShadow: '0 2px 5px #0c4a6e',
                  opacity: 0.5,
                }}>
            TIE x10
          </span>
        </div>
      </div>

      {/* Dragon betting area */}
      <div className="game-element rounded-xl border-black border-2 bg-gradient-to-br from-indigo-900 to-blue-700 shadow-lg cursor-pointer select-none flex items-center justify-center z-10"
           style={{ bottom: '10%', left: '13%', width: '37%', height: '27%' }}>
        {/* Total bets count */}
        <span className="absolute text-emerald-100/65 text-sm font-bold bg-indigo-900 bg-opacity-40 rounded-b-sm px-6 select-none z-20"
              style={{
                top: '0%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}>
          0
        </span>
        <div className="relative -inset-4 rounded-xl bg-gradient-to-br from-blue-700 to-sky-700 opacity-20 blur-lg pointer-events-none"></div>
        <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-blue-800 to-blue-800">
          <span className="text-blue-500 text-lg font-semibold tracking-wide flex flex-col items-center"
                style={{ 
                  opacity: 0.5, 
                  textShadow: '0 2px 0 black'
                }}>
            <span>DRAGON</span>
            <span>2x</span>
          </span>
        </div>
      </div>

      {/* Tiger betting area */}
      <div className="game-element rounded-xl border-black border-2 bg-gradient-to-br from-red-900 to-yellow-700 shadow-lg cursor-pointer select-none flex items-center justify-center"
           style={{ bottom: '10%', right: '13%', width: '37%', height: '27%', zIndex: 10 }}>
        {/* Total bets count */}
        <span className="absolute text-emerald-100/65 text-sm font-bold bg-red-900 bg-opacity-40 rounded-b-sm px-6 select-none z-20"
              style={{
                top: '0%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}>
          0
        </span>
        <div className="relative -inset-4 rounded-xl bg-gradient-to-br from-red-700 to-yellow-700 opacity-20 blur-lg pointer-events-none"></div>
        <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-yellow-800 to-red-800">
          <span className="text-yellow-500 text-lg font-semibold tracking-wide flex flex-col items-center"
                style={{ 
                  opacity: 0.5, 
                  textShadow: '0 2px 0 black'
                }}>
            <span>TIGER</span>
            <span>2x</span>
          </span>
        </div>
      </div>
    </div>
  );
}