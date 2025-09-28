import React, { useEffect, useState } from "react";
import clockIcon from "../assets/clock-icon.png";

interface CountdownTimerProps {
  initial: number;
  onEnd?: () => void;
  onPhaseChange?: (phase: 'betting' | 'revealing', timeRemaining: number) => void;
}

export default function CountdownTimer({ initial, onEnd, onPhaseChange }: CountdownTimerProps) {
  const [time, setTime] = useState(initial);
  const [isFifteen, setIsFifteen] = useState(true); // true: 15s betting, false: 10s revealing

  useEffect(() => {
    if (time > 0) {
      const interval = setInterval(() => {
        setTime((prev) => {
          const newTime = prev > 0 ? prev - 1 : 0;
          // Notify parent about current phase and time
          if (onPhaseChange) {
            const phase = isFifteen ? 'betting' : 'revealing';
            onPhaseChange(phase, newTime);
          }
          return newTime;
        });
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
  }, [time, isFifteen, onEnd, onPhaseChange]);

  return (
    <div className="flex  items-center justify-center select-none">
      <div
        className="relative flex items-center justify-center"
        style={{ width: 65, height: 48 }}
      >
        <img
          src={clockIcon}
          alt="Clock"
          style={{ width: 70, height: 48 }}
        />
        <span
          className="absolute pl-1 pb-1 inset-0 flex items-end justify-center font-bold text-lg text-[#443001]"
        >
          {time}
        </span>
      </div>
    </div>
  );
}
