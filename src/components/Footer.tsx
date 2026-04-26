import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="h-24 px-[5%] border-t border-natural-border flex flex-col md:flex-row justify-between items-center bg-natural-footer transition-colors">
      <div className="flex items-center gap-6">
        <span className="text-[10px] uppercase tracking-[0.15em] opacity-50">Reach out:</span>
        <div className="flex items-center gap-8">
          <a
            href="https://github.com/Iota113"
            target="_blank"
            rel="noopener noreferrer"
            className="text-natural-text opacity-40 hover:opacity-100 transition-opacity"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/henry-tse-9027aa147/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-natural-text opacity-40 hover:opacity-100 transition-opacity"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
      
      <div className="flex items-center gap-8 text-right mt-4 md:mt-0">
        <div>
          <div className="text-[10px] uppercase tracking-widest opacity-40 mb-1">v2 project</div>
          <div className="text-xs font-sans opacity-60">4 Pages Planned • 2 Complete</div>
        </div>
        <div className="w-10 h-10 rounded-full border border-natural-border flex items-center justify-center opacity-40">
           <span className="text-[10px]">◎</span>
        </div>
      </div>
    </footer>
  );
};
