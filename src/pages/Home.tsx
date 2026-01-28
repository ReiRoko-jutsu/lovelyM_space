// src/pages/Home.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { LOVELY_UPDATES } from '../data/updates';
import LovelyCard from '../components/LovelyCard';
import FloatingLetter from '../components/FloatingLetter';

// 1. Import your personal princess photo
import princessPhoto from '../assets/lovely/valentineday.jpg';

const Home: React.FC = () => {
  // Logic for countdown to Valentine's Day 2026
  const daysUntilValentine = Math.ceil(
    (new Date('2026-02-14').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* --- SECTION 1: MODERN HERO & SURPRISE --- */}
      <section className="relative pt-10 px-4">
        {/* Floating background blobs for a modern feel */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-rose-50/50 blur-[120px] -z-10 rounded-full" />
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-rose-100 text-rose-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 shadow-sm border border-rose-200/50">
              {daysUntilValentine} Days until Valentine's
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-slate-800 mb-6 leading-tight">
              A Collection of <br />
              <span className="italic text-rose-400">Lovely Moments</span>
            </h1>
            <p className="text-slate-400 text-lg font-light max-w-lg mx-auto leading-relaxed">
              Every day with you is a new chapter of happiness. 
              Explore our digital sanctuary below.
            </p>
          </motion.div>

          {/* THE PRINCESS SURPRISE BOX */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-[3rem] p-8 md:p-16 border border-white shadow-[0_20px_50px_rgba(251,113,133,0.15)] relative"
          >
            <div className="absolute top-8 left-8 text-rose-200/60 animate-pulse">✨</div>
            <div className="absolute bottom-8 right-8 text-rose-200/60 animate-pulse delay-700">✨</div>

            <div className="text-center relative z-10">
              <h2 className="text-xs uppercase tracking-[0.4em] text-rose-400 mb-2 font-bold">Valentine Chapter</h2>
              <p className="text-slate-500 font-serif italic text-lg mb-8">
                A letter specifically for my princess...
              </p>
              
              <FloatingLetter 
                princessName="My Queen"
                image={princessPhoto} 
                message="As we get closer to our Valentine's celebration, I wanted to create this digital home for us. You are the heartbeat of every memory on this page, and the light of my life."
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: THE MEMORY FEED --- */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-md">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-800">The Memory Feed</h2>
            <p className="text-slate-400 mt-2 italic text-sm">Chronological updates of our life together.</p>
          </div>
          <div className="h-px flex-1 bg-rose-100 mx-8 hidden md:block opacity-50" />
          <span className="text-[10px] uppercase tracking-widest text-rose-300 font-bold">Est. 2025</span>
        </div>

        {/* Modern Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-16">
          {LOVELY_UPDATES.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: index % 2 === 0 ? 0 : 0.2 // Staggered reveal effect
              }}
              className={index % 2 !== 0 ? 'md:mt-20' : ''} // Staggered visual offset
            >
              <LovelyCard update={update} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FOOTER DECORATION --- */}
      <footer className="text-center pt-20">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-rose-50 text-rose-300 text-[10px] tracking-widest uppercase">
          <span className="w-1 h-1 bg-rose-300 rounded-full animate-ping" />
          Live Archive Active
        </div>
      </footer>
    </div>
  );
};

export default Home;