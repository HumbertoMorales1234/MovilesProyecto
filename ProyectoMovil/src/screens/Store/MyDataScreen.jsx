import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useAppContext } from '../../hooks/useAppContext'
import { useNavigation } from '@react-navigation/native'
import { IconButton } from '../../components/Buttons/IconButton'
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { RegisterInput } from '../../components/Inputs/RegisterInput'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ConfirmationButton } from '../../components/Buttons/ConfirmationButton'

export const MyDataScreen = () => {
  const {themeMode, state, handleUpdateUser} = useAppContext()
  const navigation = useNavigation()
  const [statusLibrary, requestLibraryPermission] = ImagePicker.useMediaLibraryPermissions();
  const [selectedPicture, setSelectedPicture] = useState(state.userpic)
  const [username, setUsername] = useState(state.username)
  const [phone, setPhone] = useState(0)
  const [error, setError] = useState('')
 


  useEffect(() => {
    const getPerms = async () => {
        await requestLibraryPermission()
    }
    getPerms()
    formatPhone(state.userphone)
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
              setSelectedPicture(result.assets[0].uri)
           }
        }
    } catch (error){
        console.log(error)
    }        
  }


  const formatPhone = (value) => {
    // Eliminar espacios en blanco y caracteres no numéricos
    const cleanValue = value.replace(/\D/g, '');
    // Dividir en secciones de 3 - 3 - 4 caracteres
    const formattedValue = cleanValue.match(/.{1,3}/g);
    //const formattedValue = cleanValue.match(/(\d{3})(\d{3})(\d{4})$/);
    // Unir las secciones con espacios
    const joinedValue = formattedValue ? formattedValue.join(' ') : '';
    setPhone(joinedValue);
  };

  const handleSaveChanges = () =>{
    if(phone.length < 13 || username=== ""){
      setError('Incomplete Data')
    }
    else{
      var cleanPhone = phone.replace(/\D/g, '')
      handleUpdateUser(selectedPicture, username, cleanPhone)
      setError('')
      navigation.goBack()
    }
  }

  return (
    <View style={styles(themeMode).container}>
        <View style ={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10, gap: 30, width: '100%', paddingVertical: 10}}>
            <IconButton iconName={'arrow-left'} onPress={()=> navigation.goBack()} />
            <Text style={styles(themeMode).title} >Update my Data</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={styles(themeMode).imageContainer} onPress={() => loadFile()}>
              <Image source={{uri: selectedPicture}} style={styles(themeMode).image}/>
              <Feather name="edit" size={30} color={themeMode.GENERALTEXT} style={styles(themeMode).editIcon}/>
          </TouchableOpacity>
        </View>
        
        <View style={{gap: 30}}>
          <RegisterInput label={'Username'} inputValue={username} max={10} onChangeText={(value) => setUsername(value)}/>
          <RegisterInput label={'Phone'} inputValue={phone} type={'telephoneNumber'} keyboardType={'number-pad'} onChangeText={(value) => formatPhone(value)} max={13}/>
        </View>
        <Text style={{color: themeMode.ALERT}}>{error}</Text>
        <ConfirmationButton text={'Save Changes'} onPress={() => handleSaveChanges()}/>
    </View>
  )
}

const styles = (theme) => StyleSheet.create({
  container:{
    backgroundColor: theme.BACKGROUND,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 60,
  },
  title:{
    color: theme.GENERALTEXT,
    fontSize: 30,
    fontWeight: '500',
  },
  imageContainer:{
    borderWidth: 2, 
    borderColor: theme.GENERALTEXT,
    borderRadius: 200,
    width: 220,
    height: 220,
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
    right: 10,
    bottom: 10,
  },
})
