import React from 'react'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { RegisterInput } from '../../components/Inputs/RegisterInput'
import { Food } from '../../../assets'
import { ConfirmationButton } from '../../components/Buttons/ConfirmationButton'
import { UnLoggedMenu } from '../../components/Menus/unLoggedMenu'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
export const RegisterScreen = () => {

  const { themeMode, handleLogIn } = useAppContext();
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        const isUserLoggedIn = handleLogIn('Beto', password);
        if (isUserLoggedIn) {
          navigation.navigate('LogIn');
        } else {
          // Handle invalid password or user already logged in
          Alert.alert('Invalid Password', 'Invalid password or user already logged in');
        }
      } else {
        // Handle password and confirmation mismatch
        Alert.alert('Password Mismatch', 'Password and confirm password do not match');
      }
    } else {
      // Handle empty password or confirm password
      Alert.alert('Required Fields', 'Password and confirm password are required');
    }
  };
  

  return (
    <View style={styles(themeMode).container}>
      <UnLoggedMenu shouldGoBack />
      <Image style={styles(themeMode).image} source={Food} />
      <Text style={styles(themeMode).title}>Create an account</Text>
      <RegisterInput iconName={'mail'} label={'eMail'} />
      <RegisterInput
        iconName={'lock'}
        label={'Password'}
        secure
        onChangeText={(text) => setPassword(text)}
      />
      <RegisterInput
        iconName={'lock'}
        label={'Confirm Password'}
        secure
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <ConfirmationButton text={'Register'} onPress={handleRegister} />
    </View>
  );
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