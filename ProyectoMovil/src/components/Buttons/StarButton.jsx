import React from 'react'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useAppContext } from '../../hooks/useAppContext';

export const StarButton = ({value, rate, onPress}) => {
    const {themeMode} = useAppContext()

    const define = () =>{
        if(value>rate){
            return(<AntDesign name="staro" size={40} color={themeMode.GENERALTEXT} />)
        }else{
            return(<AntDesign name="star" size={40} color={themeMode.GENERALTEXT} />) 
        }
    }

  return (
    <TouchableOpacity onPress={() => onPress(value)}>
        {define()}
    </TouchableOpacity>
  )
}
