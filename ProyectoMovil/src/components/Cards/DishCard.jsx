import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useAppContext } from '../../hooks/useAppContext'
import { Ramen } from '../../../assets'

export const DishCard = ({onPress, dish}) => {

    const {themeMode} = useAppContext()

  return (
    <TouchableOpacity style={styles(themeMode).container}>
        <Image source={Ramen} style={styles(themeMode).image}/>
        <View style={{ width: 150, alignItems: 'center'}}>
            <Text style={styles(themeMode).title}>{dish.dishName}</Text>
        </View>
        <Text style={styles(themeMode).priceText}>{dish.price} $</Text>
    </TouchableOpacity>
  )
}

const styles = (theme) => StyleSheet.create({
    container:{
        flexDirection: 'row',
        borderColor: theme.SHADOW,
        borderBottomWidth: 1, 
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: 400,
    },
    image:{
        borderRadius: 20,
        width: 100, 
        height: 100, 
    },
    title:{
        color: theme.GENERALTEXT,
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center'
    },
    priceText:{
        color: theme.GENERALTEXT,
        fontSize: 15,
    },
})
