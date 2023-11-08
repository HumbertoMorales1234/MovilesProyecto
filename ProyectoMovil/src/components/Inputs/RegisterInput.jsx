import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'; // mail

export const RegisterInput = ({iconName, secure, label, onChangeText, inputValue}) => {
  return (
    <View style={{width: 400, borderWidth: 2, borderRadius: 30, paddingHorizontal: 15, paddingVertical:10,}}>
        <View style={{flexDirection: 'row', gap: 20, alignItems: 'center',}}>
            <Feather name={iconName} size={24} color="black" />
            <Text>{label}</Text>
        </View>
        <TextInput value={inputValue} onChangeText={onChangeText} secureTextEntry={secure} style={{borderBottomWidth: 1, height: 40}}/>
    </View>
  )
}
