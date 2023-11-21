import React from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { useAppContext } from '../../hooks/useAppContext';

export const SearchBar = ({onPress, onChangeText, value, placeholder}) => {

    const {themeMode} = useAppContext()

  return (
    <View style={styles(themeMode).container}>
        <TouchableOpacity onPress={onPress}>
            <Feather name="search" size={24} color={themeMode.GENERALTEXT} style={styles(themeMode).button}/>
        </TouchableOpacity>
        <TextInput value={value} onChangeText={onChangeText} style={styles(themeMode).searchbar} placeholder={placeholder} placeholderTextColor={themeMode.CONTRAST}/>
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        borderColor: theme.CONTRAST,
        borderWidth: 1,
        //width: 350,
        borderRadius: 20,
        paddingHorizontal: 25,
        paddingVertical:7,
    },
    button:{
        borderRightWidth: 1,
        borderColor: theme.CONTRAST,
        paddingRight: 20
    },
    searchbar:{
        borderBottomWidth: 1,
        borderColor: theme.CONTRAST,
        width: 250,
        color: theme.GENERALTEXT,
        paddingHorizontal: 10
    },
})
