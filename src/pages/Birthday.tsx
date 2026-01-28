// src/pages/Birthday.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// Import her photo
import lovelyPhoto from '../assets/lovely/valentineday.jpg';

// --- 🎞️ NEW FEATURE: DATA FOR PAST CELEBRATIONS ---
const PAST_BIRTHDAYS = [
  {
    id: 1,
    year: "2025",
    title: "A Day of Grace",
    coverImage: "https://images.unsplash.com/photo-1530103862676-fa8c9d34bc34",
    album: [
      "https://images.unsplash.com/photo-1530103862676-fa8c9d34bc34",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176"
    ],
    voiceNote: "/audio/2025-voice.mp3",
    note: "Our second year of celebrating you."
  },
  {
    id: 2,
    year: "2024",
    title: "The Beginning",
    coverImage: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84",
    album: [
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84",
      "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92"
    ],
    voiceNote: "/audio/2024-voice.mp3",
    note: "Where our first birthday wishes began."
  }
];

const BIRTHDAY_POEM = [
  {
    title: "To My Beautiful Princess",
    lines: [
      "The one whose smile sets my heart ablaze,",
      "whose laughter is the sweetest song I know,",
      "whose eyes hold galaxies of love,",
      "and whose heart beats in perfect rhythm with mine—",
      "Happy Birthday, my love."
    ]
  },
  {
    title: "Across the Distance",
    lines: [
      "Even though miles stretch between us,",
      "from Tayabas to Zamboanga,",
      "I feel you in every breath I take,",
      "in every whisper of the wind,",
      "in every quiet moment my soul longs for yours."
    ]
  },
  {
    title: "Your Radiant Light",
    lines: [
      "You are more than beauty—you are light itself,",
      "gentle yet fierce, tender yet strong.",
      "Your kindness melts the shadows of my doubts,",
      "your love shields me when the world feels heavy,",
      "and your presence makes me feel safe and cherished."
    ]
  },
  {
    title: "Two Years of Us",
    lines: [
      "I remember the first time I saw your smile,",
      "how it captured my heart before I even knew it.",
      "Two years have passed since that moment,",
      "and every day, my love for you has grown deeper,",
      "like the ocean, endless and unfathomable."
    ]
  },
  {
    title: "A Celebration of You",
    lines: [
      "Today, I celebrate you, my angel:",
      "your dreams, your laughter, your gentle soul,",
      "your courage, your warmth, your heart that loves so purely.",
      "I celebrate the way God’s perfect plan brought you to me."
    ]
  },
  {
    title: "My Eternal Promise",
    lines: [
      "I wish I could be by your side,",
      "to hold your hand and kiss your cheek...",
      "But even from afar, I promise this:",
      "my heart is yours—entirely, endlessly, eternally."
    ]
  },
  {
    title: "Forever & Always",
    lines: [
      "Happy Birthday, my everything, my beautiful princess.",
      "Forever and always, you are my heart,",
      "my soul, my destiny. ❤️",
      "— Your Forever Person"
    ]
  }
];

const Birthday: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // New States for Features
  const [selectedYear, setSelectedYear] = useState<typeof PAST_BIRTHDAYS[0] | null>(null);
  const [albumIndex, setAlbumIndex] = useState(0);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        if (currentSlide < BIRTHDAY_POEM.length - 1) {
          setCurrentSlide(prev => prev + 1);
        }
      }, 10000); 
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentSlide]);

  // Mini-Album Auto-Advance
  useEffect(() => {
    let timer: any;
    if (selectedYear) {
      timer = setInterval(() => {
        setAlbumIndex(prev => (prev + 1) % selectedYear.album.length);
      }, 4000);
    }
    return () => { clearInterval(timer); setAlbumIndex(0); };
  }, [selectedYear]);

  const fireHearts = (isGrand = false) => {
    const end = Date.now() + (isGrand ? 5000 : 2000);
    const colors = ['#fb7185', '#ffffff', '#fda4af', '#ffd700'];

    (function frame() {
      confetti({ particleCount: isGrand ? 4 : 2, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: isGrand ? 4 : 2, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  const startCelebration = () => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.volume = 0.4;
    }
    fireHearts();
  };

  const playVoiceNote = (url: string) => {
    if (voiceRef.current) {
      voiceRef.current.src = url;
      voiceRef.current.play();
    }
  };

  return (
    <div className="min-h-screen bg-[#fff1f2] flex flex-col items-center justify-center overflow-x-hidden">
      <audio ref={audioRef} src="/audio/birthday-music.mp3" loop />
      <audio ref={voiceRef} />

      {!isPlaying ? (
        <div className="w-full flex flex-col items-center">
          {/* --- 🎀 LUXURY ENTRANCE --- */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[80vh] flex flex-col items-center justify-center text-center p-8">
            <motion.div 
              animate={{ scale: [1, 1.05, 1], y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-40 h-40 bg-white rounded-full shadow-[0_20px_50px_rgba(251,113,133,0.3)] mx-auto flex items-center justify-center text-7xl mb-10 border-4 border-rose-100"
            >
              🎁
            </motion.div>
            <h2 className="text-rose-400 tracking-[0.4em] uppercase text-xs font-bold mb-2">February 16, 2026</h2>
            <h1 className="text-4xl md:text-6xl font-serif text-slate-800 mb-12 italic">Lovely Merciales</h1>
            <button 
              onClick={startCelebration}
              className="px-12 py-4 bg-rose-500 text-white rounded-full tracking-widest text-xs font-bold shadow-xl hover:bg-rose-600 transition-all"
            >
              OPEN YOUR HEART'S SURPRISE
            </button>
          </motion.div>

          {/* --- 🎞️ NEW FEATURE: PAST CELEBRATIONS GRID --- */}
          <section className="w-full max-w-6xl px-6 pb-24">
            <div className="flex items-center gap-6 mb-16">
              <div className="h-px flex-1 bg-rose-200" />
              <h2 className="text-[10px] uppercase tracking-[0.5em] text-rose-400 font-bold">Past Celebrations</h2>
              <div className="h-px flex-1 bg-rose-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {PAST_BIRTHDAYS.map((moment) => (
                <motion.div
                  key={moment.id}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedYear(moment)}
                  className="group cursor-pointer bg-white p-4 shadow-2xl rounded-sm border border-rose-50"
                >
                  <div className="relative aspect-[4/5] overflow-hidden mb-6">
                    <img src={moment.coverImage} alt={moment.year} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white/95 px-6 py-2 rounded-full text-[10px] font-bold tracking-widest text-rose-500 shadow-xl">VIEW ALBUM</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-rose-300 uppercase tracking-widest">{moment.year} Archive</span>
                    <h3 className="text-xl font-serif text-slate-800 mt-2 italic">{moment.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        /* --- 📽️ CINEMATIC POETRY OVERLAY --- */
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="fixed inset-0 z-[1000] bg-gradient-to-b from-rose-900 to-rose-950 flex items-center justify-center overflow-hidden"
        >
          {/* 📸 FLOATING POLAROID WALL */}
          <div className="absolute inset-0 pointer-events-none z-[1010]">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -40, 0], rotate: i % 2 === 0 ? [3, -3, 3] : [-3, 3, -3] }}
                transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute opacity-30 ${i < 3 ? 'left-6' : 'right-6'} ${i % 3 === 0 ? 'top-10' : i % 3 === 1 ? 'top-1/2 -translate-y-1/2' : 'bottom-10'} hidden lg:block`}
              >
                <div className="p-2 bg-white/10 backdrop-blur-md rounded-sm border border-white/20">
                  <img src={lovelyPhoto} alt="Lovely" className="w-32 h-44 object-cover grayscale-[30%]" />
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 3 }} className="absolute inset-0">
              <motion.img initial={{ scale: 1.3 }} animate={{ scale: 1.1 }} transition={{ duration: 11 }} src={lovelyPhoto} className="w-full h-full object-cover opacity-30 blur-[2px]" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-[1050] text-center px-8 max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div key={`text-${currentSlide}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 2 }}>
                <span className="text-rose-300 text-[10px] uppercase tracking-[0.5em] mb-10 block font-bold opacity-80">{BIRTHDAY_POEM[currentSlide].title}</span>
                <div className="space-y-6">
                  {BIRTHDAY_POEM[currentSlide].lines.map((line, i) => (
                    <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 + (i * 0.8) }} className="text-xl md:text-3xl font-serif text-white italic leading-relaxed drop-shadow-2xl">
                      {line}
                    </motion.p>
                  ))}
                </div>
                {/* --- 💓 FINAL HEARTBEAT FINALE --- */}
                {currentSlide === BIRTHDAY_POEM.length - 1 && (
                  <motion.button
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5 }}
                    onClick={() => fireHearts(true)}
                    className="mt-12 bg-rose-500 text-white px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-2xl animate-pulse"
                  >
                    ❤️ Receive My Love
                  </motion.button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
            {BIRTHDAY_POEM.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-1000 ${i === currentSlide ? 'w-10 bg-rose-400' : 'w-2 bg-white/20'}`} />
            ))}
          </div>

          <button onClick={() => setIsPlaying(false)} className="absolute top-10 right-10 z-[1100] text-white/30 hover:text-white uppercase text-[10px] tracking-widest border border-white/10 px-5 py-2 rounded-full backdrop-blur-sm">Close ✕</button>
        </motion.div>
      )}

      {/* --- 🎞️ MINI-CINEMATIC MODAL WITH VOICE NOTE --- */}
      <AnimatePresence>
        {selectedYear && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6">
            <div className="w-full max-w-5xl flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-2/3 relative aspect-video overflow-hidden rounded-[2rem] shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img key={albumIndex} src={selectedYear.album[albumIndex]} initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} className="w-full h-full object-cover" />
                </AnimatePresence>
              </div>
              <div className="w-full md:w-1/3 text-center md:text-left text-white">
                <span className="text-rose-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">{selectedYear.year} Memory</span>
                <h2 className="text-4xl font-serif italic mb-6">{selectedYear.title}</h2>
                <button onClick={() => playVoiceNote(selectedYear.voiceNote)} className="w-full py-4 bg-white text-rose-900 rounded-full flex items-center justify-center gap-3 font-bold text-[10px] tracking-widest mb-6">
                  PLAY VOICE NOTE 🎙️
                </button>
                <button onClick={() => setSelectedYear(null)} className="text-[10px] text-white/30 uppercase tracking-widest">Close Archive</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Birthday;