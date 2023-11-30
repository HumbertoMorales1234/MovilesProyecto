import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'

const Pedidos = [
  {id: 1, estado:'Pedido Realizado',  precioTotal: 0, ubicacionEntrega: '', mPago: '', productos:[]},
  {id: 2, estado:'Preparando Pedido', precioTotal: 0, ubicacionEntrega: '', mPago: '', productos:[]},
  {id: 3, estado:'En Camino',         precioTotal: 0, ubicacionEntrega: '', mPago: '', productos:[]},
  {id: 4, estado:'Entregado',         precioTotal: 0, ubicacionEntrega: '', mPago: '', productos:[]},
  {id: 5, estado:'Entregado',         precioTotal: 0, ubicacionEntrega: '', mPago: '', productos:[]},
  {id: 6, estado:'Entregado',         precioTotal: 0, ubicacionEntrega: '', mPago: '', productos:[]},
  {id: 7, estado:'Entregado',         precioTotal: 0, ubicacionEntrega: '', mPago: '', productos:[]},
]

export const HistorialScreen = () => {
  const {themeMode} = useAppContext()
  const [entregados, setEntregados] = useState([])
  const [pendientes, setPendientes] = useState([])

  return (
    <View style={styles(themeMode).container}>
        <Text style={styles(themeMode).title}>Pedidos Activos</Text>
        <Text style={styles(themeMode).title}>Pedidos Anteriores</Text>
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: theme.BACKGROUND,
    justifyContent:'center',
    alignItems:'center',
  },
  title:{
    color: theme.GENERALTEXT,
    fontSize: 25,
    fontWeight: '600',
  },
})