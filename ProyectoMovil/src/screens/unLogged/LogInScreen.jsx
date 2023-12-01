import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Ramen } from '../../../assets'
import { RegisterInput } from '../../components/Inputs/RegisterInput'
import { useAppContext } from '../../hooks/useAppContext'
import { ConfirmationButton } from '../../components/Buttons/ConfirmationButton'
import { LinkButton } from '../../components/Buttons/LinkButton'
import { useNavigation } from '@react-navigation/native'

export const LogInScreen = () => {

  const {themeMode, handleLogIn} = useAppContext()
  const navigation = useNavigation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const {getRestaurants} = useAppContext()
  

  const handleLoggedPressed = async() => {
    
    if(username === '' || password === ''){
      setError("Missing Data")
    }else{
      await (handleLogIn(username, password, navigation))
    }
      setError("Wrong Credentials")
  }

  return (
    <View style={styles(themeMode).container}>
        <Image source={Ramen} style={styles(themeMode).image}/>
        <Text style={styles(themeMode).title}>Log In</Text>
        
        <View style={{gap: 20}}>
          <RegisterInput iconName={'mail'} label={'eMail'} onChangeText={(value) => setUsername(value)} inputValue={username}/>

          <View style={{alignItems: 'flex-end', gap:10}}>
            <RegisterInput iconName={'lock'} label={'Password'} secure onChangeText={(value) => setPassword(value)} inputValue={password}/>
            <LinkButton text={'Forgot your password?'} onPress={() => navigation.navigate('AccountRecover')}/>
          </View>
        </View>
        <Text style={styles(themeMode).errorText}>{error}</Text>
        <ConfirmationButton text={'Log In'} onPress={() => handleLoggedPressed()}/>
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
    errorText:{
      color: theme.ALERT
    }
})
