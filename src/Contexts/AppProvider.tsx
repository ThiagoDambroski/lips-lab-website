import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type AppContextType = {
  lightBox: boolean;
  toggleLightBox: () => void;
};

type AppProviderProps = {
  children: ReactNode;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

function AppProvider({ children }: AppProviderProps) {
  const [lightBox, setLightBox] = useState(false);

  const value = useMemo(
    () => ({
      lightBox,
      toggleLightBox: () => setLightBox((current) => !current),
    }),
    [lightBox]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}

export default AppProvider;
