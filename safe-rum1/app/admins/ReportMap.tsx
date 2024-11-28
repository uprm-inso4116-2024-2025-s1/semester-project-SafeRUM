import React, { Component, createRef } from "react";
import { View, Alert, ActivityIndicator, Image, StyleSheet } from "react-native";
import MapView, { Circle } from "react-native-maps";
import * as Location from "expo-location";
import * as geolib from "geolib";
import Pin from "@/components/Pin";

const circleProps = {
  latitude: 18.2106,
  longitude: -67.1396,
  radius: 480,
  strokeColor: "green",
  strokeWidth: 10,
};

type ReportScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ReportScreen'>;

const navigation = useNavigation<RootStackParamList>();


const uprm_main_locations = [
  { id: 1, name: "Ing. Industrial", lat: 18.2106, lon: -67.1396, reports: 5, dangerLevel: "High" },
  { id: 2, name: "Biologia", lat: 18.21279, lon: -67.13859, reports: 3, dangerLevel: "Medium" },
  { id: 3, name: "Stefani", lat: 18.20949, lon: -67.13984, reports: 1, dangerLevel: "Low" },
  // Add other locations...
];

export default class ReportMap extends Component {
  mapViewRef = createRef();

  state = {
    mapRegion: {
      latitude: 18.2106,
      longitude: -67.1396,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009,
    },
    imageValue: 0,
    isLoading: false,
  };

  componentWillUnmount() {
    this.isMounted = false;
  }

  componentDidMount() {
    this.isMounted = true;
    this.getUserLocation();
  }

  getUserLocation = async () => {
    this.setState({ isLoading: true });

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Permission to access location was denied. Please enable it in your device settings."
        );
        this.setState({ isLoading: false });
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      };

      const userWithinRadius = geolib.isPointWithinRadius(
        { latitude: location.coords.latitude, longitude: location.coords.longitude },
        { latitude: circleProps.latitude, longitude: circleProps.longitude },
        circleProps.radius
      );

      if (!userWithinRadius) {
        Alert.alert("Error", "User is not within bounds");
      }

      if (this.isMounted) {
        this.setState({ mapRegion: newRegion });
        this.mapViewRef.current?.animateToRegion(newRegion, 1000);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to get your location. Please try again.");
    } finally {
      if (this.isMounted) {
        this.setState({ isLoading: false });
      }
    }
  };

  getImageSource = (value) => {
    switch (value) {
      case 0:
        return require("@/assets/images/green.jpg");
      case 1:
        return require("@/assets/images/yellow.jpg");
      default:
        return require("@/assets/images/red.jpg");
    }
  };

  render() {
    const { mapRegion, isLoading, imageValue } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          ref={this.mapViewRef}
          style={styles.map}
          region={mapRegion}
          showsUserLocation
        >
          <Circle
            center={{ latitude: circleProps.latitude, longitude: circleProps.longitude }}
            radius={circleProps.radius}
            strokeWidth={circleProps.strokeWidth}
            strokeColor={circleProps.strokeColor}
          />
          {uprm_main_locations.map((location) => (
            <Pin key={location.id} location={{ ...location, id: location.id.toString() }} />
          ))}
        </MapView>
        //         <Button
          title={"create Report"}

          onPress={navigation.navigate('ReportCreation')}
        />

        <View style={styles.imageContainer}>
          <Image source={this.getImageSource(imageValue)} style={styles.image} />
        </View>

        {isLoading && <ActivityIndicator style={styles.loader} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "80%",
  },
  loader: {
    margin: 10,
  },
  imageContainer: {
    alignItems: "flex-end",
    width: "100%",
  },
  image: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import MapView, { Circle } from "react-native-maps";
// import {
//   StyleSheet,
//   View,
//   Button,
//   ActivityIndicator,
//   Alert,
//   Image,
// } from "react-native";
// import * as Location from "expo-location";
// import Pin from "@/components/Pin";
// import * as geolib from 'geolib';
// import { useNavigation } from '@react-navigation/native';
// import type { StackNavigationProp } from '@react-navigation/stack';
// // Sample data for pinned locations

// //todo: revise this logic, extracted from reports.tsx
// type RootStackParamList = {
//   ReportScreen: undefined;
//   ReportCreation: undefined;
//   MyReports: undefined; 
// };

// type ReportScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ReportScreen'>;

// const navigation = useNavigation<RootStackParamList>();

// const uprm_main_locations = [
//   {
//     id: 1,
//     name: "Ing. Industrial",
//     lat: 18.2106,
//     lon: -67.1396,
//     reports: 5,
//     dangerLevel: "High",
//   },
//   {
//     id: 2,
//     name: "Biologia",
//     lat: 18.21279,
//     lon: -67.13859,
//     reports: 3,
//     dangerLevel: "Medium",
//   },
//   {
//     id: 3,
//     name: "Stefani",
//     lat: 18.20949,
//     lon: -67.13984,
//     reports: 1,
//     dangerLevel: "Low",
//   },
//   {
//     id: 4,
//     name: "Quimica",
//     lat: 18.21279,
//     lon: -67.14086,
//     reports: 2,
//     dangerLevel: "Medium",
//   },
//   {
//     id: 5,
//     name: "Fisica",
//     lat: 18.21111,
//     lon: -67.13916,
//     reports: 4,
//     dangerLevel: "High",
//   },
//   {
//     id: 6,
//     name: "Chardon",
//     lat: 18.21044,
//     lon: -67.1403,
//     reports: 0,
//     dangerLevel: "None",
//   },
//   {
//     id: 7,
//     name: "Biblioteca",
//     lat: 18.21106,
//     lon: -67.14171,
//     reports: 6,
//     dangerLevel: "High",
//   },
//   {
//     id: 8,
//     name: "Sanchez Hidalgo",
//     lat: 18.21166,
//     lon: -67.1403,
//     reports: 0,
//     dangerLevel: "None",
//   },
//   {
//     id: 9,
//     name: "Centro de Estudiantes",
//     lat: 18.21025,
//     lon: -67.14114,
//     reports: 3,
//     dangerLevel: "Medium",
//   },
//   {
//     id: 10,
//     name: "Celis",
//     lat: 18.20936,
//     lon: -67.14088,
//     reports: 3,
//     dangerLevel: "Medium",
//   },
//   {
//     id: 11,
//     name: "Antonio Lucchetti",
//     lat: 18.20859,
//     lon: -67.14004,
//     reports: 3,
//     dangerLevel: "Medium",
//   },
// ];

// export default function App() {
//   const [mapRegion, setMapRegion] = useState({
//     latitude: 18.2106,
//     longitude: -67.1396,
//     latitudeDelta: 0.009,
//     longitudeDelta: 0.009,
//   });

//   const statuses = [
//     "@/assets/images/green.jpg",
//     "@/assets/images/yellow.jpg",
//     "@/assets/images/red.jpg"
//   ]

//     // Function to get the correct image based on value
//     const getImageSource = (value) => {
//       switch (value) {
//         case 0:
//           return require("@/assets/images/green.jpg"); // Replace with your local image paths
//         case 1:
//           return require("@/assets/images/yellow.jpg");
//         default:
//           return require("@/assets/images/red.jpg");
//       }
//     };

//       // Handler to cycle through values 1 to 3
//   const handleChangeImage = () => {
//     setImageValue((imageValue+1)%3) // Cycles through 1, 2, and 3
//   };

//   const status_idx = 0

//   const [imageValue, setImageValue] = useState(0); // The value that determines which image to display

//   const circleProps = {
//     latitude: 18.2106,
//     longitude: -67.1396,
//     radius: 480,
//     strokeColor: "green",
//     strokeWidth: 10,
//   };

//   const [isLoading, setIsLoading] = useState(false);
//   const isMounted = useRef(true);
//   const mapViewRef = useRef<MapView | null>(null);

//   useEffect(() => {
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);

//   const userLocation = useCallback(async () => {
//     setIsLoading(true);
//     let { status } = await Location.requestForegroundPermissionsAsync();

//     if (status !== "granted") {
//       Alert.alert(
//         "Permission Denied",
//         "Permission to access location was denied. Please enable it in your device settings."
//       );
//       setIsLoading(false);
//       return;
//     }

//     try {
//       let location = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.Balanced,
//       });
//       if (isMounted.current) {
//         const newRegion = {
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//           latitudeDelta: 0.003,
//           longitudeDelta: 0.003,
//         };
//         setMapRegion(newRegion);
//         mapViewRef.current?.animateToRegion(newRegion, 1000);
//       }

//       const userWithinRadius = geolib.isPointWithinRadius(
//         { latitude: location.coords.latitude, longitude: location.coords.longitude },
//         { latitude: circleProps.latitude, longitude: circleProps.longitude },
//         circleProps.radius
//     );
//     if(!userWithinRadius){
//       Alert.alert("Error", "User is not within bounds");
//     }

//     } catch (error) {
//       console.error("Error getting location:", error);
//       Alert.alert("Error", "Failed to get your location. Please try again.");
//     } finally {
//       if (isMounted.current) {
//         setIsLoading(false);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     userLocation();
//   }, [userLocation]);

//   return (
//     <View style={styles.container}>

//       <MapView
//         ref={mapViewRef}
//         style={styles.map}
//         region={mapRegion}
//         showsUserLocation={true}
//       >

//       <View style={styles.imageContainer}>
//        <Image
//        source={getImageSource(imageValue)}
//         style={styles.image}
//       />
//       </View>

//         <Circle
//           center={{
//             latitude: circleProps.latitude,
//             longitude: circleProps.longitude,
//           }}
//           radius={circleProps.radius}
//           strokeWidth={circleProps.strokeWidth}
//           strokeColor={circleProps.strokeColor}
//         />
//         {uprm_main_locations.map((location) => (
//           <Pin
//             key={location.id}
//             location={{ ...location, id: location.id.toString() }}
//           /> // Use the Pin component
//         ))}
//       </MapView>

//       <View style={styles.buttonContainer}>
//         <Button
//           title={isLoading ? "Getting location..." : "Get location"}
//           onPress={userLocation}
//           disabled={isLoading}
//         />
//         {/* <Button
//           title={"Change status (DEBUG)"}
//           onPress={handleChangeImage}
//           disabled={isLoading}
//         /> */}
//         <Button
//           title={"create Report"}

//           onPress={navigation.navigate('ReportCreation')}
//         />
//         {isLoading && <ActivityIndicator style={styles.loader} />}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: "100%",
//     height: "80%",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 10,
//   },
//   loader: {
//     marginLeft: 10,
//   },
//   imageContainer: {
//     alignItems: 'flex-end', // Align the image to the right
//     width: '100%', // Full width of the container
//   },
//   image: {
//     width: 25, // Set width to 20px
//     height: 25, // Set height to 20px
//     resizeMode: 'contain', // Optional to make sure image scales properly
//   },
// });

