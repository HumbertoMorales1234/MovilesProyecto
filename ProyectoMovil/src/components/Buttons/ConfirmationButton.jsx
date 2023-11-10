import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { THEME } from '../../theme/Colors'
import { useAppContext } from '../../hooks/useAppContext'

export const ConfirmationButton = ({text, onPress}) => {

    const {themeMode} = useAppContext()

  return (
    <TouchableOpacity onPress={onPress}
    style={{paddingVertical: 17, width: 400, backgroundColor: themeMode.CONTRAST, justifyContent: 'center', alignItems: 'center', borderRadius:20}}>
        <Text style={{color: 'white', fontSize:20, fontWeight: '600'}}>{text}</Text>
    </TouchableOpacity>
  )
}
