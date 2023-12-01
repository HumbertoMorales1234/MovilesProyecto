import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { HistorialScreen } from '../screens/Store/HistorialScreen'
import { OrderScreen } from '../screens/Store/OrderScreen'
import { CarritoScreen } from '../screens/Store/CarritoScreen'
import { PaymentScreen } from '../screens/Store/PaymentScreen'

const Stack = createStackNavigator()

export const CartNavigation = () => {
  return (
    <NavigationContainer independent={true}>
        <Stack.Navigator>
            <Stack.Screen name='Cart' component={CarritoScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Payment' component={PaymentScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}