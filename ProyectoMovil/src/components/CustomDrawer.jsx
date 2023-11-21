import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import { useAppContext } from '../hooks/useAppContext'
import { StyleSheet } from 'react-native'

export const CustomDrawerContent = (props) => {
    const {handleLogOut, themeMode} =useAppContext()

  return (
    <DrawerContentScrollView {...props} style={styles(themeMode).container}>
      <DrawerItemList {...props} />
      <DrawerItem label="Log Out" onPress={() => handleLogOut()} style={styles(themeMode).item} labelStyle={styles(themeMode).item}/>
    </DrawerContentScrollView>
  )
}

const styles = (theme) => StyleSheet.create({
    container:{
      backgroundColor: theme.BACKGROUND
    },
    item:{
      color: theme.GENERALTEXT
    },
})