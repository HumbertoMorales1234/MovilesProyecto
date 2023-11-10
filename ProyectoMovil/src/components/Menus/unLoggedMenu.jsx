import React from 'react'
import { View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { IconButton } from '../Buttons/IconButton'
import { THEME } from '../../theme/Colors'
import { useNavigation } from '@react-navigation/native'

export const UnLoggedMenu = ({shouldGoBack}) => {
    const {themeMode, handleThemeChange} = useAppContext()
    const navigation = useNavigation()

    const habilitarRegreso = (back) =>{
        if(back){
            return(
                <IconButton iconName={'arrow-left'} onPress={() => navigation.goBack()}/>
            )
        }
    }
    
    const themeButton = (currentTHEME) =>{
        if(currentTHEME == THEME.LIGHT){
            return(<IconButton iconName={'sun'} onPress={() => handleThemeChange('DARK')}/>)
        }else{
            return(<IconButton iconName={'moon'} onPress={() => handleThemeChange('LIGHT')}/>)
        }
    }

  return (
    <View style={{paddingTop: 20, gap: 20, alignItems: 'center', justifyContent: 'space-between', width: 350, flexDirection: 'row'}}>
        {habilitarRegreso(shouldGoBack)}
        {themeButton(themeMode)}
    </View>
  )
}
