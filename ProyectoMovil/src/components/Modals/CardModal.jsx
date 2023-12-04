import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { Feather } from '@expo/vector-icons'
import { ConfirmationButton } from '../Buttons/ConfirmationButton'
import { TouchableOpacity } from 'react-native'

export const CardModal = ({closeModal}) => {
    let card = {number: 0, holder: '', expDate: 0, sCode: 0}

    const {themeMode, handleCrearTarjeta} = useAppContext()

    const [cardNumber, setCardNumber] = useState(0)
    const [cardHolder, setCardHolder] = useState('')
    const [cardExp, setCardExp] = useState(0)
    const [cardSCode, setCardSCode] = useState(0)
    const [error, setError] = useState('')

    const formatCardNumber = (value) => {
        // Eliminar espacios en blanco y caracteres no numéricos
        const cleanValue = value.replace(/\D/g, '')
        // Dividir en secciones de 4 caracteres
        const formattedValue = cleanValue.match(/.{1,4}/g)
        // Unir las secciones con espacios
        const joinedValue = formattedValue ? formattedValue.join(' ') : ''
        setCardNumber(joinedValue)
      }
    
      const formatExpireDate = (value) => {
        const cleanValue = value.replace(/\D/g, '')
        const formattedValue = cleanValue.match(/.{1,2}/g)
        const joinedValue = formattedValue ? formattedValue.join('/') : ''
        setCardExp(joinedValue)
      }

      const handleSavePressed = (closeModal) =>{
        if(cardHolder === ''){
            setError('Incomplete or Invalid cardHolder')
            return
        }
        if(cardNumber.length != 19){

            setError('Incomplete or Invalid cardNumber: '+cardNumber.length+cardNumber+cardNumber.length)
            return
        }
        if(cardExp.length !=5){
            setError('Incomplete or Invalid cardExp')
            return
        }
        if(cardSCode.length !=3){
            setError('Incomplete or Invalid cardSCode')
            return
        }
        card.expDate= cardExp.toString().replace('/', '')
        date = new Date().getFullYear()
        if((card.expDate/100-card.expDate%100/100) > 12 || (card.expDate/100-card.expDate%100/100) < 1 || date%100>card.expDate%100){
            setError('La Fecha de expiración es incorrecta')
            return
        }
        card.number= (cardNumber.toString().replace(/\D/g, ''))
        card.holder= cardHolder
        card.sCode = cardSCode

        console.log("TARJETA"+card)
        handleCrearTarjeta(card)
        closeModal()
      }
    
    return (
        <View style={styles(themeMode).container}>
            <View style={{width: '100%', paddingHorizontal:20, paddingVertical:5}}>
                <TouchableOpacity onPress={closeModal}>
                    <Feather name="x" size={28} color={themeMode.GENERALTEXT} />
                </TouchableOpacity>
            </View>
            <View style={styles(themeMode).inputContainer}>
                <Text style={styles(themeMode).label}>Card Number</Text>
                <TextInput textContentType='creditCardNumber' style={[styles(themeMode).input,{width: 350}]} maxLength={19}
                value={cardNumber} onChangeText={(value) => formatCardNumber(value)} keyboardType='numeric'/>
            </View>
            <View style={styles(themeMode).inputContainer}>
                <Text style={styles(themeMode).label}>Card Holder</Text>
                <TextInput style={[styles(themeMode).input, {width: 350}]} value={cardHolder} onChangeText={(value) => setCardHolder(value)}/>
            </View>
            <View style={{flexDirection: 'row', gap: 20}}>
                <View style={styles(themeMode).inputContainer}>
                    <Text style={styles(themeMode).label}>Security Code</Text>
                    <TextInput textContentType='creditCardNumber' style={[styles(themeMode).input,{width:100}]} maxLength={3}
                    value={cardSCode} onChangeText={(value) => setCardSCode(value)} keyboardType='numeric'/>
                </View>
                <View style={styles(themeMode).inputContainer}>
                    <Text style={styles(themeMode).label}>Expiration Date</Text>
                    <TextInput textContentType='creditCardNumber' style={[styles(themeMode).input, { width: 100 }]} maxLength={5}
                    value={cardExp} onChangeText={(value) => formatExpireDate(value)} keyboardType='numeric'/>
                </View>
            </View>
            <Text style={styles(themeMode).error}>{error}</Text>
            <ConfirmationButton text={'Save'} width={350} onPress={() => handleSavePressed(closeModal)}/>
        </View>
      )
}

const styles = (theme) => StyleSheet.create({
    container:{
        width: 400,
        backgroundColor: theme.SHADOW,
        alignItems: 'center',    
        borderRadius: 20,
        gap: 10,
        paddingTop: 20,
        paddingBottom: 20,
    },
    inputContainer:{
        borderWidth: 1, 
        borderRadius: 20,
        borderColor: theme.CONTRAST,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        borderBottomWidth: 1, 
        height: 40, 
        borderColor:theme.CONTRAST,
        color:theme.GENERALTEXT, 
        paddingHorizontal: 5, 
        marginBottom: 10,
        textAlign:'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label:{
        color: theme.GENERALTEXT,
        fontWeight: '700',
    },
    error:{
        color: theme.ALERT,
        fontWeight: '600',
    }
})