import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'; // back, moon, sun
import { useAppContext } from '../../hooks/useAppContext';
import { Text } from 'react-native';

export const IconTextButton = ({iconName, onPress, text}) => {
    const {themeMode} = useAppContext()
  return (
    <TouchableOpacity onPress={onPress} 
    style={{borderWidth: 1, borderColor: themeMode.CONTRAST,width: 300, padding: 10, paddingHorizontal: 20 ,borderRadius: 15, justifyContent: 'space-between', flexDirection: 'row'}}>
        <Text style={{color: themeMode.GENERALTEXT, fontSize: 20, fontWeight: '600'}}>{text}</Text>
        <Feather name={iconName} size={24} color={themeMode.GENERALTEXT} />
    </TouchableOpacity>
  )
}