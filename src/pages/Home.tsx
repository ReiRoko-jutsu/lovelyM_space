import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOVELY_UPDATES } from '../data/updates';
import LovelyCard from '../components/LovelyCard';

import princessPhoto from '../assets/lovely/valentineday.jpg';

// 1. Define the interface to fix the "Property does not exist" errors
interface Note {
  text: string;
  date: string;
  category: string;
}

interface TravelPlace {
  id: number;
  city: string;
  country: string;
  date: string;
  desc: string;
  gallery: string[]; 
}

const Home: React.FC = () => {
  // --- STATE ---
  const [newNote, setNewNote] = useState("");
  const [selectedCity, setSelectedCity] = useState<TravelPlace | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // --- LOCAL STORAGE LOGIC (Typed as Note[]) ---
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('lovely-notes');
    return saved ? JSON.parse(saved) : [
      { text: "Building our life on a firm foundation.", date: "Jan 15", category: "Worship" },
      { text: "The views were beautiful, but I was only looking at you.", date: "Dec 20", category: "Travel" }
    ];
  });

  useEffect(() => {
    localStorage.setItem('lovely-notes', JSON.stringify(notes));
  }, [notes]);

  // --- HANDLERS ---
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    
    const noteToAdd: Note = { text: newNote, date: formattedDate, category: "General" };
    setNotes([noteToAdd, ...notes]);
    setNewNote("");
  };

  const toggleLike = (cityId: number, photoIndex: number) => {
    const key = `${cityId}-${photoIndex}`;
    setLikedPhotos(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // --- DATA ---
  const visitedPlaces: TravelPlace[] = [
    { id: 1, city: "Paris", country: "France", date: "June 2025", desc: "Walking through gardens.", gallery: [princessPhoto, princessPhoto] },
    { id: 2, city: "Kyoto", country: "Japan", date: "Oct 2025", desc: "Temple mornings.", gallery: [princessPhoto, princessPhoto] },
    { id: 3, city: "Bali", country: "Indonesia", date: "Dec 2025", desc: "Island sunsets.", gallery: [princessPhoto, princessPhoto] },
    { id: 4, city: "New York", country: "USA", date: "Jan 2026", desc: "Snowy coffee dates.", gallery: [princessPhoto] },
  ];

  const filteredMemories = useMemo(() => {
    return LOVELY_UPDATES.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="relative space-y-32 pb-32 overflow-hidden bg-[#fffdfd]">


      {/* --- HERO --- */}
      <section className="max-w-7xl mx-auto px-6 pt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-6xl md:text-9xl font-serif text-slate-900 leading-tight">Grown <span className="text-rose-300 italic">In Grace.</span></h1>
        </motion.div>
        <img src={princessPhoto} alt="Hero" className="w-full h-[50vh] md:h-[60vh] object-cover rounded-[40px] shadow-2xl" />
      </section>

      {/* --- TRAVEL PINS --- */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-serif text-slate-800 mb-10">Passport Pins</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {visitedPlaces.map((place) => (
            <motion.div key={place.id} whileHover={{ y: -5 }} onClick={() => setSelectedCity(place)} className="relative p-6 md:p-8 bg-white rounded-3xl border border-slate-100 shadow-sm cursor-pointer text-center group">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-rose-400 rounded-full" />
              <h3 className="text-lg md:text-xl font-serif text-slate-800">{place.city}</h3>
              <p className="text-[9px] text-rose-300 uppercase font-bold mt-2">View Album</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- NOTE BOARD (RE-FIXED & RESPONSIVE) --- */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-800">Love & Prayer Notes</h2>
          <form 
            onSubmit={handleAddNote} 
            className="mt-10 max-w-lg mx-auto flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl sm:rounded-full border border-rose-100 shadow-sm focus-within:shadow-md"
          >
            <input 
              type="text" 
              value={newNote} 
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a memory..."
              className="flex-1 bg-transparent px-6 py-3 outline-none font-serif text-slate-600 text-base md:text-sm"
            />
            <button 
              type="submit"
              className="bg-rose-300 text-white px-8 py-3 sm:py-2 rounded-xl sm:rounded-full text-sm font-bold uppercase tracking-widest hover:bg-rose-400 transition-all"
            >
              Post
            </button>
          </form>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {notes.map((note, i) => (
              <motion.div 
                key={`${i}-${note.date}`} 
                layout 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="p-8 bg-white border border-slate-100 shadow-sm rounded-2xl hover:shadow-md transition-shadow break-inside-avoid"
              >
                <p className="text-slate-600 font-serif italic mb-4 leading-relaxed">"{note.text}"</p>
                <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.2em] pt-4 border-t border-slate-50">
                  <span className="font-bold text-rose-300">{note.category}</span>
                  <span className="text-slate-400 font-medium">{note.date}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* --- ARCHIVE --- */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-serif text-slate-800 mb-10">Memory Archive</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredMemories.map((update, index) => (
            <div key={update.id} className={index % 2 !== 0 ? 'md:mt-20' : ''}>
              <LovelyCard update={update} />
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-20 opacity-30 text-[10px] tracking-[0.5em] uppercase">Always Growing • Always Grateful</footer>
    </div>
  );
};

export default Home;