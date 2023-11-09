import * as SecureStore from "expo-secure-store"
import { createContext, useEffect, useReducer, useState } from "react"
import { THEME } from "../theme/Colors"

export const AppContext =  createContext()

const initialState = {
    username: '',
    loggedIn: false,
}

const CONTEXT_ACTIONS = {
    LOG_IN: 'LOG_IN',
    LOG_OUT: 'LOG_OUT',
    RECOVER_USER: 'RECOVER_USER',
}

function reducer(state, action){
    switch(action.type){
//---------------------------------------------------------------
//*
        case CONTEXT_ACTIONS.LOG_IN:
            return{
                ...state,
                loggedIn: true,
                username: action.username,
            }
//---------------------------------------------------------------
//*
        case CONTEXT_ACTIONS.LOG_OUT:
            return{
                ...state, 
                loggedIn: false,
                username: '',
            }
//----------------------------------------------------------------
//*
        case CONTEXT_ACTIONS.RECOVER_USER:
            return{
                ...state,
                loggedIn: true,
                username: action.data.username
            }            
    }
}

export const AppContextProvider = ({children}) =>{

    const [state, dispatch] = useReducer(reducer, initialState)
    const [themeMode, setTheme] = useState(THEME.DARK)

 
    useEffect(() => {
        const checkData = async() =>{
            try {
                // const currentTheme = await SecureStore.getItemAsync('themeMode')
                // if(currentTheme){
                //     handleThemeChange(currentTheme)
                // }
                //handleThemeChange('LIGHT')

                const currentUser = await SecureStore.getItemAsync('userData')
                if(currentUser){
                    dispatch({type: CONTEXT_ACTIONS.RECOVER_USER, data: currentUser})
                }
            } catch (error) {
                console.log(error)
            }
        }
        checkData()
    }, [])

    const handleLogIn = async (username, password) =>{
        //Agregar el acceso a la BD
        dispatch({type: CONTEXT_ACTIONS.LOG_IN, username: username})
        await SecureStore.setItemAsync('userData', state)
    }

    const handleLogOut = async () =>{
        dispatch({type: CONTEXT_ACTIONS.LOG_OUT})
        await SecureStore.setItemAsync('userData', state)
    }

    const handleThemeChange = async ({themeRequest}) =>{
        if(themeRequest==="LIGHT"){
            setTheme( THEME.LIGHT)
        }else{
            setTheme( THEME.DARK)
        }
        await SecureStore.setItemAsync('themeMode', themeRequest)
    }

     const values = {
        state,
        themeMode,
        handleLogIn,
        handleLogOut,
        handleThemeChange,
    }

     return(
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
     )

}