// src/pages/Valentine.tsx
import React from 'react';
import { motion } from 'framer-motion';
import FloatingLetter from '../components/FloatingLetter';

// Import your specific image
import princessPhoto from '../assets/lovely/valentineday.jpeg';

const Valentine: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#fffafa] overflow-hidden">
      
      {/* 🌸 Floating Background Elements (Unique Essence) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-200/40"
            initial={{ y: "100vh", x: Math.random() * 100 + "vw" }}
            animate={{ y: "-10vh" }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              delay: i * 2 
            }}
          >
            {i % 2 === 0 ? '🌸' : '✨'}
          </motion.div>
        ))}
      </div>

      <header className="relative z-10 text-center pt-24 mb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-rose-400 tracking-[0.5em] text-[10px] font-bold uppercase">Exclusive Chapter</span>
          <h1 className="text-5xl md:text-7xl font-serif text-rose-800 italic mt-4">
            For My Princess
          </h1>
          <div className="mt-6 flex justify-center items-center gap-4">
            <div className="h-px w-12 bg-rose-200" />
            <p className="text-rose-300 font-serif italic">February 14, 2026</p>
            <div className="h-px w-12 bg-rose-200" />
          </div>
        </motion.div>
      </header>

      {/* 💌 The Floating Surprise Component */}
      <section className="relative z-20 flex justify-center items-center py-10">
        <FloatingLetter 
          princessName="My Dearest Princess" 
          image={princessPhoto} 
          message="Every moment with you feels like a page from a fairytale. This Valentine's Day, I just wanted to remind you that you are the most beautiful part of my world. Your smile is my favorite memory, and your heart is my home."
        />
      </section>

      {/* 📸 Valentine Moments History Section */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif text-slate-700">Our Valentine Collection</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <motion.div 
             whileHover={{ y: -10 }}
             className="bg-white p-4 rounded-3xl shadow-sm border border-rose-50"
           >
             <div className="aspect-[4/5] rounded-2xl bg-rose-50 overflow-hidden mb-4">
                <img src={princessPhoto} alt="Valentine 2026" className="w-full h-full object-cover" />
             </div>
             <p className="text-center font-serif italic text-rose-400 text-lg">Coming Soon... 2026</p>
           </motion.div>
           
           <div className="flex flex-col justify-center p-8 bg-rose-50/50 rounded-3xl border border-dashed border-rose-200">
              <p className="text-rose-400 text-center italic">
                "Each Valentine's day, we will add a new memory here to see our love grow through the years."
              </p>
           </div>
        </div>
      </section>

      <footer className="text-center pb-12 opacity-40">
        <p className="text-[10px] tracking-widest uppercase">My Princess &bull; Forever</p>
      </footer>
    </div>
  );
};

export default Valentine;