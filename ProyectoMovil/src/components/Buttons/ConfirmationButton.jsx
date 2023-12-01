import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { THEME } from '../../theme/Colors'
import { useAppContext } from '../../hooks/useAppContext'

export const ConfirmationButton = ({text, onPress, color, width}) => {

    const {themeMode} = useAppContext()

  return (
    <TouchableOpacity onPress={onPress}
    style={{paddingVertical: 17, width:width? width:400, backgroundColor:color? color:themeMode.CONTRAST, justifyContent: 'center', alignItems: 'center', borderRadius:20}}>
        <Text style={{color:themeMode.BACKGROUND, fontSize:20, fontWeight: '600'}}>{text}</Text>
    </TouchableOpacity>
  )
}
