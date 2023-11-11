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
                loggedIn: action.islogged,
                username: action.currentUser
            }            
    }
}

export const AppContextProvider = ({children}) =>{

    const [state, dispatch] = useReducer(reducer, initialState)
    const [themeMode, setTheme] = useState(THEME.LIGHT)

 
    useEffect(() => {
        const checkData = async() =>{
            try {
                // const currentTheme = await SecureStore.getItemAsync('themeMode')
                // if(currentTheme){
                //     handleThemeChange(currentTheme)
                // }
                //handleThemeChange('LIGHT')

                const currentUser = await SecureStore.getItemAsync('username')
                const isLogged = await SecureStore.getItemAsync('username')
                if(currentUser){
                    dispatch({type: CONTEXT_ACTIONS.RECOVER_USER, currentUser: currentUser, isLogged: isLogged})
                }
            } catch (error) {
                console.log(error)
            }
        }
        checkData()
    }, [])

    const userChange = async () =>{
        try {
            await SecureStore.setItemAsync('username', JSON.stringify(state.username))
            await SecureStore.setItemAsync('loggedIn', JSON.stringify(state.loggedIn))
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogIn = async (username, password) =>{
        //Agregar el acceso a la BD
        if(username==='Pruebacio' && password==='Prueba_12'){
            dispatch({type: CONTEXT_ACTIONS.LOG_IN, username: username})
            await userChange()
        }
    }

    const handleLogOut = async () =>{
        dispatch({type: CONTEXT_ACTIONS.LOG_OUT})
        await SecureStore.setItemAsync('userData', state)
        await userChange()
    }

    const handleThemeChange = async (themeRequest) =>{
        if(themeRequest==="LIGHT"){
            setTheme(THEME.LIGHT)
        }else{
            setTheme(THEME.DARK)
        }
        //await SecureStore.setItemAsync('themeMode', themeRequest)
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