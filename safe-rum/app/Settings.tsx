import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, SafeAreaView, Image, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

interface SettingsPageProps {
  setSettingsState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SettingsPage({ setSettingsState }: SettingsPageProps) {
  const navigation = useNavigation();

  const [sos, setSos] = useState(false);
  const [panicAlert, setPanicAlert] = useState(false);
  const [immediateHelp, setImmediateHelp] = useState(false);
  const [responseTime, setResponseTime] = useState(false);

  const [infoVisible, setInfoVisible] = useState(false);
  const [infoString, setInfoString] = useState("Enable/Disable SOS Notifications\n\nEnable/Disable Panic Alert Notifications\n\nEnable/Disable Immediate Help Notifiactions\n\nEnable/Disable Response Time additional alert after first notification wasn't answered.");

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
            source={require('../assets/images/UPRM-logo.png')}
            style={styles.backgroundImage}
            />
            <View style={styles.profileCard}>
            {/* Profile Image and Name */}
            <View style={styles.profileHeader}>
                <Image source={require('../assets/images/UPRM-paw.png')} style={styles.pawIcon} />
                <Image source={require('../assets/images/UPRM-paw.png')} style={styles.pawIcon} />
            </View>
            <Image source={require('../assets/images/no-profile.png')} style={styles.profileImage} />
            <Text style={styles.profileName}>Yadriel Calderon Montalvo</Text>
            <Text style={styles.profileRole}>General Supervisor</Text>
            <Text style={styles.profileEmail}>yadriel.calderon@upr.edu</Text>
            <View style={styles.editButton}>
                <Image source={require('../assets/images/pencil-icon.png')} />
                <Text style={styles.editButtonText}> Edit profile</Text>
            </View>
            </View>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
            <View style={styles.titleRow}>
              <TouchableOpacity>
                <FontAwesome style={styles.settingsInfo} onPress={() => setInfoVisible((prevState: boolean) => !prevState)} name='info-circle' size={25} />
              </TouchableOpacity>
                <FontAwesome style={styles.settingsGear} name="gear" size={25} />
                <Text style={styles.settingsTitle}>Settings</Text>
                <FontAwesome style={styles.settingsClose} onPress={() => setSettingsState((prevState: boolean) => !prevState)} name="close" size={20} color="black"/>
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
        {infoVisible && (
        <Modal
          transparent={true}
          animationType="fade"
        >
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
    opacity: 0.30,
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
    backgroundColor: '#0A6B36',
    paddingVertical: 0,
    paddingHorizontal: 8,
    marginBottom: 6,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  
  settingsTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  settingsInfo: {
    position: 'absolute',
    left: -130,
  },
  settingsGear: {
    marginRight: 5,
    color: '#fff',
  },  
  settingsClose: {
    position: 'absolute',
    right: 0,
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  closeModalButton: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
});
