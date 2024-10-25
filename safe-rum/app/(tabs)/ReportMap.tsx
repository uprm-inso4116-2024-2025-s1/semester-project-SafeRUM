import React, { useState, useEffect, useRef, useCallback } from "react";
import MapView, { Circle } from "react-native-maps";
import { StyleSheet, View, ActivityIndicator, Alert, TouchableOpacity, Text, Image, TextInput } from "react-native";
import * as Location from "expo-location";

const Header = ({ onUserLocation, isLoading, searchQuery, setSearchQuery, onSearch, showHeader, setShowHeader, toggleTheme, isLightMode }) => {
  return (
    <View style={styles.header}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a location"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={onSearch}
        returnKeyType="search"
      />
      <TouchableOpacity style={styles.themeToggleButton} onPress={toggleTheme}>
        <Image 
          source={isLightMode ? require('../../assets/images/DarkMode.png') : require('../../assets/images/LightMode.png')}
          style={styles.themeToggleIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

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
  const [showNav, setShowNav] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const isMounted = useRef(true);
  const mapViewRef = useRef<MapView>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isLightMode, setIsLightMode] = useState(true);

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

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert("Error", "Please enter a location.");
      return;
    }

    setIsLoading(true);
    try {
      const geocode = await Location.geocodeAsync(searchQuery);
      if (geocode.length > 0) {
        const { latitude, longitude } = geocode[0];
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        };
        setMapRegion(newRegion);
        mapViewRef.current?.animateToRegion(newRegion, 1000);
      } else {
        Alert.alert("Error", "Location not found.");
      }
    } catch (error) {
      console.error("Error with geocoding:", error);
      Alert.alert("Error", "Failed to find the location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setIsLightMode((prevMode) => !prevMode);
  };

  return (
    <View style={[styles.container, isLightMode ? styles.lightContainer : styles.darkContainer]}>
      <Header 
        onUserLocation={userLocation}
        isLoading={isLoading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        showHeader={showHeader} 
        setShowHeader={setShowHeader} 
        toggleTheme={toggleTheme} 
        isLightMode={isLightMode} 
      />

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
              source={require('../../assets/images/DownArrowButton.png')}
              style={styles.imageIconArrow}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Image 
              source={require('../../assets/images/AddReportButton.png')}
              style={styles.imageIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navItem}
            onPress={userLocation}
            disabled={isLoading}
          >
            <Image 
              source={require('../../assets/images/MyLocationButton.png')}
              style={styles.imageIcon}
            />
            {isLoading && <ActivityIndicator style={styles.loader} color="white" />}
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Image 
              source={require('../../assets/images/MyLocationButton.png')}
              style={styles.imageIcon}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {!showNav && (
        <View style={styles.showButtonContainer}>
          <TouchableOpacity style={styles.showButton} onPress={() => setShowNav(true)}>
            <Image 
              source={require('../../assets/images/UpArrowButton.png')}
              style={styles.imageIconArrow}
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
  lightContainer: {
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: '#3a3a3a',
  },
  map: {
    width: "100%",
    height: "100%",
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    zIndex: 10,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#3a3a3a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    zIndex: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
    fontSize: 16,
  },
  themeToggleButton: {
    marginLeft: 10,
    width: 40,
    height: 40,
  },
  themeToggleIcon: {
    width: 25,
    height: 25,
  },
  navItem: {
    backgroundColor: '#5c5c5c',
    padding: 15,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    width: 30,
    height: 30,
  },
  imageIconArrow: {
    width: 30,
    height: 30,
  },
  showButtonContainer: {
    position: 'absolute',
    bottom: 60,
    left: '50%',
    transform: [{ translateX: -50 }],
    zIndex: 10,
  },
  showButton: {
    backgroundColor: '#5c5c5c',
    padding: 15,
    borderRadius: 40,
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});

