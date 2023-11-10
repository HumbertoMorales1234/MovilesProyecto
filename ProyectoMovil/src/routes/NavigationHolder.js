import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { IntroScreen } from '../screens/unLogged/IntroScreen';
import { LogInScreen } from '../screens/unLogged/LogInScreen';
import { RegisterScreen } from '../screens/unLogged/RegisterScreen';
import { useAppContext } from '../hooks/useAppContext';
import { HomeScreen } from '../screens/Store/HomeScreen';
import { ForgotScreen } from '../screens/unLogged/ForgotScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawerContent } from '../components/CustomDrawer';
import { SettingsScreen } from '../screens/Store/SettingsScreen';

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

export const NavigationHolder = () => {

    const {state, themeMode} = useAppContext()

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
                <Drawer.Navigator drawerContent={props => <CustomDrawerContent{...props}/>} 
                screenOptions={{drawerInactiveTintColor: themeMode.GENERALTEXT, drawerActiveTintColor: themeMode.HIGHLIGHT, 
                headerStyle:{backgroundColor: themeMode.BACKGROUND}, headerTintColor: themeMode.GENERALTEXT}}>
                    <Drawer.Screen name='Home'      component={HomeScreen} options={{headerTitle:''}}/>
                    <Drawer.Screen name='Settings'      component={SettingsScreen}/>
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}
