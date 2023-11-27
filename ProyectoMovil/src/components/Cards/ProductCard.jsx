import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { IconButton } from '../Buttons/IconButton'

export const ProductCard = ({Product}) => {
    const {themeMode, handleDeleteFromKart, handleReduceCuantity, handleIncreaseCuantity} = useAppContext()



  return (
    <View style={styles(themeMode).container}>
        <Text style={styles(themeMode).title} >{Product.dish.dishName}</Text>
        <View style={styles(themeMode).menu}>
            <View style={styles(themeMode).data}>
                <View>
                    <Text style={styles(themeMode).simpleText}>Price: </Text>
                    <Text style={styles(themeMode).simpleText}>$ {Product.dish.price}</Text>
                </View>
                <View>
                    <Text style={styles(themeMode).simpleText}>Selected: </Text>
                    <Text style={styles(themeMode).simpleText}>{Product.cantidad}</Text>
                </View>
                <View>
                    <Text style={styles(themeMode).simpleText}>Total:</Text>
                    <Text style={styles(themeMode).simpleText}>$ {Product.cantidad * Product.dish.price}</Text>
                </View>
            </View>
            <View style={styles(themeMode).options}>
                <IconButton iconName={'trash-2'} color={themeMode.ALERT} onPress={() => handleDeleteFromKart(Product.dish.dishName)}/>
                <IconButton iconName={'minus'} onPress={() => handleReduceCuantity(Product.dish.dishName)}/>
                <IconButton iconName={'plus'} onPress={() => handleIncreaseCuantity(Product.dish.dishName)}/>
            </View>
        </View>
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
    container:{
        paddingHorizontal: 17,
        paddingVertical: 10,
        borderBottomColor: theme.SHADOW_CONTRAST,
        borderBottomWidth: 1,
        justifyContent: 'center',
        gap: 15,
    },
    menu:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    data:{
        flexDirection: 'row',
        gap: 20,
    },
    options:{
        flexDirection: 'row',
        gap: 10,
    },
    title:{
        color: theme.HIGHLIGHT, 
        fontWeight: '600',
        fontSize: 18,
    },
    simpleText:{
        color: theme.GENERALTEXT,
    },
})
