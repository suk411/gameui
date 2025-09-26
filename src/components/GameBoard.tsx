import React from "react";
import BettingArea from "./BettingArea";
import TrendSection from "./TrendSection";
import { FaUserAlt } from "react-icons/fa";

interface GameBoardProps {
	timer: number;
}

export default function GameBoard({ timer }: GameBoardProps) {
	return (
		<div className="flex items-center justify-center min-h-screen w-full bg-transparent">
			<div className="relative w-full max-w-[367px] aspect-[9/18] bg-black/80 rounded-xl shadow-xl flex flex-col justify-center items-center overflow-hidden">
				{/* Animation and betting area */}
				<BettingArea timer={timer} />
				{/* Trend section */}
				<TrendSection />
				{/* User icon (top right) */}
				<div className="absolute top-4 right-4 z-50">
					<FaUserAlt size={28} className="text-yellow-700 bg-[#450b00] rounded-full border-yellow-500 border-2 p-1" />
				</div>
			</div>
		</div>
	);
}
