// src/components/LovelyCard.tsx
import type { LovelyUpdate } from '../types';

interface Props {
  update: LovelyUpdate;
}

export default function LovelyCard({ update }: Props) {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-rose-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={update.image} 
          alt={update.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-rose-500 font-bold">
          {update.tag}
        </div>
      </div>
      <div className="p-6">
        <p className="text-rose-300 text-xs font-medium mb-1">{update.date}</p>
        <h2 className="text-xl md:text-2xl font-serif text-slate-800 mb-2">{update.title}</h2>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{update.description}</p>
      </div>
    </div>
  );
}