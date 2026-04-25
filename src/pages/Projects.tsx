import React from 'react';
import { motion } from 'motion/react';

export const Projects: React.FC = () => {
    return (
        <div className="mx-auto max-w-[1300px] px-[5%] py-20">
            <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter leading-none mb-4">
                Projects<span className="text-accent">.</span>
            </h1>
            <p className="font-mono text-accent uppercase tracking-widest text-sm mb-20 italic">
                A showcase of things I've built and experimented with.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[1, 2].map((i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -10 }}
                        className="bg-white border-l-4 border-accent p-10 shadow-xl"
                    >
                        <span className="text-[10px] font-mono tracking-widest opacity-40">PROJECT 0{i}</span>
                        <h2 className="text-2xl font-bold mt-2 mb-4">Coming Soon</h2>
                        <p className="text-mono-black/60 leading-relaxed mb-6">
                            This section is currently under development. I'm migrating my projects into this new minimalistic Monogatari framework.
                        </p>
                        <div className="h-[1px] w-full bg-accent/20" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
