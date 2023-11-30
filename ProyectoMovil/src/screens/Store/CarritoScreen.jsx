import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { FlatList } from 'react-native-gesture-handler'
import { ProductCard } from '../../components/Cards/ProductCard'
import { ConfirmationButton } from '../../components/Buttons/ConfirmationButton'

export const CarritoScreen = () => {

  const {kartProducts, themeMode, handleEmptyKart,} = useAppContext();
  const [total, setTotal] = useState(0);
  //setTotal(0)

  useEffect(() => {
    const calcular = () => {
      let acumulado = 0;

      kartProducts.forEach(product => {
        acumulado += product.dish.price * product.cantidad;
      });

      setTotal(acumulado);
    };

    calcular();
  }, [kartProducts]);

  return (
    <View style={styles(themeMode).container}>
      <Text style={styles(themeMode).totalText}>Total: $ {total}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '100%'}}>
        <ConfirmationButton text={'Pay'} width={200} color={themeMode.HIGHLIGHT}/>
        <ConfirmationButton text={'Erase Cart'} width={200} onPress={() => handleEmptyKart()} color={themeMode.SHADOWCONTRAST}/>
      </View>
      <View style={{flex: 1, width: '100%'}}>
        <FlatList
              data ={kartProducts}
              renderItem={({item}) => {
                return(
                    <ProductCard Product={item}/>
                )
              }}
            />
      </View>
    </View>
  )
}

const styles =(theme) =>StyleSheet.create({
  container:{
    backgroundColor: theme.BACKGROUND, 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingTop: 20
  },
  totalText:{
    fontSize: 25,
    fontWeight: '600',
    color: theme.GENERALTEXT,
  },
})
