import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { PedidoCard } from '../../components/Cards/PedidoCard'
import { FlatList } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native'

export const HistorialScreen = () => {
  const { themeMode, getMyOrder } = useAppContext()
  const [Pedidos, setPedidos] = useState([])
  const [entregados, setEntregados] = useState([])
  const [pendientes, setPendientes] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const ordersData = await getMyOrder()

          setPedidos(ordersData)
          const entreg = ordersData.filter((pedido) => pedido.estado === 'Entregado')
          const pendie = ordersData.filter((pedido) => pedido.estado !== 'Entregado')

          setEntregados(entreg)
          setPendientes(pendie)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchData()
    }, [])
  )

  return (
    <View style={styles(themeMode).container}>
      <Text style={styles(themeMode).title}>Pedidos Activos</Text>
      <View style={{ height: 220 }}>
        <FlatList
          horizontal
          data={pendientes}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <PedidoCard pedido={item} />
          }}
        />
      </View>
      <Text style={styles(themeMode).title}>Pedidos Anteriores</Text>
      <FlatList
        data={entregados}
        renderItem={({ item }) => {
          return <PedidoCard pedido={item} />
        }}
      />
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.BACKGROUND,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
    },
    title: {
      color: theme.GENERALTEXT,
      fontSize: 25,
      fontWeight: '600',
    },
  })
