import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import yotsugi from '../../images/yotsugi.webp';
import yotsugiMobile from '../../images/yotsugi-mobile.webp'
import { useSeason } from '@/context/SeasonContext';

export const Home: React.FC = () => {
  const { season } = useSeason(); 

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
      
      {/* Seasonal Accents */}
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
            className="relative w-full aspect-[4/5] md:aspect-[7/3] mb-8 flex items-start justify-center overflow-hidden vignette-mask"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >

            <motion.div 
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }} 
              transition={{ duration: 2.5, ease: "easeOut" }}
              style={{ x: xOffset, y: yOffset }}
              className="w-full h-full flex items-start justify-center overflow-hidden"
            >
              <picture className="w-[110%] h-[110%] max-w-none">
                <source media="(max-width: 1024px)" srcSet={yotsugiMobile} />
                <img 
                  src={yotsugi}
                  alt="Ononoki Yotsugi" 
                  className="h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                />
              </picture>
            </motion.div>
          </div>

            <section className="max-w-3xl space-y-8">
               <h1 className="text-4xl md:text-6xl font-light leading-tight tracking-tighter text-natural-text">
                  <Typewriter text="僕はキメ顔でそう言った。" delay={150} />
               </h1>
               <div className="text-lg md:text-xl leading-relaxed text-text-muted serif-italic space-y-6">
                 <p>
                   "Hi, my name is <span className="text-natural-text not-italic font-semibold border-b border-accent transition-colors">Henry</span>, a year 2 Computer Science and Math student."
                 </p>
                 <p className="opacity-80">
                   "This is less of a portfolio, but more of a dialogue between the observer and the observed. 
                   Explore the <Link to="/archive" className="text-natural-text not-italic border-b border-accent/30 hover:border-accent group transition-all">Archive</Link> to see the chronicles I've gathered."
                 </p>
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

const SkillCategory = ({ title, skills }: { title: string; skills: string[] }) => (
  <div>
    <h3 className="text-xl font-bold font-mono tracking-[0.2em] text-accent uppercase mb-6 flex items-center gap-2">
      <span className="h-[1px] w-8 bg-accent" /> {title}
    </h3>
    <div className="flex flex-wrap gap-6">
      {skills.map((skill) => (
        <span key={skill} className="font-mono text-sm font-semibold text-mono-black/60 hover:text-accent transition-colors cursor-default">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

import { Link } from 'react-router-dom';
