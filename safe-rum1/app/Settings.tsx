import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Define the props interface for the SettingsPage component
interface SettingsPageProps {
  setSettingsState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SettingsPage({ setSettingsState }: SettingsPageProps) {
  const navigation = useNavigation();

  // State variables for toggle switches
  const [sos, setSos] = useState(false);
  const [panicAlert, setPanicAlert] = useState(false);
  const [immediateHelp, setImmediateHelp] = useState(false);
  const [responseTime, setResponseTime] = useState(false);

  // State variables for modal visibility and info text
  const [infoVisible, setInfoVisible] = useState(false);
  const infoString =
    'Enable/Disable SOS Notifications\n\n' +
    'Enable/Disable Panic Alert Notifications\n\n' +
    'Enable/Disable Immediate Help Notifications\n\n' +
    "Enable/Disable Response Time additional alert after first notification wasn't answered.";

  // Function to handle toggle switches
  const handleToggle = (settingType: string) => {
    switch (settingType) {
      case 'sos':
        setSos((prevState) => !prevState);
        break;
      case 'panicAlert':
        setPanicAlert((prevState) => !prevState);
        break;
      case 'immediateHelp':
        setImmediateHelp((prevState) => !prevState);
        break;
      case 'responseTime':
        setResponseTime((prevState) => !prevState);
        break;
      default:
        break;
    }
  };

  // Hide the header in the navigation bar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        {/* Gear Icon */}
        <View style={styles.gearIcon}>
          <FontAwesome name="gear" size={30} color="black" />
        </View>

        {/* Background Image */}
        <Image
          source={require('../assets/images/UPRM-logo.png')}
          style={styles.backgroundImage}
        />

        {/* Profile Card */}
        <View style={styles.profileCard}>
          {/* Profile Header with Paw Icons */}
          <View style={styles.profileHeader}>
            <Image
              source={require('../assets/images/UPRM-paw.png')}
              style={styles.pawIcon}
            />
            <Image
              source={require('../assets/images/UPRM-paw.png')}
              style={styles.pawIcon}
            />
          </View>

          {/* Profile Image */}
          <Image
            source={require('../assets/images/no-profile.png')}
            style={styles.profileImage}
          />

          {/* Profile Information */}
          <Text style={styles.profileName}>Yadriel Calderon Montalvo</Text>
          <Text style={styles.profileRole}>General Supervisor</Text>
          <Text style={styles.profileEmail}>yadriel.calderon@upr.edu</Text>
          <View style={styles.buttonContainer}>

          {/* Edit Profile Button */}
          <View style={styles.editButton}>
            <Image source={require('../assets/images/pencil-icon.png')} />
            <Text style={styles.editButtonText}> Edit profile</Text>
          </View>
          <View style={styles.calendarButton}><Image
                source={require('../assets/images/Vector-3.png')}
              />
              <Text style={styles.calendarButtonText}> Calendar</Text></View>
        </View>
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.settingsSection}>
        {/* Settings Header */}
        <View style={styles.titleRow}>
          {/* Info Icon */}
          <TouchableOpacity onPress={() => setInfoVisible(!infoVisible)}>
            <FontAwesome
              style={styles.settingsInfo}
              name="info-circle"
              size={25}
              color="#fff"
            />
          </TouchableOpacity>

          {/* Gear Icon and Title */}
          <FontAwesome style={styles.settingsGear} name="gear" size={25} color="#fff" />
          <Text style={styles.settingsTitle}>Settings</Text>

          {/* Close Icon */}
          <TouchableOpacity onPress={() => setSettingsState((prev) => !prev)}>
            <FontAwesome
              style={styles.settingsClose}
              name="close"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Setting Toggles */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>SOS</Text>
          <TouchableOpacity
            onPress={() => handleToggle('sos')}
            style={[styles.toggleButton, sos ? styles.on : styles.off]}
          >
            <Text style={styles.buttonText}>{sos ? 'ON' : 'OFF'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Panic Alert</Text>
          <TouchableOpacity
            onPress={() => handleToggle('panicAlert')}
            style={[styles.toggleButton, panicAlert ? styles.on : styles.off]}
          >
            <Text style={styles.buttonText}>{panicAlert ? 'ON' : 'OFF'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Immediate Help</Text>
          <TouchableOpacity
            onPress={() => handleToggle('immediateHelp')}
            style={[styles.toggleButton, immediateHelp ? styles.on : styles.off]}
          >
            <Text style={styles.buttonText}>{immediateHelp ? 'ON' : 'OFF'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Response Time</Text>
          <TouchableOpacity
            onPress={() => handleToggle('responseTime')}
            style={[styles.toggleButton, responseTime ? styles.on : styles.off]}
          >
            <Text style={styles.buttonText}>{responseTime ? 'ON' : 'OFF'}</Text>
          </TouchableOpacity>
        </View>

        {/* Authentication and Logout Buttons */}
        <View style={styles.authButtonRow}>
          <TouchableOpacity style={styles.authButton}>
            <Text style={styles.authButtonText}>2-Factor Auth</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Information Modal */}
      {infoVisible && (
        <Modal transparent animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>{infoString}</Text>
              <TouchableOpacity onPress={() => setInfoVisible(false)}>
                <Text style={styles.closeModalButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

// Stylesheet for the component
const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Gear icon in the profile section
  gearIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  // Profile header containing paw icons
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  // Profile section styling
  profileSection: {
    opacity: 0.3,
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  // Background image in the profile section
  backgroundImage: {
    position: 'absolute',
    top: 0,
    width: 420,
    height: 420,
    opacity: 1,
  },
  // Profile card containing user info
  profileCard: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '85%',
    height: '55%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginTop: '51%',
    marginBottom: 40,
  },
  // Profile image styling
  profileImage: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 40,
    top: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  // Profile name text
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Profile role text
  profileRole: {
    fontSize: 16,
  },
  // Profile email text
  profileEmail: {
    fontSize: 16,
  },
  // Edit profile button styling
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#0F8F46',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  // Edit profile button text
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 5,
  },
  // Paw icon styling
  pawIcon: {
    width: 36,
    height: 28,
    marginHorizontal: 130,
  },
  // Settings section styling
  settingsSection: {
    backgroundColor: '#0F8F46',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 30,
    height: 270,
  },
  // Settings title text
  settingsTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  // Title row containing icons and title
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  // Info icon styling
  settingsInfo: {
    position: 'absolute',
    left: -130,
    color: 'black',
  },
  // Gear icon in the settings header
  settingsGear: {
    marginRight: 5,
  },
  // Close icon in the settings header
  settingsClose: {
    position: 'absolute',
    right: -130,
  },
  // Individual setting row
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0A6B36',
    paddingVertical: 0,
    paddingHorizontal: 8,
    marginBottom: 6,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  // Setting label text
  settingLabel: {
    fontSize: 18,
    color: '#fff',
  },
  // Toggle button styling
  toggleButton: {
    padding: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#454545',
  },
  // Styling for toggle button when ON
  on: {
    backgroundColor: 'green',
    paddingHorizontal: 10,
  },
  // Styling for toggle button when OFF
  off: {
    backgroundColor: 'red',
  },
  // Text inside the toggle button
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Row containing authentication and logout buttons
  authButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  // 2-Factor Authentication button styling
  authButton: {
    backgroundColor: '#1B5E20',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginRight: 30,
  },
  // Text inside the 2-Factor Authentication button
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  // Logout button styling
  logoutButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 0,
  },
  // Text inside the logout button
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  // Background styling for the modal
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  // Container styling for the modal content
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  // Text inside the modal
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  // Close button inside the modal
  closeModalButton: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  calendarButton: {
    flexDirection: 'row',
    backgroundColor: '#0F8F46',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center'  
  },
  calendarButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 5,

  },
});
