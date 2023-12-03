import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton } from '../../components/Buttons/IconButton'
import { useAppContext } from '../../hooks/useAppContext'
import { useNavigation } from '@react-navigation/native'
import { RegisterInput } from '../../components/Inputs/RegisterInput'
import { ConfirmationButton } from '../../components/Buttons/ConfirmationButton'

export const ChangePassScreen = () => {
  const {themeMode, handleChangePassword} = useAppContext()
  const navigation = useNavigation()
  const [pass, setPass] = useState('')
  const [oldPass, setOldPass] = useState('')
  const [confPass, setConfPass] = useState('')
  const [error, setError] = useState('')

  const handleChangePressed = () =>{
    if(pass === '' || confPass === ''){
      setError('Hay datos faltantes')
    }else if( pass !== confPass){
      setError('Las Contraseñas no son iguales')
    }else{
      handleChangePassword(pass, oldPass)
      navigation.goBack()
    }
  }

  return (
    <View style={styles(themeMode).container}>
        <View style ={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10, gap: 30, width: '100%', paddingVertical: 10}}>
            <IconButton iconName={'arrow-left'} onPress={()=> navigation.goBack()} />
            <Text style={styles(themeMode).title} >Change Password</Text>
        </View>
        <View style={{gap: 30}}>
        <RegisterInput label={'Password'}     inputValue={oldPass}     secure onChangeText={(value) => setOldPass(value)}/>
          <RegisterInput label={'New Password'}     inputValue={pass}     secure onChangeText={(value) => setPass(value)}/>
          <RegisterInput label={'Confirm Password'} inputValue={confPass} secure onChangeText={(value) => setConfPass(value)}/>
        </View>
        <Text style={{color: themeMode.ALERT}}>{error}</Text>
        <ConfirmationButton text={'Change Password'} onPress={()=>handleChangePressed()}/>
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
  container:{
    backgroundColor: theme.BACKGROUND,
    flex: 1,
    alignItems: 'center',
    gap: 40
  },
  title:{
      color: theme.GENERALTEXT,
      fontSize: 30,
      fontWeight: '500',
  }
})
