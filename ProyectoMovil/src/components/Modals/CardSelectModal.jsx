import React, { useState } from 'react'
import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { IconTextButton } from '../Buttons/IconTextButton'
import { Feather } from '@expo/vector-icons';
import { IconButton } from '../Buttons/IconButton';
import { TouchableOpacity } from 'react-native';
import { SelectCard } from '../Cards/SelectCard';
import { ConfirmationButton } from '../Buttons/ConfirmationButton';



export const CardSelectModal = ({ hideModal}) => {

  const {themeMode, state,} = useAppContext()

  const contenido = () =>{
    if(state.userCards.length == 0){
      return(
        <View style={{ alignItems: 'center', height: 800, gap: 40}}>
            <Text style={styles(themeMode).subTitle}>Parece que no tienes tarjetas añadidas :(</Text>
            <Text style={styles(themeMode).subTitle}>Recuerda añadirlas en tu perfil</Text>
            <ConfirmationButton text={'Volver'} onPress={() => hideModal('')}/>
        </View>
      )
    }else{
      return(
        <View>
            <Text style={styles(themeMode).subTitle}>Select a Card</Text>
            <View style={{flex: 1}}>
              <FlatList
                data={state.userCards}
                renderItem={({item}) => {
                  return(
                      <SelectCard card={item} onPress={(value) => hideModal(value)}/>
                  )
                }}
              />
            </View>
          </View>
      )
    }
  }
  

  return (
    <View style={styles(themeMode).container}>

        <View style={styles(themeMode).top}>
          <TouchableOpacity onPress={() => hideModal('')}>
           <Feather name="x" size={28} color={themeMode.GENERALTEXT} />
          </TouchableOpacity>
        </View>
        {contenido()}
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
  container: {
    width: 400,
    backgroundColor: theme.SHADOW,
    alignItems: 'center',    
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 10
  },
  top:{
    width: 400,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title:{
    color: theme.GENERALTEXT,
    fontSize: 25,
    fontWeight: '600',
  },
  subTitle:{
    color: theme.GENERALTEXT,
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: '500',
  },
  simpleText: {
    color: theme.GENERALTEXT,
    fontSize: 15,
  },
})