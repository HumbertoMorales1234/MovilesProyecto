import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Ramen } from '../../../assets'
import { RegisterInput } from '../../components/Inputs/RegisterInput'
import { useAppContext } from '../../hooks/useAppContext'
import { ConfirmationButton } from '../../components/Buttons/ConfirmationButton'
import { LinkButton } from '../../components/Buttons/LinkButton'
import { useNavigation } from '@react-navigation/native'

export const LogInScreen = () => {

  const {state, themeMode} = useAppContext()
  const navigation = useNavigation()

  return (
    <View style={styles(themeMode).container}>
        <Image source={Ramen} style={styles(themeMode).image}/>
        <Text style={styles(themeMode).title}>Log In</Text>
        
        <View style={{gap: 20}}>
          <RegisterInput iconName={'mail'} label={'eMail'}/>

          <View style={{alignItems: 'flex-end', gap:10}}>
            <RegisterInput iconName={'lock'} label={'Password'} secure/>
            <LinkButton text={'Forgot your password?'} onPress={() => navigation.navigate('AccountRecover')}/>
          </View>
        </View>
        
        <ConfirmationButton text={'Log In'}/>
        <View style={{flexDirection:'row', gap: 10}}>
          <Text style={{color: themeMode.GENERALTEXT,}}>Don't have an account?</Text>
          <LinkButton text={'Register'} onPress={() => navigation.navigate('Register')}/>
        </View>
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
    container:{
      backgroundColor: theme.BACKGROUND,
      justifyContent: 'space-evenly',
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
