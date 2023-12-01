import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { useScrollToTop } from '@react-navigation/native'
import { IconButton } from '../Buttons/IconButton'

export const SelectCard = ({card, onPress}) => {

    const {themeMode} = useAppContext()
    const [cardExp, setCardExp] = useState(0)

    useEffect(() => {formatExpireDate()},[])

    const formatExpireDate = () => {
        const value = card.expDate
        const cleanValue = value.replace(/\D/g, '');
        const formattedValue = cleanValue.match(/.{1,2}/g);
        const joinedValue = formattedValue ? formattedValue.join('/') : '';
        setCardExp(joinedValue);
      };

  return (
    <TouchableOpacity style={styles(themeMode).container} onPress={() => onPress(card)}>
        <Text>
            <Text style={[styles(themeMode).info, {fontSize: 25}]}>**** **** **** </Text>
            <Text style={styles(themeMode).info}>{card.number%10000}</Text>
        </Text>
        <Text style={[styles(themeMode).info, {fontWeight: '500'}]}>{card.holder}</Text>
        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <View>
                <Text style={styles(themeMode).label}>Expiraton Date</Text>
                <Text style={[styles(themeMode).info, {textAlign: 'left'}]}>{cardExp}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

const styles = (theme) => StyleSheet.create({
    container:{
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal:20,
        backgroundColor: theme.SHADOW_CONTRAST,
        width: 370,
        height: 170,
        marginBottom: 15,
        justifyContent: 'space-between' 
    },
    info:{
        color: theme.BACKGROUND,
        fontWeight: '900',
        fontSize: 20
    },
    label:{
        color: theme.BACKGROUND,
    }

})