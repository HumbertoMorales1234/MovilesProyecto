import React, { useState } from 'react'
import { FlatList, Modal, StyleSheet, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { ConfirmationButton } from '../../components/Buttons/ConfirmationButton'
import { CardModal } from '../../components/Modals/CardModal'
import { CardCard } from '../../components/Cards/CardCard'

export const MyCardsScreen = () => {
    const {themeMode, state, }= useAppContext()
    const [modalVisible, setModalVisibility] = useState(false)

    const muestraModal = () =>{
        setModalVisibility(true)
    }
    const hideModal = () =>{
        setModalVisibility(false)
    }
  return (
    <View style={styles(themeMode).container}>
      <ConfirmationButton text={'Add a Card'} onPress={() => muestraModal()}/>
      <View style={{gap: 10, flex: 1, paddingTop: 20, paddingBottom: 10}}>
            
            <FlatList
              data ={state.userCards}
              renderItem={({item}) => {
                return(
                    <CardCard card={item}/>
                )
              }}
            />
        </View>
      <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    setModalVisibility(!modalVisible);
                }}
                >
                <View style={styles(themeMode).Modal}>
                    <CardModal closeModal={() => hideModal()}/>
                </View> 
            </Modal>
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
  container:{
    flex: 1,
    paddingTop:20,
    backgroundColor: theme.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Modal:{
    width: 250,
    justifyContent:'center',
    alignItems: 'center',
    paddingBottom: 10,
    borderRadius: 20,
    gap: 10,
    marginTop: 250,
    marginLeft: '20%',
},

})