import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const NAV_LINKS = [
  { path: '/', label: 'HOME', id: '01' },
  { path: '/archive', label: 'ARCHIVE', id: '02' },
  { path: '/projects', label: 'PROJECTS', id: '03' },
  { path: '/travel', label: 'TRAVEL', id: '04' },
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-natural-bg/90 px-[5%] py-8 backdrop-blur-sm border-b border-natural-border">
      <Link to="/" className="text-xl font-display font-light tracking-widest text-natural-text uppercase">
        物語 <span className="text-[10px] tracking-normal ml-2 opacity-50 serif-italic lowercase">Monogatari</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:block">
        <ul className="flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`group relative text-[0.75rem] uppercase tracking-[0.2em] transition-opacity duration-300 ${
                  location.pathname === link.path ? 'opacity-100 border-b border-natural-text' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden text-mono-black p-1 focus:outline-none"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 left-0 z-[60] flex h-screen w-[80%] flex-col items-center justify-center bg-mono-white shadow-2xl lg:hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6"
            >
              <X size={32} />
            </button>
            <ul className="flex flex-col items-center gap-10 text-center">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-display font-bold tracking-tighter ${
                      location.pathname === link.path ? 'text-accent' : 'text-mono-black'
                    }`}
                  >
                    {link.id}. {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
