import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { Ramen } from '../../../assets'
import { PedidoCard } from '../../components/Cards/PedidoCard'
import { FlatList } from 'react-native-gesture-handler'


const dishes = [
  {id: 1, description: 'Here should be a description of the product', price: '140.00', dishName:'Ramen de Verduras', image: Ramen, Categories: ['🌿 Vegan', '🌶️ Spicy']},
  {id: 2, description: 'Here should be a description of the product', price: '170.00', dishName:'Ramen de Pollo', image: Ramen, Categories: ['🌶️ Spicy']},
  {id: 3, description: 'Here should be a description of the product', price: '180.00', dishName:'Ramen de Res', image: Ramen, Categories: ['🌶️ Spicy']},
  {id: 4, description: 'Here should be a description of the product', price: '160.00', dishName:'Ramen de Champiñones', image: Ramen, Categories: ['🌿 Vegan']},
]
const Pedidos = [
  {id: 1, estado:'Pedido Realizado', precioTotal: 240, fecha: '30/11/2023', ubicacionEntrega: 'xD', mPago: 'Efectivo', productos: [dishes[0], dishes[1]]},
  {id: 2, estado:'Preparando', precioTotal: 290, fecha: '30/11/2023', ubicacionEntrega: 'xD', mPago: 'Tarjeta', productos: [dishes[0]]},
  {id: 3, estado:'En Camino', precioTotal: 170, fecha: '30/11/2023', ubicacionEntrega: 'xD', mPago: 'Tarjeta', productos: [dishes[1]]},
  {id: 4, estado:'Entregado', precioTotal: 140, fecha: '30/11/2023', ubicacionEntrega: 'xD', mPago: 'Tarjeta', productos: [dishes[2]]},
  {id: 5, estado:'Entregado', precioTotal: 240, fecha: '30/11/2023', ubicacionEntrega: 'xD', mPago: 'Efectivo', productos: [dishes[3]]},
  {id: 6, estado:'Entregado', precioTotal: 720, fecha: '30/11/2023', ubicacionEntrega: 'xD', mPago: 'Efectivo', productos: [dishes[0], dishes[1], dishes[2], dishes[3]]},
  {id: 7, estado:'Entregado', precioTotal: 400, fecha: '30/11/2023', ubicacionEntrega: 'xD', mPago: 'Efectivo', productos: [dishes[0], dishes[1], dishes[3]]},
];


export const HistorialScreen = () => {
  const {themeMode} = useAppContext()
  const [entregados, setEntregados] = useState([])
  const [pendientes, setPendientes] = useState([])

  useEffect(() =>{
    const FetchPedidos = () =>{
      const entreg = Pedidos.filter(pedido => pedido.estado === 'Entregado');
      const pendie = Pedidos.filter(pedido => pedido.estado !== 'Entregado');
      setEntregados(entreg)
      setPendientes(pendie)
    }
    FetchPedidos()
  },[])

  return (
    <View style={styles(themeMode).container}>
        <Text style={styles(themeMode).title}>Pedidos Activos</Text>
        <View style={{height: 220}}>
            <FlatList horizontal data={pendientes} showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {return(<PedidoCard pedido={item} />)}}/>
        </View>
        <Text style={styles(themeMode).title}>Pedidos Anteriores</Text>
        <FlatList data={entregados}
            renderItem={({item}) => {return(<PedidoCard pedido={item} />)}}/>
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: theme.BACKGROUND,
    justifyContent:'center',
    alignItems:'center',
    paddingTop: 20
  },
  title:{
    color: theme.GENERALTEXT,
    fontSize: 25,
    fontWeight: '600',
  },
})