import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { IntroScreen } from '../screens/unLogged/IntroScreen';
import { LogInScreen } from '../screens/unLogged/LogInScreen';
import { RegisterScreen } from '../screens/unLogged/RegisterScreen';
import { useAppContext } from '../hooks/useAppContext';
import { HomeScreen } from '../screens/Store/HomeScreen';
import { ForgotScreen } from '../screens/unLogged/ForgotScreen';

const Stack = createStackNavigator()

export const NavigationHolder = () => {

    const {state} = useAppContext()

    console.log('state: ', state.loggedIn)

    if(!state.loggedIn){
        return (
          <NavigationContainer>
              <Stack.Navigator screenOptions={{
                headerShown: false,
                }}>
                  <Stack.Screen name='Intro'      component={IntroScreen}/>
                  <Stack.Screen name='LogIn'      component={LogInScreen}/>
                  <Stack.Screen name='Register'   component={RegisterScreen}/>
                  <Stack.Screen name='AccountRecover'   component={ForgotScreen}/>
              </Stack.Navigator>
          </NavigationContainer>
        )
    }else{
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Home'      component={HomeScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
