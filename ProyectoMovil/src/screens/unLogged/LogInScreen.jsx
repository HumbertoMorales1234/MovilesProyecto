import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Ramen } from '../../../assets'
import { RegisterInput } from '../../components/Inputs/RegisterInput'
import { useAppContext } from '../../hooks/useAppContext'
import { ConfirmationButton } from '../../components/Buttons/ConfirmationButton'
import { LinkButton } from '../../components/Buttons/LinkButton'

export const LogInScreen = () => {

  const {state, themeMode} = useAppContext()

  return (
    <View style={styles(themeMode).container}>
        <Image source={Ramen} style={styles(themeMode).image}/>
        <Text style={styles(themeMode).title}>Log In</Text>
        <RegisterInput iconName={'mail'} label={'eMail'}/>
        
        <RegisterInput iconName={'lock'} label={'Password'} secure/>
        
        <ConfirmationButton text={'Log In'}/>
        <View style={{flexDirection:'row', gap: 10}}>
          <Text style={{color: themeMode.GENERALTEXT,}}>Don't have an account?</Text>
          <LinkButton text={'Register'}/>
        </View>
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
    container:{
      backgroundColor: theme.BACKGROUND,
      justifyContent: 'center',
      alignItems: 'center',
      flex:1,
      gap: 10
    },
    title:{
      fontSize: 30,
      fontWeight: '600',
      color:theme.GENERALTEXT,
    },
    image:{
      width: 300,
      height: 300,
      borderRadius: 400,
    },
})
