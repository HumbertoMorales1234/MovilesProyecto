import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { HomeScreen } from '../screens/Store/HomeScreen'
import { SellerScreen } from '../screens/Store/SellerScreen'
import { ProfileScreen } from '../screens/Store/ProfileScreen'
import { MyCardsScreen } from '../screens/Store/MyCardsScreen'
import { MyReviewsScreen } from '../screens/Store/MyReviewsScreen'
import { MyLocationScreen } from '../screens/Store/MyLocationScreen'

const Stack = createStackNavigator()

export const ProfileNavigation = () => {
  return (
    <NavigationContainer independent={true}>
        <Stack.Navigator>
            <Stack.Screen name='Profile' component={ProfileScreen} options={{headerShown: false}}/>
            <Stack.Screen name='MyCards' component={MyCardsScreen} options={{headerShown: false}}/>
            <Stack.Screen name='MyReviews' component={MyReviewsScreen} options={{headerShown: false}}/>
            <Stack.Screen name='MyLocation' component={MyLocationScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}
