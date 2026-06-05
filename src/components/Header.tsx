import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSeason } from '@/context/SeasonContext'

const NAV_LINKS = [
  { path: '/', label: 'HOME', id: '01' },
  { path: '/archive', label: 'ARCHIVE', id: '02' },
  { path: '/projects', label: 'PROJECTS', id: '03' },
  { path: '/travel', label: 'TRAVEL', id: '04' },
];

type Season = 'spring' | 'summer' | 'autumn' | 'winter';
const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter'];

const SEASON_ICONS: Record<Season, string> = {
  spring: '🌸',
  summer: '🌻',
  autumn: '🍂',
  winter: '❄️',
};

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { season, setSeason } = useSeason();

  const handleSeasonToggle = () => {
    const currentIndex = SEASONS.indexOf(season);
    const nextSeason = SEASONS[(currentIndex + 1) % SEASONS.length];
    setSeason(nextSeason);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-natural-bg/60 px-[5%] py-8 backdrop-blur-md border-b border-natural-border transition-colors duration-700">
      <Link to="/" className="text-xl font-display font-light tracking-widest text-natural-text uppercase">
        Iota's World
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-10">
        <ul className="flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`group relative text-[0.75rem] uppercase tracking-[0.2em] transition-all duration-300 ${
                  location.pathname === link.path ? 'opacity-100 border-b border-accent text-accent' : 'opacity-60 hover:opacity-100 hover:text-accent'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* Desktop Season Toggle */}
        <button 
          onClick={handleSeasonToggle}
          className="ml-4 flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-natural-border hover:border-accent hover:text-accent transition-colors duration-300"
          aria-label="Toggle Season"
        >
          <span>{SEASON_ICONS[season]}</span>
          <span className="capitalize text-[0.70rem] tracking-wider font-mono">{season}</span>
        </button>
      </nav>

      {/* Mobile Toggle Icons */}
      <div className="flex items-center gap-4 lg:hidden">
        {/* Mobile Season Toggle Mini */}
        <button 
          onClick={handleSeasonToggle}
          className="text-mono-black p-1 focus:outline-none"
          aria-label="Toggle Season"
        >
          {SEASON_ICONS[season]}
        </button>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-mono-black p-1 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            // 1. Removed `inset-0`, added explicit `top-0 left-0 bottom-0` to fix width calculation bugs
            className="fixed top-0 left-0 bottom-0 z-[60] flex h-[100dvh] w-[80%] max-w-sm flex-col bg-natural-bg shadow-2xl lg:hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-10 p-2 text-natural-text opacity-60 hover:opacity-100"
            >
              <X size={32} />
            </button>

            {/* 2. Middle Content Wrapper: `flex-1` takes up available space, perfectly centering links */}
            <div className="flex flex-1 flex-col items-center justify-center w-full">
              {/* 3. Added `p-0` to strip potential default padding pushing text right */}
              <ul className="flex flex-col items-center gap-10 text-center mb-12 p-0 w-full">
                {NAV_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-2xl font-display font-bold tracking-tighter transition-colors duration-300 ${
                        location.pathname === link.path ? 'text-accent' : 'text-natural-text hover:text-accent'
                      }`}
                    >
                      {link.id}. {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <button 
                onClick={handleSeasonToggle}
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-natural-border text-natural-text hover:text-accent hover:border-accent transition-colors duration-300"
              >
                <span className="text-xl">{SEASON_ICONS[season]}</span>
                <span className="capitalize tracking-widest font-mono text-sm">Theme: {season}</span>
              </button>
            </div>

            {/* 4. Footer Wrapper: Pinned at the bottom, perfectly centered horizontally */}
            <div className="pb-8 pt-8 border-t border-natural-border/20 flex flex-col items-center gap-6 w-full px-6 text-center">
              <div className="flex items-center justify-center gap-8 w-full">
                <a
                  href="https://github.com/Iota113"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-natural-text opacity-40 hover:opacity-100 transition-opacity"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/henry-tse-9027aa147/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-natural-text opacity-40 hover:opacity-100 transition-opacity"
                >
                  <Linkedin size={20} />
                </a>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-[10px] uppercase tracking-widest opacity-40 mb-1">personal website</div>
                <div className="text-xs font-sans opacity-60">4 Pages Planned • 2 Complete</div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};