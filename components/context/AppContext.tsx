import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppWrapper({ children }) {
  const [isHeaderStats, setIsHeaderStats] = useState<Boolean>(false)

  return (
    <AppContext.Provider value={{isHeaderStats, setIsHeaderStats}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}