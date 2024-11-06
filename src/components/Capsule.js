import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';

const TimeCapsule = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlock = () => {
    if (!isOpen) {
      setIsUnlocking(true);
      setTimeout(() => {
        setIsOpen(true);
        setIsUnlocking(false);
      }, 2000);
    }
  };

  return (
    <div className="relative group">
      <div 
        className={`
          w-64 h-64 rounded-2xl relative overflow-hidden
          bg-gradient-to-r from-slate-900 to-slate-800
          border border-cyan-500/30 shadow-lg
          transform transition-all duration-500
          ${isOpen ? 'scale-110' : 'hover:scale-105'}
          ${isUnlocking ? 'animate-pulse' : ''}
        `}
      >
        {/* Hover effect - neon glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-cyan-500/20 blur-xl"></div>
        </div>

        {/* Content container */}
        <div className="relative h-full w-full p-6 flex flex-col items-center justify-center">
          {!isOpen ? (
            <>
              <div className="text-cyan-500 mb-4">
                {isUnlocking ? (
                  <Unlock className="w-12 h-12 animate-spin" />
                ) : (
                  <Lock className="w-12 h-12" />
                )}
              </div>
              <h3 className="text-cyan-400 text-xl font-semibold mb-2">{title}</h3>
              <button
                onClick={handleUnlock}
                className="mt-4 px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg
                         hover:bg-cyan-500/30 transition-colors duration-300"
              >
                {isUnlocking ? "Unlocking..." : "Unlock Capsule"}
              </button>
            </>
          ) : (
            <div className="transform animate-fadeIn">
              <div className="text-cyan-300 text-center">
                <p className="mb-4">{content}</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-2 px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg
                           hover:bg-cyan-500/30 transition-colors duration-300"
                >
                  Seal Capsule
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TimeCapsuleGrid = () => {
  const capsules = [
    { title: "Memory 2024", content: "First quantum computer reaches 1 million qubits" },
    { title: "Vision 2025", content: "Mars colony construction begins" },
    { title: "Future 2026", content: "Flying cars become commercially available" },
    { title: "Dream 2027", content: "Teleportation breakthrough achieved" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      {/* Star field background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-cyan-400 text-center mb-12">
          Temporal Vault Interface
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {capsules.map((capsule, index) => (
            <TimeCapsule key={index} {...capsule} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Add custom animation to your tailwind.config.js
const tailwindConfig = {
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in',
        twinkle: 'twinkle 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
};

export default TimeCapsuleGrid;