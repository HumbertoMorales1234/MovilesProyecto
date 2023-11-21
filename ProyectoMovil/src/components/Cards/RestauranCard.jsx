import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'

export const RestauranCard = ({item, onPress}) => {

    const {themeMode} = useAppContext()

  return (
    <TouchableOpacity onPress={onPress} style={styles(themeMode).container}>
        <Image source={item.image} style={styles(themeMode).image}/>
        <Text style={styles(themeMode).text}>{item.restaurantName}</Text>
    </TouchableOpacity>
  )
}

const styles = (theme) => StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        borderRadius: 20,
        backgroundColor: theme.SHADOW,
        paddingBottom: 10,
        marginBottom: 10,
    },
    image:{
        height: 180,
        width: 180, 
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    text:{
        fontSize: 20,
        fontWeight: '500',
        color: theme.GENERALTEXT
    },
})