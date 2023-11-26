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
    const [kartProducts, setKartProducts] = useState([])

 
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

    const handleLogIn = (username, password) =>{
        //Agregar el acceso a la BD
        if(username==='Beto' && password==='Prueba12'){
            dispatch({type: CONTEXT_ACTIONS.LOG_IN, user: username})
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

    const handleAddToKart = (dish, cantidad) =>{
        const alreadyAdded=kartProducts.some( product=> product.dish.dishName == dish.dishName)
        if(alreadyAdded){
            const mappedKart = kartProducts.map(product =>{
                if (product.dish.dishName === dish.dishName){
                return {
                    ...product,
                    cantidad: product.cantidad+cantidad,
                    }
                }
            return product
          })
          setKartProducts(mappedKart)
          console.log(kartProducts)
        }else{
        setKartProducts(prevProducts => [...prevProducts, { dish: dish, cantidad: cantidad }]);
        console.log(kartProducts)
      }
    }

    const handleDeleteFromKart = (dishName) =>{
        const filteredArray = kartProducts.filter(product=> product.dish.dishName !== dishName)
        setKartProducts(filteredArray)
    }

    const handleReduceCuantity = (dishName) =>{
        const mappedKart = kartProducts.map(product =>{
            if (product.dish.dishName === dishName && product.cantidad>1){
            return {
                ...product,
                cantidad: product.cantidad-1,
                }
            }
        return product
      })
      setKartProducts(mappedKart)
    }

    const handleIncreaseCuantity = (dishName) =>{
        const mappedKart = kartProducts.map(product =>{
            if (product.dish.dishName === dishName){
            return {
                ...product,
                cantidad: product.cantidad+1,
                }
            }
        return product
      })
      setKartProducts(mappedKart)
    }

     const values = {
        state,
        saveUser,
        themeMode,
        handleLogIn,
        handleLogOut,
        handleThemeChange,
        kartProducts, 
        handleAddToKart, 
        handleDeleteFromKart,
        handleReduceCuantity,
        handleIncreaseCuantity,
    }

     return(
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
     )

}