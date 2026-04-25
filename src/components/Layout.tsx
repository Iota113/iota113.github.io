import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { motion } from 'motion/react';
import { useSeason } from '../context/SeasonContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-natural-bg">
      <Header />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};
