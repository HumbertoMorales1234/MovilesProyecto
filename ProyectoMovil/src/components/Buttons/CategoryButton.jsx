import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'

export const CategoryButton = ({categoryName, onPress, isSelected}) => {
    const {themeMode} = useAppContext()

  
  return (
    <TouchableOpacity style={{borderWidth: 1, borderColor: themeMode.SHADOW, padding: 8, marginRight: 10, height: 40, justifyContent: 'center', alignItems: 'center', 
        borderRadius: 10, backgroundColor: isSelected?themeMode.SHADOW:themeMode.BACKGROUND}} onPress={onPress}>
        <Text style={{color: themeMode.GENERALTEXT}}>{categoryName}</Text>
    </TouchableOpacity>
  )
}
