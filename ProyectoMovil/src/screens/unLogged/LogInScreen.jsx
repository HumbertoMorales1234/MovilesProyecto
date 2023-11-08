import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Ramen } from '../../../assets'
import { RegisterInput } from '../../components/Inputs/RegisterInput'

export const LogInScreen = () => {
  return (
    <View style={styles.container}>
        <Image source={Ramen} style={styles.image}/>
        <Text>Log In</Text>
        <RegisterInput iconName={'mail'} label={'eMail'}/>
        <RegisterInput iconName={'lock'} label={'Password'} secure/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        gap: 10
    },
    image:{
        width: 300,
        height: 300,
        borderRadius: 400,
    },
})
