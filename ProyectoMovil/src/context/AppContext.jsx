import * as SecureStore from "expo-secure-store"
import { createContext, useEffect, useReducer, useState } from "react"
import { THEME } from "../theme/Colors"
import axios from 'axios'

import { Xmas } from "../../assets"

export const AppContext =  createContext()

const defaultPic= 'https://hips.hearstapps.com/es.h-cdn.co/fotoes/images/noticias-cine/blade-runner-2049-trailer-nuevo/135879347-1-esl-ES/Nuevo-trailer-de-Blade-Runner-2049-la-llave-y-la-cerradura.png'

const initialState = {
    username: '',
    userpic: '', 
    loggedIn: false,
    userCards: [],
    userLocation: '',
}

const CONTEXT_ACTIONS = {
    LOG_IN: 'LOG_IN',
    LOG_OUT: 'LOG_OUT',
    RECOVER_USER: 'RECOVER_USER',
    UPDATE_USER: 'UPDATE_USER',
    ADD_CARD: 'ADD_CARD',
    DELETE_CARD: 'DELETE_CARD',
    EDIT_CARD: 'EDIT_CARD',
    UPDATE_LOCATION: 'UPDATE_LOCATION',
}

function reducer(state, action){
    switch(action.type){
//---------------------------------------------------------------
//*
        case CONTEXT_ACTIONS.LOG_IN:
            var uri
            if(action.user){
                uri = action.user
            }
            else{
                uri = defaultPic
            }
            return{
                ...state,
                username: uri,
                loggedIn: true,
            }
//---------------------------------------------------------------
//*
        case CONTEXT_ACTIONS.LOG_OUT:
            return{
                ...state, 
                loggedIn: false,
                userpic: '',
                username: '',
            }
//----------------------------------------------------------------
//*
        case CONTEXT_ACTIONS.RECOVER_USER:
            return{
                ...state,
                loggedIn: true,
                userpic: action.userpic,
                username: action.user,
                userCards: action.userCards,
            }            
//----------------------------------------------------------------
//*
        case CONTEXT_ACTIONS.UPDATE_USER:
            var uri = state.userpic
            if(action.userpic){
                uri = action.userpic
            }
            return{
                ...state,
                userpic: action.userpic,
                
            }            
//----------------------------------------------------------------
//*
        case CONTEXT_ACTIONS.ADD_CARD:
            return{
                ...state,
                userCards: [...state.userCards, action.card]
            }            
//----------------------------------------------------------------
//*
        case CONTEXT_ACTIONS.DELETE_CARD:
            const cleanedCards = state.userCards.filter(card => card !== action.card);
            return {
                ...state,
                userCards: cleanedCards,
            }            
//----------------------------------------------------------------
//*
        case CONTEXT_ACTIONS.EDIT_CARD:
            const mappedCards = state.userCards.map(card =>{
                if (card.number === action.card.number){
                  return {
                    number: action.card.number,
                    holder: action.card.holder, 
                    sCode: action.card.sCode, 
                    expDate: action.card.expDate,
                  }
                }
                return card
              })
              setFilters(mappedFilter)
            return{
                ...state,
                userCards: mappedCards,
            }
            
        case CONTEXT_ACTIONS.UPDATE_LOCATION:
            return{
                ...state,
                userLocation: action.location,
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
                    dispatch({type: CONTEXT_ACTIONS.RECOVER_USER, user: userData.username , userpic: userData.userpic, userCards: userData.userCards, userLocation: userData.userLocation})
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
        // if(username==='Beto' && password==='Prueba12'){
        //     dispatch({type: CONTEXT_ACTIONS.LOG_IN, user: username})
        // }
        try {
            const response = await axios.post('http://10.0.2.2:8000/apiMovil/LoginView', {
              username: username,
              password: password,
            })

            if (response.status === 200) {
              console.log(response.data.access)
              dispatch({type: CONTEXT_ACTIONS.LOG_IN, user: response.data.access})
            } else {
              console.log('Wrong Credentials')
            }
          } catch (error) {
            console.log('Error '+String(error))
          }
    }

    const handleRegister = async (username, password, navigation) =>{
        try {
            const response = await axios.post('http://10.0.2.2:8000/apiMovil/LoginView', {
              username: username,
              password: password,
            })

            if (response.status === 200) {
              console.log(response.data.access)
              dispatch({type: CONTEXT_ACTIONS.LOG_IN, user: response.data.access})
            } else {
              console.log('Wrong Credentials')
            }
          } catch (error) {
            console.log('Error '+String(error))
          }
    }
    
    const saveUser = async () =>{
        await SecureStore.setItemAsync('userData', JSON.stringify(state))
    }

    const handleUpdateUser = (userpic) =>{
        dispatch({type: CONTEXT_ACTIONS.UPDATE_USER, userpic: userpic})
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

    const handleEmptyKart = () =>{
        setKartProducts([])
    }

    const handleUpdateCard = (card) =>{
        dispatch({type: CONTEXT_ACTIONS.EDIT_CARD, card: card})
    }
    
    const handleDeleteCard = (card) =>{
        dispatch({type: CONTEXT_ACTIONS.DELETE_CARD, card: card})
    }
    
    const handleAddCard = (card) =>{
        dispatch({type: CONTEXT_ACTIONS.ADD_CARD, card: card})
    }

    const handleUpdateLocation = (location) =>{
        dispatch({type: CONTEXT_ACTIONS.UPDATE_LOCATION, location: location})
    }

    const transformRestaurants = (apiData) => {
      return apiData.map(negocio => {
        const categories = negocio.categoria.map(cat => cat.nombre)
        const products = negocio.productos.map((prod) => ({
          id: prod.id,
          description: prod.descripcion,
          price: prod.precio,
          dishName: prod.nombre,
          imagen: Xmas,
          Categories: prod.categoria.map((cat) => cat.nombre),
        }))
        console.log(products)
        return {
          id: negocio.id,
          restaurantName: negocio.nombre,
          image: Xmas,
          Categories: categories,
          Products: products,
        }
      })
    }


    const getRestaurants = async () =>{
        try {
            const response = await axios.post('http://10.0.2.2:8000/apiMovil/negocioView')
            if (response.status === 200) {
              transformedData = transformRestaurants(response.data)
              // console.log(JSON.stringify(transformedData, null, 2))
              return transformedData
            } else {
            }
          } catch (error) {
            console.log('Error '+String(error))
          }
    }

    const transformDishes = (apiData) => {
      return apiData.map(platillo => {
        const categories = platillo.categoria.map(cat => cat.nombre)
        return {
          id: negocio.id,
          description: platillo.nombre,
          price: platillo.precio,
          dishName: platillo.nombre,
          image: Xmas,
          Categories: categories,
        }
      })
    }


    const getDishes= async (restaurant) =>{
        try {
          const response = await axios.post('http://127.0.0.1:8000/apiMovil/productoView', {
            id_restaurante: restaurant
          })
            if (response.status === 200) {
              transformedData = transformDishes(response.data)
              return transformedData
            } else {
            }
          } catch (error) {
            console.log('Error '+String(error))
          }

     const values = {
        state,
        saveUser,
        themeMode,
        handleLogIn,
        handleLogOut,
        handleUpdateUser,
        handleUpdateCard,
        handleDeleteCard,
        handleAddCard,
        handleUpdateLocation,
        handleThemeChange,
        kartProducts, 
        handleAddToKart, 
        handleDeleteFromKart,
        handleReduceCuantity,
        handleIncreaseCuantity,
        handleEmptyKart,
        handleRegister,
        getRestaurants,
        getDishes
    }

     return(
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
     )

}