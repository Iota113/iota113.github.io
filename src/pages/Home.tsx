import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import yotsugi from '../../images/yotsugi.webp';

export const Home: React.FC = () => {
  // 1. Setup Motion Values for mouse tracking (default to center: 0.5)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // 2. Add a spring physics configuration to make the movement fluid and buttery
  const springConfig = { damping: 30, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3. Map the normalized mouse position (0 to 1) to a pixel offset (-20px to 20px)
  // We invert the output (20 to -20) so the image moves *away* from the mouse
  const xOffset = useTransform(smoothX, [0, 1], [20, -20]);
  const yOffset = useTransform(smoothY, [0, 1], [20, -20]);

  // 4. Update coordinates on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  // 5. Snap back to center when the mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

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
            <div 
              className="relative w-full aspect-[21/9] mb-12 flex items-center justify-center overflow-hidden vignette-mask"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
               {/* The motion.div applies the pan effect underneath the mask */}
               <motion.div 
                 initial={{ scale: 1.15, opacity: 0 }}
                 // We keep the scale slightly above 1 so panning doesn't reveal the hard edges
                 animate={{ scale: 1.05, opacity: 1 }} 
                 transition={{ duration: 2.5, ease: "easeOut" }}
                 style={{ x: xOffset, y: yOffset }}
                 className="w-full h-full flex items-center justify-center"
               >
                 <img 
                    src={yotsugi}
                    alt="Ononoki Yotsugi" 
                    // Made the image slightly larger than the container so it has room to pan
                    className="w-[110%] h-[110%] max-w-none object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                  />
               </motion.div>

            </div>

            <section className="max-w-3xl space-y-8">
               <h1 className="text-4xl md:text-6xl font-light leading-tight tracking-tighter">
                  <Typewriter text="僕はキメ顔でそう言った。" delay={150} />
               </h1>
               <div className="text-lg md:text-xl leading-relaxed text-natural-muted serif-italic space-y-6">
                 <p>
                   "Hi, my name is <span className="text-natural-text not-italic font-semibold border-b border-accent">Henry</span>. I am a year 2 Computer Science and Math student at the National University of Singapore. 
                   My academic interests lie in pure math and CS areas like algorithms and AI."
                 </p>
                 <p className="opacity-80">
                   "This is less of a portfolio, but more of a dialogue between the observer and the observed. 
                   Explore the <Link to="/archive" className="text-natural-text not-italic border-b border-accent/30 hover:border-accent group">Archive</Link> to see the chronicles I've gathered."
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
