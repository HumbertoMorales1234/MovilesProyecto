import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Joe } from '../../../assets'
import { useAppContext } from '../../hooks/useAppContext'
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconTextButton } from '../../components/Buttons/IconTextButton';
import { useNavigation } from '@react-navigation/native';
import { THEME } from '../../theme/Colors';


export const ProfileScreen = () => {
    const {themeMode, state, handleThemeChange} = useAppContext()
    const navigation = useNavigation()
    
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
        <View style={{alignItems: 'center'}}>
            <View style={styles(themeMode).imageContainer}>
                <Image source={{uri: state.userpic}} style={styles(themeMode).image}/>
            </View>
            <Text style={styles(themeMode).nameText}>{state.username}</Text>
        </View>

        <IconTextButton iconName={'key'} text={'Change Password'} onPress={() =>  navigation.navigate('ChangePass')}/>

        <IconTextButton iconName={'user'} text={'Update my Data'} onPress={() =>  navigation.navigate('MyData')}/>

        <IconTextButton iconName={'credit-card'} text={'My Cards'} onPress={() =>  navigation.navigate('MyCards')}/>

        <IconTextButton iconName={'edit-3'} text={'My Reviews'} onPress={() =>  navigation.navigate('MyReviews')}/>

        <IconTextButton iconName={'map-pin'} text={'My Location'} onPress={() =>  navigation.navigate('MyLocation')}/>

        {themeButton()}
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.BACKGROUND,
        gap: 20,
        paddingTop: 30,
    },
    imageContainer:{
        borderWidth: 2, 
        borderColor: theme.GENERALTEXT,
        borderRadius: 200,
        width: 215,
        height: 215,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
        width: 200, 
        height: 200,
        borderRadius: 200,
    },
    editIcon:{
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    nameText:{
        color: theme.GENERALTEXT,
        fontSize: 20,
        fontWeight: '600'
    },
})