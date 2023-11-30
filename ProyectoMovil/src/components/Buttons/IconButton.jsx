import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'; // back, moon, sun
import { useAppContext } from '../../hooks/useAppContext';

export const IconButton = ({iconName, onPress, color}) => {
    const {themeMode} = useAppContext()
  return (
    <TouchableOpacity onPress={onPress} style={{borderWidth: 1, borderColor: color? color:themeMode.CONTRAST, padding: 10, borderRadius: 15}}>
        <Feather name={iconName} size={24} color={color? color: themeMode.GENERALTEXT} />
    </TouchableOpacity>
  )
}
