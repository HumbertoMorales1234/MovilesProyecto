import React from 'react'
import { View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { FlatList } from 'react-native-gesture-handler'
import { ProductCard } from '../../components/Cards/ProductCard'

export const CarritoScreen = () => {

  const {kartProducts, themeMode} = useAppContext()
  return (
    <View style={{backgroundColor: themeMode.BACKGROUND, flex: 1}}>
        <FlatList
              data ={kartProducts}
              renderItem={({item}) => {
                return(
                    <ProductCard Product={item}/>
                )
              }}
            />
    </View>
  )
}
