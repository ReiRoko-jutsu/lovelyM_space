// src/pages/Birthday.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// --- 📂 ASSET IMPORTS ---
import lovelyPhoto from '../assets/lovely/valentineday.jpg';
import love_01 from '../assets/lovely/love_01.jpg';
import love_02 from '../assets/lovely/love_02.jpg';
import love_04 from '../assets/lovely/love_04.jpg';
import love_05 from '../assets/lovely/love_05.jpg';
import love_06 from '../assets/lovely/love_06.jpg';
import love_07 from '../assets/lovely/love_07.jpg';
import love_08 from '../assets/lovely/love_08.jpg';
import love_09 from '../assets/lovely/love_09.jpg';
import love_10 from '../assets/lovely/love_10.jpg';
import love_11 from '../assets/lovely/love_11.jpg';
import love_12 from '../assets/lovely/love_12.jpg';
import love_13 from '../assets/lovely/love_13.jpg';
import love_14 from '../assets/lovely/love_14.jpg';
import love_15 from '../assets/lovely/love_15.jpg';
import love_16 from '../assets/lovely/love_16.jpg';
import love_17 from '../assets/lovely/love_17.jpg';
import love_18 from '../assets/lovely/love_18.jpg';
import love_19 from '../assets/lovely/love_19.jpg';
import love_20 from '../assets/lovely/love_20.jpg';
import slide_01 from '../assets/lovely/slide_01.jpg';
import slide_1 from '../assets/lovely/slide_1.png';
import slide_2 from '../assets/lovely/slide_2.png';
import slide_5 from '../assets/lovely/slide_5.png';
import slide_6 from '../assets/lovely/slide_6.png';

interface PoemSlide {
  type?: 'poem' | 'finale';
  title: string;
  floatingImages: string[];
  lines: string[];
  bgImage?: string;
}

const BIRTHDAY_POEM: PoemSlide[] = [
  {
    title: "Happy 26th Birthday",
    bgImage: slide_1,
    floatingImages: [], 
    lines: [
      "Twenty-six candles softly glow,", 
      "Lighting dreams you’ve yet to know.", 
      "Another year of strength and grace,", 
      "Another smile the world can’t replace."
    ]
  },
  {
    title: "Growth & Grace",
    bgImage: slide_2,
    floatingImages: [], 
    lines: [
      "May blessings fall like gentle rain,", 
      "Washing away every doubt and pain.", 
      "May growth find you in all you do,", 
      "Opening paths meant just for you."
    ]
  },
  {
    title: "Through Near or Far",
    bgImage: slide_01,
    floatingImages: [], 
    lines: [
      "And in this life, through near or far,", 
      "You shine steady, like a guiding star.", 
      "If love could measure time and space,", 
      "Mine would forever find your place."
    ]
  },
  {
    title: "A Celebration of You",
    bgImage: slide_5,
    floatingImages: [], 
    lines: [
      "At twenty-six, you bloom even more,", 
      "Like waves returning to a faithful shore.", 
      "May your heart stay brave and true,", 
      "And may the world be kind to you."
    ]
  },
  {
    type: 'finale',
    title: "Happy Birthday Always",
    bgImage: slide_6,
    floatingImages: [
      love_01, love_02, love_04, love_05, love_06, love_07, love_08, love_09, 
      love_10, love_11, love_12, love_13, love_14, love_15, love_16, love_17, 
      love_18, love_19, love_20, lovelyPhoto
    ],
    lines: [
      "Happy birthday — today and always,", 
      "You deserve love in a thousand ways.",
      "Forever & Always My Everything. ❤️"
    ]
  }
];

const Birthday: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [activeRotationIndex, setActiveRotationIndex] = useState(0);
  const [orbitRadius, setOrbitRadius] = useState(250);

  useEffect(() => {
    const handleResize = () => setOrbitRadius(window.innerWidth < 768 ? 130 : 300);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let timer: any;
    if (isPlaying && !zoomedImage) {
      const isFinale = BIRTHDAY_POEM[currentSlide].type === 'finale';
      timer = setInterval(() => {
        if (currentSlide < BIRTHDAY_POEM.length - 1) {
          setCurrentSlide(prev => prev + 1);
        }
      }, isFinale ? 45000 : 12000); 
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentSlide, zoomedImage]);

  useEffect(() => {
    let rotationTimer: any;
    if (isPlaying && BIRTHDAY_POEM[currentSlide].type === 'finale') {
      rotationTimer = setInterval(() => {
        setActiveRotationIndex(prev => (prev + 1) % BIRTHDAY_POEM[currentSlide].floatingImages.length);
      }, 4500);
    }
    return () => clearInterval(rotationTimer);
  }, [isPlaying, currentSlide]);

  const startCelebration = () => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.volume = 0.6;
    }
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className="min-h-screen bg-[#fcf9f4] flex flex-col items-center justify-center overflow-x-hidden text-[#4a3223]">
      <audio ref={audioRef} src="/audio/happy.mp3" loop />

      {!isPlaying ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center">
            <p className="font-cursive text-2xl text-[#8b5e3c]">happy</p>
            <h1 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter mb-4">Birthday</h1>
            <div className="bg-[#e8dfd1] px-6 py-2 transform skew-x-[-10deg] shadow-sm mb-12">
                <p className="text-lg md:text-2xl font-bold tracking-widest skew-x-[10deg]">MY PRINCESS LOVE MERCIALES</p>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} onClick={startCelebration} className="px-10 py-4 bg-[#4a3223] text-white rounded-full font-bold tracking-widest shadow-2xl uppercase text-xs">Enter the Magic 🎁</motion.button>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[1000] bg-[#0c0a09] flex items-center justify-center overflow-hidden">
          
          <AnimatePresence>
            {BIRTHDAY_POEM[currentSlide].type !== 'finale' && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: "110vh", x: `${Math.random() * 100}vw` }}
                    animate={{ y: "-10vh" }}
                    transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
                    className="absolute text-4xl md:text-6xl opacity-40"
                  >
                    {i % 2 === 0 ? "🎈" : "💖"}
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {BIRTHDAY_POEM[currentSlide].type === 'finale' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {BIRTHDAY_POEM[currentSlide].floatingImages.map((img, i) => {
                const count = BIRTHDAY_POEM[currentSlide].floatingImages.length;
                const angle = (i * (360 / count)) * (Math.PI / 180);
                const x = Math.cos(angle) * orbitRadius;
                const y = Math.sin(angle) * orbitRadius;
                const isActive = activeRotationIndex === i;

                return (
                  <motion.div
                    key={`orbit-${i}`}
                    animate={isActive ? { x: 0, y: 0, scale: 2.8, zIndex: 1100, opacity: 1 } : { x, y, scale: 0.8, zIndex: 1000, opacity: 0.3 }}
                    transition={{ duration: 2, ease: "anticipate" }}
                    className="absolute w-20 h-28 md:w-32 md:h-44 p-1 bg-white border-2 border-white shadow-2xl rounded-sm overflow-hidden pointer-events-auto cursor-pointer"
                    onClick={() => setZoomedImage(img)}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="Memory" />
                  </motion.div>
                );
              })}
            </div>
          )}

          <div className="relative z-[1050] text-center px-6 max-w-4xl pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div key={`text-${currentSlide}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1.5 }}>
                <h2 className="text-[#d4af37] text-[10px] md:text-xs uppercase tracking-[0.5em] mb-6 md:mb-10 font-bold">{BIRTHDAY_POEM[currentSlide].title}</h2>
                <div className="space-y-4 md:space-y-8">
                  {BIRTHDAY_POEM[currentSlide].lines.map((line, i) => (
                    <motion.p key={i} className="text-xl md:text-5xl font-serif text-white italic leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">{line}</motion.p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-10 left-10 right-10 flex gap-2 z-[1100]">
            {BIRTHDAY_POEM.map((_, i) => (
              <div key={i} className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-[#d4af37]" initial={{ width: "0%" }} animate={i === currentSlide ? { width: "100%" } : i < currentSlide ? { width: "100%" } : { width: "0%" }} transition={{ duration: BIRTHDAY_POEM[currentSlide].type === 'finale' ? 45 : 12, ease: "linear" }} />
              </div>
            ))}
          </div>

          <button onClick={() => setIsPlaying(false)} className="absolute top-6 right-6 z-[1200] text-white/40 hover:text-white border border-white/10 px-4 py-2 rounded-full backdrop-blur-md transition-all text-xs uppercase tracking-widest">✕ Close</button>

          <AnimatePresence>
            {zoomedImage && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoomedImage(null)} className="fixed inset-0 z-[2000] bg-black/98 flex flex-col items-center justify-center p-4 cursor-pointer">
                <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} src={zoomedImage} className="max-w-full max-h-[75vh] rounded-lg shadow-2xl border-4 border-white" />
                <p className="mt-6 text-white/50 text-[10px] tracking-widest uppercase">Tap to Return</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default Birthday;