import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconTextButton } from '../../components/Buttons/IconTextButton'
import { useAppContext } from '../../hooks/useAppContext'
import { THEME } from '../../theme/Colors'

export const SettingsScreen = () => {

  const {themeMode, handleThemeChange} = useAppContext()

  const themeButton = () => {
    if(themeMode === THEME.LIGHT){
      return(
        <IconTextButton text='Light Mode' iconName='sun' onPress={() => handleThemeChange('DARK')}/>
      )
    }else{
      return(
        <IconTextButton text='Dark Mode' iconName='moon' onPress={() => handleThemeChange('LIGHT')}/>
      )
    }
  }

  return (
    <View style={styles(themeMode).container}>
        <View style={{gap: 10}}>
          <Text style={styles(themeMode).titles}>Theme</Text>
          {themeButton()}
        </View>
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.BACKGROUND,
  },
  titles:{
    fontSize: 25,
    fontWeight: '700',
    color: theme.GENERALTEXT
  },
  simpleTexts:{

  },
})
