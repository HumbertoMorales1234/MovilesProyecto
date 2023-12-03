import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { StarButton } from '../Buttons/StarButton';
import { ConfirmationButton } from '../Buttons/ConfirmationButton';


export const ReviewModal = ({dish, hideModal, calificado}) => {
    const {themeMode, handleCrearReview} = useAppContext()
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState(0)
    const [error, setError] = useState('')

    const handleSetRating = (value) =>{
        setRating(value)
    }

    const handleSaving = () =>{
        if(reviewText ==='' || rating === 0){
            setError('The Review is Incomplete')
            return
        }
        handleCrearReview(reviewText, rating, dish.id)
        setError('')
        calificado()
        hideModal()
    }

  return (
    <View style={styles(themeMode).container}>
        <View style={{width: '100%', paddingHorizontal:20, paddingVertical:5, flexDirection: 'row', alignItems:'center'}}>
            <TouchableOpacity onPress={hideModal}>
                <Feather name="x" size={28} color={themeMode.GENERALTEXT} />
            </TouchableOpacity>
            <Text style={styles(themeMode).title}>{dish.nombre}</Text>
        </View>
        <View style={styles(themeMode).inputContainer}>
            <Text style={styles(themeMode).label}>Rate the Plate</Text>
            <View style={{flexDirection:'row', gap: 10}}>
                <StarButton value={1} rate={rating} onPress={(value) => handleSetRating(value)}/>
                <StarButton value={2} rate={rating} onPress={(value) => handleSetRating(value)}/>
                <StarButton value={3} rate={rating} onPress={(value) => handleSetRating(value)}/>
                <StarButton value={4} rate={rating} onPress={(value) => handleSetRating(value)}/>
                <StarButton value={5} rate={rating} onPress={(value) => handleSetRating(value)}/>
            </View>
        </View>

        <View style={styles(themeMode).inputContainer}>
            <Text style={styles(themeMode).label}>Give us a comment!</Text>
            <TextInput style={styles(themeMode).input} maxLength={200} onChangeText={(value) => setReviewText(value)}/>
        </View>
        <Text style={{color: themeMode.ALERT}}>{error}</Text>
        <ConfirmationButton text={'Save'} width={350} onPress={() => handleSaving()}/>
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
        width: 350,
        borderColor:theme.CONTRAST,
        color:theme.GENERALTEXT, 
        paddingHorizontal: 5, 
        marginBottom: 10,
        textAlign:'left',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label:{
        color: theme.GENERALTEXT,
        fontWeight: '700',
    },
    title:{
        color: theme.GENERALTEXT,
        fontWeight: '700',
        fontSize: 25,
        marginLeft: 75,
    },
    error:{
        color: theme.ALERT,
        fontWeight: '600',
    }
})