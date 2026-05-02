import React from 'react';
import { motion } from 'motion/react';
import { useSeason } from '../context/SeasonContext';

export const Projects: React.FC = () => {
    const { season } = useSeason();

    const seasonalQuotes = {
        spring: "A showcase of things blooming and growing.",
        summer: "A showcase of things built under the blazing sun.",
        autumn: "A showcase of things harvested and refined.",
        winter: "A showcase of things forged in the quiet cold."
    };

    return (
        <div className="mx-auto max-w-[1300px] px-[5%] py-20 transition-colors duration-700">
            <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter leading-none mb-4 text-natural-text">
                Projects<span className="text-accent">.</span>
            </h1>
            <p className="font-mono text-accent uppercase tracking-widest text-sm mb-20 italic transition-colors">
                {seasonalQuotes[season]}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[1, 2].map((i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -10 }}
                        style={{ borderRadius: 'var(--radius-ui)' }}
                        className="bg-surface-bg border-l-4 border-accent p-10 shadow-ui transition-all duration-700"
                    >
                        <span className="text-[10px] text-text-muted font-mono tracking-widest uppercase">Project 0{i}</span>
                        <h2 className="text-2xl font-bold mt-2 mb-4 text-natural-text">Coming Soon</h2>
                        <p className="text-text-muted leading-relaxed mb-6">
                            This section is currently under development. I'm migrating my projects into this new minimalistic Monogatari framework.
                        </p>
                        <div className="h-[1px] w-full bg-natural-border" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};