import * as SecureStore from "expo-secure-store"
import { createContext, useEffect, useReducer, useState } from "react"
import { THEME } from "../theme/Colors"
import axios from 'axios'

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


    const handleLogIn = async (username, password, navigation) =>{
        //Agregar el acceso a la BD
        // if(username==='Beto' && password==='Prueba12'){
        //     dispatch({type: CONTEXT_ACTIONS.LOG_IN, user: username})
        // }
        try {
            const response = await axios.post('http://10.0.2.2:8000/apiMovil/LoginView', {
              username: username,
              password: password,
            });

            if (response.status === 200) {
              console.log(response.data.access)
              dispatch({type: CONTEXT_ACTIONS.LOG_IN, user: response.data.access})
            } else {
              console.log('Wrong Credentials');
            }
          } catch (error) {
            console.log('Error '+String(error));
          }
    }

    const handleRegister = async (username, password, navigation) =>{
        try {
            const response = await axios.post('http://10.0.2.2:8000/apiMovil/LoginView', {
              username: username,
              password: password,
            });

            if (response.status === 200) {
              console.log(response.data.access)
              dispatch({type: CONTEXT_ACTIONS.LOG_IN, user: response.data.access})
            } else {
              console.log('Wrong Credentials');
            }
          } catch (error) {
            console.log('Error '+String(error));
          }
    }
    
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
        handleRegister
    }

     return(
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
     )

}