import React from 'react';
import { motion } from 'motion/react';

export const Home: React.FC = () => {
  return (
    <div className="mx-auto w-full min-h-screen flex flex-col relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="bg-blob top-10 right-10 w-96 h-96 bg-autumn-terra opacity-10" />
      <div className="bg-blob bottom-20 left-10 w-80 h-80 bg-autumn-sage opacity-10" />
      
      {/* Foliage Accents */}
      <div className="absolute top-10 right-10 flex gap-2 z-0 opacity-40">
        <div className="w-4 h-4 bg-autumn-terra rounded-tl-full rounded-br-full rotate-45" />
        <div className="w-4 h-4 bg-autumn-sage rounded-tl-full rounded-br-full rotate-12" />
        <div className="w-4 h-4 bg-autumn-sand rounded-tl-full rounded-br-full -rotate-12" />
      </div>

      <main className="flex-1 flex px-[5%] py-12 relative z-10">
        {/* Side Info */}
        <aside className="hidden md:flex w-12 flex-col justify-center items-center gap-8 border-r border-natural-border pr-8">
          <span className="rotate-180 [writing-mode:vertical-lr] text-[10px] uppercase tracking-[0.3em] opacity-40">Current Phase</span>
          <span className="text-xl font-light">01</span>
          <div className="h-24 w-px bg-natural-text/20" />
          <span className="text-xl font-light opacity-30">04</span>
        </aside>

        {/* Central Content */}
        <div className="flex-1 px-4 md:px-12 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full aspect-[21/9] bg-[#EAE7E0] border border-natural-border mb-12 flex items-center justify-center overflow-hidden"
            >
               <motion.div 
                 initial={{ scale: 1.1 }}
                 animate={{ scale: 1 }}
                 transition={{ duration: 2 }}
                 className="w-full h-full opacity-80"
               >
                 <img 
                    src="images/yotsugi.webp" 
                    alt="Yotsugi Ononoki" 
                    className="w-full h-full object-contain"
                  />
               </motion.div>
               <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm px-4 py-2 text-[10px] uppercase tracking-[0.2em] border border-natural-border">
                 Scene: The Stillness
               </div>
            </motion.div>

            <section className="max-w-3xl space-y-8">
               <h1 className="text-4xl md:text-6xl font-light leading-tight tracking-tighter">
                  <Typewriter text="僕はキメ顔でそう言った。" delay={150} />
               </h1>
               <div className="text-lg md:text-xl leading-relaxed text-natural-muted serif-italic space-y-6">
                 <p>
                   "Hi, my name is <span className="text-natural-text not-italic font-semibold border-b border-accent">Henry</span>. I am a year 2 Computer Science and Math student at the National University of Singapore. Everything changes when the wind turns cold, and I find myself dancing in the logic of math and algorithms."
                 </p>
                 <p className="opacity-80">
                   "This is less of a portfolio, but more of a dialogue between the observer and the observed. Explore the <Link to="/archive" className="text-natural-text not-italic border-b border-accent/30 hover:border-accent group">Archive</Link> to see the chronicles I've gathered."
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
