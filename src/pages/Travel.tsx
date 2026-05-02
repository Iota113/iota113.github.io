import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase, TravelRegion, TRAVEL_URL } from '../services/supabase';
import { useSeason } from '../context/SeasonContext';

export const Travel: React.FC = () => {
    const { season } = useSeason();
    const [regions, setRegions] = useState<TravelRegion[]>([]);
    const [activeRegionId, setActiveRegionId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const { data, error } = await supabase
                    .from('travel_regions')
                    .select('*')
                    .order('sort_order', { ascending: true });

                if (error) throw error;

                if (data && data.length > 0) {
                    setRegions(data);
                    setActiveRegionId(data[0].id);
                }
            } catch (err) {
                console.error("Error fetching regions:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRegions();
    }, []);

    const activeRegion = useMemo(() => {
        return regions.find(r => r.id === activeRegionId) || null;
    }, [regions, activeRegionId]);

    const particles = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: season === 'spring' || season === 'autumn' ? `${Math.random() * 6 + 4}px` : `${Math.random() * 3 + 1}px`,
            duration: `${Math.random() * 4 + 3}s`,
            baseOpacity: Math.random() * 0.5 + 0.2,
            delay: `${Math.random() * 5}s`,
        }));
    }, [season]);

    const getParticleStyle = () => {
        switch(season) {
            case 'spring': return { bg: 'bg-accent', rounded: 'rounded-[40%_60%_60%_40%]' }; 
            case 'summer': return { bg: 'bg-secondary', rounded: 'rounded-full' }; 
            case 'autumn': return { bg: 'bg-accent', rounded: 'rounded-sm rotate-45' }; 
            case 'winter': return { bg: 'bg-white', rounded: 'rounded-full' };
        }
    };

    if (loading) return <div className="min-h-screen bg-natural-bg flex items-center justify-center text-accent font-mono animate-pulse">Retrieving travel data...</div>;
    if (!activeRegion) return null;

    const pStyle = getParticleStyle();

    return (
        <div className="min-h-screen w-full bg-natural-bg text-natural-text flex flex-col items-center justify-center p-4 md:p-8 font-sans overflow-hidden relative transition-colors duration-700">
            
            {/* Seasonal Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-50">
                {particles.map(p => (
                    <div 
                        key={p.id}
                        className={`absolute ${pStyle.bg} ${pStyle.rounded}`}
                        style={{
                            left: p.left,
                            top: p.top,
                            width: p.size,
                            height: p.size,
                            opacity: p.baseOpacity,
                            animation: `${season === 'winter' ? 'twinkle' : 'float'} ${p.duration} infinite ease-in-out alternate`,
                            animationDelay: p.delay
                        } as React.CSSProperties}
                    />
                ))}
            </div>

            <div className="relative w-full max-w-7xl flex flex-col gap-6 z-10 mt-16 md:mt-0">
                <div className="relative w-full min-h-[60vh] md:h-[70vh] bg-surface-bg border border-natural-border shadow-ui rounded-[var(--radius-ui)] overflow-hidden flex flex-col-reverse md:flex-row transition-all duration-700">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeRegion.id}
                            initial={{ opacity: 0, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full flex flex-col-reverse md:flex-row"
                        >
                            <div className="w-full md:w-5/12 flex flex-col justify-center p-8 md:p-12 z-10 relative">
                                <div className="mb-6 flex items-center gap-3 opacity-80">
                                    <div className="w-8 h-[1px] bg-accent"></div>
                                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Memory Log</span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-display font-bold text-natural-text mb-2 tracking-tight">
                                    {activeRegion.name}
                                </h1>
                                <p className="text-lg font-serif italic text-text-muted mb-8">
                                    {activeRegion.tagline}
                                </p>

                                <div className="bg-natural-bg border border-natural-border p-6 rounded-[calc(var(--radius-ui)-4px)] mb-8 shadow-inner">
                                    <p className="text-natural-text leading-relaxed font-sans text-sm md:text-base opacity-90">
                                        {activeRegion.description}
                                    </p>
                                </div>

                                <div>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="px-8 py-3 bg-transparent text-accent font-mono uppercase tracking-widest text-sm rounded-full border border-accent transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.4)] hover:bg-accent/10 active:scale-95"
                                    >
                                        Extract Data
                                    </button>
                                </div>
                            </div>

                            <div className="w-full md:w-7/12 h-64 md:h-full relative overflow-hidden">
                                <motion.img 
                                    initial={{ scale: 1.05 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                                    src={`${TRAVEL_URL}/${activeRegion.cover_image_path}`}
                                    alt={activeRegion.name}
                                    className={`w-full h-full object-cover object-center ${season === 'winter' ? 'grayscale-[0.3]' : 'saturate-110'}`}
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* --- BOTTOM THUMBNAIL NAVIGATION --- */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
                    {regions.map((region) => (
                        <button
                            key={region.id}
                            onClick={() => setActiveRegionId(region.id)}
                            className={`relative shrink-0 w-32 h-20 md:w-40 md:h-24 rounded-xl overflow-hidden border transition-all duration-500 ${
                                activeRegionId === region.id 
                                ? 'border-accent shadow-ui scale-100 opacity-100' 
                                : 'border-natural-border opacity-60 hover:opacity-100 scale-95'
                            }`}
                        >
                            <img 
                                src={`${TRAVEL_URL}/${region.thumbnail_path}`} 
                                alt={region.name}
                                className="w-full h-full object-cover"
                            />
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
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-natural-text/40 backdrop-blur-xl p-4 md:p-8"
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-surface-bg w-full max-w-4xl max-h-[85vh] rounded-[var(--radius-ui)] overflow-hidden flex flex-col border border-natural-border shadow-ui"
                        >
                            <div className="sticky top-0 z-20 flex justify-between items-center p-6 border-b border-natural-border bg-surface-bg/80 backdrop-blur-md">
                                <h2 className="text-2xl font-display text-natural-text">{activeRegion.name}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-accent text-2xl transition-colors">✕</button>
                            </div>
                            
                            <div className="p-8 space-y-8 overflow-y-auto">
                                {activeRegion.region_details?.map((block, idx) => (
                                    <div key={idx}>
                                        {block.type === 'text' ? (
                                            <p className="text-natural-text leading-relaxed text-lg opacity-90">{block.content}</p>
                                        ) : (
                                            <figure className="space-y-3 flex flex-col items-center">
                                                <img 
                                                    src={block.url} 
                                                    alt={block.alt_text} 
                                                    className="w-full md:w-3/4 rounded-[calc(var(--radius-ui)-8px)] border border-natural-border shadow-lg" 
                                                />
                                                <figcaption className="text-center text-sm font-mono text-accent uppercase tracking-widest">{block.caption}</figcaption>
                                            </figure>
                                        )}
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