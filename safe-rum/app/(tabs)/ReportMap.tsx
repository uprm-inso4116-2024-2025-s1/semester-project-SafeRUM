import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import HelpButton from '../../components/HelpButton';

export default function ReportMap() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 18.2106,
          longitude: -67.1396,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
      />
      <HelpButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});