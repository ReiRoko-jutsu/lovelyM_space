import React from 'react';
import { LOVELY_UPDATES } from '../data/updates';

const Gallery: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-serif text-slate-800">Visual Journal</h1>
        <div className="h-px w-12 bg-rose-200 mx-auto mt-4"></div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {LOVELY_UPDATES.map((item) => (
          <div key={item.id} className="group relative aspect-square overflow-hidden rounded-3xl bg-rose-50">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <div className="text-white">
                <p className="text-[10px] uppercase tracking-widest opacity-80">{item.date}</p>
                <p className="font-serif text-lg italic">{item.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;