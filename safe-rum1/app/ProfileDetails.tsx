import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles/ProfileDetails.styles';

interface ProfileDetailsProps {
  firstName: string;
  lastName: string;
  role: string;
}

export default function ProfileDetails({ firstName, lastName, role }: ProfileDetailsProps) {
  return (
    <View style={styles.profileSection}>
      <Image source={require('../assets/images/no-profile.png')} style={styles.profileImage} />
      <View>
        <Text style={styles.profileName}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.profileRole}>{role}</Text>
      </View>
    </View>
  );
}
