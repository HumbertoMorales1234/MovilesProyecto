import React from 'react'
import { View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'

export const PedidoScreen = ({pedido}) => {
    const {themeMode} = useAppContext()

  return (
    <View>
        <Text>{pedido.estatus}</Text>
    </View>
  )
}
