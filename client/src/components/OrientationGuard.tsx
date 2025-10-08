
import { useState, useEffect } from "react";

export default function OrientationGuard() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isPortraitMode = window.innerHeight > window.innerWidth;
      setIsPortrait(isPortraitMode && window.innerWidth < 768);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (!isPortrait) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="text-center px-6">
        <svg
          className="w-24 h-24 mx-auto mb-6 text-gold animate-pulse"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M12 18h.01" />
          <path d="M8 6h8M8 10h8M8 14h8" />
        </svg>
        <h2 className="text-2xl font-bold text-gold mb-4">
          Rotate Your Device
        </h2>
        <p className="text-gray-300 text-lg">
          Please rotate your device to landscape mode for the best gaming experience
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-16 h-10 border-4 border-gold rounded-lg relative animate-bounce">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
