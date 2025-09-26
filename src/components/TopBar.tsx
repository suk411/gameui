import React from "react";
import { AiFillHome } from "react-icons/ai";
import CountdownTimer from "./CountdownTimer";


export default function TopBar() {
  return (
    <>
      {/* Home icon */}
      <div className="game-element text-[#450b00] rounded-full bg-yellow-700 border-yellow-500 border-2 select-none p-2 z-30" 
           style={{ top: '3%', left: '4%' }}>
        <AiFillHome size={20} />
      </div>
    </>
  );
}