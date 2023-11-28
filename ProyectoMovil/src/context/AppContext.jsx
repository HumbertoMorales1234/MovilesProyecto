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
                username: action.user,
                loggedIn: true,
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
                username: action.user
            }            
    }
}

export const AppContextProvider = ({children}) =>{

    const [state, dispatch] = useReducer(reducer, initialState)
    const [themeMode, setTheme] = useState(THEME.LIGHT)

 
    useEffect(() => {
        const checkData = async() =>{
            try {
                const saving = await SecureStore.getItemAsync('userData')
                if(saving){
                    const userData = (JSON.parse(saving))
                    dispatch({type: CONTEXT_ACTIONS.RECOVER_USER, user: userData.username})
                }

                const currentTheme = await SecureStore.getItemAsync('themeMode')
                 if(currentTheme){
                    handleThemeChange(currentTheme)
                 }

            } catch (error) {
                console.log(error)
            }
        }
        checkData()
    }, [])


    const handleLogIn = (username, password) => {
        // Agregar el acceso a la BD
        const isValidPassword = /^(?=(.*[A-Z]){2})(?=(.*[a-z]){2})(?=(.*\d){3})(?=(.*[\W_]){2})[A-Za-z\d\W_]{10,}$/.test(
          password
        );
    
        if (username === 'Beto' && isValidPassword) {
          dispatch({ type: CONTEXT_ACTIONS.LOG_IN, user: username });
          return true;
        }
    
        return false;
      };
    
    const saveUser = async () =>{
        await SecureStore.setItemAsync('userData', JSON.stringify(state))
    }

    const handleLogOut = async () =>{
        dispatch({type: CONTEXT_ACTIONS.LOG_OUT})
        await SecureStore.deleteItemAsync('userData')
    }

    const handleThemeChange = async (themeRequest) =>{
        if(themeRequest==="LIGHT"){
            setTheme(THEME.LIGHT)
        }else{
            setTheme(THEME.DARK)
        }
        await SecureStore.setItemAsync('themeMode', themeRequest)
    }

     const values = {
        state,
        saveUser,
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