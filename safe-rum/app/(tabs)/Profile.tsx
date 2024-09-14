import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Index() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, 
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>

      {/* Background Image */}
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
          <Text style={styles.profileName}>Yadriel Calderon Montalvo</Text>
          <Text style={styles.profileRole}>General Supervisor</Text>
          <Text style={styles.profileEmail}>yadriel.calderon@upr.edu</Text>
          <TouchableOpacity style={styles.editButton}>
          <Image
            source={require('../../assets/images/pencil-icon.png')}
          />
            <Text style={styles.editButtonText}> Edit profile</Text>
          </TouchableOpacity>
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
};

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
});