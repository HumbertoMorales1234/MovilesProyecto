import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import { useAppContext } from '../../hooks/useAppContext';
import { LocationModal } from '../../components/Modals/LocationModal';

export const MyLocationScreen = () => {
  const { themeMode } = useAppContext();
  const [isModalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [inputAddress, setInputAddress] = useState('');

  const handleViewLocation = () => {
    setAddress(inputAddress);
    setModalVisible(true);
  };

  const handleSendAddress = () => {
    console.log('Sending address:', inputAddress);
  };

  return (
    <View style={styles(themeMode).container}>
      <Text style={styles(themeMode).title}>Configure my Location</Text>
      <TextInput
        style={styles(themeMode).input}
        placeholder="Enter your address"
        onChangeText={(text) => setInputAddress(text)}
        value={inputAddress}
      />

      <Button
        title="Send Address"
        onPress={handleSendAddress}
        disabled={!inputAddress}
      />

      <TouchableOpacity onPress={handleViewLocation}>
        <Text style={styles(themeMode).subTitle}>View my Location</Text>
      </TouchableOpacity>

      {isModalVisible && (
        <LocationModal
          hideModal={() => setModalVisible(false)}
          coordinates={null}
          address={address}
        />
      )}
    </View>
  );
};

const styles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.BACKGROUND,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: theme.GENERALTEXT,
      fontSize: 25,
      fontWeight: '600',
    },
    subTitle: {
      color: theme.GENERALTEXT,
      fontSize: 20,
      fontWeight: '400',
      marginTop: 10,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingLeft: 10,
      paddingRight: 10,
      width: '80%',
      backgroundColor: '#fff',
    },
  });
