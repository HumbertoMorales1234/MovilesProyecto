import { createContext } from "react";
import { AppContext } from "./AppContext";


export const KartContext = createContext()

export const KartContextProvider = ({children}) => {
    const kartValues = {
        
    }

     return(
        <AppContext.Provider value={kartValues}>
            {children}
        </AppContext.Provider>
     )
}