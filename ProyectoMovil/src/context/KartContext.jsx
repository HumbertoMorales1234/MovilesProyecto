import { createContext } from "react";
import { AppContext } from "./AppContext";


export const KartContext = createContext()

export const KartContextProvider = ({children}) => {
    const values = {
        
    }

     return(
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
     )
}