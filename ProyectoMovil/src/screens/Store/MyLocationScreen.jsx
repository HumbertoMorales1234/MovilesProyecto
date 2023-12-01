import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { useNavigation } from '@react-navigation/native'
import { IconButton } from '../../components/Buttons/IconButton'

export const MyLocationScreen = () => {
    const {themeMode} = useAppContext()
    const navigation = useNavigation()

  return (
    <View style={styles(themeMode).container}>
        <View style ={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10, gap: 30, width: '100%', paddingVertical: 10}}>
            <IconButton iconName={'arrow-left'} onPress={()=> navigation.goBack()} />
            <Text style={styles(themeMode).title}>Configure my Location</Text>
        </View>
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
        fontSize: 30,
        fontWeight: '500',
    },
})
