import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { FontAwesome } from '@expo/vector-icons';

export const PagoButton = ({onPress, iconName, type, selected}) => {
    const {themeMode} = useAppContext()
  return (
    <TouchableOpacity style={[styles(themeMode).container, selected===type && styles(themeMode).selected]} onPress={() => onPress(type)}>
        <Text style={{fontSize:18, color:themeMode.GENERALTEXT}}>{type}</Text>
        <FontAwesome name={iconName} size={35} color={themeMode.GENERALTEXT} />
    </TouchableOpacity>
  )
}

const styles = (theme) => StyleSheet.create({
    container:{
        flexDirection: 'row',
        borderWidth: 1, 
        borderColor: theme.CONTRAST,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: 300,
    },
    selected:{
        backgroundColor: theme.SHADOW_CONTRAST,
        borderWidth: 0,
        borderColor: theme.HIGHLIGHT,
    },
})