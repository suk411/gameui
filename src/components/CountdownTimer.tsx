import React, { useEffect, useState } from "react";
import clockIcon from "../assets/clock-icon.png";

interface CountdownTimerProps {
  initial: number;
  onEnd?: () => void;
}

export default function CountdownTimer({ initial, onEnd }: CountdownTimerProps) {
  const [time, setTime] = useState(initial);
  const [isFifteen, setIsFifteen] = useState(true); // true: 15s, false: 10s

  useEffect(() => {
    if (time > 0) {
      const interval = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    } else {
      // When timer hits 0, alternate between 15 and 10 seconds
      setTimeout(() => {
        setIsFifteen((prev) => !prev);
        setTime(isFifteen ? 10 : 15);
        if (onEnd) onEnd();
      }, 1000);
    }
  }, [time, isFifteen, onEnd]);

  return (
    <div className="flex  items-center justify-center select-none">
      <div
        className="relative flex items-center justify-center"
        style={{ width: 48, height: 48 }}
      >
        <img
          src={clockIcon}
          alt="Clock"
          style={{ width: 48, height: 48 }}
        />
        <span
          className="absolute inset-0 flex items-center justify-center font-bold text-lg text-[#443001]"
        >
          {time}
        </span>
      </div>
    </div>
  );
}
