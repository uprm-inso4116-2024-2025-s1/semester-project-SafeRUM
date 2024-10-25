import React, { useState, useEffect, useRef, useCallback } from "react";
import MapView, { Circle } from "react-native-maps";
import {
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
  Alert,
  ScrollView,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import Pin from "@/components/Pin";

// Sample data for pinned locations
const uprm_main_locations = [
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
  {
    id: 4,
    name: "Quimica",
    lat: 18.21279,
    lon: -67.14086,
    reports: 2,
    dangerLevel: "Medium",
  },
  {
    id: 5,
    name: "Fisica",
    lat: 18.21111,
    lon: -67.13916,
    reports: 4,
    dangerLevel: "High",
  },
  {
    id: 6,
    name: "Chardon",
    lat: 18.21044,
    lon: -67.1403,
    reports: 0,
    dangerLevel: "None",
  },
  {
    id: 7,
    name: "Biblioteca",
    lat: 18.21106,
    lon: -67.14171,
    reports: 6,
    dangerLevel: "High",
  },
  {
    id: 8,
    name: "Sanchez Hidalgo",
    lat: 18.21166,
    lon: -67.1403,
    reports: 0,
    dangerLevel: "None",
  },
  {
    id: 9,
    name: "Centro de Estudiantes",
    lat: 18.21025,
    lon: -67.14114,
    reports: 3,
    dangerLevel: "Medium",
  },
  {
    id: 10,
    name: "Celis",
    lat: 18.20936,
    lon: -67.14088,
    reports: 3,
    dangerLevel: "Medium",
  },
  {
    id: 11,
    name: "Antonio Lucchetti",
    lat: 18.20859,
    lon: -67.14004,
    reports: 3,
    dangerLevel: "Medium",
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
    radius: 480,
    strokeColor: "green",
    strokeWidth: 10,
  };

  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(true);
  const mapViewRef = useRef<MapView | null>(null);
  const [showReports, setShowReports] = useState(false);

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
        <Circle
          center={{
            latitude: circleProps.latitude,
            longitude: circleProps.longitude,
          }}
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
        <TouchableOpacity
          style={styles.reportsButton}
          onPress={() => setShowReports(true)}
        >
          <Text style={styles.reportsButtonText}>Reports</Text>
        </TouchableOpacity>
        {isLoading && <ActivityIndicator style={styles.loader} />}
      </View>
      <Modal
        visible={showReports}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowReports(false)} // To handle hardware back button on Android
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Location Reports</Text>
            <ScrollView>
              {uprm_main_locations.map((location) => (
                <View key={location.id} style={styles.reportItem}>
                  <Text style={styles.locationText}>
                    {location.name}: {location.reports} reports
                  </Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowReports(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> 
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  loader: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reportItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#2196F3",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  locationText: {
    fontSize: 16,
  },
  reportsButton: {
    padding: 10,
    backgroundColor: "red", 
    borderRadius: 10, 
  },
  reportsButtonText: {
    color: "white", 
    fontSize: 16,
  },
});