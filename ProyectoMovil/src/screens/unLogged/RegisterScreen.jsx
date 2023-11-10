import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { RegisterInput } from '../../components/Inputs/RegisterInput'
import { Food } from '../../../assets'
import { ConfirmationButton } from '../../components/Buttons/ConfirmationButton'
import { UnLoggedMenu } from '../../components/Menus/unLoggedMenu'
import { useNavigation } from '@react-navigation/native'
export const RegisterScreen = () => {

  const {themeMode}= useAppContext()

  const navigation = useNavigation()

  const handleRegister = () => {
      navigation.navigate('LogIn')
  }

  return (
    <View style={styles(themeMode).container}>
        <UnLoggedMenu shouldGoBack/>
        <Image style={styles(themeMode).image} source={Food}/>
        <Text style={styles(themeMode).title}>Create an account</Text>
        <RegisterInput iconName={'mail'} label={'eMail'}/>
        <RegisterInput iconName={'lock'} label={'Password'} secure/>
        <RegisterInput iconName={'lock'} label={'Confirm Password'} secure/> 
        <ConfirmationButton text={'Register'} onPress={() => handleRegister()}/>
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