import React from "react";
import { MdCurrencyRupee } from "react-icons/md";

interface UserBalanceProps {
  balance: number;
}

export default function UserBalance({ balance }: UserBalanceProps) {
  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-500 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg">
      <div className="flex items-center gap-1">
        <span className="text-yellow-100 font-bold text-base sm:text-lg md:text-xl">💰</span>
        <span 
          className="text-white font-bold"
          style={{
            fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)",
          }}
        >
          {balance.toLocaleString()}
        </span>
      </div>
    </div>
  );
}