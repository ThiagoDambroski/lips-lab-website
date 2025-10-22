import { createContext, useContext, useState, type ReactNode } from 'react'



type AppContextType = {
    lightBox: boolean;
    toggleLightBox: () => void;
}

type appProviderProps = {
    children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);


function AppProvider({children}:appProviderProps) {

    const [lightBox,setLightBox] = useState<boolean>(false)

    const toggleLightBox = ():void => {
        setLightBox(!lightBox);
    }

  return (
    <AppContext.Provider value={{lightBox,toggleLightBox}}>
        {children}
    </AppContext.Provider>
  )
}


export function useApp(): AppContextType{
    const context = useContext(AppContext)
    if(!context) throw new Error("useApp must be used within an AppProvider")
    return context
}

export default AppProvider