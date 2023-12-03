import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export const PedidoCard = ({pedido}) => {
    const {themeMode} = useAppContext()
    const [products, setProductos] = useState('')
    const navigation = useNavigation()

    useEffect(() => {
        setProductos(pedido.productosPedidos.map(prod => prod.producto.nombre).join(', '));
      }, []);

    

  return (
    <TouchableOpacity style={[styles(themeMode).container, 
    pedido.estado=='Entregado'? styles(themeMode).containerInactive:pedido.estado=='En Camino'?styles(themeMode).containerEnviado:
    pedido.estado=='Preparando'?styles(themeMode).containerPreparando:styles(themeMode).containerRecibido,
    ]} onPress={() => navigation.navigate('Order', {pedido: pedido})}>
        <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{alignItems: 'center', flexDirection: 'row', gap:5}}>
                <Text style= {styles(themeMode).title}>{pedido.estado}</Text>
                <Ionicons name={pedido.estado=='Entregado'? "checkmark-circle":pedido.estado=='En Camino'?"bicycle-outline":pedido.estado=='Preparando'?'fast-food-outline':'checkmark-circle-outline'} 
                size={24} color="black" />
            </View>
            <View style={{alignItems: 'center', flexDirection: 'row', gap:5}}>
                <Feather name="calendar" size={22} color="black" />
                <Text style={styles(themeMode).date}>{pedido.fecha}</Text>
            </View>
        </View>


        <View style={{alignItems: 'center', flexDirection: 'row', gap: 5}}>
            <Text style= {styles(themeMode).price}>Total: {(pedido.precioTotal).toFixed(2)}</Text>
            <Feather name="dollar-sign" size={24} color={'black'} />
        </View>

        <View style={{alignItems: 'center', flexDirection: 'row', gap: 10}}>
            <Text style= {styles(themeMode).method}>Pago: {pedido.mPago}</Text>
            <FontAwesome name={pedido.mPago=='Efectivo'?"money":'credit-card'} size={25} color="black" />
        </View>

        <View>
            <Text style= {styles(themeMode).productos}>Productos: </Text>
            <Text>{products}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = (theme) => StyleSheet.create({
    container:{
        width: 350,
        height: 200,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        margin: 10
    },
    containerEnviado:{
        backgroundColor: theme.ACTIVE,
    },
    containerRecibido:{
        backgroundColor: theme.RECIVED,
    },
    containerPreparando:{
        backgroundColor: theme.WORKING,
    },
    containerInactive:{
        backgroundColor: theme.DONE,
    },
    title:{
        fontSize: 21,
        fontWeight: '600',
    },
    price:{
        fontSize: 24,
    },
    date:{
        fontSize: 16,
    },
    method:{
        fontSize: 21
    },
    productos:{
        fontSize: 18,
        fontWeight: '500'
    },
})