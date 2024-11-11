import React, { useState } from 'react';
import { getFirestore, collection, getDocs } from '@firebase/firestore';
import { useEffect } from 'react';
import { initializeApp } from '@firebase/app';
import { Alert } from 'react-native';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIb-bHGc68LhhHOGmz5QjZBJ5T3DAoGO4",
  authDomain: "saferum-fcc4b.firebaseapp.com",
  projectId: "saferum-fcc4b",
  storageBucket: "saferum-fcc4b.appspot.com",
  messagingSenderId: "11200525932",
  appId: "1:11200525932:web:4e741499413e43017e4a49",
  measurementId: "G-6M83VVM4YY"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import SettingsPage from '../Settings';
import EditProfile from '../EditProfile';
import CalendarPage from '../Calendar/Calendar';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';

export default function Index() {

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsRef = collection(firestore, "reports");
        const reportsSnapshot = await getDocs(reportsRef);
        const reportsData = reportsSnapshot.docs.map(doc => doc.data());
  
        console.log("Fetched Reports Data:", reportsData);  // Log to check data
  
        reportsData.forEach(report => {
          const expirationDate = new Date(report.expirationDate).getTime();
          const currentTime = new Date().getTime();
          const timeLeft = currentTime - expirationDate;
  
          console.log("Report:", report.reportText, "Time Left:", timeLeft);
  
          if (timeLeft > 0) {
            const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  
            Alert.alert(
              "Report Notification",
              `Report "${report.reportText}" expires in ${daysLeft} days, ${hoursLeft} hours, and ${minutesLeft} minutes.`
            );
          }
        });
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
  
    fetchReports();
  }, []);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [settingsState, setSettingsState] = useState<boolean>(false);
  const [editState, setEditState] = useState<boolean>(false);
  const [calendarState, setCalendarState] = useState<boolean>(false);

  // Initial profile state
  const [userProfile, setUserProfile] = useState({
    firstName: 'Yadriel',
    lastName: 'Calderon Montalvo',
    email: 'yadriel.calderon@upr.edu',
    role: 'General Supervisor',
  });

  if (settingsState) {
    return <SettingsPage setSettingsState={setSettingsState} />;
  }
  if (editState) {
    return (
      <EditProfile
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        setEditState={setEditState}
      />
    );
  }
  if (calendarState) {
    return <CalendarPage setCalendarState={setCalendarState} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity
          style={styles.gearIcon}
          onPress={() => {setSettingsState(prevState => !prevState);}}
        >
          <FontAwesome name="gear" size={30} color="black" />
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/UPRM-logo.png')}
          style={styles.backgroundImage}
        />
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image
              source={require('../../assets/images/UPRM-paw.png')}
              style={styles.pawIcon}
            />
            <Image
              source={require('../../assets/images/UPRM-paw.png')}
              style={styles.pawIcon}
            />
          </View>
          <Image
            source={require('../../assets/images/no-profile.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{`${userProfile.firstName} ${userProfile.lastName}`}</Text>
          <Text style={styles.profileRole}>{userProfile.role}</Text>
          <Text style={styles.profileEmail}>{userProfile.email}</Text>
          <View style={styles.buttonContainer}>
            {/* Edit Profile Button */}
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEditState((prevState) => !prevState)}
            >
              <Image
                source={require('../../assets/images/pencil-icon.png')}
              />
              <Text style={styles.editButtonText}> Edit profile</Text>
            </TouchableOpacity>

            {/* Calendar Button */}
            <TouchableOpacity
              style={styles.calendarButton}
              onPress={() => setCalendarState((prevState) => !prevState)}
            >
              <Image
                source={require('../../assets/images/Vector-3.png')}
              />
              <Text style={styles.calendarButtonText}> Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.reportsSection}>
        <View style={styles.reportsHeader}>
          <Image
            source={require('../../assets/images/clock-icon.png')}
            style={styles.icon}
          />
          <Text style={styles.reportsTitle}>Recent reports</Text>
        </View>
        <Text style={styles.noReportsText}>No recent reports</Text>
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
    zIndex: 1,
  },
  profileHeader:{
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
    position: 'relative',
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
    marginBottom: 40
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
    top: -30
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
  pawIcon: {
    width: 36, 
    height: 28,
    marginHorizontal: 130, 
  },
  reportsSection: {
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    backgroundColor: '#0F8F46',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 30,
    height: 270,
  },
  reportsHeader: {
    flexDirection: 'row', 
    alignItems: 'flex-start', 
  },
  icon: {
    width: 30, 
    height: 30,
    marginRight: 10, 
  },
  reportsTitle: {
    marginTop: 2,
    fontSize: 20,
    color: '#fff',
  },
  noReportsText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 70, 
    textAlign: 'center', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#0F8F46',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  calendarButton: {
    flexDirection: 'row',
    backgroundColor: '#0F8F46',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center'  
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 5,
  },
  calendarButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 5,

  },
});