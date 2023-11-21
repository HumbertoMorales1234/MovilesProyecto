import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { HomeScreen } from '../screens/Store/HomeScreen'
import { SellerScreen } from '../screens/Store/SellerScreen'

const Stack = createStackNavigator()

export const HomeNavigation = () => {
  return (
    <NavigationContainer independent={true}>
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Restaurant' component={SellerScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}
