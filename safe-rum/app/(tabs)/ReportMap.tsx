import React, { useState, useEffect, useRef, useCallback } from "react";
import MapView, { Circle } from "react-native-maps";
import {
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import Pin from "@/components/Pin";
import {uprm_main_locations, circleProps} from "@/constants/ReportMapConstants";
import CircleComponent from "@/components/UprmBounds";

export default function App() {
  
  // Set initial Value
  const [mapRegion, setMapRegion] = useState({
    latitude: 18.2106,
    longitude: -67.1396,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });

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
        <CircleComponent
          latitude={circleProps.latitude}
          longitude={circleProps.longitude}
          radius={circleProps.radius}
          strokeWidth={circleProps.strokeWidth}
          strokeColor={circleProps.strokeColor}
        />
          
        {uprm_main_locations.map((location) => (
          <Pin
            key={location.id}
            location={{ ...location, id: location.id.toString() }}
          /> // Use the Pin component
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
});