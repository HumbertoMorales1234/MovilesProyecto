import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'

export const MyLocationScreen = () => {
    const {themeMode} = useAppContext()

  return (
    <View style={styles(themeMode).container}>
        <Text style={styles(themeMode).title}>Configure my Location</Text>
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
    container:{
        backgroundColor: theme.BACKGROUND,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        color: theme.GENERALTEXT,
        fontSize: 25,
        fontWeight: '600',
    },
})
