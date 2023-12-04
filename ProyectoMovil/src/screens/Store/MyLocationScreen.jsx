import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { useNavigation } from '@react-navigation/native'
import { IconButton } from '../../components/Buttons/IconButton'
import { RegisterInput } from '../../components/Inputs/RegisterInput'
import { ConfirmationButton } from '../../components/Buttons/ConfirmationButton'
import { useState } from 'react'

export const MyLocationScreen = () => {
    const {themeMode, handleUpdateLocation, state} = useAppContext()
    const navigation = useNavigation()
    const [myLocation, setMyLocation] = useState(state.userLocation)
    const [error, setError] = useState('')

    const saveLocation = () =>{
        if (myLocation === ""){
            setError('Agrega una ubicación')
        }else if( myLocation.length < 7){
            setError('Agrega una ubicación válida')
        }else{
            handleUpdateLocation(myLocation)
        }
    }
  return (
    <View style={styles(themeMode).container}>
        <View style ={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10, gap: 30, width: '100%', paddingVertical: 10}}>
            <IconButton iconName={'arrow-left'} onPress={()=> navigation.goBack()} />
            <Text style={styles(themeMode).title}>Configure my Location</Text>
        </View>
        <RegisterInput label={'Ubicación'} iconName={'map-pin'} onChangeText={(value) => setMyLocation(value)}/>
        <Text style={{color: themeMode.ALERT}}>{error}</Text>
        <ConfirmationButton text={'Guardar'} onPress={() => saveLocation()}/>
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
