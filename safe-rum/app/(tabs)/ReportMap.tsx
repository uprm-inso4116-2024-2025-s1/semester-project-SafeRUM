import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Button, ActivityIndicator } from "react-native";
import * as Location from "expo-location";

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 18.2106,
    longitude: -67.1396,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });
  const [isLoading, setIsLoading] = useState(false);

  async function userLocation() {
    setIsLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission to access location was denied");
      setIsLoading(false);
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0030,
        longitudeDelta: 0.0030,
      });
      console.log(
        "Lat:",
        location.coords.latitude,
        "Lon:",
        location.coords.longitude
      );
    } catch (error) {
      console.error("Error getting location:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion} showsUserLocation={true} />
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