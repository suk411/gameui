import React from "react";
import { AiFillHome } from "react-icons/ai";
import clockIcon from "../assets/clock-icon.png";

interface TopBarProps {
  timer: number;
}

export default function TopBar({ timer }: TopBarProps) {
  return (
    <>
      {/* Home icon */}
      <div className="game-element text-[#450b00] rounded-full bg-yellow-700 border-yellow-500 border-2 select-none p-2 z-30" 
           style={{ top: '3%', left: '4%' }}>
        <AiFillHome size={20} />
      </div>

      {/* Timer */}
      <div className="game-element flex items-center justify-center z-50"
           style={{
             top: '8%',
             left: '50%',
             transform: 'translateX(-50%)',
             width: '15%',
             height: '9%',
             backgroundImage: `url(${clockIcon})`,
             backgroundSize: '100% 100%',
             backgroundRepeat: 'no-repeat',
             backgroundPosition: 'center',
           }}>
        <div className="flex items-center justify-center pt-2 font-bold text-lg text-[#443001] select-none">
          {timer}
        </div>
      </div>
    </>
  );
}