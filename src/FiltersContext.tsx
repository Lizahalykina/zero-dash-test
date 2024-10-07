import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FiltersContextProps {
  filterType: 'Run' | 'Experiment' | 'Month';
  dateRange: { from: Date | null; to: Date | null };
  selectedExperiment: string | 'all';
  setFilterType: (filterType: 'Run' | 'Experiment' | 'Month') => void;
  setDateRange: (range: { from: Date | null; to: Date | null }) => void;
  setSelectedExperiment: (experiment: string | 'all') => void;
}

const FiltersContext = createContext<FiltersContextProps | undefined>(undefined);

export const FiltersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filterType, setFilterType] = useState<'Run' | 'Experiment' | 'Month'>('Run');
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });
  const [selectedExperiment, setSelectedExperiment] = useState<string | 'all'>('all');

  return (
    <FiltersContext.Provider
      value={{
        filterType,
        dateRange,
        selectedExperiment,
        setFilterType,
        setDateRange,
        setSelectedExperiment
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};
