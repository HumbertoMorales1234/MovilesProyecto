import React, { lazy } from 'react'
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
import { HistorialScreen } from '../screens/Store/HistorialScreen';
import { CarritoScreen } from '../screens/Store/CarritoScreen';
import { KartContextProvider } from '../context/KartContext';
import { HomeNavigation } from './HomeNavigation';
import { ProfileScreen } from '../screens/Store/ProfileScreen';
import { ProfileNavigation } from './ProfileNavigation';

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

export const NavigationHolder = () => {

    const {state, themeMode, saveUser} = useAppContext()

    if(!state.loggedIn){
        return (
          <NavigationContainer>
              <Stack.Navigator screenOptions={{
                headerShown: false,
                }}>
                  <Stack.Screen name='Intro'            component={IntroScreen}/>
                  <Stack.Screen name='LogIn'            component={LogInScreen}/>
                  <Stack.Screen name='Register'         component={RegisterScreen}/>
                  <Stack.Screen name='AccountRecover'   component={ForgotScreen}/>
              </Stack.Navigator>
          </NavigationContainer>
        )
    }else{
        saveUser()
        return(
             
                <NavigationContainer>
                    <Drawer.Navigator  drawerContent={props => <CustomDrawerContent{...props}/>} 
                        screenOptions={{drawerInactiveTintColor: themeMode.GENERALTEXT, drawerActiveTintColor: themeMode.HIGHLIGHT, 
                        headerStyle:{backgroundColor: themeMode.CONTRAST}, headerTintColor: themeMode.BACKGROUND}}>
                        <Drawer.Screen name='Home'          component={HomeNavigation}      options={{headerTitle:'Store'}}/>
                        <Drawer.Screen name='Settings'      component={SettingsScreen}/>
                        <Drawer.Screen name='History'       component={HistorialScreen}/>
                        <Drawer.Screen name='Cart'          component={CarritoScreen} />
                        <Drawer.Screen name='Profile'       component={ProfileNavigation} />
                    </Drawer.Navigator>
                </NavigationContainer>
            
        )
    }
}
