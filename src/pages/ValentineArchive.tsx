import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VALENTINE_MOMENTS } from '../data/valentineData';
import ValentineCard from '../components/ValentineCard';

// 📸 Assets
import princessPhoto from '../assets/lovely/valentineday.jpg';
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
const MUSIC_PATH = "/audio/Palagi.mp3";

const PORTRAIT_ALBUM = [
  love_01, love_02, love_04, love_05, love_06, love_07, love_08, love_09, love_10,
  love_11, love_12, love_13, love_14, love_15, love_16, love_17, love_18, love_19, love_20,
];

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
    image: slide_1,
    title: "The Beginning",
    duration: 9000,
    lines: ["From a single glance upon a screen,", "your smile found me—soft, sincere, and true.", "What began as nothing more than a moment", "became God quietly leading me to you."]
  },
  {
    type: 'poem',
    image: slide_2,
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
    image: slide_01,
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
    image: slide_5,
    title: "The Faith",
    lines: ["Two years have passed in patience and faith,", "each one shaping us to be strong.", "You are the answer to prayers I whispered,", "a godly woman I waited for so long."]
  },
  {
    type: 'poem',
    image: slide_6,
    title: "The Dream",
    lines: ["I dream of days and years beside you,", "no goodbyes, no miles in between—", "just laughter, love, and shared mornings,", "living the promise we once could only dream."]
  },
  {
    type: 'poem',
    image: princessPhoto,
    title: "The Promise",
    duration: 9000,
    lines: ["This Valentine’s, I thank God for you,", "for a love that time and distance can’t test.", "Because looking back, I see it clearly now—", "God’s plan was always the best. ❤️"]
  },
  {
    type: 'gallery',
    title: "", 
    duration: 15000,
    lines: [] 
  }
];

const ShootingHeart = ({ slideKey }: { slideKey: number }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={slideKey}
      initial={{ x: "-10vw", y: "20vh", opacity: 0, scale: 0 }}
      animate={{ 
        x: ["0vw", "50vw", "110vw"], 
        y: ["20vh", "40vh", "20vh"], 
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1.2, 0.8],
        rotate: [0, 20, 45]
      }}
      transition={{ duration: 4, ease: "easeOut", delay: 0.5 }}
      className="absolute z-[1070] text-3xl md:text-5xl pointer-events-none filter drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]"
    >
      ❤️
    </motion.div>
  </AnimatePresence>
);

const ValentineArchive: React.FC = () => {
  const [isStoryMode, setIsStoryMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [reactions, setReactions] = useState<{ id: number; x: number; emoji: string }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🚀 FIXED: Force scroll to top on mount or story toggle
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isStoryMode]);

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

  useEffect(() => {
    let galleryTimer: any;
    if (isStoryMode && POEM_SLIDES[currentSlide].type === 'gallery') {
      galleryTimer = setInterval(() => {
        setGalleryIndex((prev) => (prev + 1) % PORTRAIT_ALBUM.length);
      }, 3500);
    }
    return () => clearInterval(galleryTimer);
  }, [isStoryMode, currentSlide]);

  const addReaction = (emoji: string) => {
    const id = Date.now();
    const x = Math.random() > 0.5 ? Math.random() * 10 + 5 : Math.random() * 10 + 85;
    setReactions(prev => [...prev, { id, x, emoji }]);
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== id));
    }, 4000);
  };

  const startStory = () => {
    setIsStoryMode(true);
    setCurrentSlide(0);
    setGalleryIndex(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0;
      audioRef.current.play();
      
      let vol = 0;
      const fadeInterval = setInterval(() => {
        if (vol < 0.45) {
          vol += 0.05;
          if (audioRef.current) audioRef.current.volume = vol;
        } else {
          clearInterval(fadeInterval);
        }
      }, 200);
      
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
    <div className="min-h-screen bg-[#fffafa] pb-10 md:pb-24 relative overflow-hidden">
      <audio ref={audioRef} src={MUSIC_PATH} loop preload="auto" />

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} className="absolute text-rose-200/30 text-xl md:text-2xl" initial={{ y: "110vh", x: Math.random() * 100 + "vw" }} animate={{ y: "-10vh" }} transition={{ duration: 15, repeat: Infinity, delay: i * 2 }}>❤</motion.div>
        ))}
      </div>

      <header className="relative z-10 pt-12 md:pt-20 mb-10 md:mb-20 text-center px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span className="text-rose-400 tracking-[0.3em] md:tracking-[0.5em] text-[9px] md:text-[10px] font-bold uppercase">A Special Dedication</span>
          <h1 className="text-4xl md:text-8xl font-serif text-rose-800 italic mt-4 md:mt-6">God's <span className="text-slate-800 not-italic">Plan</span></h1>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={startStory} className="mt-8 md:mt-12 px-8 md:px-10 py-3 md:py-4 bg-rose-500 text-white rounded-full uppercase text-[10px] md:text-xs tracking-widest font-bold shadow-xl shadow-rose-200 hover:bg-rose-600 transition-colors">
            Play Our Poetry Story 🎬
          </motion.button>
        </motion.div>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {VALENTINE_MOMENTS.map((moment, index) => (
          <div key={moment.id} className={index % 2 !== 0 ? 'lg:mt-16' : ''}>
            <ValentineCard moment={moment} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isStoryMode && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
            
            <div className="absolute inset-0 pointer-events-none z-[1080]">
              <AnimatePresence>
                {reactions.map(r => (
                  <motion.div
                    key={r.id}
                    initial={{ y: "100vh", x: `${r.x}vw`, opacity: 0, scale: 0.5 }}
                    animate={{ y: "-10vh", opacity: [0, 1, 0], scale: [0.5, 1.5, 1], rotate: [0, 20, -20] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="absolute text-4xl md:text-6xl"
                  >
                    {r.emoji}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="absolute top-4 md:top-8 right-4 md:right-8 z-[1100] flex items-center gap-2 md:gap-4">
               <button onClick={toggleMute} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 bg-white/5 backdrop-blur-md transition-all">{isMuted ? '🔇' : '🔊'}</button>
               <button onClick={closeStory} className="px-4 md:px-6 py-2 rounded-full border border-white/20 text-white/60 hover:text-white uppercase text-[9px] md:text-[10px] tracking-widest bg-white/5 backdrop-blur-md transition-all">Close ✕</button>
            </div>

            <ShootingHeart slideKey={currentSlide} />

            {POEM_SLIDES[currentSlide].type !== 'gallery' && (
                <div className="absolute inset-0 pointer-events-none z-[1010]">
                {[...Array(4)].map((_, i) => (
                    <motion.div key={i} animate={{ y: [0, -15, 0], x: [0, i < 2 ? 5 : -5, 0] }} transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }} className={`absolute opacity-60 md:opacity-100 ${i < 2 ? 'left-2 md:left-12' : 'right-2 md:right-12'} ${i === 0 || i === 2 ? 'top-20 md:top-10' : 'bottom-24 md:bottom-10'} block`}>
                    <div className="p-1.5 md:p-3 bg-white shadow-2xl rounded-sm border-2 md:border-4 border-white rotate-2 md:rotate-3 scale-[0.6] md:scale-100 transform-gpu">
                        <img src={princessPhoto} alt="Princess" className="w-24 h-32 md:w-44 md:h-56 object-cover" />
                        <p className="mt-1 md:mt-2 text-center text-[7px] md:text-[10px] text-rose-400 font-serif italic font-bold">Always You ❤️</p>
                    </div>
                    </motion.div>
                ))}
                </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2.5 }} className="absolute inset-0 flex items-center justify-center">
                {POEM_SLIDES[currentSlide].type === 'gallery' ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-black p-4 relative">
                        <AnimatePresence mode="wait">
                            <motion.img 
                                key={galleryIndex}
                                initial={{ opacity: 0, scale: 0.9, filter: 'blur(15px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                                transition={{ duration: 1.5 }}
                                src={PORTRAIT_ALBUM[galleryIndex]}
                                className="h-[65vh] md:h-[75vh] w-auto max-w-[90vw] object-contain rounded-xl md:rounded-2xl shadow-[0_0_50px_rgba(251,113,133,0.3)] border border-white/10"
                            />
                        </AnimatePresence>

                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1, duration: 1.5 }}
                          className="mt-4 md:mt-6 flex flex-col items-center z-[1150]"
                        >
                           <p className="font-serif text-3xl md:text-5xl text-rose-300 italic tracking-[0.1em] drop-shadow-lg relative cursive-signature">
                             My Princess
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: "110%" }}
                               transition={{ delay: 2, duration: 2 }}
                               className="absolute -bottom-1 -left-[5%] h-[1.5px] bg-rose-400/70 rounded-full"
                             />
                           </p>
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-6 md:bottom-8 flex gap-4 md:gap-8 bg-white/5 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 z-[1200]"
                        >
                          {['🥰', '😍', '💋', '💖'].map(emoji => (
                            <button 
                              key={emoji}
                              onClick={() => addReaction(emoji)}
                              className="text-2xl md:text-4xl hover:scale-125 active:scale-90 transition-transform cursor-pointer"
                            >
                              {emoji}
                            </button>
                          ))}
                        </motion.div>
                    </div>
                ) : (
                    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                       <motion.img 
                          initial={{ scale: 1.2, opacity: 0 }} 
                          animate={{ scale: 1, opacity: 0.3 }}
                          transition={{ duration: 6, ease: "easeOut" }}
                          src={POEM_SLIDES[currentSlide].image} 
                          className="w-full h-full object-contain md:object-cover"
                       />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
              </motion.div>
            </AnimatePresence>

            <div className="relative z-[1050] text-center px-6 md:px-8 max-w-4xl mt-10 md:mt-0 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div key={`text-${currentSlide}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1.5 }}>
                  <span className="text-rose-400 text-[9px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.8em] mb-4 md:mb-8 block font-bold valentine-glow">{POEM_SLIDES[currentSlide].title}</span>
                  <div className="space-y-4 md:space-y-6">
                    {POEM_SLIDES[currentSlide].lines.map((line, i) => (
                      <motion.p 
                        key={i} 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ delay: 1 + (i * 0.8) }} 
                        className={`${POEM_SLIDES[currentSlide].type === 'prologue' ? 'text-base md:text-2xl' : 'text-xl md:text-4xl'} font-serif text-white italic leading-relaxed drop-shadow-2xl`}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-20 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
              {POEM_SLIDES.map((_, i) => (
                <div key={i} className={`h-1 md:h-1.5 rounded-full transition-all duration-1000 ${i === currentSlide ? 'w-8 md:w-12 bg-rose-500' : 'w-1.5 md:w-2 bg-white/20'}`} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ValentineArchive;