import React, { createContext, useContext, useState, useEffect } from 'react';

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

interface SeasonContextType {
  season: Season;
  setSeason: (season: Season) => void;
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

export const SeasonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [season, setSeason] = useState<Season>('summer');

  useEffect(() => {
    // Auto-detect season based on month
    const month = new Date().getMonth(); // 0-11
    if (month >= 2 && month <= 4) setSeason('spring');
    else if (month >= 5 && month <= 7) setSeason('summer');
    else if (month >= 8 && month <= 10) setSeason('autumn');
    else setSeason('winter');
  }, []);

  useEffect(() => {
    // Apply theme class to body
    const body = document.body;
    body.classList.remove('theme-spring', 'theme-summer', 'theme-autumn', 'theme-winter');
    body.classList.add(`theme-${season}`);
  }, [season]);

  return (
    <SeasonContext.Provider value={{ season, setSeason }}>
      {children}
    </SeasonContext.Provider>
  );
};

export const useSeason = () => {
  const context = useContext(SeasonContext);
  if (!context) throw new Error('useSeason must be used within a SeasonProvider');
  return context;
};
