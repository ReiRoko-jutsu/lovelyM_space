// src/components/FloatingLetter.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface LoveLetterProps {
  message: string;
  image: string;
  princessName: string;
}

const FloatingLetter: React.FC<LoveLetterProps> = ({ message, image, princessName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Heart-specific confetti explosion
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#ff0a54', '#ff477e'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#ff7096', '#ff85a1'] });
    }, 250);
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* 1. The Floating Envelope Design */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
            whileHover={{ scale: 1.05 }}
            transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            onClick={handleOpen}
            className="cursor-pointer relative group"
          >
            {/* Elegant Envelope Base */}
            <div className="w-48 h-32 bg-rose-100 rounded-lg shadow-xl border border-rose-200 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
              <div className="text-4xl">💌</div>
              {/* Seal */}
              <div className="absolute w-8 h-8 bg-rose-500 rounded-full shadow-inner border-2 border-rose-400 flex items-center justify-center text-[10px] animate-pulse">
                ❤️
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-white px-3 py-1 rounded-full shadow-md border border-rose-100">
              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-rose-500">For You</p>
            </div>

            <p className="mt-6 font-serif italic text-rose-400 text-center animate-pulse">
              Click to reveal a surprise...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. The High-End Split Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-rose-950/40 backdrop-blur-xl"
            />

            {/* Modal Container */}
            <motion.div 
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white/90 glass-card rounded-[2.5rem] overflow-hidden max-w-5xl w-full shadow-[0_32px_64px_-15px_rgba(251,113,133,0.3)] flex flex-col md:flex-row relative z-10 border border-white"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-white transition-all shadow-sm"
              >
                ✕
              </button>

              {/* LEFT SIDE: Cinematic Image Reveal */}
              <div className="md:w-5/12 h-72 md:h-[600px] overflow-hidden">
                <motion.img 
                  initial={{ scale: 1.4, filter: "blur(10px)" }}
                  animate={{ scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src={image} 
                  alt="My Princess" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* RIGHT SIDE: The Love Letter */}
              <div className="md:w-7/12 p-8 md:p-16 flex flex-col justify-center relative">
                <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.5 }}
                >
                  <span className="text-rose-400 font-serif italic text-2xl mb-2 block">
                    Dearest {princessName},
                  </span>
                  <h2 className="text-4xl font-serif text-slate-800 mb-8 leading-tight">
                    You are my <span className="italic text-rose-500">everything.</span>
                  </h2>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="relative"
                  >
                    {/* Quotation Mark Decoration */}
                    <span className="absolute -top-6 -left-6 text-6xl text-rose-100 font-serif opacity-50">“</span>
                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed italic font-serif">
                      {message}
                    </p>
                    <span className="absolute -bottom-10 -right-2 text-6xl text-rose-100 font-serif opacity-50">”</span>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-16 flex items-center gap-5"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-400 to-orange-300 flex items-center justify-center text-white shadow-lg shadow-rose-200">
                      💍
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-rose-300 font-bold">Written with Love</p>
                      <p className="font-serif italic text-slate-800 text-lg">Your Forever Person</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingLetter;