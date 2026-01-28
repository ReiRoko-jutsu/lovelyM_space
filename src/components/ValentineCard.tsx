// src/components/ui/ValentineCard.tsx
import { motion } from 'framer-motion';
import type { LovelyUpdate } from '../types';

export default function ValentineCard({ moment }: { moment: LovelyUpdate }) {
  return (
    <motion.div
      whileHover={{ y: -10, rotate: -1 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-4 pb-8 shadow-[0_10px_30px_rgba(251,113,133,0.1)] rounded-sm border border-rose-50 group cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-rose-50 mb-6">
        <img 
          src={moment.image} 
          alt={moment.title} 
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-rose-400/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="px-2 text-center">
        <span className="text-[10px] uppercase tracking-widest text-rose-400 font-bold">{moment.date}</span>
        <h3 className="text-xl font-serif text-slate-800 mt-2 mb-3">{moment.title}</h3>
        <p className="text-slate-500 text-sm italic leading-relaxed">"{moment.description}"</p>
      </div>
    </motion.div>
  );
}