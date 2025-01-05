import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-gradient-to-b from-green-50/50 to-white/80">
      {/* Leaves */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `scale(${0.5 + Math.random() * 0.5})`,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary-light opacity-30">
              <path
                fill="currentColor"
                d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Farmer */}
      <div className="absolute bottom-0 left-0 animate-farmer-walk">
        <svg width="48" height="48" viewBox="0 0 24 24" className="text-secondary">
          <path
            fill="currentColor"
            d="M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2M10.5,7H13.5A2,2 0 0,1 15.5,9V14.5H14V22H10V14.5H8.5V9A2,2 0 0,1 10.5,7Z"
          />
        </svg>
      </div>

      {/* Crops */}
      <div className="absolute bottom-0 w-full flex justify-around">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="animate-sway origin-bottom"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <svg width="32" height="64" viewBox="0 0 24 24" className="text-primary">
              <path
                fill="currentColor"
                d="M12,3C12,3 8,7 8,12C8,17 12,21 12,21C12,21 16,17 16,12C16,7 12,3 12,3Z"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Waterfall */}
      <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-b from-transparent via-blue-200/20 to-blue-300/30 animate-flow opacity-50" />
    </div>
  );
};

export default AnimatedBackground;