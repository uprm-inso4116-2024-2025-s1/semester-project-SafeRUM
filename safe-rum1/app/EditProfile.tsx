import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import ProfileHeader from './ProfileHeader';

interface EditPageProps {
  setEditState: React.Dispatch<React.SetStateAction<boolean>>;
  setUserProfile: React.Dispatch<React.SetStateAction<{
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  }>>;
  userProfile: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export default function EditPage({ setEditState, userProfile, setUserProfile }: EditPageProps) {
  const [firstName, setFirstName] = useState(userProfile.firstName);
  const [lastName, setLastName] = useState(userProfile.lastName);
  const [email, setEmail] = useState(userProfile.email);

  const handleSaveChanges = () => {
    setUserProfile({
      firstName,
      lastName,
      email,
      role: userProfile.role,
    });
    setEditState(false);
  };

  const handleCancel = () => {
    setEditState(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Header */}
      <ProfileHeader onCancel={handleCancel} />

      {/* Profile Image Section */}
      <View style={styles.profileSection}>
        <Image source={require('../assets/images/no-profile.png')} style={styles.profileImage} />
        <View>
          <Text style={styles.profileName}>{`${firstName} ${lastName}`}</Text>
          <Text style={styles.profileRole}>{userProfile.role}</Text>
        </View>
      </View>

      {/* Input fields for profile info */}
      <View style={styles.inputSection}>
        <Text style={styles.fieldTitle}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Text style={styles.fieldTitle}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={styles.fieldTitle}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email Address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Save and Cancel buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#337137', // green background
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 40,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '500',
  },
  profileRole: {
    fontSize: 16,
    color: '#000',
    opacity: 0.5,
  },
  inputSection: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 70,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  cancelText: {
    fontSize: 16,
    color: '#000',
  },
  saveText: {
    fontSize: 16,
    color: '#fff',
  },
  fieldTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
