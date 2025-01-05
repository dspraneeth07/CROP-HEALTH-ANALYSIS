import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-gradient-to-b from-blue-100 via-green-50 to-green-100">
      {/* Clouds */}
      <div className="absolute top-0 w-full h-32 flex">
        {[...Array(3)].map((_, i) => (
          <div
            key={`cloud-${i}`}
            className="absolute animate-cloud-drift"
            style={{ animationDelay: `${i * 10}s` }}
          >
            <svg width="100" height="60" viewBox="0 0 100 60" className="text-white/80">
              <path
                fill="currentColor"
                d="M90,40 C90,51.05 81.05,60 70,60 L20,60 C8.95,60 0,51.05 0,40 C0,28.95 8.95,20 20,20 C20,8.95 28.95,0 40,0 C51.05,0 60,8.95 60,20 C71.05,20 80,28.95 80,40"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Sunrays */}
      <div className="absolute top-0 right-0 w-1/3 h-32">
        {[...Array(3)].map((_, i) => (
          <div
            key={`sunray-${i}`}
            className="absolute w-full h-full bg-yellow-200/20 animate-sunray"
            style={{
              transform: `rotate(${i * 30}deg)`,
              animationDelay: `${i * 1.3}s`,
            }}
          />
        ))}
      </div>

      {/* Waterfall */}
      <div className="absolute left-0 top-0 h-full w-1/6">
        <div className="h-full w-full bg-gradient-to-b from-blue-200/40 via-blue-300/30 to-blue-400/20 animate-flow" />
        {/* Mist */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`mist-${i}`}
            className="absolute bottom-0 left-0 w-full h-32 bg-white/20 animate-mist-rise"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}
      </div>

      {/* Crops Field */}
      <div className="absolute bottom-0 w-full flex justify-around">
        {[...Array(12)].map((_, i) => (
          <div
            key={`crop-${i}`}
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

      {/* Flying Leaves */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={`leaf-${i}`}
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

      {/* Tractor */}
      <div className="absolute bottom-16 left-0 animate-tractor-move">
        <svg width="64" height="64" viewBox="0 0 24 24" className="text-secondary">
          <path
            fill="currentColor"
            d="M5,4V11.26C3.2,11.9 2,13.6 2,15.5C2,18 4,20 6.5,20C8.79,20 10.71,18.28 10.97,16H15.17C15.06,16.32 15,16.66 15,17A3,3 0 0,0 18,20A3,3 0 0,0 21,17C21,16.66 20.94,16.32 20.82,16H22V13C22,11.89 21.11,11 20,11H15.04L13.65,4H5M7,6H12L13,11H7V6M6.5,13.5A2,2 0 0,1 8.5,15.5A2,2 0 0,1 6.5,17.5A2,2 0 0,1 4.5,15.5A2,2 0 0,1 6.5,13.5M18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5Z"
          />
        </svg>
        {/* Dust particles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`dust-${i}`}
            className="absolute -bottom-2 left-1/2 w-2 h-2 bg-secondary/20 rounded-full animate-float"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;