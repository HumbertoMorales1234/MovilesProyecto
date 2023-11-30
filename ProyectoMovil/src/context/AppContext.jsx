import * as SecureStore from "expo-secure-store"
import { createContext, useEffect, useReducer, useState } from "react"
import { THEME } from "../theme/Colors"
import axios from 'axios'

import { Xmas } from "../../assets"

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
            })

            if (response.status === 200) {
              // console.log(response.data.access)
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
            const response = await axios.post('http://10.0.2.2:8000/apiMovil/oginView', {
              username: username,
              password: password,
            })

            if (response.status === 200) {
              // console.log(response.data.access)
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


    const transformRestaurants = (apiData) => {
      return apiData.map(negocio => {
        const categories = negocio.categoria.map(cat => cat.nombre)
        const products = negocio.productos.map((prod) => ({
          id: prod.id,
          description: prod.descripcion,
          price: prod.precio,
          dishName: prod.nombre,
          imagen: Xmas,
          location: negocio.ubicacion,
          Categories: prod.categoria.map((cat) => cat.nombre),
        }))
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
          id: platillo.id,
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
          const response = await axios.post('http://10.0.2.2:8000/apiMovil/productoView', {
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
    }

    const transformReviews = (apiData) => {
      return apiData.map(reseña => {
        return {
          id: reseña.id,
          text: reseña.texto,
          stars: reseña.calificacion,
        }
      })
    }
    // https://proyecto-movil-api.onrender.com/

    const getReviews= async (id) =>{
        try {
          const response = await axios.post('http://10.0.2.2:8000/apiMovil/reseñaProductoView', {
            nombre: id
          })
            if (response.status === 200) {
              transformedData = transformReviews(response.data)
              return transformedData
            } else {
            }
          } catch (error) {
            console.log('Error '+String(error))
          }
    }

    const transformCategories = (apiData) => {
      return apiData.map(categoria => {
        return {
          id: categoria.id,
          text: categoria.nombre,
          isActive: false,
        }
      })
    }


    const getCategories= async () =>{
        try {
          const response = await axios.post('http://10.0.2.2:8000/apiMovil/categoriaView', {
          })
            if (response.status === 200) {
              transformedData = transformCategories(response.data)
              return transformedData
            } else {
            }
          } catch (error) {
            console.log('Error '+String(error))
          }
    }


     const values = {
        state,
        saveUser,
        themeMode,
        handleLogIn,
        handleLogOut,
        handleThemeChange,
        handleRegister,
        getRestaurants,
        getDishes,
        getReviews,
        getCategories
    }

     return(
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
     )

}