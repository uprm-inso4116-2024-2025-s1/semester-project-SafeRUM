import React, { useState } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';
import ProfileInput from './ProfileInput';
import styles from './styles/EditProfile.styles';

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

      {/* Profile Details */}
      <ProfileDetails
        firstName={firstName}
        lastName={lastName}
        role={userProfile.role}
      />

      {/* Input fields using ProfileInput */}
      <View style={styles.inputSection}>
        <ProfileInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter First Name"
        />
        <ProfileInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter Last Name"
        />
        <ProfileInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email Address"
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
