import React from 'react'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { useAppContext } from '../../hooks/useAppContext';

export const MyReviewCard = ({review}) => {

    const {themeMode} = useAppContext()

  return (
    <View style={{justifyContent: 'space-between', alignItems:'center', 
            gap: 20, borderColor: themeMode.CONTRAST, borderBottomWidth: 1, width: 350, paddingVertical: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 350}}>
          <Text style={{color: themeMode.GENERALTEXT, fontSize: 18, fontWeight: '700', maxWidth: 300,}}>{review.producto}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10}}>
              <Feather name="star" size={24} color={themeMode.GENERALTEXT} />
              <Text style={{color: themeMode.GENERALTEXT, fontSize: 21}}>{review.calificacion}</Text>
          </View>
        </View>
        <Text style={{color: themeMode.GENERALTEXT, width: 340, textAlign: 'left'}}>{review.texto}</Text>
    </View>
  )
}
