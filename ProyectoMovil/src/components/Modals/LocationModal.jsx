import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export const LocationModal = ({ hideModal, coordinates, address }) => {
  const [geocodedLocation, setGeocodedLocation] = useState(coordinates);

  useEffect(() => {
    if (!coordinates && address) {
      // Geocode the address using Google Maps Geocoding API
      const apiKey = 'AIzaSyCuzRSb77Lb2psqLlycmfDnjC7n-xUEj28';
      const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`;

      const getGeocodedLocation = async () => {
        try {
          const response = await fetch(geocodingApiUrl);
          const data = await response.json();

          if (data.status === 'OK' && data.results.length > 0) {
            const result = data.results[0].geometry.location;
            setGeocodedLocation(result);
          } else {
            console.error('Error geocoding address:', data.status);
          }
        } catch (error) {
          console.error('Error during geocoding:', error);
        }
      };

      getGeocodedLocation();
    }
  }, [coordinates, address]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={hideModal}>
        <Text style={styles.closeButton}>Close</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Location: {address}</Text>

      {geocodedLocation ? (
        <View>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: geocodedLocation.lat,
              longitude: geocodedLocation.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: geocodedLocation.lat,
                longitude: geocodedLocation.lng,
              }}
              title="Location"
              description={address}
            />
          </MapView>
        </View>
      ) : (
        <Text style={styles.errorText}>Unable to retrieve location for: {address}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
    paddingTop: 90,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  closeButton: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  map: {
    width: 420,
    height: 250,
    marginTop: 10,
  },
});
