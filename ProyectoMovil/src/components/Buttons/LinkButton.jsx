import React from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useAppContext } from '../../hooks/useAppContext'

export const LinkButton = ({text, onPress}) => {
    
    const {themeMode} = useAppContext()

  return (
    <TouchableOpacity onPress={onPress}>
        <Text style={{color: themeMode.HIGHLIGHT, textDecorationLine: 'underline'}}>{text}</Text>
    </TouchableOpacity>
  )
}
