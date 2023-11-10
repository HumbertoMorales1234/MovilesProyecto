import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { Forget } from '../../../assets'
import { RegisterInput } from '../../components/Inputs/RegisterInput'
import { UnLoggedMenu } from '../../components/Menus/unLoggedMenu'
import { ConfirmationButton } from '../../components/Buttons/ConfirmationButton'
import { useNavigation } from '@react-navigation/native'

export const ForgotScreen = () => {

    const {themeMode}= useAppContext()
    const navigation = useNavigation()

    const handleRecover = () => {
      navigation.navigate('LogIn')
    }

  return (
    <View style={styles(themeMode).container}>
        <UnLoggedMenu shouldGoBack/>
        <Image style={styles(themeMode).image} source={Forget}/>
        <View style={{gap: 10}}>
          <Text style={styles(themeMode).title}>Forgot your Password?</Text>
          <Text style={styles(themeMode).simpleText}>Don't worry we will recover your account. Please write down your email, we will send you there what's next</Text>
        </View>
        <RegisterInput iconName={'mail'} label={'eMail'}/>
        <ConfirmationButton text={'Recover my Account'} onPress={() => handleRecover()}/>
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
  image:{
    width: 300,
    height: 300,
    borderRadius: 400,
  },
  title:{
    fontSize: 30,
    fontWeight: '600',
    color:theme.GENERALTEXT,
    textAlign: 'center'
  },
  simpleText:{
    color: theme.GENERALTEXT,
    textAlign: 'center',
    maxWidth: 400
  },
})