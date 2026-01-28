import { PropsWithChildren, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const navLinks = [
    { path: '/', label: 'Updates', icon: '✨' },
    { path: '/gallery', label: 'Gallery', icon: '🖼️' },
    { path: '/birthday', label: 'Birthday', icon: '🎂' },
    { path: '/valentine', label: 'Valentine', icon: '💖', special: true },
  ];

  return (
    <div className="min-h-screen bg-[#fffcfc] text-slate-800 selection:bg-rose-100 font-sans overflow-x-hidden">
      
      {/* --- DESKTOP & TABLET HEADER (Hidden on small mobile) --- */}
      <nav className="hidden sm:block fixed top-0 w-full z-[100] bg-white/40 backdrop-blur-xl border-b border-rose-50/50 px-8 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="group flex items-center gap-2">
            <span className="text-2xl font-serif italic text-rose-400 group-hover:text-rose-500 transition-all duration-500 tracking-tighter">
              LovelyM 
            </span>
            <div className="h-1 w-1 rounded-full bg-rose-300 animate-pulse" />
          </Link>
          
          <div className="flex items-center space-x-8 text-[10px] tracking-[0.3em] uppercase font-bold text-slate-400">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onMouseEnter={() => setIsHovered(link.path)}
                onMouseLeave={() => setIsHovered(null)}
                className={`relative py-1 transition-all duration-300 hover:text-rose-400 ${
                  location.pathname === link.path ? 'text-rose-500' : ''
                } ${link.special ? 'text-rose-500 flex items-center gap-1' : ''}`}
              >
                <span>{link.label}</span>
                {link.special && (
                  <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                    {link.icon}
                  </motion.span>
                )}
                
                {/* Modern Indicator */}
                {(location.pathname === link.path || isHovered === link.path) && (
                  <motion.div 
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rose-300 rounded-full shadow-[0_0_8px_rgba(251,113,133,0.4)]"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* --- MOBILE APP-STYLE BOTTOM BAR (Hidden on desktop) --- */}
      <nav className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px]">
        <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 flex justify-around items-center">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="relative p-3 flex flex-col items-center gap-1">
              <span className={`text-xl transition-transform duration-300 ${location.pathname === link.path ? 'scale-125' : 'opacity-50 grayscale'}`}>
                {link.icon}
              </span>
              {location.pathname === link.path && (
                <motion.div layoutId="mobileNav" className="absolute inset-0 bg-white/10 rounded-2xl -z-10" />
              )}
              <span className={`text-[8px] font-bold uppercase tracking-widest ${location.pathname === link.path ? 'text-rose-300' : 'text-white/40'}`}>
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {/* --- MOBILE TOP LOGO (Small devices only) --- */}
      <div className="sm:hidden fixed top-0 w-full z-[90] bg-white/80 backdrop-blur-md p-4 text-center border-b border-rose-50">
         <span className="text-xl font-serif italic text-rose-400">Lovely Page</span>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={location.pathname}
        className="pt-28 pb-32 sm:pt-36 sm:pb-20 px-4 sm:px-8 max-w-7xl mx-auto"
      >
        {children}
      </motion.main>

      {/* --- DECORATIVE BACKGROUND ELEMENTS --- */}
      <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden">
        <div className="absolute top-[10%] -left-20 w-72 h-72 bg-rose-50 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[10%] -right-20 w-96 h-96 bg-orange-50 rounded-full blur-[120px] opacity-40" />
      </div>

    </div>
  );
}