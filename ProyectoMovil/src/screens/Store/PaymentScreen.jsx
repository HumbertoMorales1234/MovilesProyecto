import React, { useState } from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { PagoButton } from '../../components/Buttons/PagoButton'
import { CardSelectModal } from '../../components/Modals/CardSelectModal'
import { ConfirmationButton } from '../../components/Buttons/ConfirmationButton'

export const PaymentScreen = ({navigation, route}) => {
    const {total} = route.params
    const {themeMode} = useAppContext()
    const [paymentMethod, setPaymentMethod] = useState('')
    const [selectedCard, setSelectedCard] = useState()
    const [modalVisible, setModalVisibility] = useState(false)
    const [error, setError] = useState('')


    const handlePaymentSelection = (type) =>{
      setPaymentMethod(type)
    }

    const handleCardSelection = (type) =>{
      setPaymentMethod(type)
      setModalVisibility(true)
    }

    const handleModalClosure = (card) =>{
      setModalVisibility(false)
      if(card == ''){
        setError('Debes seleccionar una tarjeta para pagar con tarjeta')
        setPaymentMethod('')
      }else{
        setError('')
        setSelectedCard(card)
      }
    }

    const handlePayment = ()=>{

    }

    const handleMissingMethod = () =>{
      setError('Please Select a Payment Method')
    }
  return (
    <View style={styles(themeMode).container}>
        <Text style={styles(themeMode).title}>Total: {total} $</Text>
        <View style={{justifyContent: 'center', alignItems: 'center', gap: 40}}>
          <Text style={styles(themeMode).subtitle}>Selecciona tu método de pago: </Text>
          <PagoButton type={'Tarjeta'} iconName={'credit-card'} selected={paymentMethod} onPress={(type) => handleCardSelection(type)}/>
          <PagoButton type={'Efectivo'} iconName={'money'} selected={paymentMethod} onPress={(type) => handlePaymentSelection(type)}/>
        </View>
        <Text style={{color:themeMode.ALERT}}>{error}</Text>
        <ConfirmationButton text={'Realizar la Compra'} color={paymentMethod===''&&themeMode.SHADOW} onPress={paymentMethod===''?()=>handleMissingMethod():()=>handlePayment()}/>
        <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    handleModalClosure('');
                }}
                >
                <View style={styles(themeMode).Modal}>
                    <CardSelectModal hideModal={(value) => handleModalClosure(value)}/>
                </View> 
            </Modal>
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
    container:{
        backgroundColor: theme.BACKGROUND,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 20,
    },
    title:{
        color: theme.GENERALTEXT,
        fontWeight: '700',
        fontSize: 30,
    },
    subtitle:{
        color: theme.GENERALTEXT,
        fontSize: 20,
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