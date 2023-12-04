import React, { useState } from 'react'
import { Image, Modal, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useAppContext } from '../../hooks/useAppContext'

import { Ramen } from '../../../assets'
import { DishModal } from '../Modals/DishModal'

export const DishCard = ({onPress, dish}) => {

    const {themeMode} = useAppContext()
    const [modalVisible, setModalVisibility] = useState(false)

    const muestraModal = () =>{
        setModalVisibility(true)
    }
    const hideModal = () =>{
        setModalVisibility(false)
    }

  return (
    // <TouchableOpacity style={styles(themeMode).container}>
    //     <Image source={Ramen} style={styles(themeMode).image}/>
    <TouchableOpacity style={styles(themeMode).container} onPress={muestraModal}>
        <Image source={{uri: dish.imagen}} style={styles(themeMode).image}/>
        <View style={{ width: 150, alignItems: 'center'}}>
            <Text style={styles(themeMode).title}>{dish.dishName}</Text>
        </View>
        <Text style={styles(themeMode).priceText}>{dish.price} $</Text>
        <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    setModalVisibility(!modalVisible);
                }}
                >
                <View style={styles(themeMode).Modal}>
                    <DishModal dish={dish} hideModal={() => hideModal()}/>
                </View> 
            </Modal>
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
    Modal:{
        //backgroundColor: 'white',
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
