import { createContext } from "react";


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