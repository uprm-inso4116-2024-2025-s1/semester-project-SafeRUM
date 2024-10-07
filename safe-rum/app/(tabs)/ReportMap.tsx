import React, { useState, useEffect } from "react";
import MapView, { Circle } from "react-native-maps";
import { StyleSheet, View, Button, ActivityIndicator } from "react-native";
import * as Location from "expo-location";

//TODO: Implement Geofencing to check if user is on campus.

export default function App() {

  // Initial Map State
  const [mapRegion, setMapRegion] = useState({
    latitude: 18.2106,
    longitude: -67.1396,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });

  const circleProps = {
    latitude: 18.2106,
    longitude: -67.1396,
    radius: 500, // in meters
    strokeColor: '#FF0000', // red
  };

  const [isLoading, setIsLoading] = useState(false);


  // TODO: Add function signature
  async function userLocation() {
    setIsLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission to access location was denied");
      setIsLoading(false);
      return;
    }

    try {
      let userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setMapRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0030,
        longitudeDelta: 0.0030,
      });
    } catch (error) {
      console.error("Error getting location:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // ??
  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion} showsUserLocation={true}>
      <Circle
        center={  
        {
          latitude: 18.2106,
          longitude: -67.1396,}
        }
        radius={480}
        strokeWidth={10}
        strokeColor="green"
      />  
      </MapView>
      

      <View style={styles.buttonContainer}>
        <Button
          title={isLoading ? "Getting location..." : "Get location"}
          onPress={userLocation}
          disabled={isLoading}
        />
        {isLoading && <ActivityIndicator style={styles.loader} />}
      </View>
      


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  loader: {
    marginLeft: 10,
  },
});