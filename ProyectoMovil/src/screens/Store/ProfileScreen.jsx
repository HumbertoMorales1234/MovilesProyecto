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
    const {themeMode, state, handleUpdateUser, handleThemeChange} = useAppContext()
    const [statusLibrary, requestLibraryPermission] = ImagePicker.useMediaLibraryPermissions();
    const navigation = useNavigation()


    useEffect(() => {
        const getPerms = async () => {
            await requestLibraryPermission()
        }
        getPerms()
    }, [])

    const loadFile = async () => {
        try{
            if(statusLibrary){
                const result = await ImagePicker.launchImageLibraryAsync({
                   mediaTypes: ImagePicker.MediaTypeOptions.All,
                   allowsEditing: false,
                   aspect: [3, 3],
                   quality: 1,
                   exif: true,
                   allowsEditing: true,
               })

               if(!result.canceled){
                   handleUpdateUser(result.assets[0].uri)
               }
            }
        } catch (error){
            console.log(error)
        }        
    }

    const handlePressedMyCards = () =>{
        navigation.navigate('MyCards')
      }
    
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
            <TouchableOpacity style={styles(themeMode).imageContainer} onPress={() => loadFile()}>
                <Image source={{uri: state.userpic}} style={styles(themeMode).image}/>
                <Feather name="edit" size={24} color={themeMode.GENERALTEXT} style={styles(themeMode).editIcon}/>
            </TouchableOpacity>
            <Text style={styles(themeMode).nameText}>{state.username}</Text>
        </View>

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
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
        width: 100, 
        height: 100,
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