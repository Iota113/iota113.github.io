import React from 'react';
import { motion } from 'motion/react';

export const Travel: React.FC = () => {
    return (
        <div className="mx-auto max-w-[1300px] px-[5%] py-20">
            <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter leading-none mb-4">
                Travel<span className="text-accent">.</span>
            </h1>
            <p className="font-mono text-accent uppercase tracking-widest text-sm mb-20 italic">
                Capturing moments from around the world.
            </p>
            
            <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-accent/20 rounded-xl">
                 <motion.span 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="text-6xl mb-6 opacity-20"
                >
                    ◎
                </motion.span>
                <p className="font-mono text-accent/40 uppercase tracking-widest text-xs">
                    Gallery Loading from Memories...
                </p>
            </div>
        </div>
    );
};
