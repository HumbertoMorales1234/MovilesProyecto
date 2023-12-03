import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { FlatList } from 'react-native'
import { ReviewDishCard } from '../../components/Cards/ReviewDishCard'
import { useNavigation } from '@react-navigation/native'
import { IconButton } from '../../components/Buttons/IconButton'

export const OrderScreen = ({navigation, route}) => {
    const {themeMode} = useAppContext()
    const {pedido} = route.params
    const [error, setError] = useState('')

    const handleSetError = (message) =>{
        setError(message)
    }

  return (
    <View style={styles(themeMode).container} >
        <View style ={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10, gap: 30, width: '100%', paddingVertical: 10}}>
            <IconButton iconName={'arrow-left'} onPress={()=> navigation.goBack()} />
            <Text style={styles(themeMode).title} >Detalles del pedido</Text>
        </View>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Text style={styles(themeMode).date} >Fecha de orden:</Text>
            <Text style={styles(themeMode).date} >{pedido.fecha}</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Text style={styles(themeMode).date} >Precio Total:</Text>
            <Text style={styles(themeMode).date} >{(pedido.precioTotal).toFixed(2)} $</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Text style={styles(themeMode).date} >Método de Pago:</Text>
            <Text style={styles(themeMode).date} >{pedido.mPago}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Text style={styles(themeMode).date} >Estado:</Text>
            <Text style={[styles(themeMode).date, {color:pedido.estado=='Entregado'? themeMode.GENERALTEXT:pedido.estado=='En Camino'? themeMode.ACTIVE:pedido.estado=='Preparando'? themeMode.WORKING:themeMode.RECIVED}]} >
                {pedido.estado}</Text>
        </View>
        <Text style={{color: themeMode.ALERT}}>{error}</Text>
        <View style={{flex: 1, paddingTop: 10}}>
            <Text style={styles(themeMode).date} >Productos Ordenados</Text>
            <FlatList
                data ={pedido.productosPedidos}
                renderItem={({item}) => {
                    return(
                        <ReviewDishCard dish={item.producto} estado={pedido.estado} errorDelivery={(message) => handleSetError(message)}/>
                    )
                }}
                />
        </View>
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
    container:{
        backgroundColor: theme.BACKGROUND,
        paddingHorizontal: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    title:{
        color: theme.GENERALTEXT,
        fontSize: 25,
        fontWeight: '600'
    },
    date:{
        color: theme.GENERALTEXT,
        fontSize: 25
    },
});