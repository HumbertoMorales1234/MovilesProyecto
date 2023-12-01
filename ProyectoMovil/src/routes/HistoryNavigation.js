import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { HistorialScreen } from '../screens/Store/HistorialScreen'
import { OrderScreen } from '../screens/Store/OrderScreen'

const Stack = createStackNavigator()

export const HistoryNavigation = () => {
  return (
    <NavigationContainer independent={true}>
        <Stack.Navigator>
            <Stack.Screen name='History' component={HistorialScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Order' component={OrderScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}