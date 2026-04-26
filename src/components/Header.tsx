import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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

  const renderSeasonalBadge = () => {
    switch (season) {
      case 'spring':
        return <span className="text-[0.65rem] tracking-widest text-accent bg-surface-bg px-2 py-1 rounded-full border border-border">🌸 BLOOM</span>;
      case 'summer':
        return <span className="text-[0.65rem] tracking-widest text-surface-bg bg-accent px-2 py-1 rounded-sm shadow-sm">☀️ HIGH NOON</span>;
      case 'autumn':
        return <span className="text-[0.65rem] tracking-widest text-accent border-b border-accent italic pb-[1px]">🍁 harvest</span>;
      case 'winter':
        return <span className="text-[0.65rem] tracking-widest text-secondary font-mono border border-secondary/30 px-2 py-1">❄️ FROST</span>;
    }
  };

  return (
      <header className="seasonal-header-decor relative sticky top-0 z-50 flex items-center justify-between bg-natural-bg/90 px-[5%] py-8 backdrop-blur-sm border-b border-[var(--color-border)] transition-all duration-700">      
        <Link to="/" className="text-xl font-display font-light tracking-widest text-natural-text uppercase">
          Iota's World
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                {/* Using your CSS variables for dynamic hover states */}
                <Link
                  to={link.path}
                  className={`group relative text-[0.75rem] uppercase tracking-[0.2em] transition-all duration-300 ${
                    location.pathname === link.path 
                      ? 'opacity-100 border-b border-[var(--color-accent)] text-[var(--color-accent)]' 
                      : 'opacity-60 hover:opacity-100 hover:text-[var(--color-accent)]'
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
            className="ml-4 flex items-center gap-2 text-sm px-3 py-1.5 rounded-[var(--radius-ui)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300"
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
              className="fixed inset-0 top-0 left-0 z-[60] flex h-screen w-[80%] flex-col items-center justify-center bg-natural-bg shadow-2xl lg:hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6"
              >
                <X size={32} />
              </button>
              
              <ul className="flex flex-col items-center gap-10 text-center mb-12">
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

              {/* Mobile Season Toggle */}
              <button 
                onClick={handleSeasonToggle}
                className="flex items-center gap-3 px-6 py-3 rounded-full border border-natural-border text-natural-text hover:text-accent hover:border-accent transition-colors duration-300"
              >
                <span className="text-xl">{SEASON_ICONS[season]}</span>
                <span className="capitalize tracking-widest font-mono text-sm">Theme: {season}</span>
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
    </header>
  );
};