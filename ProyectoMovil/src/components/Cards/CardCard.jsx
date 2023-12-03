import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { useScrollToTop } from '@react-navigation/native'
import { IconButton } from '../Buttons/IconButton'

export const CardCard = ({card}) => {

    const {themeMode, handleDeleteCard} = useAppContext()
    const [cardExp, setCardExp] = useState(0)

    useEffect(() => {
        if(card.expDate){
            formatExpireDate()
        }
    },[])

    const formatExpireDate = () => {
        var value
        if(card.expDate<1000){
            value = '0'+ card.expDate
        }else{
            value = ''+ card.expDate
        }
        const cleanValue = value.replace(/\D/g, '');
        const formattedValue = cleanValue.match(/.{1,2}/g);
        const joinedValue = formattedValue ? formattedValue.join('/') : '';
        setCardExp(joinedValue);
      };

  return (
    <View style={styles(themeMode).container}>
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
            <IconButton iconName={'trash-2'} color={themeMode.ALERT} onPress={() => handleDeleteCard(card)}/>
        </View>
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
    container:{
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal:20,
        backgroundColor: theme.SHADOW,
        width: 370,
        height: 170,
        marginBottom: 15,
        justifyContent: 'space-between' 
    },
    info:{
        color: theme.GENERALTEXT,
        fontWeight: '900',
        fontSize: 20
    },
    label:{
        color: theme.GENERALTEXT,
    }

})