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
    const phase = isFifteen ? 'betting' : 'revealing';
    if (onPhaseChange) {
      onPhaseChange(phase, time);
    }
  }, [isFifteen, time, onPhaseChange]);

  useEffect(() => {
    if (time > 0) {
      const interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      // When timer hits 0, alternate between 15 and 10 seconds
      const timeout = setTimeout(() => {
        setIsFifteen((prev) => !prev);
        setTime(isFifteen ? 10 : 15);
        if (onEnd) onEnd();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [time, isFifteen, onEnd]);

  // Placeholder for getTimerColor, assuming it exists elsewhere or needs to be defined.
  // For this example, we'll provide a basic implementation.
  const getTimerColor = () => {
    // Example: return 'text-red-500' or 'text-blue-500' based on some logic
    return 'text-[#443001]'; // Defaulting to original color
  };

  // Placeholder for seconds, using the 'time' state variable.
  const seconds = time;

  return (
    <div 
      className="relative flex items-center justify-center" 
      style={{ 
        width: 'clamp(60px, 12vw, 100px)', 
        height: 'clamp(60px, 12vw, 100px)' 
      }}
    >
      <img
        src={clockIcon}
        alt="Clock"
        className="absolute inset-0 w-full h-full"
      />
      <div 
        className={`
          absolute inset-0 flex items-center justify-center
          font-bold
          ${getTimerColor()}
        `}
        style={{ 
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)'
        }}
      >
        {seconds}
      </div>
    </div>
  );
}