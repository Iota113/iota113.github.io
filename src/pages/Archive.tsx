import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase, ArchiveMedia, BUCKET_URL } from '../services/supabase';

export const Archive: React.FC = () => {
  const [items, setItems] = useState<ArchiveMedia[]>([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('archive_media')
        .select('*')
        .order('year', { ascending: false })
        .order('created_at', { ascending: false });

      if (data) setItems(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const uniqueTypes = ['all', ...new Set(items.map((item) => item.type.toLowerCase()))];
  const filteredItems = items.filter((item) => filter === 'all' || item.type.toLowerCase() === filter);

  // Group by year
  const groupedItems = filteredItems.reduce((acc, item) => {
    const year = item.year === 0 ? 'Legacy' : item.year.toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {} as Record<string, ArchiveMedia[]>);

  const sortedYears = Object.keys(groupedItems).sort((a, b) => {
    if (a === 'Legacy') return 1;
    if (b === 'Legacy') return -1;
    return parseInt(b) - parseInt(a);
  });

  return (
    <div className="min-h-screen bg-natural-bg">
      {/* Hero */}
      <section className="px-[5%] py-24 relative overflow-hidden">
        <div className="mx-auto max-w-[1300px] relative z-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-4 block">Archive log</span>
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-none mb-8">
            Chronicles<span className="text-accent opacity-50">.</span>
          </h1>
          <p className="max-w-xl text-natural-muted text-lg serif-italic leading-relaxed">
            "A collection of media consumed throughout the seasons. Memories of summer spent in stories, and winters lost in music."
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1300px] grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-12 px-[5%] pb-32 items-start">
        {/* Sidebar */}
        <aside className="sticky top-32 flex flex-col items-center gap-12 text-center lg:border-r lg:border-natural-border lg:pr-8">
           <div className="space-y-8">
             <label className="text-[10px] uppercase tracking-[0.3em] opacity-40 [writing-mode:vertical-lr] rotate-180 inline-block">Filter</label>
             <div className="flex flex-col gap-4">
               {uniqueTypes.map((type) => (
                 <button
                   key={type}
                   onClick={() => setFilter(type)}
                   className={`text-[10px] uppercase tracking-[0.1em] transition-all hover:opacity-100 ${
                     filter === type ? 'opacity-100 font-bold border-r-2 border-accent pr-2' : 'opacity-30'
                   }`}
                 >
                   {type}
                 </button>
               ))}
             </div>
           </div>
        </aside>

        {/* Gallery */}
        <main>
          {isLoading ? (
            <div className="flex justify-center py-20 text-accent animate-pulse font-mono uppercase tracking-[0.3em] text-[10px]">
              Retrieving Records...
            </div>
          ) : (
            <div className="space-y-32">
              {sortedYears.map((year) => (
                <section key={year}>
                  <div className="flex items-baseline gap-4 mb-12 border-b border-natural-border pb-4">
                    <h2 className="text-5xl font-light tracking-tighter">{year}</h2>
                    <span className="text-[10px] uppercase tracking-widest opacity-30 serif-italic">Phase: {year}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    <AnimatePresence mode="popLayout">
                      {groupedItems[year].map((item) => (
                        <MediaCard key={item.id} item={item} />
                      ))}
                    </AnimatePresence>
                  </div>
                </section>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const MediaCard: React.FC<{ item: ArchiveMedia }> = ({ item }) => {
  const imageUrl = `${BUCKET_URL}${item.image_filename}`;

  return (
    <motion.article 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#EAE7E0] border border-natural-border p-2 transition-all duration-500 group-hover:shadow-[0_10px_30px_-10px_rgba(45,45,45,0.2)]">
         <div className="relative h-full w-full overflow-hidden">
            <img 
              src={imageUrl} 
              alt={item.title} 
              className="h-full w-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-natural-text/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center p-6 text-center backdrop-blur-[2px]">
               <div className="transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0 text-natural-footer scale-90 group-hover:scale-100">
                  <h4 className="text-lg font-serif italic mb-2">{item.title}</h4>
                  <span className="text-[8px] uppercase tracking-[0.2em] opacity-80">{item.type}</span>
               </div>
            </div>
         </div>
      </div>
      <div className="mt-4 flex justify-between items-baseline px-1">
        <span className="text-[9px] uppercase tracking-[0.2em] opacity-40">{item.type}</span>
        <span className="text-[8px] serif-italic opacity-30">{item.displayYear}</span>
      </div>
    </motion.article>
  );
};
