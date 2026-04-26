import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// --- MOCK DATA ---
const REGIONS = [
    {
        id: '1',
        name: 'Liyue Harbor',
        tagline: 'The City of Contracts',
        description: 'A bustling port city glowing under the moonlight. The architecture features tiered crimson roofs and warm lanterns that reflect off the calm ocean waters, creating a striking contrast against the dark, starry sky above.',
        mainImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop', // Replace with your image
        details: [
            { title: 'Yujing Terrace', desc: 'Overlooking the harbor at midnight.', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop' }
        ]
    },
    {
        id: '2',
        name: 'Grand Narukami',
        tagline: 'Eternity in Bloom',
        description: 'Perched high atop a mountain, bathed in an endless twilight. The air is thick with the scent of Sakura blossoms, drifting continuously in the cool night breeze under a massive, glowing moon.',
        mainImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop', // Replace with your image
        details: [
            { title: 'Sacred Sakura', desc: 'Petals falling like snow.', img: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?q=80&w=600&auto=format&fit=crop' }
        ]
    },
    {
        id: '3',
        name: 'Belobog',
        tagline: 'The Last Bastion',
        description: 'A fortress of warmth against an eternal, howling blizzard. Bioluminescent auroras dance across the sky, casting an ethereal blue light over the frozen tracks of the Astral Express.',
        mainImage: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1000&auto=format&fit=crop', // Replace with your image
        details: [
            { title: 'Administrative District', desc: 'Snow-capped spires under the aurora.', img: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=600&auto=format&fit=crop' }
        ]
    }
];

export const Travel: React.FC = () => {
    const [activeRegionId, setActiveRegionId] = useState(REGIONS[0].id);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const activeRegion = REGIONS.find(r => r.id === activeRegionId) || REGIONS[0];

    // Generate random stars for the background
    const stars = useMemo(() => {
        return Array.from({ length: 70 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: `${Math.random() * 3 + 1}px`,
            duration: `${Math.random() * 3 + 2}s`,
            baseOpacity: Math.random() * 0.5 + 0.1,
        }));
    }, []);

    return (
        <div className="min-h-screen w-full bg-midnight-gradient text-slate-200 flex flex-col items-center justify-center p-4 md:p-8 font-sans overflow-hidden relative">
            
            {/* Animated Starry Background */}
            <div className="stars-container">
                {stars.map(star => (
                    <div 
                        key={star.id}
                        className="star"
                        style={{
                            left: star.left,
                            top: star.top,
                            width: star.size,
                            height: star.size,
                            '--duration': star.duration,
                            '--base-opacity': star.baseOpacity
                        } as React.CSSProperties}
                    />
                ))}
                {/* Large ambient glowing orbs */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[150px]" />
            </div>

            <div className="relative w-full max-w-7xl flex flex-col gap-6 z-10 mt-16 md:mt-0">
                
                {/* --- MAIN PRESENTATION CARD (Glassmorphism) --- */}
                <div className="relative w-full min-h-[60vh] md:h-[70vh] glass-panel rounded-3xl overflow-hidden flex flex-col-reverse md:flex-row">
                    
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeRegion.id}
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-full h-full flex flex-col-reverse md:flex-row"
                        >
                            {/* Left Side: Information & Typography */}
                            <div className="w-full md:w-5/12 flex flex-col justify-center p-8 md:p-12 z-10 relative">
                                
                                <div className="mb-6 flex items-center gap-3 opacity-80">
                                    <div className="w-8 h-[1px] bg-sky-400"></div>
                                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-sky-400">Memory Log</span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2 tracking-tight glow-text">
                                    {activeRegion.name}
                                </h1>
                                <p className="text-lg font-serif italic text-sky-200 mb-8 opacity-90">
                                    {activeRegion.tagline}
                                </p>

                                {/* Lore Box */}
                                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl mb-8 shadow-inner">
                                    <p className="text-slate-300 leading-relaxed font-sans text-sm md:text-base">
                                        {activeRegion.description}
                                    </p>
                                </div>

                                <div>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="px-8 py-3 bg-sky-500/20 text-sky-100 font-mono uppercase tracking-widest text-sm rounded-full border border-sky-400/50 hover:bg-sky-500/40 hover:border-sky-300 transition-all duration-300 glow-button"
                                    >
                                        Extract Data
                                    </button>
                                </div>
                            </div>

                            {/* Right Side: The Framed Image with Gradient Mask */}
                            <div className="w-full md:w-7/12 h-64 md:h-full relative">
                                <div className="absolute inset-0" />
                                
                                <motion.img 
                                    initial={{ scale: 1.05 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                                    src={activeRegion.mainImage} 
                                    alt={activeRegion.name}
                                    className="w-full h-full object-cover object-center mix-blend-lighten opacity-80"
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* --- BOTTOM THUMBNAIL NAVIGATION --- */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
                    {REGIONS.map((region) => (
                        <button
                            key={region.id}
                            onClick={() => setActiveRegionId(region.id)}
                            className={`relative shrink-0 w-32 h-20 md:w-40 md:h-24 rounded-xl overflow-hidden border transition-all duration-500 ${
                                activeRegionId === region.id 
                                ? 'border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.5)] scale-100 opacity-100' 
                                : 'border-white/10 opacity-40 hover:opacity-80 scale-95 hover:border-white/30'
                            }`}
                        >
                            <img 
                                src={region.mainImage} 
                                alt={`Thumbnail ${region.name}`}
                                className="w-full h-full object-cover"
                            />
                            <div className={`absolute inset-0 bg-[#080d17] transition-opacity duration-500 ${
                                activeRegionId === region.id ? 'opacity-0' : 'opacity-60'
                            }`} />
                        </button>
                    ))}
                </div>
            </div>

            {/* --- DETAILED VIEW MODAL --- */}
            <AnimatePresence>
                {isModalOpen && activeRegion && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-[#04080F]/80 backdrop-blur-xl p-4 md:p-8"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="glass-panel w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden flex flex-col border border-sky-500/30"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-sky-500/20 bg-slate-900/50">
                                <h2 className="text-2xl font-display text-sky-100 glow-text">{activeRegion.name} // ARCHIVE</h2>
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-slate-400 hover:text-sky-300 transition-colors text-2xl"
                                >
                                    ✕
                                </button>
                            </div>
                            
                            <div className="p-6 overflow-y-auto space-y-8 custom-scrollbar">
                                {activeRegion.details.map((detail, idx) => (
                                    <div key={idx} className="space-y-4">
                                        <h3 className="text-xl font-bold text-sky-200">{detail.title}</h3>
                                        <p className="text-slate-300 font-serif leading-relaxed">{detail.desc}</p>
                                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                                            <img 
                                                src={detail.img} 
                                                alt={detail.title} 
                                                className="w-full h-auto"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};