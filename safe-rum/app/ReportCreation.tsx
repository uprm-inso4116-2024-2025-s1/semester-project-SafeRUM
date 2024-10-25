import React, { useState } from 'react';
import { Text, View, Alert, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

enum ReportType {
  Report = 'Report',
  SOS = 'SOS',
}

interface Location {
  latitude: number;
  longitude: number;
}

export default function Index({ goBack }: { goBack: () => void }) {
  const [isWriting, setIsWriting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [reportTitle, setReportTitle] = useState('');
  const [reportText, setReportText] = useState('');
  const [location, setLocation] = useState<Location | null>(null);
  const [sosActive, setSosActive] = useState(false);
  const [confirmEnabled, setConfirmEnabled] = useState(false);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setIsWriting(true);
  };

  const handleSubmitReport = () => {
    if (reportText.trim() === '' || reportTitle.trim() === '') {
      Alert.alert('Error', 'Report title and description cannot be empty');
    } else if (!location) {
      Alert.alert('Error', 'Please select a location on the map');
    } else {
      // Current date and timestamp
      const currentDate = new Date();
      const timestamp = currentDate.toLocaleString();
  
      // Expiration date set to 7 days from now
      const expirationDate = new Date();
      expirationDate.setDate(currentDate.getDate() + 7);
  
      console.log(`Report Type: ${ReportType.Report}`);
      console.log('Category:', selectedCategory);
      console.log('Title:', reportTitle);
      console.log('Report:', reportText);
      console.log('Location:', location);
      console.log('Time:', timestamp);
      console.log('Expiration Date:', expirationDate.toISOString()); // Logs expiration date in ISO format
      console.log('\n');
  
      Alert.alert('Success', 'Report and location submitted');
      setReportTitle('');
      setReportText('');
      setLocation(null);
      setIsWriting(false);
    }
  };
  

  const handleCancel = () => {
    setReportTitle('');
    setReportText('');
    setLocation(null);
    setIsWriting(false);
  };

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
  };

  const handleSOSPress = () => {
    setLocation({ latitude: 18.211005502415397, longitude: -67.14156653443999 });
    setSosActive(true);
    setConfirmEnabled(true);
  };

  const handleConfirmSOS = (sosType: string) => {
    if (location) {
      const timestamp = new Date().toLocaleString();
      console.log(`Report Type: ${ReportType.SOS}`);
      console.log(`Report: ${sosType}`);
      console.log('Location:', location);
      console.log('Time:', timestamp);
      console.log('\n');
      Alert.alert('SOS Sent', `Your emergency and current location has been sent.`);
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
      <TouchableOpacity onPress={goBack} style={styles.icon}>
        <Ionicons name="arrow-back-circle" size={32} color="#FFF" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#0F8F46' }}>
        
      {!isWriting && !sosActive && (
  <>
    <TouchableOpacity onPress={goBack} style={styles.icon}>
    <Ionicons name="arrow-back-circle" size={32} color="#FFF" />
    </TouchableOpacity>
    <Text style={styles.headerText}>Select a Category:</Text>
    <TouchableOpacity style={styles.bubbleButton} onPress={() => handleSelectCategory('Safety Issue')}>
      <Text style={styles.buttonText}>Safety Issue</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bubbleButton} onPress={() => handleSelectCategory('Suspicious Person')}>
      <Text style={styles.buttonText}>Suspicious Person</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bubbleButton} onPress={() => handleSelectCategory('Armed Suspect')}>
      <Text style={styles.buttonText}>Armed Suspect</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bubbleButton} onPress={() => handleSelectCategory('Sexual Harasser')}>
      <Text style={styles.buttonText}>Sexual Harasser</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.redButton} onPress={handleSOSPress}>
      <Text style={styles.buttonText}>SOS</Text>
    </TouchableOpacity>
  </>
)}

        {isWriting && (
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Text style={styles.headerText}>{selectedCategory}</Text>
            <TextInput
              placeholder="Title"
              value={reportTitle}
              onChangeText={setReportTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Label"
              value={reportText}
              onChangeText={setReportText}
              style={[styles.input, { height: 75 }]}
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
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReport}>
              <Text style={styles.buttonText}>Submit Report</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={styles.icon}>
              <Ionicons name="arrow-back-circle" size={32} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}

        {sosActive && (
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerText}>SOS</Text>
            <MapView
              style={{ width: 300, height: 200, marginBottom: 10 }}
              initialRegion={{
                latitude: 18.211005502415397,
                longitude: -67.14156653443999,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
              }}
            >
              {location && <Marker coordinate={location} />}
            </MapView>
            <TouchableOpacity style={styles.redButton} onPress={() => handleConfirmSOS('Panic Alert')}>
              <Text style={styles.buttonText}>Panic Alert</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.redButton} onPress={() => handleConfirmSOS('Immediate Help')}>
              <Text style={styles.buttonText}>Immediate Help</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancelSOS} style={styles.icon}>
              <Ionicons name="arrow-back-circle" size={32} color="#FFF" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  bubbleButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: 'auto',
    alignItems: 'center',
    backgroundColor: '#a26919',
  },
  submitButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: 'auto',
    alignItems: 'center',
    backgroundColor: '#49418e',
  },
  redButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: 'auto',
    alignItems: 'center',
    backgroundColor: '#990000',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  icon: {
    position: 'absolute',
    left: 0,
  },
});

