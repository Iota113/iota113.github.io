import React, { createContext, useContext, useState, useEffect } from 'react';

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

interface SeasonContextType {
  season: Season;
  setSeason: (season: Season) => void;
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

export const SeasonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initialize from localStorage or fallback to 'summer'
  const [season, setSeasonState] = useState<Season>(() => {
    const savedSeason = localStorage.getItem('user-season') as Season;
    return savedSeason || 'summer'; 
  });

  const [isWiping, setIsWiping] = useState(false);

  // 2. Auto-detect ONLY if no preference is stored
  useEffect(() => {
    const savedSeason = localStorage.getItem('user-season');
    if (!savedSeason) {
      const month = new Date().getMonth(); 
      let detectedSeason: Season;
      
      if (month >= 2 && month <= 4) detectedSeason = 'spring';
      else if (month >= 5 && month <= 7) detectedSeason = 'summer';
      else if (month >= 8 && month <= 10) detectedSeason = 'autumn';
      else detectedSeason = 'winter';

      setSeasonState(detectedSeason);
    }
  }, []);

  // 3. Save to localStorage whenever the season changes
  useEffect(() => {
    localStorage.setItem('user-season', season);
    
    // Apply theme class to body[cite: 1]
    const body = document.body;
    body.classList.remove('theme-spring', 'theme-summer', 'theme-autumn', 'theme-winter');
    body.classList.add(`theme-${season}`);
  }, [season]);

  const setSeason = (newSeason: Season) => {
    if (newSeason === season || isWiping) return;
    
    setIsWiping(true);
    
    setTimeout(() => {
      setSeasonState(newSeason);
    }, 550);

    setTimeout(() => {
      setIsWiping(false);
    }, 1200);
  };

  return (
    <SeasonContext.Provider value={{ season, setSeason }}>
      {children}
      {/* Wipe Overlay Logic[cite: 1] */}
      {isWiping && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col overflow-hidden">
          {[0, 150, 50, 200, 100].map((delay, i) => (
            <div key={i} className="wipe-bar" style={{ animationDelay: `${delay}ms` }}></div>
          ))}
        </div>
      )}
    </SeasonContext.Provider>
  );
};

export const useSeason = () => {
  const context = useContext(SeasonContext);
  if (!context) throw new Error('useSeason must be used within a SeasonProvider');
  return context;
};