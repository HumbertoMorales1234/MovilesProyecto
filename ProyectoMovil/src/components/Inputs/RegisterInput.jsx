import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'; // mail
import { useAppContext } from '../../hooks/useAppContext';

export const RegisterInput = ({iconName, secure, label, onChangeText, inputValue}) => {

  const {themeMode} = useAppContext()
  

  return (
    <View style={{width: 400, borderWidth: 2, borderRadius: 30, paddingHorizontal: 15, paddingVertical:10, borderColor: themeMode.GENERALTEXT}}>
        <View style={{flexDirection: 'row', gap: 20, alignItems: 'center',}}>
            <Feather name={iconName} size={24} color={themeMode.GENERALTEXT} />
            <Text style={{color: themeMode.GENERALTEXT, fontSize: 17}}>{label}</Text>
        </View>
        <TextInput value={inputValue} onChangeText={onChangeText} secureTextEntry={secure} 
        style={{borderBottomWidth: 1, height: 40, borderColor:themeMode.GENERALTEXT, color:themeMode.GENERALTEXT, paddingHorizontal: 20}}/>
    </View>
  )
}
