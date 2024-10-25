import React from "react";
import { Marker, Callout } from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";

interface Location {
  id: string;
  lat: number;
  lon: number;
  name: string;
  reports: number;
  dangerLevel: string;
}

const Pin = ({ location }: { location: Location }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
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

export default Pin;
