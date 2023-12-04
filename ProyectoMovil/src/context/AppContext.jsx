import * as SecureStore from "expo-secure-store"
import { createContext, useEffect, useReducer, useState } from "react"
import { THEME } from "../theme/Colors"
import axios from 'axios'

import { Xmas } from "../../assets"

export const AppContext =  createContext()
// 'http://10.0.2.2:8000/apiMovil/'
const baseURL = 'https://proyecto-movil-api.onrender.com/apiMovil/'
const defaultPic= ''

const initialState = {
    username: '',
    userpic: '', 
    userphone: 0,
    loggedIn: false,
    userLocation: '',
    token: ''
}

const CONTEXT_ACTIONS = {
    LOG_IN: 'LOG_IN',
    LOG_OUT: 'LOG_OUT',
    RECOVER_USER: 'RECOVER_USER',
    UPDATE_USER: 'UPDATE_USER',

    CHANGE_PASS: 'CHANGE_PASS',

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
            if(action.data.foto){
                uri = action.data.foto
            }
            else{
                uri = defaultPic
            }
            return{
                ...state,
                username: action.data.user,
                userpic: action.data.foto, 
                userphone: action.data.phone,
                loggedIn: true,
                userLocation: action.data.ubicacion,
                token: action.data.token
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
                userphone: action.userphone,
                userLocation: action.userLocation,
                token: action.token
            }            
//----------------------------------------------------------------
//*
        case CONTEXT_ACTIONS.UPDATE_USER:
            var username =state.username
            var uri = state.userpic
            var userphone = state.userphone
            if(action.userpic !== ''){
                uri = action.userpic
            }
            if(action.username !== ''){
                username = action.username
            }
            if(action.userphone !== ''){
                userphone = action.userphone
            }
            return{
                ...state,
                userpic: uri,
                username: username,
                userphone: userphone,
            }            
    
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
//----------------------------------------------------------------
//*            
        case CONTEXT_ACTIONS.UPDATE_LOCATION:
            return{
                ...state,
                userLocation: action.location,
            }
//----------------------------------------------------------------
//*            

    }
}

export const AppContextProvider = ({children}) =>{

    const [state, dispatch] = useReducer(reducer, initialState)
    const [themeMode, setTheme] = useState(THEME.LIGHT)
    const [kartProducts, setKartProducts] = useState([])
    const [cartSeller, setCartSeller] = useState('')

    const handleUpdateSeller = (sellerName) =>{
      setCartSeller(sellerName)
    }

 
    useEffect(() => {
        const checkData = async() =>{
            try {
                const saving = await SecureStore.getItemAsync('userData')
                if(saving){
                    const userData = (JSON.parse(saving))
                    dispatch({type: CONTEXT_ACTIONS.RECOVER_USER, user: userData.username , userpic: userData.userpic, userCards: userData.userCards, 
                        userLocation: userData.userLocation, userphone: userData.userphone, token: userData.token, })
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

    const handleLogIn = async (username, password) =>{
      let token 
      let foto
      let user
      let phone
      let ubicacion

        try {
            const response = await axios.post(baseURL+'LoginView', {
              username: username,
              password: password,
            })

            if (response.status === 200) {
              token = response.data.access
              // console.log("LOGIN1: "+JSON.stringify(response.data))
            } else {
              console.log('Wrong Credentials')
            }
          } catch (error) {
            console.log('Error '+String(error))
            return
          }

          try {
            const response = await axios.post(baseURL+'LoginView2', {
            }, {
              headers:{
              "Authorization": 'Bearer '+ token
            }})

            if (response.status === 200) {
              // console.log("LOGIN2: "+JSON.stringify(response.data))

              foto = response.data.foto
              user = response.data.id_user.username
              phone = response.data.telefono
              ubicacion = response.data.ubicacion_entrega
            } else {
              console.log('Wrong Credentials')
            }
          } catch (error) {
            console.log('Error '+String(error))
            return
          }

          datos ={
            token: token,
            foto: foto,
            user: user,
            phone: phone,
            ubicacion: ubicacion
          }

          dispatch({type: CONTEXT_ACTIONS.LOG_IN, data: datos})

    }

    const handleRegister = async (username, password, mail) =>{
        try {
            const response = await axios.post(baseURL+'CreaUsuarioView', {
              username: username,
              password: password,
              mail: mail
            })

            if (response.status === 200) {
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

    const handleUpdateUser = async (userpic, username, userphone) =>{
      try {
        // console.log(state.token)
        const response = await axios.post(baseURL+'UpdateView', {
          foto: userpic,
          username: username,
          telefono: userphone
        }, {
          headers:{
          "Authorization": 'Bearer '+ state.token
        }})
          if (response.status === 200) {
          } else {
          }
        } catch (error) {
          console.log('Error '+String(error))
        }

        dispatch({type: CONTEXT_ACTIONS.UPDATE_USER, userpic: userpic, username:username, userphone:userphone})
    }


    const handleChangePassword = async (newPass, oldPass) =>{
      try {
        // console.log("TOKEN: "+state.token)
        const response = await axios.post(baseURL+'changePasswordView', {
          oldPass: oldPass,
          newPass: newPass,
        }, {
          headers:{
          "Authorization": 'Bearer '+ state.token
        }})
          if (response.status === 200) {
          } else {
          }
        } catch (error) {
          console.log('Error '+String(error))
        }
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
          // console.log(kartProducts)
        }else{
        setKartProducts(prevProducts => [...prevProducts, { dish: dish, cantidad: cantidad }]);
        // console.log(kartProducts)
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
            if (product.dish.dishName === dishName && product.cantidad<product.dish.existance){
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
          imagen: prod.imagen,
          location: negocio.ubicacion,
          existance: prod.existencia,
          Categories: prod.categoria.map((cat) => cat.nombre),
        }))
        return {
          id: negocio.id,
          restaurantName: negocio.nombre,
          image: negocio.id_usuario.foto,
          Categories: categories,
          Products: products,
          location: negocio.ubicacion,
        }
      })
    }


    const getRestaurants = async () =>{
        try {
            const response = await axios.post(baseURL+'negocioView')
            if (response.status === 200) {
              transformedData = transformRestaurants(response.data)
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
          existance: platillo.existencia,
          Categories: categories,
        }
      })
    }


    const getDishes= async (restaurant) =>{
        try {
          const response = await axios.post(baseURL+'productoView', {
            id_restaurante: restaurant
          })
            if (response.status === 200) {
              transformedData = transformDishes(response.data)
              // console.log("DISHES: "+JSON.stringify(response.data))
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
          const response = await axios.post(baseURL+'reseñaProductoView', {
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

    const transformMyReviews = (apiData) => {
      return apiData.map(reseña => {
        return {
          id: reseña.id,
          texto: reseña.texto,
          calificacion: reseña.calificacion,
          producto: reseña.id_producto.nombre
        }
      })
    }

    const getMyReviews= async () =>{
      try {
        // console.log(state.token)
        const response = await axios.post(baseURL+'myReseñaProductoView', {
        }, {
          headers:{
          "Authorization": 'Bearer '+ state.token
        }})
          if (response.status === 200) {
            transformedData = transformMyReviews(response.data)
            return transformedData
          } else {
          }
        } catch (error) {
          console.log('Error '+String(error))
        }
  }

  const transformMyOrders = (apiData) => {
    return apiData.map(pedido => {
      const products = pedido.productos.map((prod) => ({
        id: prod.id,
        producto: prod.producto,
        cantidad: prod.cantidad,
      }))
      return {
        id: pedido.id,
        estado: pedido.estado,
        precioTotal: pedido.precio_total,
        fecha: pedido.fecha,
        ubicacionEntrega: pedido.ubicacion_entrega,
        mPago: (pedido.pago === 1 ? 'Efectivo' : 'Tarjeta'),
        productosPedidos: products
      }
    })
  }

  const getMyOrder= async () =>{
    try {
      const response = await axios.post(baseURL+'myPedidosView', {
      }, {
        headers:{
        "Authorization": 'Bearer '+ state.token
      }})
        if (response.status === 200) {
          transformedData = transformMyOrders(response.data)
          // console.log(JSON.stringify(transformedData))
          return transformedData
        } else {
        }
      } catch (error) {
        console.log('Error '+String(error))
      }
}


const handleCrearReview = async (texto, calificacion, id_producto ) =>{
  try {
      const response = await axios.post(baseURL+'CreaReseñaView', {
        tipo_reseña: 1,
        texto: texto,
        calificacion: calificacion,
        id_producto: id_producto,

      }
      , {
        headers:{
        "Authorization": 'Bearer '+ state.token
      }})
      if (response.status === 200) {
      } else {
        console.log('Wrong Credentials')
      }
    } catch (error) {
      console.log('Error '+String(error))
    }
}

const handleCrearTarjeta = async (card) =>{
  try {
      const response = await axios.post(baseURL+'CreaTarjetaView', {
        holder: card.holder,
        number: card.number,
        sCode: card.sCode,
        expirationDate: card.expDate,

      }
      , {
        headers:{
        "Authorization": 'Bearer '+ state.token
      }})
      if (response.status === 200) {
      } else {
        console.log('Wrong Credentials')
      }
    } catch (error) {
      console.log('Error '+String(error))
    }
}


const transformMyCards = (apiData) => {
  return apiData.map(tarjeta => {
    return {
      holder: tarjeta.holder,
      number: tarjeta.number,
      sCode: tarjeta.sCode,
      expDate: tarjeta.expirationDate
    }
  })
}

const handleCrearPedido = async (productos, tarjeta, total) =>{
  let numero 
  if( tarjeta){
    // console.log(tarjeta)
    numero = tarjeta.number
  }
  else{
    // console.log("SIN TARJETAs"+ tarjeta)
    numero = 0
  }

  try {
    const response = await axios.post(baseURL+'CreaPedidoView', {
      tarjeta: numero,
      productos: productos,
      total: total,
      ubicacion_entrega: state.userLocation, 
      restaurante: cartSeller,
    }
    , {
      headers:{
      "Authorization": 'Bearer '+ state.token
    }})
    if (response.status === 200) {
    } else {
      console.log('Wrong Credentials')
    }
  } catch (error) {
    console.log('Error '+String(error))
  }

}

const getMyCards= async () =>{
  try {
    // console.log(state.token)
    const response = await axios.post(baseURL+'myTarjetasView', {
    }, {
      headers:{
      "Authorization": 'Bearer '+ state.token
    }})
      if (response.status === 200) {
        transformedData = transformMyCards(response.data)
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
          const response = await axios.post(baseURL+'categoriaView', {
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
        handleUpdateUser,

        handleDeleteCard,

        handleUpdateLocation,

        handleUpdateSeller,
        cartSeller,

        handleThemeChange,
        kartProducts, 
        setKartProducts,
        handleAddToKart, 
        handleDeleteFromKart,
        handleReduceCuantity,
        handleIncreaseCuantity,
        handleEmptyKart,
    
        handleRegister,
        handleCrearReview,
        handleCrearTarjeta,
        handleChangePassword,
        handleCrearPedido,

        getRestaurants,
        getDishes,
        getReviews,
        getCategories,
        getMyReviews,
        getMyOrder,
        getMyCards
    }

     return(
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
     )

}