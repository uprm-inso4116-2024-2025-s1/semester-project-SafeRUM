import React, { useState, useEffect, useRef, useCallback } from "react";
import MapView, { Circle, Marker, Callout } from "react-native-maps";
import {
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
  Alert,
  Text,
} from "react-native";
import * as Location from "expo-location";

// Sample data for pinned locations
const pinnedLocations = [
  {
    id: 1,
    name: "Ing. Industrial",
    lat: 18.2106,
    lon: -67.1396,
    reports: 5,
    dangerLevel: "High",
  },
  {
    id: 2,
    name: "Biologia",
    lat: 18.21279,
    lon: -67.13859,
    reports: 3,
    dangerLevel: "Medium",
  },
  {
    id: 3,
    name: "Stefani",
    lat: 18.20949,
    lon: -67.13984,
    reports: 1,
    dangerLevel: "Low",
  },
];

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 18.2106,
    longitude: -67.1396,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });

  const circleProps = {
    latitude: 18.2106,
    longitude: -67.1396,
    radius: 480, // in meters
    strokeColor: "green",
    strokeWidth: 10,
  };

  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(true);
  const mapViewRef = useRef<MapView | null>(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const userLocation = useCallback(async () => {
    setIsLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access location was denied. Please enable it in your device settings."
      );
      setIsLoading(false);
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      if (isMounted.current) {
        const newRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        };
        setMapRegion(newRegion);
        mapViewRef.current?.animateToRegion(newRegion, 1000);
        console.log(
          "Lat:",
          location.coords.latitude,
          "Lon:",
          location.coords.longitude
        );
      }
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Failed to get your location. Please try again.");
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    userLocation();
  }, [userLocation]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        region={mapRegion}
        showsUserLocation={true}
      >
        <Circle
          center={{
            latitude: circleProps.latitude,
            longitude: circleProps.longitude,
          }}
          radius={circleProps.radius}
          strokeWidth={circleProps.strokeWidth}
          strokeColor={circleProps.strokeColor}
        />
        {pinnedLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.lat, longitude: location.lon }}
            title={location.name}
          >
            <Callout tooltip>
              <View style={styles.calloutView}>
                <Text style={styles.calloutTitle}>{location.name}</Text>
                <Text>Reports: {location.reports}</Text>
                <Text>Danger Level: {location.dangerLevel}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
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
  calloutView: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 10,
    width: 150,
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
});
