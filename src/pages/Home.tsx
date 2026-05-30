import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import yotsugi from '../../images/yotsugi.webp';
import yotsugiMobile from '../../images/yotsugi-mobile.webp';
import { useSeason } from '@/context/SeasonContext';
import { supabase } from '../services/supabase';

interface Skill {
  id: string;
  name: string;
  icon_url: string; 
}

export const Home: React.FC = () => {
  const { season } = useSeason(); 
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        if (data) setSkills(data);
      } catch (err) {
        console.error('Error loading skills layout context:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 30, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const xOffset = useTransform(smoothX, [0, 1], [20, -20]);
  const yOffset = useTransform(smoothY, [0, 1], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const renderFoliage = () => {
    const styles = {
      spring: "rounded-tl-full rounded-br-full bg-accent opacity-60",
      summer: "rounded-full bg-secondary opacity-70",
      autumn: "rounded-sm rotate-45 bg-accent opacity-80", 
      winter: "rounded-none rotate-0 bg-secondary opacity-40"      
    };

    return (
      <div className="absolute top-10 right-10 flex gap-3 z-0">
        <div className={`w-4 h-4 transition-all duration-700 ${styles[season]} rotate-45`} />
        <div className={`w-3 h-3 transition-all duration-700 ${styles[season]} -rotate-12 delay-75`} />
        <div className={`w-5 h-5 transition-all duration-700 ${styles[season]} rotate-12 delay-150`} />
      </div>
    );
  };

  return (
    <div className="mx-auto w-full min-h-screen flex flex-col relative overflow-hidden bg-natural-bg transition-colors duration-700">
      <div className="bg-blob top-10 right-10 w-96 h-96 bg-accent opacity-10" />
      <div className="bg-blob bottom-20 left-10 w-80 h-80 bg-secondary opacity-10" />
      
      {renderFoliage()}

      <main className="flex-1 flex px-[5%] py-2 relative z-10">
        {/* Side Info */}
        <aside className="hidden md:flex w-12 flex-col justify-center items-center gap-8 border-r border-natural-border pr-8">
          <span className="rotate-180 [writing-mode:vertical-lr] text-[10px] uppercase tracking-[0.3em] opacity-40 text-natural-text">Current Page</span>
          <span className="text-xl font-light text-natural-text">01</span>
          <div className="h-24 w-px bg-natural-border" />
          <span className="text-xl font-light opacity-30 text-natural-text">04</span>
        </aside>

        {/* Central Content */}
        <div className="flex-1 flex-col justify-center">
          <div 
            className="relative w-full aspect-[4/5] md:aspect-[14/4] mb-8 items-center justify-center overflow-hidden"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
              WebkitMaskComposite: 'source-in',
              maskComposite: 'intersect'
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div 
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }} 
              transition={{ duration: 2.5, ease: "easeOut" }}
              style={{ x: xOffset, y: yOffset }}
              className="w-full h-full flex items-center justify-center overflow-hidden"
            >
              <picture className="w-[110%] h-[110%] max-w-none flex items-center justify-center vignette-mask">
                <source media="(max-width: 1024px)" srcSet={yotsugiMobile} />
                <img 
                  src={yotsugi}
                  alt="Ononoki Yotsugi" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                />
              </picture>
            </motion.div>
          </div>

          <section className="ml-6 max-w-3xl space-y-12">
            <h1 className="text-4xl md:text-6xl font-light leading-tight tracking-tighter text-natural-text">
              <Typewriter text="僕はキメ顔でそう言った。" delay={150} />
            </h1>
            <div className="text-lg md:text-l leading-relaxed text-text-muted space-y-4">
              <p>
                Hi, my name is <span className="text-natural-text not-italic font-semibold border-b border-accent transition-colors">Henry</span>, a year 2 Computer Science and Math student. 
                My academic interest lies in pure math and math-adjacent CS fields like algorithms and AI.
              </p>

              <p className='opacity-70 italic'>
                Though my investment in pure math is facing some kind of a decline as the dread of the pointlessness
                of me studying things like composition series and solvable groups is creeping up on me after taking my introductory abstract algebra course.
              </p>

              <p>
                This is both a portfolio and a journal. I record my notable projects and some fun stuff like the media I have consumed and places I have travelled to. I 
                hope you have fun exploring my attempt at being creative.
              </p>
            </div>

            {/* --- Workspace Toolkit --- */}
            <div className="pt-6">
              <h3 className="text-s font-mono tracking-[0.2em] text-accent uppercase mb-6 flex items-center gap-2">
                <span className="h-[2px] w-12 bg-accent" /> skills
              </h3>

              {isLoading ? (
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 animate-pulse">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="aspect-square rounded-xl" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 w-full items-center justify-start">
                  {skills.map((skill) => {
                    const isExpanded = hoveredSkill === skill.id;
                    return (
                      <motion.div
                        key={skill.id}
                        onMouseEnter={() => setHoveredSkill(skill.id)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        animate={{
                          scale: isExpanded ? 1.1 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                        className={`relative flex flex-col items-center justify-center p-4 w-24 h-24 rounded-xl border border-natural-border bg-natural-bg cursor-default transition-shadow duration-300
                          ${isExpanded ? 'shadow-md md:border-accent/40 z-20' : 'z-10'}
                        `}
                      >
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div 
                              layoutId="activeGlow"
                              className="absolute inset-0 bg-gradient-to-b from-accent/5 to-secondary/5 -z-10 rounded-xl"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </AnimatePresence>

                        {/* Skill Icon Container */}
                        <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center p-1.5 rounded-xl transition-all duration-300`}>
                          <img 
                            src={skill.icon_url} 
                            alt={`${skill.name} icon`}
                            className="w-full h-full object-contain dark:invert-[0.1] opacity-80"
                          />
                        </div>

                        {/* Skill Name underneath Icon on Hover */}
                        <div className="h-4 mt-1.5 flex items-center justify-center w-full text-center overflow-visible">
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.span 
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 2 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                className="font-mono text-[10px] font-semibold text-natural-text block truncate"
                              >
                                {skill.name}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
            
          </section>
        </div>
      </main>

      {/* Decorative Grid Line */}
      <div className="absolute inset-0 px-[5%] flex justify-between pointer-events-none opacity-5">
        <div className="w-px h-full bg-natural-text" />
        <div className="w-px h-full bg-natural-text" />
      </div>
    </div>
  );
};

const Typewriter = ({ text, delay }: { text: string; delay: number }) => {
  const [displayedText, setDisplayedText] = React.useState('');

  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);

  return <span>{displayedText}</span>;
};