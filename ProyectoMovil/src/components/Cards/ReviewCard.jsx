import React from 'react'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { useAppContext } from '../../hooks/useAppContext';

export const ReviewCard = ({review}) => {

    const {themeMode} = useAppContext()

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', 
            gap: 20, borderColor: themeMode.CONTRAST, borderBottomWidth: 1, width: 300, paddingVertical: 15}}>
        <Text style={{color: themeMode.GENERALTEXT}}>{review.text}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10}}>
            <Feather name="star" size={24} color={themeMode.GENERALTEXT} />
            <Text style={{color: themeMode.GENERALTEXT, fontSize: 21}}>{review.stars}</Text>
        </View>
    </View>
  )
}
