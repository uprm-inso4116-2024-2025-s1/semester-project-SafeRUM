import React, {useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Button } from 'react-native';
import * as Location from 'expo-location';
export default function App() {
  
  const userLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({accuracy: 5});
    setMapRegion(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      }
    );
  }

  useEffect(() => {
    userLocation();
  }, []);

  const [mapRegion, setMapRegion] = useState(
    {
      latitude: 18.2106,
      longitude: -67.1396,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009,
    }
  );

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      // TODO: Set up map boundaries inside UPRM 
      showsUserLocation={true}
      />

      <Button title='get location' onPress={userLocation} />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '80%',
  },
});
