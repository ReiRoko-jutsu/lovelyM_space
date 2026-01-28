import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VALENTINE_MOMENTS } from '../data/valentineData';
import ValentineCard from '../components/ValentineCard';

// 📸 Assets
import princessPhoto from '../assets/lovely/valentineday.jpg';
const MUSIC_PATH = "/audio/Palagi.mp3";

const POEM_SLIDES = [
  {
    type: 'prologue',
    image: princessPhoto,
    title: "A Letter to My Queen",
    duration: 17000, 
    lines: [
      "To my beautiful princess reading this,",
      "even if we are miles apart, my heart is always with you.",
      "From Tayabas to Zamboanga, your love fills my days with joy,",
      "your smile brightens my soul, and your kindness makes me feel safe and cherished.",
      "God’s plan was always the best, because it brought me you.",
      "I love you more each day, my love, my everything. ❤️"
    ]
  },
  {
    type: 'poem',
    image: "https://images.unsplash.com/photo-1516589174184-e66443dd954a",
    title: "The Beginning",
    duration: 9000,
    lines: ["From a single glance upon a screen,", "your smile found me—soft, sincere, and true.", "What began as nothing more than a moment", "became God quietly leading me to you."]
  },
  {
    type: 'poem',
    image: "https://i.pinimg.com/1200x/09/28/98/092898eb9c266ce11815bf0e84bf81e4.jpg",
    title: "The Distance",
    duration: 9000,
    lines: ["We are miles apart, yes,", "from Tayabas to Zamboanga’s shore,", "but love travels farther than distance,", "and every day I feel you more."]
  },
  {
    type: 'poem',
    image: princessPhoto,
    title: "The Choice",
    duration: 9000,
    lines: ["When I had nothing but hope and prayer,", "you chose me without fear or doubt.", "You loved me not for what I had,", "but for who I was becoming, inside and out."]
  },
  {
    type: 'poem',
    image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3",
    title: "The Sanctuary",
    lines: ["In your love, I feel safe and protected,", "even when the nights feel long and wide.", "Though screens separate our hands,", "our hearts have never learned to hide."]
  },
  {
    type: 'poem',
    image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47",
    title: "The Sacrifice",
    lines: ["I stay far, not to leave you behind,", "but to build the future we both believe.", "Every sacrifice, every lonely day", "is for the life we’re preparing to live."]
  },
  {
    type: 'poem',
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
    title: "The Faith",
    lines: ["Two years have passed in patience and faith,", "each one shaping us to be strong.", "You are the answer to prayers I whispered,", "a godly woman I waited for so long."]
  },
  {
    type: 'poem',
    image: "https://images.unsplash.com/photo-1516589174184-e66443dd954a",
    title: "The Dream",
    lines: ["I dream of days and years beside you,", "no goodbyes, no miles in between—", "just laughter, love, and shared mornings,", "living the promise we once could only dream."]
  },
  {
    type: 'poem',
    image: princessPhoto,
    title: "The Promise",
    lines: ["This Valentine’s, I thank God for you,", "for a love that time and distance can’t test.", "Because looking back, I see it clearly now—", "God’s plan was always the best. ❤️"]
  }
];

// --- 💘 IMPROVED SHOOTING HEART ---
const ShootingHeart = ({ slideKey }: { slideKey: number }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={slideKey}
      initial={{ x: 50, y: 120, opacity: 0, scale: 0 }}
      animate={{ 
        x: [50, 600, 1200], 
        y: [120, 300, 150], 
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1.5, 0.8],
        rotate: [0, 20, 45]
      }}
      transition={{ duration: 3.5, ease: "easeOut", delay: 1 }}
      className="absolute z-[1070] text-5xl pointer-events-none left-10 top-10 filter drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]"
    >
      ❤️
    </motion.div>
  </AnimatePresence>
);

const ValentineArchive: React.FC = () => {
  const [isStoryMode, setIsStoryMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let timer: any;
    if (isStoryMode) {
      const currentDuration = POEM_SLIDES[currentSlide].duration || 9000;
      timer = setTimeout(() => {
        if (currentSlide < POEM_SLIDES.length - 1) {
          setCurrentSlide(currentSlide + 1);
        }
      }, currentDuration);
    }
    return () => clearTimeout(timer);
  }, [isStoryMode, currentSlide]);

  const startStory = () => {
    setIsStoryMode(true);
    setCurrentSlide(0);
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.volume = 0.5;
      setIsMuted(false);
    }
  };

  const closeStory = () => {
    setIsStoryMode(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffafa] pb-24 relative overflow-hidden">
      <audio ref={audioRef} src={MUSIC_PATH} loop />

      {/* Background Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute text-rose-200/40 text-2xl" 
            initial={{ y: "110vh", x: Math.random() * 100 + "vw" }} 
            animate={{ y: "-10vh" }} 
            transition={{ duration: 20, repeat: Infinity, delay: i * 2 }}
          >
            ❤
          </motion.div>
        ))}
      </div>

      <header className="relative z-10 pt-20 mb-20 text-center px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span className="text-rose-400 tracking-[0.5em] text-[10px] font-bold uppercase">A Special Dedication</span>
          <h1 className="text-5xl md:text-8xl font-serif text-rose-800 italic mt-6">God's <span className="text-slate-800 not-italic">Plan</span></h1>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            onClick={startStory}
            className="mt-12 px-10 py-4 bg-rose-500 text-white rounded-full uppercase text-xs tracking-widest font-bold shadow-xl shadow-rose-200 hover:bg-rose-600 transition-colors"
          >
            Play Our Poetry Story 🎬
          </motion.button>
        </motion.div>
      </header>

      {/* Grid of Cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {VALENTINE_MOMENTS.map((moment, index) => (
          <div key={moment.id} className={index % 2 !== 0 ? 'lg:mt-16' : ''}>
            <ValentineCard moment={moment} />
          </div>
        ))}
      </div>

      {/* 🎬 CINEMATIC OVERLAY */}
      <AnimatePresence>
        {isStoryMode && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-slate-950 flex items-center justify-center overflow-hidden"
          >
            {/* Top Controls */}
            <div className="absolute top-8 right-8 z-[1100] flex items-center gap-4">
               <button onClick={toggleMute} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all">
                {isMuted ? '🔇' : '🔊'}
              </button>
              <button onClick={closeStory} className="px-6 py-2 rounded-full border border-white/20 text-white/60 hover:text-white uppercase text-[10px] tracking-widest bg-white/5 backdrop-blur-md transition-all">
                Close ✕
              </button>
            </div>

            {/* 🏹 ACTION (Cupid Video Removed) */}
            <ShootingHeart slideKey={currentSlide} />

            {/* 📸 SIDE MEMORY WALL */}
            <div className="absolute inset-0 pointer-events-none z-[1010]">
               {[...Array(6)].map((_, i) => (
                 <motion.div
                  key={i}
                  animate={{ y: [0, -30, 0], x: [0, i < 3 ? 15 : -15, 0] }}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  className={`absolute ${i < 3 ? 'left-4 md:left-12' : 'right-4 md:right-12'} ${
                    i === 0 || i === 3 ? 'top-10' : i === 1 || i === 4 ? 'top-1/2 -translate-y-1/2' : 'bottom-10'
                  } hidden lg:block`}
                 >
                    <div className="p-3 bg-white shadow-2xl rounded-sm border-4 border-white rotate-3 transition-transform hover:scale-110 pointer-events-auto">
                       <img src={princessPhoto} alt="Princess" className="w-32 h-40 md:w-44 md:h-56 object-cover" />
                       <p className="mt-2 text-center text-[10px] text-rose-400 font-serif italic font-bold">Always You ❤️</p>
                    </div>
                 </motion.div>
               ))}
            </div>

            {/* Main Background with Cinematic Zoom */}
            <AnimatePresence mode="wait">
              <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2.5 }} className="absolute inset-0">
                <motion.img 
                  initial={{ scale: 1.4, filter: 'blur(10px)' }} 
                  animate={{ scale: 1.1, filter: 'blur(2px)' }}
                  transition={{ duration: 4, ease: "easeOut" }}
                  src={POEM_SLIDES[currentSlide].image} 
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
              </motion.div>
            </AnimatePresence>

            {/* 💖 TEXT OVERLAY */}
            <div className="relative z-[1050] text-center px-8 max-w-4xl">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`text-${currentSlide}`} 
                  initial={{ opacity: 0, y: 40 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -40 }} 
                  transition={{ duration: 2 }}
                >
                  <span className="text-rose-400 text-[11px] md:text-xs uppercase tracking-[0.8em] mb-8 block font-bold valentine-glow">
                    {POEM_SLIDES[currentSlide].title}
                  </span>
                  
                  <div className="space-y-6">
                    {POEM_SLIDES[currentSlide].lines.map((line, i) => (
                      <motion.p 
                        key={i}
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 + (i * 1.2) }}
                        className={`${POEM_SLIDES[currentSlide].type === 'prologue' ? 'text-lg md:text-2xl' : 'text-xl md:text-4xl'} font-serif text-white italic leading-relaxed drop-shadow-2xl px-4`}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
              {POEM_SLIDES.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-1000 ${i === currentSlide ? 'w-12 bg-rose-500' : 'w-2 bg-white/20'}`} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ValentineArchive;