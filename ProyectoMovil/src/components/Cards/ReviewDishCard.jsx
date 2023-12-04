import React, { useState } from 'react'
import { Image, Modal, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useAppContext } from '../../hooks/useAppContext'
import { DishModal } from '../Modals/DishModal'
import { ReviewModal } from '../Modals/ReviewModal'

export const ReviewDishCard = ({onPress, dish, estado, errorDelivery}) => {

    const {themeMode} = useAppContext()
    const [modalVisible, setModalVisibility] = useState(false)
    const [calificado, setCalificado] = useState(false)

    const muestraModal = () =>{
        if(estado==="Entregado"){
            if(calificado){
                errorDelivery('No puede calificar 2 veces')
                return
            }
            setModalVisibility(true)
        }else{
            errorDelivery('No puedes calificar un pedido que aún no recibes.')
        }
    }
    const hideModal = () =>{
        setModalVisibility(false)
    }

    const reviewGuardada = () =>{
        setCalificado(true)
    }

  return (
    <TouchableOpacity style={styles(themeMode).container} onPress={muestraModal}>
        <Image source={{uri: dish.imagen}} style={styles(themeMode).image}/>
        <View style={{ width: 150, alignItems: 'center'}}>
            <Text style={styles(themeMode).title}>{dish.nombre}</Text>
        </View>
        <Text style={styles(themeMode).priceText}>{dish.precio} $</Text>
        <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    setModalVisibility(!modalVisible)
                }}
                >
                <View style={styles(themeMode).Modal}>
                    <ReviewModal dish={dish} hideModal={() => hideModal()} calificado={() => reviewGuardada()}/>
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
