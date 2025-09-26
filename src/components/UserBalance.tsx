import React from "react";
import { MdCurrencyRupee } from "react-icons/md";

export default function UserBalance() {
  return (
    <div className="flex items-center justify-center mb-2 max-w-[367px] w-full px-4">
      <div className="flex items-center gap-2">
        {/* User balance icon */}
        <div className="text-[#ffe0da] rounded-lg bg-[#5f1e11] border-[#5b6612] border select-none p-1">
          <MdCurrencyRupee size={18} />
        </div>

        {/* User balance display */}
        <div className="text-white rounded-3xl border-2 border-[#5f5c07] select-none flex items-center justify-center text-sm font-bold px-6 py-2"
             style={{
               backgroundImage: `
                 repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 20px),
                 repeating-linear-gradient(-45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 20px)
               `,
               backgroundSize: '20px 20px',
               backgroundColor: '#000000',
             }}>
          951888
        </div>
      </div>
    </div>
  );
}