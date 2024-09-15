import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

export default function SettingsPage() {
  const navigation = useNavigation();

  const [sos, setSos] = useState(false);
  const [panicAlert, setPanicAlert] = useState(false);
  const [immediateHelp, setImmediateHelp] = useState(false);
  const [responseTime, setResponseTime] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.gearIcon}>
          <FontAwesome name="gear" size={30} color="black" />
        </View>
        <Image
          source={require('../../assets/images/UPRM-logo.png')}
          style={styles.backgroundImage}
        />
        <View style={styles.profileCard}>
          {/* Profile Image and Name */}
          <View style={styles.profileHeader}>
            <Image source={require('../../assets/images/UPRM-paw.png')} style={styles.pawIcon} />
            <Image source={require('../../assets/images/UPRM-paw.png')} style={styles.pawIcon} />
          </View>
          <Image source={require('../../assets/images/no-profile.png')} style={styles.profileImage} />
          <Text style={styles.profileName}>Yadriel Calderon Montalvo</Text>
          <Text style={styles.profileRole}>General Supervisor</Text>
          <Text style={styles.profileEmail}>yadriel.calderon@upr.edu</Text>
          <TouchableOpacity style={styles.editButton}>
            <Image source={require('../../assets/images/pencil-icon.png')} />
            <Text style={styles.editButtonText}> Edit profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.settingsSection}>
        <View style={styles.titleRow}>
            <FontAwesome style={styles.settingsGear} name="gear" size={30} color="black" />
            <Text style={styles.settingsTitle}>Settings</Text>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>SOS</Text>
          <Switch value={sos} onValueChange={setSos} trackColor={{ false: "#FFFFFF", true: "#2C2C2C" }} />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Panic Alert</Text>
          <Switch value={panicAlert} onValueChange={setPanicAlert} trackColor={{ false: "#FFFFFF", true: "#2C2C2C" }} />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Immediate Help</Text>
          <Switch value={immediateHelp} onValueChange={setImmediateHelp} trackColor={{ false: "#FFFFFF", true: "#2C2C2C" }} />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Response Time</Text>
          <Switch value={responseTime} onValueChange={setResponseTime} trackColor={{ false: "#FFFFFF", true: "#2C2C2C" }} />
        </View>

        <View style={styles.authButtonRow}>
          <TouchableOpacity style={styles.authButton}>
            <Text style={styles.authButtonText}>2-Factor Auth</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gearIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  profileSection: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    width: 420,
    height: 420,
    opacity: 10,
  },
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
  profileImage: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: 100,
    height: 100,
    borderRadius: 40,
    top: -30,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileRole: {
    fontSize: 16,
  },
  profileEmail: {
    fontSize: 16,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#0F8F46',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  editButtonText: {
    left: 2,
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  pawIcon: {
    width: 36,
    height: 28,
    marginHorizontal: 130,
  },
  settingsSection: {
    backgroundColor: '#0F8F46',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 30,
    height: 270,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  settingsTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  settingsGear: {
    marginRight: 5,
    color: '#fff',
  },  
  settingLabel: {
    fontSize: 18,
    color: '#fff',
  },
  authButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  authButton: {
    backgroundColor: '#1B5E20',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginRight: 30,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 0,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
