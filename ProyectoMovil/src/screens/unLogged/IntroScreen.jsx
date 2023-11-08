import React, { useEffect } from 'react'
import { View, ImageBackground, ActivityIndicator, } from 'react-native'
import { Letuce } from '../../../assets'
import { useNavigation } from '@react-navigation/native'

export const IntroScreen = () => {

    const navigation = useNavigation()
    const delay = (ms) => new Promise((res) => setTimeout(res, ms))

    useEffect(() =>{
        const passScreen= async() =>{
            await delay(2000)
            navigation.navigate('LogIn')
        }
        passScreen()
    }, [])

  return (
    <ImageBackground source={Letuce} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color='white' size={'large'}/>
    </ImageBackground>
  )
}
