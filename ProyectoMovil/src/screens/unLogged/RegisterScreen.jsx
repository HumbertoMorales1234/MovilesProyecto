import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { RegisterInput } from '../../components/Inputs/RegisterInput'
import { Food } from '../../../assets'
import { ConfirmationButton } from '../../components/Buttons/ConfirmationButton'
import { UnLoggedMenu } from '../../components/Menus/unLoggedMenu'
import { useNavigation } from '@react-navigation/native'
export const RegisterScreen = () => {

  const {themeMode, handleRegister}= useAppContext()
  const [mail, setMail] = useState('')
  const [pass, setPass] = useState('')
  const [user, setUser] = useState('')
  const [confPass, setConfPass] = useState('')
  const [error, setError] = useState('')

  const navigation = useNavigation()

  const handlePressed = () =>{
    if(pass === '' || confPass === ''){
      setError('Hay datos faltantes')
    }else if( pass !== confPass){
      setError('Las Contraseñas no son iguales')
    }else{
      handleRegister(user, pass, mail)
      navigation.goBack()
    }
  }
  

  return (
    <View style={styles(themeMode).container}>
        <UnLoggedMenu shouldGoBack/>
        <Image style={styles(themeMode).image} source={Food}/>
        <Text style={styles(themeMode).title}>Create an account</Text>
        <RegisterInput iconName={'mail'} label={'eMail'} inputValue={mail} onChangeText={(value) => setMail(value)}/>
        <RegisterInput iconName={'user'} label={'User name'} inputValue={user} onChangeText={(value) => setUser(value)}/>
        <RegisterInput iconName={'lock'} label={'Password'} secure inputValue={pass} onChangeText={(value) => setPass(value)}/>
        <RegisterInput iconName={'lock'} label={'Confirm Password'} secure inputValue={confPass} onChangeText={(value) => setConfPass(value)}/> 
        <Text style={{color: themeMode.ALERT}}>{error}</Text>
        <ConfirmationButton text={'Register'} onPress={() => handlePressed()}/>
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
    width: 150,
    height: 150,
    borderRadius: 400,
  },
})