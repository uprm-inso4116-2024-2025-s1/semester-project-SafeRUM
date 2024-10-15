import React, { useState, useEffect, useRef, useCallback } from "react";
import MapView, { Circle } from "react-native-maps";
import { StyleSheet, View, ActivityIndicator, Alert, TouchableOpacity, Text,Image } from "react-native";
import * as Location from "expo-location";

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
    strokeColor: 'green',
    strokeWidth: 10,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [showNav, setShowNav] = useState(true); // Initially show navigation
  const isMounted = useRef(true);
  const mapViewRef = useRef<MapView>(null);

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
      let userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      if (isMounted.current) {
        const newRegion = {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.0030,
          longitudeDelta: 0.0030,
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
      </MapView>

      {showNav && (
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.toggleButton} onPress={() => setShowNav(false)}>
            <Image 
              source={require('../../assets/images/DownArrowButton.png')} // Use require to load the image
              style={styles.imageIconArrow} // Use your custom styles
            />
          </TouchableOpacity>
          
           
           <TouchableOpacity style={styles.navItem}>
            <Image 
              source={require('../../assets/images/AddReportButton.png')} // Use require to load the image
              style={styles.imageIcon} // Use your custom styles
            />
          </TouchableOpacity>


        
          <TouchableOpacity 
            style={styles.navItem}
            onPress={userLocation}
            disabled={isLoading}
          >
            <Image 
              source={require('../../assets/images/MyLocationButton.png')} // Use require to load the image
              style={styles.imageIcon} // Use your custom styles
            />
            {isLoading && <ActivityIndicator style={styles.loader} color="white" />}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navItem}>
            <Image 
              source={require('../../assets/images/BellReportButton.png')} // Use require to load the image
              style={styles.imageIcon} // Use your custom styles
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Only show the up button when the navigation is hidden */}
      {!showNav && (
        <View style={styles.showButtonContainer}>
          <TouchableOpacity style={styles.showButton} onPress={() => setShowNav(true)}>
            <Image 
              source={require('../../assets/images/UpArrowButton.png')} // Use require to load the image
              style={styles.imageIconArrow} // Use your custom styles
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%', // Make it cover the full width
    backgroundColor: '#3a3a3a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 70,
    paddingVertical: 15,
    zIndex: 10,
  },
  navItem: {
    backgroundColor: '#5c5c5c',
    padding: 15,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: 65,
    position: 'relative',
  },
  iconText: {
    fontSize: 22,
    color: 'white',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
  },
  loader: {
    position: 'absolute',
    bottom: -5,
  },
  toggleButton: {
    position: 'absolute',
    left: 10, // Align it to the left
    top: 10,
    width: 25,
    height: 25,
    zIndex: 20,
  },
  showButtonContainer: {
    position: 'absolute',
    bottom: 0, // Aligns to the bottom
    width: '100%', // Full width
    backgroundColor: '#3a3a3a', // Background color for visibility
    paddingVertical: 10, // Padding for aesthetic spacing
    alignItems: 'center', // Center the button
  },
  showButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    borderRadius: 20,
  },
  toggleText: {
    color: 'white',
    fontSize: 20,
  },

  imageIcon: {
    width: 40,  // Adjust the width as needed
    height: 40, // Adjust the height as needed
  },

  imageIconArrow: {
    width: 28,  // Adjust the width as needed
    height: 28, // Adjust the height as needed
  },

});
