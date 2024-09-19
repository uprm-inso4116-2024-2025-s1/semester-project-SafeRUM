import React, { useState } from 'react';
import { Text, View, Button, TextInput, Alert, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';

enum ReportType {
  Report = 'Report',
  SOS = 'SOS',
}
interface Location {
  latitude: number;
  longitude: number;
}

export default function Index() {
  const [isWriting, setIsWriting] = useState(false);
  const [reportText, setReportText] = useState('');
  const [location, setLocation] = useState<Location | null>(null);
  const [sosActive, setSosActive] = useState(false);
  const [confirmEnabled, setConfirmEnabled] = useState(false);
  const [urgency, setUrgency] = useState<string>('Low');

  const handleCreateReport = () => {
    setUrgency("Low");
    setLocation(null);
    setIsWriting(true);
  };

  const handleSubmitReport = () => {
    if (reportText.trim() === '') {
      Alert.alert('Error', 'Report cannot be empty');
    } else if (!location) {
      Alert.alert('Error', 'Please select a location on the map');
    } else {
      console.log('Report:', reportText);
      console.log(`Report Type: ${ReportType.Report}`);
      console.log('Location:', location);
      console.log('Urgency:', urgency);
      console.log('\n');
      Alert.alert('Success', 'Report and location submitted');
      setReportText('');
      setLocation(null);
      setIsWriting(false);
    }
  };

  const handleCancel = () => {
    setReportText('');
    setLocation(null);
    setIsWriting(false);
  };

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
  };

  const handleSOSPress = () => {
    // Set dummy location
    setLocation({ latitude: 18.211005502415397, longitude: -67.14156653443999 });
    setSosActive(true);
    setConfirmEnabled(true);
    setUrgency("High")
  };

  const handleConfirmSOS = () => {
    if (location) {
      console.log(`Report Type: ${ReportType.SOS}`);
      console.log('Report: SOS');
      console.log('Location:', location);
      console.log('Urgency:', urgency)
      console.log('\n')
      Alert.alert('SOS Sent', 'Your SOS with location has been sent.');
    } else {
      Alert.alert('Error', 'Please select a location before sending SOS.');
    }
    setSosActive(false);
    setConfirmEnabled(false);
  };

  const handleCancelSOS = () => {
    setSosActive(false);
    setConfirmEnabled(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Saw something strange?</Text>

        {!isWriting && (
          <Button title="Make a report!" onPress={handleCreateReport} />
        )}

        {isWriting && (
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <TextInput
              placeholder="Write your report here"
              value={reportText}
              onChangeText={setReportText}
              style={{
                height: 100,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                padding: 10,
                marginBottom: 10,
              }}
              multiline={true}
            />
            <MapView
              style={{ width: 300, height: 200, marginBottom: 10 }}
              initialRegion={{
                latitude: 18.2106,
                longitude: -67.1396,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
              }}
              onPress={handleMapPress}
            >
              {location && (
                <Marker coordinate={location} />
              )}
            </MapView>

            <View style={{ marginBottom: 10, alignItems: 'center' }}>
              <Text style={styles.urgencyLabel}>Urgency:</Text>
              <View style={styles.urgencyButtonsContainer}>
                <TouchableOpacity
                  style={[styles.urgencyButton, urgency === 'Low' && styles.selectedUrgency]}
                  onPress={() => setUrgency('Low')}
                >
                  <Text style={styles.buttonText}>Low</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.urgencyButton, urgency === 'Medium' && styles.selectedUrgency]}
                  onPress={() => setUrgency('Medium')}
                >
                  <Text style={styles.buttonText}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.urgencyButton, urgency === 'High' && styles.selectedUrgency]}
                  onPress={() => setUrgency('High')}
                >
                  <Text style={styles.buttonText}>High</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Button title="Submit Report" onPress={handleSubmitReport} />
            <Button title="Cancel" onPress={handleCancel} color="red" />
          </View>
        )}

        {/* SOS Button Section */}
        {!isWriting && (
          <View style={{ position: 'absolute', bottom: 50 }}>
            {!sosActive && (
              <Button title="SOS" onPress={handleSOSPress} color="orange" />
            )}

            {sosActive && (
              <View style={{ alignItems: 'center' }}>
                <Text>Confirm SOS</Text>

                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    backgroundColor: confirmEnabled ? 'red' : 'gray',
                    padding: 10,
                    borderRadius: 5,
                    width: 200,
                    alignItems: 'center',
                  }}
                  disabled={!confirmEnabled}
                  onPress={handleConfirmSOS}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {confirmEnabled ? 'CONFIRM' : 'Please wait...'}
                  </Text>
                </TouchableOpacity>

                <Button title="Cancel" onPress={handleCancelSOS} color="gray" />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  urgencyButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 300,
  },
  urgencyButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  selectedUrgency: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  urgencyLabel: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
